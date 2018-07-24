webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(16);
var isBuffer = __webpack_require__(47);

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
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(49);

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
    adapter = __webpack_require__(17);
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(17);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
/* 13 */
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

var listToStyles = __webpack_require__(41)

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(43)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(45)
/* template */
var __vue_template__ = __webpack_require__(64)
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(46);

/***/ }),
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(50);
var buildURL = __webpack_require__(52);
var parseHeaders = __webpack_require__(53);
var isURLSameOrigin = __webpack_require__(54);
var createError = __webpack_require__(18);
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(55);

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
      var cookies = __webpack_require__(56);

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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(51);

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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(22);
module.exports = __webpack_require__(73);


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_toasted__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_toasted__);
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(1);

__webpack_require__(6);

// TODO: Import this only where needed (e.g. in a component)
__webpack_require__(7);

window.Vue = __webpack_require__(8);

Vue.component('citizenship-value-fields', __webpack_require__(25));
Vue.component('dual-list', __webpack_require__(28));
Vue.component('registration-auth-fields', __webpack_require__(31));
Vue.component('registration-form', __webpack_require__(38));
Vue.component('v-modal', __webpack_require__(14));
Vue.component('welcome-form', __webpack_require__(66));
Vue.component('my-students', __webpack_require__(69));
Vue.component('create-modal', __webpack_require__(100));



Vue.use(__WEBPACK_IMPORTED_MODULE_0_vue_toasted___default.a);

// Instantiate root Vue
var app = new Vue({
  el: '#app'
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(26)
/* template */
var __vue_template__ = __webpack_require__(27)
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
/* 26 */
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
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 27 */
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
                              {
                                key: categoryName,
                                attrs: { label: categoryName }
                              },
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
                              return _c("tr", { key: typeName }, [
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
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(29)
/* template */
var __vue_template__ = __webpack_require__(30)
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
/* 29 */
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
/* 30 */
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(37)
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
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_zxcvbn__ = __webpack_require__(10);
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
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(39)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(42)
/* template */
var __vue_template__ = __webpack_require__(65)
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(40);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(13)("53ac0e7c", content, false, {});
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "\n.stepper[data-v-706c1571] {\n  margin-left: 12.5%;\n}\n.question[data-v-706c1571] {\n  font-weight: 600;\n  border: solid 1px #757575;\n  padding: 25px 30px;\n  width: 90%;\n  margin: auto;\n}\n.action[data-v-706c1571] {\n  margin-top: 40px;\n  margin-bottom: 100px;\n}\n.role[data-v-706c1571] {\n  padding: 10px;\n}\n.panel[data-v-706c1571] {\n  padding: 15px 5px;\n}\n.select-pannel-body[data-v-706c1571] {\n  min-height: 130px;\n  margin-bottom: 10px;\n}\n.registration-btn[data-v-706c1571] {\n  margin: 20px 10px 0px;\n  padding: 10px 40px;\n  margin-bottom: 20px;\n}\n.issue[data-v-706c1571] {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  font-size: 1.2em;\n  padding: 3px 15px;\n}\n#stepper-step-3 .action[data-v-706c1571] {\n  padding: 25px 30px;\n}\n#site_facilitator[data-v-706c1571] {\n  margin-bottom: 15px;\n}\n.stepper .nav-tabs [data-toggle=\"tab\"][data-v-706c1571] {\n  width: 25px;\n  height: 25px;\n  margin: 20px auto;\n  border: none;\n  padding: 0px;\n}\n.stepper .nav-tabs[data-v-706c1571] {\n  margin-bottom: 40px;\n  border: none;\n}\n.stepper .round-tab[data-v-706c1571] {\n  border-radius: 50%;\n  width: 60px;\n  height: 60px;\n  line-height: 60px;\n  display: inline-block;\n  z-index: 2;\n  position: absolute;\n  left: 0;\n  text-align: center;\n  font-size: 16px;\n  font-weight: bold;\n  cursor: pointer;\n}\n.stepper .nav-tabs > li[data-v-706c1571] {\n  width: 33%;\n  position: relative;\n}\n.stepper .row-box[data-v-706c1571] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.wizard-progress-with-circle[data-v-706c1571] {\n  position: relative;\n  top: 50px;\n  height: 4px;\n  margin: auto;\n  width: 70%;\n}\ndiv.issue.checkbox[data-v-706c1571] {\n  font-size: 12px;\n}\n", ""]);

// exports


/***/ }),
/* 41 */
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
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VModal_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
						fSubmited_modal: false,
						msSubmited_modal: false,
						issueModal: false,
						issueSaveNotice_modal: false,
						userInfo: {
								isEmployee: 0,
								user_role: null,
								first_name: "",
								last_name: "",
								email: "",
								password: "",
								state_id: 0,
								county_id: 0,
								district_id: 0,
								school_id: 0,
								referral_source_id: 0,

								reason: 0,
								description: ""
						},
						referralSource: [],
						states: [],
						counties: [],
						districts: [],
						schools: []
				};
		},
		methods: {
				alertYN: function alertYN() {
						this.$toasted.show("Please select your answer.", {
								theme: "outline",
								position: "top-center",
								duration: 3000
						});
				},
				goto: function goto(tabName) {
						if (tabName == "stepper-step-3" && this.userInfo.isEmployee == 1) {
								this.$toasted.show("Please select your role!", {
										theme: "outline",
										position: "top-center",
										duration: 3000
								});
								return;
						}
						$('.nav-tabs a[href="#' + tabName + '"]').tab("show");
				},
				selIsEmployee: function selIsEmployee(employee) {
						this.userInfo.isEmployee = employee;
						this.goto("stepper-step-2");
				},
				selUserRole: function selUserRole(user_role) {
						this.userInfo.user_role = user_role;
						$('.nav-tabs a[href="#stepper-step-3"]').tab("show");
				},


				selState: function selState() {
						var _this = this;

						this.userInfo.county_id = 0;
						this.userInfo.district_id = 0;
						this.userInfo.school_id = 0;
						__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/counties", { state_id: this.userInfo.state_id }).then(function (result) {
								_this.counties = result.data;
						});
				},
				selCounty: function selCounty() {
						var _this2 = this;

						this.userInfo.district_id = 0;
						this.userInfo.school_id = 0;
						__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/districts", { county_id: this.userInfo.county_id }).then(function (result) {
								_this2.districts = result.data;
						});
				},
				selDistrict: function selDistrict() {
						var _this3 = this;

						this.userInfo.school_id = 0;
						__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/schools", { district_id: this.userInfo.district_id }).then(function (result) {
								_this3.schools = result.data;
						});
				},
				selSchool: function selSchool() {},

				regUser: function regUser() {
						var _this4 = this;

						this.userInfo.password = this.userInfo.email;

						__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/registerUser", this.userInfo).then(function (result) {
								if (_this4.userInfo.isEmployee == 0) {
										_this4.msSubmited_modal = true;
										return;
								}
								switch (_this4.userInfo.user_role) {
										case 2:
										case 3:
												_this4.fSubmited_modal = true;
												break;
										case 4:
												_this4.msSubmited_modal = true;
												break;
								}
						}, function (error) {
								console.log(error.response);
								for (var key in error.response.data) {
										_this4.$toasted.show(error.response.data[key], {
												theme: "outline",
												position: "top-center",
												duration: 3000
										});
								}
						});
				},

				saveIssue: function saveIssue() {
						var _this5 = this;

						__WEBPACK_IMPORTED_MODULE_1_axios___default.a.post("/saveIssue", this.userInfo).then(function (result) {
								_this5.issueModal = false;
								_this5.issueSaveNotice_modal = true;
						}, function (error) {
								console.log(error.response);
						});
				},
				goLoginPage: function goLoginPage() {
						location.href = "/login";
				}
		},
		mounted: function mounted() {
				var _this6 = this;

				__WEBPACK_IMPORTED_MODULE_1_axios___default.a.get("/states").then(function (result) {
						_this6.states = result.data;
				});
				__WEBPACK_IMPORTED_MODULE_1_axios___default.a.get("/referralSource").then(function (result) {
						_this6.referralSource = result.data;
				});
		}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(1)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(44);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(13)("edf4606e", content, false, {});
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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-39d4b54e] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-39d4b54e] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.modal-container[data-v-39d4b54e] {\n  width: 600px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-header h3[data-v-39d4b54e] {\n  margin-top: 0;\n  color: #42b983;\n  font-size: 30px !important;\n}\n.modal-body[data-v-39d4b54e] {\n  margin: 20px 0;\n  font-size: 1.4em;\n}\n.modal-default-button[data-v-39d4b54e] {\n  margin: auto;\n}\n.modal-enter[data-v-39d4b54e] {\n  opacity: 0;\n}\n.modal-leave-active[data-v-39d4b54e] {\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-39d4b54e],\n.modal-leave-active .modal-container[data-v-39d4b54e] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.modal-footer[data-v-39d4b54e] {\n  text-align: center;\n}\n.btn-close[data-v-39d4b54e] {\n  border: none;\n  font-size: 20px;\n  padding: 20px;\n  cursor: pointer;\n  font-weight: bold;\n  color: #4AAE9B;\n  background: transparent;\n}\n", ""]);

// exports


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(15);
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
            this.$emit('submit');
        }
    }
});

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(16);
var Axios = __webpack_require__(48);
var defaults = __webpack_require__(5);

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
axios.Cancel = __webpack_require__(20);
axios.CancelToken = __webpack_require__(62);
axios.isCancel = __webpack_require__(19);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(63);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(5);
var utils = __webpack_require__(0);
var InterceptorManager = __webpack_require__(57);
var dispatchRequest = __webpack_require__(58);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(18);

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
/* 51 */
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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 55 */
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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(59);
var isCancel = __webpack_require__(19);
var defaults = __webpack_require__(5);
var isAbsoluteURL = __webpack_require__(60);
var combineURLs = __webpack_require__(61);

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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

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
/* 60 */
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
/* 61 */
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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(20);

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
/* 63 */
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


