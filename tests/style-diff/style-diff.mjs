/**
 * Style diff: regression test for CSS refactorings.
 *
 * Captures the computed styles and boxes of all elements (including ::before
 * and ::after) of a list of pages of the local site in several viewport widths, and
 * compares two captures. Take a capture before a change, one after it, and
 * compare them: no differences means the change did not alter the rendering.
 *
 * Run it through the Makefile of the theme, it starts the containers:
 *
 *   make style-capture NAME=<name> [ROLE=<role>]
 *   make style-compare A=<before> B=<after> [DETAILS=1]
 *
 * In the container: npm run style-diff -- capture <name> [options]
 *                   npm run style-diff -- compare <before> <after> [--details]
 *
 * Capture options:
 *   --uri <url>       Site to test, default https://web.blaetter
 *   --pages <file>    List of paths, default tests/style-diff/pages.txt
 *   --widths <list>   Viewport widths, default 375,640,860,1280 (see below)
 *   --login-url <url> One-time login link (drush user:login) to capture the
 *                     pages as that user; the Makefile creates it for ROLE
 *   --role-label <s>  Role of that user, only stored in meta.json
 *
 * Browser: the Chromium of the Playwright image (container), otherwise
 * STYLE_DIFF_BROWSER (path to a Chromium based browser), Chrome or Edge.
 *
 * Elements are compared by position; when the markup of a page changed, they
 * are paired by their keys (tag, id, classes) like diff; elements with the
 * same tag at the same place count as replaced and are compared as well, added
 * or removed elements are reported on their own, so the rest of the page stays
 * comparable.
 *
 * Pages may run steps before they are captured (clicks, e.g. to open the
 * search flyout or to go through the checkout), see pages.txt.
 *
 * Captures are written to tests/style-diff/snapshots/<name>/ (not in git).
 * Only the resting state is captured, not :hover or :focus.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const here = dirname(fileURLToPath(import.meta.url));
const snapshotDir = join(here, 'snapshots');

// Properties that matter for the rendering; layout is covered by the boxes.
const PROPERTIES = [
  'display', 'position', 'top', 'right', 'bottom', 'left', 'float', 'clear', 'z-index',
  'box-sizing', 'min-width', 'max-width', 'min-height', 'max-height',
  'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
  'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
  'border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style',
  'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
  'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
  'background-color', 'background-image', 'background-position', 'background-size', 'background-repeat',
  'color', 'opacity', 'visibility', 'overflow-x', 'overflow-y', 'box-shadow', 'outline-style', 'outline-width',
  'font-family', 'font-size', 'font-weight', 'font-style', 'line-height', 'letter-spacing',
  'text-align', 'text-transform', 'text-decoration-line', 'text-indent', 'white-space', 'vertical-align',
  'list-style-type', 'list-style-image', 'list-style-position', 'content', 'cursor', 'appearance',
  'flex-direction', 'flex-wrap', 'flex-grow', 'flex-shrink', 'flex-basis', 'order',
  'align-items', 'align-self', 'justify-content', 'gap',
  'grid-template-columns', 'grid-template-rows', 'grid-column-start', 'grid-column-end',
  'transform', 'clip-path', 'object-fit',
];

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      // An empty string is a value too (e.g. a failed command substitution).
      options[key] = argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    } else {
      positional.push(argv[i]);
    }
  }
  return { positional, options };
}

async function launchBrowser() {
  if (process.env.STYLE_DIFF_BROWSER) {
    return chromium.launch({ executablePath: process.env.STYLE_DIFF_BROWSER });
  }
  // The Playwright image provides the matching Chromium.
  if (process.env.PLAYWRIGHT_BROWSERS_PATH) {
    return chromium.launch();
  }
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel });
    } catch {
      // try the next one
    }
  }
  throw new Error('No browser found: install Chrome or Edge, or set STYLE_DIFF_BROWSER.');
}

// Runs in the page: computed styles and boxes of all elements in document order.
function snapshotPage(properties) {
  const key = (el) => {
    const parts = [];
    for (let node = el; node && node.nodeType === 1 && parts.length < 5; node = node.parentElement) {
      let part = node.tagName.toLowerCase();
      if (node.id) {
        // generated ids (e.g. Altcha, form build ids) contain random numbers
        parts.unshift(`${part}#${node.id.replace(/\d{3,}/g, 'N')}`);
        break;
      }
      if (typeof node.className === 'string' && node.className.trim()) {
        part += `.${node.className.trim().split(/\s+/).slice(0, 3).join('.')}`;
      }
      parts.unshift(part);
    }
    return parts.join(' > ');
  };
  const read = (style) => Object.fromEntries(properties.map((p) => [p, style.getPropertyValue(p)]));
  const pseudo = (el, which) => {
    const style = getComputedStyle(el, which);
    return ['none', 'normal'].includes(style.content) ? null : read(style);
  };
  return [...document.body.querySelectorAll('*')]
    // #drupal-live-announce is created on demand by Drupal.announce()
    .filter((el) => !el.closest('script, style, svg, noscript, #drupal-live-announce'))
    .map((el) => {
      const box = el.getBoundingClientRect();
      return {
        key: key(el),
        box: [box.x + scrollX, box.y + scrollY, box.width, box.height].map((v) => Math.round(v * 10) / 10),
        style: read(getComputedStyle(el)),
        before: pseudo(el, '::before'),
        after: pseudo(el, '::after'),
      };
    });
}

// Loads a page and waits until JavaScript, fonts and images are done.
async function load(page, url) {
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  await settle(page);
  return response;
}

// Waits until fonts, images and jQuery animations of the current page are done.
async function settle(page) {
  // JavaScript changes the page after loading (active links, cookie banner
  // sliding in), so wait until fonts and jQuery animations are done.
  await page.evaluate(() => document.fonts.ready);
  // Lazy images get their size only when loaded: load all of them.
  await page.evaluate(() => Promise.all([...document.images].map((img) => {
    img.loading = 'eager';
    return img.complete ? null : new Promise((done) => { img.onload = img.onerror = done; setTimeout(done, 5000); });
  })));
  await page.waitForFunction(() => !window.jQuery || !window.jQuery(':animated').length, null, { timeout: 10000 });
  await page.waitForTimeout(500);
}

// Clicks an element; when the click loads another page (links, form
// buttons), waits for it. With optional, a missing element is skipped.
async function click(page, selector, optional) {
  const element = page.locator(selector).first();
  if (optional && !(await element.count())) {
    return;
  }
  const navigation = page.waitForEvent('framenavigated', { predicate: (frame) => frame === page.mainFrame(), timeout: 1500 })
    .then(() => page.waitForLoadState('networkidle'))
    .catch(() => null);
  await element.click();
  await navigation;
  await settle(page);
}

async function capture(name, options) {
  if ('login-url' in options && !/^https?:\/\//.test(String(options['login-url']))) {
    throw new Error('--login-url needs the one-time login link (drush user:login), got none.');
  }
  const uri = (options.uri || 'https://web.blaetter').replace(/\/$/, '');
  const pagesFile = options.pages || join(here, 'pages.txt');
  // One path per line, optionally followed by "# <flags>" and by steps,
  // each after " | " (see pages.txt):
  // anonymous = only without login, login = only with login,
  // fresh = in a new browser session (empty cart), only without login.
  const pages = readFileSync(pagesFile, 'utf8').split('\n').map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const [head, ...steps] = l.split(/\s+\|\s+/);
      const [path, flags = ''] = head.split(/\s+#\s*/);
      return {
        path,
        flags: new Set(flags.split(/[\s,]+/).filter(Boolean)),
        steps: steps.map((step) => {
          const [, action, selector = ''] = step.match(/^(\S+)\s*(.*)$/);
          if (!['click', 'click?', 'snapshot'].includes(action)) {
            throw new Error(`Unknown step "${step}" in ${pagesFile}`);
          }
          return { action, selector };
        }),
      };
    });
  // One width per range in which forms, buttons or the base CSS (layer drupal)
  // change: 600 px (cookie banner), 720 px (phone/desktop for forms, buttons
  // and the components) and 1000 px (cookie banner buttons). The other
  // breakpoints (420, 560, 1200, 1420 px) only hold legacy layout rules; add
  // widths with --widths when a change touches them.
  const widths = String(options.widths || '375,640,860,1280').split(',').map(Number);
  const target = join(snapshotDir, name);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(target, { recursive: true });

  const browser = await launchBrowser();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();
  let user = null;
  if (options['login-url']) {
    const response = await page.goto(options['login-url']);
    if (!response.ok()) {
      throw new Error(`Login failed (HTTP ${response.status()}).`);
    }
    user = { role: options['role-label'] || 'unknown', uid: (options['login-url'].match(/\/user\/reset\/(\d+)\//) || [])[1] };
  }
  const included = ({ path, flags }) => (user
    ? !flags.has('anonymous') && !flags.has('fresh')
    : !flags.has('login') && !path.includes('{uid}'));
  const url = (path) => uri + path.replace('{uid}', user?.uid);

  // Warm up Drupal's caches: a page rendered for the first time can differ in
  // details (e.g. the is-active class of links) from cached deliveries.
  // The first request after drush cache:rebuild can be slow, so allow more
  // time than the default 30 seconds.
  for (const entry of pages.filter((p) => included(p) && !p.flags.has('fresh'))) {
    await page.request.get(url(entry.path), { timeout: 120000 });
  }

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const [index, entry] of pages.entries()) {
      if (!included(entry)) {
        continue;
      }
      let targetPage = page;
      if (entry.flags.has('fresh')) {
        const fresh = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width, height: 900 } });
        targetPage = await fresh.newPage();
      }
      const response = await load(targetPage, url(entry.path));
      // Without steps the loaded page is captured; with steps at each
      // "snapshot" step and after the last step. Further captures of an entry
      // get a suffix (-2, -3, …); the label names the last click before them.
      let count = 0;
      const snapshot = async (done) => {
        const elements = await targetPage.evaluate(snapshotPage, PROPERTIES);
        count++;
        const file = `${width}-${String(index + 1).padStart(2, '0')}${count > 1 ? `-${count}` : ''}.json`;
        const last = done.filter((step) => step.action !== 'snapshot').at(-1);
        const label = entry.path + (last ? ` | ${last.action} ${last.selector}` : '');
        const path = new URL(targetPage.url()).pathname;
        writeFileSync(join(target, file), JSON.stringify({ path: label, url: path, width, status: response.status(), elements }));
        console.log(`${name}: ${width}px ${label} (${response.status()}, ${path}, ${elements.length} elements)`);
      };
      for (const [i, step] of entry.steps.entries()) {
        if (step.action === 'snapshot') {
          await snapshot(entry.steps.slice(0, i));
        } else {
          await click(targetPage, step.selector, step.action === 'click?');
        }
      }
      if (!entry.steps.length || entry.steps.at(-1).action !== 'snapshot') {
        await snapshot(entry.steps);
      }
      if (targetPage !== page) {
        await targetPage.context().close();
      }
    }
  }
  writeFileSync(join(target, 'meta.json'), JSON.stringify({ uri, user, pages: pages.map((p) => p.path), widths, date: new Date().toISOString() }, null, 2));
  await browser.close();
}

