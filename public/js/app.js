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
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(10);
module.exports = __webpack_require__(35);


/***/ }),
/* 10 */
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

Vue.component('citizenship-value-fields', __webpack_require__(14));
Vue.component('dual-list', __webpack_require__(17));
Vue.component('registration-auth-fields', __webpack_require__(20));
Vue.component('registration-form', __webpack_require__(27));

// Instantiate root Vue
app = new Vue({
  el: '#app'
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(15)
/* template */
var __vue_template__ = __webpack_require__(16)
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
/* 15 */
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
/* 16 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(21)
/* template */
var __vue_template__ = __webpack_require__(26)
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
/* 21 */
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
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(33)
/* template */
var __vue_template__ = __webpack_require__(34)
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(31)("53ac0e7c", content, false, {});
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(30)(false);
// imports


// module
exports.push([module.i, "\n.stepper[data-v-706c1571] {\n  margin-left: 12.5%;\n}\n.question[data-v-706c1571] {\n  font-weight: 600;\n  border: solid 1px #757575;\n  padding: 25px 30px;\n  width: 90%;\n  margin: auto;\n}\n.action[data-v-706c1571] {\n  margin-top: 40px;\n  margin-bottom: 100px;\n}\n.role[data-v-706c1571] {\n  padding: 10px;\n}\n.panel[data-v-706c1571] {\n  padding: 15px 5px;\n}\n.select-pannel-body[data-v-706c1571] {\n  min-height: 130px;\n  margin-bottom: 10px;\n}\n.registration-btn[data-v-706c1571] {\n  margin: 20px 10px 0px;\n  padding: 10px 40px;\n  margin-bottom: 20px;\n}\n.issue[data-v-706c1571] {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  font-size: 1.2em;\n  padding: 3px 15px;\n}\n#stepper-step-3 .action[data-v-706c1571] {\n  padding: 25px 30px;\n}\n#site_facilitator[data-v-706c1571] {\n  margin-bottom: 15px;\n}\n.stepper .nav-tabs [data-toggle='tab'][data-v-706c1571] {\n  width: 25px;\n  height: 25px;\n  margin: 20px auto;\n  border: none;\n  padding: 0px;\n}\n.stepper .nav-tabs[data-v-706c1571] {\n  margin-bottom: 40px;\n  border: none;\n}\n.stepper .round-tab[data-v-706c1571] {\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  line-height: 60px;\n  display: inline-block;\n  z-index: 2;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n}\n.stepper .nav-tabs > li[data-v-706c1571] {\n  width: 33%;\n  position: relative;\n}\n.wizard-progress-with-circle[data-v-706c1571] {\n  position: relative;\n  top: 50px;\n  height: 4px;\n  margin: auto;\n  width: 70%;\n}\n", ""]);

// exports


/***/ }),
/* 30 */
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
/* 31 */
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

var listToStyles = __webpack_require__(32)

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
/* 32 */
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
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "container" }, [
      _c("div", { staticClass: "row text-center" }, [
        _c("div", { staticClass: "col-md-9 stepper" }, [
          _c("form", { attrs: { action: "POST" } }, [
            _c("div", { staticClass: "wizard-progress-with-circle" }, [
              _c("div", {
                staticClass: "wizard-progress-bar",
                staticStyle: {
                  "background-color": "rgb(231, 76, 60)",
                  color: "rgb(231, 76, 60)",
                  width: "16.6667%"
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "ul",
              { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
              [
                _c(
                  "li",
                  { staticClass: "active", attrs: { role: "presentation" } },
                  [
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
                            staticClass:
                              "round-tab glyphicon glyphicon-book gray-border"
                          },
                          [_vm._v("1")]
                        )
                      ]
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "disabled", attrs: { role: "presentation" } },
                  [
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
                  ]
                ),
                _vm._v(" "),
                _c(
                  "li",
                  { staticClass: "disabled", attrs: { role: "presentation" } },
                  [
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
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "tab-content" }, [
              _c(
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
                        staticClass: "btn btn-default btn-cta red",
                        attrs: { type: "button" }
                      },
                      [_vm._v("NO")]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "btn btn-info btn-lg",
                      attrs: { href: "#" }
                    },
                    [
                      _c("span", {
                        staticClass: "glyphicon glyphicon-arrow-right"
                      }),
                      _vm._v(" Step 2/3\n                        ")
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
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
                            staticClass:
                              "panel panel-default select-pannel gray-border"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "pannel-body select-pannel-body gray-border"
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
                            staticClass:
                              "panel panel-default select-pannel gray-border"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "pannel-body select-pannel-body gray-border"
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
                            staticClass:
                              "panel panel-default select-pannel gray-border"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "pannel-body select-pannel-body gray-border"
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
                  _c(
                    "a",
                    {
                      staticClass: "btn btn-info btn-lg",
                      attrs: { href: "#" }
                    },
                    [
                      _c("span", {
                        staticClass: "glyphicon glyphicon-arrow-right"
                      }),
                      _vm._v(" Step 3/3\n                        ")
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "tab-pane fade",
                  attrs: { role: "tabpanel", id: "stepper-step-3" }
                },
                [
                  _c("div", { staticClass: "action gray-border" }, [
                    _c("div", { staticClass: "personal-info form-group row" }, [
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          staticClass: "form-control",
                          attrs: {
                            id: "first_name",
                            type: "text",
                            name: "first_name",
                            placeholder: "First Name"
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
                            placeholder: "Last Name"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-6" }, [
                        _c("input", {
                          staticClass: "form-control",
                          attrs: {
                            id: "email",
                            type: "email",
                            name: "email",
                            placeholder: "School Email Address",
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
                            attrs: { name: "state", id: "state" }
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
                            attrs: { name: "county", id: "county" }
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
                            attrs: { name: "district", id: "district" }
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
                          [
                            _c("option", { attrs: { value: "school" } }, [
                              _vm._v("School")
                            ])
                          ]
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
                            attrs: {
                              name: "site_facilitator",
                              id: "site_facilitator"
                            }
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
                            attrs: {
                              name: "site_facilitator",
                              id: "site_facilitator"
                            }
                          },
                          [
                            _c("option", { attrs: { value: "" } }, [
                              _vm._v("How did you hear about I-Connect")
                            ])
                          ]
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "btn btn-lg btn-cta registration-btn",
                      attrs: { href: "#" }
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
                        staticClass: "btn btn-lg issue red",
                        attrs: { type: "button" }
                      },
                      [
                        _vm._v(
                          "\n                                Registration Issue\n                            "
                        )
                      ]
                    )
                  ])
                ]
              )
            ])
          ])
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
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[9]);