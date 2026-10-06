/**
 * Style diff: regression test for CSS refactorings.
 *
 * Captures the computed styles and boxes of all elements (including ::before
 * and ::after) of a list of pages of the local site in two viewport widths, and
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
 *   --widths <list>   Viewport widths, default 1280,375
 *   --login-url <url> One-time login link (drush user:login) to capture the
 *                     pages as that user; the Makefile creates it for ROLE
 *   --role-label <s>  Role of that user, only stored in meta.json
 *
 * Browser: the Chromium of the Playwright image (container), otherwise
 * STYLE_DIFF_BROWSER (path to a Chromium based browser), Chrome or Edge.
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
      options[key] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
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

async function capture(name, options) {
  const uri = (options.uri || 'https://web.blaetter').replace(/\/$/, '');
  const pagesFile = options.pages || join(here, 'pages.txt');
  const pages = readFileSync(pagesFile, 'utf8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  const widths = String(options.widths || '1280,375').split(',').map(Number);
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
    user = { role: options['role-label'] || 'unknown' };
  }

  // Warm up Drupal's caches: a page rendered for the first time can differ in
  // details (e.g. the is-active class of links) from cached deliveries.
  for (const path of pages) {
    await page.request.get(uri + path);
  }

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    for (const [index, path] of pages.entries()) {
      const response = await page.goto(uri + path, { waitUntil: 'networkidle' });
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
      const elements = await page.evaluate(snapshotPage, PROPERTIES);
      const file = `${width}-${String(index + 1).padStart(2, '0')}.json`;
      writeFileSync(join(target, file), JSON.stringify({ path, width, status: response.status(), elements }));
      console.log(`${name}: ${width}px ${path} (${response.status()}, ${elements.length} elements)`);
    }
  }
  writeFileSync(join(target, 'meta.json'), JSON.stringify({ uri, user, pages, widths, date: new Date().toISOString() }, null, 2));
  await browser.close();
}

function compare(beforeName, afterName, options) {
  const dirA = join(snapshotDir, beforeName);
  const dirB = join(snapshotDir, afterName);
  const groups = new Map();
  const details = [];
  let differences = 0;

  for (const file of readdirSync(dirA).filter((f) => /^\d+-\d+\.json$/.test(f)).sort()) {
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
    if (a.elements.length !== b.elements.length) {
      console.log(`${label}: markup changed (${a.elements.length} -> ${b.elements.length} elements), not comparable`);
      differences++;
      continue;
    }
    let pageDiffs = 0;
    let moved = 0;
    a.elements.forEach((ea, i) => {
      const eb = b.elements[i];
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
      for (const [prop, from, to] of changes) {
        const groupKey = `${prop}: ${from} -> ${to}`;
        const group = groups.get(groupKey) || { count: 0, examples: [] };
        group.count++;
        if (group.examples.length < 3) {
          group.examples.push(`${label}: ${ea.key}`);
        }
        groups.set(groupKey, group);
      }
      if (changes.length) {
        pageDiffs++;
        details.push({ label, key: ea.key, changes });
      }
    });
    if (pageDiffs || moved) {
      console.log(`${label}: ${pageDiffs} elements changed, ${moved} moved`);
      differences += pageDiffs + moved;
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
  console.log('Usage: npm run style-diff -- capture <name> [--login-url <url>] [--uri <url>] [--pages <file>] [--widths 1280,375]\n'
    + '       npm run style-diff -- compare <before> <after> [--details]');
  process.exitCode = 2;
}
