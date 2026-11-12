/**
 * @file
 * Theme settings: swatches, live preview and contrast of the promo banner colours.
 *
 * The preview follows the colour fields, the graphic, the title and the description while editing, without saving the form. The
 * contrast is calculated after WCAG 2.2 like palm_contrast_ratio() in palm.theme, which warns on saving.
 */
(function (Drupal, drupalSettings, once) {
  'use strict';

  function luminance(hex) {
    var channels = [1, 3, 5].map(function (i) {
      var c = parseInt(hex.substr(i, 2), 16) / 255;
      return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  }

  function contrast(a, b) {
    var values = [luminance(a), luminance(b)];
    return (Math.max.apply(null, values) + 0.05) / (Math.min.apply(null, values) + 0.05);
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) {
      node.className = className;
    }
    if (text) {
      node.textContent = text;
    }
    return node;
  }

  Drupal.behaviors.palmPromoSettings = {
    attach: function (context) {
      once('palm-promo-settings', '.palm-promo-settings', context).forEach(function (container) {
        var form = container.closest('form');
        var background = container.querySelector('[data-palm-promo-color="background"]');
        var text = container.querySelector('[data-palm-promo-color="text"]');
        var title = form.querySelector('[name="palm_promo_banner_title"]');
        var description = form.querySelector('[name="palm_promo_banner_description"]');
        var graphic = form.querySelector('[name="palm_promo_banner_theme"]');
        var image = form.querySelector('[name="palm_promo_banner_image_url"]');
        if (!background || !text) {
          return;
        }
        var swatches = (drupalSettings.palmPromoSettings || {}).swatches || {};

        // Swatches of blaetter-design after each colour field.
        [background, text].forEach(function (input) {
          var list = element('div', 'palm-promo-settings__swatches');
          list.setAttribute('role', 'group');
          list.setAttribute('aria-label', Drupal.t('Colours of the design system'));
          Object.keys(swatches).forEach(function (name) {
            var swatch = element('button', 'palm-promo-settings__swatch');
            swatch.type = 'button';
            swatch.style.background = swatches[name];
            swatch.title = name + ' ' + swatches[name];
            swatch.setAttribute('aria-label', name + ' ' + swatches[name]);
            swatch.addEventListener('click', function () {
              input.value = swatches[name];
              update();
            });
            list.append(swatch);
          });
          input.closest('.form-item').append(list);
        });

        // The preview: the banner as on a desktop of 1280px, in proportion to the width of the form
        // (css/promo-settings.css), so the graphic and the text sit as on the page.
        var preview = element('div', 'palm-promo-settings__preview');
        var frame = element('div', 'palm-promo-settings__frame');
        var banner = element('div', 'palm-promo-settings__banner');
        var close = element('span', 'palm-promo-settings__close');
        close.setAttribute('aria-hidden', 'true');
        var previewTitle = element('div', 'palm-promo-settings__title');
        var previewText = element('div', 'palm-promo-settings__text');
        banner.append(close, previewTitle, previewText);
        // The image of the banner (only on wide screens on the page): 256px wide, 128px from the right edge of the
        // page, its foot 41px below the window, so it reaches above the bar; the frame grows by that part.
        var previewImage = element('img', 'palm-promo-settings__image');
        previewImage.alt = '';
        frame.append(banner, previewImage);
        var fitImage = function () {
          var unit = frame.clientWidth / 1280;
          var above = previewImage.hidden ? 0 : previewImage.offsetHeight - 161 * unit;
          frame.style.paddingTop = Math.max(0, above) + 'px';
        };
        previewImage.addEventListener('load', fitImage);
        previewImage.addEventListener('error', function () {
          previewImage.hidden = true;
          fitImage();
        });
        if (window.ResizeObserver) {
          new ResizeObserver(fitImage).observe(frame);
        }
        var result = element('p', 'palm-promo-settings__result');
        result.setAttribute('aria-live', 'polite');
        preview.append(element('p', 'palm-promo-settings__label', Drupal.t('Preview')), frame, result);
        container.append(preview);

        function update() {
          var bg = background.value.toLowerCase();
          var fg = text.value.toLowerCase();
          banner.style.setProperty('--palm-promo-background', bg);
          banner.style.setProperty('--palm-promo-text', fg);
          previewTitle.textContent = (title && title.value) || Drupal.t('Title');
          banner.dataset.graphic = graphic ? graphic.value : 'standard';
          var src = image ? image.value.trim() : '';
          if (src !== previewImage.getAttribute('src')) {
            previewImage.hidden = !src;
            if (src) {
              previewImage.src = src;
            }
            else {
              previewImage.removeAttribute('src');
            }
            fitImage();
          }
          // The description may hold <br>; shown as plain text with line breaks.
          previewText.textContent = ((description && description.value) || Drupal.t('Description')).replace(/<br\s*\/?>/gi, '\n');
          var ratio = contrast(bg, fg);
          // Rounded down, so 4.497 does not read as 4.50; with the decimal separator of the page language.
          var rounded = (Math.floor(ratio * 100) / 100).toLocaleString(document.documentElement.lang || undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          var verdict;
          if (ratio >= 4.5) {
            verdict = Drupal.t('Good: enough for the title and the text (WCAG 2.2 AA, at least 4.5:1).');
            result.dataset.level = 'ok';
          }
          else if (ratio >= 3) {
            verdict = Drupal.t('Too low for the text, only enough for the large title (at least 3:1). Saving shows a warning.');
            result.dataset.level = 'warning';
          }
          else {
            verdict = Drupal.t('Too low: hard to read for many people. Saving shows a warning.');
            result.dataset.level = 'error';
          }
          result.textContent = Drupal.t('Contrast @ratio:1.', { '@ratio': rounded }) + ' ' + verdict;
        }

        [background, text, title, description, graphic, image].forEach(function (input) {
          if (input) {
            input.addEventListener('input', update);
            input.addEventListener('change', update);
          }
        });
        update();
      });
    }
  };
})(Drupal, drupalSettings, once);