// Pairs the elements of two captures by their keys, like diff: the longest
// common subsequence of keys is compared. Between two such pairs, removed and
// added elements with the same tag are paired in their order as "replaced"
// (e.g. a link that got other classes), so their styles are compared as well;
// the rest counts as removed or added. Equal starts and ends are cut off
// first, so only the changed part of a page goes through the quadratic search.
function align(a, b) {
  let start = 0;
  while (start < a.length && start < b.length && a[start].key === b[start].key) {
    start++;
  }
  let endA = a.length;
  let endB = b.length;
  while (endA > start && endB > start && a[endA - 1].key === b[endB - 1].key) {
    endA--;
    endB--;
  }
  const pairs = [];
  for (let i = 0; i < start; i++) {
    pairs.push([i, i]);
  }
  const n = endA - start;
  const m = endB - start;
  // lengths[i][j]: longest common subsequence of a[start+i..] and b[start+j..]
  const lengths = new Uint32Array((n + 1) * (m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lengths[i * (m + 1) + j] = a[start + i].key === b[start + j].key
        ? lengths[(i + 1) * (m + 1) + j + 1] + 1
        : Math.max(lengths[(i + 1) * (m + 1) + j], lengths[i * (m + 1) + j + 1]);
    }
  }
  const removed = [];
  const added = [];
  const replaced = [];
  const tag = (element) => element.key.split(' > ').at(-1).match(/^[a-z0-9-]*/)[0];
  let gapA = [];
  let gapB = [];
  const flush = () => {
    let k = 0;
    for (const ib of gapB) {
      const found = gapA.findIndex((ia, x) => x >= k && tag(a[ia]) === tag(b[ib]));
      if (found === -1) {
        added.push(ib);
        continue;
      }
      removed.push(...gapA.slice(k, found));
      replaced.push([gapA[found], ib]);
      k = found + 1;
    }
    removed.push(...gapA.slice(k));
    gapA = [];
    gapB = [];
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[start + i].key === b[start + j].key) {
      flush();
      pairs.push([start + i, start + j]);
      i++;
      j++;
    } else if (lengths[(i + 1) * (m + 1) + j] >= lengths[i * (m + 1) + j + 1]) {
      gapA.push(start + i++);
    } else {
      gapB.push(start + j++);
    }
  }
  while (i < n) {
    gapA.push(start + i++);
  }
  while (j < m) {
    gapB.push(start + j++);
  }
  flush();
  pairs.push(...replaced);
  for (let k = 0; k < a.length - endA; k++) {
    pairs.push([endA + k, endB + k]);
  }
  return { pairs, removed, added, replaced: replaced.length };
}

