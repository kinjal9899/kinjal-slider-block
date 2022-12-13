/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/editor.scss");



const registerBlockType = wp.blocks.registerBlockType;
const {
  __
} = wp.i18n;
const {
  Button
} = wp.components;
const {
  MediaUpload,
  MediaUploadCheck,
  PlainText
} = wp.blockEditor;
const ALLOWED_MEDIA_TYPES = ['image'];

// Note: I purposely used "kinjalslider" in the block name.
registerBlockType('theme/kinjalslider', {
  apiVersion: 2,
  title: 'Kinjal Slider',
  category: 'layout',
  icon: {
    background: '#7e70af',
    foreground: '#fff',
    src: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
      class: "dashicons dashicons-slides"
    })
  },
  attributes: {
    id: {
      source: "attribute",
      selector: ".carousel.slide",
      attribute: "id"
    },
    testimonials: {
      source: "query",
      default: [],
      selector: "blockquote.testimonial",
      query: {
        image: {
          source: "attribute",
          selector: "img",
          attribute: "src"
        },
        index: {
          source: "text",
          selector: "span.testimonial-index"
        },
        content: {
          source: "text",
          selector: "span.testimonial-text"
        },
        author: {
          source: "text",
          selector: "span.testimonial-author span"
        }
      }
    }
  },
  edit(props) {
    const {
      testimonials
    } = props.attributes;
    const testimonialsList = testimonials.sort((a, b) => a.index - b.index).map(testimonial => {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "gts-testimonial-block"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Insert Testmonial ", Number(testimonial.index) + 1, " Here:"), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "remove-testimonial",
        onClick: () => {
          const newTestimonials = testimonials.filter(item => item.index != testimonial.index).map(t => {
            if (t.index > testimonial.index) {
              t.index -= 1;
            }
            return t;
          });
          props.setAttributes({
            testimonials: newTestimonials
          });
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: "fa fa-times"
      }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "row"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "gts__picture col-3"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MediaUpload, {
        onSelect: media => {
          const image = media.sizes.full ? media.sizes.full.url : media.url;
          const newObject = Object.assign({}, testimonial, {
            image: image
          });
          props.setAttributes({
            testimonials: [...testimonials.filter(item => item.index != testimonial.index), newObject]
          });
        },
        type: "image",
        value: testimonial.image,
        render: _ref => {
          let {
            open
          } = _ref;
          return !!testimonial.image ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, props.isSelected && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
            className: "gts__picture__actions"
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
            href: "#",
            onClick: () => {
              const newObject = Object.assign({}, testimonial, {
                image: null
              });
              props.setAttributes({
                testimonials: [...testimonials.filter(item => item.index != testimonial.index), newObject]
              });
            }
          }, "\xD7 Remove")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
            src: testimonial.image,
            className: "gts__picture__image",
            style: {
              backgroundImage: `url(${testimonial.image})`
            },
            onClick: open
          })) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
            href: "#",
            className: "gts__picture__image",
            onClick: open
          }, "Select Image");
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("blockquote", {
        className: "wp-block-quote"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlainText, {
        className: "content-plain-text",
        style: {
          height: 58
        },
        placeholder: "Testimonial Text",
        value: testimonial.content,
        autoFocus: true,
        onChange: content => {
          const newObject = Object.assign({}, testimonial, {
            content: content
          });
          props.setAttributes({
            testimonials: [...testimonials.filter(item => item.index != testimonial.index), newObject]
          });
        }
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "col-9 mt-3"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PlainText, {
        className: "author-plain-text",
        placeholder: "Author",
        value: testimonial.author,
        onChange: author => {
          const newObject = Object.assign({}, testimonial, {
            author: author
          });
          props.setAttributes({
            testimonials: [...testimonials.filter(item => item.index != testimonial.index), newObject]
          });
        }
      }))));
    });
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: props.className
    }, testimonialsList, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
      className: "add-more-testimonial",
      onClick: content => props.setAttributes({
        testimonials: [...props.attributes.testimonials, {
          index: props.attributes.testimonials.length,
          content: "",
          author: ""
        }]
      })
    }, "+"));
  },
  save(props) {
    const {
      id,
      testimonials
    } = props.attributes;
    const carouselIndicators = testimonials.map(function (testimonial, index) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        "data-target": "#" + id,
        "data-slide-to": index,
        className: testimonial.index == 0 ? "active" : ""
      });
    });
    const testimonialsList = testimonials.map(function (testimonial) {
      const carouselClass = testimonial.index == 0 ? "carousel-item active" : "carousel-item";
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: carouselClass,
        key: testimonial.index
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("blockquote", {
        className: "testimonial"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "testimonial-index",
        style: {
          display: "none"
        }
      }, testimonial.index)), testimonial.content && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        className: "testimonial-text-container"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        className: "fa fa-quote-left pull-left",
        "aria-hidden": "true"
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "testimonial-text"
      }, testimonial.content), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("i", {
        class: "fa fa-quote-right pull-right",
        "aria-hidden": "true"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "row"
      }, testimonial.image && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "gts__picture col-3"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
        src: testimonial.image
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "testimonial-author-container mt-3 col-9"
      }, testimonial.author && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
        className: "testimonial-author-name"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
        className: "testimonial-author"
      }, "\u2014 ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, testimonial.author)))))));
    });
    if (testimonials.length > 0) {
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "testimonial-slider"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "carousel slide",
        "data-ride": "carousel",
        id: id
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
        className: "carousel-inner FG_slider BG_slider w-75 mx-auto"
      }, testimonialsList)));
    } else return null;
  }
});

/***/ }),

/***/ "./src/editor.scss":
/*!*************************!*\
  !*** ./src/editor.scss ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkkinjal_slider_block"] = self["webpackChunkkinjal_slider_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map