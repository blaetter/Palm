!function(r){function e(e){for(var t,n,o=e[0],a=e[1],s=0,i=[];s<o.length;s++)n=o[s],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&i.push(l[n][0]),l[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(r[t]=a[t]);for(c&&c(e);i.length;)i.shift()()}var n={},d={0:0},l={0:0};function p(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return r[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.e=function(u){var e=[];d[u]?e.push(d[u]):0!==d[u]&&{3:1}[u]&&e.push(d[u]=new Promise(function(e,n){for(var t={2:"31d6cfe0d16ae931b73c",3:"061cfd957976f661e112"}[u]+".css",o=p.p+t,a=document.getElementsByTagName("link"),s=0;s<a.length;s++){var i=(r=a[s]).getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===t||i===o))return e()}for(var r,l=document.getElementsByTagName("style"),s=0;s<l.length;s++)if((i=(r=l[s]).getAttribute("data-href"))===t||i===o)return e();var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onload=e,c.onerror=function(e){var t=e&&e.target&&e.target.src||o,e=new Error("Loading CSS chunk "+u+" failed.\n("+t+")");e.request=t,delete d[u],c.parentNode.removeChild(c),n(e)},c.href=o,document.getElementsByTagName("head")[0].appendChild(c)}).then(function(){d[u]=0}));var o,a,t,s,n,i=l[u];return 0!==i&&(i?e.push(i[2]):(n=new Promise(function(e,t){i=l[u]=[e,t]}),e.push(i[2]=n),(o=document.createElement("script")).charset="utf-8",o.timeout=120,p.nc&&o.setAttribute("nonce",p.nc),o.src=p.p+""+({}[n=u]||n)+"-"+{2:"fddcfd14a2b0d2053661",3:"6d8eedeeb99251b34a82"}[n]+".js",a=new Error,t=function(e){o.onerror=o.onload=null,clearTimeout(s);var t,n=l[u];0!==n&&(n&&(t=e&&("load"===e.type?"missing":e.type),e=e&&e.target&&e.target.src,a.message="Loading chunk "+u+" failed.\n("+t+": "+e+")",a.name="ChunkLoadError",a.type=t,a.request=e,n[1](a)),l[u]=void 0)},s=setTimeout(function(){t({type:"timeout",target:o})},12e4),o.onerror=o.onload=t,document.head.appendChild(o))),Promise.all(e)},p.m=r,p.c=n,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)p.d(n,o,function(e){return t[e]}.bind(null,o));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/themes/contrib/palm/bundle/",p.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var c=o;p(p.s=8)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";function o(){window.__webpack_public_path__="/themes/contrib/palm/bundle/"}n.d(t,"a",function(){return o})},function(e,a,s){"use strict";(function(e){s.d(a,"b",function(){return t}),s.d(a,"a",function(){return o});var n=s(1);function t(t){if(!e(".swiper").length)return!1;n.a(),s.e(3).then(s.t.bind(null,12,7)),s.e(2).then(s.t.bind(null,13,7)).then(function(e){t(e.default)}).catch(function(e){console.log(e)})}function o(e){new e(".swiper.archive-index",{grabCursor:!0,slideToClickedSlide:!1,direction:"horizontal",slidesPerView:6,slidesPerGroup:5,spaceBetween:24,slidesOffsetBefore:12,slidesOffsetAfter:12,loop:!1,preloadImages:!1,touchReleaseOnEdges:!0,autoHeight:!0,touchEventsTarget:"wrapper",watchOverflow:!0,wrapperClass:"view-content",freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1200:{slidesPerView:3,slidesPerGroup:3},720:{slidesPerView:2,slidesPerGroup:2},420:{slidesPerView:2,slidesPerGroup:2}}})}}).call(this,s(0))},function(e,t,n){"use strict";(function(s){t.a=function(){s(".js-collapse-me").each(function(){var e=s(this),t=s(this).data("opentext")||"Öffnen",n=s(this).data("closetext")||"Schließen";e.wrapInner('<span class="js-collapse-me-inner"></span> '),e.prepend('<span class="js-collapse-me-toggler" title="">'+t+"</span>"),e.show(),s(".js-collapse-me-toggler",this).click(function(){e.toggleClass("opened"),e.hasClass("opened")?s(".js-collapse-me-toggler",e).html(n):s(".js-collapse-me-toggler",e).html(t)})}),s(".js-simple-toggler").each(function(){var e=s(this),t=s(this).data("target"),n=s(this).data("opentext"),o=s(this).data("closetext"),a=s(this).data("allowtoggle");s(t).hasClass("display-block")?o&&e.html(o):(s(t).addClass("display-none"),n&&e.html(n)),e.click(function(){s(t).hasClass("display-block")?(s(t).removeClass("display-block"),s(t).addClass("display-none"),e.html(n)):(s(t).removeClass("display-none"),s(t).addClass("display-block"),e.html(o)),0==a&&e.remove()})})}}).call(this,n(0))},function(e,t,n){"use strict";(function(o){n.d(t,"a",function(){return e});n(1);function e(){var t=o(".js-hamburger"),n=o("#navigation-primary");t.click(function(e){return e.preventDefault(),o(this).hasClass("opened")?(o(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),n.removeClass("opened")):(o(this).addClass("opened").attr("aria-label","Navigation zuklappen"),n.addClass("opened"),o("body").click(function(e){0==o(e.target).parents("#navigation-primary").length&&t.hasClass("opened")&&t.click()}),o(document).keyup(function(e){27==e.keyCode&&t.hasClass("opened")&&t.click()})),!1})}}).call(this,n(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-search"),t=n("#page-search");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Suche aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Suche zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,n){"use strict";(function(a){n.d(t,"a",function(){return e});n(1);function e(){var t=a("#header"),n=a("body"),o=a(".page-wrapper");function e(){var e=a(window).scrollTop();n.offset().top<e?(t.addClass("fixed"),o.addClass("fixed")):(t.removeClass("fixed"),o.removeClass("fixed"))}a(window).scroll(e),e(),null!==document.getElementById("scrollbar")&&1<=document.getElementsByClassName("page-node-type-story").length&&(document.getElementsByClassName("node-type--story").item(0).classList.contains("nodeshop-closed")||(document.getElementById("scrollbar").classList.add("scroll-indicator"),window.onscroll=function(){var e;e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100,document.getElementById("scrollbar").style.width=e+"%"}))}}).call(this,n(0))},function(e,t,n){"use strict";(function(o,a){function e(){var e,t,n;"undefined"!=typeof Drupal&&void 0!==Drupal.eu_cookie_compliance&&(t=o("#sliding-popup"),e=o("#block-fussbereich > .menu"),void 0===o.cookie("cookie-agreed")&&null!==t&&(t.addClass("visible"),t.addClass("initial")),t.find(".button").each(function(){a(this).click(function(){o("#sliding-popup").removeClass("visible"),o("#sliding-popup").removeClass("initial")})}),t.hasClass("initial")&&((n=o('<button class="button button--reversed">Cookie-Einstellungen</button>')).click(function(){o("#sliding-popup").removeClass("initial"),o(this).remove()}),o("#popup-buttons").append(n)),(t=o('<a href="#">Datenschutz-Einstellungen</a>')).click(function(){o("#sliding-popup").addClass("visible")}),(n=o('<li class="menu-item menu-item--expanded"></li>')).append(t),e.append(n))}n.d(t,"a",function(){return e})}).call(this,n(0),n(0))},function(e,t,n){n(9),e.exports=n(10)},function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(3),s=n(4),i=n(5),r=n(6),l=n(7);window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(a.a)(),o.b(o.a),Object(s.a)(),Object(i.a)(),Object(r.a)(),Object(l.a)()})},function(e,t,n){}]);
//# sourceMappingURL=palm.js-17d8669b97315a246dff.map