function compare(beforeName, afterName, options) {
  const dirA = join(snapshotDir, beforeName);
  const dirB = join(snapshotDir, afterName);
  const groups = new Map();
  const details = [];
  let differences = 0;

  for (const file of readdirSync(dirA).filter((f) => /^\d+-\d+(-\d+)?\.json$/.test(f)).sort()) {
    const a = JSON.parse(readFileSync(join(dirA, file), 'utf8'));
    if (!existsSync(join(dirB, file))) {
      console.log(`${a.width}px ${a.path}: missing in ${afterName}`);
      differences++;
      continue;
    }
    const b = JSON.parse(readFileSync(join(dirB, file), 'utf8'));
    const label = `${a.width}px ${a.path}`;
    if (a.status !== b.status) {
      console.log(`${label}: HTTP ${a.status} -> ${b.status}`);
      differences++;
    }
    // After steps, a different page means the steps went another way.
    if (a.url !== b.url) {
      console.log(`${label}: ended on ${a.url} -> ${b.url}`);
      differences++;
    }
    const count = (groupKey, example) => {
      const group = groups.get(groupKey) || { count: 0, examples: [] };
      group.count++;
      if (group.examples.length < 3) {
        group.examples.push(example);
      }
      groups.set(groupKey, group);
    };
    // Same markup: elements are compared by position. Changed markup: by key,
    // added and removed elements are reported on their own.
    const sameMarkup = a.elements.length === b.elements.length
      && a.elements.every((ea, i) => ea.key === b.elements[i].key);
    const { pairs, removed, added, replaced } = sameMarkup
      ? { pairs: a.elements.map((_, i) => [i, i]), removed: [], added: [], replaced: 0 }
      : align(a.elements, b.elements);
    // Grouped by element, the pages are the examples.
    for (const i of removed) {
      count(`removed: ${a.elements[i].key}`, label);
      details.push({ label, key: a.elements[i].key, changes: [['element', 'present', 'removed']] });
    }
    for (const j of added) {
      count(`added: ${b.elements[j].key}`, label);
      details.push({ label, key: b.elements[j].key, changes: [['element', 'none', 'added']] });
    }
    let pageDiffs = 0;
    let moved = 0;
    pairs.forEach(([ia, ib]) => {
      const ea = a.elements[ia];
      const eb = b.elements[ib];
      const changes = [];
      for (const part of ['style', 'before', 'after']) {
        if (!ea[part] !== !eb[part]) {
          changes.push([`${part}`, ea[part] ? 'present' : 'none', eb[part] ? 'present' : 'none']);
          continue;
        }
        for (const prop in ea[part] || {}) {
          if (ea[part][prop] !== eb[part][prop]) {
            changes.push([part === 'style' ? prop : `::${part} ${prop}`, ea[part][prop], eb[part][prop]]);
          }
        }
      }
      // Size changes are reported, pure moves only counted (they follow other changes).
      if (Math.abs(ea.box[2] - eb.box[2]) > 0.5 || Math.abs(ea.box[3] - eb.box[3]) > 0.5) {
        changes.push(['size', `${ea.box[2]}x${ea.box[3]}`, `${eb.box[2]}x${eb.box[3]}`]);
      } else if (Math.abs(ea.box[0] - eb.box[0]) > 0.5 || Math.abs(ea.box[1] - eb.box[1]) > 0.5) {
        moved++;
      }
      if (ea.key !== eb.key) {
        changes.unshift(['replaced', ea.key, eb.key]);
      }
      for (const [prop, from, to] of changes) {
        count(`${prop}: ${from} -> ${to}`, prop === 'replaced' ? label : `${label}: ${ea.key}`);
      }
      if (changes.length) {
        pageDiffs++;
        details.push({ label, key: ea.key, changes });
      }
    });
    if (pageDiffs || moved || removed.length || added.length) {
      const markup = sameMarkup ? '' : `markup changed (${replaced} replaced, ${removed.length} removed, ${added.length} added), `;
      console.log(`${label}: ${markup}${pageDiffs} elements changed, ${moved} moved`);
      differences += pageDiffs + moved + removed.length + added.length;
    }
  }

  if (!differences) {
    console.log(`No differences between ${beforeName} and ${afterName}.`);
    return 0;
  }
  console.log('\nChanges, most frequent first:');
  for (const [groupKey, group] of [...groups].sort((x, y) => y[1].count - x[1].count)) {
    console.log(`${String(group.count).padStart(5)}  ${groupKey}\n       e.g. ${group.examples.join('\n            ')}`);
  }
  if (options.details) {
    console.log('\nAll changed elements:');
    for (const d of details) {
      console.log(`${d.label}: ${d.key}\n${d.changes.map(([p, f, t]) => `    ${p}: ${f} -> ${t}`).join('\n')}`);
    }
  }
  return 1;
}

const { positional: [command, ...names], options } = parseArgs(process.argv.slice(2));
if (command === 'capture' && names.length === 1) {
  await capture(names[0], options);
} else if (command === 'compare' && names.length === 2) {
  process.exitCode = compare(names[0], names[1], options);
} else {
  console.log('Usage: npm run style-diff -- capture <name> [--login-url <url>] [--uri <url>] [--pages <file>] [--widths 375,640,860,1280]\n'
    + '       npm run style-diff -- compare <before> <after> [--details]');
  process.exitCode = 2;
}
