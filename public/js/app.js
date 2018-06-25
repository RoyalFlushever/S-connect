webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(33)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(35)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(37)
/* template */
var __vue_template__ = __webpack_require__(38)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-39d4b54e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/VModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39d4b54e", Component.options)
  } else {
    hotAPI.reload("data-v-39d4b54e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(13);
module.exports = __webpack_require__(40);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(0);

__webpack_require__(4);

// TODO: Import this only where needed (e.g. in a component)
__webpack_require__(5);

window.Vue = __webpack_require__(6);

Vue.component('citizenship-value-fields', __webpack_require__(17));
Vue.component('dual-list', __webpack_require__(20));
Vue.component('registration-auth-fields', __webpack_require__(23));
Vue.component('registration-form', __webpack_require__(30));
Vue.component('v-modal', __webpack_require__(11));

// Instantiate root Vue
app = new Vue({
  el: '#app'
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(18)
/* template */
var __vue_template__ = __webpack_require__(19)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/CitizenshipValueFields.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a8d4186", Component.options)
  } else {
    hotAPI.reload("data-v-1a8d4186", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['citizenshipValuesByType', 'monitoringLocationNamesById', 'monitoringLocationsByCategory'],

    created: function created() {
        // Set up non-reactive properties
        this.maxNumberOfLocations = 10;

        // Initialize location data structs
        for (var i = 0; i < this.maxNumberOfLocations; i++) {
            this.selectedLocationIds.push(null);
            this.locationLabels.push(null);
            // TODO: Consider pulling these citizenship value types from the props instead of hard-coded, vis-à-vis data model changes
            this.selectedPromptIds.push({
                Engagement: null,
                Appropriateness: null,
                Comprehension: null
            });
            this.customPrompts.push({
                Engagement: null,
                Appropriateness: null,
                Comprehension: null
            });
            this.useVariableInterval.push({
                Engagement: true,
                Appropriateness: true,
                Comprehension: true
            });
            this.goalPercent.push({
                Engagement: null,
                Appropriateness: null,
                Comprehension: null
            });
        }
    },
    data: function data() {
        return {
            selectedLocationIds: [],
            locationLabels: [],
            selectedPromptIds: [],
            customPrompts: [],
            goalPercent: [],
            useVariableInterval: []
        };
    },


    methods: {
        // Vue does not support string interpolation for unbound attributes, so we must use binding to generate the correct attribute values
        // TODO: Clarify the structure/naming scheme
        formAttributeAsPhpArray: function formAttributeAsPhpArray(primaryName, key1, key2) {
            // key1 is required, key2 is optional. TODO: Generalize this
            var value = primaryName + '[' + key1 + ']';
            if (key2) {
                value += '[' + key2 + ']';
            };
            return value;
        },
        toggleLocation: function toggleLocation(event) {
            if (event.target.hasAttribute('aria-controls')) {
                // Assumption: aria-controls has only one id (cf. WAI-ARIA ID reference lists)
                var targetPanelId = event.target.getAttribute('aria-controls');

                // Note that our elements tend to have brackets in their names/ids (see formAttributesAsPhpArray)
                // Without escaping them, jQuery interprets the brackets as attribute selectors
                // This is cleaner :)
                $(document.getElementById(targetPanelId)).collapse('toggle');
            }
        },
        locationCanBeSelected: function locationCanBeSelected(index) {
            // Determine whether a particular location index can be selected in an effort to ensure user interacts
            // with locations form elements "in order" (1 before 2 before … before this.maxNumberOfLocations)
            // Note that order can't be guaranteed and should be validated server-side if needed

            var nextAvailableIndex = this.selectedLocationIds.indexOf(null);
            if (nextAvailableIndex === -1) {
                // Special case: full list means everything is enabled
                return true;
            }
            return index <= nextAvailableIndex;
        },
        locationDisplayName: function locationDisplayName(index, locationId) {
            if (!locationId) {
                return '+ Select a location to enable monitoring';
            }

            // If a custom location label is given, show that alongside the generic location name
            var genericName = this.monitoringLocationNamesById[locationId];
            return 'Monitoring: ' + (this.locationLabels[index] ? this.locationLabels[index] + ' (' + genericName + ')' : genericName);
        },
        customPromptSelected: function customPromptSelected(locationIndex, typeName) {
            // Determine if a custom prompt has been selected for this location and citizenship value type
            // TODO: Don't use hard-coded ids for comparison!! At least use a reverse lookup on phrasing?
            var promptId = this.selectedPromptIds[locationIndex][typeName];
            return promptId == 4 || promptId == 5 || promptId == 6;
        }
    }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "panel-group" },
    _vm._l(_vm.selectedLocationIds, function(locationId, locationIndex) {
      return _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.locationCanBeSelected(locationIndex),
              expression: "locationCanBeSelected(locationIndex)"
            }
          ],
          key: locationIndex,
          staticClass: "panel panel-default"
        },
        [
          _c(
            "div",
            {
              staticClass: "panel-heading",
              attrs: {
                role: "tab",
                id: _vm.formAttributeAsPhpArray("locationTab", locationIndex)
              }
            },
            [
              _c("h2", { staticClass: "panel-title" }, [
                _c(
                  "a",
                  {
                    attrs: {
                      role: "button",
                      "aria-controls": _vm.formAttributeAsPhpArray(
                        "locationPanel",
                        locationIndex
                      )
                    },
                    on: { click: _vm.toggleLocation }
                  },
                  [
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.locationDisplayName(locationIndex, locationId)
                        ) +
                        "\n                "
                    )
                  ]
                )
              ])
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "panel-collapse collapse",
              attrs: {
                id: _vm.formAttributeAsPhpArray("locationPanel", locationIndex),
                role: "tabpanel",
                "aria-labeledby": _vm.formAttributeAsPhpArray(
                  "locationTab",
                  locationIndex
                )
              }
            },
            [
              _c("div", { staticClass: "panel-body" }, [
                _c("fieldset", [
                  _c("div", { staticClass: "row" }, [
                    _c("div", { staticClass: "col-md-6" }, [
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.selectedLocationIds[locationIndex],
                              expression: "selectedLocationIds[locationIndex]"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            name: _vm.formAttributeAsPhpArray(
                              "monitoringLocations",
                              locationIndex
                            ),
                            id: _vm.formAttributeAsPhpArray(
                              "monitoringLocations",
                              locationIndex
                            )
                          },
                          on: {
                            change: function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.$set(
                                _vm.selectedLocationIds,
                                locationIndex,
                                $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              )
                            }
                          }
                        },
                        [
                          _c(
                            "option",
                            {
                              attrs: { disabled: "" },
                              domProps: { value: null }
                            },
                            [_vm._v("Select a location")]
                          ),
                          _vm._v(" "),
                          _vm._l(_vm.monitoringLocationsByCategory, function(
                            locations,
                            categoryName
                          ) {
                            return _c(
                              "optgroup",
                              { attrs: { label: categoryName } },
                              _vm._l(locations, function(location) {
                                return _c(
                                  "option",
                                  {
                                    key: location.id,
                                    domProps: { value: location.id }
                                  },
                                  [
                                    _vm._v(
                                      "\n                                        " +
                                        _vm._s(location.name) +
                                        "\n                                    "
                                    )
                                  ]
                                )
                              })
                            )
                          })
                        ],
                        2
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-md-6" }, [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model.lazy",
                            value: _vm.locationLabels[locationIndex],
                            expression: "locationLabels[locationIndex]",
                            modifiers: { lazy: true }
                          }
                        ],
                        staticClass: "form-control",
                        attrs: {
                          type: "text",
                          name: _vm.formAttributeAsPhpArray(
                            "locationLabels",
                            locationIndex
                          ),
                          disabled: !locationId,
                          placeholder: "(Optional) Location label"
                        },
                        domProps: { value: _vm.locationLabels[locationIndex] },
                        on: {
                          change: function($event) {
                            _vm.$set(
                              _vm.locationLabels,
                              locationIndex,
                              $event.target.value
                            )
                          }
                        }
                      })
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-group" }, [
                    _c(
                      "h3",
                      {
                        staticClass: "col-md-12",
                        staticStyle: {
                          "font-size": "1em",
                          "margin-bottom": "0",
                          "padding-bottom": "0",
                          "padding-top": "0"
                        }
                      },
                      [_vm._v("Citizenship prompts")]
                    ),
                    _vm._v(" "),
                    _c(
                      "fieldset",
                      {
                        staticClass: "col-md-12",
                        attrs: { disabled: !locationId }
                      },
                      [
                        _c("table", { staticClass: "table table-bordered" }, [
                          _c(
                            "tbody",
                            _vm._l(_vm.citizenshipValuesByType, function(
                              citizenshipValues,
                              typeName
                            ) {
                              return _c("tr", [
                                _c("td", [
                                  _c("label", {
                                    attrs: {
                                      for: _vm.formAttributeAsPhpArray(
                                        "citizenshipValues",
                                        locationIndex,
                                        typeName
                                      )
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "select",
                                    {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value:
                                            _vm.selectedPromptIds[
                                              locationIndex
                                            ][typeName],
                                          expression:
                                            "selectedPromptIds[locationIndex][typeName]"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        name: _vm.formAttributeAsPhpArray(
                                          "citizenshipValues",
                                          locationIndex,
                                          typeName
                                        ),
                                        id: _vm.formAttributeAsPhpArray(
                                          "citizenshipValues",
                                          locationIndex,
                                          typeName
                                        )
                                      },
                                      on: {
                                        change: function($event) {
                                          var $$selectedVal = Array.prototype.filter
                                            .call(
                                              $event.target.options,
                                              function(o) {
                                                return o.selected
                                              }
                                            )
                                            .map(function(o) {
                                              var val =
                                                "_value" in o
                                                  ? o._value
                                                  : o.value
                                              return val
                                            })
                                          _vm.$set(
                                            _vm.selectedPromptIds[
                                              locationIndex
                                            ],
                                            typeName,
                                            $event.target.multiple
                                              ? $$selectedVal
                                              : $$selectedVal[0]
                                          )
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "option",
                                        { domProps: { value: null } },
                                        [
                                          _vm._v(
                                            "Select " +
                                              _vm._s(typeName) +
                                              " prompt"
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm._l(citizenshipValues, function(
                                        citizenshipValue
                                      ) {
                                        return _c(
                                          "option",
                                          {
                                            key: citizenshipValue.id,
                                            domProps: {
                                              value: citizenshipValue.id
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                                                    " +
                                                _vm._s(
                                                  citizenshipValue.phrasing
                                                ) +
                                                "\n                                                "
                                            )
                                          ]
                                        )
                                      })
                                    ],
                                    2
                                  ),
                                  _vm._v(" "),
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model.lazy",
                                        value:
                                          _vm.customPrompts[locationIndex][
                                            typeName
                                          ],
                                        expression:
                                          "customPrompts[locationIndex][typeName]",
                                        modifiers: { lazy: true }
                                      },
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: _vm.customPromptSelected(
                                          locationIndex,
                                          typeName
                                        ),
                                        expression:
                                          "customPromptSelected(locationIndex, typeName)"
                                      }
                                    ],
                                    staticClass: "form-control",
                                    attrs: {
                                      type: "text",
                                      name: _vm.formAttributeAsPhpArray(
                                        "customPrompts",
                                        locationIndex,
                                        typeName
                                      ),
                                      disabled: !_vm.customPromptSelected(
                                        locationIndex,
                                        typeName
                                      ),
                                      placeholder:
                                        "E.g. Are you meeting your citizenship objective?"
                                    },
                                    domProps: {
                                      value:
                                        _vm.customPrompts[locationIndex][
                                          typeName
                                        ]
                                    },
                                    on: {
                                      change: function($event) {
                                        _vm.$set(
                                          _vm.customPrompts[locationIndex],
                                          typeName,
                                          $event.target.value
                                        )
                                      }
                                    }
                                  })
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "div",
                                    {
                                      staticClass: "radio",
                                      attrs: {
                                        title:
                                          "Variable intervals do not guarantee a sample mean. Generated intervals may be as low as 33% and as high as 167% of the desired mean."
                                      }
                                    },
                                    [
                                      _c("label", [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value:
                                                _vm.useVariableInterval[
                                                  locationIndex
                                                ][typeName],
                                              expression:
                                                "useVariableInterval[locationIndex][typeName]"
                                            }
                                          ],
                                          attrs: {
                                            type: "radio",
                                            name: _vm.formAttributeAsPhpArray(
                                              "isVariableInterval",
                                              locationIndex,
                                              typeName
                                            ),
                                            disabled: !_vm.selectedPromptIds[
                                              locationIndex
                                            ][typeName]
                                          },
                                          domProps: {
                                            value: true,
                                            checked: _vm._q(
                                              _vm.useVariableInterval[
                                                locationIndex
                                              ][typeName],
                                              true
                                            )
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.$set(
                                                _vm.useVariableInterval[
                                                  locationIndex
                                                ],
                                                typeName,
                                                true
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(
                                          "\n                                                    Variable interval\n                                                "
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c("span", {
                                        staticClass:
                                          "glyphicon glyphicon-info-sign",
                                        attrs: { "aria-hidden": "true" }
                                      })
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "radio" }, [
                                    _c("label", [
                                      _c("input", {
                                        directives: [
                                          {
                                            name: "model",
                                            rawName: "v-model",
                                            value:
                                              _vm.useVariableInterval[
                                                locationIndex
                                              ][typeName],
                                            expression:
                                              "useVariableInterval[locationIndex][typeName]"
                                          }
                                        ],
                                        attrs: {
                                          type: "radio",
                                          name: _vm.formAttributeAsPhpArray(
                                            "isVariableInterval",
                                            locationIndex,
                                            typeName
                                          ),
                                          disabled: !_vm.selectedPromptIds[
                                            locationIndex
                                          ][typeName]
                                        },
                                        domProps: {
                                          value: false,
                                          checked: _vm._q(
                                            _vm.useVariableInterval[
                                              locationIndex
                                            ][typeName],
                                            false
                                          )
                                        },
                                        on: {
                                          change: function($event) {
                                            _vm.$set(
                                              _vm.useVariableInterval[
                                                locationIndex
                                              ],
                                              typeName,
                                              false
                                            )
                                          }
                                        }
                                      }),
                                      _vm._v(
                                        "\n                                                    Fixed interval\n                                                "
                                      )
                                    ])
                                  ])
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value:
                                            _vm.useVariableInterval[
                                              locationIndex
                                            ][typeName],
                                          expression:
                                            "useVariableInterval[locationIndex][typeName]"
                                        }
                                      ]
                                    },
                                    [
                                      _c(
                                        "label",
                                        {
                                          attrs: {
                                            for: _vm.formAttributeAsPhpArray(
                                              "desiredMeanInSeconds",
                                              locationIndex,
                                              typeName
                                            )
                                          }
                                        },
                                        [
                                          _vm._v(
                                            "\n                                                    Desired mean interval\n                                                "
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "select",
                                        {
                                          directives: [
                                            {
                                              name: "show",
                                              rawName: "v-show",
                                              value:
                                                _vm.useVariableInterval[
                                                  locationIndex
                                                ][typeName],
                                              expression:
                                                "useVariableInterval[locationIndex][typeName]"
                                            }
                                          ],
                                          staticClass: "form-control",
                                          attrs: {
                                            name: _vm.formAttributeAsPhpArray(
                                              "desiredMeanInSeconds",
                                              locationIndex,
                                              typeName
                                            ),
                                            id: _vm.formAttributeAsPhpArray(
                                              "desiredMeanInSeconds",
                                              locationIndex,
                                              typeName
                                            ),
                                            disabled: !_vm.selectedPromptIds[
                                              locationIndex
                                            ][typeName]
                                          }
                                        },
                                        [
                                          _c(
                                            "option",
                                            {
                                              attrs: { value: "", selected: "" }
                                            },
                                            [_vm._v("Select a desired mean")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "30" } },
                                            [_vm._v("30 seconds")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "60" } },
                                            [_vm._v("60 seconds")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "120" } },
                                            [_vm._v("2 minutes")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "180" } },
                                            [_vm._v("3 minutes")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "300" } },
                                            [_vm._v("5 minutes")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "600" } },
                                            [_vm._v("10 minutes")]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "option",
                                            { attrs: { value: "1800" } },
                                            [_vm._v("30 minutes")]
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      directives: [
                                        {
                                          name: "show",
                                          rawName: "v-show",
                                          value: !_vm.useVariableInterval[
                                            locationIndex
                                          ][typeName],
                                          expression:
                                            "!useVariableInterval[locationIndex][typeName]"
                                        }
                                      ]
                                    },
                                    [
                                      _c("div", { staticClass: "row" }, [
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "label",
                                            {
                                              attrs: {
                                                for: _vm.formAttributeAsPhpArray(
                                                  "intervalHours",
                                                  locationIndex,
                                                  typeName
                                                )
                                              }
                                            },
                                            [_vm._v("Hours")]
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "label",
                                            {
                                              attrs: {
                                                for: _vm.formAttributeAsPhpArray(
                                                  "intervalMinutes",
                                                  locationIndex,
                                                  typeName
                                                )
                                              }
                                            },
                                            [_vm._v("Minutes")]
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "label",
                                            {
                                              attrs: {
                                                for: _vm.formAttributeAsPhpArray(
                                                  "intervalSeconds",
                                                  locationIndex,
                                                  typeName
                                                )
                                              }
                                            },
                                            [_vm._v("Seconds")]
                                          )
                                        ])
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "row" }, [
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "select",
                                            {
                                              staticClass: "form-control",
                                              attrs: {
                                                name: _vm.formAttributeAsPhpArray(
                                                  "intervalHours",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                id: _vm.formAttributeAsPhpArray(
                                                  "intervalHours",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                disabled: !_vm
                                                  .selectedPromptIds[
                                                  locationIndex
                                                ][typeName]
                                              }
                                            },
                                            _vm._l(25, function(i) {
                                              return _c("option", { key: i }, [
                                                _vm._v(_vm._s(i - 1))
                                              ])
                                            })
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "select",
                                            {
                                              staticClass: "form-control",
                                              attrs: {
                                                name: _vm.formAttributeAsPhpArray(
                                                  "intervalMinutes",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                id: _vm.formAttributeAsPhpArray(
                                                  "intervalMinutes",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                disabled: !_vm
                                                  .selectedPromptIds[
                                                  locationIndex
                                                ][typeName]
                                              }
                                            },
                                            _vm._l(60, function(i) {
                                              return _c("option", { key: i }, [
                                                _vm._v(
                                                  "\n                                                                " +
                                                    _vm._s(i - 1) +
                                                    "\n                                                            "
                                                )
                                              ])
                                            })
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "col-sm-4" }, [
                                          _c(
                                            "select",
                                            {
                                              staticClass: "form-control",
                                              attrs: {
                                                name: _vm.formAttributeAsPhpArray(
                                                  "intervalSeconds",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                id: _vm.formAttributeAsPhpArray(
                                                  "intervalSeconds",
                                                  locationIndex,
                                                  typeName
                                                ),
                                                disabled: !_vm
                                                  .selectedPromptIds[
                                                  locationIndex
                                                ][typeName]
                                              }
                                            },
                                            _vm._l(60, function(i) {
                                              return _c("option", { key: i }, [
                                                _vm._v(_vm._s(i - 1))
                                              ])
                                            })
                                          )
                                        ])
                                      ])
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c("td", [
                                  _c(
                                    "label",
                                    {
                                      attrs: {
                                        for: _vm.formAttributeAsPhpArray(
                                          "goals",
                                          locationIndex,
                                          typeName
                                        )
                                      }
                                    },
                                    [_vm._v("Goal %")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "select",
                                    {
                                      staticClass: "form-control",
                                      attrs: {
                                        name: _vm.formAttributeAsPhpArray(
                                          "goals",
                                          locationIndex,
                                          typeName
                                        ),
                                        id: _vm.formAttributeAsPhpArray(
                                          "goals",
                                          locationIndex,
                                          typeName
                                        ),
                                        disabled: !_vm.selectedPromptIds[
                                          locationIndex
                                        ][typeName]
                                      }
                                    },
                                    [
                                      _c(
                                        "option",
                                        { attrs: { value: "", selected: "" } },
                                        [_vm._v("No goal")]
                                      ),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "50" } }, [
                                        _vm._v("50%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "55" } }, [
                                        _vm._v("55%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "60" } }, [
                                        _vm._v("60%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "65" } }, [
                                        _vm._v("65%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "70" } }, [
                                        _vm._v("70%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "75" } }, [
                                        _vm._v("75%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "80" } }, [
                                        _vm._v("80%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "85" } }, [
                                        _vm._v("85%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "90" } }, [
                                        _vm._v("90%")
                                      ]),
                                      _vm._v(" "),
                                      _c("option", { attrs: { value: "95" } }, [
                                        _vm._v("95%")
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "option",
                                        { attrs: { value: "100" } },
                                        [_vm._v("100%")]
                                      )
                                    ]
                                  )
                                ])
                              ])
                            })
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "clearfix" })
                  ])
                ])
              ])
            ]
          )
        ]
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1a8d4186", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(21)
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/DualList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68310b71", Component.options)
  } else {
    hotAPI.reload("data-v-68310b71", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    created: function created() {
        var _this = this;

        // Set up non-reactive properties/methods
        this.findStudentIndexById = function (studentArr, id) {
            for (var i = 0; i < studentArr.length; i++) {
                if (studentArr[i].id === id) {
                    return i;
                }
            }
            return -1;
        };

        // Remove an item, specified by id, from an array
        this.removeFrom = function (studentArr, id) {
            var index = _this.findStudentIndexById(studentArr, id);
            if (index !== -1) {
                return studentArr.splice(index, 1)[0];
            }
        };

        // Move `sourceSelection` from `source` into `destination` and `destinationSelection`.
        // See export methods below { moveSomeRight() and moveSomeLeft() }
        this.moveSome = function (sourceSelection, destinationSelection, source, destination) {
            var selectedIds = sourceSelection.splice(0);
            var toMove = [];
            selectedIds.forEach(function (studentId) {
                toMove.push(_this.removeFrom(source, studentId));
            });
            destination.push.apply(destination, toMove);

            // Select the values once they're on the other side
            destinationSelection.push.apply(destinationSelection, _toConsumableArray(selectedIds));

            return selectedIds;
        };

        // Track available options based on supplied initial prop
        this.available = this.availableStudents;
    },


    props: ['availableStudents'],

    data: function data() {
        return {
            available: [],
            assigned: [],
            availableSelectedIds: [],
            assignedSelectedIds: []
        };
    },


    computed: {
        allRightDisabled: function allRightDisabled() {
            return this.available.length === 0;
        },
        allLeftDisabled: function allLeftDisabled() {
            return this.assigned.length === 0;
        },
        someRightDisabled: function someRightDisabled() {
            return this.availableSelectedIds.length === 0;
        },
        someLeftDisabled: function someLeftDisabled() {
            return this.assignedSelectedIds.length === 0;
        }
    },

    methods: {
        moveAllRight: function moveAllRight() {
            // Select all, then move
            this.availableSelectedIds = this.available.map(function (student) {
                return student.id;
            });
            this.moveSome(this.availableSelectedIds, this.assignedSelectedIds, this.available, this.assigned);
        },
        moveAllLeft: function moveAllLeft() {
            // Select all, then move
            this.assignedSelectedIds = this.assigned.map(function (student) {
                return student.id;
            });
            this.moveSome(this.assignedSelectedIds, this.availableSelectedIds, this.assigned, this.available);
        },
        moveSomeRight: function moveSomeRight() {
            this.moveSome(this.availableSelectedIds, this.assignedSelectedIds, this.available, this.assigned);
        },
        moveSomeLeft: function moveSomeLeft() {
            this.moveSome(this.assignedSelectedIds, this.availableSelectedIds, this.assigned, this.available);
        }
    }
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c(
      "label",
      {
        staticClass: "col-md-6 control-label-left",
        attrs: { for: "student-list-available" }
      },
      [_vm._v("Available")]
    ),
    _vm._v(" "),
    _c(
      "label",
      {
        staticClass: "col-md-6 control-label-left",
        attrs: { for: "student-list-assigned" }
      },
      [_vm._v("Assigned")]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "col-md-5" }, [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.availableSelectedIds,
              expression: "availableSelectedIds"
            }
          ],
          staticClass: "form-control",
          attrs: { id: "student-list-available", multiple: "", size: "7" },
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.availableSelectedIds = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0]
            }
          }
        },
        _vm._l(_vm.available, function(student) {
          return _c(
            "option",
            { key: student.id, domProps: { value: student.id } },
            [_vm._v(_vm._s(student.full_name))]
          )
        })
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-md-1" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-default btn-sm btn-block",
          attrs: {
            type: "button",
            title: "All right",
            disabled: _vm.allRightDisabled
          },
          on: { click: _vm.moveAllRight }
        },
        [
          _c("span", {
            staticClass: "glyphicon glyphicon-th-list",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", {
            staticClass: "glyphicon glyphicon-chevron-right",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "sr-only" }, [
            _vm._v("Add all available children")
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-default btn-sm btn-block",
          attrs: {
            type: "button",
            title: "Move right",
            disabled: _vm.someRightDisabled
          },
          on: { click: _vm.moveSomeRight }
        },
        [
          _c("span", {
            staticClass: "glyphicon glyphicon-chevron-right",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "sr-only" }, [
            _vm._v("Add selected children")
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-default btn-sm btn-block",
          attrs: {
            type: "button",
            title: "Move left",
            disabled: _vm.someLeftDisabled
          },
          on: { click: _vm.moveSomeLeft }
        },
        [
          _c("span", {
            staticClass: "glyphicon glyphicon-chevron-left",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "sr-only" }, [
            _vm._v("Remove selected children")
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "btn btn-default btn-sm btn-block",
          attrs: {
            type: "button",
            title: "All left",
            disabled: _vm.allLeftDisabled
          },
          on: { click: _vm.moveAllLeft }
        },
        [
          _c("span", {
            staticClass: "glyphicon glyphicon-chevron-left",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", {
            staticClass: "glyphicon glyphicon-th-list",
            attrs: { "aria-hidden": "true" }
          }),
          _vm._v(" "),
          _c("span", { staticClass: "sr-only" }, [
            _vm._v("Remove all children")
          ])
        ]
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-md-5" }, [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.assignedSelectedIds,
              expression: "assignedSelectedIds"
            }
          ],
          staticClass: "form-control",
          attrs: {
            id: "student-list-assigned",
            name: "student-list-assigned[]",
            multiple: "",
            size: "7"
          },
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.assignedSelectedIds = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0]
            }
          }
        },
        _vm._l(_vm.assigned, function(student) {
          return _c(
            "option",
            { key: student.id, domProps: { value: student.id } },
            [_vm._v(_vm._s(student.full_name))]
          )
        })
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "clearfix" })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68310b71", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(24)
/* template */
var __vue_template__ = __webpack_require__(29)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/RegistrationAuthFields.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-092fb611", Component.options)
  } else {
    hotAPI.reload("data-v-092fb611", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zxcvbn__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zxcvbn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_zxcvbn__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Username and password registration form fields. The password is also rated based on zxcvbn score.
 */



/* harmony default export */ __webpack_exports__["default"] = ({
    created: function created() {
        // Set up non-reactive properties
        this.passwordIndicators = {
            0: { label: 'Very poor', textClass: 'text-danger' },
            1: { label: 'Poor', textClass: 'text-danger' },
            2: { label: 'Satisfactory', textClass: 'text-warning' },
            3: { label: 'Good', textClass: 'text-success' },
            4: { label: 'Excellent', textClass: 'text-success' }
        };

        // Set the username value based on an initial value (if provided)
        if (this.oldUsername) {
            this.username = this.oldUsername;
        }
    },


    props: ['oldUsername', 'useEmail'],

    data: function data() {
        return {
            username: '',
            password: ''
        };
    },


    computed: {
        passwordScore: function passwordScore() {
            return this.password.length === 0 ? null : __WEBPACK_IMPORTED_MODULE_0_zxcvbn___default()(this.password, [this.username]).score;
        },
        passwordRating: function passwordRating() {
            return this.passwordScore === null ? '' : this.passwordIndicators[this.passwordScore].label;
        },
        ratingClass: function ratingClass() {
            return this.passwordScore === null ? '' : this.passwordIndicators[this.passwordScore].textClass;
        },
        iconClass: function iconClass() {
            return this.passwordScore === null ? '' : 'glyphicon glyphicon-lock';
        }
    }

});

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.useEmail
      ? _c("div", { staticClass: "form-group" }, [
          _c("label", { attrs: { for: "email" } }, [_vm._v("Email address")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.username,
                expression: "username"
              }
            ],
            staticClass: "form-control",
            attrs: { type: "email", name: "email", id: "email", required: "" },
            domProps: { value: _vm.username },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.username = $event.target.value
              }
            }
          })
        ])
      : _c("div", { staticClass: "form-group" }, [
          _c("label", { attrs: { for: "username" } }, [_vm._v("Username")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.username,
                expression: "username"
              }
            ],
            staticClass: "form-control",
            attrs: {
              type: "text",
              name: "username",
              id: "username",
              required: "",
              "aria-describedby": "username-help"
            },
            domProps: { value: _vm.username },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.username = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _c(
            "span",
            { staticClass: "help-block", attrs: { id: "username-help" } },
            [
              _vm._v(
                "Must contain at least 6 characters, including 1 letter and 1 number"
              )
            ]
          )
        ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "password" } }, [_vm._v("Password")]),
      _vm._v(" "),
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model",
            value: _vm.password,
            expression: "password"
          }
        ],
        staticClass: "form-control",
        attrs: {
          type: "password",
          name: "password",
          id: "password",
          required: "",
          autocomplete: "new-password"
        },
        domProps: { value: _vm.password },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.password = $event.target.value
          }
        }
      }),
      _vm._v(" "),
      _c("div", { class: _vm.ratingClass }, [
        _c("span", [_vm._v(_vm._s(_vm.passwordRating))]),
        _vm._v(" "),
        _c("span", { class: _vm.iconClass, attrs: { "aria-hidden": "true" } })
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-092fb611", module.exports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(34)
/* template */
var __vue_template__ = __webpack_require__(39)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-706c1571"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/Registration/RegistrationForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-706c1571", Component.options)
  } else {
    hotAPI.reload("data-v-706c1571", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("53ac0e7c", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-706c1571\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RegistrationForm.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-706c1571\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./RegistrationForm.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "\n.stepper[data-v-706c1571] {\n  margin-left: 12.5%;\n}\n.question[data-v-706c1571] {\n  font-weight: 600;\n  border: solid 1px #757575;\n  padding: 25px 30px;\n  width: 90%;\n  margin: auto;\n}\n.action[data-v-706c1571] {\n  margin-top: 40px;\n  margin-bottom: 100px;\n}\n.role[data-v-706c1571] {\n  padding: 10px;\n}\n.panel[data-v-706c1571] {\n  padding: 15px 5px;\n}\n.select-pannel-body[data-v-706c1571] {\n  min-height: 130px;\n  margin-bottom: 10px;\n}\n.registration-btn[data-v-706c1571] {\n  margin: 20px 10px 0px;\n  padding: 10px 40px;\n  margin-bottom: 20px;\n}\n.issue[data-v-706c1571] {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  font-size: 1.2em;\n  padding: 3px 15px;\n}\n#stepper-step-3 .action[data-v-706c1571] {\n  padding: 25px 30px;\n}\n#site_facilitator[data-v-706c1571] {\n  margin-bottom: 15px;\n}\n.stepper .nav-tabs [data-toggle='tab'][data-v-706c1571] {\n  width: 25px;\n  height: 25px;\n  margin: 20px auto;\n  border: none;\n  padding: 0px;\n}\n.stepper .nav-tabs[data-v-706c1571] {\n  margin-bottom: 40px;\n  border: none;\n}\n.stepper .round-tab[data-v-706c1571] {\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  line-height: 60px;\n  display: inline-block;\n  z-index: 2;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n}\n.stepper .nav-tabs > li[data-v-706c1571] {\n  width: 33%;\n  position: relative;\n}\n.wizard-progress-with-circle[data-v-706c1571] {\n  position: relative;\n  top: 50px;\n  height: 4px;\n  margin: auto;\n  width: 70%;\n}\ndiv.issue.checkbox[data-v-706c1571] {\n  font-size: 12px;\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VModal_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VModal_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            showModal: false,
            issueModal: false
        };
    }
});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(10)("edf4606e", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-39d4b54e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VModal.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-39d4b54e\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./VModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(9)(false);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-39d4b54e] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-39d4b54e] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.modal-container[data-v-39d4b54e] {\n  width: 600px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-header h3[data-v-39d4b54e] {\n  margin-top: 0;\n  color: #42b983;\n  font-size: 30px !important;\n}\n.modal-body[data-v-39d4b54e] {\n  margin: 20px 0;\n  font-size: 1.4em;\n}\n.modal-default-button[data-v-39d4b54e] {\n  margin: auto;\n}\n.modal-enter[data-v-39d4b54e] {\n  opacity: 0;\n}\n.modal-leave-active[data-v-39d4b54e] {\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-39d4b54e],\n.modal-leave-active .modal-container[data-v-39d4b54e] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.modal-footer[data-v-39d4b54e] {\n  text-align: center;\n}\n.btn-close[data-v-39d4b54e] {\n  border: none;\n  font-size: 20px;\n  padding: 20px;\n  cursor: pointer;\n  font-weight: bold;\n  color: #4AAE9B;\n  background: transparent;\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'v-modal',
    props: {
        actionurl: {
            type: String
        }

    },
    methods: {
        close: function close() {
            this.$emit('close');
        },
        submit: function submit() {
            __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get('/').catch(function (error) {
                console.log(error);
            });
        }
    }
});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "modal" } }, [
    _c("div", { staticClass: "modal-mask" }, [
      _c("div", { staticClass: "modal-wrapper" }, [
        _c("div", { staticClass: "modal-container" }, [
          _c(
            "div",
            { staticClass: "modal-header" },
            [
              _vm._t("header", [
                _vm._v(
                  "\n                    default header\n                    "
                ),
                _c(
                  "button",
                  {
                    staticClass: "btn-close",
                    attrs: { type: "button" },
                    on: { click: _vm.close }
                  },
                  [_vm._v("\n                        x\n                    ")]
                )
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "modal-body" },
            [
              _vm._t("body", [
                _vm._v(
                  "\n                    default body\n                    "
                )
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "modal-footer" },
            [
              _vm._t("footer", [
                _c(
                  "a",
                  {
                    staticClass: "modal-default-button btn btn-red",
                    attrs: { href: "/login" },
                    on: { click: _vm.close }
                  },
                  [
                    _vm._t("close", [
                      _vm._v(
                        "\n                            OK\n                        "
                      )
                    ])
                  ],
                  2
                ),
                _vm._v(" "),
                _vm.actionurl
                  ? _c(
                      "a",
                      {
                        staticClass:
                          "modal-default-button btn btn-cta btn-blue",
                        attrs: { href: _vm.actionurl },
                        on: { click: _vm.submit }
                      },
                      [
                        _vm._t("action", [
                          _vm._v(
                            "\n                            Submit\n                        "
                          )
                        ])
                      ],
                      2
                    )
                  : _vm._e()
              ])
            ],
            2
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-39d4b54e", module.exports)
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row text-center" }, [
      _c(
        "div",
        { staticClass: "col-md-9 stepper" },
        [
          _c("form", { attrs: { action: "POST" } }, [
            _vm._m(0),
            _vm._v(" "),
            _vm._m(1),
            _vm._v(" "),
            _c("div", { staticClass: "tab-content" }, [
              _vm._m(2),
              _vm._v(" "),
              _vm._m(3),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane fade",
                  attrs: { role: "tabpanel", id: "stepper-step-3" }
                },
                [
                  _vm._m(4),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-lg btn-cta registration-btn",
                      attrs: { href: "#", id: "show-modal" },
                      on: {
                        click: function($event) {
                          _vm.showModal = true
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                            Finish Registration!\n                        "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-lg issue btn-red",
                        attrs: { id: "issue-modal", type: "button" },
                        on: {
                          click: function($event) {
                            _vm.issueModal = true
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                                Registration Issue\n                            "
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm.showModal
                    ? _c(
                        "v-modal",
                        {
                          on: {
                            close: function($event) {
                              _vm.showModal = false
                            }
                          }
                        },
                        [
                          _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                            _vm._v(
                              '\n                                Account Submitted An email has been sent to the email provided. \n                                Please log in to your email and verify your account to begin using I-Connect. Your email will be\n                                your default username and you will be provided a temporary one-time use password. Once you log in to the \n                                I-Connect Web page, click on "My Account" to set a new password.\n                            '
                            )
                          ]),
                          _vm._v(" "),
                          _c(
                            "h3",
                            { attrs: { slot: "header" }, slot: "header" },
                            [_vm._v("Account Submitted!")]
                          )
                        ]
                      )
                    : _vm._e()
                ],
                1
              )
            ])
          ]),
          _vm._v(" "),
          _vm.issueModal
            ? _c(
                "v-modal",
                {
                  attrs: { actionurl: "/login" },
                  on: {
                    close: function($event) {
                      _vm.issueModal = false
                    }
                  }
                },
                [
                  _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                    _c("div", { staticClass: "personal-info form-group row" }, [
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          staticClass: "form-control",
                          attrs: {
                            id: "first_name_issue",
                            type: "text",
                            name: "first_name_issue",
                            placeholder: "First Name",
                            autocomplete: "given-name"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          staticClass: "form-control",
                          attrs: {
                            id: "last_name_issue",
                            type: "text",
                            name: "last_name_issue",
                            placeholder: "Last Name",
                            autocomplete: "family-name"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-6" }, [
                        _c("input", {
                          staticClass: "form-control",
                          attrs: {
                            id: "school_email",
                            type: "email",
                            name: "email",
                            placeholder: "School Email Address",
                            autocomplete: "email",
                            required: ""
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "location form-group row" }, [
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            staticClass: "form-control",
                            attrs: {
                              name: "state",
                              id: "state_issue",
                              autocomplete: "address-level1"
                            }
                          },
                          [
                            _c("option", { attrs: { value: "state" } }, [
                              _vm._v("State")
                            ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            staticClass: "form-control",
                            attrs: {
                              name: "county",
                              id: "county_issue",
                              autocomplete: "address-level1"
                            }
                          },
                          [
                            _c("option", { attrs: { value: "county" } }, [
                              _vm._v("County")
                            ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            staticClass: "form-control",
                            attrs: {
                              name: "district",
                              id: "district_issue",
                              autocomplete: "address-level2"
                            }
                          },
                          [
                            _c("option", { attrs: { value: "district" } }, [
                              _vm._v("District")
                            ])
                          ]
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            staticClass: "form-control",
                            attrs: { name: "school", id: "school_issue" }
                          },
                          [
                            _c("option", { attrs: { value: "school" } }, [
                              _vm._v("School")
                            ])
                          ]
                        )
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "location form-group row" }, [
                      _c("div", { staticClass: "col-xs-4" }, [
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              attrs: { type: "checkbox", name: "remember" }
                            }),
                            _vm._v(" District not displayed")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              attrs: { type: "checkbox", name: "remember" }
                            }),
                            _vm._v(" School not displayed")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              attrs: { type: "checkbox", name: "remember" }
                            }),
                            _vm._v(" Outside of United States")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              attrs: { type: "checkbox", name: "remember" }
                            }),
                            _vm._v(" Other reason")
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-8" }, [
                        _c("textarea", {
                          staticClass: "form-control",
                          attrs: {
                            name: "issue_text",
                            id: "issue_text",
                            cols: "30",
                            rows: "6",
                            placeholder: "Please explain issue here..."
                          }
                        })
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("h3", { attrs: { slot: "header" }, slot: "header" }, [
                    _vm._v("Having difficulties registering?")
                  ]),
                  _vm._v(" "),
                  _c("span", { attrs: { slot: "close" }, slot: "close" }, [
                    _vm._v("Cancel")
                  ])
                ]
              )
            : _vm._e()
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "wizard-progress-with-circle" }, [
      _c("div", {
        staticClass: "wizard-progress-bar",
        staticStyle: {
          "background-color": "rgb(231, 76, 60)",
          color: "rgb(231, 76, 60)",
          width: "16.6667%"
        }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "ul",
      { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
      [
        _c("li", { staticClass: "active", attrs: { role: "presentation" } }, [
          _c(
            "a",
            {
              staticClass: "persistant-disabled",
              attrs: {
                href: "#stepper-step-1",
                "data-toggle": "tab",
                "aria-controls": "stepper-step-1",
                role: "tab",
                title: "Step 1"
              }
            },
            [
              _c(
                "span",
                {
                  staticClass: "round-tab glyphicon glyphicon-book gray-border"
                },
                [_vm._v("1")]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "disabled", attrs: { role: "presentation" } }, [
          _c(
            "a",
            {
              staticClass: "persistant-disabled",
              attrs: {
                href: "#stepper-step-2",
                "data-toggle": "tab",
                "aria-controls": "stepper-step-2",
                role: "tab",
                title: "Step 2"
              }
            },
            [
              _c(
                "span",
                {
                  staticClass:
                    "round-tab glyphicon glyphicon-pencil gray-border"
                },
                [_vm._v("2")]
              )
            ]
          )
        ]),
        _vm._v(" "),
        _c("li", { staticClass: "disabled", attrs: { role: "presentation" } }, [
          _c(
            "a",
            {
              staticClass: "persistant-disabled",
              attrs: {
                href: "#stepper-step-3",
                "data-toggle": "tab",
                "aria-controls": "stepper-step-3",
                role: "tab",
                title: "Step 3"
              }
            },
            [
              _c(
                "span",
                {
                  staticClass:
                    "round-tab glyphicon glyphicon-list-alt gray-border"
                },
                [_vm._v("3")]
              )
            ]
          )
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "tab-pane fade in active",
        attrs: { role: "tabpanel", id: "stepper-step-1" }
      },
      [
        _c("h2", { staticClass: "question" }, [
          _vm._v("Are you a School District Employee?")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "action" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-default btn-cta",
              attrs: { type: "button" }
            },
            [_vm._v("YES")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-default btn-cta btn-red",
              attrs: { type: "button" }
            },
            [_vm._v("NO")]
          )
        ]),
        _vm._v(" "),
        _c("a", { staticClass: "btn btn-info btn-lg", attrs: { href: "#" } }, [
          _c("span", { staticClass: "glyphicon glyphicon-arrow-right" }),
          _vm._v(" Step 2/3\n                        ")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass: "tab-pane fade",
        attrs: { role: "tabpanel", id: "stepper-step-2" }
      },
      [
        _c("div", { staticClass: "action" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-md-4 role" }, [
              _c(
                "div",
                {
                  staticClass: "panel panel-default select-pannel gray-border"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "pannel-body select-pannel-body gray-border"
                    },
                    [
                      _c("h3", [_vm._v("FACLILTATOR")]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "I will be mananging several Schools, Teachers/Mentors,\n                                                and Studnents in my district.\n                                            "
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-cta",
                      attrs: { type: "button" }
                    },
                    [_vm._v("Select")]
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-4 role" }, [
              _c(
                "div",
                {
                  staticClass: "panel panel-default select-pannel gray-border"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "pannel-body select-pannel-body gray-border"
                    },
                    [
                      _c("h3", [_vm._v("SITE FACLILTATOR")]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "I will be mananging several Teachers/Mentors,\n                                                and Studnents in my school.\n                                            "
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-cta",
                      attrs: { type: "button" }
                    },
                    [_vm._v("Select")]
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-4 role" }, [
              _c(
                "div",
                {
                  staticClass: "panel panel-default select-pannel gray-border"
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "pannel-body select-pannel-body gray-border"
                    },
                    [
                      _c("h3", [_vm._v("SCHOOL MENTOR")]),
                      _vm._v(" "),
                      _c("p", [
                        _vm._v(
                          "I will be mananging several Studnents in my school.\n                                            "
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-cta",
                      attrs: { type: "button" }
                    },
                    [_vm._v("Select")]
                  )
                ]
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("a", { staticClass: "btn btn-info btn-lg", attrs: { href: "#" } }, [
          _c("span", { staticClass: "glyphicon glyphicon-arrow-right" }),
          _vm._v(" Step 3/3\n                        ")
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "action gray-border" }, [
      _c("div", { staticClass: "personal-info form-group row" }, [
        _c("div", { staticClass: "col-xs-3" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: {
              id: "first_name",
              type: "text",
              name: "first_name",
              placeholder: "First Name",
              autocomplete: "given-name"
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-3" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: {
              id: "last_name",
              type: "text",
              name: "last_name",
              placeholder: "Last Name",
              autocomplete: "family-name"
            }
          })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-6" }, [
          _c("input", {
            staticClass: "form-control",
            attrs: {
              id: "school_email",
              type: "email",
              name: "email",
              placeholder: "School Email Address",
              autocomplete: "email",
              required: ""
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "location form-group row" }, [
        _c("div", { staticClass: "col-xs-3" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: {
                name: "state",
                id: "state",
                autocomplete: "address-level1"
              }
            },
            [_c("option", { attrs: { value: "state" } }, [_vm._v("State")])]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-3" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: {
                name: "county",
                id: "county",
                autocomplete: "address-level1"
              }
            },
            [_c("option", { attrs: { value: "county" } }, [_vm._v("County")])]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-3" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: {
                name: "district",
                id: "district",
                autocomplete: "address-level2"
              }
            },
            [
              _c("option", { attrs: { value: "district" } }, [
                _vm._v("District")
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-3" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: { name: "school", id: "school" }
            },
            [_c("option", { attrs: { value: "school" } }, [_vm._v("School")])]
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "query form-group row" }, [
        _c("div", { staticClass: "col-xs-10 col-xs-offset-1" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: { name: "site_facilitator", id: "site_facilitator" }
            },
            [
              _c("option", { attrs: { value: "" } }, [
                _vm._v("Select Site Facilitator")
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-xs-10 col-xs-offset-1" }, [
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: { name: "referral_source", id: "referral_source" }
            },
            [
              _c("option", { attrs: { value: "" } }, [
                _vm._v("How did you hear about I-Connect")
              ])
            ]
          )
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-706c1571", module.exports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(54);
var isBuffer = __webpack_require__(61);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(52);
var normalizeHeaderName = __webpack_require__(63);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(55);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(55);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)))

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);
var settle = __webpack_require__(64);
var buildURL = __webpack_require__(66);
var parseHeaders = __webpack_require__(67);
var isURLSameOrigin = __webpack_require__(68);
var createError = __webpack_require__(56);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(69);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(70);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(65);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(60);

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);
var bind = __webpack_require__(54);
var Axios = __webpack_require__(62);
var defaults = __webpack_require__(53);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(58);
axios.CancelToken = __webpack_require__(76);
axios.isCancel = __webpack_require__(57);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(77);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(53);
var utils = __webpack_require__(52);
var InterceptorManager = __webpack_require__(71);
var dispatchRequest = __webpack_require__(72);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(56);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);
var transformData = __webpack_require__(73);
var isCancel = __webpack_require__(57);
var defaults = __webpack_require__(53);
var isAbsoluteURL = __webpack_require__(74);
var combineURLs = __webpack_require__(75);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(52);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(58);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ })
],[12]);