/***/ }),
/* 64 */
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
                  "\n                        default header\n                        "
                ),
                _c(
                  "button",
                  {
                    staticClass: "btn-close",
                    attrs: { type: "button" },
                    on: { click: _vm.close }
                  },
                  [
                    _vm._v(
                      "\n                                x\n                            "
                    )
                  ]
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
                  "\n                        default body\n                    "
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
                    on: { click: _vm.close }
                  },
                  [
                    _vm._t("close", [
                      _vm._v(
                        "\n                                OK\n                            "
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
                        staticStyle: { width: "max-content" },
                        on: { click: _vm.submit }
                      },
                      [
                        _vm._t("action", [
                          _vm._v(
                            "\n                                Submit\n                            "
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
/* 65 */
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
          _c("form", { attrs: { action: "#" } }, [
            _vm._m(0),
            _vm._v(" "),
            _vm._m(1),
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
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.selIsEmployee(1)
                          }
                        }
                      },
                      [_vm._v("YES")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default btn-cta btn-red",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.selIsEmployee(0)
                          }
                        }
                      },
                      [_vm._v("NO")]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "btn btn-info btn-lg",
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          _vm.alertYN()
                        }
                      }
                    },
                    [
                      _c("span", {
                        staticClass: "glyphicon glyphicon-arrow-right"
                      }),
                      _vm._v(" Step 2/3\n\t\t\t\t\t\t")
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
                    _vm.userInfo.isEmployee
                      ? _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-md-4 role" }, [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "panel panel-default select-pannel gray-border"
                              },
                              [
                                _vm._m(2),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-default btn-cta",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        _vm.selUserRole(2)
                                      }
                                    }
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
                                _vm._m(3),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-default btn-cta",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        _vm.selUserRole(3)
                                      }
                                    }
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
                                _vm._m(4),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-default btn-cta",
                                    attrs: { type: "button" },
                                    on: {
                                      click: function($event) {
                                        _vm.selUserRole(4)
                                      }
                                    }
                                  },
                                  [_vm._v("Select")]
                                )
                              ]
                            )
                          ])
                        ])
                      : _c("div", [
                          _c("h2", { staticClass: "question" }, [
                            _vm._v("I am going to register as a Stakeholder.")
                          ])
                        ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass: "btn btn-info btn-lg",
                      attrs: { href: "#" },
                      on: {
                        click: function($event) {
                          _vm.goto("stepper-step-3")
                        }
                      }
                    },
                    [
                      _c("span", {
                        staticClass: "glyphicon glyphicon-arrow-right"
                      }),
                      _vm._v(" Step 3/3\n\t\t\t\t\t\t")
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
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.first_name,
                              expression: "userInfo.first_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            id: "first_name",
                            type: "text",
                            placeholder: "First Name",
                            autocomplete: "given-name"
                          },
                          domProps: { value: _vm.userInfo.first_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "first_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.last_name,
                              expression: "userInfo.last_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            id: "last_name",
                            type: "text",
                            placeholder: "Last Name",
                            autocomplete: "family-name"
                          },
                          domProps: { value: _vm.userInfo.last_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "last_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-6" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.email,
                              expression: "userInfo.email"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            id: "school_email",
                            type: "email",
                            placeholder: "School Email Address",
                            autocomplete: "email",
                            required: ""
                          },
                          domProps: { value: _vm.userInfo.email },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "email",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "location form-group row-box" }, [
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.state_id,
                                expression: "userInfo.state_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { autocomplete: "address-level1" },
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.userInfo,
                                    "state_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function($event) {
                                  _vm.selState()
                                }
                              ]
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("State")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.states, function(state) {
                              return _c(
                                "option",
                                {
                                  key: state.id,
                                  domProps: { value: state.id }
                                },
                                [_vm._v(_vm._s(state.name))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.county_id,
                                expression: "userInfo.county_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              disabled: _vm.userInfo.state_id == 0,
                              autocomplete: "address-level1"
                            },
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.userInfo,
                                    "county_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function($event) {
                                  _vm.selCounty()
                                }
                              ]
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("County")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.counties, function(county) {
                              return _c(
                                "option",
                                {
                                  key: county.id,
                                  domProps: { value: county.id }
                                },
                                [_vm._v(_vm._s(county.name))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _vm.userInfo.isEmployee
                        ? _c("div", { staticClass: "col-xs-3" }, [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userInfo.district_id,
                                    expression: "userInfo.district_id"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.userInfo.county_id == 0,
                                  autocomplete: "address-level2"
                                },
                                on: {
                                  change: [
                                    function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.userInfo,
                                        "district_id",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    },
                                    function($event) {
                                      _vm.selDistrict()
                                    }
                                  ]
                                }
                              },
                              [
                                _c("option", { attrs: { value: "0" } }, [
                                  _vm._v("District")
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.districts, function(district) {
                                  return _c(
                                    "option",
                                    {
                                      key: district.id,
                                      domProps: { value: district.id }
                                    },
                                    [_vm._v(_vm._s(district.name))]
                                  )
                                })
                              ],
                              2
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.userInfo.user_role > 2 && _vm.userInfo.isEmployee
                        ? _c("div", { staticClass: "col-xs-3" }, [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userInfo.school_id,
                                    expression: "userInfo.school_id"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.userInfo.district_id == 0,
                                  name: "school",
                                  id: "school"
                                },
                                on: {
                                  change: [
                                    function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.userInfo,
                                        "school_id",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    },
                                    function($event) {
                                      _vm.selSchool()
                                    }
                                  ]
                                }
                              },
                              [
                                _c("option", { attrs: { value: "0" } }, [
                                  _vm._v("School")
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.schools, function(school) {
                                  return _c(
                                    "option",
                                    {
                                      key: school.id,
                                      domProps: { value: school.id }
                                    },
                                    [_vm._v(_vm._s(school.name))]
                                  )
                                })
                              ],
                              2
                            )
                          ])
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "query form-group row" }, [
                      _vm.userInfo.isEmployee && _vm.userInfo.user_role == 4
                        ? _c(
                            "div",
                            { staticClass: "col-xs-10 col-xs-offset-1" },
                            [_vm._m(5)]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-10 col-xs-offset-1" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.referral_source_id,
                                expression: "userInfo.referral_source_id"
                              }
                            ],
                            staticClass: "form-control",
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
                                  _vm.userInfo,
                                  "referral_source_id",
                                  $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                )
                              }
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("How did you hear about I-Connect")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.referralSource, function(item) {
                              return item.is_employee == _vm.userInfo.isEmployee
                                ? _c(
                                    "option",
                                    {
                                      key: item.id,
                                      domProps: { value: item.id }
                                    },
                                    [_vm._v(_vm._s(item.contents))]
                                  )
                                : _vm._e()
                            })
                          ],
                          2
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-lg btn-cta registration-btn",
                      attrs: { id: "show-modal" },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          _vm.regUser()
                        }
                      }
                    },
                    [_vm._v("Finish Registration!")]
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
                          "\n\t\t\t\t\t\t\t\tRegistration Issue\n\t\t\t\t\t\t\t"
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _vm.fSubmited_modal
                    ? _c(
                        "v-modal",
                        {
                          on: {
                            close: function($event) {
                              _vm.fSubmited_modal = false
                            }
                          }
                        },
                        [
                          _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                            _c("div", { staticClass: "gray-border" }, [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tAn email has been sent to the provided email. You will"
                              ),
                              _c("br"),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tbe notified when you account has been approved."
                              ),
                              _c("br"),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tPlease allow 1-2 business days for account approval.\n\t\t\t\t\t\t\t\t"
                              )
                            ]),
                            _vm._v(" "),
                            _c("br"),
                            _vm._v(" "),
                            _c("br"),
                            _vm._v(" "),
                            _c("div", [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tIf there are any issues, please email:\n\t\t\t\t\t\t\t\t\t"
                              ),
                              _c("br"),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tiConnect@ku.edu\n\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "h3",
                            { attrs: { slot: "header" }, slot: "header" },
                            [_vm._v("Account Submitted!")]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              attrs: { slot: "close" },
                              on: {
                                click: function($event) {
                                  _vm.goLoginPage()
                                }
                              },
                              slot: "close"
                            },
                            [_vm._v("OK")]
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.msSubmited_modal
                    ? _c(
                        "v-modal",
                        {
                          on: {
                            close: function($event) {
                              _vm.msSubmited_modal = false
                            }
                          }
                        },
                        [
                          _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                            _c("div", { staticClass: "gray-border" }, [
                              _vm._v(
                                '\n\t\t\t\t\t\t\t\t\tAccount Submitted An email has been sent to the email provided. \n\t\t\t\t\t\t\t\t\tPlease log in to your email and verify your account to begin using I-Connect. Your email will be\n\t\t\t\t\t\t\t\t\tyour default username and you will be provided a temporary one-time use password. Once you log in to the \n\t\t\t\t\t\t\t\t\tI-Connect Web page, click on "My Account" to set a new password.\n\t\t\t\t\t\t\t\t'
                              )
                            ]),
                            _vm._v(" "),
                            _c("br"),
                            _vm._v(" "),
                            _c("br"),
                            _vm._v(" "),
                            _c("div", [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tIf there are any issues, please email:\n\t\t\t\t\t\t\t\t\t"
                              ),
                              _c("br"),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tiConnect@ku.edu\n\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "h3",
                            { attrs: { slot: "header" }, slot: "header" },
                            [_vm._v("Account Submitted!")]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              attrs: { slot: "close" },
                              on: {
                                click: function($event) {
                                  _vm.goLoginPage()
                                }
                              },
                              slot: "close"
                            },
                            [_vm._v("OK")]
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
                    },
                    submit: function($event) {
                      _vm.saveIssue()
                    }
                  }
                },
                [
                  _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                    _c("div", { staticClass: "personal-info form-group row" }, [
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.first_name,
                              expression: "userInfo.first_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            placeholder: "First Name",
                            autocomplete: "given-name"
                          },
                          domProps: { value: _vm.userInfo.first_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "first_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.last_name,
                              expression: "userInfo.last_name"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "text",
                            placeholder: "Last Name",
                            autocomplete: "family-name"
                          },
                          domProps: { value: _vm.userInfo.last_name },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "last_name",
                                $event.target.value
                              )
                            }
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-6" }, [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.email,
                              expression: "userInfo.email"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            type: "email",
                            placeholder: "School Email Address",
                            autocomplete: "email",
                            required: ""
                          },
                          domProps: { value: _vm.userInfo.email },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "email",
                                $event.target.value
                              )
                            }
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
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.state_id,
                                expression: "userInfo.state_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: { autocomplete: "address-level1" },
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.userInfo,
                                    "state_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function($event) {
                                  _vm.selState()
                                }
                              ]
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("State")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.states, function(state) {
                              return _c(
                                "option",
                                {
                                  key: state.id,
                                  domProps: { value: state.id }
                                },
                                [_vm._v(_vm._s(state.name))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.county_id,
                                expression: "userInfo.county_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              disabled: _vm.userInfo.state_id == 0,
                              autocomplete: "address-level1"
                            },
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.userInfo,
                                    "county_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function($event) {
                                  _vm.selCounty()
                                }
                              ]
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("County")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.counties, function(county) {
                              return _c(
                                "option",
                                {
                                  key: county.id,
                                  domProps: { value: county.id }
                                },
                                [_vm._v(_vm._s(county.name))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-3" }, [
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.userInfo.district_id,
                                expression: "userInfo.district_id"
                              }
                            ],
                            staticClass: "form-control",
                            attrs: {
                              disabled: _vm.userInfo.county_id == 0,
                              autocomplete: "address-level2"
                            },
                            on: {
                              change: [
                                function($event) {
                                  var $$selectedVal = Array.prototype.filter
                                    .call($event.target.options, function(o) {
                                      return o.selected
                                    })
                                    .map(function(o) {
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.$set(
                                    _vm.userInfo,
                                    "district_id",
                                    $event.target.multiple
                                      ? $$selectedVal
                                      : $$selectedVal[0]
                                  )
                                },
                                function($event) {
                                  _vm.selDistrict()
                                }
                              ]
                            }
                          },
                          [
                            _c("option", { attrs: { value: "0" } }, [
                              _vm._v("District")
                            ]),
                            _vm._v(" "),
                            _vm._l(_vm.districts, function(district) {
                              return _c(
                                "option",
                                {
                                  key: district.id,
                                  domProps: { value: district.id }
                                },
                                [_vm._v(_vm._s(district.name))]
                              )
                            })
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _vm.userInfo.user_role > 2
                        ? _c("div", { staticClass: "col-xs-3" }, [
                            _c(
                              "select",
                              {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.userInfo.school_id,
                                    expression: "userInfo.school_id"
                                  }
                                ],
                                staticClass: "form-control",
                                attrs: {
                                  disabled: _vm.userInfo.district_id == 0,
                                  name: "school",
                                  id: "school"
                                },
                                on: {
                                  change: [
                                    function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.$set(
                                        _vm.userInfo,
                                        "school_id",
                                        $event.target.multiple
                                          ? $$selectedVal
                                          : $$selectedVal[0]
                                      )
                                    },
                                    function($event) {
                                      _vm.selSchool()
                                    }
                                  ]
                                }
                              },
                              [
                                _c("option", { attrs: { value: "0" } }, [
                                  _vm._v("School")
                                ]),
                                _vm._v(" "),
                                _vm._l(_vm.schools, function(school) {
                                  return _c(
                                    "option",
                                    {
                                      key: school.id,
                                      domProps: { value: school.id }
                                    },
                                    [_vm._v(_vm._s(school.name))]
                                  )
                                })
                              ],
                              2
                            )
                          ])
                        : _vm._e()
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "location form-group row" }, [
                      _c("div", { staticClass: "col-xs-4" }, [
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.userInfo.reason,
                                  expression: "userInfo.reason"
                                }
                              ],
                              attrs: { type: "radio", value: "0" },
                              domProps: {
                                checked: _vm._q(_vm.userInfo.reason, "0")
                              },
                              on: {
                                change: function($event) {
                                  _vm.$set(_vm.userInfo, "reason", "0")
                                }
                              }
                            }),
                            _vm._v(" District not displayed")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.userInfo.reason,
                                  expression: "userInfo.reason"
                                }
                              ],
                              attrs: { type: "radio", value: "1" },
                              domProps: {
                                checked: _vm._q(_vm.userInfo.reason, "1")
                              },
                              on: {
                                change: function($event) {
                                  _vm.$set(_vm.userInfo, "reason", "1")
                                }
                              }
                            }),
                            _vm._v(" School not displayed")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.userInfo.reason,
                                  expression: "userInfo.reason"
                                }
                              ],
                              attrs: { type: "radio", value: "2" },
                              domProps: {
                                checked: _vm._q(_vm.userInfo.reason, "2")
                              },
                              on: {
                                change: function($event) {
                                  _vm.$set(_vm.userInfo, "reason", "2")
                                }
                              }
                            }),
                            _vm._v(" Outside of United States")
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "checkbox issue" }, [
                          _c("label", [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.userInfo.reason,
                                  expression: "userInfo.reason"
                                }
                              ],
                              attrs: { type: "radio", value: "3" },
                              domProps: {
                                checked: _vm._q(_vm.userInfo.reason, "3")
                              },
                              on: {
                                change: function($event) {
                                  _vm.$set(_vm.userInfo, "reason", "3")
                                }
                              }
                            }),
                            _vm._v(" Other reason")
                          ])
                        ])
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-xs-8" }, [
                        _c("textarea", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.userInfo.description,
                              expression: "userInfo.description"
                            }
                          ],
                          staticClass: "form-control",
                          attrs: {
                            cols: "30",
                            rows: "6",
                            placeholder: "Please explain issue here..."
                          },
                          domProps: { value: _vm.userInfo.description },
                          on: {
                            input: function($event) {
                              if ($event.target.composing) {
                                return
                              }
                              _vm.$set(
                                _vm.userInfo,
                                "description",
                                $event.target.value
                              )
                            }
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
            : _vm._e(),
          _vm._v(" "),
          _vm.issueSaveNotice_modal
            ? _c("v-modal", [
                _c("h1", { attrs: { slot: "header" }, slot: "header" }, [
                  _vm._v("Sorry")
                ]),
                _vm._v(" "),
                _c("div", { attrs: { slot: "body" }, slot: "body" }, [
                  _c("h3", [
                    _vm._v("We have received your problem correctly."),
                    _c("br"),
                    _vm._v(
                      "After considering it carefully, we will set up measures and inform you by email."
                    )
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    attrs: { slot: "close" },
                    on: {
                      click: function($event) {
                        _vm.goLoginPage()
                      }
                    },
                    slot: "close"
                  },
                  [_vm._v("OK")]
                )
              ])
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
      { staticClass: "pannel-body select-pannel-body gray-border" },
      [
        _c("h3", [_vm._v("FACLILTATOR")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "I will be mananging several Schools, Teachers/Mentors,\n\t\t\t\t\t\t\t\t\t\t\t\tand Studnents in my district.\n\t\t\t\t\t\t\t\t\t\t\t"
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
      { staticClass: "pannel-body select-pannel-body gray-border" },
      [
        _c("h3", [_vm._v("SITE FACLILTATOR")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "I will be mananging several Teachers/Mentors,\n\t\t\t\t\t\t\t\t\t\t\t\tand Studnents in my school.\n\t\t\t\t\t\t\t\t\t\t\t"
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
      { staticClass: "pannel-body select-pannel-body gray-border" },
      [
        _c("h3", [_vm._v("SCHOOL MENTOR")]),
        _vm._v(" "),
        _c("p", [
          _vm._v(
            "I will be mananging several Studnents in my school.\n\t\t\t\t\t\t\t\t\t\t\t"
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(67)
/* template */
var __vue_template__ = __webpack_require__(68)
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
Component.options.__file = "resources/assets/js/welcome/WelcomeForm.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68e85392", Component.options)
  } else {
    hotAPI.reload("data-v-68e85392", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 67 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            checkList: []
        };
    },
    methods: {
        submit: function submit(e) {
            if (this.checkList.length < 2) {

                var check1 = true,
                    check2 = true;

                this.checkList.forEach(function (element) {
                    switch (element) {
                        case 'check1':
                            check1 = false;
                            break;
                        case 'check2':
                            check2 = false;
                            break;
                    }
                });

                if (check1) {
                    this.$toasted.show("Please acknowledge i-Connect can only be accessed with an internet connection.", {
                        theme: "outline",
                        position: "top-center",
                        duration: 3000
                    });
                } else if (check2) {
                    this.$toasted.show("Please read and accept the Terms and Conditions", {
                        theme: "outline",
                        position: "top-center",
                        duration: 3000
                    });
                }

                e.preventDefault();
            } else {}
        }
    }
});

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-8 col-md-offset-2 tos-form" }, [
        _c("div", { staticClass: "panel panel-default form-wrapper" }, [
          _c(
            "div",
            {
              staticClass: "description heading",
              attrs: { id: "heading-description" }
            },
            [
              _vm._v(
                "\n                    i-Connect is a Self-Management Application for a smart phone or \n                    tablet. iConnect allows School-based Mentors and other individuals \n                    to set goals and monitor academic engagement and\n                    social/behavioral growth of a student ages 5-25. For additional\n                    information please go to iConnect.Ku.edu.\n                "
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "form",
            {
              staticClass: "form-horizontal",
              attrs: { action: "/registration", method: "GET" }
            },
            [
              _c("div", { staticClass: "form-group" }, [
                _c("div", { staticClass: "col-sm-offset-1  col-sm-10" }, [
                  _c("div", { staticClass: "checkbox" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.checkList,
                          expression: "checkList"
                        }
                      ],
                      attrs: { type: "checkbox", value: "check1" },
                      domProps: {
                        checked: Array.isArray(_vm.checkList)
                          ? _vm._i(_vm.checkList, "check1") > -1
                          : _vm.checkList
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.checkList,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = "check1",
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 && (_vm.checkList = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.checkList = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.checkList = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c("label", { staticClass: "description" }, [
                      _vm._v(
                        "\n                                    Please acknowledge i-Connect can only be accessed with an internet\n                                    connection. Before proceeding, understand your students must have access to\n                                    internet for the application to operate.\n                                "
                      )
                    ])
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("div", { staticClass: "col-sm-offset-1  col-sm-10" }, [
                  _c("div", { staticClass: "checkbox" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.checkList,
                          expression: "checkList"
                        }
                      ],
                      attrs: { type: "checkbox", value: "check2" },
                      domProps: {
                        checked: Array.isArray(_vm.checkList)
                          ? _vm._i(_vm.checkList, "check2") > -1
                          : _vm.checkList
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.checkList,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = "check2",
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 && (_vm.checkList = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.checkList = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.checkList = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._m(0)
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("div", { staticClass: "text-center" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default btn-cta",
                      attrs: { type: "submit" },
                      on: {
                        click: function($event) {
                          _vm.submit($event)
                        }
                      }
                    },
                    [_vm._v("Submit")]
                  )
                ])
              ])
            ]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", { staticClass: "description" }, [
      _vm._v(
        " \n                                    Please read and accept the "
      ),
      _c("a", { attrs: { href: "", onclick: "window.open('/tos');" } }, [
        _vm._v("Terms and Conditions")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68e85392", module.exports)
  }
}

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(70)
/* template */
var __vue_template__ = __webpack_require__(71)
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
Component.options.__file = "resources/assets/js/students/MyStudents.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-024f6199", Component.options)
  } else {
    hotAPI.reload("data-v-024f6199", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CreateModal_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CreateModal_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__CreateModal_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			createModal: false,

			role: 2
		};
	}
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "filter" }, [
        _c("form", { attrs: { action: "" } }, [
          _c(
            "div",
            { staticClass: "row" },
            [
              _vm.role == 2
                ? [_vm._m(1), _vm._v(" "), _vm._m(2), _vm._v(" "), _vm._m(3)]
                : _vm.role == 3
                  ? [_vm._m(4)]
                  : [_vm._m(5)],
              _vm._v(" "),
              _vm.role != 4 ? [_vm._m(6)] : _vm._e()
            ],
            2
          )
        ])
      ]),
      _vm._v(" "),
      _vm._m(7),
      _vm._v(" "),
      _vm.role != 4
        ? _c("div", { staticClass: "text-center" }, [
            _c(
              "a",
              {
                staticClass: "btn btn-lg btn-cta",
                attrs: { href: "#" },
                on: {
                  click: function($event) {
                    _vm.createModal = true
                  }
                }
              },
              [_vm._v("Add New Student")]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.createModal
        ? _c(
            "create-modal",
            {
              on: {
                close: function($event) {
                  _vm.createModal = false
                }
              }
            },
            [
              _c("h1", { attrs: { slot: "header" }, slot: "header" }, [
                _vm._v("Add/Edit Student")
              ])
            ]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "row", staticStyle: { "margin-bottom": "80px" } },
      [
        _c("div", { staticClass: "pull-left home-icon" }, [
          _c("span", { staticClass: "round-tab" }, [
            _c("a", { attrs: { href: "/home" } }, [
              _c("i", {
                staticClass: "fa fa-home fa-2x",
                attrs: { "aria-hidden": "true" }
              }),
              _vm._v(" "),
              _c("br"),
              _vm._v("\t\tHome\t\t")
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "pull-right help" }, [
          _c("span", { staticClass: "round-tab" }, [
            _c("i", { staticClass: "fa fa-question-circle fa-2x" }),
            _vm._v(" "),
            _c("br"),
            _vm._v(" Help")
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group col-xs-2 text-center" }, [
      _c("label", { attrs: { for: "school_level" } }, [_vm._v("School Level")]),
      _vm._v(" "),
      _c(
        "select",
        {
          staticClass: "form-control",
          attrs: { name: "school level", id: "school_level" }
        },
        [
          _c("option", { attrs: { value: "", selected: "", disabled: "" } }, [
            _vm._v("Select")
          ])
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "form-group col-xs-2 col-xs-offset-1 text-center" },
      [
        _c("label", { attrs: { for: "school_name" } }, [_vm._v("School Name")]),
        _vm._v(" "),
        _c(
          "select",
          {
            staticClass: "form-control",
            attrs: { name: "school name", id: "school_name" }
          },
          [
            _c("option", { attrs: { value: "", selected: "", disabled: "" } }, [
              _vm._v("Select")
            ])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "form-group col-xs-2 col-xs-offset-1 text-center" },
      [
        _c("label", { attrs: { for: "mentor" } }, [_vm._v("Mentor")]),
        _vm._v(" "),
        _c(
          "select",
          {
            staticClass: "form-control",
            attrs: { name: "mentor", id: "mentor" }
          },
          [
            _c("option", { attrs: { value: "", selected: "", disabled: "" } }, [
              _vm._v("Select")
            ])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "form-group col-xs-2 col-xs-offset-5 text-center" },
      [
        _c("label", { attrs: { for: "mentor" } }, [_vm._v("Mentor")]),
        _vm._v(" "),
        _c(
          "select",
          {
            staticClass: "form-control",
            attrs: { name: "mentor", id: "mentor" }
          },
          [
            _c("option", { attrs: { value: "", selected: "", disabled: "" } }, [
              _vm._v("Select")
            ])
          ]
        )
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "pull-right" }, [
      _c(
        "a",
        {
          staticClass: "btn btn-lg btn-cta pull-left",
          attrs: { href: "/students/create" }
        },
        [_vm._v("Add New Student")]
      ),
      _vm._v(" "),
      _c("input", {
        attrs: { type: "text", placeholder: "Search Students ..." }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group col-xs-2 text-center" }, [
      _c("a", { staticClass: "btn btn-large btn-blue", attrs: { href: "#" } }, [
        _vm._v("View Students")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "table-responsive" }, [
      _c("table", { staticClass: "table table-hover my-students" }, [
        _c("thead", [
          _c("tr", [
            _c("th", [_vm._v("#")]),
            _vm._v(" "),
            _c("th", [_vm._v("First name")]),
            _vm._v(" "),
            _c("th", [_vm._v("Last name")]),
            _vm._v(" "),
            _c("th", [_vm._v("Age")]),
            _vm._v(" "),
            _c("th")
          ])
        ]),
        _vm._v(" "),
        _c("tbody", [
          _c("tr", [
            _c("td", [_vm._v("1")]),
            _vm._v(" "),
            _c("td", [_vm._v("Test")]),
            _vm._v(" "),
            _c("td", [_vm._v("Student")]),
            _vm._v(" "),
            _c("td", [_vm._v("1")]),
            _vm._v(" "),
            _c("td", { staticClass: "actions text-center" }, [
              _c(
                "a",
                { staticClass: "btn btn-large btn-cta", attrs: { href: "#" } },
                [_vm._v("Edit")]
              ),
              _vm._v(" "),
              _c(
                "a",
                { staticClass: "btn btn-large btn-blue", attrs: { href: "#" } },
                [_vm._v("View Chart")]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "btn btn-large btn-yellow",
                  attrs: { href: "/transfer" }
                },
                [_vm._v("Transfer")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("tr", [
            _c("td", [_vm._v("2")]),
            _vm._v(" "),
            _c("td", [_vm._v("Test")]),
            _vm._v(" "),
            _c("td", [_vm._v("Student")]),
            _vm._v(" "),
            _c("td", [_vm._v("1")]),
            _vm._v(" "),
            _c("td", { staticClass: "actions text-center" }, [
              _c(
                "a",
                { staticClass: "btn btn-large btn-cta", attrs: { href: "#" } },
                [_vm._v("Edit")]
              ),
              _vm._v(" "),
              _c(
                "a",
                { staticClass: "btn btn-large btn-blue", attrs: { href: "#" } },
                [_vm._v("View Chart")]
              ),
              _vm._v(" "),
              _c(
                "a",
                {
                  staticClass: "btn btn-large btn-yellow",
                  attrs: { href: "/transfer" }
                },
                [_vm._v("Transfer")]
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
    require("vue-hot-reload-api")      .rerender("data-v-024f6199", module.exports)
  }
}

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=24)}([function(t,e,n){"use strict";function r(){p=!1}function i(t){if(!t)return void(l!==d&&(l=d,r()));if(t!==l){if(t.length!==d.length)throw new Error("Custom alphabet for shortid must be "+d.length+" unique characters. You submitted "+t.length+" characters: "+t);var e=t.split("").filter(function(t,e,n){return e!==n.lastIndexOf(t)});if(e.length)throw new Error("Custom alphabet for shortid must be "+d.length+" unique characters. These characters were not unique: "+e.join(", "));l=t,r()}}function o(t){return i(t),l}function a(t){h.seed(t),f!==t&&(r(),f=t)}function s(){l||i(d);for(var t,e=l.split(""),n=[],r=h.nextValue();e.length>0;)r=h.nextValue(),t=Math.floor(r*e.length),n.push(e.splice(t,1)[0]);return n.join("")}function u(){return p?p:p=s()}function c(t){return u()[t]}var l,f,p,h=n(18),d="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-";t.exports={characters:o,seed:a,lookup:c,shuffled:u}},function(t,e,n){"use strict";var r=n(6),i=n.n(r),o=300;e.a={animateIn:function(t){i()({targets:t,translateY:"-35px",opacity:1,duration:o,easing:"easeOutCubic"})},animateOut:function(t,e){i()({targets:t,opacity:0,marginTop:"-40px",duration:o,easing:"easeOutExpo",complete:e})},animateOutBottom:function(t,e){i()({targets:t,opacity:0,marginBottom:"-40px",duration:o,easing:"easeOutExpo",complete:e})},animateReset:function(t){i()({targets:t,left:0,opacity:1,duration:o,easing:"easeOutExpo"})},animatePanning:function(t,e,n){i()({targets:t,duration:10,easing:"easeOutQuad",left:e,opacity:n})},animatePanEnd:function(t,e){i()({targets:t,opacity:0,duration:o,easing:"easeOutExpo",complete:e})},clearAnimation:function(t){var e=i.a.timeline();t.forEach(function(t){e.add({targets:t.el,opacity:0,right:"-40px",duration:300,offset:"-=150",easing:"easeOutExpo",complete:function(){t.remove()}})})}}},function(t,e,n){"use strict";t.exports=n(15)},function(t,e,n){"use strict";function r(t,e){for(var n,r=0,o="";!n;)o+=t(e>>4*r&15|i()),n=e<Math.pow(16,r+1),r++;return o}var i=n(17);t.exports=r},function(t,e,n){"use strict";var r=n(8),i=n(1);n.d(e,"a",function(){return s});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=n(2);n(11).polyfill();var s=function t(e){var n=this;return this.id=a.generate(),this.options=e,this.cached_options={},this.global={},this.groups=[],this.toasts=[],c(this),this.group=function(e){e||(e={}),e.globalToasts||(e.globalToasts={}),Object.assign(e.globalToasts,n.global);var r=new t(e);return n.groups.push(r),r},this.register=function(t,e,r){return r=r||{},l(n,t,e,r)},this.show=function(t,e){return u(n,t,e)},this.success=function(t,e){return e=e||{},e.type="success",u(n,t,e)},this.info=function(t,e){return e=e||{},e.type="info",u(n,t,e)},this.error=function(t,e){return e=e||{},e.type="error",u(n,t,e)},this.remove=function(t){n.toasts=n.toasts.filter(function(e){return e.el.hash!==t.hash}),t.parentNode&&t.parentNode.removeChild(t)},this.clear=function(t){return i.a.clearAnimation(n.toasts,function(){t&&t()}),n.toasts=[],!0},this},u=function(t,e,i){i=i||{};var a=null;if("object"!==(void 0===i?"undefined":o(i)))return console.error("Options should be a type of object. given : "+i),null;t.options.singleton&&t.toasts.length>0&&(t.cached_options=i,t.toasts[t.toasts.length-1].goAway(0));var s=Object.assign({},t.options);return Object.assign(s,i),a=n.i(r.a)(t,e,s),t.toasts.push(a),a},c=function(t){var e=t.options.globalToasts,n=function(e,n){return"string"==typeof n&&t[n]?t[n].apply(t,[e,{}]):u(t,e,n)};e&&(t.global={},Object.keys(e).forEach(function(r){t.global[r]=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e[r].apply(null,[t,n])}}))},l=function(t,e,n,r){t.options.globalToasts||(t.options.globalToasts={}),t.options.globalToasts[e]=function(t,e){var i=null;return"string"==typeof n&&(i=n),"function"==typeof n&&(i=n(t)),e(i,r)},c(t)}},function(t,e,n){n(21);var r=n(20)(null,null,null,null);t.exports=r.exports},function(t,e,n){var r,i,o,a=this;!function(n,a){i=[],r=a,o="function"==typeof r?r.apply(e,i):r,void 0!==o&&(t.exports=o)}(this,function(){function t(t){if(!D.col(t))try{return document.querySelectorAll(t)}catch(t){}}function e(t){return t.reduce(function(t,n){return t.concat(D.arr(n)?e(n):n)},[])}function n(e){return D.arr(e)?e:(D.str(e)&&(e=t(e)||e),e instanceof NodeList||e instanceof HTMLCollection?[].slice.call(e):[e])}function r(t,e){return t.some(function(t){return t===e})}function i(t){var e,n={};for(e in t)n[e]=t[e];return n}function o(t,e){var n,r=i(t);for(n in t)r[n]=e.hasOwnProperty(n)?e[n]:t[n];return r}function s(t,e){var n,r=i(t);for(n in e)r[n]=D.und(t[n])?e[n]:t[n];return r}function u(t){t=t.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(t,e,n,r){return e+e+n+n+r+r});var e=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);t=parseInt(e[1],16);var n=parseInt(e[2],16),e=parseInt(e[3],16);return"rgb("+t+","+n+","+e+")"}function c(t){function e(t,e,n){return 0>n&&(n+=1),1<n&&--n,n<1/6?t+6*(e-t)*n:.5>n?e:n<2/3?t+(e-t)*(2/3-n)*6:t}var n=/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t);t=parseInt(n[1])/360;var r=parseInt(n[2])/100,n=parseInt(n[3])/100;if(0==r)r=n=t=n;else{var i=.5>n?n*(1+r):n+r-n*r,o=2*n-i,r=e(o,i,t+1/3),n=e(o,i,t);t=e(o,i,t-1/3)}return"rgb("+255*r+","+255*n+","+255*t+")"}function l(t){if(t=/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(t))return t[2]}function f(t){return-1<t.indexOf("translate")?"px":-1<t.indexOf("rotate")||-1<t.indexOf("skew")?"deg":void 0}function p(t,e){return D.fnc(t)?t(e.target,e.id,e.total):t}function h(t,e){if(e in t.style)return getComputedStyle(t).getPropertyValue(e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase())||"0"}function d(t,e){return D.dom(t)&&r(_,e)?"transform":D.dom(t)&&(t.getAttribute(e)||D.svg(t)&&t[e])?"attribute":D.dom(t)&&"transform"!==e&&h(t,e)?"css":null!=t[e]?"object":void 0}function m(t,e){var n=f(e),n=-1<e.indexOf("scale")?1:0+n;if(t=t.style.transform,!t)return n;for(var r=[],i=[],o=[],a=/(\w+)\((.+?)\)/g;r=a.exec(t);)i.push(r[1]),o.push(r[2]);return t=o.filter(function(t,n){return i[n]===e}),t.length?t[0]:n}function v(t,e){switch(d(t,e)){case"transform":return m(t,e);case"css":return h(t,e);case"attribute":return t.getAttribute(e)}return t[e]||0}function g(t,e){var n=/^(\*=|\+=|-=)/.exec(t);if(!n)return t;switch(e=parseFloat(e),t=parseFloat(t.replace(n[0],"")),n[0][0]){case"+":return e+t;case"-":return e-t;case"*":return e*t}}function y(t){return D.obj(t)&&t.hasOwnProperty("totalLength")}function b(t,e){function n(n){return n=void 0===n?0:n,t.el.getPointAtLength(1<=e+n?e+n:0)}var r=n(),i=n(-1),o=n(1);switch(t.property){case"x":return r.x;case"y":return r.y;case"angle":return 180*Math.atan2(o.y-i.y,o.x-i.x)/Math.PI}}function x(t,e){var n=/-?\d*\.?\d+/g;if(t=y(t)?t.totalLength:t,D.col(t))e=D.rgb(t)?t:D.hex(t)?u(t):D.hsl(t)?c(t):void 0;else{var r=l(t);t=r?t.substr(0,t.length-r.length):t,e=e?t+e:t}return e+="",{original:e,numbers:e.match(n)?e.match(n).map(Number):[0],strings:e.split(n)}}function T(t,e){return e.reduce(function(e,n,r){return e+t[r-1]+n})}function w(t){return(t?e(D.arr(t)?t.map(n):n(t)):[]).filter(function(t,e,n){return n.indexOf(t)===e})}function E(t){var e=w(t);return e.map(function(t,n){return{target:t,id:n,total:e.length}})}function C(t,e){var r=i(e);if(D.arr(t)){var o=t.length;2!==o||D.obj(t[0])?D.fnc(e.duration)||(r.duration=e.duration/o):t={value:t}}return n(t).map(function(t,n){return n=n?0:e.delay,t=D.obj(t)&&!y(t)?t:{value:t},D.und(t.delay)&&(t.delay=n),t}).map(function(t){return s(t,r)})}function O(t,e){var n,r={};for(n in t){var i=p(t[n],e);D.arr(i)&&(i=i.map(function(t){return p(t,e)}),1===i.length&&(i=i[0])),r[n]=i}return r.duration=parseFloat(r.duration),r.delay=parseFloat(r.delay),r}function S(t){return D.arr(t)?X.apply(this,t):R[t]}function M(t,e){var n;return t.tweens.map(function(r){r=O(r,e);var i=r.value,o=v(e.target,t.name),a=n?n.to.original:o,a=D.arr(i)?i[0]:a,s=g(D.arr(i)?i[1]:i,a),o=l(s)||l(a)||l(o);return r.isPath=y(i),r.from=x(a,o),r.to=x(s,o),r.start=n?n.end:t.offset,r.end=r.start+r.delay+r.duration,r.easing=S(r.easing),r.elasticity=(1e3-Math.min(Math.max(r.elasticity,1),999))/1e3,D.col(r.from.original)&&(r.round=1),n=r})}function k(t,n){return e(t.map(function(t){return n.map(function(e){var n=d(t.target,e.name);if(n){var r=M(e,t);e={type:n,property:e.name,animatable:t,tweens:r,duration:r[r.length-1].end,delay:r[0].delay}}else e=void 0;return e})})).filter(function(t){return!D.und(t)})}function A(t,e,n){var r="delay"===t?Math.min:Math.max;return e.length?r.apply(Math,e.map(function(e){return e[t]})):n[t]}function P(t){var e,n=o(j,t),r=o(N,t),i=E(t.targets),a=[],u=s(n,r);for(e in t)u.hasOwnProperty(e)||"targets"===e||a.push({name:e,offset:u.offset,tweens:C(t[e],r)});return t=k(i,a),s(n,{children:[],animatables:i,animations:t,duration:A("duration",t,r),delay:A("delay",t,r)})}function I(t){function e(){return window.Promise&&new Promise(function(t){return l=t})}function n(t){return p.reversed?p.duration-t:t}function r(t){for(var e=0,n={},r=p.animations,i={};e<r.length;){var o=r[e],a=o.animatable,s=o.tweens;i.tween=s.filter(function(e){return t<e.end})[0]||s[s.length-1],i.isPath$1=i.tween.isPath,i.round=i.tween.round,i.eased=i.tween.easing(Math.min(Math.max(t-i.tween.start-i.tween.delay,0),i.tween.duration)/i.tween.duration,i.tween.elasticity),s=T(i.tween.to.numbers.map(function(t){return function(e,n){return n=t.isPath$1?0:t.tween.from.numbers[n],e=n+t.eased*(e-n),t.isPath$1&&(e=b(t.tween.value,e)),t.round&&(e=Math.round(e*t.round)/t.round),e}}(i)),i.tween.to.strings),z[o.type](a.target,o.property,s,n,a.id),o.currentValue=s,e++,i={isPath$1:i.isPath$1,tween:i.tween,eased:i.eased,round:i.round}}if(n)for(var u in n)L||(L=h(document.body,"transform")?"transform":"-webkit-transform"),p.animatables[u].target.style[L]=n[u].join(" ");p.currentTime=t,p.progress=t/p.duration*100}function i(t){p[t]&&p[t](p)}function o(){p.remaining&&!0!==p.remaining&&p.remaining--}function a(t){var a=p.duration,h=p.offset,d=p.delay,m=p.currentTime,v=p.reversed,g=n(t),g=Math.min(Math.max(g,0),a);if(p.children){var y=p.children;if(g>=p.currentTime)for(var b=0;b<y.length;b++)y[b].seek(g);else for(b=y.length;b--;)y[b].seek(g)}g>h&&g<a?(r(g),!p.began&&g>=d&&(p.began=!0,i("begin")),i("run")):(g<=h&&0!==m&&(r(0),v&&o()),g>=a&&m!==a&&(r(a),v||o())),t>=a&&(p.remaining?(u=s,"alternate"===p.direction&&(p.reversed=!p.reversed)):(p.pause(),"Promise"in window&&(l(),f=e()),p.completed||(p.completed=!0,i("complete"))),c=0),i("update")}t=void 0===t?{}:t;var s,u,c=0,l=null,f=e(),p=P(t);return p.reset=function(){var t=p.direction,e=p.loop;for(p.currentTime=0,p.progress=0,p.paused=!0,p.began=!1,p.completed=!1,p.reversed="reverse"===t,p.remaining="alternate"===t&&1===e?2:e,t=p.children.length;t--;)e=p.children[t],e.seek(e.offset),e.reset()},p.tick=function(t){s=t,u||(u=s),a((c+s-u)*I.speed)},p.seek=function(t){a(n(t))},p.pause=function(){var t=F.indexOf(p);-1<t&&F.splice(t,1),p.paused=!0},p.play=function(){p.paused&&(p.paused=!1,u=0,c=n(p.currentTime),F.push(p),Y||H())},p.reverse=function(){p.reversed=!p.reversed,u=0,c=n(p.currentTime)},p.restart=function(){p.pause(),p.reset(),p.play()},p.finished=f,p.reset(),p.autoplay&&p.play(),p}var L,j={update:void 0,begin:void 0,run:void 0,complete:void 0,loop:1,direction:"normal",autoplay:!0,offset:0},N={duration:1e3,delay:0,easing:"easeOutElastic",elasticity:500,round:0},_="translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(" "),D={arr:function(t){return Array.isArray(t)},obj:function(t){return-1<Object.prototype.toString.call(t).indexOf("Object")},svg:function(t){return t instanceof SVGElement},dom:function(t){return t.nodeType||D.svg(t)},str:function(t){return"string"==typeof t},fnc:function(t){return"function"==typeof t},und:function(t){return void 0===t},hex:function(t){return/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(t)},rgb:function(t){return/^rgb/.test(t)},hsl:function(t){return/^hsl/.test(t)},col:function(t){return D.hex(t)||D.rgb(t)||D.hsl(t)}},X=function(){function t(t,e,n){return(((1-3*n+3*e)*t+(3*n-6*e))*t+3*e)*t}return function(e,n,r,i){if(0<=e&&1>=e&&0<=r&&1>=r){var o=new Float32Array(11);if(e!==n||r!==i)for(var a=0;11>a;++a)o[a]=t(.1*a,e,r);return function(a){if(e===n&&r===i)return a;if(0===a)return 0;if(1===a)return 1;for(var s=0,u=1;10!==u&&o[u]<=a;++u)s+=.1;--u;var u=s+(a-o[u])/(o[u+1]-o[u])*.1,c=3*(1-3*r+3*e)*u*u+2*(3*r-6*e)*u+3*e;if(.001<=c){for(s=0;4>s&&(c=3*(1-3*r+3*e)*u*u+2*(3*r-6*e)*u+3*e,0!==c);++s)var l=t(u,e,r)-a,u=u-l/c;a=u}else if(0===c)a=u;else{var u=s,s=s+.1,f=0;do l=u+(s-u)/2,c=t(l,e,r)-a,0<c?s=l:u=l;while(1e-7<Math.abs(c)&&10>++f);a=l}return t(a,n,i)}}}}(),R=function(){function t(t,e){return 0===t||1===t?t:-Math.pow(2,10*(t-1))*Math.sin(2*(t-1-e/(2*Math.PI)*Math.asin(1))*Math.PI/e)}var e,n="Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),r={In:[[.55,.085,.68,.53],[.55,.055,.675,.19],[.895,.03,.685,.22],[.755,.05,.855,.06],[.47,0,.745,.715],[.95,.05,.795,.035],[.6,.04,.98,.335],[.6,-.28,.735,.045],t],Out:[[.25,.46,.45,.94],[.215,.61,.355,1],[.165,.84,.44,1],[.23,1,.32,1],[.39,.575,.565,1],[.19,1,.22,1],[.075,.82,.165,1],[.175,.885,.32,1.275],function(e,n){return 1-t(1-e,n)}],InOut:[[.455,.03,.515,.955],[.645,.045,.355,1],[.77,0,.175,1],[.86,0,.07,1],[.445,.05,.55,.95],[1,0,0,1],[.785,.135,.15,.86],[.68,-.55,.265,1.55],function(e,n){return.5>e?t(2*e,n)/2:1-t(-2*e+2,n)/2}]},i={linear:X(.25,.25,.75,.75)},o={};for(e in r)o.type=e,r[o.type].forEach(function(t){return function(e,r){i["ease"+t.type+n[r]]=D.fnc(e)?e:X.apply(a,e)}}(o)),o={type:o.type};return i}(),z={css:function(t,e,n){return t.style[e]=n},attribute:function(t,e,n){return t.setAttribute(e,n)},object:function(t,e,n){return t[e]=n},transform:function(t,e,n,r,i){r[i]||(r[i]=[]),r[i].push(e+"("+n+")")}},F=[],Y=0,H=function(){function t(){Y=requestAnimationFrame(e)}function e(e){var n=F.length;if(n){for(var r=0;r<n;)F[r]&&F[r].tick(e),r++;t()}else cancelAnimationFrame(Y),Y=0}return t}();return I.version="2.0.2",I.speed=1,I.running=F,I.remove=function(t){t=w(t);for(var e=F.length;e--;)for(var n=F[e],i=n.animations,o=i.length;o--;)r(t,i[o].animatable.target)&&(i.splice(o,1),i.length||n.pause())},I.getValue=v,I.path=function(e,n){var r=D.str(e)?t(e)[0]:e,i=n||100;return function(t){return{el:r,property:t,totalLength:r.getTotalLength()*(i/100)}}},I.setDashoffset=function(t){var e=t.getTotalLength();return t.setAttribute("stroke-dasharray",e),e},I.bezier=X,I.easings=R,I.timeline=function(t){var e=I(t);return e.pause(),e.duration=0,e.add=function(t){return e.children.forEach(function(t){t.began=!0,t.completed=!0}),n(t).forEach(function(t){var n=e.duration,r=t.offset;t.autoplay=!1,t.offset=D.und(r)?n:g(r,n),e.seek(t.offset),t=I(t),t.duration>n&&(e.duration=t.duration),t.began=!0,e.children.push(t)}),e.reset(),e.seek(0),e.autoplay&&e.restart(),e},e},I.random=function(t,e){return Math.floor(Math.random()*(e-t+1))+t},I})},function(t,e,n){"use strict";var r=n(1);n.d(e,"a",function(){return u});var i=this,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=function(t,e,n){return setTimeout(function(){if(n.cached_options.position&&n.cached_options.position.includes("bottom"))return void r.a.animateOutBottom(t,function(){n.remove(t)});r.a.animateOut(t,function(){n.remove(t)})},e),!0},s=function(t,e){return("object"===("undefined"==typeof HTMLElement?"undefined":o(HTMLElement))?e instanceof HTMLElement:e&&"object"===(void 0===e?"undefined":o(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)?t.appendChild(e):t.innerHTML=e,i},u=function(t,e){var n=!1;return{el:t,text:function(e){return s(t,e),this},goAway:function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:800;return n=!0,a(t,r,e)},remove:function(){e.remove(t)},disposed:function(){return n}}}},function(t,e,n){"use strict";var r=n(12),i=n.n(r),o=n(1),a=n(7),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u=n(2),c={},l=null,f=function(t){return t.className=t.className||null,t.onComplete=t.onComplete||null,t.position=t.position||"top-right",t.duration=t.duration||null,t.theme=t.theme||"primary",t.type=t.type||"default",t.containerClass=t.containerClass||null,t.fullWidth=t.fullWidth||!1,t.icon=t.icon||null,t.action=t.action||null,t.fitToScreen=t.fitToScreen||null,t.closeOnSwipe=void 0===t.closeOnSwipe||t.closeOnSwipe,t.iconPack=t.iconPack||"material",t.className&&"string"==typeof t.className&&(t.className=t.className.split(" ")),t.className||(t.className=[]),t.theme&&t.className.push(t.theme.trim()),t.type&&t.className.push(t.type),t.containerClass&&"string"==typeof t.containerClass&&(t.containerClass=t.containerClass.split(" ")),t.containerClass||(t.containerClass=[]),t.position&&t.containerClass.push(t.position.trim()),t.fullWidth&&t.containerClass.push("full-width"),t.fitToScreen&&t.containerClass.push("fit-to-screen"),c=t,t},p=function(t,e){var r=document.createElement("div");if(r.classList.add("toasted"),r.hash=u.generate(),e.className&&e.className.forEach(function(t){r.classList.add(t)}),("object"===("undefined"==typeof HTMLElement?"undefined":s(HTMLElement))?t instanceof HTMLElement:t&&"object"===(void 0===t?"undefined":s(t))&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName)?r.appendChild(t):r.innerHTML=t,h(e,r),e.closeOnSwipe){var c=new i.a(r,{prevent_default:!1});c.on("pan",function(t){var e=t.deltaX,n=80;r.classList.contains("panning")||r.classList.add("panning");var i=1-Math.abs(e/n);i<0&&(i=0),o.a.animatePanning(r,e,i)}),c.on("panend",function(t){var n=t.deltaX;Math.abs(n)>80?o.a.animatePanEnd(r,function(){"function"==typeof e.onComplete&&e.onComplete(),r.parentNode&&l.remove(r)}):(r.classList.remove("panning"),o.a.animateReset(r))})}if(Array.isArray(e.action))e.action.forEach(function(t){var e=m(t,n.i(a.a)(r,l));e&&r.appendChild(e)});else if("object"===s(e.action)){var f=m(e.action,n.i(a.a)(r,l));f&&r.appendChild(f)}return r},h=function(t,e){if(t.icon){var n=document.createElement("i");switch(t.iconPack){case"fontawesome":n.classList.add("fa");var r=t.icon.name?t.icon.name:t.icon;r.includes("fa-")?n.classList.add(r.trim()):n.classList.add("fa-"+r.trim());break;default:n.classList.add("material-icons"),n.textContent=t.icon.name?t.icon.name:t.icon}t.icon.after&&n.classList.add("after"),d(t,n,e)}},d=function(t,e,n){t.icon&&(t.icon.after&&t.icon.name?n.appendChild(e):(t.icon.name,n.insertBefore(e,n.firstChild)))},m=function(t,e){if(!t)return null;var n=document.createElement("a");if(n.classList.add("action"),n.classList.add("ripple"),t.text&&(n.text=t.text),t.href&&(n.href=t.href),t.icon){n.classList.add("icon");var r=document.createElement("i");switch(c.iconPack){case"fontawesome":r.classList.add("fa"),t.icon.includes("fa-")?r.classList.add(t.icon.trim()):r.classList.add("fa-"+t.icon.trim());break;default:r.classList.add("material-icons"),r.textContent=t.icon}n.appendChild(r)}return t.class&&("string"==typeof t.class?t.class.split(" ").forEach(function(t){n.classList.add(t)}):Array.isArray(t.class)&&t.class.forEach(function(t){n.classList.add(t.trim())})),t.push&&n.addEventListener("click",function(n){if(n.preventDefault(),!c.router)return void console.warn("[vue-toasted] : Vue Router instance is not attached. please check the docs");c.router.push(t.push),t.push.dontClose||e.goAway(0)}),t.onClick&&"function"==typeof t.onClick&&n.addEventListener("click",function(n){t.onClick&&(n.preventDefault(),t.onClick(n,e))}),n};e.a=function(t,e,r){l=t,r=f(r);var i=document.getElementById(l.id);null===i&&(i=document.createElement("div"),i.id=l.id,document.body.appendChild(i)),r.containerClass.unshift("toasted-container"),i.className!==r.containerClass.join(" ")&&(i.className="",r.containerClass.forEach(function(t){i.classList.add(t)}));var s=p(e,r);e&&i.appendChild(s),s.style.opacity=0,o.a.animateIn(s);var u=r.duration,c=void 0;return null!==u&&(c=setInterval(function(){null===s.parentNode&&window.clearInterval(c),s.classList.contains("panning")||(u-=20),u<=0&&(o.a.animateOut(s,function(){"function"==typeof r.onComplete&&r.onComplete(),s.parentNode&&l.remove(s)}),window.clearInterval(c))},20)),n.i(a.a)(s,l)}},function(t,e,n){e=t.exports=n(10)(),e.push([t.i,".toasted{padding:0 20px}.toasted.rounded{border-radius:24px}.toasted.primary{border-radius:2px;min-height:38px;line-height:1.1em;background-color:#353535;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted.primary.success{background:#4caf50}.toasted.primary.error{background:#f44336}.toasted.primary.info{background:#3f51b5}.toasted.primary .action{color:#a1c2fa}.toasted.bubble{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#ff7043;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}.toasted.bubble.success{background:#4caf50}.toasted.bubble.error{background:#f44336}.toasted.bubble.info{background:#3f51b5}.toasted.bubble .action{color:#8e2b0c}.toasted.outline{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#fff;border:1px solid #676767;padding:0 20px;font-size:15px;color:#676767;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);font-weight:700}.toasted.outline.success{color:#4caf50;border-color:#4caf50}.toasted.outline.error{color:#f44336;border-color:#f44336}.toasted.outline.info{color:#3f51b5;border-color:#3f51b5}.toasted.outline .action{color:#607d8b}.toasted-container{position:fixed;z-index:10000}.toasted-container,.toasted-container.full-width{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}.toasted-container.full-width{max-width:86%;width:100%}.toasted-container.full-width.fit-to-screen{min-width:100%}.toasted-container.full-width.fit-to-screen .toasted:first-child{margin-top:0}.toasted-container.full-width.fit-to-screen.top-right{top:0;right:0}.toasted-container.full-width.fit-to-screen.top-left{top:0;left:0}.toasted-container.full-width.fit-to-screen.top-center{top:0;left:0;-webkit-transform:translateX(0);transform:translateX(0)}.toasted-container.full-width.fit-to-screen.bottom-right{right:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-left{left:0;bottom:0}.toasted-container.full-width.fit-to-screen.bottom-center{left:0;bottom:0;-webkit-transform:translateX(0);transform:translateX(0)}.toasted-container.top-right{top:10%;right:7%}.toasted-container.top-left{top:10%;left:7%}.toasted-container.top-center{top:10%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.toasted-container.bottom-right{right:5%;bottom:7%}.toasted-container.bottom-left{left:5%;bottom:7%}.toasted-container.bottom-center{left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:7%}.toasted-container.bottom-left .toasted,.toasted-container.top-left .toasted{float:left}.toasted-container.bottom-right .toasted,.toasted-container.top-right .toasted{float:right}.toasted-container .toasted{top:35px;width:auto;clear:both;margin-top:10px;position:relative;max-width:100%;height:auto;word-break:normal;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;box-sizing:inherit}.toasted-container .toasted .fa,.toasted-container .toasted .material-icons{margin-right:.5rem;margin-left:-.4rem}.toasted-container .toasted .fa.after,.toasted-container .toasted .material-icons.after{margin-left:.5rem;margin-right:-.4rem}.toasted-container .toasted .action{text-decoration:none;font-size:.8rem;padding:8px;margin:5px -7px 5px 7px;border-radius:3px;text-transform:uppercase;letter-spacing:.03em;font-weight:600;cursor:pointer}.toasted-container .toasted .action.icon{padding:4px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.toasted-container .toasted .action.icon .fa,.toasted-container .toasted .action.icon .material-icons{margin-right:0;margin-left:4px}.toasted-container .toasted .action.icon:hover{text-decoration:none}.toasted-container .toasted .action:hover{text-decoration:underline}@media only screen and (max-width:600px){#toasted-container{min-width:100%}#toasted-container .toasted:first-child{margin-top:0}#toasted-container.top-right{top:0;right:0}#toasted-container.top-left{top:0;left:0}#toasted-container.top-center{top:0;left:0;-webkit-transform:translateX(0);transform:translateX(0)}#toasted-container.bottom-right{right:0;bottom:0}#toasted-container.bottom-left{left:0;bottom:0}#toasted-container.bottom-center{left:0;bottom:0;-webkit-transform:translateX(0);transform:translateX(0)}#toasted-container.bottom-center,#toasted-container.top-center{-ms-flex-align:stretch!important;align-items:stretch!important}#toasted-container.bottom-left .toasted,#toasted-container.bottom-right .toasted,#toasted-container.top-left .toasted,#toasted-container.top-right .toasted{float:none}#toasted-container .toasted{border-radius:0}}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(t,e,n){"use strict";function r(t,e){if(void 0===t||null===t)throw new TypeError("Cannot convert first argument to object");for(var n=Object(t),r=1;r<arguments.length;r++){var i=arguments[r];if(void 0!==i&&null!==i)for(var o=Object.keys(Object(i)),a=0,s=o.length;a<s;a++){var u=o[a],c=Object.getOwnPropertyDescriptor(i,u);void 0!==c&&c.enumerable&&(n[u]=i[u])}}return n}function i(){Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:r})}t.exports={assign:r,polyfill:i}},function(t,e,n){var r;!function(i,o,a,s){"use strict";function u(t,e,n){return setTimeout(h(t,n),e)}function c(t,e,n){return!!Array.isArray(t)&&(l(t,n[e],n),!0)}function l(t,e,n){var r;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==s)for(r=0;r<t.length;)e.call(n,t[r],r,t),r++;else for(r in t)t.hasOwnProperty(r)&&e.call(n,t[r],r,t)}function f(t,e,n){var r="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=i.console&&(i.console.warn||i.console.log);return o&&o.call(i.console,r,n),t.apply(this,arguments)}}function p(t,e,n){var r,i=e.prototype;r=t.prototype=Object.create(i),r.constructor=t,r._super=i,n&&mt(r,n)}function h(t,e){return function(){return t.apply(e,arguments)}}function d(t,e){return typeof t==yt?t.apply(e?e[0]||s:s,e):t}function m(t,e){return t===s?e:t}function v(t,e,n){l(x(e),function(e){t.addEventListener(e,n,!1)})}function g(t,e,n){l(x(e),function(e){t.removeEventListener(e,n,!1)})}function y(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function b(t,e){return t.indexOf(e)>-1}function x(t){return t.trim().split(/\s+/g)}function T(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var r=0;r<t.length;){if(n&&t[r][n]==e||!n&&t[r]===e)return r;r++}return-1}function w(t){return Array.prototype.slice.call(t,0)}function E(t,e,n){for(var r=[],i=[],o=0;o<t.length;){var a=e?t[o][e]:t[o];T(i,a)<0&&r.push(t[o]),i[o]=a,o++}return n&&(r=e?r.sort(function(t,n){return t[e]>n[e]}):r.sort()),r}function C(t,e){for(var n,r,i=e[0].toUpperCase()+e.slice(1),o=0;o<vt.length;){if(n=vt[o],r=n?n+i:e,r in t)return r;o++}return s}function O(){return Ct++}function S(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||i}function M(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){d(t.options.enable,[t])&&n.handler(e)},this.init()}function k(t){var e=t.options.inputClass;return new(e?e:Mt?H:kt?W:St?B:Y)(t,A)}function A(t,e,n){var r=n.pointers.length,i=n.changedPointers.length,o=e&Nt&&r-i===0,a=e&(Dt|Xt)&&r-i===0;n.isFirst=!!o,n.isFinal=!!a,o&&(t.session={}),n.eventType=e,P(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function P(t,e){var n=t.session,r=e.pointers,i=r.length;n.firstInput||(n.firstInput=j(e)),i>1&&!n.firstMultiple?n.firstMultiple=j(e):1===i&&(n.firstMultiple=!1);var o=n.firstInput,a=n.firstMultiple,s=a?a.center:o.center,u=e.center=N(r);e.timeStamp=Tt(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=R(s,u),e.distance=X(s,u),I(n,e),e.offsetDirection=D(e.deltaX,e.deltaY);var c=_(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=c.x,e.overallVelocityY=c.y,e.overallVelocity=xt(c.x)>xt(c.y)?c.x:c.y,e.scale=a?F(a.pointers,r):1,e.rotation=a?z(a.pointers,r):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,L(n,e);var l=t.element;y(e.srcEvent.target,l)&&(l=e.srcEvent.target),e.target=l}function I(t,e){var n=e.center,r=t.offsetDelta||{},i=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Nt&&o.eventType!==Dt||(i=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},r=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=i.x+(n.x-r.x),e.deltaY=i.y+(n.y-r.y)}function L(t,e){var n,r,i,o,a=t.lastInterval||e,u=e.timeStamp-a.timeStamp;if(e.eventType!=Xt&&(u>jt||a.velocity===s)){var c=e.deltaX-a.deltaX,l=e.deltaY-a.deltaY,f=_(u,c,l);r=f.x,i=f.y,n=xt(f.x)>xt(f.y)?f.x:f.y,o=D(c,l),t.lastInterval=e}else n=a.velocity,r=a.velocityX,i=a.velocityY,o=a.direction;e.velocity=n,e.velocityX=r,e.velocityY=i,e.direction=o}function j(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:bt(t.pointers[n].clientX),clientY:bt(t.pointers[n].clientY)},n++;return{timeStamp:Tt(),pointers:e,center:N(e),deltaX:t.deltaX,deltaY:t.deltaY}}function N(t){var e=t.length;if(1===e)return{x:bt(t[0].clientX),y:bt(t[0].clientY)};for(var n=0,r=0,i=0;i<e;)n+=t[i].clientX,r+=t[i].clientY,i++;return{x:bt(n/e),y:bt(r/e)}}function _(t,e,n){return{x:e/t||0,y:n/t||0}}function D(t,e){return t===e?Rt:xt(t)>=xt(e)?t<0?zt:Ft:e<0?Yt:Ht}function X(t,e,n){n||(n=Ut);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return Math.sqrt(r*r+i*i)}function R(t,e,n){n||(n=Ut);var r=e[n[0]]-t[n[0]],i=e[n[1]]-t[n[1]];return 180*Math.atan2(i,r)/Math.PI}function z(t,e){return R(e[1],e[0],Bt)+R(t[1],t[0],Bt)}function F(t,e){return X(e[0],e[1],Bt)/X(t[0],t[1],Bt)}function Y(){this.evEl=Gt,this.evWin=Zt,this.pressed=!1,M.apply(this,arguments)}function H(){this.evEl=Kt,this.evWin=te,M.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function q(){this.evTarget=ne,this.evWin=re,this.started=!1,M.apply(this,arguments)}function V(t,e){var n=w(t.touches),r=w(t.changedTouches);return e&(Dt|Xt)&&(n=E(n.concat(r),"identifier",!0)),[n,r]}function W(){this.evTarget=oe,this.targetIds={},M.apply(this,arguments)}function U(t,e){var n=w(t.touches),r=this.targetIds;if(e&(Nt|_t)&&1===n.length)return r[n[0].identifier]=!0,[n,n];var i,o,a=w(t.changedTouches),s=[],u=this.target;if(o=n.filter(function(t){return y(t.target,u)}),e===Nt)for(i=0;i<o.length;)r[o[i].identifier]=!0,i++;for(i=0;i<a.length;)r[a[i].identifier]&&s.push(a[i]),e&(Dt|Xt)&&delete r[a[i].identifier],i++;return s.length?[E(o.concat(s),"identifier",!0),s]:void 0}function B(){M.apply(this,arguments);var t=h(this.handler,this);this.touch=new W(this.manager,t),this.mouse=new Y(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function $(t,e){t&Nt?(this.primaryTouch=e.changedPointers[0].identifier,G.call(this,e)):t&(Dt|Xt)&&G.call(this,e)}function G(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var r=this.lastTouches,i=function(){var t=r.indexOf(n);t>-1&&r.splice(t,1)};setTimeout(i,ae)}}function Z(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,r=0;r<this.lastTouches.length;r++){var i=this.lastTouches[r],o=Math.abs(e-i.x),a=Math.abs(n-i.y);if(o<=se&&a<=se)return!0}return!1}function Q(t,e){this.manager=t,this.set(e)}function J(t){if(b(t,he))return he;var e=b(t,de),n=b(t,me);return e&&n?he:e||n?e?de:me:b(t,pe)?pe:fe}function K(){if(!ce)return!1;var t={},e=i.CSS&&i.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||i.CSS.supports("touch-action",n)}),t}function tt(t){this.options=mt({},this.defaults,t||{}),this.id=O(),this.manager=null,this.options.enable=m(this.options.enable,!0),this.state=ge,this.simultaneous={},this.requireFail=[]}function et(t){return t&we?"cancel":t&xe?"end":t&be?"move":t&ye?"start":""}function nt(t){return t==Ht?"down":t==Yt?"up":t==zt?"left":t==Ft?"right":""}function rt(t,e){var n=e.manager;return n?n.get(t):t}function it(){tt.apply(this,arguments)}function ot(){it.apply(this,arguments),this.pX=null,this.pY=null}function at(){it.apply(this,arguments)}function st(){tt.apply(this,arguments),this._timer=null,this._input=null}function ut(){it.apply(this,arguments)}function ct(){it.apply(this,arguments)}function lt(){tt.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ft(t,e){return e=e||{},e.recognizers=m(e.recognizers,ft.defaults.preset),new pt(t,e)}function pt(t,e){this.options=mt({},ft.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=k(this),this.touchAction=new Q(this,this.options.touchAction),ht(this,!0),l(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function ht(t,e){var n=t.element;if(n.style){var r;l(t.options.cssProps,function(i,o){r=C(n.style,o),e?(t.oldCssProps[r]=n.style[r],n.style[r]=i):n.style[r]=t.oldCssProps[r]||""}),e||(t.oldCssProps={})}}function dt(t,e){var n=o.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}var mt,vt=["","webkit","Moz","MS","ms","o"],gt=o.createElement("div"),yt="function",bt=Math.round,xt=Math.abs,Tt=Date.now;mt="function"!=typeof Object.assign?function(t){if(t===s||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var r=arguments[n];if(r!==s&&null!==r)for(var i in r)r.hasOwnProperty(i)&&(e[i]=r[i])}return e}:Object.assign;var wt=f(function(t,e,n){for(var r=Object.keys(e),i=0;i<r.length;)(!n||n&&t[r[i]]===s)&&(t[r[i]]=e[r[i]]),i++;return t},"extend","Use `assign`."),Et=f(function(t,e){return wt(t,e,!0)},"merge","Use `assign`."),Ct=1,Ot=/mobile|tablet|ip(ad|hone|od)|android/i,St="ontouchstart"in i,Mt=C(i,"PointerEvent")!==s,kt=St&&Ot.test(navigator.userAgent),At="touch",Pt="pen",It="mouse",Lt="kinect",jt=25,Nt=1,_t=2,Dt=4,Xt=8,Rt=1,zt=2,Ft=4,Yt=8,Ht=16,qt=zt|Ft,Vt=Yt|Ht,Wt=qt|Vt,Ut=["x","y"],Bt=["clientX","clientY"];M.prototype={handler:function(){},init:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(S(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&g(this.element,this.evEl,this.domHandler),this.evTarget&&g(this.target,this.evTarget,this.domHandler),this.evWin&&g(S(this.element),this.evWin,this.domHandler)}};var $t={mousedown:Nt,mousemove:_t,mouseup:Dt},Gt="mousedown",Zt="mousemove mouseup";p(Y,M,{handler:function(t){var e=$t[t.type];e&Nt&&0===t.button&&(this.pressed=!0),e&_t&&1!==t.which&&(e=Dt),this.pressed&&(e&Dt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:It,srcEvent:t}))}});var Qt={pointerdown:Nt,pointermove:_t,pointerup:Dt,pointercancel:Xt,pointerout:Xt},Jt={2:At,3:Pt,4:It,5:Lt},Kt="pointerdown",te="pointermove pointerup pointercancel";i.MSPointerEvent&&!i.PointerEvent&&(Kt="MSPointerDown",te="MSPointerMove MSPointerUp MSPointerCancel"),p(H,M,{handler:function(t){var e=this.store,n=!1,r=t.type.toLowerCase().replace("ms",""),i=Qt[r],o=Jt[t.pointerType]||t.pointerType,a=o==At,s=T(e,t.pointerId,"pointerId");i&Nt&&(0===t.button||a)?s<0&&(e.push(t),s=e.length-1):i&(Dt|Xt)&&(n=!0),s<0||(e[s]=t,this.callback(this.manager,i,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(s,1))}});var ee={touchstart:Nt,touchmove:_t,touchend:Dt,touchcancel:Xt},ne="touchstart",re="touchstart touchmove touchend touchcancel";p(q,M,{handler:function(t){var e=ee[t.type];if(e===Nt&&(this.started=!0),this.started){var n=V.call(this,t,e);e&(Dt|Xt)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:At,srcEvent:t})}}});var ie={touchstart:Nt,touchmove:_t,touchend:Dt,touchcancel:Xt},oe="touchstart touchmove touchend touchcancel";p(W,M,{handler:function(t){var e=ie[t.type],n=U.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:At,srcEvent:t})}});var ae=2500,se=25;p(B,M,{handler:function(t,e,n){var r=n.pointerType==At,i=n.pointerType==It;if(!(i&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(r)$.call(this,e,n);else if(i&&Z.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ue=C(gt.style,"touchAction"),ce=ue!==s,le="compute",fe="auto",pe="manipulation",he="none",de="pan-x",me="pan-y",ve=K();Q.prototype={set:function(t){t==le&&(t=this.compute()),ce&&this.manager.element.style&&ve[t]&&(this.manager.element.style[ue]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return l(this.manager.recognizers,function(e){d(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),J(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var r=this.actions,i=b(r,he)&&!ve[he],o=b(r,me)&&!ve[me],a=b(r,de)&&!ve[de];if(i){var s=1===t.pointers.length,u=t.distance<2,c=t.deltaTime<250;if(s&&u&&c)return}return a&&o?void 0:i||o&&n&qt||a&&n&Vt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ge=1,ye=2,be=4,xe=8,Te=xe,we=16,Ee=32;tt.prototype={defaults:{},set:function(t){return mt(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(c(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=rt(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return c(t,"dropRecognizeWith",this)?this:(t=rt(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(c(t,"requireFailure",this))return this;var e=this.requireFail;return t=rt(t,this),T(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(c(t,"dropRequireFailure",this))return this;t=rt(t,this);var e=T(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,r=this.state;r<xe&&e(n.options.event+et(r)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),r>=xe&&e(n.options.event+et(r))},tryEmit:function(t){if(this.canEmit())return this.emit(t);this.state=Ee},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(Ee|ge)))return!1;t++}return!0},recognize:function(t){var e=mt({},t);if(!d(this.options.enable,[this,e]))return this.reset(),void(this.state=Ee);this.state&(Te|we|Ee)&&(this.state=ge),this.state=this.process(e),this.state&(ye|be|xe|we)&&this.tryEmit(e)},process:function(t){},getTouchAction:function(){},reset:function(){}},p(it,tt,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,r=e&(ye|be),i=this.attrTest(t);return r&&(n&Xt||!i)?e|we:r||i?n&Dt?e|xe:e&ye?e|be:ye:Ee}}),p(ot,it,{defaults:{event:"pan",threshold:10,pointers:1,direction:Wt},getTouchAction:function(){var t=this.options.direction,e=[];return t&qt&&e.push(me),t&Vt&&e.push(de),e},directionTest:function(t){var e=this.options,n=!0,r=t.distance,i=t.direction,o=t.deltaX,a=t.deltaY;return i&e.direction||(e.direction&qt?(i=0===o?Rt:o<0?zt:Ft,n=o!=this.pX,r=Math.abs(t.deltaX)):(i=0===a?Rt:a<0?Yt:Ht,n=a!=this.pY,r=Math.abs(t.deltaY))),t.direction=i,n&&r>e.threshold&&i&e.direction},attrTest:function(t){return it.prototype.attrTest.call(this,t)&&(this.state&ye||!(this.state&ye)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=nt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),p(at,it,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ye)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),p(st,tt,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[fe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,r=t.distance<e.threshold,i=t.deltaTime>e.time;if(this._input=t,!r||!n||t.eventType&(Dt|Xt)&&!i)this.reset();else if(t.eventType&Nt)this.reset(),this._timer=u(function(){this.state=Te,this.tryEmit()},e.time,this);else if(t.eventType&Dt)return Te;return Ee},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===Te&&(t&&t.eventType&Dt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=Tt(),this.manager.emit(this.options.event,this._input)))}}),p(ut,it,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[he]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ye)}}),p(ct,it,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:qt|Vt,pointers:1},getTouchAction:function(){return ot.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(qt|Vt)?e=t.overallVelocity:n&qt?e=t.overallVelocityX:n&Vt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&xt(e)>this.options.velocity&&t.eventType&Dt},emit:function(t){var e=nt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),p(lt,tt,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[pe]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,r=t.distance<e.threshold,i=t.deltaTime<e.time;if(this.reset(),t.eventType&Nt&&0===this.count)return this.failTimeout();if(r&&i&&n){if(t.eventType!=Dt)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,a=!this.pCenter||X(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&o?this.count+=1:this.count=1,this._input=t;if(0===this.count%e.taps)return this.hasRequireFailures()?(this._timer=u(function(){this.state=Te,this.tryEmit()},e.interval,this),ye):Te}return Ee},failTimeout:function(){return this._timer=u(function(){this.state=Ee},this.options.interval,this),Ee},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Te&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ft.VERSION="2.0.7",ft.defaults={domEvents:!1,touchAction:le,enable:!0,inputTarget:null,inputClass:null,preset:[[ut,{enable:!1}],[at,{enable:!1},["rotate"]],[ct,{direction:qt}],[ot,{direction:qt},["swipe"]],[lt],[lt,{event:"doubletap",taps:2},["tap"]],[st]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Ce=2;pt.prototype={set:function(t){return mt(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Ce:1},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,r=this.recognizers,i=e.curRecognizer;(!i||i&&i.state&Te)&&(i=e.curRecognizer=null);for(var o=0;o<r.length;)n=r[o],e.stopped===Ce||i&&n!=i&&!n.canRecognizeWith(i)?n.reset():n.recognize(t),!i&&n.state&(ye|be|xe)&&(i=e.curRecognizer=n),o++}},get:function(t){if(t instanceof tt)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(c(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(c(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=T(e,t);n!==-1&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==s&&e!==s){var n=this.handlers;return l(x(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==s){var n=this.handlers;return l(x(t),function(t){e?n[t]&&n[t].splice(T(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&dt(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](e),r++}},destroy:function(){this.element&&ht(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},mt(ft,{INPUT_START:Nt,INPUT_MOVE:_t,INPUT_END:Dt,INPUT_CANCEL:Xt,STATE_POSSIBLE:ge,STATE_BEGAN:ye,STATE_CHANGED:be,STATE_ENDED:xe,STATE_RECOGNIZED:Te,STATE_CANCELLED:we,STATE_FAILED:Ee,DIRECTION_NONE:Rt,DIRECTION_LEFT:zt,DIRECTION_RIGHT:Ft,DIRECTION_UP:Yt,DIRECTION_DOWN:Ht,DIRECTION_HORIZONTAL:qt,DIRECTION_VERTICAL:Vt,DIRECTION_ALL:Wt,Manager:pt,Input:M,TouchAction:Q,TouchInput:W,MouseInput:Y,PointerEventInput:H,TouchMouseInput:B,SingleTouchInput:q,Recognizer:tt,AttrRecognizer:it,Tap:lt,Pan:ot,Swipe:ct,Pinch:at,Rotate:ut,Press:st,on:v,off:g,each:l,merge:Et,extend:wt,assign:mt,inherit:p,bindFn:h,prefixed:C}),(void 0!==i?i:"undefined"!=typeof self?self:{}).Hammer=ft,r=function(){return ft}.call(e,n,e,t),r!==s&&(t.exports=r)}(window,document,"Hammer")},function(t,e,n){"use strict";function r(t){var e="",n=Math.floor(.001*(Date.now()-u));return n===o?i++:(i=0,o=n),e+=a(s.lookup,c),e+=a(s.lookup,t),i>0&&(e+=a(s.lookup,i)),e+=a(s.lookup,n)}var i,o,a=n(3),s=n(0),u=1459707606518,c=6;t.exports=r},function(t,e,n){"use strict";function r(t){var e=i.shuffled();return{version:15&e.indexOf(t.substr(0,1)),worker:15&e.indexOf(t.substr(1,1))}}var i=n(0);t.exports=r},function(t,e,n){"use strict";function r(e){return s.seed(e),t.exports}function i(e){return f=e,t.exports}function o(t){return void 0!==t&&s.characters(t),s.shuffled()}function a(){return c(f)}var s=n(0),u=(n(3),n(14)),c=n(13),l=n(16),f=n(19)||0;t.exports=a,t.exports.generate=a,t.exports.seed=r,t.exports.worker=i,t.exports.characters=o,t.exports.decode=u,t.exports.isValid=l},function(t,e,n){"use strict";function r(t){if(!t||"string"!=typeof t||t.length<6)return!1;for(var e=i.characters(),n=t.length,r=0;r<n;r++)if(e.indexOf(t[r])===-1)return!1;return!0}var i=n(0);t.exports=r},function(t,e,n){"use strict";function r(){if(!i||!i.getRandomValues)return 48&Math.floor(256*Math.random());var t=new Uint8Array(1);return i.getRandomValues(t),48&t[0]}var i="object"==typeof window&&(window.crypto||window.msCrypto);t.exports=r},function(t,e,n){"use strict";function r(){return o=(9301*o+49297)%233280,o/233280}function i(t){o=t}var o=1;t.exports={nextValue:r,seed:i}},function(t,e,n){"use strict";t.exports=0},function(t,e){t.exports=function(t,e,n,r){var i,o=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(i=t,o=t.default);var s="function"==typeof o?o.options:o;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),n&&(s._scopeId=n),r){var u=Object.create(s.computed||null);Object.keys(r).forEach(function(t){var e=r[t];u[t]=function(){return e}}),s.computed=u}return{esModule:i,exports:o,options:s}}},function(t,e,n){var r=n(9);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);n(22)("514c6ff8",r,!0)},function(t,e,n){function r(t){for(var e=0;e<t.length;e++){var n=t[e],r=l[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(o(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(o(n.parts[i]));l[n.id]={id:n.id,refs:1,parts:a}}}}function i(){var t=document.createElement("style");return t.type="text/css",f.appendChild(t),t}function o(t){var e,n,r=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(r){if(d)return m;r.parentNode.removeChild(r)}if(v){var o=h++;r=p||(p=i()),e=a.bind(null,r,o,!1),n=a.bind(null,r,o,!0)}else r=i(),e=s.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}function a(t,e,n,r){var i=n?"":r.css;if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function s(t,e){var n=e.css,r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var c=n(23),l={},f=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,h=0,d=!1,m=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){d=n;var i=c(t,e);return r(i),function(e){for(var n=[],o=0;o<i.length;o++){var a=i[o],s=l[a.id];s.refs--,n.push(s)}e?(i=c(t,e),r(i)):i=[];for(var o=0;o<n.length;o++){var s=n[o];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete l[s.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],s=o[1],u=o[2],c=o[3],l={id:t+":"+i,css:s,media:u,sourceMap:c};r[a]?r[a].parts.push(l):n.push(r[a]={id:a,parts:[l]})}return n}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(5),o=n.n(i),a={install:function(t,e){e||(e={});var n=new r.a(e);t.component("toasted",o.a),t.toasted=t.prototype.$toasted=n}};"undefined"!=typeof window&&window.Vue&&(window.Toasted=a),e.default=a}])});

/***/ }),
/* 73 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(101)
}
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(103)
/* template */
var __vue_template__ = __webpack_require__(104)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-420ae72c"
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
Component.options.__file = "resources/assets/js/students/CreateModal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-420ae72c", Component.options)
  } else {
    hotAPI.reload("data-v-420ae72c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(102);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(13)("c6468c42", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-420ae72c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CreateModal.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-420ae72c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CreateModal.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "\n.modal-mask[data-v-420ae72c] {\n  position: fixed;\n  z-index: 9998;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: table;\n  -webkit-transition: opacity .3s ease;\n  transition: opacity .3s ease;\n}\n.modal-wrapper[data-v-420ae72c] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.modal-container[data-v-420ae72c] {\n  width: 600px;\n  margin: 0px auto;\n  padding: 20px 30px;\n  background-color: #fff;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);\n  -webkit-transition: all .3s ease;\n  transition: all .3s ease;\n  font-family: Helvetica, Arial, sans-serif;\n}\n.modal-header h3[data-v-420ae72c] {\n  margin-top: 0;\n  color: #42b983;\n  font-size: 30px !important;\n}\n.modal-body[data-v-420ae72c] {\n  margin: 20px 0;\n  font-size: 1.4em;\n}\n.modal-default-button[data-v-420ae72c] {\n  margin: auto;\n}\n.modal-enter[data-v-420ae72c] {\n  opacity: 0;\n}\n.modal-leave-active[data-v-420ae72c] {\n  opacity: 0;\n}\n.modal-enter .modal-container[data-v-420ae72c],\n.modal-leave-active .modal-container[data-v-420ae72c] {\n  -webkit-transform: scale(1.1);\n  transform: scale(1.1);\n}\n.modal-footer[data-v-420ae72c] {\n  text-align: center;\n}\n.btn-close[data-v-420ae72c] {\n  border: none;\n  font-size: 20px;\n  padding: 20px;\n  cursor: pointer;\n  font-weight: bold;\n  color: #4AAE9B;\n  background: transparent;\n}\n", ""]);

// exports


/***/ }),
/* 103 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(15);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	name: 'create-modal',
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
			this.$emit('submit');
		}
	}
});

/***/ }),
/* 104 */
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
                _vm._v("\n\t\t\t\t\t\tdefault header\n\t\t\t\t\t")
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
                _c(
                  "ul",
                  { staticClass: "nav nav-tabs", attrs: { role: "tablist" } },
                  [
                    _c(
                      "li",
                      {
                        staticClass: "active",
                        attrs: { role: "presentation" }
                      },
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
                      {
                        staticClass: "disabled",
                        attrs: { role: "presentation" }
                      },
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
                      {
                        staticClass: "disabled",
                        attrs: { role: "presentation" }
                      },
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
                    [_vm._v("\n\t\t\t\t\t\t\t\t1\n\t\t\t\t\t\t\t")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "tab-content" }, [
                  _c(
                    "div",
                    {
                      staticClass: "tab-pane fade",
                      attrs: { role: "tabpanel", id: "stepper-step-2" }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\t\t2\n\t\t\t\t\t\t\t")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "tab-content" }, [
                  _c(
                    "div",
                    {
                      staticClass: "tab-pane fade",
                      attrs: { role: "tabpanel", id: "stepper-step-3" }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\t\t3\n\t\t\t\t\t\t\t")]
                  )
                ])
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
                    on: { click: _vm.close }
                  },
                  [
                    _vm._t("close", [
                      _vm._v("\n\t\t\t\t\t\t\t\tOK\n\t\t\t\t\t\t\t")
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
                        staticStyle: { width: "max-content" },
                        on: { click: _vm.submit }
                      },
                      [
                        _vm._t("action", [
                          _vm._v("\n\t\t\t\t\t\t\t\tSubmit\n\t\t\t\t\t\t\t")
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
    require("vue-hot-reload-api")      .rerender("data-v-420ae72c", module.exports)
  }
}

/***/ })
],[21]);