!function(i){function e(e){for(var t,n,r=e[0],o=e[1],s=0,a=[];s<r.length;s++)n=r[s],l[n]&&a.push(l[n][0]),l[n]=0;for(t in o)Object.prototype.hasOwnProperty.call(o,t)&&(i[t]=o[t]);for(u&&u(e);a.length;)a.shift()()}var n={},d={portal:0},l={portal:0};function p(e){if(n[e])return n[e].exports;var t=n[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,p),t.l=!0,t.exports}p.e=function(c){var e=[];d[c]?e.push(d[c]):0!==d[c]&&{1:1}[c]&&e.push(d[c]=new Promise(function(e,r){for(var t={0:"31d6cfe0d16ae931b73c",1:"8d32e5e81b17cb241647"}[c]+".css",o=p.p+t,n=document.getElementsByTagName("link"),s=0;s<n.length;s++){var a=(l=n[s]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(a===t||a===o))return e()}var i=document.getElementsByTagName("style");for(s=0;s<i.length;s++){var l;if((a=(l=i[s]).getAttribute("data-href"))===t||a===o)return e()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=e,u.onerror=function(e){var t=e&&e.target&&e.target.src||o,n=new Error("Loading CSS chunk "+c+" failed.\n("+t+")");n.request=t,delete d[c],u.parentNode.removeChild(u),r(n)},u.href=o,document.getElementsByTagName("head")[0].appendChild(u)}).then(function(){d[c]=0}));var t,n=l[c];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise(function(e,t){n=l[c]=[e,t]});e.push(n[2]=r);var o,s=document.createElement("script");s.charset="utf-8",s.timeout=120,p.nc&&s.setAttribute("nonce",p.nc),s.src=p.p+""+({}[t=c]||t)+"-"+{0:"423e8b5f697e5ef7f29f",1:"2150650efe1b7dc4ea9c"}[t]+".js",o=function(e){s.onerror=s.onload=null,clearTimeout(a);var t=l[c];if(0!==t){if(t){var n=e&&("load"===e.type?"missing":e.type),r=e&&e.target&&e.target.src,o=new Error("Loading chunk "+c+" failed.\n("+n+": "+r+")");o.type=n,o.request=r,t[1](o)}l[c]=void 0}};var a=setTimeout(function(){o({type:"timeout",target:s})},12e4);s.onerror=s.onload=o,document.head.appendChild(s)}return Promise.all(e)},p.m=i,p.c=n,p.d=function(e,t,n){p.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},p.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},p.t=function(t,e){if(1&e&&(t=p(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(p.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)p.d(n,r,function(e){return t[e]}.bind(null,r));return n},p.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return p.d(t,"a",t),t},p.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},p.p="/bundle/",p.oe=function(e){throw console.error(e),e};var t=window.webpackJsonp=window.webpackJsonp||[],r=t.push.bind(t);t.push=e,t=t.slice();for(var o=0;o<t.length;o++)e(t[o]);var u=r;p(p.s=0)}({"./source-bundle/js/global.js":
/*!************************************!*\
  !*** ./source-bundle/js/global.js ***!
  \************************************/
/*! no exports provided */function(e,t,n){"use strict";n.r(t);var r=n(/*! swiper-init */"./source-bundle/js/modules/swiper-init.js"),o=n(/*! collapse */"./source-bundle/js/modules/collapse.js"),s=n(/*! nav-menu-flyout */"./source-bundle/js/modules/nav-menu-flyout.js"),a=n(/*! search-flyout */"./source-bundle/js/modules/search-flyout.js"),i=n(/*! header-fix */"./source-bundle/js/modules/header-fix.js");window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(o.default)(),r.init(r.apply),Object(s.default)(),Object(a.default)(),Object(i.default)()})},"./source-bundle/js/modules/blaetter.js":
/*!**********************************************!*\
  !*** ./source-bundle/js/modules/blaetter.js ***!
  \**********************************************/
