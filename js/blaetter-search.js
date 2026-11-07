/**
 * @file
 * Search with Search API and facets (/suche).
 *
 * - The sorting applies on change, keeping the search term and the facets
 *   (without JavaScript with the button, which drops the facets).
 * - From 1420px the filters (heading, sorting and facets) move into the left
 *   column of the page grid, where they stay in view while scrolling
 *   (blaetter-search.css). Below, they go back between the search field and
 *   the results. The sorting stays part of the search form through its form
 *   attribute. Without JavaScript they stay in the content column and are
 *   moved into the left column by CSS (without staying in view).
 * - For logged in users BigPipe delivers the facets after the page, also after
 *   this script. They therefore move in a box together with their placeholders,
 *   so a facet that arrives late takes its place in the box.
 * - On phones the filters fold into one line (a details element): a small
 *   timeline, "Filter (n)" and the active filters in words. Opened, it shows
 *   the sorting and the facets with "Treffer zeigen" and "Filter
 *   zurücksetzen". Each filter loads the page again; when it was changed in
 *   the opened line, the line opens again, so several filters can be set one
 *   after another. Without JavaScript all filters stay visible.
 * The widths are the breakpoints of blaetter-design (css/blaetter-tokens.css).
 */
(function (Drupal, once) {
  'use strict';

  var media = function (name, fallback) {
    var value = getComputedStyle(document.documentElement).getPropertyValue('--blaetter-media-' + name).trim();
    return window.matchMedia(value || fallback);
  };
  var wide = media('wide', '(min-width: 88.75rem)');
  var phone = media('phone', '(max-width: 45rem)');

  // A filter changed in the opened line: open it again after the page loaded
  // (only shortly after, so a later visit of the search starts closed).
  var reopenKey = 'palm-blaetter-search-filters-open';
  var reopenWithin = 30000;
  var markReopen = function () {
    try {
      window.sessionStorage.setItem(reopenKey, String(Date.now()));
    }
    catch (e) {
      // Storage unavailable: the line just stays closed.
    }
  };
  var takeReopen = function () {
    try {
      var since = Number(window.sessionStorage.getItem(reopenKey));
      window.sessionStorage.removeItem(reopenKey);
      return since > 0 && Date.now() - since < reopenWithin;
    }
    catch (e) {
      return false;
    }
  };

  Drupal.behaviors.palmBlaetterSearchSort = {
    attach: function (context) {
      once('palm-blaetter-search-sort', '.blaetter-search-sort select', context).forEach(function (select) {
        // Only the sorting changes: the facets are not part of the form, but of
        // the URL (f[]), so the form would lose them. Starts at the first page.
        select.addEventListener('change', function () {
          var url = new URL(window.location.href);
          url.searchParams.set(select.name, select.value);
          url.searchParams.delete('page');
          window.location.href = url.toString();
        });
      });
    }
  };

  // Without JavaScript every facet is a closed details element with a summary
  // (facets-item-list--dropdown.html.twig). With it the facet stands open
  // without the summary: the select list, the autocomplete or the timeline of
  // the other scripts replace the links inside it.
  Drupal.behaviors.palmBlaetterSearchFacetsOpen = {
    attach: function (context) {
      once('palm-blaetter-search-facet', 'details.blaetter-search-facet', context).forEach(function (details) {
        details.open = true;
        details.classList.add('is-enhanced');
      });
    }
  };

  Drupal.behaviors.palmBlaetterSearchFilters = {
    attach: function (context) {
      once('palm-blaetter-search-filters', '.blaetter-search-filters', context).forEach(function (filters) {
        var form = filters.closest('form');
        var column = document.querySelector('main .grid > .grid__item.two-tenths');
        if (!form || !column) {
          return;
        }
        filters.querySelectorAll('select').forEach(function (select) {
          select.setAttribute('form', form.id);
        });
        var facets = document.querySelectorAll('.block-facet--dropdown, [data-big-pipe-placeholder-id*="palm_facet_"]');
        var box = document.createElement('div');
        if (facets.length) {
          facets[0].parentNode.insertBefore(box, facets[0]);
          facets.forEach(function (facet) {
            box.appendChild(facet);
          });
        }
        // Where the parts stand in the content column.
        var places = [filters, box].map(function (element) {
          return { element: element, parent: element.parentNode, next: element.nextSibling };
        });
        var aside = document.createElement('div');
        aside.className = 'blaetter-search-aside';
        var compact = buildCompact(box);

        var place = function () {
          if (wide.matches) {
            places.forEach(function (item) {
              aside.appendChild(item.element);
            });
            column.appendChild(aside);
            compact.details.remove();
            document.body.classList.add('blaetter-search-has-aside');
          }
          else if (phone.matches) {
            places.forEach(function (item) {
              compact.body.insertBefore(item.element, compact.actions);
            });
            // Outside of the search form (where the facets stand), so Enter in
            // a facet field does not send the search; the sorting stays part of
            // the form through its form attribute.
            var anchor = places[1].parent ? places[1] : places[0];
            anchor.parent.insertBefore(compact.details, anchor.next);
            aside.remove();
            document.body.classList.remove('blaetter-search-has-aside');
          }
          else {
            places.forEach(function (item) {
              item.parent.insertBefore(item.element, item.next);
            });
            aside.remove();
            compact.details.remove();
            document.body.classList.remove('blaetter-search-has-aside');
          }
        };
        place();
        wide.addEventListener('change', place);
        phone.addEventListener('change', place);
        if (takeReopen()) {
          compact.details.open = true;
        }
        // After the behaviors of the module (timeline, autocomplete).
        window.setTimeout(compact.refresh, 0);
        Drupal.blaetterSearchCompact = compact;
      });

      // Facets that BigPipe delivers later: the line shows them as well (after
      // the behaviors of the module have built the timeline).
      if (Drupal.blaetterSearchCompact && context !== document) {
        window.setTimeout(Drupal.blaetterSearchCompact.refresh, 0);
      }
    }
  };

  /**
   * The folded line of the filters on phones: a details element whose summary
   * shows a small copy of the timeline, "Filter (n)" and the active filters.
   */
  function buildCompact(box) {
    var details = document.createElement('details');
    details.className = 'blaetter-search-compact';
    details.innerHTML =
      '<summary class="blaetter-search-compact__summary">' +
        '<span class="blaetter-search-compact__mini" aria-hidden="true"></span>' +
        '<span class="blaetter-search-compact__text"><strong>Filter<span class="blaetter-search-compact__count"></span></strong>' +
        ' <span class="blaetter-search-compact__active"></span></span>' +
      '</summary>' +
      '<div class="blaetter-search-compact__body">' +
        '<div class="blaetter-search-compact__actions">' +
          '<button type="button" class="palm-button palm-button--primary blaetter-search-compact__show">Treffer zeigen</button>' +
          '<a class="blaetter-search-compact__reset" href="#">Filter zurücksetzen</a>' +
        '</div>' +
      '</div>';
    var summary = details.querySelector('.blaetter-search-compact__summary');
    var body = details.querySelector('.blaetter-search-compact__body');
    var actions = details.querySelector('.blaetter-search-compact__actions');
    var reset = details.querySelector('.blaetter-search-compact__reset');

    // Every filter loads the page; changed in the opened line, it opens again.
    ['change', 'click'].forEach(function (type) {
      body.addEventListener(type, function (event) {
        if (!actions.contains(event.target)) {
          markReopen();
        }
      }, true);
    });
    body.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        markReopen();
      }
    }, true);

    details.querySelector('.blaetter-search-compact__show').addEventListener('click', function () {
      details.open = false;
      var results = document.querySelector('.view-blaetter-search');
      if (results) {
        results.scrollIntoView({ block: 'start' });
      }
      summary.focus();
    });

    var refresh = function () {
      var parts = [];
      var count = 0;

      // Years: the selection as the timeline names it ("2001–2009 · 1.234 Treffer").
      var year = box.querySelector('.block-facet--dropdown.facet-active .year-timeline__summary');
      if (year) {
        parts.push(year.textContent.split(' · ')[0]);
        count++;
      }
      // Authors and topics: the active entries of the facet links.
      box.querySelectorAll('.block-facet--dropdown .facet-item a.is-active .facet-item__value').forEach(function (value) {
        if (!value.closest('#block-palm-facet-year')) {
          parts.push(value.textContent.trim());
          count++;
        }
      });
      var sort = document.querySelector('.blaetter-search-sort select');
      if (sort && sort.selectedIndex > 0) {
        parts.push(sort.options[sort.selectedIndex].text);
      }

      details.querySelector('.blaetter-search-compact__count').textContent = count ? ' (' + count + ')' : '';
      details.querySelector('.blaetter-search-compact__active').textContent = parts.length ? parts.join(' · ') : 'Jahre, Autor:innen, Themen, Sortierung';

      // The small timeline: a copy of the bars without their interaction.
      var mini = details.querySelector('.blaetter-search-compact__mini');
      var bars = box.querySelector('.year-timeline__bars');
      mini.textContent = '';
      if (bars) {
        var copy = bars.cloneNode(true);
        copy.className = 'blaetter-search-compact__bars';
        copy.querySelectorAll('.year-timeline__tip').forEach(function (tip) {
          tip.remove();
        });
        mini.appendChild(copy);
      }

      // Reset: the search term and the sorting stay, all facets go.
      var url = new URL(window.location.href);
      Array.from(url.searchParams.keys()).filter(function (key) {
        return key === 'f' || key.indexOf('f[') === 0;
      }).forEach(function (key) {
        url.searchParams.delete(key);
      });
      url.searchParams.delete('page');
      reset.href = url.toString();
      reset.hidden = count === 0;
    };

    // The timeline draws its bars again when its width changes (joined to five
    // or ten years in narrow places): the small copy follows.
    box.addEventListener('blaetter-search-timeline-drawn', refresh);

    return { details: details, body: body, actions: actions, refresh: refresh };
  }
})(Drupal, once);
