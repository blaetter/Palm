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
 */
(function (Drupal, once) {
  'use strict';

  var wide = window.matchMedia('(min-width: 88.75rem)');

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

        var place = function () {
          if (wide.matches) {
            places.forEach(function (item) {
              aside.appendChild(item.element);
            });
            column.appendChild(aside);
            document.body.classList.add('blaetter-search-has-aside');
          }
          else {
            places.forEach(function (item) {
              item.parent.insertBefore(item.element, item.next);
            });
            aside.remove();
            document.body.classList.remove('blaetter-search-has-aside');
          }
        };
        place();
        wide.addEventListener('change', place);
      });
    }
  };
})(Drupal, once);
