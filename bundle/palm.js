!function(i){function e(e){for(var t,n,o=e[0],a=e[1],s=0,r=[];s<o.length;s++)n=o[s],Object.prototype.hasOwnProperty.call(l,n)&&l[n]&&r.push(l[n][0]),l[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(i[t]=a[t]);for(c&&c(e);r.length;)r.shift()()}var n={},d={0:0},l={0:0};function p(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.e=function(u){var e=[];d[u]?e.push(d[u]):0!==d[u]&&{3:1}[u]&&e.push(d[u]=new Promise(function(e,o){for(var t={2:"31d6cfe0d16ae931b73c",3:"061cfd957976f661e112"}[u]+".css",a=p.p+t,n=document.getElementsByTagName("link"),s=0;s<n.length;s++){var r=(l=n[s]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(r===t||r===a))return e()}var i=document.getElementsByTagName("style");for(s=0;s<i.length;s++){var l;if((r=(l=i[s]).getAttribute("data-href"))===t||r===a)return e()}var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onload=e,c.onerror=function(e){var t=e&&e.target&&e.target.src||a,n=new Error("Loading CSS chunk "+u+" failed.\n("+t+")");n.request=t,delete d[u],c.parentNode.removeChild(c),o(n)},c.href=a,document.getElementsByTagName("head")[0].appendChild(c)}).then(function(){d[u]=0}));var n=l[u];if(0!==n)if(n)e.push(n[2]);else{var t=new Promise(function(e,t){n=l[u]=[e,t]});e.push(n[2]=t);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,p.nc&&a.setAttribute("nonce",p.nc),a.src=function(e){return p.p+""+({}[e]||e)+"-"+{2:"d5a8a9ea2d6f5bb4a110",3:"d7eafb4c860dc5dea7a5"}[e]+".js"}(u);var s=new Error;o=function(e){a.onerror=a.onload=null,clearTimeout(r);var t=l[u];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;s.message="Loading chunk "+u+" failed.\n("+n+": "+o+")",s.name="ChunkLoadError",s.type=n,s.request=o,t[1](s)}l[u]=void 0}};var r=setTimeout(function(){o({type:"timeout",target:a})},12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(e)},p.m=i,p.c=n,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)p.d(n,o,function(e){return t[e]}.bind(null,o));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/themes/contrib/palm/bundle/",p.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var c=o;p(p.s=8)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";function o(){window.__webpack_public_path__="/themes/contrib/palm/bundle/"}n.d(t,"a",function(){return o})},function(e,a,s){"use strict";(function(e){s.d(a,"b",function(){return t}),s.d(a,"a",function(){return o});var n=s(1);function t(t){if(!e(".swiper").length)return!1;n.a(),s.e(3).then(s.t.bind(null,12,7)),s.e(2).then(s.t.bind(null,13,7)).then(function(e){t(e.default)}).catch(function(e){console.log(e)})}function o(e){new e(".swiper.archive-index",{grabCursor:!0,slideToClickedSlide:!1,direction:"horizontal",slidesPerView:6,slidesPerGroup:5,spaceBetween:24,slidesOffsetBefore:12,slidesOffsetAfter:12,loop:!1,preloadImages:!1,touchReleaseOnEdges:!0,autoHeight:!0,touchEventsTarget:"wrapper",watchOverflow:!0,wrapperClass:"view-content",freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1200:{slidesPerView:3,slidesPerGroup:3},720:{slidesPerView:2,slidesPerGroup:2},420:{slidesPerView:2,slidesPerGroup:2}}})}}).call(this,s(0))},function(e,t,n){"use strict";(function(s){t.a=function(){s(".js-collapse-me").each(function(){var e=s(this),t=s(this).data("opentext")||"Öffnen",n=s(this).data("closetext")||"Schließen";e.wrapInner('<span class="js-collapse-me-inner"></span> '),e.prepend('<span class="js-collapse-me-toggler" title="">'+t+"</span>"),e.show(),s(".js-collapse-me-toggler",this).click(function(){e.toggleClass("opened"),e.hasClass("opened")?s(".js-collapse-me-toggler",e).html(n):s(".js-collapse-me-toggler",e).html(t)})}),s(".js-simple-toggler").each(function(){var e=s(this),t=s(this).data("target"),n=s(this).data("opentext"),o=s(this).data("closetext"),a=s(this).data("allowtoggle");s(t).hasClass("display-block")?o&&e.html(o):(s(t).addClass("display-none"),n&&e.html(n)),e.click(function(){s(t).hasClass("display-block")?(s(t).removeClass("display-block"),s(t).addClass("display-none"),e.html(n)):(s(t).removeClass("display-none"),s(t).addClass("display-block"),e.html(o)),0==a&&e.remove()})})}}).call(this,n(0))},function(e,t,n){"use strict";(function(o){n.d(t,"a",function(){return e});n(1);function e(){var t=o(".js-hamburger"),n=o("#navigation-primary");t.click(function(e){if(e.preventDefault(),o(this).hasClass("opened"))o(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),n.removeClass("opened");else{o(this).addClass("opened").attr("aria-label","Navigation zuklappen"),n.addClass("opened"),o("body").click(function(e){0==o(e.target).parents("#navigation-primary").length&&t.hasClass("opened")&&t.click()});o(document).keyup(function(e){27==e.keyCode&&t.hasClass("opened")&&t.click()})}return!1})}}).call(this,n(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-search"),t=n("#page-search");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Suche aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Suche zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,n){"use strict";(function(a){n.d(t,"a",function(){return e});n(1);function e(){var t=a("#header"),n=a("body"),o=a(".page-wrapper");function e(){var e=a(window).scrollTop();n.offset().top<e?(t.addClass("fixed"),o.addClass("fixed")):(t.removeClass("fixed"),o.removeClass("fixed"))}a(window).scroll(e),e(),null!==document.getElementById("scrollbar")&&1<=document.getElementsByClassName("page-node-type-story").length&&(document.getElementsByClassName("node-type--story").item(0).classList.contains("nodeshop-closed")||(document.getElementById("scrollbar").classList.add("scroll-indicator"),window.onscroll=function(){!function(){var e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;document.getElementById("scrollbar").style.width=e+"%"}()}))}}).call(this,n(0))},function(e,t,n){"use strict";(function(s,r){function e(){if("undefined"!=typeof Drupal){var e=s("#sliding-popup"),t=s("#block-fussbereich > .menu");if(null===Drupal.eu_cookie_compliance.getCurrentStatus()&&null!==e&&(e.addClass("visible"),e.addClass("initial")),e.find(".button").each(function(){r(this).click(function(){s("#sliding-popup").removeClass("visible"),s("#sliding-popup").removeClass("initial")})}),e.hasClass("initial")){var n=s('<button class="button button--reversed">Cookie-Einstellungen</button>');n.click(function(){s("#sliding-popup").removeClass("initial"),s(this).remove()}),s("#popup-buttons").append(n)}var o=s('<a href="#">Datenschutz-Einstellungen</a>');o.click(function(){s("#sliding-popup").addClass("visible")});var a=s('<li class="menu-item menu-item--expanded"></li>');a.append(o),t.append(a)}}n.d(t,"a",function(){return e})}).call(this,n(0),n(0))},function(e,t,n){n(9),e.exports=n(10)},function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(3),s=n(4),r=n(5),i=n(6),l=n(7);window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(a.a)(),o.b(o.a),Object(s.a)(),Object(r.a)(),Object(i.a)(),Object(l.a)()})},function(e,t,n){}]);
//# sourceMappingURL=palm.js-6b0acb20968dd35a3167.map