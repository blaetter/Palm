!function(l){function e(e){for(var t,n,o=e[0],a=e[1],r=0,s=[];r<o.length;r++)n=o[r],i[n]&&s.push(i[n][0]),i[n]=0;for(t in a)Object.prototype.hasOwnProperty.call(a,t)&&(l[t]=a[t]);for(c&&c(e);s.length;)s.shift()()}var n={},u={0:0},i={0:0};function p(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return l[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.e=function(d){var e=[];u[d]?e.push(u[d]):0!==u[d]&&{3:1}[d]&&e.push(u[d]=new Promise(function(e,o){for(var t={2:"31d6cfe0d16ae931b73c",3:"cfecdaaa5a76d134037c"}[d]+".css",a=p.p+t,n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var s=(i=n[r]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(s===t||s===a))return e()}var l=document.getElementsByTagName("style");for(r=0;r<l.length;r++){var i;if((s=(i=l[r]).getAttribute("data-href"))===t||s===a)return e()}var c=document.createElement("link");c.rel="stylesheet",c.type="text/css",c.onload=e,c.onerror=function(e){var t=e&&e.target&&e.target.src||a,n=new Error("Loading CSS chunk "+d+" failed.\n("+t+")");n.request=t,delete u[d],c.parentNode.removeChild(c),o(n)},c.href=a,document.getElementsByTagName("head")[0].appendChild(c)}).then(function(){u[d]=0}));var t,n=i[d];if(0!==n)if(n)e.push(n[2]);else{var o=new Promise(function(e,t){n=i[d]=[e,t]});e.push(n[2]=o);var a,r=document.createElement("script");r.charset="utf-8",r.timeout=120,p.nc&&r.setAttribute("nonce",p.nc),r.src=p.p+""+({}[t=d]||t)+"-"+{2:"8cfcb7b3029bb8637ed5",3:"8ff3f5c9a6476daa689d"}[t]+".js",a=function(e){r.onerror=r.onload=null,clearTimeout(s);var t=i[d];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,a=new Error("Loading chunk "+d+" failed.\n("+n+": "+o+")");a.type=n,a.request=o,t[1](a)}i[d]=void 0}};var s=setTimeout(function(){a({type:"timeout",target:r})},12e4);r.onerror=r.onload=a,document.head.appendChild(r)}return Promise.all(e)},p.m=l,p.c=n,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)p.d(n,o,function(e){return t[e]}.bind(null,o));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/themes/contrib/palm/bundle/",p.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],o=t.push.bind(t);t.push=e,t=t.slice();for(var a=0;a<t.length;a++)e(t[a]);var c=o;p(p.s=7)}([function(e,t){e.exports=jQuery},function(e,t,n){"use strict";function o(){window.__webpack_public_path__="/themes/contrib/palm/bundle/"}n.d(t,"a",function(){return o})},function(e,a,r){"use strict";(function(e){r.d(a,"b",function(){return t}),r.d(a,"a",function(){return o});var n=r(1);function t(t){if(!e(".swiper").length)return!1;n.a(),r.e(3).then(r.t.bind(null,11,7)),r.e(2).then(r.t.bind(null,12,7)).then(function(e){t(e.default)}).catch(function(e){console.log(e)})}function o(e){new e(".swiper.archive-index",{grabCursor:!0,slideToClickedSlide:!0,direction:"horizontal",slidesPerView:6,slidesPerGroup:5,spaceBetween:24,slidesOffsetBefore:12,slidesOffsetAfter:12,loop:!1,preloadImages:!1,touchReleaseOnEdges:!0,autoHeight:!0,touchEventsTarget:"wrapper",watchOverflow:!0,wrapperClass:"view-content",freeMode:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1e3:{slidesPerView:3,slidesPerGroup:3},420:{slidesPerView:2,slidesPerGroup:2}}})}}).call(this,r(0))},function(e,t,n){"use strict";(function(r){t.a=function(){r(".js-collapse-me").each(function(){var e=r(this),t=r(this).data("opentext")||"Öffnen",n=r(this).data("closetext")||"Schließen";e.wrapInner('<span class="js-collapse-me-inner"></span> '),e.prepend('<span class="js-collapse-me-toggler" title="">'+t+"</span>"),e.show(),r(".js-collapse-me-toggler",this).click(function(){e.toggleClass("opened"),e.hasClass("opened")?r(".js-collapse-me-toggler",e).html(n):r(".js-collapse-me-toggler",e).html(t)})}),r(".js-simple-toggler").each(function(){var e=r(this),t=r(this).data("target"),n=r(this).data("opentext"),o=r(this).data("closetext"),a=r(this).data("allowtoggle");r(t).hasClass("display-block")?o&&e.html(o):(r(t).addClass("display-none"),n&&e.html(n)),e.click(function(){r(t).hasClass("display-block")?(r(t).removeClass("display-block"),r(t).addClass("display-none"),e.html(n)):(r(t).removeClass("display-none"),r(t).addClass("display-block"),e.html(o)),0==a&&e.remove()})})}}).call(this,n(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-hamburger"),t=n("#navigation-primary");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Navigation zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,o){"use strict";(function(n){o.d(t,"a",function(){return e});o(1);function e(){var e=n(".js-search"),t=n("#page-search");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Suche aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Suche zuklappen"),t.addClass("opened")),!1})}}).call(this,o(0))},function(e,t,n){"use strict";(function(a){n.d(t,"a",function(){return e});n(1);function e(){var t=a("#header"),n=a("body"),o=a(".page-wrapper");function e(){var e=a(window).scrollTop();n.offset().top<e?(t.addClass("fixed"),o.addClass("fixed")):(t.removeClass("fixed"),o.removeClass("fixed"))}a(window).scroll(e),e(),null!==document.getElementById("scrollbar")&&1<=document.getElementsByClassName("node-type--story").length&&(document.getElementsByClassName("node-type--story").item(0).classList.contains("nodeshop-closed")||(document.getElementById("scrollbar").classList.add("scroll-indicator"),window.onscroll=function(){var e;e=(document.body.scrollTop||document.documentElement.scrollTop)/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100,document.getElementById("scrollbar").style.width=e+"%"}))}}).call(this,n(0))},function(e,t,n){n(8),e.exports=n(9)},function(e,t,n){"use strict";n.r(t);var o=n(2),a=n(3),r=n(4),s=n(5),l=n(6);window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(a.a)(),o.b(o.a),Object(r.a)(),Object(s.a)(),Object(l.a)()})},function(e,t,n){}]);
//# sourceMappingURL=palm.js-a7c1b30b1444f3ac19cd.map