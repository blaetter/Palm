!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/bundle/",n(n.s=0)}({"./source-bundle/js/global.js":
/*!************************************!*\
  !*** ./source-bundle/js/global.js ***!
  \************************************/
/*! no exports provided */function(e,t,n){"use strict";n.r(t);var a=n(/*! collapse */"./source-bundle/js/modules/collapse.js"),o=n(/*! nav-menu-flyout */"./source-bundle/js/modules/nav-menu-flyout.js");window._paq="object"==typeof window._paq?window._paq:[],window._gaq="object"==typeof window._gaq?window._gaq:[],document.addEventListener("DOMContentLoaded",function(e){Object(a.default)(),Object(o.default)()})},"./source-bundle/js/modules/blaetter.js":
/*!**********************************************!*\
  !*** ./source-bundle/js/modules/blaetter.js ***!
  \**********************************************/
/*! exports provided: portal_url, jsbase, set_webpack_publicpath, is_palm, languageCode, load, isElementVisible */function(e,t,n){"use strict";function a(){return document.getElementById("echo-behavior-js").src.replace(/\/css\/.*/,"")}function o(){return document.getElementById("echo-behavior-js").src.replace(/js\/[^\/]+$/,"")}function r(){window.__webpack_public_path__=o()+"/"}function s(){var e=document.querySelector("#header .portal-claim");return!e||"none"===window.getComputedStyle(e,null).display}function i(){return(document.documentElement.lang||"de").substring(0,2)}function l(e){if(Array.isArray(e)){var t=this,n=[];return e.forEach(function(e){n.push(t.bo_script(e))}),Promise.all(n)}return new Promise(function(t,n){var a=!1;function o(e){a||this.readyState&&"complete"!==this.readyState||(this.readyState="complete",a=!0,t(this))}var r=document.getElementsByTagName("script")[0],s=document.querySelector('script[src="'+e+'"]');s?"complete"===s.readyState?t(this):(s.addEventListener("load",o.bind(s)),s.addEventListener("readystatechange",o.bind(s)),s.addEventListener("error",n),s.addEventListener("abort",n)):((s=document.createElement("script")).type="text/javascript",s.src=e,s.onload=s.onreadystatechange=o,s.onerror=s.onabort=n,r.parentNode.insertBefore(s,r))})}function u(e){var t=e.getBoundingClientRect(),n=window.innerWidth||doc.documentElement.clientWidth,a=window.innerHeight||doc.documentElement.clientHeight,o=function(e,t){return document.elementFromPoint(e,t)};return!(t.right<0||t.bottom<0||t.left>n||t.top>a)&&(e.contains(o(t.left,t.top))||e.contains(o(t.right,t.top))||e.contains(o(t.right,t.bottom))||e.contains(o(t.left,t.bottom)))}n.r(t),n.d(t,"portal_url",function(){return a}),n.d(t,"jsbase",function(){return o}),n.d(t,"set_webpack_publicpath",function(){return r}),n.d(t,"is_palm",function(){return s}),n.d(t,"languageCode",function(){return i}),n.d(t,"load",function(){return l}),n.d(t,"isElementVisible",function(){return u})},"./source-bundle/js/modules/collapse.js":
/*!**********************************************!*\
  !*** ./source-bundle/js/modules/collapse.js ***!
  \**********************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),function(e){t.default=function(){e(".js-collapse-me").each(function(){var t=e(this),n=e(this).data("opentext")||"Öffnen",a=e(this).data("closetext")||"Schließen";t.wrapInner('<span class="js-collapse-me-inner"></span> '),t.prepend('<span class="js-collapse-me-toggler" title="">'+n+"</span>"),t.show(),e(".js-collapse-me-toggler",this).click(function(){t.toggleClass("opened"),t.hasClass("opened")?e(".js-collapse-me-toggler",t).html(a):e(".js-collapse-me-toggler",t).html(n)})}),e(".js-simple-toggler").each(function(){var t=e(this),n=e(this).data("target"),a=e(this).data("opentext"),o=e(this).data("closetext"),r=e(this).data("allowtoggle");e(n).hasClass("display-block")?o&&t.html(o):(e(n).addClass("display-none"),a&&t.html(a)),t.click(function(){e(n).hasClass("display-block")?(e(n).removeClass("display-block"),e(n).addClass("display-none"),t.html(a)):(e(n).removeClass("display-none"),e(n).addClass("display-block"),t.html(o)),0==r&&t.remove()})})}}.call(this,n(/*! jquery */"jquery"))},"./source-bundle/js/modules/nav-menu-flyout.js":
/*!*****************************************************!*\
  !*** ./source-bundle/js/modules/nav-menu-flyout.js ***!
  \*****************************************************/
/*! exports provided: default */function(e,t,n){"use strict";n.r(t),function(e){n.d(t,"default",function(){return a});n(/*! blaetter */"./source-bundle/js/modules/blaetter.js");function a(){var t=e(".js-hamburger"),n=e("#navigation-primary");t.click(function(t){return t.preventDefault(),e(this).hasClass("opened")?(e(this).removeClass("opened").attr("aria-label","Navigation aufklappen"),n.removeClass("opened")):(e(this).addClass("opened").attr("aria-label","Navigation zuklappen"),n.addClass("opened")),!1}),e("#navigation-primary ul.menu > li.menu-item--collapsed > a, #navigation-primary ul.menu > li.menu-item--expanded > a").each(function(){e(this).after('<button class="arrow"><i class="fa fa-chevron-down" aria-hidden="true"></i></button>')}),e("#navigation-primary ul.menu > li.menu-item--collapsed .arrow, #navigation-primary ul.menu > li.menu-item--expanded .arrow").click(function(t){t.preventDefault(),e("#navigation-primary ul.menu > li.menu-item--expanded .arrow").not(this).parent().removeClass("menu-item--expanded").addClass("menu-item--collapsed"),e(this).parent().hasClass("menu-item--collapsed")?e(this).parent().removeClass("menu-item--collapsed").addClass("menu-item--expanded"):e(this).parent().removeClass("menu-item--expanded").addClass("menu-item--collapsed")})}}.call(this,n(/*! jquery */"jquery"))},"./source-bundle/style.scss":
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
//# sourceMappingURL=portal.js-46b4864c2f2770521cfd.map