/*! exports provided: portal_url, jsbase, set_webpack_publicpath, is_palm, languageCode, load, isElementVisible */function(e,t,n){"use strict";function r(){return document.getElementById("echo-behavior-js").src.replace(/\/css\/.*/,"")}function o(){return document.getElementById("echo-behavior-js").src.replace(/js\/[^\/]+$/,"")}function s(){window.__webpack_public_path__=o()+"/"}function a(){var e=document.querySelector("#header .portal-claim");return!e||"none"===window.getComputedStyle(e,null).display}function i(){return(document.documentElement.lang||"de").substring(0,2)}function l(a){if(Array.isArray(a)){var t=this,n=[];return a.forEach(function(e){n.push(t.bo_script(e))}),Promise.all(n)}return new Promise(function(t,e){var n=!1;function r(e){n||this.readyState&&"complete"!==this.readyState||(this.readyState="complete",n=!0,t(this))}var o=document.getElementsByTagName("script")[0],s=document.querySelector('script[src="'+a+'"]');s?"complete"===s.readyState?t(this):(s.addEventListener("load",r.bind(s)),s.addEventListener("readystatechange",r.bind(s)),s.addEventListener("error",e),s.addEventListener("abort",e)):((s=document.createElement("script")).type="text/javascript",s.src=a,s.onload=s.onreadystatechange=r,s.onerror=s.onabort=e,o.parentNode.insertBefore(s,o))})}function u(e){var t=e.getBoundingClientRect(),n=window.innerWidth||doc.documentElement.clientWidth,r=window.innerHeight||doc.documentElement.clientHeight,o=function(e,t){return document.elementFromPoint(e,t)};return!(t.right<0||t.bottom<0||t.left>n||t.top>r)&&(e.contains(o(t.left,t.top))||e.contains(o(t.right,t.top))||e.contains(o(t.right,t.bottom))||e.contains(o(t.left,t.bottom)))}n.r(t),n.d(t,"portal_url",function(){return r}),n.d(t,"jsbase",function(){return o}),n.d(t,"set_webpack_publicpath",function(){return s}),n.d(t,"is_palm",function(){return a}),n.d(t,"languageCode",function(){return i}),n.d(t,"load",function(){return l}),n.d(t,"isElementVisible",function(){return u})},"./source-bundle/js/modules/collapse.js":
/*!**********************************************!*\
  !*** ./source-bundle/js/modules/collapse.js ***!
  \**********************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),function(s){t.default=function(){s(".js-collapse-me").each(function(){var e=s(this),t=s(this).data("opentext")||"Öffnen",n=s(this).data("closetext")||"Schließen";e.wrapInner('<span class="js-collapse-me-inner"></span> '),e.prepend('<span class="js-collapse-me-toggler" title="">'+t+"</span>"),e.show(),s(".js-collapse-me-toggler",this).click(function(){e.toggleClass("opened"),e.hasClass("opened")?s(".js-collapse-me-toggler",e).html(n):s(".js-collapse-me-toggler",e).html(t)})}),s(".js-simple-toggler").each(function(){var e=s(this),t=s(this).data("target"),n=s(this).data("opentext"),r=s(this).data("closetext"),o=s(this).data("allowtoggle");s(t).hasClass("display-block")?r&&e.html(r):(s(t).addClass("display-none"),n&&e.html(n)),e.click(function(){s(t).hasClass("display-block")?(s(t).removeClass("display-block"),s(t).addClass("display-none"),e.html(n)):(s(t).removeClass("display-none"),s(t).addClass("display-block"),e.html(r)),0==o&&e.remove()})})}}.call(this,n(/*! jquery */"jquery"))},"./source-bundle/js/modules/header-fix.js":
/*!************************************************!*\
  !*** ./source-bundle/js/modules/header-fix.js ***!
  \************************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),function(o){n.d(t,"default",function(){return e});n(/*! blaetter */"./source-bundle/js/modules/blaetter.js");function e(){var t=o("#header"),n=o("body"),r=o(".page-wrapper");function e(){var e=o(window).scrollTop();n.offset().top<e?(t.addClass("fixed"),r.addClass("fixed")):(t.removeClass("fixed"),r.removeClass("fixed"))}o(window).scroll(e),e()}}.call(this,n(/*! jquery */"jquery"))},"./source-bundle/js/modules/nav-menu-flyout.js":
