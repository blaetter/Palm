/**
 * @file
 * Promo banner: closing it, and for logged in users keeping it closed.
 *
 * The theme settings choose the behaviour (data-promo-close): "page" closes it on the current page only; "day" keeps
 * it closed for logged in users on every page until the next day or until anything of it changes in the theme
 * settings (data-promo-key, a hash of all its settings). The day and the key are kept in the
 * localStorage of the browser; pages of anonymous users come from the page cache, so the server can not know who
 * closed it. Anonymous users close it on the current page only, as before.
 *
 * Loaded in the head: the hiding rule is added before the banner is drawn, so it does not flash.
 */
(function (Drupal, drupalSettings, once) {
  'use strict';

  var storageKey = 'palm.promoDismissed';

  function today() {
    var date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  function loggedIn() {
    return !!(drupalSettings.user && Number(drupalSettings.user.uid) > 0);
  }

  try {
    var saved = loggedIn() ? JSON.parse(window.localStorage.getItem(storageKey) || 'null') : null;
    if (saved && saved.day === today() && /^[0-9a-f]+$/.test(saved.key)) {
      var style = document.createElement('style');
      // Only for the behaviour "day" of the theme settings; with "page" the banner shows on every page.
      style.textContent = '.block--promo[data-promo-close="day"][data-promo-key="' + saved.key + '"]{display:none}';
      document.head.appendChild(style);
    }
  }
  catch (e) {
    // No localStorage (private mode, blocked): the banner shows as for anonymous users.
  }

  Drupal.behaviors.palmPromo = {
    attach: function (context) {
      once('palm-promo', '.block--promo', context).forEach(function (banner) {
        var close = banner.querySelector('.block--promo__close');
        if (!close) {
          return;
        }
        close.addEventListener('click', function () {
          if (banner.dataset.promoClose === 'day' && loggedIn() && banner.dataset.promoKey) {
            try {
              window.localStorage.setItem(storageKey, JSON.stringify({ key: banner.dataset.promoKey, day: today() }));
            }
            catch (e) {
              // Not kept, it shows again on the next page.
            }
          }
          banner.remove();
        });
      });
    }
  };
})(Drupal, drupalSettings, once);
