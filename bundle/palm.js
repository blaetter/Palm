!function(l){function e(e){for(var t,n,o=e[0],r=e[1],a=0,s=[];a<o.length;a++)n=o[a],Object.prototype.hasOwnProperty.call(i,n)&&i[n]&&s.push(i[n][0]),i[n]=0;for(t in r)Object.prototype.hasOwnProperty.call(r,t)&&(l[t]=r[t]);for(c&&c(e);s.length;)s.shift()()}var n={},d={0:0},i={0:0};function p(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.e=function(u){var e=[];d[u]?e.push(d[u]):0!==d[u]&&{3:1}[u]&&e.push(d[u]=new Promise(function(e,o){for(var t={2:"31d6cfe0d16ae931b73c",3:"061cfd957976f661e112"}[u]+".css",r=p.p+t,n=document.getElementsByTagName("link"),a=0;a<n.length;a++){var s=(i=n[a]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(s===t||s===r))return e()}var l=document.getElementsByTagName("style");for(a=0;a<l.length;a++){var i;if((s=(i=l[a]).getAttribute("data-href"))===t||s===r)return e()}var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onload=e,c.onerror=function(e){var t=e&&e.target&&e.target.src||r,n=new Error("Loading CSS chunk "+u+" failed.\n("+t+")");n.request=t,delete d[u],c.parentNode.removeChild(c),o(n)},c.href=r,document.getElementsByTagName("head")[0].appendChild(c)}).then(function(){d[u]=0}));var n=i[u];if(0!==n)if(n)e.push(n[2]);else{var t=new Promise(function(e,t){n=i[u]=[e,t]});e.push(n[2]=t);var o,r=document.createElement("script");r.charset="utf-8",r.timeout=120,p.nc&&r.setAttribute("nonce",p.nc),r.src=function(e){return p.p+""+({}[e]||e)+"-"+{2:"4979458fb75e0077d267",3:"3d781c0e08ef311b97ba"}[e]+".js"}(u);var a=new Error;o=function(e){r.onerror=r.onload=null,clearTimeout(s);var t=i[u];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;a.message="Loading chunk "+u+" failed.\n("+n+": "+o+")",a.name="ChunkLoadError",a.type=n,a.request=o,t[1](a)}i[u]=void 0}};var s=setTimeout(function(){o({type:"timeout",target:r})},12e4);r.onerror=r.onload=o,document.head.appendChild(r)}return Promise.all(e)},p.m=l,p.c=n,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)p.d(n,o,function(e){return t[e]}.bind(null,o));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/themes/contrib/palm/bundle/",p.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var r=0;r<t.length;r++)e(t[r]);var c=o;p(p.s=7)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";function o(){window.__webpack_public_path__="/themes/contrib/palm/bundle/"}n.d(t,"a",function(){return o})},function(e,r,a){"use strict";(function(e){a.d(r,"b",function(){return t}),a.d(r,"a",function(){return o});var n=a(1);function t(t){if(!e(".swiper").length)return!1;n.a(),a.e(3).then(a.t.bind(null,11,7)),a.e(2).then(a.t.bind(null,12,7)).then(function(e){t(e.default)}).catch(function(e){console.log(e)})}function o(e){new e(".swiper.archive-index",{grabCursor:!0,slideToClickedSlide:!1,direction:"horizontal",slidesPerView:6,slidesPerGroup:5,spaceBetween:24,slidesOffsetBefore:12,slidesOffsetAfter:12,loop:!1,preloadImages:!1,touchReleaseOnEdges:!0,autoHeight:!0,touchEventsTarget:"wrapper",watchOverflow:!0,wrapperClass:"view-content",freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1200:{slidesPerView:3,slidesPerGroup:3},720:{slidesPerView:2,slidesPerGroup:2},420:{slidesPerView:2,slidesPerGroup:2}}})}}).call(this,a(0))},function(e,t,n){"use strict";(function(a){t.a=function(){a(".js-collapse-me").each(function(){var e=a(this),t=a(this).data("opentext")||"Öffnen",n=a(this).data("closetext")||"Schließen";e.wrapInner('<span class="js-collapse-me-inner"></span> '),e.prepend('<span class="js-collapse-me-toggler" title="">'+t+"</span>"),e.show(),a(".js-collapse-me-toggler",this).click(function(){e.toggleClass("opened"),e.hasClass("opened")?a(".js-collapse-me-toggler",e).html(n):a(".js-collapse-me-toggler",e).html(t)})}),a(".js-simple-toggler").each(function(){var e=a(this),t=a(this).data("target"),n=a(this).data("opentext"),o=a(this).data("closetext"),r=a(this).data("allowtoggle");a(t).hasClass("display-block")?o&&e.html(o):(a(t).addClass("display-none"),n&&e.html(n)),e.click(function(){a(t).hasClass("display-block")?(a(t).removeClass("display-block"),a(t).addClass("display-none"),e.html(n)):(a(t).removeClass("display-none"),a(t).addClass("display-block"),e.html(o)),0==r&&e.remove()})})}}).call(this,n(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-hamburger"),t=n("#navigation-primary");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Navigation zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-search"),t=n("#page-search");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Suche aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Suche zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,n){"use strict";(function(r){n.d(t,"a",function(){return e});n(1);function e(){var t=r("#header"),n=r("body"),o=r(".page-wrapper");function e(){var e=r(window).scrollTop();n.offset().top<e?(t.addClass("fixed"),o.addClass("fixed")):(t.removeClass("fixed"),o.removeClass("fixed"))}r(window).scroll(e),e(),null!==document.getElementById("scrollbar")&&1<=document.getElementsByClassName("node-type--story").length&&(document.getElementsByClassName("node-type--story").item(0).classList.contains("nodeshop-closed")||(document.getElementById("scrollbar").classList.add("scroll-indicator"),window.onscroll=function(){!function(){var e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;document.getElementById("scrollbar").style.width=e+"%"}()}))}}).call(this,n(0))},function(e,t,n){n(8),e.exports=n(9)},function(e,t,n){"use strict";n.r(t);var o=n(2),r=n(3),a=n(4),s=n(5),l=n(6);window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(r.a)(),o.b(o.a),Object(a.a)(),Object(s.a)(),Object(l.a)()})},function(e,t,n){}]);
//# sourceMappingURL=palm.js-3f046ef8fa14d8af4339.map