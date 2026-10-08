# Palm

Drupal theme of [www.blaetter.de](https://www.blaetter.de) (»Blätter für deutsche und internationale Politik«). It is installed with Composer as `drupal/palm` into the project blaetter.web (`web/themes/contrib/palm`). It is developed and tested with Drupal 11.4; the components use SDC variants, older Drupal versions are not supported.

The theme is in transition from a Patternlab based styleguide to single directory components:

- **Legacy styles:** `bundle/palm.css` and `bundle/palm.js` are built in the styleguide repository [blaetter-theme](https://github.com/blaetter/blaetter-theme) (Patternlab, Sass, webpack) and copied into `bundle/`. Do not edit them here.
- **Components:** new markup and CSS live in `components/` as [single directory components](https://www.drupal.org/docs/develop/theming-drupal/using-single-directory-components) (SDC). [Storybook](https://storybook.js.org/) renders them through Drupal as a living styleguide.

## Structure

| Path | Content |
|---|---|
| `bundle/` | Legacy CSS/JS and fonts from blaetter-theme (generated, do not edit) |
| `components/` | Single directory components, grouped like atomic design (`atoms/`, `molecules/`) |
| `css/layers.css` | Order of the cascade layers |
| `css/tokens.css` | Design tokens as CSS custom properties |
| `css/drupal-layer.css` | CSS of core, Classy and modules in the layer `legacy` (generated) |
| `css/captcha.css` | ALTCHA widget (custom properties, label) and the CAPTCHA box of administrators |
| `templates/` | Drupal templates; they pass data to the components (`templates/form/` renders the fields and buttons of all Drupal forms with the form atoms and `palm:button`) |
| `scripts/` | Build scripts (`build-drupal-layer.mjs`) |
| `tests/style-diff/` | Regression test for CSS changes |
| `.storybook/` | Storybook configuration |
| `docker-compose.yml`, `Makefile` | Development environment, see below |

## CSS architecture

All CSS of the frontend lives in [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer). Later layers win, regardless of selector specificity:

1. `legacy`: first the CSS of Drupal core, Classy and the modules the frontend loads (`css/drupal-layer.css`), then `bundle/palm.css` (wrapped into the layer by blaetter-theme). Within this layer, specificity and order decide exactly as before the layers, so e.g. a more specific Classy rule still wins over `palm.css`. The original files are removed via `libraries-override` in `palm.info.yml`, because CSS outside of any layer always wins over layered CSS.
2. `components`: the CSS of the components in `components/`.

Only the tokens (`css/tokens.css`), `@property` rules and the CSS of the admin UI are outside of a layer. Toolbar, contextual links, shortcuts and Devel only load for editors and administrators and only style their own elements; a comparison as administrator showed no differences, so they stay unlayered (they win over the theme, keep that in mind for components near them). When a new module brings CSS to the frontend, add it to `scripts/build-drupal-layer.mjs` (in the order Drupal loads it) and to `libraries-override`, otherwise it wins over the theme. Libraries with JavaScript or extended by Classy only lose their CSS files there; files that Stable replaced are given with their Stable path (`/themes/contrib/stable/…`).

Components are configured by their context through custom properties instead of contextual selectors:

- `palm:button`: the button or a parent may set `--palm-button-padding`, `--palm-button-radius`, `--palm-button-display` and `--palm-button-white-space` (inherited), the button itself may get `--palm-button-space-after` (not inherited, see `@property` in `button.css`); for the primary variant also `--palm-button-font-weight`.
- `palm:input`, `palm:select`, `palm:textarea`: the field or a parent may set `--palm-field-width`, `--palm-field-max-width`, `--palm-field-height`, `--palm-field-border` and `--palm-field-padding`.
- `palm:search-form` (molecule of `palm:input` and `palm:button`): a parent may set `--palm-search-form-height`, `--palm-search-form-color` and `--palm-search-form-font-size`; the molecule configures its field and button through their properties. Drupal's search forms (header block and search page) do not use its template: `palm_form_alter()` gives them the classes of the molecule and attaches its library, so keep the structure of `search-form.twig` and the alter in sync.

Legacy rules in blaetter-theme set these properties where buttons and fields used to be adjusted by context (e.g. header, search form, form actions, cart quantity, cookie banner). Buttons take the font of their context, like the legacy buttons.

### Templates of modules

Palm overrides templates of modules and uses components in them: the cookie banner of EU Cookie Compliance (`templates/content/eu_cookie_compliance_*.html.twig`) and the embed block of blaetter_formatters (`templates/content/blaetter_embed_block.html.twig`). After updates of these modules, compare the templates with the module versions. Their JavaScript finds the buttons by classes (`agree-button`, `eu-cookie-compliance-save-preferences-button`, `blaetter-embed-consent`, …), so keep these classes. EU Cookie Compliance renders the banner into a string for `drupalSettings`; therefore `palm.info.yml` attaches the button library to the banner library with `libraries-extend`.

The ALTCHA widget of the captcha injects its own CSS outside of any layer, so it wins over the theme. Palm does not override it but sets the custom properties the widget reads (`--altcha-color-base`, `--altcha-color-border`, `--altcha-border-radius`, `--altcha-max-width`, …) and styles its label in `css/captcha.css`. Administrators who skip the CAPTCHA see a box with links instead (`details.captcha-admin-links`), styled in the same file. The CAPTCHA module attaches no library to that box, so `css/captcha.css` is a global library of the theme.

## Requirements

- The project blaetter.web with the local site on `https://web.blaetter` (MAMP).
- Docker Desktop.
- PHP 8 in `PATH` for Drush on the host (`vendor/bin/drush` of the project).
- For Storybook, in the project: the dev dependency `drupal/storybook` (enabled through the config split `dev`) and in `web/sites/default/services.yml` (local only, never on live):

  ```yaml
  parameters:
    storybook.development: true
    cors.config:
      enabled: true
      allowedHeaders: ['*']
      allowedMethods: ['GET']
      allowedOrigins: ['http://localhost:6006']
  ```

## Docker environment

npm and every npm package run only in containers, never on the host. Packages from the npm registry are a known attack vector (install scripts and code that runs with the rights of the user), so they get no access to SSH keys, credentials or the site configuration.

| Service | Image | Purpose |
|---|---|---|
| `node` | `node:24-bookworm-slim` | npm, build scripts, shell |
| `storybook` | `node:24-bookworm-slim` | Storybook dev server on `127.0.0.1:6006` |
| `playwright` | `mcr.microsoft.com/playwright` (same version as `playwright-core`) | style diff with Chromium; `web.blaetter` points to the host |

What the containers see:

- the theme (read and write) at `/web/themes/contrib/palm`,
- `web/core`, `web/modules/contrib` and `web/themes/contrib` (read only, for `scripts/build-drupal-layer.mjs`),
- `node_modules` in the Docker volume `palm_node_modules`; the folder on the host is only the empty mount point.

Not available: the home directory, SSH keys, the Docker socket and `web/sites` (`settings.php`). Packages are installed from `package-lock.json` without install scripts. Code in the containers can still change files of the theme, so check `git diff` before committing.

Drush stays on the host. For tasks that need it, the Makefile runs Drush and passes only the result to the container.

## Make targets

Run them in the theme directory; `make help` lists them.

| Target | Runs | Purpose |
|---|---|---|
| `make install` | container | install `node_modules` from `package-lock.json` (first setup, after lockfile changes) |
| `make storybook` | container | Storybook on http://localhost:6006 |
| `make stories` | host (Drush) | compile `*.stories.twig` to `*.stories.json` |
| `make drupal-layer` | container | rebuild `css/drupal-layer.css` |
| `make style-capture NAME=<name> [ROLE=<role>]` | container (Drush on the host for the test user and the cleanup) | capture the computed styles of the test pages; with `ROLE` as the local test user `styletest` |
| `make style-compare A=<name> B=<name> [DETAILS=1]` | container | compare two captures |
| `make shell` | container | shell in the `node` container |

First setup: `make install`, then `make stories` and `make storybook`.

## Workflows

### Change legacy styles

1. Edit the Sass in blaetter-theme (`source-bundle/scss/`), the project has it in `layout/`.
2. Build it in its container: `docker exec -u app layout-www-1 make`.
3. In the project root: `make palm-update` (copies `layout/export/bundle/` into `bundle/` and rebuilds the cache).
4. Commit blaetter-theme and the changed `bundle/` here.

### Add or change a component

1. Create `components/<group>/<name>/` with `<name>.component.yml` (schema of the props, variants), `<name>.twig`, `<name>.css` (inside `@layer components { … }`) and `<name>.stories.twig`.
2. Use only design tokens from `css/tokens.css`; add missing ones there.
3. `make stories`, then check it in Storybook (`make storybook`).
4. Use it in templates with `{{ include('palm:<name>', { … }, with_context = false) }}`.
5. Check the pages with the style diff (next section), also logged in if the template has content for users.
6. Remove legacy styles only after no template uses them any more (check templates, modules and `config/sync`).

### Check a CSS change with the style diff

```bash
make style-capture NAME=before
# change templates or CSS, rebuild if needed
make style-capture NAME=after
make style-compare A=before B=after
```

Each capture starts with `drush cache:rebuild`, so no markup or CSS from earlier changes or roles is left in the caches. The test loads the pages of `tests/style-diff/pages.txt` in 375, 640, 860 and 1280 px (one width per range in which forms, buttons or the CSS of Drupal and modules change: breakpoints at 600, 720 and 1000 px; the other breakpoints only hold layout rules of the legacy styles), waits for JavaScript, fonts and images, and records about 100 CSS properties and the box of every element (including `::before` and `::after`). It reports changed properties and sizes; elements that only moved are counted. `ROLE=onlineabonnent` (or `ROLE=administrator` to include toolbar, contextual links and tabs) captures the pages logged in as the local test user `styletest` (mail `styletest@example.invalid`, a test address and exactly that role), which `tests/style-diff/drush/test-user.php` creates or updates; real customer accounts are not used. Only the resting state is captured, not `:hover` or `:focus`.

Page list (`tests/style-diff/pages.txt`): `{uid}` stands for the logged-in user; flags after `#` restrict pages: `anonymous` (only without login), `login` (only with login), `fresh` (new session with an empty cart, only without login).

Cart and checkout: the list adds items to the cart and opens the checkout steps up to the address form (login step, guest, registration, logged-in user). Visiting them creates carts and orders. `make style-capture` removes all carts and not completed orders of `styletest` before and after the capture, so every capture starts with an empty cart, also after an interrupted one. It stores the highest ids before the capture and afterwards also deletes the carts and not completed orders of anonymous users created in between (`tests/style-diff/drush/cleanup.php`), together with their items, order products and history. With `ROLE`, the capture stops with a message if the test user or its login link can not be created. Carts of anonymous visitors of the local site during a capture are removed as well. Never add pages that submit forms; the payment step needs a submitted address form and is checked by hand. Captures are stored in `tests/style-diff/snapshots/` (not in git); compare only captures taken with the same environment.

### After updates of core, Classy, EU Cookie Compliance or CAPTCHA

Run `make drupal-layer` and commit `css/drupal-layer.css` if it changed. Check the CSS libraries of the frontend for new module CSS (see CSS architecture).

### Add an npm package

```bash
make shell
npm install --save-dev --ignore-scripts <package>
```

Commit `package.json` and `package-lock.json` and check the new entries of the lockfile.

## Deployment

The project blaetter.web installs Palm with Composer. While a theme branch is not merged, the project requires it as `drupal/palm:dev-<branch>`; after merging into `master` it goes back to `dev-master`. Live only needs the files of the repository: `bundle/`, `css/`, `components/` and `templates/` are committed, `node_modules`, Storybook and the style diff are only for development. `drupal/storybook` must not be enabled on live.

## Troubleshooting

- **Storybook shows "Failed to fetch":** check `storybook.development` and `cors.config` in `services.yml`, run `drush cr`, and open `https://web.blaetter` once in the browser to accept the local certificate.
- **`make install` fails with permission errors:** the volume `palm_node_modules` belongs to root; `make install` hands it over first. Remove the volume with `docker volume rm palm_node_modules` to start from scratch.
- **The style diff cannot reach `web.blaetter`:** the container resolves it to the host (`host-gateway`); MAMP must accept connections from Docker.
- **The style diff reports differences without any change:** compare only captures of the same environment; first captures after `drush cr` are fine, the test warms up the caches.