/*!*****************************************************!*\
  !*** ./source-bundle/js/modules/nav-menu-flyout.js ***!
  \*****************************************************/
/*! exports provided: default */function(e,t,r){"use strict";r.r(t),function(n){r.d(t,"default",function(){return e});r(/*! blaetter */"./source-bundle/js/modules/blaetter.js");function e(){var e=n(".js-hamburger"),t=n("#navigation-primary");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Navigation zuklappen"),t.addClass("opened")),!1})}}.call(this,r(/*! jquery */"jquery"))},"./source-bundle/js/modules/search-flyout.js":
/*!***************************************************!*\
  !*** ./source-bundle/js/modules/search-flyout.js ***!
  \***************************************************/
/*! exports provided: default */function(e,t,r){"use strict";r.r(t),function(n){r.d(t,"default",function(){return e});r(/*! blaetter */"./source-bundle/js/modules/blaetter.js");function e(){var e=n(".js-search"),t=n("#page-search");e.click(function(e){return e.preventDefault(),n(this).hasClass("opened")?(n(this).removeClass("opened").attr("aria-label","Suche aufklappen"),t.removeClass("opened")):(n(this).addClass("opened").attr("aria-label","Suche zuklappen"),t.addClass("opened")),!1})}}.call(this,r(/*! jquery */"jquery"))},"./source-bundle/js/modules/swiper-init.js":
/*!*************************************************!*\
  !*** ./source-bundle/js/modules/swiper-init.js ***!
  \*************************************************/
/*! exports provided: init, slidesperview, apply */function(e,s,a){"use strict";a.r(s),function(r){a.d(s,"init",function(){return t}),a.d(s,"slidesperview",function(){return n}),a.d(s,"apply",function(){return o});var e=a(/*! blaetter */"./source-bundle/js/modules/blaetter.js");function t(t){if(!r(".swiper,.swiper-wrapper").length)return!1;e.set_webpack_publicpath(),a.e(/*! import() */1).then(a.t.bind(null,/*! swiper/dist/css/swiper.css */"./node_modules/swiper/dist/css/swiper.css",7)),a.e(/*! import() */0).then(a.t.bind(null,/*! swiper */"./node_modules/swiper/dist/js/swiper.esm.bundle.js",7)).then(function(e){t(e.default)}).catch(function(e){console.log(e)})}function n(e,t){var n=e&&r(e).data("slidesperview");return e&&r.extend(t,{slidesPerView:n,slidesPerGroup:n,lazy:{loadPrevNextAmount:n}}),t}function o(e){new e(".archive-index.swiper",{grabCursor:!0,slideToClickedSlide:!0,direction:"horizontal",slidesPerView:12,slidesPerGroup:12,spaceBetween:24,loop:!1,preloadImages:!1,touchReleaseOnEdges:!0,autoHeight:!0,touchEventsTarget:"swiper-wrapper",watchOverflow:!0,navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},breakpoints:{1e3:{slidesPerView:6,slidesPerGroup:6},420:{slidesPerView:4,slidesPerGroup:4}}})}}.call(this,a(/*! jquery */"jquery"))},"./source-bundle/style.scss":
/*!**********************************!*\
  !*** ./source-bundle/style.scss ***!
  \**********************************/
/*! no static exports found */function(e,t,n){},0:
/*!*********************************************************************!*\
  !*** multi ./source-bundle/js/global.js ./source-bundle/style.scss ***!
  \*********************************************************************/
/*! no static exports found */function(e,t,n){n(/*! /app/source-bundle/js/global.js */"./source-bundle/js/global.js"),e.exports=n(/*! /app/source-bundle/style.scss */"./source-bundle/style.scss")},jquery:
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */function(e,t){e.exports=jQuery}});
//# sourceMappingURL=portal.js-0dff96f6b137721d3d4e.map