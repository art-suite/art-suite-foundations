module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Core, Types, isFunction, isJsonAtomicType, isObject, isPlainArray, isPlainObject, isString, mergeInto, ref;

ref = Core = __webpack_require__(1), isPlainObject = ref.isPlainObject, mergeInto = ref.mergeInto, isString = ref.isString, isFunction = ref.isFunction, isObject = ref.isObject, isPlainArray = ref.isPlainArray, isJsonAtomicType = ref.isJsonAtomicType;

module.exports = Types = (function() {
  var cloneObjectUpToKey, deepEach, deepEachAll, deepMap, deepMapArray, deepMapObject, functionName, noopMapper, objectName, tEq, throwInequalityError, toJsonStructure, toPostMessageStructure;

  function Types() {}

  mergeInto(Types, Core.Types);

  throwInequalityError = function(a, b) {
    throw new Error("Value types are not compatible for inequality tests. a: " + (a != null ? a.constructor.name : void 0) + ", b: " + (b != null ? b.constructor.name : void 0));
  };


  /*
   * simplified - as simple as I can make it
   * sacrifices some semantics
  gt = (a, b)->
    if (o = a > b) || a <= b
      return o
    a.gt b
  
   * just a tad more complex and only sacrifices clear errors
  gt = (a, b)->
    if typeof a == typeof b
      if (o = a > b) || a <= b
        return o
    a.gt b
   */

  tEq = function(a, b) {
    return typeof a === typeof b;
  };

  Types.gt = function(a, b) {
    var s;
    if ((a != null) && (b != null)) {
      s = tEq(a, b);
      return (s && a > b) || ((s && a <= b) ? false : a.gt(b));
    } else {
      return throwInequalityError(a, b);
    }
  };

  Types.lt = function(a, b) {
    var s;
    if ((a != null) && (b != null)) {
      s = tEq(a, b);
      return (s && a < b) || ((s && a >= b) ? false : a.lt(b));
    } else {
      return throwInequalityError(a, b);
    }
  };

  Types.gte = function(a, b) {
    var s;
    if ((a != null) && (b != null)) {
      s = tEq(a, b);
      return (s && a >= b) || ((s && a < b) ? false : a.gte(b));
    } else {
      return throwInequalityError(a, b);
    }
  };

  Types.lte = function(a, b) {
    var s;
    if ((a != null) && (b != null)) {
      s = tEq(a, b);
      return (s && a <= b) || ((s && a > b) ? false : a.lte(b));
    } else {
      return throwInequalityError(a, b);
    }
  };


  /*
  like RubyOnRails#present:
    "An object is present if it's not blank."
  
  basic:
    present null, undefined or "" returns false (or whatever returnIfNotPresent is set to)
    all other values return something truish - generally themselves
  
  custom:
    for bar where isFunction bar.present
      present bar returns bar.present()
  
  special-case truish results:
    present 0 or false returns true
  
  for any other value foo,
    present foo returns foo
  
  IN:
    obj:
      object tested for presence
    returnIfNotPresent: [false]
      what to return if not present
  
  OUT:
    returnIfNotPresent, true, or the value passed in
  
  If 'obj' has method: obj.present() => obj.present()
   */

  Types.present = function(obj, returnIfNotPresent) {
    var present;
    if (returnIfNotPresent == null) {
      returnIfNotPresent = false;
    }
    present = isFunction(obj != null ? obj.getPresent : void 0) ? obj.getPresent() : isFunction(obj != null ? obj.present : void 0) ? obj.present() : isString(obj) ? !obj.match(/^\s*$/) : obj !== void 0 && obj !== null;
    if (present) {
      return obj || true;
    } else {
      return returnIfNotPresent;
    }
  };

  Types.functionName = functionName = function(f) {
    var matched;
    return f.name || ((matched = ("" + f).match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function";
  };

  Types.objectName = objectName = function(obj) {
    var a, name, ref1;
    if (!obj) {
      return "" + obj;
    } else if (a = typeof obj.getNamespacePath === "function" ? obj.getNamespacePath() : void 0) {
      return a;
    } else if (a = obj.classPathName) {
      return a;
    } else if (obj.constructor === Object) {
      return "Object";
    } else if (isFunction(obj)) {
      return functionName(obj);
    } else if (isString(name = (ref1 = obj.constructor) != null ? ref1.name : void 0) && name.length > 0) {
      return name;
    } else if (obj instanceof Object) {
      return "(anonymous instanceof Object)";
    } else {
      return "(objectName unknown)";
    }
  };

  Types.isBrowserObject = function(obj) {
    var name;
    if (!Types.isObject(obj)) {
      return false;
    }
    name = Types.objectName(obj);
    return name.slice(0, 4) === "HTML" || name.slice(0, 22) === "CanvasRenderingContext";
  };


  /*
  IN:
    f: (value, [key]) ->
      f is called on every non-plainObject and non-plainArray reachable by traversing
      the plainObject/plainArray structure
      If f is called on a propery of a plainObject, the key for that property is also passed in.
  OUT: value
   */

  Types.deepEach = deepEach = function(v, f, key) {
    var j, k, len, subV;
    if (isPlainArray(v)) {
      for (j = 0, len = v.length; j < len; j++) {
        subV = v[j];
        deepEach(subV, f);
      }
    } else if (isPlainObject(v)) {
      for (k in v) {
        subV = v[k];
        deepEach(subV, f, k);
      }
    } else {
      f(v, key);
    }
    return v;
  };


  /*
  deepEachAll: just like deepEach except 'f' gets called on every value found including the initial value.
   */

  Types.deepEachAll = deepEachAll = function(v, f, key) {
    var j, k, len, subV;
    f(v, key);
    if (isPlainArray(v)) {
      for (j = 0, len = v.length; j < len; j++) {
        subV = v[j];
        deepEachAll(subV, f);
      }
    } else if (isPlainObject(v)) {
      for (k in v) {
        subV = v[k];
        deepEachAll(subV, f, k);
      }
    } else {

    }
    return v;
  };


  /*
  only creates a new array if the children changed
   */

  deepMapArray = function(array, mapper, options) {
    var i, j, len, p, r, res, v;
    res = null;
    for (i = j = 0, len = array.length; j < len; i = ++j) {
      v = array[i];
      r = deepMap(v, mapper, options);
      if (r !== v) {
        res || (res = array.slice());
        res[i] = r;
      }
    }
    res || (res = array);
    if (p = options != null ? options.postprocessArray : void 0) {
      return p(res);
    } else {
      return res;
    }
  };

  cloneObjectUpToKey = function(obj, k) {
    var k2, res, v;
    res = {};
    for (k2 in obj) {
      v = obj[k2];
      if (k2 === k) {
        break;
      }
      res[k2] = v;
    }
    return res;
  };

  deepMapObject = function(obj, mapper, options) {
    var k, p, r, res, v;
    res = null;
    for (k in obj) {
      v = obj[k];
      r = deepMap(v, mapper, options);
      if (r !== v || res) {
        res || (res = cloneObjectUpToKey(obj, k));
        res[k] = r;
      }
    }
    res || (res = obj);
    if (p = options != null ? options.postprocessObject : void 0) {
      return p(res);
    } else {
      return res;
    }
  };

  noopMapper = function(v) {
    return v;
  };


  /*
  Applies "f" to every -value- in a nested structure of plain arrays and objects.
  Pure functional efficient:
    If an array or object, and all its sub values, didn't change, the original array/object is reused.
  
  NOTE: deepMap only yields values to 'mapper' which are NOT plain arrays nor plain objects.
   */

  Types.deepMap = deepMap = function(v, mapper, options) {
    var arrayMapper, objectMapper;
    arrayMapper = (options != null ? options.arrays : void 0) || noopMapper;
    objectMapper = (options != null ? options.objects : void 0) || noopMapper;
    mapper || (mapper = noopMapper);
    if (isPlainArray(v)) {
      return deepMapArray(arrayMapper(v), mapper, options);
    } else if (isPlainObject(v)) {
      return deepMapObject(objectMapper(v), mapper, options);
    } else {
      return mapper(v);
    }
  };

  Types.toPlainStructure = function(o) {
    return deepMap(o, function(o) {
      if (isObject(o)) {
        if (o.toPlainStructure) {
          return o.toPlainStructure();
        } else {
          return objectName(o);
        }
      } else {
        return o;
      }
    });
  };


  /*
  similar to toPlainStructure, except all non-JSON types are converted to strings
   */

  Types.toJsonStructure = toJsonStructure = function(o) {
    return deepMap(o, function(o) {
      if (isObject(o)) {
        if (o.toJsonStructure) {
          return o.toJsonStructure();
        } else {
          return toJsonStructure(o.toPlainStructure ? o.toPlainStructure() : "" + o);
        }
      } else if (isJsonAtomicType(o)) {
        return o;
      } else {
        return "" + o;
      }
    });
  };

  Types.toPostMessageStructure = toPostMessageStructure = function(o) {
    return deepMap(o, function(o) {
      switch (o.constructor) {
        case ArrayBuffer:
        case Date:
        case RegExp:
        case Blob:
        case File:
        case FileList:
        case ImageData:
        case Boolean:
        case String:
          return o;
        default:
          if (isObject(o)) {
            if (o.toPostMessageStructure) {
              return o.toPostMessageStructure();
            } else {
              if (o.toPlainStructure) {
                return toPostMessageStructure(o.toPlainStructure());
              } else {
                return "" + o;
              }
            }
          } else {
            return "" + o;
          }
      }
    });
  };

  return Types;

})();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);

module.exports.includeInNamespace(__webpack_require__(63)).addModules({
  ArrayCompactFlatten: __webpack_require__(14),
  Merge: __webpack_require__(35),
  StringCase: __webpack_require__(36),
  Types: __webpack_require__(6)
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);

module.exports.includeInNamespace(__webpack_require__(64)).addModules({
  FormattedInspect: __webpack_require__(40),
  InspectedObjectLiteral: __webpack_require__(15),
  InspectedObjects: __webpack_require__(26),
  Inspector: __webpack_require__(27),
  Inspector2: __webpack_require__(69),
  PlainObjects: __webpack_require__(43)
});

__webpack_require__(41);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, capitalize, isFunction, isPlainObject, isString, ref;

capitalize = __webpack_require__(1).capitalize;

ref = __webpack_require__(0), isFunction = ref.isFunction, isString = ref.isString, isPlainObject = ref.isPlainObject;

module.exports = MinimalBaseObject = (function() {
  var addGetter, addGetters, addProperties, addSetter, addSetters, defProperties, defProperty, propGetterName, propInternalName, propListStringToArray, propSetterName;

  function MinimalBaseObject() {}

  MinimalBaseObject.propInternalName = propInternalName = function(prop) {
    return "_" + prop;
  };


  /*
  IN: arguments is a list of strings or objects
    strings: are just the names of the properties
    objects: map from prop names to getter/setter functions
   */

  MinimalBaseObject.getter = function() {
    return defProperties(this.prototype, arguments, true, false);
  };

  MinimalBaseObject.setter = function() {
    return defProperties(this.prototype, arguments, false, true);
  };

  MinimalBaseObject.addGetter = function(prop, getter) {
    return this._addGetter(this.prototype, prop, getter);
  };

  MinimalBaseObject.addSetter = function(prop, setter) {
    return this._addSetter(this.prototype, prop, setter);
  };

  MinimalBaseObject.addClassGetter = function(prop, getter) {
    return this._addGetter(this, prop, getter);
  };

  MinimalBaseObject.addClassSetter = function(prop, setter) {
    return this._addSetter(this, prop, setter);
  };


  /*
  IN: arguments is a list of strings or objects
    strings: are just the names of the properties
    objects: map from prop names to initializers
   */

  MinimalBaseObject.property = function() {
    return defProperties(this.prototype, arguments, true, true);
  };

  MinimalBaseObject.classGetter = function() {
    return defProperties(this, arguments, true, false);
  };

  MinimalBaseObject.classSetter = function() {
    return defProperties(this, arguments, false, true);
  };

  MinimalBaseObject.classProperty = function() {
    return defProperties(this, arguments, true, true);
  };

  MinimalBaseObject._propGetterName = propGetterName = function(prop) {
    return "get" + capitalize(prop);
  };

  MinimalBaseObject._propSetterName = propSetterName = function(prop) {
    return "set" + capitalize(prop);
  };

  MinimalBaseObject._addGetter = addGetter = function(obj, prop, getter) {
    obj[propGetterName(prop)] = getter;
    if (!isFunction(getter)) {
      getter = (function() {
        return getter;
      });
    }
    Object.defineProperty(obj, prop, {
      get: getter,
      configurable: true
    });
    return prop;
  };

  MinimalBaseObject._addSetter = addSetter = function(obj, prop, setter) {
    obj[propSetterName(prop)] = setter;
    Object.defineProperty(obj, prop, {
      set: setter,
      configurable: true
    });
    return prop;
  };

  MinimalBaseObject._addGetters = addGetters = function(obj, map) {
    var getter, prop;
    for (prop in map) {
      getter = map[prop];
      addGetter(obj, prop, getter);
    }
    return map;
  };

  MinimalBaseObject._addSetters = addSetters = function(obj, map) {
    var prop, setter;
    for (prop in map) {
      setter = map[prop];
      addSetter(obj, prop, setter);
    }
    return map;
  };

  MinimalBaseObject._addProperties = addProperties = function(obj, map) {
    var initializer, prop;
    for (prop in map) {
      initializer = map[prop];
      defProperty(obj, prop, true, true, initializer);
    }
    return map;
  };

  MinimalBaseObject._defProperty = defProperty = function(obj, prop, defineGetter, defineSetter, initializer) {
    var propName;
    propName = propInternalName(prop);
    if (defineGetter) {
      addGetter(obj, prop, obj[propGetterName(prop)] = isFunction(initializer) ? function() {
        if (this[propName] != null) {
          return this[propName];
        } else {
          return this[propName] = initializer();
        }
      } : initializer != null ? function() {
        if (this[propName] != null) {
          return this[propName];
        } else {
          return this[propName] = initializer;
        }
      } : function() {
        return this[propName];
      });
    }
    if (defineSetter) {
      return addSetter(obj, prop, function(v) {
        return this[propName] = v;
      });
    }
  };

  MinimalBaseObject._defProperties = defProperties = function(obj, props, defineGetter, defineSetter) {
    var i, len, prop, propFromString, propMap, results;
    results = [];
    for (i = 0, len = props.length; i < len; i++) {
      prop = props[i];
      if (isPlainObject(propMap = prop)) {
        if (defineGetter && defineSetter) {
          results.push(addProperties(obj, propMap));
        } else if (defineGetter) {
          results.push(addGetters(obj, propMap));
        } else {
          results.push(addSetters(obj, propMap));
        }
      } else if (isString(prop)) {
        results.push((function() {
          var j, len1, ref1, results1;
          ref1 = propListStringToArray(prop);
          results1 = [];
          for (j = 0, len1 = ref1.length; j < len1; j++) {
            propFromString = ref1[j];
            results1.push(defProperty(obj, propFromString, defineGetter, defineSetter, null));
          }
          return results1;
        })());
      } else {
        throw new Error("invalid value. Expected string or plain-object:", prop);
      }
    }
    return results;
  };

  MinimalBaseObject._propListStringToArray = propListStringToArray = function(propList) {
    return propList.match(/[_a-z][_a-z0-9]*/gi);
  };

  return MinimalBaseObject;

})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var FoundationMath, StringExtensions, Types, compactFlatten, escapedDoubleQuoteRegex, floor, intRand, isArray, isBrowser, isNumber, isPlainObject, isString, wordsRegex;

FoundationMath = __webpack_require__(7);

Types = __webpack_require__(0);

wordsRegex = __webpack_require__(9).wordsRegex;

intRand = FoundationMath.intRand;

isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray;

compactFlatten = __webpack_require__(1).compactFlatten;

isBrowser = __webpack_require__(12).isBrowser;

escapedDoubleQuoteRegex = /[\\]["]/g;

floor = Math.floor;

module.exports = StringExtensions = (function() {
  var base62Characters, consistentJsonStringify, crypto, escapeDoubleQuoteJavascriptString, escapeJavascriptString, getPadding, jsStringifyR, pluralize, randomString, repeat, standardIndent;

  function StringExtensions() {}


  /*
  IN: an array and optionally a string, in any order
    joiner: the string
    array-to-flatten-and-join: the array
  
  OUT:
    compactFlatten(array).join joiner || ""
  
  NOTE: this uses Ruby's default value for joining - the empty array, not ',' which is JavaScripts
   */

  StringExtensions.compactFlattenJoin = function(a, b) {
    var array, joiner;
    array = null;
    joiner = isString(a) ? (array = b, a) : (array = a, b || "");
    return compactFlatten(array).join(joiner);
  };

  StringExtensions.base62Characters = base62Characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  StringExtensions.randomString = randomString = function(length, chars, randomNumbers) {
    var charsLength, i, result;
    if (length == null) {
      length = 32;
    }
    if (chars == null) {
      chars = base62Characters;
    }
    result = '';
    charsLength = chars.length;
    if (randomNumbers) {
      return ((function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = length; j < ref; i = j += 1) {
          results.push(chars[randomNumbers[i] % charsLength]);
        }
        return results;
      })()).join('');
    } else {
      return ((function() {
        var j, ref, results;
        results = [];
        for (i = j = 0, ref = length; j < ref; i = j += 1) {
          results.push(chars[intRand(charsLength)]);
        }
        return results;
      })()).join('');
    }
  };

  StringExtensions.cryptoRandomString = isBrowser ? ((crypto = global.crypto, global), crypto ? function(l, c) {
    return randomString(l, c, crypto.getRandomValues(new Uint8Array(l)));
  } : (console.warn("window.crypto not available, using standard random for cryptoRandomString"), function(l, c) {
    return randomString(l, c);
  })) : (crypto = __webpack_require__(82), function(l, c) {
    return randomString(l, c, crypto.randomBytes(l));
  });

  StringExtensions.randomBase62Character = function() {
    return base62Characters[intRand(62)];
  };


  /*
  should really use: https://www.npmjs.org/package/pluralize
    pluralize "food" >> "foods"
    pluralize 1, "food" -> "1 food"
    pluralize 0, "food" -> "0 foods"
    pluralize 2, "food" -> "2 foods"
    pluralize 3, "person", people" -> "2 people"
   */

  StringExtensions.pluralize = pluralize = function(a, b, pluralForm) {
    if (isNumber(a)) {
      return a + " " + (a === 1 ? b : pluralForm || pluralize(b));
    } else if (isString(a || (a = b))) {
      return a + "s";
    }
  };

  StringExtensions.replaceLast = function(str, find, replaceWith) {
    var index;
    index = str.lastIndexOf(find);
    if (index >= 0) {
      return str.substring(0, index) + replaceWith + str.substring(index + find.length);
    } else {
      return str.toString();
    }
  };

  StringExtensions.getPadding = getPadding = function(length, padding) {
    var i, j, out, ref;
    if (padding == null) {
      padding = " ";
    }
    out = "";
    for (i = j = 0, ref = length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      out += padding;
    }
    return out;
  };

  StringExtensions.pad = function(str, length, padding, alignRight) {
    var exactPadding;
    str = String(str);
    if (str.length >= length) {
      return str;
    }
    exactPadding = getPadding(Math.max(length - str.length, 0), padding);
    if (alignRight) {
      return exactPadding + str;
    } else {
      return str + exactPadding;
    }
  };

  StringExtensions.escapeDoubleQuoteJavascriptString = escapeDoubleQuoteJavascriptString = function(str) {
    var s;
    s = String(str).replace(/[\\"]/g, "\\$&").replace(/[\0\b\f\n\r\t\v\u2028\u2029]/g, function(x) {
      switch (x) {
        case '\0':
          return "\\0";
        case '\b':
          return "\\b";
        case '\f':
          return "\\f";
        case '\n':
          return "\\n";
        case '\r':
          return "\\r";
        case '\t':
          return "\\t";
        case '\v':
          return "\\v";
        case '\u2028':
          return "\\u2028";
        case '\u2029':
          return "\\u2029";
      }
    });
    return s = '"' + s + '"';
  };


  /*
  SBD for a while I only had JSON.stringify here, but I hate seeing: "I said, \"hello.\""
  when I could be seeing: 'I said, "hello."'
  
  Is this going to break anything? I figure if you really need "" only, just use stringify.
   */

  StringExtensions.escapeJavascriptString = escapeJavascriptString = function(str) {
    var s;
    s = JSON.stringify(str);
    if (s.match(escapedDoubleQuoteRegex)) {
      return "'" + (s.replace(escapedDoubleQuoteRegex, '"').replace(/'/g, "\\'").slice(1, -1)) + "'";
    } else {
      return s;
    }
  };

  StringExtensions.allIndexes = function(str, regex) {
    var indexes, lastIndex, result;
    indexes = [];
    if (!((regex instanceof RegExp) && regex.global)) {
      throw new Error("regex must be a global RegExp");
    }
    regex.lastIndex = 0;
    while (result = regex.exec(str)) {
      indexes.push(result.index);
      lastIndex = result;
    }
    return indexes;
  };

  StringExtensions.repeat = repeat = " ".repeat ? function(str, times) {
    return str.repeat(times);
  } : function(str, count) {
    var result;
    count === floor(count);
    result = '';
    if (count > 0 && str.length > 0) {
      while (true) {
        if ((count & 1) === 1) {
          result += str;
        }
        count >>>= 1;
        if (count === 0) {
          break;
        }
        str += str;
      }
    }
    return result;
  };

  StringExtensions.rightAlign = function(str, width) {
    if (str.length >= width) {
      return str;
    } else {
      return repeat(" ", width - str.length) + str;
    }
  };

  StringExtensions.eachMatch = function(str, regex, f) {
    var result;
    regex.lastIndex = 0;
    while (result = regex.exec(str)) {
      f(result);
    }
    return null;
  };

  standardIndent = {
    joiner: ', ',
    openObject: '{',
    openArray: '[',
    closeObject: "}",
    closeArray: "]"
  };

  StringExtensions.jsStringify = function(obj) {
    return jsStringifyR(obj, "");
  };

  jsStringifyR = function(o, s) {
    var el, first, j, k, len, v;
    if (isPlainObject(o)) {
      s += "{";
      first = true;
      for (k in o) {
        v = o[k];
        if (first) {
          first = false;
        } else {
          s += ",";
        }
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(k)) {
          s += k;
        } else {
          s += JSON.stringify(k);
        }
        s += ":";
        s = jsStringifyR(v, s);
      }
      return s + "}";
    } else if (isArray(o)) {
      s += "[";
      first = true;
      for (j = 0, len = o.length; j < len; j++) {
        el = o[j];
        if (first) {
          first = false;
        } else {
          s += ",";
        }
        s = jsStringifyR(el, s);
      }
      return s + "]";
    } else {
      return s + JSON.stringify(o);
    }
  };

  StringExtensions.consistentJsonStringify = consistentJsonStringify = function(object, indent) {
    var closeArray, closeObject, error, indentObject, joiner, k, lastTotalIndent, openArray, openObject, out, totalIndent, v;
    return out = (function() {
      var ref;
      if (object === false || object === true || object === null || isNumber(object)) {
        return "" + object;
      } else if (isString(object)) {
        return JSON.stringify(object);
      } else {
        indentObject = indent ? typeof indent === "string" ? {
          joiner: ",\n" + indent,
          openObject: "{\n" + indent,
          openArray: "[\n" + indent,
          closeObject: "\n}",
          closeArray: "\n]",
          totalIndent: indent,
          indent: indent
        } : {
          totalIndent: totalIndent = indent.indent + (lastTotalIndent = indent.totalIndent),
          joiner: ",\n" + totalIndent,
          openObject: "{\n" + totalIndent,
          openArray: "[\n" + totalIndent,
          closeObject: "\n" + lastTotalIndent + "}",
          closeArray: "\n" + lastTotalIndent + "]",
          indent: indent.indent
        } : void 0;
        ref = indentObject || standardIndent, joiner = ref.joiner, openObject = ref.openObject, openArray = ref.openArray, closeObject = ref.closeObject, closeArray = ref.closeArray;
        if (isPlainObject(object)) {
          return openObject + ((function() {
            var j, len, ref1, results;
            ref1 = (Object.keys(object)).sort();
            results = [];
            for (j = 0, len = ref1.length; j < len; j++) {
              k = ref1[j];
              if (object[k] !== void 0) {
                results.push(JSON.stringify(k) + ": " + consistentJsonStringify(object[k], indentObject));
              }
            }
            return results;
          })()).join(joiner) + closeObject;
        } else if (isArray(object)) {
          return openArray + ((function() {
            var j, len, results;
            results = [];
            for (j = 0, len = object.length; j < len; j++) {
              v = object[j];
              results.push(consistentJsonStringify(v, indentObject));
            }
            return results;
          })()).join(joiner) + closeArray;
        } else {
          Neptine.Art.StandardLib.log.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
          throw new Error(error);
        }
      }
    })();
  };

  StringExtensions.splitRuns = function(str) {
    var ch, chCount, i, j, lastCh, ref, result;
    if (str.length === 0) {
      return [];
    }
    lastCh = str[0];
    chCount = 1;
    result = [];
    for (i = j = 1, ref = str.length; j < ref; i = j += 1) {
      ch = str[i];
      if (ch === lastCh) {
        chCount++;
      } else {
        result.push([lastCh, chCount]);
        chCount = 1;
      }
      lastCh = ch;
    }
    result.push([lastCh, chCount]);
    return result;
  };

  StringExtensions.eachRunAsCharCodes = function(str, f) {
    var ch, chCount, i, j, lastCh, ref;
    lastCh = str.charCodeAt(0);
    chCount = 1;
    for (i = j = 1, ref = str.length; j < ref; i = j += 1) {
      ch = str.charCodeAt(i);
      if (ch === lastCh) {
        chCount++;
      } else {
        f(lastCh, chCount);
        chCount = 1;
      }
      lastCh = ch;
    }
    f(lastCh, chCount);
    return null;
  };


  /*
  TODO: I think this can be generalized to cover most all ellipsies and word-wrap scenarios:
    a) have an options object with options:
      maxLength: number         # similar to current maxLength
      minLength: number         # currently implied to be maxLength / 2, in additional customizable, it would also be optional
      brokenWordEllipsis: "…"   # used when only part of a word is included
      moreWordsEllipsis: "…"    # used when there are more words, but the last word is whole
      wordLengthFunction: (string) -> string.length
         * can be replaced with, say, the font pixel-width for a string
         * in this way, this function can be used by text-layout
         * minLength and maxLength would then be in pixels
      breakWords: false         # currently, this is effectively true - will break the last word on line in most situations
      breakOnlyWord: true       # even if breakWords is false, if this is the only word on the line and it doesn't fit, should we break it?
                                 * should this even be an option?
       * future:
      wordBreakFunction: (word, maxLength) -> shorterWord
         * given a word and the maximum length of that word, returns
         * a word <= maxLength according to wordLengthFunction
  
    b) Use cases
      - TextLayout - uses pixels for length rather than characters
      - Art.Engine.Element 'flow' layout
        - if the input was an array of "words" and
        - wordLengthFunction returns the Element's width...
        I think this works. We'd need a way to handle margins though. I think this works:
          spaceLength: (leftWord, rightWord) -> 1
      - Shortend user display names:
        Options:
          wordBreakFunction: (word, maxLength) -> word[0]
          brokenWordEllipsis: "." or ""
        Example Output:
          "Shane Delamore", 10 > "Shane D." or
          "Shane Delamore", 10 > "Shane D"
        Or, just leave breakwords: false and get:
          "Shane Delamore", 10 > "Shane"
  
    c) returns both the output string and the "string remaining" - everything not included
    d) alternate input: an array of strings already broken up by words - the "remainging" return value would then also be an array of "words"
      (this would be for efficiency when doing multi-line layout)
  
  Right now, it works as follows:
  The output string is guaranteed to be:
    <= maxLength
    >= maxLength / 2 in almost all secenarios as long as inputString is >= maxLength / 2
   */

  StringExtensions.humanFriendlyShorten = function(inputString, maxLength) {
    var j, len, minLength, part, string, stringParts;
    if (!(maxLength > 0)) {
      throw new error("maxLength must be > 0");
    }
    inputString = inputString.trim();
    if (!(inputString.length > maxLength)) {
      return inputString;
    }
    minLength = maxLength / 2;
    stringParts = inputString.split(/\s+/);
    string = "";
    for (j = 0, len = stringParts.length; j < len; j++) {
      part = stringParts[j];
      if (string.length === 0) {
        string = part;
      } else if ((string.length < minLength) || string.length + part.length + 2 <= maxLength) {
        string += " " + part;
      } else {
        break;
      }
    }
    if (string.length > maxLength) {
      string = string.slice(0, maxLength - 1).trim();
    }
    return string + "…";
  };

  StringExtensions.stripTrailingWhitespace = function(a) {
    return a.split(/[ ]*\n/).join("\n").split(/[ ]*$/)[0].replace(/\n+$/, '');
  };

  return StringExtensions;

})();


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var CommonJs, isClass, isFunction, ref;

ref = __webpack_require__(0), isClass = ref.isClass, isFunction = ref.isFunction;

module.exports = CommonJs = (function() {
  var definingModule;

  function CommonJs() {}

  definingModule = null;

  CommonJs.getModuleBeingDefined = function() {
    return definingModule;
  };


  /*
  IN:
    defineFunciton ||
   */

  CommonJs.defineModule = function(_module, a) {
    var lastModule, mod, result;
    lastModule = definingModule;
    definingModule = _module;
    mod = isFunction(a) ? isClass(a) ? a : a() : a;
    result = _module.exports = (mod != null ? typeof mod.createWithPostCreate === "function" ? mod.createWithPostCreate(mod) : void 0 : void 0) || mod;
    definingModule = lastModule;
    return result;
  };

  return CommonJs;

})();


/***/ }),
/* 6 */
/***/ (function(module, exports) {


/*
Set: global.ArtStandardLibMultipleContextTypeSupport = true
Before the first time you require this file if you need to be able to test objects
from multiple contexts.

When do you need this?
  - when working with iFrames
  - when working with Node's 'repl' or 'vm'

What is the differences?
  With: slower, but other-wise the same
  Without: plain-arrays and plain-objects from other contexts
    are not detected with isArray, isPlainArray, isPlainObject
 */
var ArtStandardLibMultipleContextTypeSupport, Types;

ArtStandardLibMultipleContextTypeSupport = global.ArtStandardLibMultipleContextTypeSupport;

module.exports = Types = (function() {
  var _functionsPrototype, hasOwnProperties, hasProperties, isArray, isClass, isDirectPrototypeOf, isExtendedClass, isFunction, isJsonAtomicType, isNonNegativeInt, isNumber, isObject, isPlainObject, isString;

  function Types() {}

  Types.isPromise = function(obj) {
    return (obj != null) && isFunction(obj.then) && !isFunction(obj);
  };

  Types.isRegExp = ArtStandardLibMultipleContextTypeSupport ? function(obj) {
    return obj.constructor.name === "RegExp";
  } : function(obj) {
    return obj.constructor === RegExp;
  };

  Types.isNumber = isNumber = function(obj) {
    return typeof obj === "number";
  };

  Types.prototype.isNonNegativeInt = function(x) {
    return ((x | 0) === x) && x >= 0;
  };

  Types.isDate = function(obj) {
    return obj && obj.constructor === Date;
  };

  Types.isString = isString = function(obj) {
    return typeof obj === "string";
  };

  Types.isFunction = isFunction = function(obj) {
    return typeof obj === "function";
  };

  Types.isEmptyObject = function(obj) {
    return Object.keys(obj).length === 0;
  };

  Types.isBoolean = function(obj) {
    return obj === true || obj === false;
  };

  _functionsPrototype = Object.getPrototypeOf(function() {});

  Types.isClass = isClass = function(obj) {
    var prototype;
    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || ((typeof (prototype = Object.getPrototypeOf(obj)) === "function") && prototype !== _functionsPrototype) || (hasOwnProperties(obj)) || (obj.prototype && hasProperties(obj.prototype))));
  };

  Types.isExtendedClass = isExtendedClass = function(obj) {
    var prototype;
    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || ((typeof (prototype = Object.getPrototypeOf(obj)) === "function") && prototype !== _functionsPrototype)));
  };

  Types.isArrayUniversal = Array.isArray;

  Types.isArray = isArray = ArtStandardLibMultipleContextTypeSupport ? Types.isArrayUniversal : function(o) {
    return (o != null) && o.constructor === Array;
  };

  Types.isPlainArray = isArray;

  Types.isNonNegativeInt = isNonNegativeInt = function(x) {
    return (x | 0 === x) && x >= 0;
  };

  Types.isArrayIterable = function(source) {
    return !!(source && isNonNegativeInt(source.length));
  };

  Types.isJsonAtomicType = isJsonAtomicType = function(a) {
    return isString(a) || isNumber(a) || a === true || a === false || a === null;
  };

  Types.isJsonType = function(a) {
    return isJsonAtomicType(a) || isPlainObject(a) || isArray(a);
  };

  Types.isObject = isObject = function(obj) {
    return !!obj && typeof obj === "object" && !isArray(obj);
  };

  Types.isDirectPrototypeOf = isDirectPrototypeOf = function(o, prototype) {
    return !isFunction(o) && prototype.constructor === o.constructor;
  };


  /*
  NOTE:
    getSuper doesn't work in CoffeeScript classes objects, but it does on ES6 classes.
    getSuper does work on CoffeeScript class instance objects.
  
  All about getSuper in ES6 land:
  
    class A {}
    class B extends A {}
    class C extends B {}
  
    a = new A
    b = new B
    c = new C
  
    getSuper(B) == A
    getSuper(C) == B
  
    getSuper(A.prototype) == Object.prototype
    getSuper(B.prototype) == A.prototype
    getSuper(C.prototype) == B.prototype
  
    getSuper(b) == A.prototype
    getSuper(c) == B.prototype
  
  prototype map:
  
  KEY:
    <->
       <-- .constructor
       --> .prototype
    ^  Object.getPrototypeOf
  
  MAP:
    A <-> aPrototype
  
    ^     ^     ^
    |     |     a
    |     |
  
    B <-> bPrototype
  
    ^     ^     ^
    |     |     b
    |     |
  
    C <-> cPrototype
  
                ^
                c
  
  Definition of super:
  
    if instance then prototype's prototype
    else prototype
   */

  Types.getSuper = function(o) {
    var _super;
    if (!((typeof o === "object") || (typeof o === "function"))) {
      throw new Error("getSuper expecting an object");
    }
    _super = Object.getPrototypeOf(o);
    if (isDirectPrototypeOf(o, _super)) {
      _super = Object.getPrototypeOf(_super);
    }
    return _super;
  };

  Types.isPlainObjectUniversal = function(v) {
    return (v != null) && null === Object.getPrototypeOf(Object.getPrototypeOf(v));
  };

  Types.isPlainObject = isPlainObject = ArtStandardLibMultipleContextTypeSupport ? Types.isPlainObjectUniversal : function(v) {
    return (v != null) && v.constructor === Object;
  };

  Types.hasProperties = hasProperties = function(o) {
    var k;
    if (o == null) {
      return false;
    }
    for (k in o) {
      return true;
    }
    return false;
  };

  Types.hasOwnProperties = hasOwnProperties = function(o) {
    var k;
    if (o == null) {
      return false;
    }
    for (k in o) {
      if (o.hasOwnProperty(k)) {
        return true;
      }
    }
    return false;
  };

  return Types;

})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var MathExtensions, RegExpExtensions, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFlaot32Precision, max, min, numberRegexp, pow, random, ref, round;

RegExpExtensions = __webpack_require__(9);

numberRegexp = RegExpExtensions.numberRegexp;

float64Precision = 0.0000000001;

float32Precision = 0.0000001;

inverseFloat64Precision = 1 / float64Precision;

inverstFlaot32Precision = 1 / float32Precision;

ref = self.Math, abs = ref.abs, min = ref.min, max = ref.max, ceil = ref.ceil, floor = ref.floor, round = ref.round, random = ref.random, pow = ref.pow;

module.exports = MathExtensions = (function() {
  var bound;

  function MathExtensions() {}

  MathExtensions.nearInfinity = pow(10, 100);

  MathExtensions.nearInfinityResult = pow(10, 50);

  MathExtensions.float32Precision = float32Precision;

  MathExtensions.float64Precision = float64Precision;

  MathExtensions.modulo = function(a, b) {
    var r;
    r = a % b;
    if (r < 0) {
      return r + b;
    } else {
      return r;
    }
  };

  MathExtensions.stringToNumberArray = function(string) {
    var a, i, j, len, match, v;
    a = string.split(",");
    for (i = j = 0, len = a.length; j < len; i = ++j) {
      v = a[i];
      match = v.match(numberRegexp);
      a[i] = match != null ? match[0] - 0 : 0;
    }
    return a;
  };

  MathExtensions.minMagnitude = function(a, magnitude) {
    if (a < 0) {
      return min(a, -magnitude);
    } else {
      return max(a, magnitude);
    }
  };

  MathExtensions.maxMagnitude = function(a, magnitude) {
    return bound(-magnitude, a, magnitude);
  };

  MathExtensions.maxChange = function(newValue, oldValue, maxChangeV) {
    return bound(oldValue - maxChangeV, newValue, oldValue + maxChangeV);
  };

  MathExtensions.bound = bound = function(a, b, c) {
    if (isNaN(b)) {
      return a;
    }
    if (b < a) {
      return a;
    } else if (b > c) {
      return c;
    } else {
      return b;
    }
  };

  MathExtensions.absGt = function(a, b) {
    return abs(a) > abs(b);
  };

  MathExtensions.absLt = function(a, b) {
    return abs(a) < abs(b);
  };

  MathExtensions.absGte = function(a, b) {
    return abs(a) >= abs(b);
  };

  MathExtensions.absLte = function(a, b) {
    return abs(a) <= abs(b);
  };

  MathExtensions.abs = abs;

  MathExtensions.min = min;

  MathExtensions.max = max;

  MathExtensions.round = round;

  MathExtensions.ceil = function(v, m) {
    if (m == null) {
      m = 1;
    }
    return ceil(v / m) * m;
  };

  MathExtensions.floor = function(v, m) {
    if (m == null) {
      m = 1;
    }
    return floor(v / m) * m;
  };

  MathExtensions.round = function(v, m) {
    if (m == null) {
      m = 1;
    }
    return round(v / m) * m;
  };

  MathExtensions.simplifyNum = function(num) {
    return round(num * inverseFloat64Precision) * float64Precision;
  };

  MathExtensions.floatEq = function(n1, n2) {
    return n1 === n2 || float64Precision > abs(n1 - n2);
  };

  MathExtensions.float32Eq = function(n1, n2) {
    return n1 === n2 || float32Precision > abs(n1 - n2);
  };

  MathExtensions.floatEq0 = function(n) {
    return n === 0 || float64Precision > abs(n);
  };

  MathExtensions.float32Eq0 = function(n) {
    return n === 0 || float32Precision > abs(n);
  };

  MathExtensions.floatTrue0 = function(n) {
    if (n === 0 || float64Precision > abs(n)) {
      return 0;
    } else {
      return n;
    }
  };

  MathExtensions.float32True0 = function(n) {
    if (n === 0 || float32Precision > abs(n)) {
      return 0;
    } else {
      return n;
    }
  };

  MathExtensions.random = random;

  MathExtensions.intRand = function(max) {
    return random() * max | 0;
  };

  MathExtensions.iPart = function(v) {
    return v - (v % 1);
  };

  MathExtensions.fPart = function(v) {
    return v % 1;
  };

  MathExtensions.commaize = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  MathExtensions.cyclingSequenceFunction = function(sequence) {
    var sequencePos;
    sequencePos = sequence.length;
    return function() {
      sequencePos++;
      if (sequencePos >= sequence.length) {
        sequencePos = 0;
      }
      return sequence[sequencePos];
    };
  };

  return MathExtensions;

})();


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BlueBirdPromise, ErrorWithInfo, Promise, deepEach, deepMap, defineModule, getEnv, isFunction, isPlainObject, isPromise, promiseDebug, ref;

Promise = BlueBirdPromise = __webpack_require__(55);

ref = __webpack_require__(0), deepMap = ref.deepMap, deepEach = ref.deepEach, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

defineModule = __webpack_require__(5).defineModule;

getEnv = __webpack_require__(12).getEnv;

if (promiseDebug = getEnv().artPromiseDebug) {
  console.log("Art.StandardLib.Promise: BlueBirdPromise debug ENABLED");
}

BlueBirdPromise.config({
  warnings: promiseDebug,
  longStackTraces: promiseDebug,
  cancellation: promiseDebug,
  monitoring: promiseDebug
});

isPromise = __webpack_require__(6).isPromise;

ErrorWithInfo = __webpack_require__(38);


/*
ArtPromise extends ES6 Promises in the following ways:

- constructing a promise with no parameters is allowed
- promise.resolve and promise.reject are supported as
  alternative ways to resolve or reject a promise

If native promises are supported, they are used,
otherwise a polyfill is used.

TODO:
  ES6 says Promises are designed to be extensible:
  http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects

  If I properly extend Promise, will my new methods be available on all promise objects... ???
    At least all promises chained off of one created using my Promise class... ???

  But I had problems doing that. Maybe it's how CoffeeScript extends things?

TODO:
  I want a way to do 'then' and 'catch' without effecting any following 'thens' or 'caches'

  It's easy to implement, but what to call it? Leaning towards tapThen. If I had Ruby's 'tap', then
  I could do this effectively with:

    .tap (a) -> a.then ->
    but
    .tapThen ->
    is even nicer

  Will it be available on returned promises?
    (see ES6 Promise extension above)

  tapThen: (successF, failF) ->
    @then successF, failF
    @ # return the current promise, not the one returned from the then-call above
 */

defineModule(module, function() {
  var ArtPromise, k, v;
  ArtPromise = (function() {
    var deepAll, noop;

    function ArtPromise() {}

    ArtPromise.isPromise = isPromise;

    ArtPromise.testPromise = function(promise) {
      promise.then(function(v) {
        return console.log("promise.resolve", v);
      });
      return promise["catch"](function(v) {
        return console.log("promise.reject", v);
      });
    };

    ArtPromise.mapAll = function(map) {
      var key, keys;
      keys = Object.keys(map);
      return Promise.all((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = keys.length; j < len; j++) {
          key = keys[j];
          results.push(map[key]);
        }
        return results;
      })()).then(function(values) {
        var i, j, key, len, out;
        out = {};
        for (i = j = 0, len = keys.length; j < len; i = ++j) {
          key = keys[i];
          out[key] = values[i];
        }
        return out;
      });
    };

    ArtPromise.containsPromises = function(plainStructure) {
      var containsPromises;
      containsPromises = false;
      deepEach(plainStructure, function(v) {
        return containsPromises || (containsPromises = isPromise(v));
      });
      return containsPromises;
    };


    /*
    For use with Node-style callbacks:
      IN: (error, data) ->
        error: null or set if there was an error
        data: set if error is null
    
    Example:
      Promise.withCallback (callback) ->
        doAsyncStuff -> callback()
     */

    ArtPromise.withCallback = function(startPromiseBodyFunction) {
      return new BlueBirdPromise(function(resolve, reject) {
        var callback;
        callback = function(err, data) {
          if (err) {
            return reject(new Error(err));
          }
          return resolve(data);
        };
        return startPromiseBodyFunction(callback);
      });
    };

    ArtPromise.newExternallyResolvable = function() {
      var out, p;
      out = {};
      p = new BlueBirdPromise(function(resolve, reject) {
        out.resolve = resolve;
        return out.reject = reject;
      });
      p.resolve = out.resolve;
      p.reject = out.reject;
      return p;
    };

    noop = function(a) {
      return a;
    };

    ArtPromise.deepAll = deepAll = function(plainStructure, resolvedResultPreprocessor) {
      var promises;
      if (resolvedResultPreprocessor == null) {
        resolvedResultPreprocessor = noop;
      }
      promises = [];
      deepEach(plainStructure, function(v) {
        if (isPromise(v)) {
          return promises.push(v);
        }
      });
      return Promise.all(promises).then(function(resolved) {
        var i;
        i = 0;
        return deepMap(plainStructure, function(v) {
          if (isPromise(v)) {
            return resolvedResultPreprocessor(resolved[i++]);
          } else {
            return v;
          }
        });
      });
    };

    ArtPromise.deepResolve = deepAll;


    /*
    Serializer makes it easy to ensure promise-returning functions are invoked in order, after each
    promise is resolved.
    
    USAGE:
    
       * EXAMPLE 1: Basic - not too different from normal Promise sequences
      serializer = new ArtPromise.Serializer
      serializer.then -> doA()
    
       * then execute sometime later, possbly asynchronously:
      serializer.then -> doB()
    
       * then execute sometime later, possbly asynchronously:
      serializer.then (doBResult) ->
         * doA and doB have completed and any returning promises resolved
         * the result of the last 'then' is passed in
    
       * EXAMPLE 2: apply the same async function serially to each element in list
       * - list's order is preserved
       * - each invocation waits for the previous one to complete
      serializer = new ArtPromise.Serializer
      list.forEach serializer.serialize f = (element) -> # do something with element, possibly returning a promise
      serializer.then (lastFResult) ->
         * do something after the last invocation of f completes
         * the result of the last invocation of 'f' is passed in
    
       * EXAMPLE 3: mix multiple serialized functions and manual @then invocations
       * - invocation order is perserved
      serializer = new ArtPromise.Serializer
      serializedA = serializer.serialize aFunction
      serializedB = serializer.serialize bFunction
    
      serializedB()
      serializer.then -> @cFunction()
      serializedB()
      serializedA()
      serializedB()
    
      serializer.then (lastBFunctionResult) ->
         * this is invoked AFTER:
         * evaluating, in order, waiting for any promises:
         *   bFunction, cFunction, bFunction, aFunction, bFunction
     */

    ArtPromise.Serializer = (function() {
      function Serializer() {
        this._lastPromise = BlueBirdPromise.resolve();
      }


      /*
      Returns a new function, serializedF, that acts just like 'f'
        - f is forced to be async:
          - if f doesn't return a promise, a promise wrapping f's result is returned
        - invoking serializedF queues f in this serializer instance's sequence via @then
      IN: any function with any signature
      OUT: (f's signature) -> promise.then (fResult) ->
      
      Example with Comparison:
      
         * all asyncActionReturningPromise(element)s get called immediately
         * and may complete randomly at some later event
        myArray.forEach (element) ->
          asyncActionReturningPromise element
      
         * VS
      
         * asyncActionReturningPromise(element) only gets called
         * after the previous call completes.
         * If a previous call failes, the remaining calls never happen.
        serializer = new Promise.Serializer
        myArray.forEach serializer.serialize (element) ->
          asyncActionReturningPromise element
      
         * bonus, you can do things when all the promises complete:
        serializer.then =>
      
         * or if anything fails
        serializer.catch =>
      
         * VS - shortcut
      
         * Just insert "Promise.serialize" before your forEach function to ensure serial invocations.
         * However, you don't get the full functionality of the previous example.
        myArray.forEach Promise.serialize (element) ->
          asyncActionReturningPromise element
       */

      Serializer.prototype.serialize = function(f) {
        return (function(_this) {
          return function() {
            var args;
            args = arguments;
            return _this.then(function() {
              return f.apply(null, args);
            });
          };
        })(this);
      };

      Serializer.prototype.then = function(resolved, rejected) {
        return this._lastPromise = this._lastPromise.then(resolved, rejected);
      };

      Serializer.prototype["catch"] = function(rejected) {
        return this._lastPromise = this._lastPromise["catch"](rejected);
      };

      Serializer.prototype.always = function(f) {
        return this._lastPromise = this._lastPromise["catch"]((function(_this) {
          return function() {
            return null;
          };
        })(this)).then(f);
      };


      /*
      OUT: promise that resolves / rejects only when there are no more
        pending tasks queued with the serializer.
      
        .then (lastResult) ->
        .catch (lastError) ->
      
      NOTE: allDonePromise could complete, then more tasks could be queued with the serializer.
        Promises can't be resolved/rejected twice, so when the more-tasks complete, the first
        allDonePromise won't do anything.
        However, you can call allDonePromise again once the tasks are queued and get notified
        when THEY are done.
       */

      Serializer.prototype.allDonePromise = function() {
        var currentLastPromise;
        currentLastPromise = this._lastPromise;
        return currentLastPromise.then((function(_this) {
          return function(lastResult) {
            if (currentLastPromise === _this._lastPromise) {
              return lastResult;
            } else {
              return _this.allDonePromise();
            }
          };
        })(this))["catch"]((function(_this) {
          return function(lastError) {
            if (currentLastPromise === _this._lastPromise) {
              throw lastError;
            } else {
              return _this.allDonePromise();
            }
          };
        })(this));
      };

      return Serializer;

    })();


    /*
    OUT: serializedF = -> Promise.resolve f arguments...
      IN: any arguments
      EFFECT: f is invoked with arguments passed in AFTER the last invocation of serializedF completes.
      OUT: promise.then -> results from f
    
    NOTE: 'f' can return a promise, but it doesn't have to. If it does return a promise, the next
      'f' invocation will not start until and if the previous one's promise completes.
    
    USAGE:
      serializedF = Promise.serialize f = -> # do something, possibly returning a promise
      serializedF()
      serializedF()
      serializedF()
      .then (resultOfLastF)->
         * executed after f was executed and any returned promises resolved, 3 times, sequentially
    
    OR
      serializedF = Promise.serialize f = (element) -> # do something with element, possibly returning a promise
      Promise.all (serializedF item for item in list)
      .then (results) ->
         * f was excuted list.length times sequentially
         * results contains the result values from each execution, in order
     */

    ArtPromise.serialize = function(f) {
      return new ArtPromise.Serializer().serialize(f);
    };

    ArtPromise.invert = function(promise) {
      return promise.then(function(e) {
        throw new ErrorWithInfo("" + e, e);
      }, function(v) {
        return v;
      });
    };

    ArtPromise["finally"] = function(promise, action) {
      return BlueBirdPromise.resolve(promise)["finally"](action);
    };

    ArtPromise.then = BlueBirdPromise["try"];

    return ArtPromise;

  })();
  for (k in ArtPromise) {
    v = ArtPromise[k];
    BlueBirdPromise[k] || (BlueBirdPromise[k] = v);
  }
  return BlueBirdPromise;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var RegExpExtensions;

module.exports = RegExpExtensions = (function() {
  var k, lc, ref, v;

  function RegExpExtensions() {}

  RegExpExtensions.escapeRegExp = function(string) {
    var ref;
    return (ref = string != null ? typeof string.replace === "function" ? string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") : void 0 : void 0) != null ? ref : '';
  };

  RegExpExtensions.findUrlProtocolRegExp = /([\w-]+)(:\/\/)/;

  RegExpExtensions.findDomainRegExp = /localhost|[\w]+(?:-[\w]+)*(?:\.[\w]+(?:-[\w]+)*)*(?:\.[a-z]{2,20})/;

  RegExpExtensions.urlQueryParamsRegExp = /(?:[-+=&*._\w]|%[a-f\d]{2})*(?!\.)(?:[-+=&*._\w]|%[a-f\d]{2})/i;

  RegExpExtensions.findLegalUrlCharacterRegExp = /[-._~!$&'()*+,;=:@\w]|%[a-f\d]{2}/;

  RegExpExtensions.findUrlPathRegExp = RegExp("(?:\\/(?:(?:" + RegExpExtensions.findLegalUrlCharacterRegExp.source + ")*(?!\\.)(?:" + RegExpExtensions.findLegalUrlCharacterRegExp.source + "))?)*");

  RegExpExtensions.findUrlPortRegExp = /(\:)(\d+)/;

  RegExpExtensions.findUrlFragmentRegExp = RegExp("(\\#)((?:(?:\\?|" + RegExpExtensions.findLegalUrlCharacterRegExp.source + ")*(?!\\.)" + RegExpExtensions.findLegalUrlCharacterRegExp.source + "|))");

  RegExpExtensions.findEmailRegExp = /((?:[^<>\s\n"\\]|\\.)+|"(?:[^"\\]|\\.)*")@([^\s\n<>]+)/i;

  RegExpExtensions.emailRegExp = RegExp("^" + RegExpExtensions.findEmailRegExp.source + "$", "i");

  RegExpExtensions.numberRegExp = /([-]?\.[0-9]+)|([-]?[0-9]+(\.[0-9]+)?)/;

  RegExpExtensions.urlProtocolRegExp = RegExp("^" + RegExpExtensions.findUrlProtocolRegExp.source + "$", "i");

  RegExpExtensions.domainRegExp = RegExp("^" + RegExpExtensions.findDomainRegExp.source + "$", "i");

  RegExpExtensions.urlPathRegExp = RegExp("^" + RegExpExtensions.findUrlPathRegExp.source + "$", "i");

  RegExpExtensions.urlQueryRegExp = RegExp("^" + RegExpExtensions.urlQueryParamsRegExp.source + "$", "i");

  RegExpExtensions.isoDateRegExp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

  RegExpExtensions.hex16ColorRegExp = /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i;

  RegExpExtensions.hex256ColorRegExp = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;

  RegExpExtensions.rgbColorRegExp = /rgb *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *\)/;

  RegExpExtensions.rgbaColorRegExp = /rgba *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *, *(\d*\.?\d*)\)/;

  RegExpExtensions.findColorRegExp = RegExp("(" + RegExpExtensions.hex16ColorRegExp.source + ")|(" + RegExpExtensions.hex256ColorRegExp.source + ")|(" + RegExpExtensions.rgbColorRegExp.source + ")|(" + RegExpExtensions.rgbaColorRegExp.source + ")", "i");

  RegExpExtensions.colorRegExp = RegExp("^" + RegExpExtensions.findColorRegExp.source + "$");

  RegExpExtensions.wordsRegExp = /[^\s]+/g;

  RegExpExtensions.exactlyOneWordRegExp = /^[^\s]+$/;

  RegExpExtensions.findUrlOrigin = RegExp("(?:" + RegExpExtensions.findUrlProtocolRegExp.source + ")(" + RegExpExtensions.findDomainRegExp.source + ")?(?:" + RegExpExtensions.findUrlPortRegExp.source + ")?", "i");


  /*
  match OUTPUT: [url, protocol, '://', domain, ':', port, path, '?', query]
  
  USAGE:
    [__, protocol, __, domain, __, port, path, __, query, __, fragment] = str.match findUrlRegExp
  
  DESIGN NOTE:
    The reason why I included the fixed strings ('://', ':' and '?') was so that
    you can take the matchResult, alter individual elements and create a value url easily by:
  
      matchResult.slice(1).join ''
   */

  RegExpExtensions.findUrlRegExp = RegExp(RegExpExtensions.findUrlOrigin.source + "(" + RegExpExtensions.findUrlPathRegExp.source + ")?(?:(\\?)(" + RegExpExtensions.urlQueryParamsRegExp.source + ")?)?(?:" + RegExpExtensions.findUrlFragmentRegExp.source + ")?", "i");

  RegExpExtensions.findUrlWithOptionalProtocolRegExp = RegExp("(?:" + RegExpExtensions.findUrlProtocolRegExp.source + ")?(" + RegExpExtensions.findDomainRegExp.source + ")(?:" + RegExpExtensions.findUrlPortRegExp.source + ")?(" + RegExpExtensions.findUrlPathRegExp.source + ")?(?:(\\?)(" + RegExpExtensions.urlQueryParamsRegExp.source + ")?)?(?:" + RegExpExtensions.findUrlFragmentRegExp.source + ")?", "i");

  RegExpExtensions.findAllUrlsRegExp = RegExp("" + RegExpExtensions.findUrlRegExp.source, "ig");

  RegExpExtensions.findAllUrlsWithOptionalProtocolRegExp = RegExp("" + RegExpExtensions.findUrlWithOptionalProtocolRegExp.source, "ig");

  RegExpExtensions.findSourceReferenceUrlRegExp = RegExp(RegExpExtensions.findUrlOrigin.source + "(" + RegExpExtensions.findUrlPathRegExp.source + ")?(?:(\\?)(" + RegExpExtensions.urlQueryParamsRegExp.source + ")?)?(?:\\:(\\d+))?(?:\\:(\\d+))?", "i");

  RegExpExtensions.urlRegExp = RegExp("^" + RegExpExtensions.findUrlRegExp.source + "$", "i");

  RegExpExtensions.urlWithOptionalProtocolRegExp = RegExp("^" + RegExpExtensions.findUrlWithOptionalProtocolRegExp.source + "$", "i");

  ref = RegExpExtensions;
  for (k in ref) {
    v = ref[k];
    if (!(/RegExp$/.test(k))) {
      continue;
    }
    RegExpExtensions[k.replace(/RegExp/, "Regexp")] = v;
    RegExpExtensions[k.replace(/RegExp/, "Regex")] = v;
  }

  lc = function(s) {
    return s.toLocaleLowerCase();
  };

  RegExpExtensions.normalizeUrl = function(url) {
    var ref1;
    url = ((ref1 = RegExpExtensions.findUrlProtocolRegExp.exec(url)) != null ? ref1.index : void 0) === 0 ? url : "http://" + url;
    return url.replace(RegExpExtensions.findDomainRegExp, lc).replace(RegExpExtensions.findUrlProtocolRegExp, lc);
  };

  return RegExpExtensions;

})();


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var ArrayExtensions, bound, exactlyOneWordRegex, intRand, isNumber, isString, max, modulo, ref, ref1, ref2, wordsRegex,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(7), bound = ref.bound, max = ref.max, intRand = ref.intRand, modulo = ref.modulo;

ref1 = __webpack_require__(0), isNumber = ref1.isNumber, isString = ref1.isString;

ref2 = __webpack_require__(9), wordsRegex = ref2.wordsRegex, exactlyOneWordRegex = ref2.exactlyOneWordRegex;

module.exports = ArrayExtensions = (function() {
  var _moveArrayElementLargeArray, _moveArrayElementSmallArray, a, arrayWithElementMoved, arrayWithInsertedValue, basicCompareFunction, indexOfOrLength, keepAll, keepIfRubyTrue, leftOfIndex, longestCommonSubsequence, moveArrayElement, randomElement, randomSortInPlace, rightOfIndex, w;

  function ArrayExtensions() {}


  /*
  Useful compact and compactFlatten keepTester functions
   */

  ArrayExtensions.keepAll = keepAll = function() {
    return true;
  };

  ArrayExtensions.keepIfRubyTrue = keepIfRubyTrue = function(a) {
    return a !== void 0 && a !== null && a !== false;
  };

  ArrayExtensions.reverseForEach = function(array, f) {
    var p, v;
    for (p = array.length - 1; p >= 0; p += -1) {
      v = array[p];
      f(v);
    }
    return array;
  };

  ArrayExtensions.arrayToTruthMap = function(array) {
    var a, len1, p, res;
    res = {};
    for (p = 0, len1 = array.length; p < len1; p++) {
      a = array[p];
      res[a] = true;
    }
    return res;
  };

  ArrayExtensions.arrayToFalseMap = function(array) {
    var a, len1, p, res;
    res = {};
    for (p = 0, len1 = array.length; p < len1; p++) {
      a = array[p];
      res[a] = false;
    }
    return res;
  };

  ArrayExtensions.arrayAfterEach = function(array, value) {
    var len1, out, p, v;
    out = [];
    for (p = 0, len1 = array.length; p < len1; p++) {
      v = array[p];
      out.push(v);
      out.push(value);
    }
    return out;
  };

  ArrayExtensions.arrayBeforeEach = function(array, value) {
    var len1, out, p, v;
    out = [];
    for (p = 0, len1 = array.length; p < len1; p++) {
      v = array[p];
      out.push(value);
      out.push(v);
    }
    return out;
  };

  ArrayExtensions.arrayBetweenEach = function(array, value) {
    var i, len1, out, p, v;
    out = [];
    for (i = p = 0, len1 = array.length; p < len1; i = ++p) {
      v = array[i];
      if (i > 0) {
        out.push(value);
      }
      out.push(v);
    }
    return out;
  };

  ArrayExtensions.concatInto = function(array, b) {
    return array.push.apply(array, b);
  };

  ArrayExtensions.uniqueValues = function(sortedArray, eqF) {
    var i, len1, p, results, v;
    if (eqF == null) {
      eqF = (function(a, b) {
        return a === b;
      });
    }
    results = [];
    for (i = p = 0, len1 = sortedArray.length; p < len1; i = ++p) {
      v = sortedArray[i];
      if (i === 0 || !eqF(v, sortedArray[i - 1])) {
        results.push(v);
      }
    }
    return results;
  };


  /*
  IN:
    array: an array or falsy value
    element: anything
  OUT:
    array containing element as the last element
  
  EFFECT:
    if array was falsy, a new length-1 array is returned
    else, array was mutated by pushing the current element
  
  WHY?
    Why write this when arrays alread have push?
  
    1) if array is null, this works as desired
    2) this returns array, not array.length
      Returning the array is what Ruby's push does.
      It makes chaining pushes easy.
   */

  ArrayExtensions.push = function(array, element) {
    if (array) {
      array.push(element);
      return array;
    } else {
      return [element];
    }
  };

  ArrayExtensions.peek = function(array, offset) {
    if (offset == null) {
      offset = -1;
    }
    if (array != null) {
      return array[array.length + offset];
    } else {
      return void 0;
    }
  };

  basicCompareFunction = function(a, b) {
    return a - b;
  };

  ArrayExtensions.leftOfIndex = leftOfIndex = function(array, index) {
    if (!array) {
      return array;
    }
    return array.slice(0, index);
  };

  ArrayExtensions.rightOfIndex = rightOfIndex = function(array, index) {
    if (!array) {
      return array;
    }
    if (index < 0) {
      index += array.length;
    }
    return array.slice(index + 1);
  };

  indexOfOrLength = function(array, value) {
    var i;
    if (0 > (i = array.indexOf(value))) {
      return array.length;
    } else {
      return i;
    }
  };

  ArrayExtensions.leftOf = function(array, value) {
    return leftOfIndex(array, indexOfOrLength(array, value));
  };

  ArrayExtensions.rightOf = function(array, value) {
    return rightOfIndex(array, indexOfOrLength(array, value));
  };

  ArrayExtensions.splitArray = function(array, value) {
    var index;
    index = indexOfOrLength(array, value);
    return [leftOfIndex(array, index), rightOfIndex(array, index)];
  };


  /*
  findSortedFirst
  
  Acts as-if it sorted the array and returned the first element.
  
  Details:
    tests each element in the array againts the current "smallest"
    returns the element for which tests "smaller" than every other
    element a is "smaller" than b if compareFunction(a, b) returns >0 value
  
  IN:
    array - the array to search or null
    compareFunction - (a, b) -> # standard compare function
      returns:
        0: if a and b are equal
        <0: if b is greater than a
        >0: if a is greater than b
      default: (a, b) -> a - b
  
  OUT:
    largest value in array or undefined if array is null or length 0
   */

  ArrayExtensions.findSortedFirst = function(array, compareFunction) {
    var element, i, p, ref3, returnElement;
    if (compareFunction == null) {
      compareFunction = basicCompareFunction;
    }
    if (!((array != null ? array.length : void 0) > 0)) {
      return void 0;
    }
    returnElement = array[0];
    for (i = p = 1, ref3 = array.length; p < ref3; i = p += 1) {
      if (0 < compareFunction(returnElement, element = array[i])) {
        returnElement = element;
      }
    }
    return returnElement;
  };

  ArrayExtensions.first = function(array) {
    return array[0];
  };

  ArrayExtensions.second = function(array) {
    return array[1];
  };

  ArrayExtensions.third = function(array) {
    return array[2];
  };

  ArrayExtensions.forth = function(array) {
    return array[3];
  };

  ArrayExtensions.fifth = function(array) {
    return array[4];
  };

  ArrayExtensions.last = function(array) {
    if (array) {
      return array[array.length - 1];
    } else {
      return void 0;
    }
  };

  ArrayExtensions.pushIfNotPresent = function(array, item) {
    if (indexOf.call(array, item) >= 0) {
      return false;
    } else {
      array.push(item);
      return true;
    }
  };

  ArrayExtensions.randomElement = randomElement = function(array, fromFirstN) {
    if (fromFirstN == null) {
      fromFirstN = array.length;
    }
    return array[Math.random() * fromFirstN | 0];
  };

  ArrayExtensions.randomSortInPlace = randomSortInPlace = function(array) {
    var a, i, j, len, p, ref3;
    len = array.length;
    for (i = p = ref3 = len - 1; p >= 0; i = p += -1) {
      j = intRand(i);
      a = array[i];
      array[i] = array[j];
      array[j] = a;
    }
    return array;
  };

  ArrayExtensions.arrayWithRandomSort = function(array) {
    if (array) {
      return randomSortInPlace(array.slice());
    } else {
      return [];
    }
  };

  ArrayExtensions.randomSort = ArrayExtensions.arrayWithRandomSort;

  ArrayExtensions.insert = function(array, index, item) {
    if (index < 0) {
      index = array.length + index + 1;
    }
    array.splice(index, 0, item);
    return array;
  };

  ArrayExtensions.arrayWithInsertedValue = arrayWithInsertedValue = function(array, index, item) {
    return ArrayExtensions.insert(array.slice(), index, item);
  };

  ArrayExtensions.withInserted = arrayWithInsertedValue;

  ArrayExtensions.withSort = function(array, sortFunction) {
    array = array.slice();
    return array.sort(sortFunction);
  };

  ArrayExtensions.remove = function(array, index, amount) {
    if (amount == null) {
      amount = 1;
    }
    if (index < 0) {
      index = array.length + index + 1;
    }
    array.splice(index, amount);
    return array;
  };

  ArrayExtensions.removeFirstMatch = function(array, toMatchValue) {
    var index;
    index = array.indexOf(toMatchValue);
    if (index >= 0) {
      return ArrayExtensions.remove(array, index);
    } else {
      return array;
    }
  };

  ArrayExtensions.arrayWithout = function(array, index, amount) {
    if (amount == null) {
      amount = 1;
    }
    if (index == null) {
      index = array.length - 1;
    }
    return ArrayExtensions.remove(array.slice(), index, amount);
  };

  ArrayExtensions.arrayWithoutValue = function(array, value) {
    return ArrayExtensions.remove(array.slice(), array.indexOf(value), 1);
  };

  ArrayExtensions.arrayWithoutLast = function(array, amount) {
    if (amount == null) {
      amount = 1;
    }
    if ((array != null) && amount < array.length) {
      return array.slice(0, array.length - amount);
    } else {
      return [];
    }
  };

  ArrayExtensions.arrayWith = function(array, value) {
    if (!array) {
      return [value];
    }
    array = array.slice();
    array.push(value);
    return array;
  };

  ArrayExtensions.truncatedArrayWith = function(array, length, value) {
    if (!array) {
      return [value];
    }
    array = array.slice(0, length);
    array.push(value);
    return array;
  };

  ArrayExtensions.poppedArray = function(array) {
    return array.slice(0, array.length - 1);
  };

  ArrayExtensions.arrayWithOne = function(array, value) {
    if (!array) {
      return [value];
    }
    array = array.slice();
    if (indexOf.call(array, value) < 0) {
      array.push(value);
    }
    return array;
  };

  ArrayExtensions.slice = function(a, b, c) {
    return arraySlice.call(a, b, c);
  };

  ArrayExtensions.shuffleArray = function(a) {
    var i, j, t;
    i = a.length;
    while (--i > 0) {
      j = ~~(Math.random() * (i + 1));
      t = a[j];
      a[j] = a[i];
      a[i] = t;
    }
    return a;
  };

  ArrayExtensions._moveArrayElementLargeArray = _moveArrayElementLargeArray = function(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
    return array;
  };

  ArrayExtensions._moveArrayElementSmallArray = _moveArrayElementSmallArray = function(array, from, to) {
    var i, p, q, ref3, ref4, ref5, ref6, tmp;
    from = from | 0;
    to = to | 0;
    tmp = array[from];
    if (from < to) {
      for (i = p = ref3 = from, ref4 = to - 1; p <= ref4; i = p += 1) {
        array[i] = array[i + 1];
      }
    } else {
      for (i = q = ref5 = from, ref6 = to + 1; q >= ref6; i = q += -1) {
        array[i] = array[i - 1];
      }
    }
    array[to] = tmp;
    return array;
  };

  ArrayExtensions.moveArrayElement = moveArrayElement = function(array, from, to) {
    from = modulo(from | 0, array.length);
    to = modulo(to | 0, array.length);
    if (Math.abs(from - to) > 300) {
      _moveArrayElementLargeArray(array, from, to);
    } else {
      _moveArrayElementSmallArray(array, from, to);
    }
    return array;
  };

  ArrayExtensions.arrayWithElementMoved = arrayWithElementMoved = function(array, from, to) {
    from = modulo(from | 0, array.length);
    to = modulo(to | 0, array.length);
    if (from === to) {
      return array;
    }
    array = array.slice();
    return moveArrayElement(array, from, to);
  };

  ArrayExtensions.arrayWithElementValueMoved = function(array, value, to) {
    var from;
    from = array.indexOf(value);
    if (from < 0) {
      return array;
    }
    return arrayWithElementMoved(array, from, to);
  };

  ArrayExtensions.arrayWithElementReplaced = function(array, value, index) {
    array = array.slice();
    array[index] = value;
    return array;
  };

  ArrayExtensions.arrayWithAllButLast = function(array, amount) {
    if (amount == null) {
      amount = 1;
    }
    if (array) {
      return array.slice(0, array.length - amount);
    } else {
      return [];
    }
  };

  ArrayExtensions.stableSort = function(array, compare) {
    var a, b, i, length, notSorted, p, ref3;
    compare || (compare = function(a, b) {
      return a - b;
    });
    notSorted = true;
    length = array.length;
    while (notSorted) {
      notSorted = false;
      for (i = p = 1, ref3 = length; p < ref3; i = p += 1) {
        if (compare(a = array[i - 1], b = array[i]) > 0) {
          array[i - 1] = b;
          array[i] = a;
          notSorted = true;
        }
      }
    }
    return array;
  };

  ArrayExtensions.longestCommonSubsequence = longestCommonSubsequence = function(a, b) {
    var c, diag, i, j, latch, lcs, left, m, n, p, q, r, ref3, ref4, ref5, row, s;
    lcs = [];
    row = [];
    c = [];
    if (m < n) {
      s = a;
      a = b;
      b = s;
    }
    m = a.length;
    n = b.length;
    for (j = p = 0, ref3 = n; p < ref3; j = p += 1) {
      row[j] = 0;
    }
    for (i = q = 0, ref4 = m; q < ref4; i = q += 1) {
      c[i] = row = row.slice();
      diag = 0;
      for (j = r = 0, ref5 = n - 1; r <= ref5; j = r += 1) {
        latch = row[j];
        if (a[i] === b[j]) {
          row[j] = diag + 1;
        } else {
          left = row[j - 1] || 0;
          if (left > row[j]) {
            row[j] = left;
          }
        }
        diag = latch;
      }
    }
    i--;
    j--;
    while (i > -1 && j > -1) {
      switch (c[i][j]) {
        case i && c[i - 1][j]:
          i--;
          continue;
        case j && c[i][j - 1]:
          j--;
          break;
        default:
          j--;
          lcs.unshift(a[i]);
          i--;
          continue;
      }
    }
    return lcs;
  };

  ArrayExtensions.minimumOrderedOverlappingMerge = function(a, b) {
    var ai, bj, c, ck, i, j, k, l, m, n, o, out;
    c = longestCommonSubsequence(a, b);
    m = a.length;
    n = b.length;
    o = c.length;
    out = new Array(n);
    i = 0;
    j = 0;
    k = 0;
    l = 0;
    while (i < m && j < n && k < o) {
      ai = a[i];
      bj = b[j];
      ck = c[k];
      if (ai === ck && bj === ck) {
        i++;
        j++;
        k++;
        out[l++] = ai;
      } else if (ai !== ck) {
        i++;
        if (indexOf.call(b, ai) < 0) {
          out[l++] = ai;
        }
      } else {
        j++;
        out[l++] = bj;
      }
    }
    while (i < m) {
      ai = a[i++];
      if (indexOf.call(b, ai) < 0) {
        out[l++] = ai;
      }
    }
    while (j < n) {
      out[l++] = b[j++];
    }
    return out;
  };

  ArrayExtensions.wordsArray = w = function() {
    var arg, len1, out, p;
    out = [];
    for (p = 0, len1 = arguments.length; p < len1; p++) {
      arg = arguments[p];
      if (isString(arg) && !arg.match(exactlyOneWordRegex)) {
        out = out.concat(arg.match(wordsRegex));
      } else {
        out.push(arg);
      }
    }
    return out;
  };

  ArrayExtensions.wordArray = ArrayExtensions.wordsArray;

  ArrayExtensions.w = ArrayExtensions.wordsArray;

  ArrayExtensions.a = a = function() {
    var arg, len1, out, p;
    out = [];
    for (p = 0, len1 = arguments.length; p < len1; p++) {
      arg = arguments[p];
      out.push(arg);
    }
    return out;
  };

  return ArrayExtensions;

})();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Environment, ParseUrl, defineModule, isNode;

defineModule = __webpack_require__(5).defineModule;

ParseUrl = __webpack_require__(19);

isNode = __webpack_require__(53);

defineModule(module, Environment = (function() {
  function Environment() {}

  Environment.getEnv = function() {
    var ref, ref1;
    return global.environment != null ? global.environment : global.environment = (((ref = global.location) != null ? ref.search : void 0) ? ParseUrl.parseQuery() : (ref1 = global.process) != null ? ref1.env : void 0) || {};
  };

  Environment.isBrowser = !!(global.window && global.navigator && global.document);

  Environment.isWebWorker = !!(!Environment.isBrowser && global.importScripts);

  Environment.isNode = !!isNode;

  return Environment;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectExtensions, compactFlatten, deepArrayEach, isArrayOrArguments, isFunction, isObject, isPlainArray, isPlainObject, mergeInto, object, present, ref, ref1,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(1), compactFlatten = ref.compactFlatten, deepArrayEach = ref.deepArrayEach, isArrayOrArguments = ref.isArrayOrArguments, mergeInto = ref.mergeInto;

ref1 = __webpack_require__(0), isPlainObject = ref1.isPlainObject, isObject = ref1.isObject, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray, present = ref1.present;

object = __webpack_require__(17).object;

module.exports = ObjectExtensions = (function() {
  var expandPathedProperties, objectKeyCount, propertyIsPathed, setPathedProperty, toObjectInternal, withPropertyPath;

  function ObjectExtensions() {}

  ObjectExtensions.countKeys = function(o) {
    return Object.keys(o).length;
  };

  ObjectExtensions.objectKeyCount = objectKeyCount = function(o) {
    var count, k, v;
    count = 0;
    for (k in o) {
      v = o[k];
      count++;
    }
    return count;
  };

  ObjectExtensions.objectHasKeys = function(o) {
    var b, k;
    for (k in o) {
      b = o[k];
      return true;
    }
    return false;
  };

  ObjectExtensions.objectLength = objectKeyCount;


  /*
  NOTE:
    null and undefined keys are NOT SUPPORTED
  
    They should be converted to strings, first,
    which is what they would become anyway.
  
  IN: 0 or more arguments
    out = {}
    list = arguments
  
    for element in list
      objects: merge into out
      arrays or argument lists: recurse using element as the list
      null or undefined: skip
      else out[element] = next element (or undefined if none)
  
  OUT: plain object
   */

  toObjectInternal = function(list, out) {
    var element, j, key, len;
    key = null;
    for (j = 0, len = list.length; j < len; j++) {
      element = list[j];
      if (key) {
        out[key] = element;
        key = null;
      } else if (isPlainObject(element)) {
        mergeInto(out, element);
      } else if (isArrayOrArguments(element)) {
        toObjectInternal(element, out);
      } else if (element != null) {
        key = element;
      }
    }
    if (key) {
      return out[key] = void 0;
    }
  };

  ObjectExtensions.toObject = function() {
    var out;
    out = {};
    toObjectInternal(arguments, out);
    return out;
  };


  /*
  IN:
    inputArray: any array
    transformFunction: (element) -> [key, value]
      default: transforms an array of the form: [[key1, value1], [key2, value2], etc...]
   */

  ObjectExtensions.arrayToMap = function(inputArray, transformFunction) {
    var element, j, key, len, outputMap, ref2, value;
    if (transformFunction == null) {
      transformFunction = function(element) {
        return element;
      };
    }
    outputMap = {};
    for (j = 0, len = inputArray.length; j < len; j++) {
      element = inputArray[j];
      ref2 = transformFunction(element), key = ref2[0], value = ref2[1];
      outputMap[key] = value;
    }
    return outputMap;
  };


  /*
  IN:
    obj: the object to select fields from
  
    2nd argument can be:
      selectFunction: (value, key) -> true / false
  
    OR obj can be followed by any number of strings or arrays in any nesting, possibly with null fields
   */

  ObjectExtensions.select = function(obj, a) {
    var j, k, len, prop, properties, result, v;
    if (!obj) {
      return {};
    }
    result = {};
    if (isFunction(a)) {
      if (a.length === 1) {
        for (k in obj) {
          v = obj[k];
          if (a(v)) {
            result[k] = v;
          }
        }
      } else {
        for (k in obj) {
          v = obj[k];
          if (a(k, v)) {
            result[k] = v;
          }
        }
      }
    } else {
      properties = compactFlatten(Array.prototype.slice.call(arguments, 1));
      for (j = 0, len = properties.length; j < len; j++) {
        prop = properties[j];
        if (((v = obj[prop]) != null) || obj.hasOwnProperty(prop)) {
          result[prop] = v;
        }
      }
    }
    return result;
  };

  ObjectExtensions.selectAll = function() {
    var j, len, obj, prop, properties, ref2, result;
    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (!obj) {
      return {};
    }
    result = {};
    ref2 = compactFlatten(properties);
    for (j = 0, len = ref2.length; j < len; j++) {
      prop = ref2[j];
      result[prop] = obj[prop];
    }
    return result;
  };

  ObjectExtensions.objectWithDefinedValues = function(obj) {
    return object(obj, {
      when: function(v) {
        return v !== void 0;
      }
    });
  };

  ObjectExtensions.objectWithExistingValues = function(obj) {
    return object(obj, {
      when: function(v) {
        return v != null;
      }
    });
  };

  ObjectExtensions.objectWithPresentValues = function(obj) {
    return object(obj, {
      when: function(v) {
        return present(v);
      }
    });
  };

  ObjectExtensions.objectWithout = function() {
    var anythingToDo, j, len, obj, prop, properties, result, v;
    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    if (!obj) {
      return {};
    }
    if (properties.length === 1 && !(typeof properties[0] === "string")) {
      properties = properties[0];
    }
    anythingToDo = false;
    for (j = 0, len = properties.length; j < len; j++) {
      prop = properties[j];
      if (obj.hasOwnProperty(prop)) {
        anythingToDo = true;
        break;
      }
    }
    if (anythingToDo) {
      result = {};
      for (prop in obj) {
        v = obj[prop];
        if (indexOf.call(properties, prop) < 0) {
          result[prop] = v;
        }
      }
      return result;
    } else {
      return obj;
    }
  };

  ObjectExtensions.propertyIsPathed = propertyIsPathed = function(key) {
    return !!key.match(/[\s\.\/]/);
  };

  ObjectExtensions.withPropertyPath = withPropertyPath = function(obj, propertyPath, action) {
    var i, j, key, len;
    propertyPath = propertyPath.match(/[^\s\.\/]+/g);
    for (i = j = 0, len = propertyPath.length; j < len; i = ++j) {
      key = propertyPath[i];
      if (i === propertyPath.length - 1) {
        action(obj, key);
      } else {
        obj = obj[key] || (obj[key] = {});
      }
    }
    return obj;
  };

  ObjectExtensions.setPathedProperty = setPathedProperty = function(obj, propertyPath, value) {
    withPropertyPath(obj, propertyPath, function(o, k) {
      return o[k] = value;
    });
    return obj;
  };

  ObjectExtensions.expandPathedProperties = expandPathedProperties = function(obj, into, pathExpansionEnabled) {
    var k, v;
    if (into == null) {
      into = {};
    }
    if (pathExpansionEnabled == null) {
      pathExpansionEnabled = true;
    }
    for (k in obj) {
      v = obj[k];
      if (pathExpansionEnabled && propertyIsPathed(k)) {
        withPropertyPath(into, k, function(o, finalKey) {
          if (isPlainObject(v)) {
            return expandPathedProperties(v, o[finalKey] || (o[finalKey] = {}), true);
          } else {
            return o[finalKey] = v;
          }
        });
      } else if (isPlainObject(v)) {
        expandPathedProperties(v, into[k] || (into[k] = {}), false);
      } else {
        into[k] = v;
      }
    }
    return into;
  };

  return ObjectExtensions;

})();


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var ArrayCompactFlatten;

module.exports = ArrayCompactFlatten = (function() {
  var arraySlice, compact, compactFlattenIfNeeded, deepArrayEach, doFlattenInternal, flatten, isArguments, isArrayOrArguments, keepAll, keepUnlessNullOrUndefined, needsFlatteningOrCompacting;

  function ArrayCompactFlatten() {}

  ArrayCompactFlatten.isArguments = isArguments = function(o) {
    return o.constructor === Object && "number" === typeof o.length && "function" === typeof o.callee;
  };

  ArrayCompactFlatten.isArrayOrArguments = isArrayOrArguments = function(o) {
    return o && (o.constructor === Array || isArguments(o));
  };

  ArrayCompactFlatten.needsFlatteningOrCompacting = needsFlatteningOrCompacting = function(array, keepTester) {
    var a, i, len;
    for (i = 0, len = array.length; i < len; i++) {
      a = array[i];
      if (isArrayOrArguments(a) || !keepTester(a)) {
        return true;
      }
    }
    return false;
  };

  ArrayCompactFlatten.keepUnlessNullOrUndefined = keepUnlessNullOrUndefined = function(a) {
    return a !== null && a !== void 0;
  };


  /*
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output
  
  OUT: array where all elements test true to keepTester
  NOTE: NOT recursive - just does a shallow pass
   */

  ArrayCompactFlatten.compact = compact = function(array, keepTester) {
    var a, i, len;
    if (keepTester == null) {
      keepTester = keepUnlessNullOrUndefined;
    }
    for (i = 0, len = array.length; i < len; i++) {
      a = array[i];
      if (!keepTester(a)) {
        return (function() {
          var j, len1, results;
          results = [];
          for (j = 0, len1 = array.length; j < len1; j++) {
            a = array[j];
            if (keepTester(a)) {
              results.push(a);
            }
          }
          return results;
        })();
      }
    }
    return array;
  };


  /*
  IN: accepts any number of arguments
  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
    to the top level (flatten)
   */

  ArrayCompactFlatten.flatten = flatten = function(firstArg) {
    return compactFlattenIfNeeded(arguments.length === 1 ? firstArg : arguments);
  };


  /*
  IN: array: any object that has a length
  
  EFFECT:
    itterates over array and recurse over any element which isArrayOrArguments
    invokes f on every element that is not isArrayOrArguments
  OUT: array (same as passed in)
   */

  ArrayCompactFlatten.deepArrayEach = deepArrayEach = function(array, f) {
    var el, i, len;
    for (i = 0, len = array.length; i < len; i++) {
      el = array[i];
      if (isArrayOrArguments(el)) {
        deepArrayEach(el, f);
      } else {
        f(el);
      }
    }
    return array;
  };


  /*
  IN:
    array: array or arguments-object
    keepTester: (value) -> true/false
      OUT: return true if that element should be in the output
  
  OUT: array where all elements test true to keepTester
  NOTE: RECURSIVE: recurses into all arry or arguments-objects and adds their contents
    to the top level (flatten)
   */

  ArrayCompactFlatten.compactFlatten = function(array, keepTester) {
    if (keepTester == null) {
      keepTester = keepUnlessNullOrUndefined;
    }
    return compactFlattenIfNeeded(array, keepTester);
  };

  arraySlice = Array.prototype.slice;

  doFlattenInternal = function(array, keepTester) {
    var output;
    output = [];
    deepArrayEach(array, function(el) {
      if (keepTester(el)) {
        return output.push(el);
      }
    });
    return output;
  };

  keepAll = function() {
    return true;
  };

  compactFlattenIfNeeded = function(array, keepTester) {
    if (keepTester == null) {
      keepTester = keepAll;
    }
    if (array == null) {
      return array;
    }
    if ((array != null) && !isArrayOrArguments(array)) {
      return [array];
    }
    if (needsFlatteningOrCompacting(array, keepTester)) {
      return doFlattenInternal(array, keepTester);
    } else if (array.constructor !== Array) {
      return arraySlice.call(array);
    } else {
      return array;
    }
  };

  return ArrayCompactFlatten;

})();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var InspectedObjectLiteral, compare;

compare = __webpack_require__(25).compare;

module.exports = InspectedObjectLiteral = (function() {
  InspectedObjectLiteral.inspectedObjectLiteral = function(literal, isError) {
    return new InspectedObjectLiteral(literal, isError);
  };

  function InspectedObjectLiteral(literal1, isError1) {
    this.literal = literal1;
    this.isError = isError1;
  }

  InspectedObjectLiteral.prototype.getInspectedObjects = function() {
    return this;
  };

  InspectedObjectLiteral.prototype.inspect = function() {
    return this.literal;
  };

  InspectedObjectLiteral.prototype.compare = function(b) {
    return compare(this.literal, b.literal);
  };

  return InspectedObjectLiteral;

})();


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Inspect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(31)).addNamespace('Inspect', Inspect = (function(superClass) {
  extend(Inspect, superClass);

  function Inspect() {
    return Inspect.__super__.constructor.apply(this, arguments);
  }

  return Inspect;

})(Neptune.PackageNamespace));

__webpack_require__(42);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Iteration, compactFlatten, deepArrayEach, isArrayOrArguments, isFunction, isObject, isPlainArray, isPlainObject, log, mergeInto, ref, ref1;

ref = __webpack_require__(1), compactFlatten = ref.compactFlatten, deepArrayEach = ref.deepArrayEach, isArrayOrArguments = ref.isArrayOrArguments, mergeInto = ref.mergeInto;

ref1 = __webpack_require__(0), isPlainObject = ref1.isPlainObject, isObject = ref1.isObject, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray;

log = function() {
  var ref2;
  return (ref2 = Neptune.Art.StandardLib).log.apply(ref2, arguments);
};

module.exports = Iteration = (function() {
  var arrayIterableTest, emptyOptions, invokeNormalizedIteration, normalizedArray, normalizedEach, normalizedEachWhile, normalizedFind, normalizedInject, normalizedObject, returnFirst, returnSecond;

  function Iteration() {}

  returnFirst = function(a) {
    return a;
  };

  returnSecond = function(a, b) {
    return b;
  };

  arrayIterableTest = function(source) {
    return (source != null ? source.length : void 0) >= 0;
  };

  emptyOptions = {};


  /*
  COMMON API:
  
  IN: (source, withBlock = returnFirst) ->
  IN: (source, options) ->
  IN: (source, into, withBlock = returnFirst) ->
  IN: (source, into, options) ->
  
  source:
    array-like (see arrayIterableTest)
      use indexes to iterate
  
    non-null
  
  options:
    with: withBlock
    when: whenBlock
    into: into
  
  withBlock: (value, key, into, whenBlockResult) -> value
    Generally, this generates the 'value' used for each part of the iteration.
    When constructing a new collection, this is the value for each entry.
    'find' and 'reduce' use this differently.
  
  OUT: into
  
  TODO:
    - support ES6 iterables and iterators
    - flatten: true - if source is an array, recurse into any sub-arrays
    - compact: effectively `when: (v) -> v?` except you can also have your own when-function in addition, run after this one.
    - skip: N - skip the first N values
    - short: N - stop short N values
    - until: () -> T/F - same args as withBlock, loop stops when true, executed after first withBlock
    - while: () -> T/F - same args as withBlock, loop stops when false, executed before first whenBlock
    - by: N -
        N>0: only stop at every Nth value
        N<0: iterate in reverse order, only stop at every abs(N)th value
   */


  /*
  each differences from the common-api:
  
  1) into defaults to source
   */

  Iteration.each = function(source, a, b) {
    return invokeNormalizedIteration(normalizedEach, source, a, b);
  };

  normalizedEach = function(source, into, withBlock, options) {
    var i, j, k, len, len1, v, w, whenBlock;
    if (into === void 0) {
      into = source;
    }
    if (options) {
      whenBlock = options.when;
    }
    if (arrayIterableTest(source)) {
      if (whenBlock) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (w = whenBlock(v, k)) {
            withBlock(v, k, into, w);
          }
        }
      } else {
        for (k = j = 0, len1 = source.length; j < len1; k = ++j) {
          v = source[k];
          withBlock(v, k, into);
        }
      }
    } else if (source != null) {
      if (whenBlock) {
        for (k in source) {
          v = source[k];
          if (w = whenBlock(v, k)) {
            withBlock(v, k, into, w);
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          withBlock(v, k, into);
        }
      }
    }
    return into;
  };


  /*
  eachWhile differences from the common-api:
  
  1) into defaults to source
  2) stops when withBlock returns false
   */

  Iteration.eachWhile = function(source, a, b) {
    return invokeNormalizedIteration(normalizedEachWhile, source, a, b);
  };

  normalizedEachWhile = function(source, into, withBlock, options) {
    var i, j, k, len, len1, v, w, whenBlock;
    if (into === void 0) {
      into = source;
    }
    if (options) {
      whenBlock = options.when;
    }
    if (arrayIterableTest(source)) {
      if (whenBlock) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          if (w = whenBlock(v, k)) {
            if (!withBlock(v, k, into, w)) {
              break;
            }
          }
        }
      } else {
        for (k = j = 0, len1 = source.length; j < len1; k = ++j) {
          v = source[k];
          if (!withBlock(v, k, into)) {
            break;
          }
        }
      }
    } else if (source != null) {
      if (whenBlock) {
        for (k in source) {
          v = source[k];
          if (w = whenBlock(v, k)) {
            if (!withBlock(v, k, into, w)) {
              break;
            }
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          if (!withBlock(v, k, into)) {
            break;
          }
        }
      }
    }
    return into;
  };


  /*
  reduce differences from the common-api:
  
  1) The with-block has a different argument order. Into is passed first instead of last:
    with: (into, value, key, whenReturnValue) ->
    This allows you to drop-in functions that take two arguments and reduce them to one like:
      Math.max
      add = (a, b) -> a + b
  
    The default with-block still returns value (which is now the second argument).
  
  1) if into starts out undefined:
    for v = the first value (if whenBlock is present, the first value when whenBlock is true)
      into = v
      skip: withBlock
  
  2) when withBlock is executed, into is updated:
    into = withBlock()
   */

  Iteration.reduce = function(source, a, b) {
    return invokeNormalizedIteration(normalizedInject, source, a, b);
  };

  normalizedInject = function(source, into, withBlock, options) {
    var intoSet;
    if (source == null) {
      return into;
    }
    normalizedEach(source, void 0, (intoSet = into !== void 0) ? function(v, k, __, w) {
      return into = withBlock(into, v, k, w);
    } : function(v, k, __, w) {
      return into = intoSet ? withBlock(into, v, k, w) : (intoSet = true, v);
    }, options);
    return into;
  };


  /*
  object differences from the common-api:
  
  IN:
    options.key: (value, key, into, whenBlockResult) -> value
  
  1) into defaults to a new object ({}) (if into == undefined)
  
  2) when withBlock is executed, into is updated:
    if source is array-like:
      into[v] = withBlock()
    else
      into[k] = withBlock()
   */

  Iteration.object = function(source, a, b) {
    return invokeNormalizedIteration(normalizedObject, source, a, b);
  };

  normalizedObject = function(source, into, withBlock, options) {
    var keyFunction;
    keyFunction = options.key || (arrayIterableTest(source) ? returnFirst : returnSecond);
    return normalizedEach(source, into != null ? into : {}, function(v, k, into, w) {
      return into[keyFunction(v, k, into, w)] = withBlock(v, k, into, w);
    }, options);
  };


  /*
  array differences from the common-api:
  
  1) into defaults to a new array ([]) (if into == undefined)
  
  2) when withBlock is executed, into is updated:
    into.push withBlock()
   */

  Iteration.array = function(source, a, b) {
    return invokeNormalizedIteration(normalizedArray, source, a, b);
  };

  normalizedArray = function(source, into, withBlock, options) {
    return normalizedEach(source, into != null ? into : [], function(v, k, into, w) {
      return into.push(withBlock(v, k, into, w));
    }, options);
  };


  /*
  differs from common api:
  
  1) returns the last value returned by withBlock or undefined if withBlock was never executed
  2) stops if
    a) whenBlock?:  and it returned true (stops after withBlock is evaluated)
    b) !whenBlock?: withBlock returns a truish value
   */

  Iteration.find = function(source, a, b) {
    return invokeNormalizedIteration(normalizedFind, source, a, b);
  };

  normalizedFind = function(source, into, withBlock, options) {
    var found;
    normalizedEachWhile(source, found = void 0, options.whenBlock ? function(v, k, into, w) {
      found = withBlock(v, k, null, w);
      return false;
    } : function(v, k, into, w) {
      return !(found = withBlock(v, k, null, w));
    }, options);
    return found;
  };


  /*
  Normalizes input params for the 'iteration' function.
  Since this normalizes multile params, and therefor would need to return
  an new array or new object otherwise, we pass IN the iteration function
  and pass the params directly to it. This keeps the computed params on the
  stack and doesn't create new objects.
  
  IN signature 1: (iteration, source, into, withBlock) ->
  IN signature 2: (iteration, source, into, options) ->
  IN signature 3: (iteration, source, withBlock) ->
  IN signature 4: (iteration, source, options) ->
  IN signature 5: (iteration, source) ->
  
  IN:
    iteration: (source, into, withBlock, options) -> out
  
      The iteration function is invoked last with the computed args.
      Its retults are returned.
  
      IN:
        source:     passed directly through from inputs
        into:       passed directly through from inputs OR from options.into
        withBlock:  passed directly through from inputs OR from options.with
        options:    passed direftly through from inputs OR {}
                    (guaranteed to be set and a plainObject)
  
    source: the source collection to be iterated over. Passed streight through.
  
    into:       passed through to 'iteration'
    withBlock:  passed through to 'iteration'
    options:    passed through to 'iteration' AND:
  
      into:     set 'into' from the options object
      with:     set 'withBlock' from the options object
  
  OUT: out
   */

  invokeNormalizedIteration = function(iteration, source, a, b) {
    var into, options, withBlock;
    options = b ? (into = a, b) : a;
    if (isPlainObject(options)) {
      if (into == null) {
        into = options.into;
      }
      withBlock = options["with"];
    } else {
      if (isFunction(options)) {
        withBlock = options;
      }
      options = emptyOptions;
    }
    return iteration(source, into, withBlock || returnFirst, options);
  };

  return Iteration;

})();


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


/*
TODO: This is almost identical to ES6's Map: Switch to using a Polyfill like:
  https://github.com/paulmillr/es6-shim

Map is a Key-Value map which preserves order.

Unlike Javascript objects, you can use any object or value as keys. This includes:

  Strings
  Numbers
  null
  undefined
  Arrays
  Objects

Arrays and Objects are assigned a unique id using the StandardLib.Unique library.
"0", "", null, undefined and 0 are all different unique keys and can each have unique values.
 */
var KeysIterator, Map, MinimalBaseObject, Node, Unique, ValuesIterator, m,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Unique = __webpack_require__(30);

MinimalBaseObject = __webpack_require__(3);

Node = (function() {
  function Node(key, value, prev, next) {
    this.key = key;
    this.value = value;
    this.prev = prev || null;
    this.next = next || null;
    if (prev) {
      prev.next = this;
    }
    if (next) {
      next.prev = this;
    }
  }

  Node.prototype.remove = function() {
    var n, p;
    n = this.next;
    p = this.prev;
    if (p) {
      p.next = n;
      this.prev = null;
    }
    if (n) {
      n.prev = p;
      return this.next = null;
    }
  };

  return Node;

})();

KeysIterator = (function() {
  function KeysIterator(node1) {
    this.node = node1;
    this.started = false;
  }

  KeysIterator.prototype.next = function() {
    var ref, ref1;
    this.node = this.started ? (ref = this.node) != null ? ref.next : void 0 : (this.started = true, this.node);
    return {
      done: !this.node,
      value: (ref1 = this.node) != null ? ref1.key : void 0
    };
  };

  return KeysIterator;

})();

ValuesIterator = (function() {
  function ValuesIterator(node1) {
    this.node = node1;
    this.started = false;
  }

  ValuesIterator.prototype.next = function() {
    var ref, ref1;
    this.node = this.started ? (ref = this.node) != null ? ref.next : void 0 : (this.started = true, this.node);
    return {
      done: !this.node,
      value: (ref1 = this.node) != null ? ref1.value : void 0
    };
  };

  return ValuesIterator;

})();

module.exports = (m = new global.Map).set(1, 2) === m ? global.Map : Map = (function(superClass) {
  extend(Map, superClass);

  function Map() {
    this._length = 0;
    this._map = {};
    this._first = this._last = null;
  }

  Map.getter({
    size: function() {
      return this._length;
    }
  });

  Map.prototype._getNodes = function() {
    var n, result;
    result = [];
    n = this._first;
    while (n) {
      result.push(n);
      n = n.next;
    }
    return result;
  };

  Map.prototype.keys = function() {
    return new KeysIterator(this._first);
  };

  Map.prototype.values = function() {
    return new ValuesIterator(this._first);
  };

  Map.prototype.get = function(key) {
    var node;
    node = this._map[Unique.id(key)];
    return node && node.value;
  };

  Map.prototype.set = function(key, value) {
    var id;
    id = Unique.id(key);
    if (this._map[id]) {
      this._map[id].value = value;
    } else {
      this._length++;
      this._last = this._map[id] = new Node(key, value, this._last);
      if (!this._first) {
        this._first = this._last;
      }
    }
    return this;
  };

  Map.prototype._remove = function(key) {
    var id, n;
    id = Unique.id(key);
    if (n = this._map[id]) {
      this._length--;
      delete this._map[id];
      if (this._first === n) {
        this._first = n.next;
      }
      if (this._last === n) {
        this._last = n.prev;
      }
      n.remove();
      return n;
    } else {
      return void 0;
    }
  };

  Map.prototype["delete"] = function(key) {
    return !!this._remove(key);
  };

  Map.prototype.forEach = function(f) {
    var i, len, node, ref;
    ref = this._getNodes();
    for (i = 0, len = ref.length; i < len; i++) {
      node = ref[i];
      f(node.value, node.key, this);
    }
    return void 0;
  };

  Map.prototype.has = function(key) {
    return !!this._map[Unique.id(key)];
  };

  return Map;

})(MinimalBaseObject);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var ParseUrl, escapeRegExp, findUrlOrigin, ref;

ref = __webpack_require__(9), escapeRegExp = ref.escapeRegExp, findUrlOrigin = ref.findUrlOrigin;

module.exports = ParseUrl = (function() {
  var generateQuery, parsedGlobalQuery;

  function ParseUrl() {}

  parsedGlobalQuery = null;

  ParseUrl.sameOrigin = function(url, origin) {
    var ref1, ref2;
    if (origin == null) {
      origin = (ref1 = global.document) != null ? (ref2 = ref1.location) != null ? ref2.origin : void 0 : void 0;
    }
    origin = origin.match(findUrlOrigin)[0];
    return RegExp("^((" + (escapeRegExp(origin)) + ")|(?![a-z]+\\:))", "i").test(url);
  };

  ParseUrl.parseQuery = function(qs) {
    var i, isCurrentLocation, j, key, len, obj, pair, ref1, ref2, val;
    if ((isCurrentLocation = qs == null) && parsedGlobalQuery) {
      return parsedGlobalQuery;
    }
    qs || (qs = ((ref1 = global.location) != null ? ref1.search : void 0) || "");
    obj = {};
    ref2 = qs.replace(/^\?/, '').split('&');
    for (j = 0, len = ref2.length; j < len; j++) {
      pair = ref2[j];
      if ((i = pair.indexOf('=')) >= 0) {
        key = pair.slice(0, i);
        val = pair.slice(i + 1);
        if (key.length > 0) {
          obj[key] = decodeURIComponent(val);
        }
      } else {
        obj[pair] = true;
      }
    }
    if (isCurrentLocation) {
      parsedGlobalQuery = obj;
    }
    return obj;
  };

  ParseUrl.generateQuery = generateQuery = function(o) {
    var k, parts, v;
    parts = (function() {
      var results;
      results = [];
      for (k in o) {
        v = o[k];
        results.push((encodeURIComponent(k)) + "=" + (encodeURIComponent(v)));
      }
      return results;
    })();
    return parts.join("&");
  };

  ParseUrl.urlJoin = function(uri, path) {
    return (uri.replace(/\/$/, '')) + "/" + (path.replace(/^\//, ''));
  };

  ParseUrl.appendQuery = function(uri, o) {
    var str;
    if ((o != null) && (str = generateQuery(o)).length > 0) {
      return "" + uri + (uri.match(/\?/) ? "&" : "?") + str;
    } else {
      return uri;
    }
  };

  ParseUrl.parseUrl = function(url) {
    var __, a, anchor, fileName, host, hostWithPort, m, password, path, pathName, port, protocol, query, username;
    m = url.match(/(([A-Za-z]+):(\/\/)?)?(([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?([A-Za-z0-9\.\-]+)(:([0-9]+))?(\/[\+~%\/\.\w\-]*)?(\?([\-\+=&;%@\.\w,]*))?(\#([\.\!\/\\\w]*))?/);
    if (!m) {
      return void 0;
    }
    __ = m[0], __ = m[1], protocol = m[2], __ = m[3], __ = m[4], username = m[5], __ = m[6], password = m[7], host = m[8], __ = m[9], port = m[10], pathName = m[11], __ = m[12], query = m[13], __ = m[14], anchor = m[15];
    if (pathName) {
      a = pathName.split("/");
      fileName = a[a.length - 1];
      path = (a.slice(0, a.length - 1)).join("/");
    }
    host = host.toLowerCase();
    hostWithPort = host;
    if (port) {
      hostWithPort += ":" + port;
    }
    return {
      protocol: protocol,
      username: username,
      password: password,
      hostWithPort: hostWithPort,
      host: host,
      port: port,
      pathName: pathName,
      path: path,
      fileName: fileName,
      query: query && ParseUrl.parseQuery(query),
      anchor: anchor
    };
  };

  return ParseUrl;

})();


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, ExtendablePropertyMixin, Log, MinimalBaseObject, StandardLib, Unique, WebpackHotLoader, callStack, capitalize, clone, concatInto, decapitalize, extendClone, functionName, getModuleBeingDefined, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isString, log, mergeInto, nextUniqueObjectId, object, objectName,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

StandardLib = __webpack_require__(21);

WebpackHotLoader = __webpack_require__(33);

capitalize = StandardLib.capitalize, decapitalize = StandardLib.decapitalize, log = StandardLib.log, extendClone = StandardLib.extendClone, clone = StandardLib.clone, isFunction = StandardLib.isFunction, objectName = StandardLib.objectName, isPlainObject = StandardLib.isPlainObject, functionName = StandardLib.functionName, isString = StandardLib.isString, isPlainArray = StandardLib.isPlainArray, Unique = StandardLib.Unique, callStack = StandardLib.callStack, Log = StandardLib.Log, log = StandardLib.log, inspectedObjectLiteral = StandardLib.inspectedObjectLiteral, MinimalBaseObject = StandardLib.MinimalBaseObject, getModuleBeingDefined = StandardLib.getModuleBeingDefined, concatInto = StandardLib.concatInto, mergeInto = StandardLib.mergeInto, isString = StandardLib.isString, object = StandardLib.object;

nextUniqueObjectId = Unique.nextUniqueObjectId;

ExtendablePropertyMixin = __webpack_require__(32);

module.exports = BaseClass = (function(superClass) {
  var createWithPostCreate, getSingleton, imprintObject, nonImprintableProps, thoroughDeleteProperty, warnedAboutIncludeOnce;

  extend(BaseClass, superClass);

  BaseClass.objectsCreated = 0;

  BaseClass.objectsCreatedByType = {};

  BaseClass.resetStats = function() {
    BaseClass.objectsCreated = 0;
    return BaseClass.objectsCreatedByType = {};
  };

  BaseClass._name = null;


  /*
  NOTE: only hasOwnProperties are considered! Inherited properties are not touched.
  IN:
    targetObject:   object will be altered to be an "imprint" of fromObject
    fromObject: object pattern used to imprint targetObject
    preserveState:
      false:
        targetObject has every property updated to exactly match fromObject
  
        This includes:
          1. delete properties in targetObject that are not in fromObject
          2. add every property in fromObject but not in targetObject
          3. overwriting every property in targetObject also in fromObject
  
      true:
        Attempts to preserve the state of targetObject while updating its functionality.
        This means properties which are functions in either object are updated.
  
        WARNING: This is a grey area for JavaScript. It is not entirely clear what is
          state and what is 'functionality'. I, SBD, have made the following heuristic decisions:
  
        Imprint actions taken when preserving State:
  
        1. DO NOTHING to properties in targetObject that are not in fromObject
        2. add every property in fromObject but not in targetObject
        3. properties in targetObject that are also in fromObject are updated
          if one of the following are true:
          - isFunction fromObject[propName]
          - isFunction targetObject[propName]
          - propName does NOT start with "_"
          NOTE: property existance is detected using Object.getOwnPropertyDescriptor
   */

  thoroughDeleteProperty = function(object, propName) {
    Object.defineProperty(object, propName, {
      configurable: true,
      writable: false,
      value: 1
    });
    return delete object[propName];
  };

  nonImprintableProps = ["__proto__", "prototype"];

  BaseClass.imprintObject = imprintObject = function(targetObject, sourceObject, preserveState) {
    var i, j, len, len1, sourcePropDescriptor, sourcePropName, sourcePropertyNames, targetPropDescriptor, targetPropName, targetPropertyNames;
    if (preserveState == null) {
      preserveState = false;
    }
    targetPropertyNames = Object.getOwnPropertyNames(targetObject);
    sourcePropertyNames = Object.getOwnPropertyNames(sourceObject);
    if (!preserveState) {
      for (i = 0, len = targetPropertyNames.length; i < len; i++) {
        targetPropName = targetPropertyNames[i];
        if (!(indexOf.call(sourcePropertyNames, targetPropName) >= 0)) {
          thoroughDeleteProperty(targetObject, targetPropName);
        }
      }
    }
    for (j = 0, len1 = sourcePropertyNames.length; j < len1; j++) {
      sourcePropName = sourcePropertyNames[j];
      if (!(!(indexOf.call(nonImprintableProps, sourcePropName) >= 0))) {
        continue;
      }
      targetPropDescriptor = Object.getOwnPropertyDescriptor(targetObject, sourcePropName);
      sourcePropDescriptor = Object.getOwnPropertyDescriptor(sourceObject, sourcePropName);
      if (!preserveState || !targetPropDescriptor || isFunction(sourcePropDescriptor.value) || isFunction(targetPropDescriptor != null ? targetPropDescriptor.value : void 0) || !sourcePropName.match(/^_/)) {
        Object.defineProperty(targetObject, sourcePropName, sourcePropDescriptor);
      }
    }
    return sourceObject;
  };


  /*
  imprints both the class and its prototype.
  
  preserved in spite of imprintObject's rules:
    @namespace
    @::constructor
   */

  BaseClass.imprintFromClass = function(updatedKlass) {
    var _name, namespace, namespacePath, oldConstructor, ref;
    if (updatedKlass !== this) {
      ref = this, namespace = ref.namespace, namespacePath = ref.namespacePath, _name = ref._name;
      oldConstructor = this.prototype.constructor;
      imprintObject(this, updatedKlass, true);
      imprintObject(this.prototype, updatedKlass.prototype, false);
      this.prototype.constructor = oldConstructor;
      this.namespace = namespace;
      this.namespacePath = namespacePath;
      this._name = _name;
    }
    return this;
  };

  BaseClass.getHotReloadKey = function() {
    return this.getName();
  };


  /*
  IN:
    _module should be the CommonJS 'module'
    klass: class object which extends BaseClass
  
  liveClass:
    On the first load, liveClass gets set.
    Each subsequent hot-load UPDATES liveClass,
    but liveClass always points to the initially created class object.
  
  OUT: the result of the call to liveClass.postCreate()
  
  postCreate is passed:
    hotReloaded:            # true if this is anything but the initial load
    classModuleState:
      liveClass:            # the original liveClass
      hotUpdatedFromClass:  # the most recently hot-loaded class
      hotReloadVersion:     # number starting at 0 and incremented with each hot reload
    _module:                # the CommonJs module
  
  EFFECTS:
    The following two methods are invoked on liveClass:
  
      if hot-reloading
        liveClass.imprintFromClass klass
  
       * always:
      liveClass.postCreate hotReloaded, classModuleState, _module
   */

  BaseClass.createWithPostCreate = createWithPostCreate = function(a, b) {
    var _module, klass;
    klass = b ? (_module = a, b) : a;
    _module || (_module = getModuleBeingDefined() || global.__definingModule);
    if (!(klass != null ? klass.postCreate : void 0)) {
      return klass;
    }
    if (!(_module != null ? _module.hot : void 0)) {
      return klass.postCreate({
        hotReloadEnabled: false,
        hotReloaded: false,
        classModuleState: {},
        module: _module
      }) || klass;
    }
    return WebpackHotLoader.runHot(_module, function(moduleState) {
      var classModuleState, hotReloadKey, hotReloaded, liveClass;
      hotReloadKey = klass.getHotReloadKey();
      if (classModuleState = moduleState[hotReloadKey]) {
        liveClass = classModuleState.liveClass;
        hotReloaded = true;
        classModuleState.hotReloadVersion++;
        classModuleState.hotUpdatedFromClass = klass;
        liveClass.namespace._setChildNamespaceProps(liveClass.getName(), klass);
        klass._name = liveClass._name;
        liveClass.imprintFromClass(klass);
        liveClass.classModuleState = classModuleState;
        log({
          "Art.ClassSystem.BaseClass: class hot-reload": {
            "class": liveClass.getNamespacePath(),
            version: classModuleState.hotReloadVersion,
            hotReloadKey: hotReloadKey
          }
        });
      } else {
        hotReloaded = false;
        klass._hotClassModuleState = moduleState[hotReloadKey] = klass.classModuleState = classModuleState = {
          liveClass: liveClass = klass,
          hotUpdatedFromClass: null,
          hotReloadVersion: 0
        };
      }
      return liveClass.postCreate({
        hotReloadEnabled: true,
        hotReloaded: hotReloaded,
        classModuleState: classModuleState,
        module: _module
      });
    });
  };

  BaseClass.createHotWithPostCreate = function(a, b) {
    log.error("createHotWithPostCreate is DEPRICATED");
    return createWithPostCreate(a, b);
  };


  /*
  called every load
  IN: options:
    NOTE: hot-loading inputs are only set if this class created as follows:
      createHotWithPostCreate module, class Foo extends BaseClass
  
    hotReload: true/false
      true if this class was hot-reloaded
  
    hotReloadEnabled: true/false
  
    classModuleState:
      liveClass:            the first-loaded version of the class.
                            This is the official version of the class at all times.
                            The hot-reloaded version of the class is "imprinted" onto the liveClass
                            but otherwise is not used (but can be accessed via classModuleState.hotUpdatedFromClass)
      hotUpdatedFromClass:  The most recently loaded version of the class.
      hotReloadVersion:     number, starting at 1, and counting up each load
  
      classModuleState is a plain-object specific to the class and its CommonJS module. If there is
      more than one hot-loaded class in the same module, each will have its own classModuleState.
  
      SBD NOTE: Though we could allow clients to add fields to classModuleState, I think it works
      just as well, and is cleaner, if any state is stored in the actual class objects and
      persisted via postCreate.
  
    module: the CommonJs module object.
  
  {hotReloadEnabled, hotReloaded, classModuleState, module} = options
   */

  BaseClass.postCreate = function(options) {
    if (this.getIsAbstractClass()) {
      return this.postCreateAbstractClass(options);
    } else {
      return this.postCreateConcreteClass(options);
    }
  };

  BaseClass.setNamespace = function(ns) {
    return this._namespace = ns;
  };

  BaseClass.postCreateAbstractClass = function(options) {
    return this;
  };

  BaseClass.postCreateConcreteClass = function(options) {
    return this;
  };

  function BaseClass() {
    this.__uniqueId = null;
  }

  BaseClass.implementsInterface = function(object, methods) {
    var i, len, method;
    for (i = 0, len = methods.length; i < len; i++) {
      method = methods[i];
      if (typeof object[method] !== "function") {
        return false;
      }
    }
    return true;
  };


  /*
  mix-in class methods
  Define getters/setters example:
    class MyMixin
      included: ->
        @getter foo: -> @_foo
        @setter foo: (v) -> @_foo = v
  
  NOTE! This will NOT include any properties you defined with getter or setter!
  NOTE! This only copies over values if there aren't already values in the included-into class
    This somewhat mirrors Ruby's include where the included-into-class's methods take precidence.
    However, if you include two modules in a row, the first module gets priority here.
    In ruby the second module gets priority (I believe).
  
  DEPRICATED!!!
  Time to do it "right" - and it's just a simple pattern:
    Justin Fagnani figured this out. Thanks!
    Read More:
      http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
  
  To define a mixin:
  
    MyMixin = (superClass) ->
      class MyMixin extends superClass
        ... write your mixin as-if it were part of the normal inheritance hierachy
  
  To use a mixin:
  
    class MyClass extends MyMixin MySuperClass
  
  To use two mixins:
  
    class MyClass extends MyMixin1 MyMixin2 MySuperClass
   */

  warnedAboutIncludeOnce = false;

  BaseClass.include = function(obj) {
    var key, ref, value;
    log.error("DEPRICATED: BaseClass.include. Use pattern.");
    if (!warnedAboutIncludeOnce) {
      warnedAboutIncludeOnce = true;
      console.warn("Mixin pattern:\n\n  To define a mixin:\n\n    MyMixin = (superClass) ->\n      class MyMixin extends superClass\n        ... write your mixin as-if it were part of the normal inheritance hierachy\n\n  To use a mixin:\n\n    class MyClass extends MyMixin MySuperClass\n\n  To use two mixins:\n\n    class MyClass extends MyMixin1 MyMixin2 MySuperClass");
    }
    for (key in obj) {
      value = obj[key];
      if (key !== 'included') {
        if (!this[key]) {
          this[key] = value;
        }
      }
    }
    ref = obj.prototype;
    for (key in ref) {
      value = ref[key];
      if (key) {
        if (!this.prototype[key]) {
          this.prototype[key] = value;
        }
      }
    }
    if (typeof obj.included === "function") {
      obj.included(this);
    }
    return this;
  };

  BaseClass.getNamespacePath = function() {
    if (!this.namespacePath) {
      return "parentNamespaceNotSet." + (this.getName());
    } else {
      return this.namespacePath;
    }
  };

  BaseClass.getNamespacePathWithExtendsInfo = function() {
    var ref, ref1, ref2, ref3;
    if (!this.namespacePath || ((ref = this.__super__) != null ? (ref1 = ref["class"]) != null ? ref1.namespacePath : void 0 : void 0) === this.namespacePath) {
      return this.namespacePath = ((ref2 = (ref3 = this.namespace) != null ? ref3.namespacePath : void 0) != null ? ref2 : '(no parent namespace)') + "." + (this.getName()) + " extends " + (this.__super__["class"].getNamespacePath());
    } else {
      return this.namespacePath;
    }
  };

  BaseClass.getClassName = function(klass) {
    if (klass == null) {
      klass = this;
    }
    return (typeof klass.getName === "function" ? klass.getName() : void 0) || klass.name;
  };


  /*
  inspect: ->
  IN: ()
  OUT: string
  
  Can override with same or alternate, recursion-block-supported signature:
    IN: (inspector) ->
    OUT: if inspector then null else string
  
    To handle the case where the inspector is not set, we
    recommneded declaring your 'inspect' as follows:
      inspect: (inspector) ->
        return StandardLib.inspect @ unless inspector
         * ...
         * custom code which writes all output to inspector.put
         * and uses inspector.inspect for inspecting sub-objects
         * ...
        null
  
    EFFECT:
      call inspector.put one or multiple times with strings to add to the inspected output
      call inspector.inspect foo to sub-inspect other objects WITH RECURSION BLOCK
  
   * Example 1:
  inspect: (inspector) ->
    return StandardLib.inspect @ unless inspector
    inspector.put @getNamespacePath()
  
   * Example 2:
  inspect: ->
    @getNamespacePath()
   */

  BaseClass.inspect = function() {
    return this.getNamespacePath();
  };

  BaseClass.prototype.inspect = function() {
    return "<" + this["class"].namespacePath + ">";
  };


  /*
  getInspectedObjects: -> plainObjects
  
  usually implemented this way:
  @getter inspectedObjects: -> plainObjects or objects which implement "inspect"
  
  TODO: I think I want to refactor inspectedObjects to ONLY return near-JSON-compatible objects:
    1. strings
    2. maps
    3. arrays
  
    Everything else should be rendered to a string. In general, strings should Eval to the object
    they represent:
  
      toInspectedObject(null):                    'null' # null becomes a string
      toInspectedObject(true):                    'true' # true becomes a string
      toInspectedObject(false):                   'false' # false becomes a string
      toInspectedObject(undefined):               'undefined' # undefined becomes a string
      toInspectedObject('hi'):                    '"hi"' # ESCAPED
      toInspectedObject((a) -> a):                'function(a){return a;}'
      toInspectedObject(rgbColor())               "rgbColor('#000000')"
  
    NOTE: inspectedObjects differs from plainObjects. The latter should be 100% JSON,
      and should return actual values where JSON allows, otherwise, return JSON data structures
      that encode the object's information in a human-readable format, ideally one that can be
      used as an input to the constructor of the object's class to recreate the original object.
  
      plainObjects:
        null:         null
        true:         true
        false:        false
        'str':        'str' # NOT escaped
        undefined:    null
        ((a) -> a):   'function(a){return a;}'
        rgbColor():   r: 0, g: 0, b: 0, a: 0
  
  You can provide this function for fine-grained control of what Inspector2 outputs and hence
  what DomConsole displays.
  
  If you would like for a string to appear without quotes, use:
    {inspect: -> 'your string without quotes here'}
   */

  BaseClass.getter({
    inspectObjects: function() {
      console.warn("inspectObjects/getInspectObjects is DEPRICATED. Use: inspectedObjects/getInspectedObjects");
      return this.getInspectedObjects();
    },
    inspectedObjects: function() {
      var ref;
      return inspectedObjectLiteral("<" + ((ref = this["class"]) != null ? ref.getNamespacePath() : void 0) + ">");
    }
  });

  BaseClass.classGetter({
    inspectedObjects: function() {
      return inspectedObjectLiteral(this.getNamespacePath());
    }
  });


  /*
  Define this class as an abstract class. Implicitly it means
  any class it extends is also abstract, at least in this context.
  
  Definition: Abstract classes are not intended to every be instantiated.
    i.e.: never do: new MyAbstractClass
  
  TODO: in Debug mode, in the constructor:
    throw new Error "cannot instantiate abstract classes" if @class.getIsAbstractClass()
   */

  BaseClass.abstractClass = function() {
    if (this.getIsSingletonClass()) {
      throw new Error("abstract classes cannot also be singleton");
    }
    return this._firstAbstractAncestor = this;
  };

  BaseClass.classGetter({
    isAbstractClass: function() {
      return !(this.prototype instanceof this._firstAbstractAncestor);
    },
    abstractPrototype: function() {
      return this._firstAbstractAncestor.prototype;
    },
    firstAbstractAncestor: function() {
      return this._firstAbstractAncestor;
    },
    isSingletonClass: function() {
      var ref;
      return ((ref = this._singleton) != null ? ref["class"] : void 0) === this;
    },
    concretePrototypeProperties: function() {
      var abstractClassPrototype;
      abstractClassPrototype = this.getAbstractClass().prototype;
      return object(this.prototype, {
        when: function(v, k) {
          return k !== "constructor" && abstractClassPrototype[k] !== v;
        }
      });
    }
  });

  BaseClass.getAbstractClass = function() {
    return this._firstAbstractAncestor;
  };

  BaseClass.abstractClass();

  BaseClass.propertyIsAbstract = function(propName) {
    return this.getAbstractClass().prototype[propName] === this.prototype[propName];
  };

  BaseClass.propertyIsConcrete = function(propName) {
    return this.getAbstractClass().prototype[propName] !== this.prototype[propName];
  };


  /*
  SBD2017: this is the new path for singleton classes.
  WHY: We can elliminate the need to DECLARE classes singleton.
    Instead, we can just access the singleton for any class, if needed.
  TODO: once we are 100% CaffeineScript, switch this to a @classGetter
   */

  BaseClass.getSingleton = getSingleton = function() {
    var ref;
    if (((ref = this._singleton) != null ? ref["class"] : void 0) === this) {
      return this._singleton;
    } else {
      if (this.getIsAbstractClass()) {
        throw new Error("singleton classes cannot be abstract");
      }
      return this._singleton = new this;
    }
  };


  /*
  creates the classGetter "singleton" which returns a single instance of the current class.
  
  IN: args are passed to the singleton constructor
  OUT: null
  
  The singleton instance is created on demand the first time it is accessed.
  
  SBD2017: Possibly depricated; maybe we just need a singleton getter for everyone?
    The problem is coffeescript doesn't properly inherit class getters.
    BUT ES6 and CaffeineScript DO. So, when we switch over, I think we can do this.
   */

  BaseClass.singletonClass = function() {
    var obj1;
    if (this.getIsAbstractClass()) {
      throw new Error("singleton classes cannot be abstract");
    }
    this.classGetter((
      obj1 = {
        singleton: getSingleton
      },
      obj1["" + (decapitalize(functionName(this)))] = function() {
        return this.getSingleton();
      },
      obj1
    ));
    return null;
  };

  BaseClass.getter({
    className: function() {
      return this["class"].getClassName();
    },
    "class": function() {
      return this.constructor;
    },
    keys: function() {
      return Object.keys(this);
    },
    namespacePath: function() {
      return this["class"].getNamespacePath();
    },
    classPathNameAndId: function() {
      return this.classPathName + ":" + this.objectId;
    },
    uniqueId: function() {
      return this.__uniqueId || (this.__uniqueId = nextUniqueObjectId());
    },
    objectId: function() {
      return this.__uniqueId || (this.__uniqueId = nextUniqueObjectId());
    }
  });

  BaseClass.prototype.implementsInterface = function(methods) {
    return Function.BaseClass.implementsInterface(this, methods);
  };

  BaseClass.prototype.tap = function(f) {
    f(this);
    return this;
  };

  return BaseClass;

})(ExtendablePropertyMixin(MinimalBaseObject));


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.StandardLib : void 0 : void 0) != null ? ref : __webpack_require__(73);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var AsyncExtensions, Promise, toSeconds;

Promise = __webpack_require__(8);

toSeconds = __webpack_require__(24).toSeconds;

module.exports = AsyncExtensions = (function() {
  var interval, timeout;

  function AsyncExtensions() {}

  AsyncExtensions.timeout = timeout = function(ms, f) {
    var p;
    p = new Promise(function(resolve) {
      return setTimeout(resolve, ms);
    });
    if (f != null) {
      return p.then(f);
    } else {
      return p;
    }
  };

  AsyncExtensions.timeoutAt = function(second, f) {
    return timeout((second - toSeconds()) * 1000, f);
  };

  AsyncExtensions.interval = interval = function(ms, f) {
    var intervalId, p;
    if (f == null) {
      f = function() {};
    }
    intervalId = null;
    p = new Promise(function(resolve) {
      return intervalId = setInterval(function() {
        return Promise.then(f).then(function() {
          return resolve();
        });
      }, ms);
    });
    p.stop = function() {
      if (intervalId != null) {
        return clearInterval(intervalId);
      }
    };
    return p;
  };

  AsyncExtensions.requestAnimationFrame = self.requestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.oRequestAnimationFrame || self.msRequestAnimationFrame || function(f) {
    return setTimeout(f, 1000 / 60);
  };

  AsyncExtensions.nextTick = function(f) {
    return Promise.resolve().then(function() {
      return typeof f === "function" ? f() : void 0;
    });
  };

  AsyncExtensions.throwErrorOutOfStack = function(e) {
    console.log(e);
    return timeout(0, function() {
      throw e;
    });
  };

  AsyncExtensions.evalAndThrowErrorsOutOfStack = function(f) {
    var e;
    try {
      return f();
    } catch (error) {
      e = error;
      Neptune.Art.StandardLib.log.error("evalAndThrowErrorsOutOfStack", e);
      return AsyncExtensions.throwErrorOutOfStack(e);
    }
  };

  return AsyncExtensions;

})();


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var CallStack, inspect, isString, parseUrl;

isString = __webpack_require__(0).isString;

parseUrl = __webpack_require__(19).parseUrl;

inspect = __webpack_require__(2).inspect;

module.exports = CallStack = (function() {
  var CallStackLine;

  function CallStack() {}

  CallStack.errorToString = function(error) {
    return (error != null ? error.error : void 0) || (error != null ? error.message : void 0) || (isString(error) && error) || Neptune.Art.StandardLib.formattedInspect(error);
  };

  CallStack.CallStackLine = CallStackLine = (function() {
    CallStackLine.getter = function(map) {
      var getter, prop, results;
      results = [];
      for (prop in map) {
        getter = map[prop];
        results.push(Object.defineProperty(this.prototype, prop, {
          get: getter,
          configurable: true
        }));
      }
      return results;
    };

    CallStackLine.setter = function(map) {
      var prop, results, setter;
      results = [];
      for (prop in map) {
        setter = map[prop];
        results.push(Object.defineProperty(this.prototype, prop, {
          set: setter,
          configurable: true
        }));
      }
      return results;
    };

    function CallStackLine(line) {
      this.original = line;
      this["function"] = null;
      this.source = null;
      this["class"] = null;
      this.classPath = null;
      this.sourceFileName = null;
      this.sourcePath = null;
      this.sourceHostWithPort = null;
      this.sourceLine = 0;
      this.sourceColumn = 0;
      if (this.parseLineWithFunction(line)) {

      } else {
        this.parseLineWithoutFunction(line);
      }
      this.subParseFunction();
      this.subParseSource();
    }

    CallStackLine.prototype.toString = function() {
      return this.original;
    };

    CallStackLine.getter({
      fileWithLocation: function() {
        return this._fileWithLocation || (this._fileWithLocation = this.sourceFileName ? this.sourcePath + "/" + this.sourceFileName + ":" + this.sourceLine + ":" + this.sourceColumn : this.original);
      }
    });

    CallStackLine.prototype.parseLineWithFunction = function(line) {
      var r;
      if (r = line.match(/\s*at\s((new\s)?[a-zA-Z0-9_.<>]+)\s\(([^)]*):([0-9]+):([0-9]+)\)/)) {
        this["function"] = r[1];
        this.source = r[3];
        this.sourceLine = r[4] | 0;
        return this.sourceColumn = r[5] | 0;
      }
    };

    CallStackLine.prototype.parseLineWithoutFunction = function(line) {
      var r;
      if (r = line.match(/\s*at\s([^)]*):([0-9]+):([0-9]+)/)) {
        this.source = r[1];
        this.sourceLine = r[2] | 0;
        return this.sourceColumn = r[3] | 0;
      }
    };

    CallStackLine.prototype.subParseSource = function() {
      var url;
      if (this.source) {
        url = parseUrl(this.source);
        this.sourceFileName = url.fileName;
        this.sourcePath = url.path;
        return this.sourceHostWithPort = url.hostWithPort;
      }
    };

    CallStackLine.prototype.subParseFunction = function() {
      var f;
      if (this["function"]) {
        f = this["function"].split(".");
        this["function"] = f[f.length - 1];
        if (this["function"] === "<anonymous>") {
          this["function"] = void 0;
        }
        this["class"] = f[f.length - 2];
        return this.classPath = f.slice(0, f.length - 2);
      }
    };

    return CallStackLine;

  })();

  CallStack.rawCallStack = (new Error).stack ? function(ignoreTop) {
    if (ignoreTop == null) {
      ignoreTop = 0;
    }
    return (new Error).stack.split(/\n  */).slice(ignoreTop + 2);
  } : function(ignoreTop) {
    var e;
    if (ignoreTop == null) {
      ignoreTop = 0;
    }
    try {
      throw new Error;
    } catch (error1) {
      e = error1;
      return e.stack.split(/\n  */).slice(ignoreTop + 2);
    }
  };

  CallStack.callStack = function(ignoreTop) {
    var i, len, line, ref, results;
    if (ignoreTop == null) {
      ignoreTop = 0;
    }
    ref = CallStack.rawCallStack(ignoreTop + 1);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      results.push(new CallStackLine(line));
    }
    return results;
  };

  return CallStack;

})();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var dateFormat, formattedInspect, isDate, isNumber, isString, march1973InMilliseconds, ref, toDate, toMilliseconds;

ref = __webpack_require__(6), isString = ref.isString, isNumber = ref.isNumber, isDate = ref.isDate;

formattedInspect = __webpack_require__(2).formattedInspect;

march1973InMilliseconds = 100000000000;

module.exports = {
  dateFormat: dateFormat = __webpack_require__(52),
  formatDate: function(value, format) {
    if (isString(value)) {
      format = value;
      value = null;
    }
    return dateFormat(toDate(value), format);
  },

  /*
  IN:
    v:
      Date
      OR Number of Seconds since epoch-start
      OR Number of Milliseconds since epoch-start
      OR String:
        if contains only digets with optional decimial
          examples:
            "123"
            "123.456"
  
          toMilliseconds v - 0
  
        else
          toMilliseconds Date.parse v
  OUT:
    Number of Milliseconds since epoch-start
   */
  toMilliseconds: toMilliseconds = function(v) {
    if (v == null) {
      return Date.now();
    }
    if (isString(v)) {
      if (/^\d+(\.\d+)?$/.test(v)) {
        v = v - 0;
      } else {
        v = Date.parse(v);
      }
    }
    if (isNumber(v)) {
      if (v < march1973InMilliseconds) {
        return v * 1000;
      } else {
        return v;
      }
    } else if (isDate(v)) {
      return v - 0;
    } else {
      throw new Error("invalid timestamp value: " + (formattedInspect(v)));
    }
  },

  /*
  IN:
    Date
    OR Number of Seconds since epoch-start
    OR Number of Milliseconds since epoch-start
  OUT:
    Number of Seconds since epoch-start
   */
  toSeconds: function(v) {
    if (v == null) {
      return Date.now() / 1000;
    }
    return (toMilliseconds(v) / 1000 + .5) | 0;
  },
  toDate: toDate = function(v) {
    if (v == null) {
      return new Date;
    }
    if (isDate(v)) {
      return v;
    } else {
      return new Date(toMilliseconds(v));
    }
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var Eq, floatTrue0, isNumber, isString, min, objectKeyCount, ref, remove,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

remove = __webpack_require__(11).remove;

objectKeyCount = __webpack_require__(13).objectKeyCount;

floatTrue0 = __webpack_require__(7).floatTrue0;

ref = __webpack_require__(0), isString = ref.isString, isNumber = ref.isNumber;

min = Math.min;

module.exports = Eq = (function() {
  var plainObjectsDeepDiff, plainObjectsDeepEq;

  function Eq() {}


  /*
  IN: see @compare
  OUT:
    true: if a and b are structurally equal
    false: otherwise
   */

  Eq.eq = function(a, b) {
    return 0 === Eq.compare(a, b, true);
  };

  Eq.neq = function(a, b) {
    return 0 !== Eq.compare(a, b, true);
  };

  Eq.fastEq = function(a, b) {
    return 0 === Eq.compare(a, b, false);
  };

  Eq.fastNeq = function(a, b) {
    return 0 !== Eq.compare(a, b, false);
  };

  Eq._compareArray = function(a, b, recursionBlockArray) {
    var aLength, av, bLength, bv, i, j, ref1, val;
    aLength = a.length;
    bLength = b.length;
    for (i = j = 0, ref1 = Math.min(aLength, bLength); j < ref1; i = j += 1) {
      av = a[i];
      bv = b[i];
      if (0 !== (val = Eq._compare(av, bv, recursionBlockArray))) {
        return val;
      }
    }
    return aLength - bLength;
  };

  Eq._compareObject = function(a, b, recursionBlockArray) {
    var aLength, av, bv, compared, k, val;
    aLength = 0;
    compared = 0;
    for (k in a) {
      av = a[k];
      aLength++;
      av = a[k];
      bv = b[k];
      if (bv !== void 0 || b.hasOwnProperty(k)) {
        compared++;
        if (0 !== (val = Eq._compare(av, bv, recursionBlockArray))) {
          return val;
        }
      }
    }
    if (aLength === compared && compared === objectKeyCount(b)) {
      return 0;
    } else {
      return 0/0;
    }
  };


  /*
  compare is recursive. However, it only recurses for 'plain' objects and arrays.
  
  If you want to compare custom objects deeply, you must add an .eq or .compare function to your custom objects.
    signature: a.eq b, recursionBlockArray => truthy if a equals b
    signature: a.compare b, recursionBlockArray => NaN / <0 / 0 / >0 for incomparable / a<b / a==b / a>b respectively
    IN:
      a: => this/@
      b: compared with a
      recursionBlockArray: an array of objects already on the stack being tested, pass this to
    It is an array of every object recursively currently being tested - don't test an object in this array
    recursionBlockArray can be altered, but should be returned in its original state. It may be null.
  
  IN:
    a and b: compare a and b
    recursionBlockEnabled:
      truthy: recursive structures will be handled correctly
      falsey: (default) faster, but recursive structures result in infinite recursion
  OUT:
    NaN:
      a and b are different types
      a and b are otherwise not comparable
  
    <0: a < b
    0:  a == b
    >0: a > b
   */

  Eq.compare = function(a, b, recursionBlockEnabled) {
    return Eq._compare(a, b, recursionBlockEnabled && []);
  };

  Eq._compare = function(a, b, recursionBlockArray) {
    var _constructor;
    if (a === b) {
      return 0;
    }
    if ((a != null) && (b != null) && a.constructor === (_constructor = b.constructor)) {
      if (isString(a)) {
        return a.localeCompare(b);
      }
      if (isNumber(a)) {
        return floatTrue0(a - b);
      }
      if (recursionBlockArray) {
        if (indexOf.call(recursionBlockArray, a) >= 0 || indexOf.call(recursionBlockArray, b) >= 0) {
          return 0;
        }
        recursionBlockArray.push(a);
        recursionBlockArray.push(b);
      }
      if (a.compare) {
        return a.compare(b, recursionBlockArray);
      }
      if (_constructor === Array) {
        return Eq._compareArray(a, b, recursionBlockArray);
      }
      if (_constructor === Object) {
        return Eq._compareObject(a, b, recursionBlockArray);
      }
      if (a.eq && a.eq(b, recursionBlockArray)) {
        return 0;
      }
      if (recursionBlockArray) {
        remove(recursionBlockArray, recursionBlockArray.length - 2, 2);
      }
    }
    return 0/0;
  };

  Eq.plainObjectsDeepEqArray = function(a, b) {
    var av, i, j, len1;
    if (a.length !== b.length) {
      return false;
    }
    for (i = j = 0, len1 = a.length; j < len1; i = ++j) {
      av = a[i];
      if (!Eq.plainObjectsDeepEq(av, b[i])) {
        return false;
      }
    }
    return true;
  };

  Eq.plainObjectsDeepEqObject = function(a, b) {
    var aLength, av, bv, k;
    aLength = 0;
    for (k in a) {
      av = a[k];
      aLength++;
      bv = b[k];
      if (!((bv !== void 0 || b.hasOwnProperty(k)) && Eq.plainObjectsDeepEq(av, bv))) {
        return false;
      }
    }
    return aLength === objectKeyCount(b);
  };

  Eq.plainObjectsDeepEq = plainObjectsDeepEq = function(a, b) {
    var _constructor;
    if (a === b) {
      return true;
    } else if (a && b && a.constructor === (_constructor = b.constructor)) {
      if (a.eq) {
        return a.eq(b);
      } else if (_constructor === Array) {
        return Eq.plainObjectsDeepEqArray(a, b);
      } else if (_constructor === Object) {
        return Eq.plainObjectsDeepEqObject(a, b);
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  Eq.propsEq = plainObjectsDeepEq;

  Eq.plainObjectsDeepDiffArray = function(before, after) {
    var diff, i, j, l, len, m, ref1, ref2, ref3, ref4, ref5, res;
    res = null;
    len = min(before.length, after.length);
    for (i = j = 0, ref1 = len; 0 <= ref1 ? j < ref1 : j > ref1; i = 0 <= ref1 ? ++j : --j) {
      if (!(diff = plainObjectsDeepDiff(before[i], after[i]))) {
        continue;
      }
      res || (res = {});
      res[i] = diff;
    }
    if (len < before.length) {
      for (i = l = ref2 = len, ref3 = before.length; ref2 <= ref3 ? l < ref3 : l > ref3; i = ref2 <= ref3 ? ++l : --l) {
        res || (res = {});
        res[i] = {
          removed: before[i]
        };
      }
    }
    if (len < after.length) {
      for (i = m = ref4 = len, ref5 = after.length; ref4 <= ref5 ? m < ref5 : m > ref5; i = ref4 <= ref5 ? ++m : --m) {
        res || (res = {});
        res[i] = {
          added: after[i]
        };
      }
    }
    return res;
  };

  Eq.plainObjectsDeepDiffObject = function(before, after) {
    var afterV, beforeV, diff, k, res;
    res = null;
    for (k in before) {
      beforeV = before[k];
      if (after.hasOwnProperty(k)) {
        if (diff = plainObjectsDeepDiff(beforeV, after[k])) {
          res || (res = {});
          res[k] = diff;
        }
      } else {
        res || (res = {});
        res[k] = {
          removed: beforeV
        };
      }
    }
    for (k in after) {
      afterV = after[k];
      if (!(!before.hasOwnProperty(k))) {
        continue;
      }
      res || (res = {});
      res[k] = {
        added: afterV
      };
    }
    return res;
  };

  Eq.plainObjectsDeepDiff = plainObjectsDeepDiff = function(before, after) {
    var _constructor;
    if (before === after) {
      return null;
    } else if (before && after && before.constructor === (_constructor = after.constructor)) {
      if (before.eq) {
        if (before.eq(after)) {
          return null;
        } else {
          return {
            before: before,
            after: after
          };
        }
      } else if (_constructor === Array) {
        return Eq.plainObjectsDeepDiffArray(before, after);
      } else if (_constructor === Object) {
        return Eq.plainObjectsDeepDiffObject(before, after);
      } else {
        return {
          before: before,
          after: after
        };
      }
    } else {
      return {
        before: before,
        after: after
      };
    }
  };

  Eq.diff = plainObjectsDeepDiff;

  Eq.shallowEq = function(a, b) {
    return a === b || (a && b && a.eq && a.eq(b));
  };

  return Eq;

})();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var InspectedObjects, dateFormat, deepMap, escapeJavascriptString, inspectedObjectLiteral, isClass, isDate, isFunction, isNonNegativeInt, isPlainArray, isPlainObject, isPromise, isRegExp, isString, ref;

ref = __webpack_require__(0), isDate = ref.isDate, deepMap = ref.deepMap, isNonNegativeInt = ref.isNonNegativeInt, isClass = ref.isClass, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isString = ref.isString, isFunction = ref.isFunction, isPromise = ref.isPromise, isRegExp = ref.isRegExp;

escapeJavascriptString = __webpack_require__(4).escapeJavascriptString;

inspectedObjectLiteral = __webpack_require__(15).inspectedObjectLiteral;

dateFormat = __webpack_require__(52);

module.exports = InspectedObjects = (function() {
  var toInspectedObjects;

  function InspectedObjects() {}

  InspectedObjects.toInspectedObjects = toInspectedObjects = function(m) {
    var functionString, literal, oldm, out, reducedFunctionString;
    if (m == null) {
      return m;
    }
    oldm = m;
    if (m === global) {
      return inspectedObjectLiteral("global");
    } else if (out = typeof m.getInspectedObjects === "function" ? m.getInspectedObjects() : void 0) {
      return out;
    } else if (isPromise(m)) {
      return inspectedObjectLiteral("Promise");
    } else if (isPlainObject(m) || isPlainArray(m)) {
      return deepMap(m, function(v) {
        return toInspectedObjects(v);
      });
    } else if (m instanceof Error) {
      literal = inspectedObjectLiteral(m.stack || m.toString(), true);
      if (m.info) {
        return toInspectedObjects({
          Error: {
            info: m.info,
            stack: literal
          }
        });
      } else {
        return {
          Error: {
            "class": toInspectedObjects(m.constructor),
            stack: literal
          }
        };
      }
    } else if (isRegExp(m)) {
      return inspectedObjectLiteral("" + m);
    } else if (isDate(m)) {
      return inspectedObjectLiteral(dateFormat(m, "UTC:yyyy-mm-dd HH:MM:ss Z"));
    } else if (isClass(m)) {
      return inspectedObjectLiteral("<" + ((typeof m.getName === "function" ? m.getName() : void 0) || m.name) + ">");
    } else if (isFunction(m)) {
      functionString = "" + m;
      reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
      return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
    } else if (m && !isString(m)) {
      if (isNonNegativeInt(m.length)) {
        return inspectedObjectLiteral("{" + m.constructor.name + " length: " + m.length + "}");
      } else if (isNonNegativeInt(m.byteLength)) {
        return inspectedObjectLiteral("{" + m.constructor.name + " byteLength: " + m.byteLength + "}");
      } else {
        return m;
      }
    } else {
      return m;
    }
  };

  return InspectedObjects;

})();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var Inspector, Map, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, objectName, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Map = __webpack_require__(18);

escapeJavascriptString = __webpack_require__(4).escapeJavascriptString;

ref = __webpack_require__(0), objectName = ref.objectName, isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isClass = ref.isClass, isBrowserObject = ref.isBrowserObject, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray;

module.exports = Inspector = (function() {
  var inspect;

  Inspector.unquotablePropertyRegex = /^([0-9]+|[_a-zA-Z][_0-9a-zA-Z]*)$/;

  Inspector.customInspectable = function(obj) {
    return obj.inspect && !(typeof obj === "function");
  };

  Inspector.parentString = function(distance) {
    switch (distance) {
      case 0:
        return "parent";
      case 1:
        return "grandparent";
      case 2:
        return "great grandparent";
      default:
        return "great^" + (distance - 1) + " grandparent";
    }
  };

  function Inspector(options) {
    if (options == null) {
      options = {};
    }
    this.inspect = bind(this.inspect, this);
    this.inspectInternal = bind(this.inspectInternal, this);
    this.inspectObject = bind(this.inspectObject, this);
    this.inspectArray = bind(this.inspectArray, this);
    this.maxLength = options.maxLength || 10000;
    this.allowCustomInspectors = !options.noCustomInspectors;
    this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
    this.outArray = [];
    this.length = 0;
    this.depth = 0;
    this.inspectingMap = new Map;
    this.done = false;
  }

  Inspector.inspect = inspect = function(obj, options) {
    var inspector;
    if (options == null) {
      options = {};
    }
    if (this !== global) {
      return Neptune.Base.inspect.call(this);
    }
    inspector = new Inspector(options);
    inspector.inspect(obj);
    return inspector.getResult();
  };

  Inspector.shallowInspect = function(obj) {
    if (obj == null) {
      return "" + obj;
    } else if (Inspector.customInspectable(obj)) {
      return Inspector.inspect(obj);
    } else if (isString(obj)) {
      return escapeJavascriptString(obj);
    } else if (isArray(obj)) {
      return "<<Array length: " + obj.length + ">>";
    } else if (isFunction(obj) && obj.name === "") {
      return "<<function args: " + obj.length + ">>";
    } else {
      return "<<" + (typeof obj) + ": " + (obj.name || obj) + ">>";
    }
  };

  Inspector.inspectLean = function(object, options) {
    var fullInspect, match;
    fullInspect = inspect(object, options);
    if (!isFunction(object != null ? object.inspect : void 0) && (isPlainObject(object) || (isPlainArray(object) && (object.length > 1 || (options != null ? options.forArgs : void 0))))) {
      match = fullInspect.match(/^\[(.+)\]$|^\{(.+)\}$/);
      if (match) {
        return match[1] || match[2] || match[3];
      } else {
        return fullInspect;
      }
    } else {
      return fullInspect;
    }
  };

  Inspector.prototype.put = function(s) {
    var remaining;
    if (this.done) {
      return;
    }
    if (this.length + s.length > this.maxLength) {
      this.done = true;
      remaining = this.maxLength - this.length;
      s = (s.slice(0, remaining)) + "<... first " + remaining + "/" + s.length + ">";
    }
    this.length += s.length;
    this.outArray.push(s);
    return s;
  };

  Inspector.prototype.getResult = function() {
    return this.outArray.join("");
  };

  Inspector.prototype.maxDepthOutput = function(obj) {
    var keys, name;
    switch (typeof obj) {
      case "string":
      case "number":
      case "boolean":
      case "undefined":
        return this.inspectInternal(obj);
      case "function":
        return this.put(objectName(obj));
      case "object":
        return this.put(obj === null ? "null" : isArray(obj) ? "[" + obj.length + " elements]" : (keys = Object.keys(obj), name = objectName(obj), name === "Object" ? "{" + keys.length + " keys}" : keys.length > 0 ? "{" + name + " " + keys.length + " keys}" : name));
    }
  };

  Inspector.prototype.inspectArray = function(array) {
    var first, i, len, obj;
    this.put("[");
    first = true;
    for (i = 0, len = array.length; i < len; i++) {
      obj = array[i];
      if (!first) {
        this.put(", ");
      }
      this.inspect(obj);
      first = false;
    }
    return this.put("]");
  };

  Inspector.prototype.inspectObject = function(obj) {
    var attributes, first, i, k, keys, len, name, v;
    attributes = [];
    keys = Object.keys(obj);
    name = objectName(obj);
    if (isFunction(obj) && keys.length === 0) {
      return this.put(name + "()");
    } else if (isBrowserObject(obj)) {
      return this.put("{" + name + "}");
    } else {
      this.put("{");
      if (obj.constructor !== Object) {
        this.put(name + " ");
      }
      first = true;
      for (i = 0, len = keys.length; i < len; i++) {
        k = keys[i];
        if (!(k !== "__uniqueId")) {
          continue;
        }
        if (!first) {
          this.put(", ");
        }
        v = obj[k];
        if (Inspector.unquotablePropertyRegex.test(k)) {
          this.put(k);
        } else {
          this.inspect(k);
        }
        this.put(": ");
        this.inspect(v);
        first = false;
      }
      return this.put("}");
    }
  };

  Inspector.prototype.inspectInternal = function(obj) {
    if (obj == null) {
      return this.put("" + obj);
    } else if (isString(obj)) {
      return this.put(escapeJavascriptString(obj));
    } else if (isArray(obj)) {
      return this.inspectArray(obj);
    } else if (isClass(obj)) {
      return this.put(objectName(obj));
    } else if (this.allowCustomInspectors && Inspector.customInspectable(obj)) {
      if (obj.inspect.length > 0) {
        return obj.inspect(this);
      } else {
        return this.put(obj.inspect());
      }
    } else if (obj instanceof RegExp) {
      return this.put("" + obj);
    } else if (isObject(obj) || isFunction(obj)) {
      return this.inspectObject(obj);
    } else if (isFunction(obj != null ? obj.toString : void 0)) {
      return this.put(obj.toString());
    } else {
      return this.put("" + obj);
    }
  };

  Inspector.prototype.inspect = function(obj) {
    var objDepth;
    if (this.done) {
      return;
    }
    if (objDepth = this.inspectingMap.get(obj)) {
      this.put("<" + (Inspector.parentString(this.depth - objDepth)) + ">");
      return null;
    }
    if (this.depth >= this.maxDepth) {
      this.maxDepthOutput(obj);
    } else {
      this.depth++;
      this.inspectingMap.set(obj, this.depth);
      this.inspectInternal(obj);
      this.inspectingMap["delete"](obj);
      this.depth--;
    }
    return null;
  };

  return Inspector;

})();


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Inspect, Log, callStack, containsPromises, deepResolve, disableLog, getEnv, isNode, isString, merge, peek, ref, ref1,
  slice = [].slice;

Inspect = __webpack_require__(16);

callStack = __webpack_require__(23).callStack;

isString = __webpack_require__(0).isString;

peek = __webpack_require__(11).peek;

merge = __webpack_require__(1).merge;

ref = __webpack_require__(8), deepResolve = ref.deepResolve, containsPromises = ref.containsPromises;

ref1 = __webpack_require__(12), isNode = ref1.isNode, getEnv = ref1.getEnv;

disableLog = getEnv().disableLog;

module.exports = Log = (function() {
  var getLogger, noOptions, promiseLogId, standardOptions;

  function Log() {}

  Log.contextString = function(stack, defaultContext) {
    var caller, context;
    if (stack && (caller = stack[1])) {
      if (caller.original) {
        return caller.original;
      } else {
        context = caller["function"] ? caller["class"] ? caller["class"] + "::" + caller["function"] + "()" : caller["function"] + "()" : defaultContext ? defaultContext + ":" : "";
        if (caller.sourceFileName) {
          return "at " + caller.sourceFileName + ("-" + caller.sourceLine + ": ") + context;
        }
      }
    } else {
      return "at " + (defaultContext || "(unknown context)");
    }
  };

  Log.autoSizedIndepect = function(toInspect, maxLength, maxDepth) {
    var depth, inspected;
    if (maxLength == null) {
      maxLength = 512;
    }
    if (maxDepth == null) {
      maxDepth = 10;
    }
    inspected = null;
    depth = maxDepth;
    while ((inspected = Inspect.inspectLean(toInspect, {
        maxDepth: depth,
        maxLength: maxLength
      })).match(/\.\.\.$/)) {
      depth--;
    }
    return inspected;
  };

  Log.loggedParamsString = function(params) {
    if (typeof params === "string") {
      return params;
    } else {
      return Log.autoSizedIndepect(params);
    }
  };

  Log.hideLogging = function() {
    return Log.loggingHidden = true;
  };

  Log.showLogging = function() {
    return Log.loggingHidden = false;
  };

  Log.rawLog = function() {
    if (!Log.loggingHidden) {
      return console.log.apply(console, arguments);
    }
  };

  Log.rawErrorLog = function() {
    var a, out, str;
    if (Log.loggingHidden) {
      return;
    }
    if (isNode && "".red) {
      str = arguments.length > 1 ? (out = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          a = arguments[i];
          results.push(a);
        }
        return results;
      }).apply(Log, arguments), out.join(' ')) : arguments[0];
      return console.error(str.red);
    } else {
      return console.error.apply(console, arguments);
    }
  };

  Log.rawWarningLog = function() {
    var a, out, str;
    if (Log.loggingHidden) {
      return;
    }
    if (isNode && "".red) {
      str = arguments.length > 1 ? (out = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          a = arguments[i];
          results.push(a);
        }
        return results;
      }).apply(Log, arguments), out.join(' ')) : arguments[0];
      return console.warn(str.yellow);
    } else {
      return console.warn.apply(console, arguments);
    }
  };

  noOptions = {};

  getLogger = function(arg) {
    var isError, isWarning;
    isError = arg.isError, isWarning = arg.isWarning;
    if (isError) {
      return Log.rawErrorLog;
    } else if (isWarning) {
      return Log.rawWarningLog;
    } else {
      return Log.rawLog;
    }
  };

  promiseLogId = 1;

  Log.logCore = function(m, stack, options) {
    if (options == null) {
      options = noOptions;
    }
    if (Log.alternativeLogger) {
      Log.alternativeLogger.logCore(m, stack, options);
    }
    if (options.resolvePromises) {
      return Log.log.resolvePromiseWrapper(m, function(toLog, label) {
        var obj1;
        return Log._logNow((
          obj1 = {},
          obj1["" + label] = toLog,
          obj1
        ), stack, options);
      });
    } else {
      return Log._logNow(m, stack, options);
    }
  };

  Log._logNow = function(m, stack, options) {
    var className, logger;
    className = options.className;
    logger = getLogger(options);
    if (isNode) {
      return logger(isString(m) ? m : Inspect.formattedInspect(m, merge({
        maxLineLength: process.stdout.columns
      }, options)));
    } else {
      return logger(m);
    }
  };

  standardOptions = (function() {
    if (isNode) {
      try {
        eval("require")("colors");
      } catch (error) {}
      return {
        color: true
      };
    } else {
      return {};
    }
  })();

  Log.log = function() {
    var args, ref2;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (disableLog) {
      return peek(args);
    } else {
      return (ref2 = Log.log).withOptions.apply(ref2, [standardOptions].concat(slice.call(args)));
    }
  };

  Log.log.resolvePromiseWrapper = function(m, logger) {
    var logId, toResolve;
    if (containsPromises(m)) {
      toResolve = m;
      logId = promiseLogId++;
      logger(m, "RESOLVING_" + logId, false);
      return deepResolve(toResolve).then((function(_this) {
        return function(resolvedM) {
          return logger(resolvedM, "RESOLVED_" + logId, true);
        };
      })(this))["catch"]((function(_this) {
        return function(rejected) {
          return logger(rejected, "REJECTED_" + logId, true, true);
        };
      })(this));
    } else {
      return logger(m, false);
    }
  };

  Log.log.withOptions = function() {
    var args, m, options;
    options = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    m = args.length === 1 ? args[0] : args;
    Log.logCore(m, callStack(), options);
    return peek(args);
  };


  /*
  
  IN:
    labelString, value
    OR object with one or more properties (usually just one)
      returns the last value of the objects last key-value pair
  
  EX:
    log.withLabel foo: myObject
     * out: myObject
  
    log.withLabel "foo", myObject
     * out: myObject
   */

  Log.log.withLabel = function(a, b) {
    var k, obj, ret, v;
    if (isString(a)) {
      obj = {};
      obj[a] = b;
      Log.log(obj);
      return b;
    } else {
      ret = null;
      for (k in a) {
        v = a[k];
        ret = v;
      }
      Log.log(obj);
      return ret;
    }
  };

  Log.log.labeled = Log.log.withLabel;

  Log.log.error = function() {
    var args, ref2;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref2 = Log.log).withOptions.apply(ref2, [{
      isError: true
    }].concat(slice.call(args)));
  };

  Log.log.warn = function() {
    var args, ref2;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref2 = Log.log).withOptions.apply(ref2, [{
      isWarning: true
    }].concat(slice.call(args)));
  };

  Log.logL = function(obj) {
    var k, ret, v;
    console.warn("DEPRICATED: logL. USE log.labeled");
    ret = null;
    for (k in obj) {
      v = obj[k];
      ret = v;
    }
    Log.log(obj);
    return ret;
  };

  return Log;

})();


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var Time, base, commaize, dateSecondMinusPerformanceSecond, initDateSecond, initPerformanceSecond;

commaize = __webpack_require__(7).commaize;

self.performance || (self.performance = {});

(base = self.performance).now || (base.now = self.performance.mozNow || self.performance.msNow || self.performance.oNow || self.performance.webkitNow || function() {
  return new Date().getTime();
});

initPerformanceSecond = self.performance.now() / 1000;

initDateSecond = new Date().getTime() / 1000;

dateSecondMinusPerformanceSecond = initDateSecond - initPerformanceSecond;

module.exports = Time = (function() {
  var currentSecond, multiples, timerStack;

  function Time() {}

  multiples = [["mo", 30 * 24 * 60 * 60], ["d", 24 * 60 * 60], ["h", 60 * 60], ["m", 60], ["s", 1], ["ms", .001], ["μs", .000001], ["ns", .000000001]];

  Time.dateSecondToPerformanceSecond = function(dateSecond) {
    return dateSecond - dateSecondMinusPerformanceSecond;
  };

  Time.performanceSecondToDateSecond = function(performanceSecond) {
    return performanceSecond + dateSecondMinusPerformanceSecond;
  };

  Time.timeStampToPerformanceSecond = function(htmlEventTimeStamp) {
    return htmlEventTimeStamp / 1000 - dateSecondMinusPerformanceSecond;
  };

  Time.durationString = function(seconds) {
    var i, len, multiplier, name, ref;
    for (i = 0, len = multiples.length; i < len; i++) {
      ref = multiples[i], name = ref[0], multiplier = ref[1];
      if (seconds >= multiplier) {
        return "" + ((seconds / multiplier) | 0) + name;
      }
    }
    return "0";
  };

  Time.dateAgeInSeconds = function(date) {
    return ((new Date) - date) * .001;
  };

  Time.dateToSeconds = function(date) {
    return post.getTime() * .001;
  };

  Time.perTimeString = function(secondsPerRun) {
    var perTime;
    perTime = 1 / secondsPerRun;
    if (perTime > 100) {
      return (commaize(perTime | 0)) + "/s";
    } else if (perTime * 60 > 100) {
      return (commaize(perTime * 60 | 0)) + "/m";
    } else {
      return (commaize(perTime * 3600 | 0)) + "/h";
    }
  };

  Time.currentMillisecond = function() {
    return self.performance.now();
  };

  Time.currentSecond = currentSecond = function() {
    return self.performance.now() / 1000;
  };

  Time.currentDateSecond = function() {
    return new Date().getTime() / 1000;
  };

  Time.time = function(a, b) {
    var f, fResult, start, timeResult;
    f = b || a;
    start = currentSecond();
    fResult = f();
    timeResult = currentSecond() - start;
    if (b) {
      Neptune.Art.StandardLib.log("time: " + a + " took " + (Time.durationString(timeResult)));
      return fResult;
    } else {
      return timeResult;
    }
  };

  timerStack = [];

  Time.stackTime = function(f) {
    var start, subTimeTotal, timeResult, tsl;
    start = currentSecond();
    timerStack.push(0);
    f();
    subTimeTotal = timerStack.pop();
    timeResult = currentSecond() - start;
    if ((tsl = timerStack.length) > 0) {
      timerStack[tsl - 1] += timeResult;
    }
    return {
      count: 1,
      total: timeResult,
      subTimeTotal: subTimeTotal,
      remainder: timeResult - subTimeTotal
    };
  };

  Time.logTimeSinceLast = function(a) {
    var time;
    time = Time.currentSecond();
    console.log(a + " (" + (Time.lastTime ? Time.durationString(time - Time.lastTime) : void 0) + ")");
    return Time.lastTime = time;
  };

  return Time;

})();


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var Unique, nextId;

nextId = 1;

module.exports = Unique = (function() {
  var nextUniqueObjectId, objectId;

  function Unique() {}

  Unique.nextUniqueObjectId = nextUniqueObjectId = function() {
    return "object_" + nextId++;
  };

  Unique.objectId = objectId = function(o) {
    if (o.hasOwnProperty("__uniqueId")) {
      return o.__uniqueId || (o.__uniqueId = nextUniqueObjectId());
    } else {
      Object.defineProperty(o, "__uniqueId", {
        enumerable: false,
        value: nextUniqueObjectId()
      });
      return o.__uniqueId;
    }
  };

  Unique.id = function(key) {
    if (typeof key === "object" || typeof key === "function") {
      if (key) {
        if (typeof key.getUniqueId === "function") {
          return key.getUniqueId();
        } else {
          return objectId(key);
        }
      } else {
        return "null";
      }
    } else if (typeof key === "number") {
      return "" + key;
    } else if (typeof key === "symbol") {
      return key.toString();
    } else if (typeof key === "string") {
      return "string_" + key;
    } else if (typeof key === "boolean") {
      if (key) {
        return "true";
      } else {
        return "false";
      }
    } else if (key === void 0) {
      return "undefined";
    } else {
      return (typeof key) + "_" + key;
    }
  };

  return Unique;

})();


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var StandardLib,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(51)).addNamespace('Art.StandardLib', StandardLib = (function(superClass) {
  extend(StandardLib, superClass);

  function StandardLib() {
    return StandardLib.__super__.constructor.apply(this, arguments);
  }

  StandardLib.version = __webpack_require__(80).version;

  return StandardLib;

})(Neptune.PackageNamespace));

__webpack_require__(37);

__webpack_require__(16);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var clone, concatInto, defineModule, each, formattedInspect, isFunction, isPlainArray, isPlainObject, isString, log, lowerCamelCase, merge, mergeInto, object, ref, upperCamelCase,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(21), defineModule = ref.defineModule, log = ref.log, object = ref.object, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase, each = ref.each, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, clone = ref.clone, isString = ref.isString, mergeInto = ref.mergeInto, concatInto = ref.concatInto, formattedInspect = ref.formattedInspect, merge = ref.merge;


/*
Todo:
  validatedDeclarable / validatedExtendableProperty
    Which use Art.Validation

TODO:
  When we switch to ES6, we should make the
  class API look identical to the current instance API.

  That means declarable API looks like this:
    @extendableProperty foo: {}

     * extend:
    @foo: hi: 123

  The differnce is we add a ":".

  The benefit is it's a normal getter/setter pair:

    @foo = hi: 123

    log @foo

  The one diference is the "setter" is really an
  "extender"
 */

defineModule(module, function() {
  return function(superClass) {
    var ExtendablePropertyMixin;
    return ExtendablePropertyMixin = (function(superClass1) {
      var arrayPropertyExtender, defaultExtender, getOwnProperty, noOptions, objectPropertyExtender;

      extend1(ExtendablePropertyMixin, superClass1);

      function ExtendablePropertyMixin() {
        return ExtendablePropertyMixin.__super__.constructor.apply(this, arguments);
      }


      /*
      IN
        object: any object
        property: string, property name
        init:
          (object) -> returning initial value for object
          OR
            initial value is computed by:
            clone object[property] || init
      
      EFFECT:
        if object.hasOwnProperty property, return its current value
        otherwise, initialize and return it with init()
       */

      ExtendablePropertyMixin.getOwnProperty = getOwnProperty = function(object, property, init) {
        var ref1;
        if (object.hasOwnProperty(property)) {
          return object[property];
        } else {
          return object[property] = isFunction(init) ? init(object) : clone((ref1 = object[property]) != null ? ref1 : init);
        }
      };


      /*
      objectPropertyExtender
      
      IN: @ is set to the property-value to extend
      
      API 1:
        IN: map
        EFFECT: mergeInto propValue, map
      
      API 2:
        IN: key, value
        EFFECT: propValue[key] = valuee
      
      OUT: ignore
       */

      ExtendablePropertyMixin.objectPropertyExtender = objectPropertyExtender = function(toExtend, mapOrKey, value) {
        if (mapOrKey === void 0 || mapOrKey === null) {
          return toExtend;
        }
        if (isString(mapOrKey)) {
          toExtend[mapOrKey] = value;
        } else if (isPlainObject(mapOrKey)) {
          mergeInto(toExtend, mapOrKey);
        } else {
          log({
            mapOrKey: mapOrKey,
            value: value,
            type: mapOrKey != null ? mapOrKey.constructor : void 0
          });
          throw new Error("first value argument must be a plain object or string: " + (formattedInspect({
            key: mapOrKey,
            value: value
          })));
        }
        return toExtend;
      };


      /*
      arrayPropertyExtender
      
      IN: valueToExtend, value
        value:
          array: concatInto propValue, array
          non-array: propValue.push value
      
      NOTE: if you want to concat an array-as-a-value to the end of propValue, do this:
        arrayPropertyExtender.call propValue, [arrayAsValue]
      
      OUT: ignore
       */

      ExtendablePropertyMixin.arrayPropertyExtender = arrayPropertyExtender = function(toExtend, arrayOrValue) {
        if (isPlainArray(arrayOrValue)) {
          concatInto(toExtend, arrayOrValue);
        } else {
          toExtend.push(arrayOrValue);
        }
        return toExtend;
      };


      /*
      Extendable Properties
      
      EXAMPLE:
        class Foo extends BaseClass
          @extendableProperty foo: {}
      
      Extendable properties work like inheritance:
      
        When any subclass or instance extends an extendable property, they
        inherit a clone of the property from up the inheritance tree, and then
        add their own extensions without effecting the parent copy.
      
        With Object property types, this can just be a parallel prototype chain.
        (It isn't currently: if you modify a parent after extending it to a child,
        the child won't get updates.)
      
        BUT, you can also have array or other types of extend-properties, which
        JavaScript doesn't have any built-in mechanisms for inheriting.
      
      BASIC API:
      @extendableProperty: (map, options) -> ...
      
      IN:
        map: name: defaultValue
        options:
          declarable: true/false
            if true, slightly alters the created functions:
              for: @extendableProperty foo: ...
              generates:
                @foo
      
          extend:
            DEFAULTS:
              switch defaultValue
              when is Object then objectPropertyExtender
              when is Array  then arrayPropetyExtender
              else                defaultExtender
      
            (extendable, extendWithValues...) -> newExtendedOwnPropertyValue
              IN:
                extendable: the current, extended value, already cloned, so direct mutation is OK
                extendWithValues: 1 or more values passed into the extend funtion by the client.
                  Ex: for an array, this is either a single value or an array
                  Ex: for an object, this is either a single object or two args: key, value
              OUT: new property value to set own-property to
              EFFECT:
                Can be pure functional and just return the new, extended data.
                OR
                Can modify extendable directly, since it is an object/array/atomic value unique to the current class/instance.
                  If modifying extendable directly, be sure to return extendable.
                Regardless, the returned value becomes the new extendable prop's value.
      
      
      
      EFFECT: for each {foo: defaultValue} in map, extendableProperty:
        WARNING:
          !!! Don't modify the object returned by a getter !!!
      
          Getters only return the current, most-extended property value. It may not be extended to the
          current subclass or instance! Instead, call @extendFoo() if you wish to manually modify
          the extended property.
      
        declarable:
          getters:
            @getFoo:
            getFoo:
      
          extenders:
            @foo:
            foo:
      
        non-declarable:
      
          getters:
            @getFoo:
            @getter foo:
      
          extenders:
            @foo:
            @extendFoo:
            extendFoo:
      
            IN:
              0-args: nothing happens beyond the standard EFFECT
              1+args: passed to the "extend" function
      
            EFFECT: creates a extension (clone) of the property for the currnet class, subclass or instance
            OUT: the current, extendedPropValue
      
            API 1: IN: 0 args
              NO ADDITIONAL EFFECT - just returns the extended property
            API 2: IN: 1 or more args
              In addition to extending and returning the extended property:
              calls: propExtender extendedPropValue, args...
      
          NOTE: gthe prototype getters call the class getter for extension purposes.
            The result is each instance won't get its own version of the property.
            E.G. Interitance is done at the Class level, not the Instance level.
       */

      defaultExtender = function(toExtend, v) {
        if (v === void 0) {
          throw new Error("not expecting undefined");
        }
        return v;
      };

      noOptions = {};

      ExtendablePropertyMixin.extendableProperty = function(map, options) {
        var declarable, extend, noSetter, oldExtender;
        if (options == null) {
          options = noOptions;
        }
        if (isFunction(oldExtender = options)) {
          log.error("DEPRICATED customPropertyExtender not supported, use extend: option ");
          options = {
            extend: function() {
              var args, extendable;
              extendable = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
              return oldExtender.apply(extendable, args);
            }
          };
        }
        extend = options.extend, declarable = options.declarable, noSetter = options.noSetter;
        return each(map, (function(_this) {
          return function(defaultValue, name) {
            var extenderName, getterName, instanceExtender, instanceGetter, internalName, propertyExtender, ucProp;
            name = lowerCamelCase(name);
            ucProp = upperCamelCase(name);
            internalName = _this.propInternalName(name);
            getterName = "get" + ucProp;
            extenderName = "extend" + ucProp;
            propertyExtender = (function() {
              if (extend != null) {
                return extend;
              } else if (isPlainObject(defaultValue)) {
                return objectPropertyExtender;
              } else if (isPlainArray(defaultValue)) {
                return arrayPropertyExtender;
              } else {
                if (defaultValue === void 0) {
                  throw new Error("defaultValue must not be undefined");
                }
                return defaultExtender;
              }
            })();
            _this[getterName] = function() {
              var ref1;
              return (ref1 = this.prototype[internalName]) != null ? ref1 : defaultValue;
            };
            _this[name] = _this[extenderName] = function(value) {
              var extendablePropValue;
              extendablePropValue = getOwnProperty(this.prototype, internalName, defaultValue);
              if (arguments.length > 0 && value !== void 0) {
                this.prototype[internalName] = propertyExtender.apply(null, [extendablePropValue].concat(slice.call(arguments)));
              }
              return extendablePropValue;
            };
            instanceGetter = function() {
              var ref1;
              return (ref1 = this[internalName]) != null ? ref1 : defaultValue;
            };
            instanceExtender = _this.prototype[extenderName] = function(value) {
              var extendablePropValue;
              extendablePropValue = getOwnProperty(this, internalName, defaultValue);
              if (arguments.length > 0 && value !== void 0) {
                this[internalName] = propertyExtender.apply(null, [extendablePropValue].concat(slice.call(arguments)));
              }
              return extendablePropValue;
            };
            if (declarable) {
              _this.prototype[getterName] = instanceGetter;
              return _this.prototype[name] = instanceExtender;
            } else {
              if (!noSetter) {
                _this.addSetter(name, instanceExtender);
              }
              return _this.addGetter(name, instanceGetter);
            }
          };
        })(this));
      };

      ExtendablePropertyMixin.declarable = function(map, options) {
        return this.extendableProperty(map, merge(options, {
          declarable: true
        }));
      };

      return ExtendablePropertyMixin;

    })(superClass);
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var WebpackHotLoader;

module.exports = WebpackHotLoader = (function() {
  function WebpackHotLoader() {}


  /*
  IN:
    _module should be the CommonJS 'module'
    modulePostLoadAction: (moduleState) -> ignored internally, returned from @runHot
  
  OUT: modulePostLoadAction moduleState
  
  EFFECT:
    modulePostLoadAction is run every time the module is loaded.
  
    Initially, moduleState is {}.
  
    moduleState is the same object every load:
      modulePostLoadAction can modify moduleState and it will persist through every reload.
  
    modulePostLoadAction is responsible for any and all
    update actions required due to the module load.
  
  NOTE:
    If _module is not hot, modulePostLoadAction will be invoked once with an empty {}.
   */

  WebpackHotLoader.runHot = function(_module, modulePostLoadAction) {
    var base, moduleState;
    if (!(_module != null ? _module.hot : void 0)) {
      return modulePostLoadAction({});
    }
    moduleState = (((base = _module.hot).data || (base.data = {
      moduleState: {}
    }))).moduleState;
    _module.hot.accept();
    _module.hot.dispose(function(data) {
      return data.moduleState = moduleState;
    });
    return modulePostLoadAction(moduleState);
  };

  return WebpackHotLoader;

})();


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {


/*
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
 */
var Clone, Map, Unique, byProperties, byStructure, clonedMap, inspect, topObject, uniquePropertyName;

Map = __webpack_require__(18);

Unique = __webpack_require__(30);

inspect = __webpack_require__(2).inspect;

uniquePropertyName = Unique.PropertyName;

clonedMap = null;

byStructure = false;

byProperties = false;

topObject = null;

module.exports = Clone = (function() {
  var clone, cloneArray, cloneByProperties, cloneByStructure, cloneObject, emptyClone;

  function Clone() {}

  cloneArray = function(array) {
    var clonedArray, i, index, len, value;
    clonedMap.set(array, clonedArray = array.slice());
    for (index = i = 0, len = clonedArray.length; i < len; index = ++i) {
      value = clonedArray[index];
      clonedArray[index] = clone(value);
    }
    return clonedArray;
  };

  cloneObject = function(obj) {
    var clonedObject, k, v;
    clonedMap.set(obj, clonedObject = emptyClone(obj));
    if ((obj !== topObject || !byProperties) && obj.populateClone) {
      obj.populateClone(clonedObject);
    } else {
      for (k in obj) {
        v = obj[k];
        clonedObject[k] = clone(v);
      }
    }
    return clonedObject;
  };

  Clone.emptyClone = emptyClone = function(obj) {
    if (obj.constructor === Array) {
      return [];
    } else {
      return Object.create(Object.getPrototypeOf(obj));
    }
  };

  Clone.clone = clone = function(obj, mode) {
    var clonedObject, got;
    switch (mode) {
      case "byStructure":
        byStructure = true;
        break;
      case "byProperties":
        byProperties = true;
    }
    if (obj === null || obj === void 0 || typeof obj !== "object") {
      return obj;
    }
    if (byStructure && (obj.constructor !== Array && obj.constructor !== Object)) {
      return obj;
    }
    if (clonedMap) {
      if (got = clonedMap.get(obj)) {
        return got;
      }
    } else {
      topObject = obj;
      clonedMap = new Map;
    }
    clonedObject = obj.constructor === Array ? cloneArray(obj) : cloneObject(obj);
    if (topObject === obj) {
      byStructure = false;
      byProperties = false;
      topObject = null;
      clonedMap = null;
    }
    return clonedObject;
  };

  Clone.cloneByProperties = cloneByProperties = function(obj) {
    return clone(obj, "byProperties");
  };

  Clone.cloneByStructure = cloneByStructure = function(obj) {
    return clone(obj, "byStructure");
  };

  return Clone;

})();


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Merge, compactFlatten, isPlainObject;

compactFlatten = __webpack_require__(14).compactFlatten;

isPlainObject = __webpack_require__(6).isPlainObject;

module.exports = Merge = (function() {
  var deepMerge, merge, mergeInto, pureMerge;

  function Merge() {}


  /*
  
  merge "flattens" its arguments and then adds all keys from all objects in
  the list into a new object which is returned.
  
  return: new object
  
  The first object's keys are added first. If two or more objects have the same
  keys, the value set in the result is the last object's in the list with that key.
   */

  Merge.merge = merge = function() {
    return mergeInto({}, arguments);
  };


  /*
  The same as 'merge' with one difference:
  
  Instead of a new object, all objects are merged into the first object in the list.
  
  return: first object in the flattened list
  return: null if no source objects
   */

  Merge.mergeInto = mergeInto = function() {
    var j, k, len, result, source, sources, v;
    sources = compactFlatten(arguments);
    if (sources.length === 0) {
      return null;
    }
    result = sources[0] || {};
    for (j = 0, len = sources.length; j < len; j++) {
      source = sources[j];
      if (source !== result) {
        for (k in source) {
          v = source[k];
          if (v !== void 0) {
            result[k] = v;
          }
        }
      }
    }
    return result;
  };


  /*
  Just like mergeInfo except only merge into the result object
  UNLESS 'result' already has that property with a non-undefined value.
  
  if
    mergeInfo a, b is just like merge a, b except it modifies and returns a instead of returning a new object
  then
    mergeIntoUnless b, a is just like merge a, b except it modifies and returns b instead of returning a new object
  
  Note: mergeIntoUnless a, b, c, d, e, f is like merge f, e, d, c, b, a
   */

  Merge.mergeIntoUnless = function() {
    var i, j, k, ref, result, source, sources, v;
    sources = compactFlatten(arguments);
    if (sources.length === 0) {
      return null;
    }
    result = sources[0] || {};
    for (i = j = 1, ref = sources.length; j < ref; i = j += 1) {
      source = sources[i];
      for (k in source) {
        v = source[k];
        if (result[k] === void 0) {
          result[k] = v;
        }
      }
    }
    return result;
  };

  Merge.deepMerge = deepMerge = function() {
    var k, list, out, v, val;
    list = compactFlatten(arguments);
    out = merge(list);
    for (k in out) {
      v = out[k];
      if (isPlainObject(v)) {
        out[k] = deepMerge((function() {
          var j, len, results;
          results = [];
          for (j = 0, len = list.length; j < len; j++) {
            val = list[j];
            results.push(val[k]);
          }
          return results;
        })());
      }
    }
    return out;
  };

  Merge.hasAllProps = function(o1, o2) {
    var k, v;
    for (k in o1) {
      v = o1[k];
      if (!o2.hasOwnProperty(k)) {
        return false;
      }
    }
    return true;
  };

  Merge.pureMerge = pureMerge = function() {
    var j, last, len, source, sources;
    sources = compactFlatten(arguments);
    if (sources.length === 0) {
      return null;
    }
    if (sources.length === 1) {
      return sources[0];
    }
    last = sources[sources.length - 1];
    for (j = 0, len = sources.length; j < len; j++) {
      source = sources[j];
      if (source !== last) {
        if (!Merge.hasAllProps(source, last)) {
          return Merge.merge(sources);
        }
      }
    }
    return last;
  };


  /*
  I might consider adding "o" - which works like Object-Tree constructors:
    First, it compact-flattens args
    Second, it gathers up and merges all plain-objects in its arguments list
    Last, all remaining items get added to the "children" list
  The question is, what does it return? Options:
  
    OPTION: If only plain-objects after compact-flatten, just return the merged object ELSE:
  
  Options if both objects and non-object values are present:
    a. return compactFlatten [plainObject, nonObjectValues]
    b. return merge plainObject, children: nonObjectValues
    c. return new MClass plainObject, nonObjectValues
      class MClass extends BaseObject
        @properties "props children"
        constructor: (@props, @children) ->
   */

  Merge.m = pureMerge;

  return Merge;

})();


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var StringCase, compactFlatten;

compactFlatten = __webpack_require__(14).compactFlatten;

module.exports = StringCase = (function() {
  var getCodeWords;

  function StringCase() {}

  StringCase.getCodeWords = getCodeWords = function(str) {
    var _words, word, words;
    if (!(_words = str != null ? str.match(/[a-zA-Z][a-zA-Z0-9]*|[0-9]+/g) : void 0)) {
      return [];
    }
    words = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = _words.length; i < len; i++) {
        word = _words[i];
        results.push(word.match(/(?:[A-Z]{2,}(?![a-z]))|[A-Z][a-z0-9]*|[a-z0-9]+/g));
      }
      return results;
    })();
    return compactFlatten(words);
  };

  StringCase.codeWords = getCodeWords;

  StringCase.lowerCase = function(str) {
    return str != null ? str.toLocaleLowerCase() : void 0;
  };

  StringCase.upperCase = function(str) {
    return str != null ? str.toLocaleUpperCase() : void 0;
  };

  StringCase.capitalize = function(str) {
    return StringCase.upperCase(str.charAt(0)) + str.slice(1);
  };

  StringCase.decapitalize = function(str) {
    return StringCase.lowerCase(str.charAt(0)) + str.slice(1);
  };

  StringCase.getLowerCaseCodeWords = function(str) {
    var i, len, ref, results, word;
    ref = StringCase.getCodeWords(str);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      word = ref[i];
      results.push(StringCase.lowerCase(word));
    }
    return results;
  };

  StringCase.getCapitalizedCodeWords = function(str) {
    var i, len, ref, results, word;
    ref = StringCase.getCodeWords(str);
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      word = ref[i];
      results.push(StringCase.capitalize(StringCase.lowerCase(word)));
    }
    return results;
  };

  StringCase.upperCamelCase = function(str, joiner) {
    var word;
    if (joiner == null) {
      joiner = "";
    }
    return ((function() {
      var i, len, ref, results;
      ref = this.getLowerCaseCodeWords(str);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        word = ref[i];
        results.push(this.capitalize(word));
      }
      return results;
    }).call(StringCase)).join(joiner);
  };

  StringCase.lowerCamelCase = function(str, joiner) {
    if (joiner == null) {
      joiner = "";
    }
    return StringCase.decapitalize(StringCase.upperCamelCase(str, joiner));
  };

  StringCase.snakeCase = function(str) {
    return (StringCase.getLowerCaseCodeWords(str)).join("_");
  };

  StringCase.dashCase = function(str) {
    return (StringCase.getLowerCaseCodeWords(str)).join("-");
  };

  StringCase.capitalizedDashCase = function(str) {
    return (StringCase.getCapitalizedCodeWords(str)).join("-");
  };

  return StringCase;

})();


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var Core,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(31)).addNamespace('Core', Core = (function(superClass) {
  extend(Core, superClass);

  function Core() {
    return Core.__super__.constructor.apply(this, arguments);
  }

  return Core;

})(Neptune.PackageNamespace));


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, defineModule, formattedInspect, isFunction, mergeInto, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defineModule = __webpack_require__(5).defineModule;

formattedInspect = __webpack_require__(2).formattedInspect;

ref = __webpack_require__(1), mergeInto = ref.mergeInto, isFunction = ref.isFunction;

defineModule(module, ErrorWithInfo = (function(superClass) {
  extend(ErrorWithInfo, superClass);

  function ErrorWithInfo(message, info, name) {
    this.info = info;
    this.name = name;
    ErrorWithInfo.__super__.constructor.apply(this, arguments);
    this.name || (this.name = "ErrorWithInfo");
    mergeInto(this, this.info);
    this.message = message;
    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error).stack;
    }
  }

  ErrorWithInfo.prototype.toString = function() {
    return [
      "ErrorWithInfo: " + this.message, formattedInspect({
        info: this.info
      })
    ].join("\n\n");
  };

  return ErrorWithInfo;

})(Error));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var Function;

module.exports = Function = (function() {
  function Function() {}

  Function.fastBind = function(fn, _this) {
    switch (fn.length) {
      case 0:
        return function() {
          return fn.call(_this);
        };
      case 1:
        return function(a) {
          return fn.call(_this, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(_this, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(_this, a, b, c);
        };
      case 4:
        return function(a, b, c, d) {
          return fn.call(_this, a, b, c, d);
        };
      case 5:
        return function(a, b, c, d, e) {
          return fn.call(_this, a, b, c, d, e);
        };
      case 6:
        return function(a, b, c, d, e, f) {
          return fn.call(_this, a, b, c, d, e, f);
        };
      case 7:
        return function(a, b, c, d, e, f, g) {
          return fn.call(_this, a, b, c, d, e, f, g);
        };
      case 8:
        return function(a, b, c, d, e, f, g, h) {
          return fn.call(_this, a, b, c, d, e, f, g, h);
        };
      case 9:
        return function(a, b, c, d, e, f, g, h, i) {
          return fn.call(_this, a, b, c, d, e, f, g, h, i);
        };
      case 10:
        return function(a, b, c, d, e, f, g, h, i, j) {
          return fn.call(_this, a, b, c, d, e, f, g, h, i, j);
        };
      default:
        return function() {
          return fn.apply(_this, arguments);
        };
    }
  };

  return Function;

})();


/*
PERFORMANCE 2017-09-22
  Faster with normal bind:
    Chrome: 4x
    Edge: 2x
  Faster with fastBind
    FF: 7.8x faster
    Safari:
      OSX:  12.4x
      iOS:  11x
  Android:
    S8 Samsung browser: fastBindFaster: 6.5
    S8: normalBindFaster: 4x
 */


/*
TODO:

The above options are not hot-reload compatible. However, this alternative would be:

  name = fn.name
  -> _this[name].apply _this, arguments

I need to perf-test this. Or, I need to finally start using a global "debug" mode that could use this
in debug mode and the faster(?), non hot-reload options in production mode.
 */


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var FormattedInspect, alignTabs, ansiRegex, ansiSafeStringLength, colorNames, colorizeFunctions, escapeForBlockString, escapeJavascriptString, formattedInspectArray, formattedInspectObject, formattedInspectRecursive, formattedInspectString, identity, indentLength, indentString, inspect, isFunction, isNumber, isPlainArray, isPlainObject, isString, max, newLineWithIndentString, object, objectKeyCount, pad, passThroughColorizeFunctions, postWhitespaceFormatting, ref, ref1, stripAnsi, stripTrailingWhitespace, toInspectedObjects, w;

ref = __webpack_require__(0), isString = ref.isString, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isNumber = ref.isNumber;

max = Math.max;

ref1 = __webpack_require__(4), pad = ref1.pad, stripTrailingWhitespace = ref1.stripTrailingWhitespace, escapeJavascriptString = ref1.escapeJavascriptString;

inspect = __webpack_require__(27).inspect;

objectKeyCount = __webpack_require__(13).objectKeyCount;

toInspectedObjects = __webpack_require__(26).toInspectedObjects;

w = __webpack_require__(11).w;

object = __webpack_require__(17).object;

indentString = '  ';

indentLength = indentString.length;

newLineWithIndentString = "\n" + indentString;

formattedInspectObject = function(m, maxLineLength, options) {
  var colorize, finalInspectedValues, forceMultilineOutput, index, inspected, inspectedLength, inspectedValues, k, key, keyCount, objectStart, shouldBeOnOwnLine, v, value;
  colorize = options.colorize;
  inspectedLength = 0;
  forceMultilineOutput = false;
  shouldBeOnOwnLine = false;
  keyCount = 0;
  inspectedValues = (function() {
    var results;
    results = [];
    for (key in m) {
      value = m[key];
      keyCount++;
      inspected = formattedInspectRecursive(value, maxLineLength - indentLength, options);
      if (inspected.match(/\n/)) {
        inspected = inspected.match(/^\[\]/) ? "" + inspected : newLineWithIndentString + inspected.replace(/\n/g, newLineWithIndentString);
        if (!/\n\s*$/.test(inspected)) {
          inspected += "\n";
        }
      } else if (ansiSafeStringLength(inspected) > maxLineLength - (key.length + 2)) {
        inspected = "" + newLineWithIndentString + inspected + "\n";
      }
      if (!/^[-~!@\#$%^&*_+=|\\<>?\/.$\w\u007f-\uffff]+$/.test(key)) {
        key = inspect(key);
      }
      inspectedLength += ansiSafeStringLength(inspected) + key.length + 2;
      forceMultilineOutput || (forceMultilineOutput = shouldBeOnOwnLine);
      shouldBeOnOwnLine = inspected.length > 100 || !inspected.match(/^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/);
      results.push([key, inspected, value]);
    }
    return results;
  })();
  objectStart = "{}";
  objectStart = colorize.grey(objectStart);
  if (keyCount === 0) {
    return objectStart;
  } else {
    index = 0;
    finalInspectedValues = (function() {
      var j, len, ref2, results;
      results = [];
      for (j = 0, len = inspectedValues.length; j < len; j++) {
        ref2 = inspectedValues[j], k = ref2[0], v = ref2[1], value = ref2[2];
        key = k + ":";
        key = colorize.blue(key);
        results.push(key + "\t" + v);
      }
      return results;
    })();
    return finalInspectedValues.join(!forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2 ? ",\t" : "\n");
  }
};

formattedInspectArray = function(m, maxLineLength, options) {
  var arrayStart, colorize, i, inspected, inspectedHasNewlines, inspectedValues, inspectedValuesContainNewlines, j, lastWasArray, lastWasObject, len, lengthOfCommas, lengthOfInspectedValues, lengthOfStartBrackets, objectStart, objectsMustBeExplicit, oneLinerOk, value;
  colorize = options.colorize;
  lengthOfInspectedValues = 0;
  lastWasObject = false;
  lastWasArray = false;
  objectsMustBeExplicit = false;
  oneLinerOk = true;
  inspectedValuesContainNewlines = false;
  for (i = j = 0, len = m.length; j < len; i = ++j) {
    value = m[i];
    if (isPlainObject(value)) {
      if (i < m.length - 1) {
        oneLinerOk = false;
      }
      if (lastWasObject) {
        objectsMustBeExplicit = true;
      }
      lastWasObject = true;
    } else {
      lastWasObject = false;
    }
  }
  inspectedValues = (function() {
    var l, len1, results;
    results = [];
    for (l = 0, len1 = m.length; l < len1; l++) {
      value = m[l];
      if (lastWasArray) {
        oneLinerOk = false;
      }
      if (isPlainArray(value)) {
        lastWasArray = true;
      }
      inspected = formattedInspectRecursive(value, maxLineLength - indentLength, options);
      inspectedHasNewlines = /\n/.test(inspected);
      if (objectsMustBeExplicit && isPlainObject(value) && objectKeyCount(value) > 0) {
        objectStart = "{}";
        objectStart = colorize.grey(objectStart);
        inspected = inspectedHasNewlines ? "" + objectStart + newLineWithIndentString + (inspected.replace(/\n/g, newLineWithIndentString)) : objectStart + " " + inspected;
      }
      if (inspectedHasNewlines) {
        oneLinerOk = false;
        inspected = inspected.replace(/\n/g, newLineWithIndentString);
        if (!/\n\s*$/.test(inspected)) {
          inspected += "\n";
        }
      }
      lengthOfInspectedValues += ansiSafeStringLength(inspected);
      results.push(inspected);
    }
    return results;
  })();
  lengthOfCommas = (inspectedValues.length - 1) * 2;
  lengthOfStartBrackets = 3;
  arrayStart = "[]";
  arrayStart = colorize.grey(arrayStart);
  if (oneLinerOk && maxLineLength >= lengthOfStartBrackets + lengthOfCommas + lengthOfInspectedValues) {
    if (inspectedValues.length === 0) {
      return arrayStart;
    } else {
      return arrayStart + " " + (inspectedValues.join(",\t"));
    }
  } else {
    return arrayStart + "\n  " + (inspectedValues.join("\n  "));
  }
};

escapeForBlockString = (function(_this) {
  return function(str) {
    return String(str).replace(/[\\\0\b\f\r\t\v\u001b\u2028\u2029]/g, function(x) {
      switch (x) {
        case '\\':
          return '\\\\';
        case '\0':
          return "\\0";
        case '\b':
          return "\\b";
        case '\f':
          return "\\f";
        case '\r':
          return "\\r";
        case '\t':
          return "\\t";
        case '\v':
          return "\\v";
        case '\u2028':
          return "\\u2028";
        case '\u2029':
          return "\\u2029";
        case '\u001b':
          return '\\u001b';
      }
    });
  };
})(this);

formattedInspectString = function(m, options) {
  var out;
  out = m.match(/\n/) && !m.match(/\ (\n|$)/) ? ('"""' + newLineWithIndentString + escapeForBlockString(m).replace(/\n/g, newLineWithIndentString)).replace(/\ +\n/g, '\n') : escapeJavascriptString(m);
  return options.colorize.green(out);
};

formattedInspectRecursive = function(m, maxLineLength, options) {
  if (isPlainObject(m)) {
    return formattedInspectObject(m, maxLineLength, options);
  } else if (isPlainArray(m)) {
    return formattedInspectArray(m, maxLineLength, options);
  } else if (isString(m)) {
    return formattedInspectString(m, options);
  } else {
    return options.colorize.yellow(inspect(m));
  }
};


/*
TODO:

  special mode for a chunk of lines that all have this pattern:

    /^\s*([a-z]:\t)*[^\t]+$/

  Example:
    hi: there: my: friends: "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Currently that becomes:
    hi:                   there:            my:       friends: "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Which is pretty awkward. I want:
    hi: there: my: friends:                           "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Basically, replace all but the last tab with a space.

  But only if ALL lines in a chunk are this pattern.

  CounterExample:
    properties:
      autoTags:          type: "text", analyzer: "standard"
      autoText:          type: "text", analyzer: "english"
      updatedAt:         type: "long"
      createdAt:         type: "long"
      title:             type: "text", analyzer: "english"
      userId:            type: "keyword"
      lastPostCreatedAt: type: "long"
      lastPostId:        type: "keyword"
      lastChapterPostId: type: "keyword"
      postCount:         type: "integer"
      followerCount:     type: "integer"
      activityCount:     type: "long"
      messageCount:      type: "long"
      isProfileTopic:    type: "boolean"
      private:           type: "boolean"

  Should NOT look like this:
    properties:
      autoTags:                type: "text", analyzer: "standard"
      autoText:                type: "text", analyzer: "english"
      updatedAt: type:         "long"
      createdAt: type:         "long"
      title:                   type: "text", analyzer: "english"
      userId: type:            "keyword"
      lastPostCreatedAt: type: "long"
      lastPostId: type:        "keyword"
      lastChapterPostId: type: "keyword"
      postCount: type:         "integer"
      followerCount: type:     "integer"
      activityCount: type:     "long"
      messageCount: type:      "long"
      isProfileTopic: type:    "boolean"
      private: type:           "boolean"
 */

alignTabs = function(linesString, maxLineLength) {
  var alignedLines, el, elLength, elements, expandAmount, i, j, l, len, len1, line, lines, maxColumnSizes, maxColumnWidth, r, spaceAvailable, tabStops;
  if (maxLineLength == null) {
    maxLineLength = 10000;
  }
  tabStops = 1;
  lines = linesString.split("\n");
  maxColumnSizes = [];
  maxColumnWidth = maxLineLength / 2;
  for (j = 0, len = lines.length; j < len; j++) {
    line = lines[j];
    if ((elements = line.split("\t")).length > 1) {
      for (i = l = 0, len1 = elements.length; l < len1; i = ++l) {
        el = elements[i];
        if (!(i < elements.length - 1 && (i === 0 || ansiSafeStringLength(el) < maxColumnWidth))) {
          continue;
        }
        if (maxColumnSizes.length === i) {
          maxColumnSizes.push(0);
        }
        maxColumnSizes[i] = max(maxColumnSizes[i], ansiSafeStringLength(el) + 1);
      }
    }
  }
  alignedLines = (function() {
    var len2, n, results;
    results = [];
    for (n = 0, len2 = lines.length; n < len2; n++) {
      line = lines[n];
      spaceAvailable = maxLineLength - ansiSafeStringLength(line);
      elements = line.split("\t");
      r = (function() {
        var len3, o, results1;
        if (elements.length > 1) {
          results1 = [];
          for (i = o = 0, len3 = elements.length; o < len3; i = ++o) {
            el = elements[i];
            elLength = ansiSafeStringLength(el);
            if (i === elements.length - 1) {
              results1.push(el);
            } else if ((maxColumnSizes[i] != null) && (expandAmount = maxColumnSizes[i] - elLength - 1) <= spaceAvailable) {
              spaceAvailable -= expandAmount;
              results1.push(el + pad('', maxColumnSizes[i] - elLength));
            } else {
              spaceAvailable = 0;
              results1.push(el + " ");
            }
          }
          return results1;
        } else {
          return elements;
        }
      })();
      results.push(r.join(""));
    }
    return results;
  })();
  return alignedLines.join("\n");
};

ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;

stripAnsi = function(str) {
  if (ansiRegex.test(str)) {
    return str.replace(ansiRegex, '');
  } else {
    return str;
  }
};

ansiSafeStringLength = function(str) {
  if (!isString(str)) {
    throw new Error("not string");
  }
  if (ansiRegex.test(str)) {
    str = str.replace(ansiRegex, '');
  }
  return str.length;
};

postWhitespaceFormatting = function(maxLineLength, string) {
  var alignTabsInSameIndentGroup, indent, j, lastIndent, len, line, outLines, ref2, sameIndentGroup;
  lastIndent = 0;
  sameIndentGroup = [];
  outLines = [];
  alignTabsInSameIndentGroup = function() {
    var str;
    if (!(0 < sameIndentGroup.length)) {
      return;
    }
    str = sameIndentGroup.join("\n");
    sameIndentGroup = [];
    return outLines.push(alignTabs(str, maxLineLength));
  };
  ref2 = string.split("\n");
  for (j = 0, len = ref2.length; j < len; j++) {
    line = ref2[j];
    line = line.replace(/\s+$/g, '');
    if (lastIndent !== (indent = ansiSafeStringLength(line.match(/^ *-?/)[0]))) {
      alignTabsInSameIndentGroup();
    }
    sameIndentGroup.push(line);
    lastIndent = indent;
  }
  alignTabsInSameIndentGroup();
  return outLines.join('\n');
};

colorNames = w("red yellow green blue grey");

colorizeFunctions = object(colorNames, function(c) {
  return function(str) {
    var ref2;
    return (ref2 = str[c]) != null ? ref2 : str;
  };
});

identity = function(s) {
  return s;
};

passThroughColorizeFunctions = object(colorNames, function() {
  return identity;
});

module.exports = FormattedInspect = (function() {
  function FormattedInspect() {}

  FormattedInspect.ansiRegex = ansiRegex;

  FormattedInspect.stripAnsi = stripAnsi;

  FormattedInspect.ansiSafeStringLength = ansiSafeStringLength;

  FormattedInspect.alignTabs = alignTabs;

  FormattedInspect.formattedInspectString = formattedInspectString;

  FormattedInspect.formattedInspect = function(toInspect, options) {
    var error, maxLineLength, out, ref2, ref3;
    if (options == null) {
      options = {};
    }
    try {
      if (isNumber(options)) {
        options = {
          maxLineLength: options
        };
      } else {
        if (!isPlainObject(options)) {
          console.error({
            invalid: {
              options: options
            }
          });
          throw new Error("invalid options object type: " + (typeof options));
        }
      }
      if (options.maxLineLength == null) {
        options.maxLineLength = ((ref2 = global.process) != null ? (ref3 = ref2.stdout) != null ? ref3.columns : void 0 : void 0) || 80;
      }
      maxLineLength = options.maxLineLength;
      options.colorize = options.color ? colorizeFunctions : passThroughColorizeFunctions;
      return out = postWhitespaceFormatting(maxLineLength, formattedInspectRecursive(toInspectedObjects(toInspect), maxLineLength, options)).replace(/\n\n$/, "\n");
    } catch (error1) {
      error = error1;
      console.error(out = "Error in formattedInspect", {
        error: error,
        toInspect: toInspect,
        options: options
      });
      return out;
    }
  };

  return FormattedInspect;

})();


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);

module.exports.addModules({
  Array: __webpack_require__(65),
  Core: __webpack_require__(66),
  Object: __webpack_require__(67),
  String: __webpack_require__(68)
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Inspected,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(16)).addNamespace('Inspected', Inspected = (function(superClass) {
  extend(Inspected, superClass);

  function Inspected() {
    return Inspected.__super__.constructor.apply(this, arguments);
  }

  return Inspected;

})(Neptune.PackageNamespace));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var PlainObjects, deepMap, hasKeys, inspectedObjectLiteral, isClass, isFunction, isPlainArray, isPlainObject, ref;

ref = __webpack_require__(0), deepMap = ref.deepMap, hasKeys = ref.hasKeys, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction, isClass = ref.isClass;

inspectedObjectLiteral = __webpack_require__(15).inspectedObjectLiteral;

module.exports = PlainObjects = (function() {
  var toPlainObjects;

  function PlainObjects() {}

  PlainObjects.toPlainObjects = toPlainObjects = function(m) {
    var functionString, oldm, out, reducedFunctionString;
    if (m == null) {
      return m;
    }
    oldm = m;
    if (out = typeof m.getPlainObjects === "function" ? m.getPlainObjects() : void 0) {
      return out;
    } else if (isPlainObject(m) || isPlainArray(m)) {
      return deepMap(m, function(v) {
        return toPlainObjects(v);
      });
    } else if (isClass(m)) {
      return inspectedObjectLiteral("<" + (m.getName()) + ">");
    } else if (isFunction(m)) {
      functionString = "" + m;
      reducedFunctionString = functionString.replace(/\s+/g, ' ').replace(/^function (\([^)]*\))/, "$1 ->").replace(/^\(\)\s*/, '');
      return inspectedObjectLiteral(reducedFunctionString.length < 80 ? reducedFunctionString : functionString.slice(0, 5 * 80));
    } else {
      return m;
    }
  };

  return PlainObjects;

})();


/***/ }),
/* 44 */
/***/ (function(module, exports) {

var MapExtensions;

module.exports = MapExtensions = (function() {
  function MapExtensions() {}

  MapExtensions.iteratorToArray = function(iterator) {
    var obj, out;
    out = [];
    while (!(obj = iterator.next()).done) {
      out.push(obj.value);
    }
    return out;
  };

  MapExtensions.mapToKeysArray = function(map) {
    return MapExtensions.iteratorToArray(map.keys());
  };

  MapExtensions.mapToValuesArray = function(map) {
    return MapExtensions.iteratorToArray(map.values());
  };

  return MapExtensions;

})();


/***/ }),
/* 45 */
/***/ (function(module, exports) {

var ObjectDiff;

module.exports = ObjectDiff = (function() {
  var defaultEq;

  function ObjectDiff() {}

  defaultEq = function(a, b) {
    return a === b;
  };


  /*
  SBD this has been thouroughly benchmarked on Safari and Chrome as of 2015-11-06
  This is as fast as I could make it.
  
  IN:
    newObj:   the changed-to object   (must be set)
    oldObj:   the changed-from object (default: {})
    added:    (key, newValue) -> null
              called for each key in newObj that was not in oldObj
    removed:  (key, oldValue) -> null
              called for each key in oldObj that is not in newObj
    changed:  (key, newValue, oldValue) -> null
              called for each key in both where the value changed
    noChange: (key, value) -> null
              called for each key in both where the value stayed the same
    eqTester: (a, b) -> true if a is equal to b
              DEFAULT: use javascript ===
              provided for custom concepts of equality
    oldObjKeyCount: null or a the number of keys in oldObj
      This last field provides an opportunity for further performance improvement.
      If you have previously computed the number of keys in oldObj, pass it in.
      Counting the number of keys in an object can be slow. If we know the number
      of keys this routine can be more efficient.
  
      NOTE that this function returns the key-count of the new object. That way if you
      are calling objecfDiff several times over a sequence of object changes, can you keep
      the results from this function, you already have the oldObjKeyCount for the next call.
  
  OUT: newObjKeyCount - number of keys in the new object
   */

  ObjectDiff.objectDiff = function(newObj, oldObj, added, removed, changed, noChange, eqTester, oldObjKeyCount) {
    var k, newObjKeyCount, newValue, oldObjKeyCountIsAtLeast, oldValue;
    if (eqTester == null) {
      eqTester = defaultEq;
    }
    newObjKeyCount = 0;
    if (!oldObj) {
      for (k in newObj) {
        newValue = newObj[k];
        newObjKeyCount++;
        added(k, newValue);
      }
      return newObjKeyCount;
    }
    oldObjKeyCountIsAtLeast = 0;
    for (k in newObj) {
      newValue = newObj[k];
      newObjKeyCount++;
      if (typeof (oldValue = oldObj[k]) !== "undefined" || oldObj.hasOwnProperty(k)) {
        oldObjKeyCountIsAtLeast++;
        if (!eqTester(newValue, oldValue)) {
          changed(k, newValue, oldValue);
        } else {
          if (typeof noChange === "function") {
            noChange(k, newValue);
          }
        }
      } else {
        added(k, newValue);
      }
    }
    if (!(oldObjKeyCount != null) || oldObjKeyCountIsAtLeast !== oldObjKeyCount) {
      for (k in oldObj) {
        if (!(typeof newObj[k] !== "undefined" || newObj.hasOwnProperty(k))) {
          removed(k, oldObj[k]);
        }
      }
    }
    return newObjKeyCount;
  };


  /*
  IN:
    newObj, oldObj, eqTester >> see above
  OUT:
    no changes: null
    otherwise:
      added:    key: addedItem
      removed:  key: removedItem
      changed:  key: {oldItem, newItem}
   */

  ObjectDiff.objectDiffReport = function(newObj, oldObj, eqTester) {
    var added, changed, different, removed;
    added = {};
    removed = {};
    changed = {};
    different = null;
    ObjectDiff.objectDiff(newObj, oldObj, function(key, addedItem) {
      different = true;
      return added[key] = addedItem;
    }, function(key, removedItem) {
      different = true;
      return removed[key] = removedItem;
    }, function(key, newItem, oldItem) {
      different = true;
      return changed[key] = {
        oldItem: oldItem,
        newItem: newItem
      };
    }, null, eqTester);
    return different && {
      added: added,
      removed: removed,
      changed: changed
    };
  };

  return ObjectDiff;

})();


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var Promise, PromisedFileReader;

Promise = __webpack_require__(8);

module.exports = PromisedFileReader = (function() {
  function PromisedFileReader() {}

  PromisedFileReader.readFileAsDataUrl = function(file) {
    return new Promise(function(resolve, reject) {
      var reader;
      reader = new FileReader;
      reader.readAsDataURL(file);
      reader.onload = (function(_this) {
        return function(e) {
          return resolve(e.target.result);
        };
      })(this);
      return reader.onerror = (function(_this) {
        return function(e) {
          return reject(error);
        };
      })(this);
    });
  };

  PromisedFileReader.readFileAsArrayBuffer = function(file) {
    return new Promise(function(resolve, reject) {
      var reader;
      reader = new FileReader;
      reader.readAsArrayBuffer(file);
      reader.onload = (function(_this) {
        return function(e) {
          return resolve(e.target.result);
        };
      })(this);
      return reader.onerror = (function(_this) {
        return function(e) {
          return reject(error);
        };
      })(this);
    });
  };

  return PromisedFileReader;

})();


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var ReschedulableTimer, currentSecond, timeout;

currentSecond = __webpack_require__(29).currentSecond;

timeout = __webpack_require__(22).timeout;

module.exports = ReschedulableTimer = (function() {
  function ReschedulableTimer() {
    this._currentScheduleNumber = 0;
  }


  /*
  every time you call timeout it effectively cancels all previously pending timeouts
  leaving only this, new timeout active.
  
  In actuality, the repvious timeouts complete at some point, but their 'actions' are skipped.
   */

  ReschedulableTimer.prototype.timeout = function(ms, action) {
    var thisScheduleNumber;
    thisScheduleNumber = this._currentScheduleNumber += 1;
    return timeout(ms, (function(_this) {
      return function() {
        if (_this._currentScheduleNumber === thisScheduleNumber) {
          return action();
        }
      };
    })(this));
  };

  ReschedulableTimer.prototype.cancel = function() {
    return this._currentScheduleNumber++;
  };

  return ReschedulableTimer;

})();


/***/ }),
/* 48 */
/***/ (function(module, exports) {

var Ruby,
  hasProp = {}.hasOwnProperty;

module.exports = Ruby = (function() {
  var rubyTrue;

  function Ruby() {}

  Ruby.rubyTrue = rubyTrue = function(a) {
    return a !== void 0 && a !== null && a !== false;
  };

  Ruby.rubyFalse = function(a) {
    return a === void 0 || a === null || a === false;
  };

  Ruby.rubyOr = function(a, b) {
    var i, len;
    if (arguments.length === 2) {
      if (rubyTrue(a)) {
        return a;
      } else {
        return b;
      }
    } else {
      for (i = 0, len = arguments.length; i < len; i++) {
        a = arguments[i];
        if (rubyTrue(a)) {
          break;
        }
      }
      return a;
    }
  };

  Ruby.rubyAnd = function(a, b) {
    var i, len;
    if (arguments.length === 2) {
      if (rubyTrue(a)) {
        return b;
      } else {
        return a;
      }
    } else {
      for (i = 0, len = arguments.length; i < len; i++) {
        a = arguments[i];
        if (!rubyTrue(a)) {
          break;
        }
      }
      return a;
    }
  };

  Ruby.reopenInstanceProps = function(klass, instanceProps) {
    var k, results, v;
    results = [];
    for (k in instanceProps) {
      if (!hasProp.call(instanceProps, k)) continue;
      v = instanceProps[k];
      results.push(klass.prototype[k] = v);
    }
    return results;
  };

  Ruby.reopenClassProps = function(klass, classProps) {
    var k, results, v;
    results = [];
    for (k in classProps) {
      if (!hasProp.call(classProps, k)) continue;
      v = classProps[k];
      results.push(klass[k] = v);
    }
    return results;
  };

  return Ruby;

})();


/***/ }),
/* 49 */
/***/ (function(module, exports) {


/*
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
 */
var ShallowClone;

module.exports = ShallowClone = (function() {
  function ShallowClone() {}

  ShallowClone.extendClone = function(obj) {
    if (obj.constructor === Array) {
      return obj.slice();
    } else {
      return Object.create(obj);
    }
  };

  ShallowClone.shallowClone = function(obj) {
    var k, ret, v;
    if (!obj) {
      return obj;
    }
    if (obj.constructor === Array) {
      return obj.slice();
    } else {
      ret = {};
      for (k in obj) {
        v = obj[k];
        ret[k] = v;
      }
      return ret;
    }
  };

  return ShallowClone;

})();


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {


/*
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

OLD:
  I think we can do that with one change: addNamespace needs to
  change to take a name argument: @addNamespace: (name, namespace) ->

NEW:
  Ok, that's done. Now I need to revisit the mangler issue.
  Did this fix it?
 */
var ArtStandardLibCore, Namespace, isClass, isExtendedClass, isFunction, isPlainArray, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(62), isClass = ref.isClass, isFunction = ref.isFunction, isPlainArray = ref.isPlainArray, isExtendedClass = ref.isExtendedClass;

ArtStandardLibCore = null;

module.exports = Namespace = (function() {
  var excludedPropNames, isPathedNamespace;

  function Namespace() {}

  Namespace.isNamespace = function(klass) {
    return (klass != null ? klass.prototype : void 0) instanceof Namespace;
  };

  Namespace.allNamespaces = {};

  Namespace.getAllNamespacePaths = function() {
    return Object.keys(Namespace.allNamespaces).sort();
  };

  Namespace.toString = function() {
    return this.namespacePath;
  };

  Namespace.inspect = function() {
    return this.namespacePath;
  };

  Namespace.namespacePath = "Neptune.Namespace";

  Namespace.namespace = null;

  Namespace.namespaces = {};

  Namespace.modules = {};

  Namespace.getNamespacePath = function() {
    return this.namespacePath;
  };

  Namespace.getNamespaceNames = function() {
    return Object.keys(this.namespaces).sort();
  };

  Namespace.getModuleNames = function() {
    return Object.keys(this.modules).sort();
  };

  Namespace.getNeptuneLib = function() {
    return ArtStandardLibCore || (ArtStandardLibCore = __webpack_require__(61));
  };

  Namespace.getInspectedObjects = function(includeModules) {
    var name, namespace, obj;
    if (includeModules == null) {
      includeModules = true;
    }
    return (
      obj = {},
      obj["" + this.namespacePath] = this.getNeptuneLib().merge(this.version ? {
        version: this.version
      } : void 0, (function() {
        var ref1, results;
        ref1 = this.namespaces;
        results = [];
        for (name in ref1) {
          namespace = ref1[name];
          results.push(namespace.getInspectedObjects(includeModules));
        }
        return results;
      }).call(this), includeModules && this.getModuleNames().length > 0 ? {
        modules: this.getModuleNames().join(', ')
      } : void 0),
      obj
    );
  };

  Namespace.getVersions = function() {
    var key, out, recurse, ref1, subnamespace;
    out = {};
    if (this === Neptune) {
      out.NeptuneNamespacesRuntime = this.version;
    }
    ref1 = this.namespaces;
    for (key in ref1) {
      subnamespace = ref1[key];
      if (0 < Object.keys(recurse = subnamespace.getVersions()).length) {
        out[key] = recurse;
      }
      if (subnamespace.version != null) {
        out[key] || (out[key] = subnamespace.version);
      }
    }
    return out;
  };


  /*
  IN:
    "Foo" -> vivifies @Foo
    "Foo.Bar" ->  vivifies @Foo.Bar
    OR: ["Foo", "Bar", "Baz"] ->  vivifies @Foo.Bar.Baz
   */

  Namespace.vivifySubnamespace = function(name) {
    var PathedNamespace, base, j, len, namespace, path;
    if (isPathedNamespace(name)) {
      name = name.split('.');
    }
    if (isPlainArray(path = name)) {
      namespace = this;
      for (j = 0, len = path.length; j < len; j++) {
        name = path[j];
        namespace = namespace.vivifySubnamespace(name);
      }
      return namespace;
    } else {
      return (base = this.namespaces)[name] || (base[name] = this[name] = PathedNamespace = (function(superClass) {
        extend(PathedNamespace, superClass);

        function PathedNamespace() {
          return PathedNamespace.__super__.constructor.apply(this, arguments);
        }

        return PathedNamespace;

      })(Namespace._init(name, this)));
    }
  };

  Namespace.isPathedNamespace = isPathedNamespace = function(name) {
    return /\./.test(name);
  };

  Namespace.addVersionedNamespace = function(name, namespace) {
    var version, versions;
    if (!namespace) {
      return;
    }
    if (!(versions = (this.versionedNamespaces || (this.versionedNamespaces = {}))[name])) {
      versions = this.versionedNamespaces[name] = {};
      this.addVersionedNamespace(name, this.namespaces[name]);
    }
    version = namespace.version;
    console.warn(("NN: adding " + this.namespacePath + ".versionedNamespaces." + name + "['" + version + "']") + (namespace === this.namespaces[name] ? " (default)" : ""));
    if (version == null) {
      throw new Error("expecting namespace '" + name + "' in '" + this.namespacePath + "'' to have a version");
    }
    if (versions[version]) {
      console.warn("NN: versionedNamespace " + name + " already added for version " + version + ". Not added again.");
    } else {
      versions[version] = namespace;
    }
    return namespace;
  };

  Namespace.addNamespace = function(name, namespace) {
    var existingNamespace, j, path, ref1;
    if (isPathedNamespace(name)) {
      ref1 = name.split("."), path = 2 <= ref1.length ? slice.call(ref1, 0, j = ref1.length - 1) : (j = 0, []), name = ref1[j++];
      this.vivifySubnamespace(path).addNamespace(name, namespace);
    } else if (existingNamespace = this.namespaces[name]) {
      if (!((namespace.prototype instanceof Neptune.PackageNamespace) && (existingNamespace.prototype instanceof Neptune.PackageNamespace))) {
        throw new Error("PathedNamespace vs PackageNamespaces conflict for: " + this.namespacePath + "." + name + "'.");
      }
      this.addVersionedNamespace(name, namespace);
    } else {
      this.allNamespaces[namespace.namespacePath] = this.namespaces[name] = this[name] = namespace._init(name, this);
    }
    return namespace;
  };

  Namespace.addModules = function(map) {
    var modName, module, name;
    for (name in map) {
      module = map[name];
      this._setChildNamespaceProps(name, module);
      if (isExtendedClass(module) && name !== (modName = module.getName())) {
        console.warn("NN: module name (" + this.namespacePath + "." + name + ") does not match module.exports.getName(): " + modName);
      }
      if (!name.match(/^-/)) {
        this.modules[name] = this[name] = module;
      }
    }
    return this;
  };


  /*
  IN: any combination of objects or arrays
    object: all properties in the object are added to the namespace
  
    array: [fromObject, property names as one or more strings]
      for propName in every sub-string in args matching: /[0-9a-z_]+/ig
        @_addToNamespace propName, fromObject
  
      Each string is parsed to find everything that matches: /[0-9a-z_]+/ig
      All resulting property names are concated into a one list.
      Every property in fromObject that matches one of the property-names is added to the namespace.
   */

  Namespace.includeInNamespace = function() {
    var arg, args, fromObject, i, j, k, l, len, len1, propName, ref1, ref2, v;
    args = arguments.length === 1 && isPlainArray(arguments[0]) ? arguments[0] : arguments;
    for (j = 0, len = args.length; j < len; j++) {
      arg = args[j];
      if (arg != null) {
        if (isPlainArray(arg)) {
          fromObject = arg[0];
          for (i = k = 1, ref1 = arg.length; 1 <= ref1 ? k < ref1 : k > ref1; i = 1 <= ref1 ? ++k : --k) {
            ref2 = arg[i].match(/[0-9a-z_]+/ig);
            for (l = 0, len1 = ref2.length; l < len1; l++) {
              propName = ref2[l];
              this._addToNamespace(propName, fromObject);
            }
          }
        } else {
          for (propName in arg) {
            v = arg[propName];
            this._addToNamespace(propName, arg);
          }
        }
      }
    }
    return this;
  };


  /*
  Every child of a namespace gets these properties:
  
    namespace:      pointer to the parent namespace
    namespacePath:  string path from global to child
  
  NOTE: only modules which return a class or function
    get their namespace-props set.
   */

  Namespace._setChildNamespaceProps = function(name, child) {
    if (isFunction(child) || isClass(child)) {
      if (isFunction(child["class"])) {
        this._setChildNamespaceProps(name, child["class"]);
      }
      child.namespace = this;
      return child.namespacePath = this.namespacePath + "." + name;
    }
  };


  /*
  CoffeeScript classes copy all class props when inheriting,
  but some props need to be unique to each instance. This
  function initializes those props.
   */

  Namespace._init = function(name, namespace1) {
    var ref1;
    this.namespace = namespace1;
    this._name = name;
    this.modules = {};
    this.namespaces = {};
    this.versionedNamespaces = null;
    if ((ref1 = this.namespace) != null) {
      ref1._setChildNamespaceProps(name, this);
    }
    return this;
  };

  excludedPropNames = ["__super__", "_name", "version"].concat(Object.keys(Namespace));


  /*
  Helper for includeInNamespace.
  Add anything to the namespace.
  
  IN:
    propName:   property name to  value will be assigned to in the namespace (string)
    addingFrom: object
      used for reporting errors if attempting to overwrite an
      existing item.
  
  EFFECT:
    Only adds value if @[propName] is not already set.
    Otherwise, reports error and continues.
  
  OUT: value
   */

  Namespace._addToNamespace = function(propName, addingFrom) {
    var addingFromString, ref1, value;
    value = addingFrom[propName];
    if (propName === "inspect" && (value != null ? value.length : void 0) > 0) {
      return this[propName] = value;
    }
    if (indexOf.call(excludedPropNames, propName) >= 0) {
      return;
    }
    if (value == null) {
      return;
    }
    if (this[propName]) {
      if (this[propName] !== value) {
        addingFromString = addingFrom.namespacePath || addingFrom.propName || (Object.keys(addingFrom)).join(', ');
        console.error(this.namespacePath + " already has key: " + propName + ". Adding from: " + addingFromString);
      }
      this[propName];
    } else {
      this[propName] = value;
    }
    if (propName === 'version') {
      return (ref1 = this.namespace.versionedNamespaces) != null ? ref1[this.getName()][value] = this : void 0;
    }
  };

  return Namespace;

})();


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(74);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

(function(global) {
  'use strict';

  var dateFormat = (function() {
      var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZWN]|"[^"]*"|'[^']*'/g;
      var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
      var timezoneClip = /[^-+\dA-Z]/g;
  
      // Regexes and supporting functions are cached through closure
      return function (date, mask, utc, gmt) {
  
        // You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
        if (arguments.length === 1 && kindOf(date) === 'string' && !/\d/.test(date)) {
          mask = date;
          date = undefined;
        }
  
        date = date || new Date;
  
        if(!(date instanceof Date)) {
          date = new Date(date);
        }
  
        if (isNaN(date)) {
          throw TypeError('Invalid date');
        }
  
        mask = String(dateFormat.masks[mask] || mask || dateFormat.masks['default']);
  
        // Allow setting the utc/gmt argument via the mask
        var maskSlice = mask.slice(0, 4);
        if (maskSlice === 'UTC:' || maskSlice === 'GMT:') {
          mask = mask.slice(4);
          utc = true;
          if (maskSlice === 'GMT:') {
            gmt = true;
          }
        }
  
        var _ = utc ? 'getUTC' : 'get';
        var d = date[_ + 'Date']();
        var D = date[_ + 'Day']();
        var m = date[_ + 'Month']();
        var y = date[_ + 'FullYear']();
        var H = date[_ + 'Hours']();
        var M = date[_ + 'Minutes']();
        var s = date[_ + 'Seconds']();
        var L = date[_ + 'Milliseconds']();
        var o = utc ? 0 : date.getTimezoneOffset();
        var W = getWeek(date);
        var N = getDayOfWeek(date);
        var flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dateFormat.i18n.dayNames[D],
          dddd: dateFormat.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dateFormat.i18n.monthNames[m],
          mmmm: dateFormat.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(Math.round(L / 10)),
          t:    H < 12 ? dateFormat.i18n.timeNames[0] : dateFormat.i18n.timeNames[1],
          tt:   H < 12 ? dateFormat.i18n.timeNames[2] : dateFormat.i18n.timeNames[3],
          T:    H < 12 ? dateFormat.i18n.timeNames[4] : dateFormat.i18n.timeNames[5],
          TT:   H < 12 ? dateFormat.i18n.timeNames[6] : dateFormat.i18n.timeNames[7],
          Z:    gmt ? 'GMT' : utc ? 'UTC' : (String(date).match(timezone) || ['']).pop().replace(timezoneClip, ''),
          o:    (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10],
          W:    W,
          N:    N
        };
  
        return mask.replace(token, function (match) {
          if (match in flags) {
            return flags[match];
          }
          return match.slice(1, match.length - 1);
        });
      };
    })();

  dateFormat.masks = {
    'default':               'ddd mmm dd yyyy HH:MM:ss',
    'shortDate':             'm/d/yy',
    'mediumDate':            'mmm d, yyyy',
    'longDate':              'mmmm d, yyyy',
    'fullDate':              'dddd, mmmm d, yyyy',
    'shortTime':             'h:MM TT',
    'mediumTime':            'h:MM:ss TT',
    'longTime':              'h:MM:ss TT Z',
    'isoDate':               'yyyy-mm-dd',
    'isoTime':               'HH:MM:ss',
    'isoDateTime':           'yyyy-mm-dd\'T\'HH:MM:sso',
    'isoUtcDateTime':        'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\'',
    'expiresHeaderFormat':   'ddd, dd mmm yyyy HH:MM:ss Z'
  };

  // Internationalization strings
  dateFormat.i18n = {
    dayNames: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    monthNames: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ],
    timeNames: [
      'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
    ]
  };

function pad(val, len) {
  val = String(val);
  len = len || 2;
  while (val.length < len) {
    val = '0' + val;
  }
  return val;
}

/**
 * Get the ISO 8601 week number
 * Based on comments from
 * http://techblog.procurios.nl/k/n618/news/view/33796/14863/Calculate-ISO-8601-week-and-year-in-javascript.html
 *
 * @param  {Object} `date`
 * @return {Number}
 */
function getWeek(date) {
  // Remove time components of date
  var targetThursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  targetThursday.setDate(targetThursday.getDate() - ((targetThursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  targetThursday.setHours(targetThursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (targetThursday - firstThursday) / (86400000*7);
  return 1 + Math.floor(weekDiff);
}

/**
 * Get ISO-8601 numeric representation of the day of the week
 * 1 (for Monday) through 7 (for Sunday)
 * 
 * @param  {Object} `date`
 * @return {Number}
 */
function getDayOfWeek(date) {
  var dow = date.getDay();
  if(dow === 0) {
    dow = 7;
  }
  return dow;
}

/**
 * kind-of shortcut
 * @param  {*} val
 * @return {String}
 */
function kindOf(val) {
  if (val === null) {
    return 'null';
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (typeof val !== 'object') {
    return typeof val;
  }

  if (Array.isArray(val)) {
    return 'array';
  }

  return {}.toString.call(val)
    .slice(8, -1).toLowerCase();
};



  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return dateFormat;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = dateFormat;
  } else {
    global.dateFormat = dateFormat;
  }
})(this);


/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = false;

// Only Node.JS has a process variable that is of [[Class]] process
try {
 module.exports = Object.prototype.toString.call(global.process) === '[object process]' 
} catch(e) {}


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(60);

module.exports.includeInNamespace(__webpack_require__(58)).addModules({
  BaseClass: __webpack_require__(20),
  BaseObject: __webpack_require__(57),
  DeclarableMixin: __webpack_require__(59),
  ExtendablePropertyMixin: __webpack_require__(32),
  WebpackHotLoader: __webpack_require__(33)
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* @preserve
 * The MIT License (MIT)
 * 
 * Copyright (c) 2013-2017 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
/**
 * bluebird build version 3.5.1
 * Features enabled: core
 * Features disabled: race, call_get, generators, map, nodeify, promisify, props, reduce, settle, some, using, timers, filter, any, each
*/
!function(t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Promise=t()}}(function(){var t,e,n;return function r(t,e,n){function i(a,s){if(!e[a]){if(!t[a]){var c="function"==typeof _dereq_&&_dereq_;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var u=e[a]={exports:{}};t[a][0].call(u.exports,function(e){var n=t[a][1][e];return i(n?n:e)},u,u.exports,r,t,e,n)}return e[a].exports}for(var o="function"==typeof _dereq_&&_dereq_,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(t,e,n){"use strict";function r(){this._customScheduler=!1,this._isTickUsed=!1,this._lateQueue=new u(16),this._normalQueue=new u(16),this._haveDrainedQueues=!1,this._trampolineEnabled=!0;var t=this;this.drainQueues=function(){t._drainQueues()},this._schedule=l}function i(t,e,n){this._lateQueue.push(t,e,n),this._queueTick()}function o(t,e,n){this._normalQueue.push(t,e,n),this._queueTick()}function a(t){this._normalQueue._pushOne(t),this._queueTick()}var s;try{throw new Error}catch(c){s=c}var l=t("./schedule"),u=t("./queue"),p=t("./util");r.prototype.setScheduler=function(t){var e=this._schedule;return this._schedule=t,this._customScheduler=!0,e},r.prototype.hasCustomScheduler=function(){return this._customScheduler},r.prototype.enableTrampoline=function(){this._trampolineEnabled=!0},r.prototype.disableTrampolineIfNecessary=function(){p.hasDevTools&&(this._trampolineEnabled=!1)},r.prototype.haveItemsQueued=function(){return this._isTickUsed||this._haveDrainedQueues},r.prototype.fatalError=function(t,e){e?(process.stderr.write("Fatal "+(t instanceof Error?t.stack:t)+"\n"),process.exit(2)):this.throwLater(t)},r.prototype.throwLater=function(t,e){if(1===arguments.length&&(e=t,t=function(){throw e}),"undefined"!=typeof setTimeout)setTimeout(function(){t(e)},0);else try{this._schedule(function(){t(e)})}catch(n){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")}},p.hasDevTools?(r.prototype.invokeLater=function(t,e,n){this._trampolineEnabled?i.call(this,t,e,n):this._schedule(function(){setTimeout(function(){t.call(e,n)},100)})},r.prototype.invoke=function(t,e,n){this._trampolineEnabled?o.call(this,t,e,n):this._schedule(function(){t.call(e,n)})},r.prototype.settlePromises=function(t){this._trampolineEnabled?a.call(this,t):this._schedule(function(){t._settlePromises()})}):(r.prototype.invokeLater=i,r.prototype.invoke=o,r.prototype.settlePromises=a),r.prototype._drainQueue=function(t){for(;t.length()>0;){var e=t.shift();if("function"==typeof e){var n=t.shift(),r=t.shift();e.call(n,r)}else e._settlePromises()}},r.prototype._drainQueues=function(){this._drainQueue(this._normalQueue),this._reset(),this._haveDrainedQueues=!0,this._drainQueue(this._lateQueue)},r.prototype._queueTick=function(){this._isTickUsed||(this._isTickUsed=!0,this._schedule(this.drainQueues))},r.prototype._reset=function(){this._isTickUsed=!1},e.exports=r,e.exports.firstLineError=s},{"./queue":17,"./schedule":18,"./util":21}],2:[function(t,e,n){"use strict";e.exports=function(t,e,n,r){var i=!1,o=function(t,e){this._reject(e)},a=function(t,e){e.promiseRejectionQueued=!0,e.bindingPromise._then(o,o,null,this,t)},s=function(t,e){0===(50397184&this._bitField)&&this._resolveCallback(e.target)},c=function(t,e){e.promiseRejectionQueued||this._reject(t)};t.prototype.bind=function(o){i||(i=!0,t.prototype._propagateFrom=r.propagateFromFunction(),t.prototype._boundValue=r.boundValueFunction());var l=n(o),u=new t(e);u._propagateFrom(this,1);var p=this._target();if(u._setBoundTo(l),l instanceof t){var f={promiseRejectionQueued:!1,promise:u,target:p,bindingPromise:l};p._then(e,a,void 0,u,f),l._then(s,c,void 0,u,f),u._setOnCancel(l)}else u._resolveCallback(p);return u},t.prototype._setBoundTo=function(t){void 0!==t?(this._bitField=2097152|this._bitField,this._boundTo=t):this._bitField=-2097153&this._bitField},t.prototype._isBound=function(){return 2097152===(2097152&this._bitField)},t.bind=function(e,n){return t.resolve(n).bind(e)}}},{}],3:[function(t,e,n){"use strict";function r(){try{Promise===o&&(Promise=i)}catch(t){}return o}var i;"undefined"!=typeof Promise&&(i=Promise);var o=t("./promise")();o.noConflict=r,e.exports=o},{"./promise":15}],4:[function(t,e,n){"use strict";e.exports=function(e,n,r,i){var o=t("./util"),a=o.tryCatch,s=o.errorObj,c=e._async;e.prototype["break"]=e.prototype.cancel=function(){if(!i.cancellation())return this._warn("cancellation is disabled");for(var t=this,e=t;t._isCancellable();){if(!t._cancelBy(e)){e._isFollowing()?e._followee().cancel():e._cancelBranched();break}var n=t._cancellationParent;if(null==n||!n._isCancellable()){t._isFollowing()?t._followee().cancel():t._cancelBranched();break}t._isFollowing()&&t._followee().cancel(),t._setWillBeCancelled(),e=t,t=n}},e.prototype._branchHasCancelled=function(){this._branchesRemainingToCancel--},e.prototype._enoughBranchesHaveCancelled=function(){return void 0===this._branchesRemainingToCancel||this._branchesRemainingToCancel<=0},e.prototype._cancelBy=function(t){return t===this?(this._branchesRemainingToCancel=0,this._invokeOnCancel(),!0):(this._branchHasCancelled(),this._enoughBranchesHaveCancelled()?(this._invokeOnCancel(),!0):!1)},e.prototype._cancelBranched=function(){this._enoughBranchesHaveCancelled()&&this._cancel()},e.prototype._cancel=function(){this._isCancellable()&&(this._setCancelled(),c.invoke(this._cancelPromises,this,void 0))},e.prototype._cancelPromises=function(){this._length()>0&&this._settlePromises()},e.prototype._unsetOnCancel=function(){this._onCancelField=void 0},e.prototype._isCancellable=function(){return this.isPending()&&!this._isCancelled()},e.prototype.isCancellable=function(){return this.isPending()&&!this.isCancelled()},e.prototype._doInvokeOnCancel=function(t,e){if(o.isArray(t))for(var n=0;n<t.length;++n)this._doInvokeOnCancel(t[n],e);else if(void 0!==t)if("function"==typeof t){if(!e){var r=a(t).call(this._boundValue());r===s&&(this._attachExtraTrace(r.e),c.throwLater(r.e))}}else t._resultCancelled(this)},e.prototype._invokeOnCancel=function(){var t=this._onCancel();this._unsetOnCancel(),c.invoke(this._doInvokeOnCancel,this,t)},e.prototype._invokeInternalOnCancel=function(){this._isCancellable()&&(this._doInvokeOnCancel(this._onCancel(),!0),this._unsetOnCancel())},e.prototype._resultCancelled=function(){this.cancel()}}},{"./util":21}],5:[function(t,e,n){"use strict";e.exports=function(e){function n(t,n,s){return function(c){var l=s._boundValue();t:for(var u=0;u<t.length;++u){var p=t[u];if(p===Error||null!=p&&p.prototype instanceof Error){if(c instanceof p)return o(n).call(l,c)}else if("function"==typeof p){var f=o(p).call(l,c);if(f===a)return f;if(f)return o(n).call(l,c)}else if(r.isObject(c)){for(var h=i(p),_=0;_<h.length;++_){var d=h[_];if(p[d]!=c[d])continue t}return o(n).call(l,c)}}return e}}var r=t("./util"),i=t("./es5").keys,o=r.tryCatch,a=r.errorObj;return n}},{"./es5":10,"./util":21}],6:[function(t,e,n){"use strict";e.exports=function(t){function e(){this._trace=new e.CapturedTrace(r())}function n(){return i?new e:void 0}function r(){var t=o.length-1;return t>=0?o[t]:void 0}var i=!1,o=[];return t.prototype._promiseCreated=function(){},t.prototype._pushContext=function(){},t.prototype._popContext=function(){return null},t._peekContext=t.prototype._peekContext=function(){},e.prototype._pushContext=function(){void 0!==this._trace&&(this._trace._promiseCreated=null,o.push(this._trace))},e.prototype._popContext=function(){if(void 0!==this._trace){var t=o.pop(),e=t._promiseCreated;return t._promiseCreated=null,e}return null},e.CapturedTrace=null,e.create=n,e.deactivateLongStackTraces=function(){},e.activateLongStackTraces=function(){var n=t.prototype._pushContext,o=t.prototype._popContext,a=t._peekContext,s=t.prototype._peekContext,c=t.prototype._promiseCreated;e.deactivateLongStackTraces=function(){t.prototype._pushContext=n,t.prototype._popContext=o,t._peekContext=a,t.prototype._peekContext=s,t.prototype._promiseCreated=c,i=!1},i=!0,t.prototype._pushContext=e.prototype._pushContext,t.prototype._popContext=e.prototype._popContext,t._peekContext=t.prototype._peekContext=r,t.prototype._promiseCreated=function(){var t=this._peekContext();t&&null==t._promiseCreated&&(t._promiseCreated=this)}},e}},{}],7:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,e){return{promise:e}}function i(){return!1}function o(t,e,n){var r=this;try{t(e,n,function(t){if("function"!=typeof t)throw new TypeError("onCancel must be a function, got: "+I.toString(t));r._attachCancellationCallback(t)})}catch(i){return i}}function a(t){if(!this._isCancellable())return this;var e=this._onCancel();void 0!==e?I.isArray(e)?e.push(t):this._setOnCancel([e,t]):this._setOnCancel(t)}function s(){return this._onCancelField}function c(t){this._onCancelField=t}function l(){this._cancellationParent=void 0,this._onCancelField=void 0}function u(t,e){if(0!==(1&e)){this._cancellationParent=t;var n=t._branchesRemainingToCancel;void 0===n&&(n=0),t._branchesRemainingToCancel=n+1}0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function p(t,e){0!==(2&e)&&t._isBound()&&this._setBoundTo(t._boundTo)}function f(){var t=this._boundTo;return void 0!==t&&t instanceof e?t.isFulfilled()?t.value():void 0:t}function h(){this._trace=new x(this._peekContext())}function _(t,e){if(H(t)){var n=this._trace;if(void 0!==n&&e&&(n=n._parent),void 0!==n)n.attachExtraTrace(t);else if(!t.__stackCleaned__){var r=E(t);I.notEnumerableProp(t,"stack",r.message+"\n"+r.stack.join("\n")),I.notEnumerableProp(t,"__stackCleaned__",!0)}}}function d(t,e,n,r,i){if(void 0===t&&null!==e&&X){if(void 0!==i&&i._returnedNonUndefined())return;if(0===(65535&r._bitField))return;n&&(n+=" ");var o="",a="";if(e._trace){for(var s=e._trace.stack.split("\n"),c=C(s),l=c.length-1;l>=0;--l){var u=c[l];if(!V.test(u)){var p=u.match(Q);p&&(o="at "+p[1]+":"+p[2]+":"+p[3]+" ");break}}if(c.length>0)for(var f=c[0],l=0;l<s.length;++l)if(s[l]===f){l>0&&(a="\n"+s[l-1]);break}}var h="a promise was created in a "+n+"handler "+o+"but was not returned from it, see http://goo.gl/rRqMUw"+a;r._warn(h,!0,e)}}function v(t,e){var n=t+" is deprecated and will be removed in a future version.";return e&&(n+=" Use "+e+" instead."),y(n)}function y(t,n,r){if(ot.warnings){var i,o=new U(t);if(n)r._attachExtraTrace(o);else if(ot.longStackTraces&&(i=e._peekContext()))i.attachExtraTrace(o);else{var a=E(o);o.stack=a.message+"\n"+a.stack.join("\n")}tt("warning",o)||k(o,"",!0)}}function g(t,e){for(var n=0;n<e.length-1;++n)e[n].push("From previous event:"),e[n]=e[n].join("\n");return n<e.length&&(e[n]=e[n].join("\n")),t+"\n"+e.join("\n")}function m(t){for(var e=0;e<t.length;++e)(0===t[e].length||e+1<t.length&&t[e][0]===t[e+1][0])&&(t.splice(e,1),e--)}function b(t){for(var e=t[0],n=1;n<t.length;++n){for(var r=t[n],i=e.length-1,o=e[i],a=-1,s=r.length-1;s>=0;--s)if(r[s]===o){a=s;break}for(var s=a;s>=0;--s){var c=r[s];if(e[i]!==c)break;e.pop(),i--}e=r}}function C(t){for(var e=[],n=0;n<t.length;++n){var r=t[n],i="    (No stack trace)"===r||q.test(r),o=i&&nt(r);i&&!o&&(M&&" "!==r.charAt(0)&&(r="    "+r),e.push(r))}return e}function w(t){for(var e=t.stack.replace(/\s+$/g,"").split("\n"),n=0;n<e.length;++n){var r=e[n];if("    (No stack trace)"===r||q.test(r))break}return n>0&&"SyntaxError"!=t.name&&(e=e.slice(n)),e}function E(t){var e=t.stack,n=t.toString();return e="string"==typeof e&&e.length>0?w(t):["    (No stack trace)"],{message:n,stack:"SyntaxError"==t.name?e:C(e)}}function k(t,e,n){if("undefined"!=typeof console){var r;if(I.isObject(t)){var i=t.stack;r=e+G(i,t)}else r=e+String(t);"function"==typeof N?N(r,n):("function"==typeof console.log||"object"==typeof console.log)&&console.log(r)}}function j(t,e,n,r){var i=!1;try{"function"==typeof e&&(i=!0,"rejectionHandled"===t?e(r):e(n,r))}catch(o){B.throwLater(o)}"unhandledRejection"===t?tt(t,n,r)||i||k(n,"Unhandled rejection "):tt(t,r)}function F(t){var e;if("function"==typeof t)e="[function "+(t.name||"anonymous")+"]";else{e=t&&"function"==typeof t.toString?t.toString():I.toString(t);var n=/\[object [a-zA-Z0-9$_]+\]/;if(n.test(e))try{var r=JSON.stringify(t);e=r}catch(i){}0===e.length&&(e="(empty array)")}return"(<"+T(e)+">, no stack trace)"}function T(t){var e=41;return t.length<e?t:t.substr(0,e-3)+"..."}function P(){return"function"==typeof it}function R(t){var e=t.match(rt);return e?{fileName:e[1],line:parseInt(e[2],10)}:void 0}function S(t,e){if(P()){for(var n,r,i=t.stack.split("\n"),o=e.stack.split("\n"),a=-1,s=-1,c=0;c<i.length;++c){var l=R(i[c]);if(l){n=l.fileName,a=l.line;break}}for(var c=0;c<o.length;++c){var l=R(o[c]);if(l){r=l.fileName,s=l.line;break}}0>a||0>s||!n||!r||n!==r||a>=s||(nt=function(t){if(D.test(t))return!0;var e=R(t);return e&&e.fileName===n&&a<=e.line&&e.line<=s?!0:!1})}}function x(t){this._parent=t,this._promisesCreated=0;var e=this._length=1+(void 0===t?0:t._length);it(this,x),e>32&&this.uncycle()}var O,A,N,L=e._getDomain,B=e._async,U=t("./errors").Warning,I=t("./util"),H=I.canAttachTrace,D=/[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,V=/\((?:timers\.js):\d+:\d+\)/,Q=/[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,q=null,G=null,M=!1,W=!(0==I.env("BLUEBIRD_DEBUG")||!I.env("BLUEBIRD_DEBUG")&&"development"!==I.env("NODE_ENV")),$=!(0==I.env("BLUEBIRD_WARNINGS")||!W&&!I.env("BLUEBIRD_WARNINGS")),z=!(0==I.env("BLUEBIRD_LONG_STACK_TRACES")||!W&&!I.env("BLUEBIRD_LONG_STACK_TRACES")),X=0!=I.env("BLUEBIRD_W_FORGOTTEN_RETURN")&&($||!!I.env("BLUEBIRD_W_FORGOTTEN_RETURN"));e.prototype.suppressUnhandledRejections=function(){var t=this._target();t._bitField=-1048577&t._bitField|524288},e.prototype._ensurePossibleRejectionHandled=function(){if(0===(524288&this._bitField)){this._setRejectionIsUnhandled();var t=this;setTimeout(function(){t._notifyUnhandledRejection()},1)}},e.prototype._notifyUnhandledRejectionIsHandled=function(){j("rejectionHandled",O,void 0,this)},e.prototype._setReturnedNonUndefined=function(){this._bitField=268435456|this._bitField},e.prototype._returnedNonUndefined=function(){return 0!==(268435456&this._bitField)},e.prototype._notifyUnhandledRejection=function(){if(this._isRejectionUnhandled()){var t=this._settledValue();this._setUnhandledRejectionIsNotified(),j("unhandledRejection",A,t,this)}},e.prototype._setUnhandledRejectionIsNotified=function(){this._bitField=262144|this._bitField},e.prototype._unsetUnhandledRejectionIsNotified=function(){this._bitField=-262145&this._bitField},e.prototype._isUnhandledRejectionNotified=function(){return(262144&this._bitField)>0},e.prototype._setRejectionIsUnhandled=function(){this._bitField=1048576|this._bitField},e.prototype._unsetRejectionIsUnhandled=function(){this._bitField=-1048577&this._bitField,this._isUnhandledRejectionNotified()&&(this._unsetUnhandledRejectionIsNotified(),this._notifyUnhandledRejectionIsHandled())},e.prototype._isRejectionUnhandled=function(){return(1048576&this._bitField)>0},e.prototype._warn=function(t,e,n){return y(t,e,n||this)},e.onPossiblyUnhandledRejection=function(t){var e=L();A="function"==typeof t?null===e?t:I.domainBind(e,t):void 0},e.onUnhandledRejectionHandled=function(t){var e=L();O="function"==typeof t?null===e?t:I.domainBind(e,t):void 0};var K=function(){};e.longStackTraces=function(){if(B.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");if(!ot.longStackTraces&&P()){var t=e.prototype._captureStackTrace,r=e.prototype._attachExtraTrace;ot.longStackTraces=!0,K=function(){if(B.haveItemsQueued()&&!ot.longStackTraces)throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");e.prototype._captureStackTrace=t,e.prototype._attachExtraTrace=r,n.deactivateLongStackTraces(),B.enableTrampoline(),ot.longStackTraces=!1},e.prototype._captureStackTrace=h,e.prototype._attachExtraTrace=_,n.activateLongStackTraces(),B.disableTrampolineIfNecessary()}},e.hasLongStackTraces=function(){return ot.longStackTraces&&P()};var J=function(){try{if("function"==typeof CustomEvent){var t=new CustomEvent("CustomEvent");return I.global.dispatchEvent(t),function(t,e){var n=new CustomEvent(t.toLowerCase(),{detail:e,cancelable:!0});return!I.global.dispatchEvent(n)}}if("function"==typeof Event){var t=new Event("CustomEvent");return I.global.dispatchEvent(t),function(t,e){var n=new Event(t.toLowerCase(),{cancelable:!0});return n.detail=e,!I.global.dispatchEvent(n)}}var t=document.createEvent("CustomEvent");return t.initCustomEvent("testingtheevent",!1,!0,{}),I.global.dispatchEvent(t),function(t,e){var n=document.createEvent("CustomEvent");return n.initCustomEvent(t.toLowerCase(),!1,!0,e),!I.global.dispatchEvent(n)}}catch(e){}return function(){return!1}}(),Y=function(){return I.isNode?function(){return process.emit.apply(process,arguments)}:I.global?function(t){var e="on"+t.toLowerCase(),n=I.global[e];return n?(n.apply(I.global,[].slice.call(arguments,1)),!0):!1}:function(){return!1}}(),Z={promiseCreated:r,promiseFulfilled:r,promiseRejected:r,promiseResolved:r,promiseCancelled:r,promiseChained:function(t,e,n){return{promise:e,child:n}},warning:function(t,e){return{warning:e}},unhandledRejection:function(t,e,n){return{reason:e,promise:n}},rejectionHandled:r},tt=function(t){var e=!1;try{e=Y.apply(null,arguments)}catch(n){B.throwLater(n),e=!0}var r=!1;try{r=J(t,Z[t].apply(null,arguments))}catch(n){B.throwLater(n),r=!0}return r||e};e.config=function(t){if(t=Object(t),"longStackTraces"in t&&(t.longStackTraces?e.longStackTraces():!t.longStackTraces&&e.hasLongStackTraces()&&K()),"warnings"in t){var n=t.warnings;ot.warnings=!!n,X=ot.warnings,I.isObject(n)&&"wForgottenReturn"in n&&(X=!!n.wForgottenReturn)}if("cancellation"in t&&t.cancellation&&!ot.cancellation){if(B.haveItemsQueued())throw new Error("cannot enable cancellation after promises are in use");e.prototype._clearCancellationData=l,e.prototype._propagateFrom=u,e.prototype._onCancel=s,e.prototype._setOnCancel=c,e.prototype._attachCancellationCallback=a,e.prototype._execute=o,et=u,ot.cancellation=!0}return"monitoring"in t&&(t.monitoring&&!ot.monitoring?(ot.monitoring=!0,e.prototype._fireEvent=tt):!t.monitoring&&ot.monitoring&&(ot.monitoring=!1,e.prototype._fireEvent=i)),e},e.prototype._fireEvent=i,e.prototype._execute=function(t,e,n){try{t(e,n)}catch(r){return r}},e.prototype._onCancel=function(){},e.prototype._setOnCancel=function(t){},e.prototype._attachCancellationCallback=function(t){},e.prototype._captureStackTrace=function(){},e.prototype._attachExtraTrace=function(){},e.prototype._clearCancellationData=function(){},e.prototype._propagateFrom=function(t,e){};var et=p,nt=function(){return!1},rt=/[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/;I.inherits(x,Error),n.CapturedTrace=x,x.prototype.uncycle=function(){var t=this._length;if(!(2>t)){for(var e=[],n={},r=0,i=this;void 0!==i;++r)e.push(i),i=i._parent;t=this._length=r;for(var r=t-1;r>=0;--r){var o=e[r].stack;void 0===n[o]&&(n[o]=r)}for(var r=0;t>r;++r){var a=e[r].stack,s=n[a];if(void 0!==s&&s!==r){s>0&&(e[s-1]._parent=void 0,e[s-1]._length=1),e[r]._parent=void 0,e[r]._length=1;var c=r>0?e[r-1]:this;t-1>s?(c._parent=e[s+1],c._parent.uncycle(),c._length=c._parent._length+1):(c._parent=void 0,c._length=1);for(var l=c._length+1,u=r-2;u>=0;--u)e[u]._length=l,l++;return}}}},x.prototype.attachExtraTrace=function(t){if(!t.__stackCleaned__){this.uncycle();for(var e=E(t),n=e.message,r=[e.stack],i=this;void 0!==i;)r.push(C(i.stack.split("\n"))),i=i._parent;b(r),m(r),I.notEnumerableProp(t,"stack",g(n,r)),I.notEnumerableProp(t,"__stackCleaned__",!0)}};var it=function(){var t=/^\s*at\s*/,e=function(t,e){return"string"==typeof t?t:void 0!==e.name&&void 0!==e.message?e.toString():F(e)};if("number"==typeof Error.stackTraceLimit&&"function"==typeof Error.captureStackTrace){Error.stackTraceLimit+=6,q=t,G=e;var n=Error.captureStackTrace;return nt=function(t){return D.test(t)},function(t,e){Error.stackTraceLimit+=6,n(t,e),Error.stackTraceLimit-=6}}var r=new Error;if("string"==typeof r.stack&&r.stack.split("\n")[0].indexOf("stackDetection@")>=0)return q=/@/,G=e,M=!0,function(t){t.stack=(new Error).stack};var i;try{throw new Error}catch(o){i="stack"in o}return"stack"in r||!i||"number"!=typeof Error.stackTraceLimit?(G=function(t,e){return"string"==typeof t?t:"object"!=typeof e&&"function"!=typeof e||void 0===e.name||void 0===e.message?F(e):e.toString()},null):(q=t,G=e,function(t){Error.stackTraceLimit+=6;try{throw new Error}catch(e){t.stack=e.stack}Error.stackTraceLimit-=6})}([]);"undefined"!=typeof console&&"undefined"!=typeof console.warn&&(N=function(t){console.warn(t)},I.isNode&&process.stderr.isTTY?N=function(t,e){var n=e?"[33m":"[31m";console.warn(n+t+"[0m\n")}:I.isNode||"string"!=typeof(new Error).stack||(N=function(t,e){console.warn("%c"+t,e?"color: darkorange":"color: red")}));var ot={warnings:$,longStackTraces:!1,cancellation:!1,monitoring:!1};return z&&e.longStackTraces(),{longStackTraces:function(){return ot.longStackTraces},warnings:function(){return ot.warnings},cancellation:function(){return ot.cancellation},monitoring:function(){return ot.monitoring},propagateFromFunction:function(){return et},boundValueFunction:function(){return f},checkForgottenReturns:d,setBounds:S,warn:y,deprecated:v,CapturedTrace:x,fireDomEvent:J,fireGlobalEvent:Y}}},{"./errors":9,"./util":21}],8:[function(t,e,n){"use strict";e.exports=function(t){function e(){return this.value}function n(){throw this.reason}t.prototype["return"]=t.prototype.thenReturn=function(n){return n instanceof t&&n.suppressUnhandledRejections(),this._then(e,void 0,void 0,{value:n},void 0)},t.prototype["throw"]=t.prototype.thenThrow=function(t){return this._then(n,void 0,void 0,{reason:t},void 0)},t.prototype.catchThrow=function(t){if(arguments.length<=1)return this._then(void 0,n,void 0,{reason:t},void 0);var e=arguments[1],r=function(){throw e};return this.caught(t,r)},t.prototype.catchReturn=function(n){if(arguments.length<=1)return n instanceof t&&n.suppressUnhandledRejections(),this._then(void 0,e,void 0,{value:n},void 0);var r=arguments[1];r instanceof t&&r.suppressUnhandledRejections();var i=function(){return r};return this.caught(n,i)}}},{}],9:[function(t,e,n){"use strict";function r(t,e){function n(r){return this instanceof n?(p(this,"message","string"==typeof r?r:e),p(this,"name",t),void(Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):Error.call(this))):new n(r)}return u(n,Error),n}function i(t){return this instanceof i?(p(this,"name","OperationalError"),p(this,"message",t),this.cause=t,this.isOperational=!0,void(t instanceof Error?(p(this,"message",t.message),p(this,"stack",t.stack)):Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor))):new i(t)}var o,a,s=t("./es5"),c=s.freeze,l=t("./util"),u=l.inherits,p=l.notEnumerableProp,f=r("Warning","warning"),h=r("CancellationError","cancellation error"),_=r("TimeoutError","timeout error"),d=r("AggregateError","aggregate error");try{o=TypeError,a=RangeError}catch(v){o=r("TypeError","type error"),a=r("RangeError","range error")}for(var y="join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "),g=0;g<y.length;++g)"function"==typeof Array.prototype[y[g]]&&(d.prototype[y[g]]=Array.prototype[y[g]]);s.defineProperty(d.prototype,"length",{value:0,configurable:!1,writable:!0,enumerable:!0}),d.prototype.isOperational=!0;var m=0;d.prototype.toString=function(){var t=Array(4*m+1).join(" "),e="\n"+t+"AggregateError of:\n";m++,t=Array(4*m+1).join(" ");for(var n=0;n<this.length;++n){for(var r=this[n]===this?"[Circular AggregateError]":this[n]+"",i=r.split("\n"),o=0;o<i.length;++o)i[o]=t+i[o];r=i.join("\n"),e+=r+"\n"}return m--,e},u(i,Error);var b=Error.__BluebirdErrorTypes__;b||(b=c({CancellationError:h,TimeoutError:_,OperationalError:i,RejectionError:i,AggregateError:d}),s.defineProperty(Error,"__BluebirdErrorTypes__",{value:b,writable:!1,enumerable:!1,configurable:!1})),e.exports={Error:Error,TypeError:o,RangeError:a,CancellationError:b.CancellationError,OperationalError:b.OperationalError,TimeoutError:b.TimeoutError,AggregateError:b.AggregateError,Warning:f}},{"./es5":10,"./util":21}],10:[function(t,e,n){var r=function(){"use strict";return void 0===this}();if(r)e.exports={freeze:Object.freeze,defineProperty:Object.defineProperty,getDescriptor:Object.getOwnPropertyDescriptor,keys:Object.keys,names:Object.getOwnPropertyNames,getPrototypeOf:Object.getPrototypeOf,isArray:Array.isArray,isES5:r,propertyIsWritable:function(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return!(n&&!n.writable&&!n.set)}};else{var i={}.hasOwnProperty,o={}.toString,a={}.constructor.prototype,s=function(t){var e=[];for(var n in t)i.call(t,n)&&e.push(n);return e},c=function(t,e){return{value:t[e]}},l=function(t,e,n){return t[e]=n.value,t},u=function(t){return t},p=function(t){try{return Object(t).constructor.prototype}catch(e){return a}},f=function(t){try{return"[object Array]"===o.call(t)}catch(e){return!1}};e.exports={isArray:f,keys:s,names:s,defineProperty:l,getDescriptor:c,freeze:u,getPrototypeOf:p,isES5:r,propertyIsWritable:function(){return!0}}}},{}],11:[function(t,e,n){"use strict";e.exports=function(e,n,r){function i(t,e,n){this.promise=t,this.type=e,this.handler=n,this.called=!1,this.cancelPromise=null}function o(t){this.finallyHandler=t}function a(t,e){return null!=t.cancelPromise?(arguments.length>1?t.cancelPromise._reject(e):t.cancelPromise._cancel(),t.cancelPromise=null,!0):!1}function s(){return l.call(this,this.promise._target()._settledValue())}function c(t){return a(this,t)?void 0:(f.e=t,f)}function l(t){var i=this.promise,l=this.handler;if(!this.called){this.called=!0;var u=this.isFinallyHandler()?l.call(i._boundValue()):l.call(i._boundValue(),t);if(u===r)return u;if(void 0!==u){i._setReturnedNonUndefined();var h=n(u,i);if(h instanceof e){if(null!=this.cancelPromise){if(h._isCancelled()){var _=new p("late cancellation observer");return i._attachExtraTrace(_),f.e=_,f}h.isPending()&&h._attachCancellationCallback(new o(this))}return h._then(s,c,void 0,this,void 0)}}}return i.isRejected()?(a(this),f.e=t,f):(a(this),t)}var u=t("./util"),p=e.CancellationError,f=u.errorObj,h=t("./catch_filter")(r);return i.prototype.isFinallyHandler=function(){return 0===this.type},o.prototype._resultCancelled=function(){a(this.finallyHandler)},e.prototype._passThrough=function(t,e,n,r){return"function"!=typeof t?this.then():this._then(n,r,void 0,new i(this,e,t),void 0)},e.prototype.lastly=e.prototype["finally"]=function(t){return this._passThrough(t,0,l,l)},e.prototype.tap=function(t){return this._passThrough(t,1,l)},e.prototype.tapCatch=function(t){var n=arguments.length;if(1===n)return this._passThrough(t,1,void 0,l);var r,i=new Array(n-1),o=0;for(r=0;n-1>r;++r){var a=arguments[r];if(!u.isObject(a))return e.reject(new TypeError("tapCatch statement predicate: expecting an object but got "+u.classString(a)));i[o++]=a}i.length=o;var s=arguments[r];return this._passThrough(h(i,s,this),1,void 0,l)},i}},{"./catch_filter":5,"./util":21}],12:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o,a){var s=t("./util");s.canEvaluate,s.tryCatch,s.errorObj;e.join=function(){var t,e=arguments.length-1;if(e>0&&"function"==typeof arguments[e]){t=arguments[e];var r}var i=[].slice.call(arguments);t&&i.pop();var r=new n(i).promise();return void 0!==t?r.spread(t):r}}},{"./util":21}],13:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){var a=t("./util"),s=a.tryCatch;e.method=function(t){if("function"!=typeof t)throw new e.TypeError("expecting a function but got "+a.classString(t));return function(){var r=new e(n);r._captureStackTrace(),r._pushContext();var i=s(t).apply(this,arguments),a=r._popContext();return o.checkForgottenReturns(i,a,"Promise.method",r),r._resolveFromSyncValue(i),r}},e.attempt=e["try"]=function(t){if("function"!=typeof t)return i("expecting a function but got "+a.classString(t));var r=new e(n);r._captureStackTrace(),r._pushContext();var c;if(arguments.length>1){o.deprecated("calling Promise.try with more than 1 argument");var l=arguments[1],u=arguments[2];c=a.isArray(l)?s(t).apply(u,l):s(t).call(u,l)}else c=s(t)();var p=r._popContext();return o.checkForgottenReturns(c,p,"Promise.try",r),r._resolveFromSyncValue(c),r},e.prototype._resolveFromSyncValue=function(t){t===a.errorObj?this._rejectCallback(t.e,!1):this._resolveCallback(t,!0)}}},{"./util":21}],14:[function(t,e,n){"use strict";function r(t){return t instanceof Error&&u.getPrototypeOf(t)===Error.prototype}function i(t){var e;if(r(t)){e=new l(t),e.name=t.name,e.message=t.message,e.stack=t.stack;for(var n=u.keys(t),i=0;i<n.length;++i){var o=n[i];p.test(o)||(e[o]=t[o])}return e}return a.markAsOriginatingFromRejection(t),t}function o(t,e){return function(n,r){if(null!==t){if(n){var o=i(s(n));t._attachExtraTrace(o),t._reject(o)}else if(e){var a=[].slice.call(arguments,1);t._fulfill(a)}else t._fulfill(r);t=null}}}var a=t("./util"),s=a.maybeWrapAsError,c=t("./errors"),l=c.OperationalError,u=t("./es5"),p=/^(?:name|message|stack|cause)$/;e.exports=o},{"./errors":9,"./es5":10,"./util":21}],15:[function(t,e,n){"use strict";e.exports=function(){function n(){}function r(t,e){if(null==t||t.constructor!==i)throw new g("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");if("function"!=typeof e)throw new g("expecting a function but got "+h.classString(e))}function i(t){t!==b&&r(this,t),this._bitField=0,this._fulfillmentHandler0=void 0,this._rejectionHandler0=void 0,this._promise0=void 0,this._receiver0=void 0,this._resolveFromExecutor(t),this._promiseCreated(),this._fireEvent("promiseCreated",this)}function o(t){this.promise._resolveCallback(t)}function a(t){this.promise._rejectCallback(t,!1)}function s(t){var e=new i(b);e._fulfillmentHandler0=t,e._rejectionHandler0=t,e._promise0=t,e._receiver0=t}var c,l=function(){return new g("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n")},u=function(){return new i.PromiseInspection(this._target())},p=function(t){return i.reject(new g(t))},f={},h=t("./util");c=h.isNode?function(){var t=process.domain;return void 0===t&&(t=null),t}:function(){return null},h.notEnumerableProp(i,"_getDomain",c);var _=t("./es5"),d=t("./async"),v=new d;_.defineProperty(i,"_async",{value:v});var y=t("./errors"),g=i.TypeError=y.TypeError;i.RangeError=y.RangeError;var m=i.CancellationError=y.CancellationError;i.TimeoutError=y.TimeoutError,i.OperationalError=y.OperationalError,i.RejectionError=y.OperationalError,i.AggregateError=y.AggregateError;var b=function(){},C={},w={},E=t("./thenables")(i,b),k=t("./promise_array")(i,b,E,p,n),j=t("./context")(i),F=(j.create,t("./debuggability")(i,j)),T=(F.CapturedTrace,t("./finally")(i,E,w)),P=t("./catch_filter")(w),R=t("./nodeback"),S=h.errorObj,x=h.tryCatch;return i.prototype.toString=function(){return"[object Promise]"},i.prototype.caught=i.prototype["catch"]=function(t){var e=arguments.length;if(e>1){var n,r=new Array(e-1),i=0;for(n=0;e-1>n;++n){var o=arguments[n];if(!h.isObject(o))return p("Catch statement predicate: expecting an object but got "+h.classString(o));r[i++]=o}return r.length=i,t=arguments[n],this.then(void 0,P(r,t,this))}return this.then(void 0,t)},i.prototype.reflect=function(){return this._then(u,u,void 0,this,void 0)},i.prototype.then=function(t,e){if(F.warnings()&&arguments.length>0&&"function"!=typeof t&&"function"!=typeof e){var n=".then() only accepts functions but was passed: "+h.classString(t);arguments.length>1&&(n+=", "+h.classString(e)),this._warn(n)}return this._then(t,e,void 0,void 0,void 0)},i.prototype.done=function(t,e){var n=this._then(t,e,void 0,void 0,void 0);n._setIsFinal()},i.prototype.spread=function(t){return"function"!=typeof t?p("expecting a function but got "+h.classString(t)):this.all()._then(t,void 0,void 0,C,void 0);
},i.prototype.toJSON=function(){var t={isFulfilled:!1,isRejected:!1,fulfillmentValue:void 0,rejectionReason:void 0};return this.isFulfilled()?(t.fulfillmentValue=this.value(),t.isFulfilled=!0):this.isRejected()&&(t.rejectionReason=this.reason(),t.isRejected=!0),t},i.prototype.all=function(){return arguments.length>0&&this._warn(".all() was passed arguments but it does not take any"),new k(this).promise()},i.prototype.error=function(t){return this.caught(h.originatesFromRejection,t)},i.getNewLibraryCopy=e.exports,i.is=function(t){return t instanceof i},i.fromNode=i.fromCallback=function(t){var e=new i(b);e._captureStackTrace();var n=arguments.length>1?!!Object(arguments[1]).multiArgs:!1,r=x(t)(R(e,n));return r===S&&e._rejectCallback(r.e,!0),e._isFateSealed()||e._setAsyncGuaranteed(),e},i.all=function(t){return new k(t).promise()},i.cast=function(t){var e=E(t);return e instanceof i||(e=new i(b),e._captureStackTrace(),e._setFulfilled(),e._rejectionHandler0=t),e},i.resolve=i.fulfilled=i.cast,i.reject=i.rejected=function(t){var e=new i(b);return e._captureStackTrace(),e._rejectCallback(t,!0),e},i.setScheduler=function(t){if("function"!=typeof t)throw new g("expecting a function but got "+h.classString(t));return v.setScheduler(t)},i.prototype._then=function(t,e,n,r,o){var a=void 0!==o,s=a?o:new i(b),l=this._target(),u=l._bitField;a||(s._propagateFrom(this,3),s._captureStackTrace(),void 0===r&&0!==(2097152&this._bitField)&&(r=0!==(50397184&u)?this._boundValue():l===this?void 0:this._boundTo),this._fireEvent("promiseChained",this,s));var p=c();if(0!==(50397184&u)){var f,_,d=l._settlePromiseCtx;0!==(33554432&u)?(_=l._rejectionHandler0,f=t):0!==(16777216&u)?(_=l._fulfillmentHandler0,f=e,l._unsetRejectionIsUnhandled()):(d=l._settlePromiseLateCancellationObserver,_=new m("late cancellation observer"),l._attachExtraTrace(_),f=e),v.invoke(d,l,{handler:null===p?f:"function"==typeof f&&h.domainBind(p,f),promise:s,receiver:r,value:_})}else l._addCallbacks(t,e,s,r,p);return s},i.prototype._length=function(){return 65535&this._bitField},i.prototype._isFateSealed=function(){return 0!==(117506048&this._bitField)},i.prototype._isFollowing=function(){return 67108864===(67108864&this._bitField)},i.prototype._setLength=function(t){this._bitField=-65536&this._bitField|65535&t},i.prototype._setFulfilled=function(){this._bitField=33554432|this._bitField,this._fireEvent("promiseFulfilled",this)},i.prototype._setRejected=function(){this._bitField=16777216|this._bitField,this._fireEvent("promiseRejected",this)},i.prototype._setFollowing=function(){this._bitField=67108864|this._bitField,this._fireEvent("promiseResolved",this)},i.prototype._setIsFinal=function(){this._bitField=4194304|this._bitField},i.prototype._isFinal=function(){return(4194304&this._bitField)>0},i.prototype._unsetCancelled=function(){this._bitField=-65537&this._bitField},i.prototype._setCancelled=function(){this._bitField=65536|this._bitField,this._fireEvent("promiseCancelled",this)},i.prototype._setWillBeCancelled=function(){this._bitField=8388608|this._bitField},i.prototype._setAsyncGuaranteed=function(){v.hasCustomScheduler()||(this._bitField=134217728|this._bitField)},i.prototype._receiverAt=function(t){var e=0===t?this._receiver0:this[4*t-4+3];return e===f?void 0:void 0===e&&this._isBound()?this._boundValue():e},i.prototype._promiseAt=function(t){return this[4*t-4+2]},i.prototype._fulfillmentHandlerAt=function(t){return this[4*t-4+0]},i.prototype._rejectionHandlerAt=function(t){return this[4*t-4+1]},i.prototype._boundValue=function(){},i.prototype._migrateCallback0=function(t){var e=(t._bitField,t._fulfillmentHandler0),n=t._rejectionHandler0,r=t._promise0,i=t._receiverAt(0);void 0===i&&(i=f),this._addCallbacks(e,n,r,i,null)},i.prototype._migrateCallbackAt=function(t,e){var n=t._fulfillmentHandlerAt(e),r=t._rejectionHandlerAt(e),i=t._promiseAt(e),o=t._receiverAt(e);void 0===o&&(o=f),this._addCallbacks(n,r,i,o,null)},i.prototype._addCallbacks=function(t,e,n,r,i){var o=this._length();if(o>=65531&&(o=0,this._setLength(0)),0===o)this._promise0=n,this._receiver0=r,"function"==typeof t&&(this._fulfillmentHandler0=null===i?t:h.domainBind(i,t)),"function"==typeof e&&(this._rejectionHandler0=null===i?e:h.domainBind(i,e));else{var a=4*o-4;this[a+2]=n,this[a+3]=r,"function"==typeof t&&(this[a+0]=null===i?t:h.domainBind(i,t)),"function"==typeof e&&(this[a+1]=null===i?e:h.domainBind(i,e))}return this._setLength(o+1),o},i.prototype._proxy=function(t,e){this._addCallbacks(void 0,void 0,e,t,null)},i.prototype._resolveCallback=function(t,e){if(0===(117506048&this._bitField)){if(t===this)return this._rejectCallback(l(),!1);var n=E(t,this);if(!(n instanceof i))return this._fulfill(t);e&&this._propagateFrom(n,2);var r=n._target();if(r===this)return void this._reject(l());var o=r._bitField;if(0===(50397184&o)){var a=this._length();a>0&&r._migrateCallback0(this);for(var s=1;a>s;++s)r._migrateCallbackAt(this,s);this._setFollowing(),this._setLength(0),this._setFollowee(r)}else if(0!==(33554432&o))this._fulfill(r._value());else if(0!==(16777216&o))this._reject(r._reason());else{var c=new m("late cancellation observer");r._attachExtraTrace(c),this._reject(c)}}},i.prototype._rejectCallback=function(t,e,n){var r=h.ensureErrorObject(t),i=r===t;if(!i&&!n&&F.warnings()){var o="a promise was rejected with a non-error: "+h.classString(t);this._warn(o,!0)}this._attachExtraTrace(r,e?i:!1),this._reject(t)},i.prototype._resolveFromExecutor=function(t){if(t!==b){var e=this;this._captureStackTrace(),this._pushContext();var n=!0,r=this._execute(t,function(t){e._resolveCallback(t)},function(t){e._rejectCallback(t,n)});n=!1,this._popContext(),void 0!==r&&e._rejectCallback(r,!0)}},i.prototype._settlePromiseFromHandler=function(t,e,n,r){var i=r._bitField;if(0===(65536&i)){r._pushContext();var o;e===C?n&&"number"==typeof n.length?o=x(t).apply(this._boundValue(),n):(o=S,o.e=new g("cannot .spread() a non-array: "+h.classString(n))):o=x(t).call(e,n);var a=r._popContext();i=r._bitField,0===(65536&i)&&(o===w?r._reject(n):o===S?r._rejectCallback(o.e,!1):(F.checkForgottenReturns(o,a,"",r,this),r._resolveCallback(o)))}},i.prototype._target=function(){for(var t=this;t._isFollowing();)t=t._followee();return t},i.prototype._followee=function(){return this._rejectionHandler0},i.prototype._setFollowee=function(t){this._rejectionHandler0=t},i.prototype._settlePromise=function(t,e,r,o){var a=t instanceof i,s=this._bitField,c=0!==(134217728&s);0!==(65536&s)?(a&&t._invokeInternalOnCancel(),r instanceof T&&r.isFinallyHandler()?(r.cancelPromise=t,x(e).call(r,o)===S&&t._reject(S.e)):e===u?t._fulfill(u.call(r)):r instanceof n?r._promiseCancelled(t):a||t instanceof k?t._cancel():r.cancel()):"function"==typeof e?a?(c&&t._setAsyncGuaranteed(),this._settlePromiseFromHandler(e,r,o,t)):e.call(r,o,t):r instanceof n?r._isResolved()||(0!==(33554432&s)?r._promiseFulfilled(o,t):r._promiseRejected(o,t)):a&&(c&&t._setAsyncGuaranteed(),0!==(33554432&s)?t._fulfill(o):t._reject(o))},i.prototype._settlePromiseLateCancellationObserver=function(t){var e=t.handler,n=t.promise,r=t.receiver,o=t.value;"function"==typeof e?n instanceof i?this._settlePromiseFromHandler(e,r,o,n):e.call(r,o,n):n instanceof i&&n._reject(o)},i.prototype._settlePromiseCtx=function(t){this._settlePromise(t.promise,t.handler,t.receiver,t.value)},i.prototype._settlePromise0=function(t,e,n){var r=this._promise0,i=this._receiverAt(0);this._promise0=void 0,this._receiver0=void 0,this._settlePromise(r,t,i,e)},i.prototype._clearCallbackDataAtIndex=function(t){var e=4*t-4;this[e+2]=this[e+3]=this[e+0]=this[e+1]=void 0},i.prototype._fulfill=function(t){var e=this._bitField;if(!((117506048&e)>>>16)){if(t===this){var n=l();return this._attachExtraTrace(n),this._reject(n)}this._setFulfilled(),this._rejectionHandler0=t,(65535&e)>0&&(0!==(134217728&e)?this._settlePromises():v.settlePromises(this))}},i.prototype._reject=function(t){var e=this._bitField;if(!((117506048&e)>>>16))return this._setRejected(),this._fulfillmentHandler0=t,this._isFinal()?v.fatalError(t,h.isNode):void((65535&e)>0?v.settlePromises(this):this._ensurePossibleRejectionHandled())},i.prototype._fulfillPromises=function(t,e){for(var n=1;t>n;n++){var r=this._fulfillmentHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._rejectPromises=function(t,e){for(var n=1;t>n;n++){var r=this._rejectionHandlerAt(n),i=this._promiseAt(n),o=this._receiverAt(n);this._clearCallbackDataAtIndex(n),this._settlePromise(i,r,o,e)}},i.prototype._settlePromises=function(){var t=this._bitField,e=65535&t;if(e>0){if(0!==(16842752&t)){var n=this._fulfillmentHandler0;this._settlePromise0(this._rejectionHandler0,n,t),this._rejectPromises(e,n)}else{var r=this._rejectionHandler0;this._settlePromise0(this._fulfillmentHandler0,r,t),this._fulfillPromises(e,r)}this._setLength(0)}this._clearCancellationData()},i.prototype._settledValue=function(){var t=this._bitField;return 0!==(33554432&t)?this._rejectionHandler0:0!==(16777216&t)?this._fulfillmentHandler0:void 0},i.defer=i.pending=function(){F.deprecated("Promise.defer","new Promise");var t=new i(b);return{promise:t,resolve:o,reject:a}},h.notEnumerableProp(i,"_makeSelfResolutionError",l),t("./method")(i,b,E,p,F),t("./bind")(i,b,E,F),t("./cancel")(i,k,p,F),t("./direct_resolve")(i),t("./synchronous_inspection")(i),t("./join")(i,k,E,b,v,c),i.Promise=i,i.version="3.5.1",h.toFastProperties(i),h.toFastProperties(i.prototype),s({a:1}),s({b:2}),s({c:3}),s(1),s(function(){}),s(void 0),s(!1),s(new i(b)),F.setBounds(d.firstLineError,h.lastLineError),i}},{"./async":1,"./bind":2,"./cancel":4,"./catch_filter":5,"./context":6,"./debuggability":7,"./direct_resolve":8,"./errors":9,"./es5":10,"./finally":11,"./join":12,"./method":13,"./nodeback":14,"./promise_array":16,"./synchronous_inspection":19,"./thenables":20,"./util":21}],16:[function(t,e,n){"use strict";e.exports=function(e,n,r,i,o){function a(t){switch(t){case-2:return[];case-3:return{};case-6:return new Map}}function s(t){var r=this._promise=new e(n);t instanceof e&&r._propagateFrom(t,3),r._setOnCancel(this),this._values=t,this._length=0,this._totalResolved=0,this._init(void 0,-2)}var c=t("./util");c.isArray;return c.inherits(s,o),s.prototype.length=function(){return this._length},s.prototype.promise=function(){return this._promise},s.prototype._init=function l(t,n){var o=r(this._values,this._promise);if(o instanceof e){o=o._target();var s=o._bitField;if(this._values=o,0===(50397184&s))return this._promise._setAsyncGuaranteed(),o._then(l,this._reject,void 0,this,n);if(0===(33554432&s))return 0!==(16777216&s)?this._reject(o._reason()):this._cancel();o=o._value()}if(o=c.asArray(o),null===o){var u=i("expecting an array or an iterable object but got "+c.classString(o)).reason();return void this._promise._rejectCallback(u,!1)}return 0===o.length?void(-5===n?this._resolveEmptyArray():this._resolve(a(n))):void this._iterate(o)},s.prototype._iterate=function(t){var n=this.getActualLength(t.length);this._length=n,this._values=this.shouldCopyValues()?new Array(n):this._values;for(var i=this._promise,o=!1,a=null,s=0;n>s;++s){var c=r(t[s],i);c instanceof e?(c=c._target(),a=c._bitField):a=null,o?null!==a&&c.suppressUnhandledRejections():null!==a?0===(50397184&a)?(c._proxy(this,s),this._values[s]=c):o=0!==(33554432&a)?this._promiseFulfilled(c._value(),s):0!==(16777216&a)?this._promiseRejected(c._reason(),s):this._promiseCancelled(s):o=this._promiseFulfilled(c,s)}o||i._setAsyncGuaranteed()},s.prototype._isResolved=function(){return null===this._values},s.prototype._resolve=function(t){this._values=null,this._promise._fulfill(t)},s.prototype._cancel=function(){!this._isResolved()&&this._promise._isCancellable()&&(this._values=null,this._promise._cancel())},s.prototype._reject=function(t){this._values=null,this._promise._rejectCallback(t,!1)},s.prototype._promiseFulfilled=function(t,e){this._values[e]=t;var n=++this._totalResolved;return n>=this._length?(this._resolve(this._values),!0):!1},s.prototype._promiseCancelled=function(){return this._cancel(),!0},s.prototype._promiseRejected=function(t){return this._totalResolved++,this._reject(t),!0},s.prototype._resultCancelled=function(){if(!this._isResolved()){var t=this._values;if(this._cancel(),t instanceof e)t.cancel();else for(var n=0;n<t.length;++n)t[n]instanceof e&&t[n].cancel()}},s.prototype.shouldCopyValues=function(){return!0},s.prototype.getActualLength=function(t){return t},s}},{"./util":21}],17:[function(t,e,n){"use strict";function r(t,e,n,r,i){for(var o=0;i>o;++o)n[o+r]=t[o+e],t[o+e]=void 0}function i(t){this._capacity=t,this._length=0,this._front=0}i.prototype._willBeOverCapacity=function(t){return this._capacity<t},i.prototype._pushOne=function(t){var e=this.length();this._checkCapacity(e+1);var n=this._front+e&this._capacity-1;this[n]=t,this._length=e+1},i.prototype.push=function(t,e,n){var r=this.length()+3;if(this._willBeOverCapacity(r))return this._pushOne(t),this._pushOne(e),void this._pushOne(n);var i=this._front+r-3;this._checkCapacity(r);var o=this._capacity-1;this[i+0&o]=t,this[i+1&o]=e,this[i+2&o]=n,this._length=r},i.prototype.shift=function(){var t=this._front,e=this[t];return this[t]=void 0,this._front=t+1&this._capacity-1,this._length--,e},i.prototype.length=function(){return this._length},i.prototype._checkCapacity=function(t){this._capacity<t&&this._resizeTo(this._capacity<<1)},i.prototype._resizeTo=function(t){var e=this._capacity;this._capacity=t;var n=this._front,i=this._length,o=n+i&e-1;r(this,0,this,e,o)},e.exports=i},{}],18:[function(t,e,n){"use strict";var r,i=t("./util"),o=function(){throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n")},a=i.getNativePromise();if(i.isNode&&"undefined"==typeof MutationObserver){var s=global.setImmediate,c=process.nextTick;r=i.isRecentNode?function(t){s.call(global,t)}:function(t){c.call(process,t)}}else if("function"==typeof a&&"function"==typeof a.resolve){var l=a.resolve();r=function(t){l.then(t)}}else r="undefined"==typeof MutationObserver||"undefined"!=typeof window&&window.navigator&&(window.navigator.standalone||window.cordova)?"undefined"!=typeof setImmediate?function(t){setImmediate(t)}:"undefined"!=typeof setTimeout?function(t){setTimeout(t,0)}:o:function(){var t=document.createElement("div"),e={attributes:!0},n=!1,r=document.createElement("div"),i=new MutationObserver(function(){t.classList.toggle("foo"),n=!1});i.observe(r,e);var o=function(){n||(n=!0,r.classList.toggle("foo"))};return function(n){var r=new MutationObserver(function(){r.disconnect(),n()});r.observe(t,e),o()}}();e.exports=r},{"./util":21}],19:[function(t,e,n){"use strict";e.exports=function(t){function e(t){void 0!==t?(t=t._target(),this._bitField=t._bitField,this._settledValueField=t._isFateSealed()?t._settledValue():void 0):(this._bitField=0,this._settledValueField=void 0)}e.prototype._settledValue=function(){return this._settledValueField};var n=e.prototype.value=function(){if(!this.isFulfilled())throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},r=e.prototype.error=e.prototype.reason=function(){if(!this.isRejected())throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");return this._settledValue()},i=e.prototype.isFulfilled=function(){return 0!==(33554432&this._bitField)},o=e.prototype.isRejected=function(){return 0!==(16777216&this._bitField)},a=e.prototype.isPending=function(){return 0===(50397184&this._bitField)},s=e.prototype.isResolved=function(){return 0!==(50331648&this._bitField)};e.prototype.isCancelled=function(){return 0!==(8454144&this._bitField)},t.prototype.__isCancelled=function(){return 65536===(65536&this._bitField)},t.prototype._isCancelled=function(){return this._target().__isCancelled()},t.prototype.isCancelled=function(){return 0!==(8454144&this._target()._bitField)},t.prototype.isPending=function(){return a.call(this._target())},t.prototype.isRejected=function(){return o.call(this._target())},t.prototype.isFulfilled=function(){return i.call(this._target())},t.prototype.isResolved=function(){return s.call(this._target())},t.prototype.value=function(){return n.call(this._target())},t.prototype.reason=function(){var t=this._target();return t._unsetRejectionIsUnhandled(),r.call(t)},t.prototype._value=function(){return this._settledValue()},t.prototype._reason=function(){return this._unsetRejectionIsUnhandled(),this._settledValue()},t.PromiseInspection=e}},{}],20:[function(t,e,n){"use strict";e.exports=function(e,n){function r(t,r){if(u(t)){if(t instanceof e)return t;var i=o(t);if(i===l){r&&r._pushContext();var c=e.reject(i.e);return r&&r._popContext(),c}if("function"==typeof i){if(a(t)){var c=new e(n);return t._then(c._fulfill,c._reject,void 0,c,null),c}return s(t,i,r)}}return t}function i(t){return t.then}function o(t){try{return i(t)}catch(e){return l.e=e,l}}function a(t){try{return p.call(t,"_promise0")}catch(e){return!1}}function s(t,r,i){function o(t){s&&(s._resolveCallback(t),s=null)}function a(t){s&&(s._rejectCallback(t,p,!0),s=null)}var s=new e(n),u=s;i&&i._pushContext(),s._captureStackTrace(),i&&i._popContext();var p=!0,f=c.tryCatch(r).call(t,o,a);return p=!1,s&&f===l&&(s._rejectCallback(f.e,!0,!0),s=null),u}var c=t("./util"),l=c.errorObj,u=c.isObject,p={}.hasOwnProperty;return r}},{"./util":21}],21:[function(t,e,n){"use strict";function r(){try{var t=R;return R=null,t.apply(this,arguments)}catch(e){return P.e=e,P}}function i(t){return R=t,r}function o(t){return null==t||t===!0||t===!1||"string"==typeof t||"number"==typeof t}function a(t){return"function"==typeof t||"object"==typeof t&&null!==t}function s(t){return o(t)?new Error(v(t)):t}function c(t,e){var n,r=t.length,i=new Array(r+1);for(n=0;r>n;++n)i[n]=t[n];return i[n]=e,i}function l(t,e,n){if(!F.isES5)return{}.hasOwnProperty.call(t,e)?t[e]:void 0;var r=Object.getOwnPropertyDescriptor(t,e);return null!=r?null==r.get&&null==r.set?r.value:n:void 0}function u(t,e,n){if(o(t))return t;var r={value:n,configurable:!0,enumerable:!1,writable:!0};return F.defineProperty(t,e,r),t}function p(t){throw t}function f(t){try{if("function"==typeof t){var e=F.names(t.prototype),n=F.isES5&&e.length>1,r=e.length>0&&!(1===e.length&&"constructor"===e[0]),i=A.test(t+"")&&F.names(t).length>0;if(n||r||i)return!0}return!1}catch(o){return!1}}function h(t){function e(){}e.prototype=t;for(var n=8;n--;)new e;return t}function _(t){return N.test(t)}function d(t,e,n){for(var r=new Array(t),i=0;t>i;++i)r[i]=e+i+n;return r}function v(t){try{return t+""}catch(e){return"[no string representation]"}}function y(t){return t instanceof Error||null!==t&&"object"==typeof t&&"string"==typeof t.message&&"string"==typeof t.name}function g(t){try{u(t,"isOperational",!0)}catch(e){}}function m(t){return null==t?!1:t instanceof Error.__BluebirdErrorTypes__.OperationalError||t.isOperational===!0}function b(t){return y(t)&&F.propertyIsWritable(t,"stack")}function C(t){return{}.toString.call(t)}function w(t,e,n){for(var r=F.names(t),i=0;i<r.length;++i){var o=r[i];if(n(o))try{F.defineProperty(e,o,F.getDescriptor(t,o))}catch(a){}}}function E(t){return H?process.env[t]:void 0}function k(){if("function"==typeof Promise)try{var t=new Promise(function(){});if("[object Promise]"==={}.toString.call(t))return Promise}catch(e){}}function j(t,e){return t.bind(e)}var F=t("./es5"),T="undefined"==typeof navigator,P={e:{}},R,S="undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:void 0!==this?this:null,x=function(t,e){function n(){this.constructor=t,this.constructor$=e;for(var n in e.prototype)r.call(e.prototype,n)&&"$"!==n.charAt(n.length-1)&&(this[n+"$"]=e.prototype[n])}var r={}.hasOwnProperty;return n.prototype=e.prototype,t.prototype=new n,t.prototype},O=function(){var t=[Array.prototype,Object.prototype,Function.prototype],e=function(e){for(var n=0;n<t.length;++n)if(t[n]===e)return!0;return!1};if(F.isES5){var n=Object.getOwnPropertyNames;return function(t){for(var r=[],i=Object.create(null);null!=t&&!e(t);){var o;try{o=n(t)}catch(a){return r}for(var s=0;s<o.length;++s){var c=o[s];if(!i[c]){i[c]=!0;var l=Object.getOwnPropertyDescriptor(t,c);null!=l&&null==l.get&&null==l.set&&r.push(c)}}t=F.getPrototypeOf(t)}return r}}var r={}.hasOwnProperty;return function(n){if(e(n))return[];var i=[];t:for(var o in n)if(r.call(n,o))i.push(o);else{for(var a=0;a<t.length;++a)if(r.call(t[a],o))continue t;i.push(o)}return i}}(),A=/this\s*\.\s*\S+\s*=/,N=/^[a-z$_][a-z$_0-9]*$/i,L=function(){return"stack"in new Error?function(t){return b(t)?t:new Error(v(t))}:function(t){if(b(t))return t;try{throw new Error(v(t))}catch(e){return e}}}(),B=function(t){return F.isArray(t)?t:null};if("undefined"!=typeof Symbol&&Symbol.iterator){var U="function"==typeof Array.from?function(t){return Array.from(t)}:function(t){for(var e,n=[],r=t[Symbol.iterator]();!(e=r.next()).done;)n.push(e.value);return n};B=function(t){return F.isArray(t)?t:null!=t&&"function"==typeof t[Symbol.iterator]?U(t):null}}var I="undefined"!=typeof process&&"[object process]"===C(process).toLowerCase(),H="undefined"!=typeof process&&"undefined"!=typeof process.env,D={isClass:f,isIdentifier:_,inheritedDataKeys:O,getDataPropertyOrDefault:l,thrower:p,isArray:F.isArray,asArray:B,notEnumerableProp:u,isPrimitive:o,isObject:a,isError:y,canEvaluate:T,errorObj:P,tryCatch:i,inherits:x,withAppended:c,maybeWrapAsError:s,toFastProperties:h,filledRange:d,toString:v,canAttachTrace:b,ensureErrorObject:L,originatesFromRejection:m,markAsOriginatingFromRejection:g,classString:C,copyDescriptors:w,hasDevTools:"undefined"!=typeof chrome&&chrome&&"function"==typeof chrome.loadTimes,isNode:I,hasEnvVariables:H,env:E,global:S,getNativePromise:k,domainBind:j};D.isRecentNode=D.isNode&&function(){var t=process.versions.node.split(".").map(Number);return 0===t[0]&&t[1]>10||t[0]>0}(),D.isNode&&D.toFastProperties(process);try{throw new Error}catch(V){D.lastLineError=V}e.exports=D},{"./es5":10}]},{},[3])(3)}),"undefined"!=typeof window&&null!==window?window.P=window.Promise:"undefined"!=typeof self&&null!==self&&(self.P=self.Promise);

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(54);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var BaseObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = BaseObject = (function(superClass) {
  extend(BaseObject, superClass);

  function BaseObject() {
    return BaseObject.__super__.constructor.apply(this, arguments);
  }

  return BaseObject;

})(__webpack_require__(20));


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  createWithPostCreate: __webpack_require__(20).createWithPostCreate
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var defineModule, each, isPlainObject, log, lowerCamelCase, object, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(21), defineModule = ref.defineModule, log = ref.log, object = ref.object, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase, each = ref.each, isPlainObject = ref.isPlainObject;

defineModule(module, function() {
  return function(superClass) {
    var DeclarableMixin;
    return DeclarableMixin = (function(superClass1) {
      extend(DeclarableMixin, superClass1);

      function DeclarableMixin() {
        return DeclarableMixin.__super__.constructor.apply(this, arguments);
      }


      /*
        define a declarable field
      
        IN:
          map:
            key: name: string
            value: true-ish OR
              options:
                preprocess: (v) -> newV
                validate:   (v) -> truthish
                extendable: defaultValue
                  If present, this is an extendable property.
                  See: @extendableProperty
                  passed to: @extendableProperty "#{key}": options.extendable
              NOTE: validate is evaluated BEFORE preprocess
      
        EFFECT:
          creates:
      
             * class declarator function, with preprocessing
            @name: (...)->
      
             * class getter-function
            @getName: ->
      
             * instance-getter
            @getter name: ->
       */

      DeclarableMixin.declarable = function(map) {
        return each(map, (function(_this) {
          return function(options, name) {
            var extendable, getter, getterName, internalName, obj, preprocess, ucProp, validate;
            if (isPlainObject(options)) {
              preprocess = options.preprocess, validate = options.validate, extendable = options.extendable, getter = options.getter;
            }
            preprocess || (preprocess = function(v) {
              return v;
            });
            validate || (validate = function() {
              return true;
            });
            name = lowerCamelCase(name);
            ucProp = upperCamelCase(name);
            internalName = _this.propInternalName(name);
            getterName = "get" + ucProp;
            if (extendable) {
              return _this.extendableProperty((
                obj = {},
                obj["" + name] = extendable,
                obj
              ));
            } else {
              _this[name] = function(value) {
                if (!validate(value)) {
                  throw new Error("invalid value: " + (formattedInspect({
                    value: value,
                    name: name
                  })));
                }
                return this[internalName] = preprocess(value);
              };
              _this[getterName] = getter || function() {
                return this[internalName];
              };
              return _this.addGetter(name, function() {
                return this["class"][internalName];
              });
            }
          };
        })(this));
      };

      return DeclarableMixin;

    })(superClass);
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var ClassSystem,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(51)).addNamespace('Art.ClassSystem', ClassSystem = (function(superClass) {
  extend(ClassSystem, superClass);

  function ClassSystem() {
    return ClassSystem.__super__.constructor.apply(this, arguments);
  }

  ClassSystem.version = __webpack_require__(79).version;

  return ClassSystem;

})(Neptune.PackageNamespace));


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1, ref2;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? (ref2 = ref1.StandardLib) != null ? ref2.Core : void 0 : void 0 : void 0) != null ? ref : __webpack_require__(1);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(14), __webpack_require__(36), __webpack_require__(35), __webpack_require__(6)];


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


/*
TODO: refactor so nothing in inspect/* uses BaseObject
Then, move into StandardLib.
 */
module.exports = [[__webpack_require__(27), "shallowInspect inspectLean inspect"], __webpack_require__(40), __webpack_require__(26), __webpack_require__(43), __webpack_require__(15)];


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var Array, MinimalBaseObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(3);

module.exports = Array = (function(superClass) {
  extend(Array, superClass);

  function Array(inspectedArray) {
    Array.__super__.constructor.apply(this, arguments);
    this.array = inspectedArray;
  }

  Array.getter({
    arrayOfStrings: function() {
      var i, len, ref, results, v;
      ref = this.array;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        v = ref[i];
        results.push(v.toString());
      }
      return results;
    },
    children: function() {
      return this.array.slice();
    }
  });

  Array.prototype.delimitedString = function(delimiter) {
    if (delimiter == null) {
      delimiter = ", ";
    }
    return this.arrayOfStrings.join(", ");
  };

  Array.prototype.toString = function() {
    return "[" + (this.delimitedString()) + "]";
  };

  return Array;

})(MinimalBaseObject);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var Core, MinimalBaseObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(3);

module.exports = Core = (function(superClass) {
  extend(Core, superClass);

  function Core(value) {
    Core.__super__.constructor.apply(this, arguments);
    this.value = value;
    if (value && value.constructor.name === "HTMLImageElement") {
      this.image = value;
    }
  }

  Core.getter({
    children: function() {
      return null;
    }
  });

  Core.prototype.toString = function() {
    return "" + this.value;
  };

  return Core;

})(MinimalBaseObject);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, Object,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(3);

module.exports = Object = (function(superClass) {
  extend(Object, superClass);

  function Object(properties, instanceOf, originalObject) {
    this.properties = properties;
    this.instanceOf = instanceOf;
    this.originalObject = originalObject;
    Object.__super__.constructor.apply(this, arguments);
    this.length = this.properties ? self.Object.keys(this.properties).length : 0;
  }

  Object.getter({
    arrayOfStrings: function() {
      var k, ref, results, v;
      ref = this.properties;
      results = [];
      for (k in ref) {
        v = ref[k];
        results.push(k + ": " + v);
      }
      return results;
    },
    children: function() {
      var k, ref, ret, v;
      ret = {};
      ref = this.properties;
      for (k in ref) {
        v = ref[k];
        ret[k] = v;
      }
      return ret;
    }
  });

  Object.prototype.delimitedString = function(delimiter) {
    if (delimiter == null) {
      delimiter = ", ";
    }
    return this.arrayOfStrings.join(", ");
  };

  Object.prototype.toString = function() {
    if (this.inspected) {
      return this.inspected;
    } else if (this.instanceOf) {
      return "{" + this.instanceOf + " " + (this.delimitedString()) + "}";
    } else {
      return "{" + (this.delimitedString()) + "}";
    }
  };

  return Object;

})(MinimalBaseObject);


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, String, escapeJavascriptString,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(3);

escapeJavascriptString = __webpack_require__(4).escapeJavascriptString;

module.exports = String = (function(superClass) {
  extend(String, superClass);

  function String(clonedString) {
    String.__super__.constructor.apply(this, arguments);
    this.string = clonedString;
  }

  String.prototype.toString = function() {
    return escapeJavascriptString(this.string);
  };

  return String;

})(MinimalBaseObject);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var Inspected, Inspector2, Map, MinimalBaseObject, escapeJavascriptString, isArray, isBrowserObject, isClass, isDate, isFunction, isHTMLImageElement, isObject, isPlainObject, isRegExp, isString, objectName, parentString, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(3);

Map = __webpack_require__(18);

Inspected = __webpack_require__(41);

escapeJavascriptString = __webpack_require__(4).escapeJavascriptString;

ref = __webpack_require__(0), isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isPlainObject = ref.isPlainObject, isClass = ref.isClass, isDate = ref.isDate, isRegExp = ref.isRegExp, objectName = ref.objectName, isBrowserObject = ref.isBrowserObject;

isHTMLImageElement = self.HTMLImageElement ? function(obj) {
  return obj instanceof HTMLImageElement;
} : function() {
  return false;
};

parentString = (function(_this) {
  return function(distance) {
    switch (distance) {
      case 0:
        return "parent";
      case 1:
        return "grandparent";
      case 2:
        return "great grandparent";
      default:
        return "great^" + (distance - 1) + " grandparent";
    }
  };
})(this);

module.exports = Inspector2 = (function(superClass) {
  extend(Inspector2, superClass);

  function Inspector2(options) {
    if (options == null) {
      options = {};
    }
    this.inspectObject = bind(this.inspectObject, this);
    this.inspectWithToImage = bind(this.inspectWithToImage, this);
    this.inspectHTMLImageElement = bind(this.inspectHTMLImageElement, this);
    this.inspectArray = bind(this.inspectArray, this);
    this.withImages = options.withImages;
    this.maxLength = options.maxLength || 1000;
    this.allowCustomInspectors = !options.noCustomInspectors;
    this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
    this.outArray = [];
    this.length = 0;
    this.depth = 0;
    this.inspectingMap = new Map;
  }

  Inspector2.prototype.inspectArray = function(array) {
    var a;
    return new Inspected.Array((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = array.length; i < len; i++) {
        a = array[i];
        results.push(this.inspectInternal(a));
      }
      return results;
    }).call(this));
  };

  Inspector2.prototype.inspectHTMLImageElement = function(obj) {
    var res;
    res = new Inspected.Object({}, "HTMLImageElement", obj);
    if (!(res.image = obj).complete) {
      this.addPendingTask();
      obj.onload = (function(_this) {
        return function() {
          return _this.completePendingTask();
        };
      })(this);
    }
    return res;
  };

  Inspector2.prototype.inspectWithToImage = function(obj) {
    var name, res;
    name = objectName(obj);
    if (typeof obj.classPathName === "string") {
      name = obj.classPathName;
    }
    if (name === "Object") {
      name = null;
    }
    res = new Inspected.Object({}, name, obj);
    this.addPendingTask();
    obj.toImage().then((function(_this) {
      return function(image) {
        res.image = image;
        return _this.completePendingTask();
      };
    })(this));
    return res;
  };

  Inspector2.prototype.inspectObject = function(obj, recurse) {
    var attributes, i, k, keys, len, name, res, result;
    if (recurse == null) {
      recurse = true;
    }
    attributes = [];
    keys = Object.keys(obj);
    name = objectName(obj);
    if (isFunction(obj) && keys.length === 0) {
      return new Inspected.Core(name + "()");
    } else {
      if (typeof obj.classPathName === "string") {
        name = obj.classPathName;
      }
      if (name === "Object") {
        name = null;
      }
      result = {};
      if (recurse) {
        for (i = 0, len = keys.length; i < len; i++) {
          k = keys[i];
          result[k] = this.inspectInternal(obj[k]);
        }
      }
      res = new Inspected.Object(result, name, obj);
      if (isFunction(obj.inspect)) {
        res.inspected = obj.inspect();
      }
      return res;
    }
  };

  Inspector2.prototype.addPendingTask = function() {
    return this.pendingTasks++;
  };

  Inspector2.prototype.completePendingTask = function() {
    this.pendingTasks--;
    if (this.pendingTasks === 0) {
      return this.completionCallBack();
    }
  };

  Inspector2.prototype.inspectByType = function(obj) {
    if (isFunction(obj != null ? obj.getInspectedObjects : void 0)) {
      obj = obj.getInspectedObjects();
    }
    if (obj === null || obj === void 0 || obj === true || obj === false || typeof obj === "number") {
      return new Inspected.Core(obj);
    } else if (obj === self) {
      return new Inspected.Core("self");
    } else if (isRegExp(obj)) {
      return new Inspected.Core(obj.toString());
    } else if (isString(obj)) {
      return new Inspected.String(obj);
    } else if (isArray(obj)) {
      return this.inspectArray(obj);
    } else if (isClass(obj)) {
      return new Inspected.Core(objectName(obj));
    } else if (isHTMLImageElement(obj)) {
      return this.inspectHTMLImageElement(obj);
    } else if (isDate(obj)) {
      return new Inspected.Core(obj.toString());
    } else if (isBrowserObject(obj)) {
      return new Inspected.Core(objectName(obj));
    } else if (this.withImages && typeof obj.toImage === "function" && !isFunction(obj)) {
      return this.inspectWithToImage(obj);
    } else if (isPlainObject(obj) || isFunction(obj)) {
      return this.inspectObject(obj);
    } else if (isObject(obj)) {
      return this.inspectObject(obj, false);
    } else {
      return new Inspected.Core(objectName(obj));
    }
  };

  Inspector2.prototype.inspectInternal = function(obj) {
    var objDepth, res;
    if (objDepth = this.inspectingMap.get(obj)) {
      return new Inspected.Core("<" + (parentString(this.depth - objDepth)) + ">");
    } else if (this.depth >= this.maxDepth) {
      return new Inspected.Core("<maxDepth reached: " + this.maxDepth + ">");
    } else {
      this.depth++;
      this.inspectingMap.set(obj, this.depth);
      res = this.inspectByType(obj);
      this.inspectingMap["delete"](obj);
      this.depth--;
      return res;
    }
  };

  Inspector2.prototype.inspect = function(obj, callBack) {
    var res;
    this.pendingTasks = 0;
    if (this.withImages && typeof callBack !== "function") {
      throw new Error("callBack required if withImages requested");
    }
    this.completionCallBack = (function(_this) {
      return function() {
        return callBack && callBack(res);
      };
    })(this);
    res = this.inspectInternal(obj);
    if (this.pendingTasks === 0) {
      this.completionCallBack();
    }
    return res;
  };

  return Inspector2;

})(MinimalBaseObject);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var Promise, PromiseWorkerPool, log;

Promise = __webpack_require__(8);

log = __webpack_require__(28).log;


/*
  usage:

  pwp = new PromiseWorkerPool
    numWorkers: 10

   * queue all your jobs
  pwp.queue (jobIndex, totalJobCount) -> work, optionally returning promise
     * jobIndex is the order the worker was queued in

   * start the queue
  pwp.then (results) ->
     * results is the results from all your workerPromises in the same order they were queued
 */

module.exports = PromiseWorkerPool = (function() {
  function PromiseWorkerPool(numWorkers1) {
    this.numWorkers = numWorkers1 != null ? numWorkers1 : 10;
    this._queue = [];
  }

  PromiseWorkerPool.prototype.queue = function(job) {
    if (this._startPromise) {
      throw new Error("already started");
    }
    this._queue.push(job);
    return this;
  };

  PromiseWorkerPool.prototype.start = function() {
    return this._startPromise || (this._startPromise = Promise.then((function(_this) {
      return function() {
        var doNextAction, jobIndex, numJobs, numWorkers, results, workerPromises;
        jobIndex = 0;
        doNextAction = function() {
          var currentJobIndex, job;
          if (_this._queue.length > (currentJobIndex = jobIndex)) {
            jobIndex++;
            if (job = _this._queue[currentJobIndex]) {
              _this._queue[currentJobIndex] = null;
              return Promise.then(function() {
                return job(currentJobIndex, numJobs);
              }).then(function(result) {
                return results[currentJobIndex] = result;
              }).then(doNextAction);
            } else {
              return Promise.then(doNextAction);
            }
          } else {
            return Promise.resolve("queue done");
          }
        };
        results = new Array(numJobs = _this._queue.length);
        workerPromises = [];
        numWorkers = _this.numWorkers;
        while (workerPromises.length < numWorkers) {
          workerPromises.push(doNextAction());
        }
        return Promise.all(workerPromises).then(function() {
          return results;
        });
      };
    })(this)));
  };

  PromiseWorkerPool.prototype.then = function(a, b) {
    return this.start().then(a, b);
  };

  PromiseWorkerPool.prototype["catch"] = function(a) {
    return this.start()["catch"](a);
  };

  return PromiseWorkerPool;

})();


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var RequestError, compactFlatten, defineModule, formattedInspect, isFunction, merge, mergeInto, objectWithout, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defineModule = __webpack_require__(5).defineModule;

formattedInspect = __webpack_require__(2).formattedInspect;

ref = __webpack_require__(1), mergeInto = ref.mergeInto, isFunction = ref.isFunction, upperCamelCase = ref.upperCamelCase, compactFlatten = ref.compactFlatten, merge = ref.merge;

objectWithout = __webpack_require__(13).objectWithout;


/*
TODO:
  Rename: ErrorWithProps
  Rename: @info => @props

  Only
 */

defineModule(module, RequestError = (function(superClass) {
  extend(RequestError, superClass);


  /*
  IN:
    props:
      message:  error-message
      type:     request-type (for REST, the Method/Verb)
      key:      request-key (for REST, the URL)
      status:   string, see: ArtCommunicationStatus for valid strings
      data:     error-response-data, if any
   */

  function RequestError(props) {
    var message, ref1, responseData, responseDataString, sourceLib;
    RequestError.__super__.constructor.apply(this, arguments);
    ref1 = this.props = merge(props), sourceLib = ref1.sourceLib, message = ref1.message, this.requestData = ref1.requestData, this.type = ref1.type, this.key = ref1.key, this.status = ref1.status, this.data = ref1.data, responseData = ref1.responseData;
    this.responseData = this.data || (this.data = responseData);
    this.name = upperCamelCase((sourceLib || "") + " RequestError");
    if (this.props.data) {
      delete this.props.data;
      this.props.data = this.responseData;
    }
    responseDataString = this.data && formattedInspect({
      data: this.data
    });
    this.message = message || compactFlatten([
      (this.status || "failure") + ":", (responseDataString != null ? responseDataString.length : void 0) < 80 && !this.requestData ? [this.type, this.key, responseDataString] : "\n\n" + formattedInspect(merge({
        type: this.type,
        key: this.key,
        requestData: this.requestData,
        responseData: this.responseData
      }))
    ]).join(' ');
    if (this.props.stack) {
      this.stack = this.props.stack;
      this.props = objectWithout(this.props, "stack");
    } else if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error).stack;
    }
    this.info = this.props;
  }

  RequestError.prototype.toString = function() {
    return [
      this.name + " " + this.message, formattedInspect({
        props: this.props
      })
    ].join("\n\n");
  };

  return RequestError;

})(Error));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  __webpack_require__(1), [__webpack_require__(8), "testPromise", "containsPromises", "deepAll"], __webpack_require__(11), __webpack_require__(22), __webpack_require__(13), __webpack_require__(4), __webpack_require__(25), __webpack_require__(39), __webpack_require__(45), __webpack_require__(44), __webpack_require__(7), __webpack_require__(12), __webpack_require__(19), __webpack_require__(46), __webpack_require__(9), __webpack_require__(48), __webpack_require__(49), __webpack_require__(29), __webpack_require__(0), __webpack_require__(5), __webpack_require__(17), __webpack_require__(2), __webpack_require__(34), __webpack_require__(28), __webpack_require__(23), __webpack_require__(24), {
    PushBackTimer: __webpack_require__(47)
  }
];


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(31);

module.exports.includeInNamespace(__webpack_require__(72)).addModules({
  ArrayExtensions: __webpack_require__(11),
  AsyncExtensions: __webpack_require__(22),
  CallStack: __webpack_require__(23),
  Clone: __webpack_require__(34),
  CommonJs: __webpack_require__(5),
  DateExtensions: __webpack_require__(24),
  Environment: __webpack_require__(12),
  Eq: __webpack_require__(25),
  ErrorWithInfo: __webpack_require__(38),
  Function: __webpack_require__(39),
  Iteration: __webpack_require__(17),
  Log: __webpack_require__(28),
  Map: __webpack_require__(18),
  MapExtensions: __webpack_require__(44),
  MathExtensions: __webpack_require__(7),
  MinimalBaseObject: __webpack_require__(3),
  ObjectDiff: __webpack_require__(45),
  ObjectExtensions: __webpack_require__(13),
  ParseUrl: __webpack_require__(19),
  Promise: __webpack_require__(8),
  PromisedFileReader: __webpack_require__(46),
  PromiseWorkerPool: __webpack_require__(70),
  RegExpExtensions: __webpack_require__(9),
  RequestError: __webpack_require__(71),
  ReschedulableTimer: __webpack_require__(47),
  Ruby: __webpack_require__(48),
  ShallowClone: __webpack_require__(49),
  StringExtensions: __webpack_require__(4),
  Time: __webpack_require__(29),
  TypesExtended: __webpack_require__(0),
  Unique: __webpack_require__(30)
});

__webpack_require__(1);

__webpack_require__(2);


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var Namespace, Neptune, version,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

__webpack_require__(78);

__webpack_require__(77);

version = (__webpack_require__(81)).version;

if (global.Neptune) {
  throw new Error("Load NeptuneNamespaces(" + version + ") FAILED. Another version already loaded: " + global.Neptune.version);
}

module.exports = global.Neptune = Neptune = (function(superClass) {
  extend(Neptune, superClass);

  function Neptune() {
    return Neptune.__super__.constructor.apply(this, arguments);
  }

  Namespace.namespace = Namespace.Neptune = Neptune;

  Neptune.Namespace = Namespace;

  Neptune.PackageNamespace = __webpack_require__(76);

  Neptune.namespacePath = "Neptune";

  Neptune.namespace = null;

  Neptune.version = version;

  Neptune.Base = Namespace;

  Neptune.isNode = __webpack_require__(53);

  return Neptune;

})(Namespace = __webpack_require__(50));


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var PackageNamespace,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = PackageNamespace = (function(superClass) {
  extend(PackageNamespace, superClass);

  function PackageNamespace() {
    return PackageNamespace.__super__.constructor.apply(this, arguments);
  }

  return PackageNamespace;

})(__webpack_require__(50));


/***/ }),
/* 77 */
/***/ (function(module, exports) {

if ((function() {}).name == null) {
  Object.defineProperty(global.Function.prototype, 'name', {
    get: function() {
      var matches, name;
      name = (matches = this.toString().match(/^\s*function\s*([^\s(]+)/)) ? matches[1] : "";
      Object.defineProperty(this, 'name', {
        value: name
      });
      return name;
    }
  });
}

global.Function.prototype.getName = function() {
  if (this._name && this.hasOwnProperty("_name")) {
    return this._name;
  } else {
    return this.name || "anonymousFunction";
  }
};

global.Function.prototype.hasName = function() {
  return !!((this._name && this.hasOwnProperty("_name")) || this.name);
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

var g;

g = typeof window !== "undefined" && window !== null ? window : typeof self !== "undefined" && self !== null ? self : global;

g.self || (g.self = g);

g.global || (g.global = g);


/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"Enhances javascript/coffeescript classes with features of more evolved class-based languages primarily through a new BaseClass.","license":"ISC","name":"art-class-system","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.10.13"}

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.0","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.2","chai":"^4.0.1","coffee-loader":"^0.7.3","coffee-script":"^1.12.6","colors":"^1.2.1","commander":"^2.15.1","css-loader":"^0.28.4","dateformat":"^3.0.3","detect-node":"^2.0.3","fs-extra":"^5.0.0","glob":"^7.1.2","glob-promise":"^3.4.0","json-loader":"^0.5.4","mocha":"^3.4.2","neptune-namespaces":"*","script-loader":"^0.7.0","style-loader":"^0.18.1","webpack":"^2.6.1","webpack-dev-server":"^2.4.5","webpack-merge":"^4.1.0","webpack-node-externals":"^1.6.0"},"description":"The Standard Library for JavaScript that aught to be.","license":"ISC","name":"art-standard-lib","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.37.0"}

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-standard-lib":"*","coffee-script":"*"},"description":"Neptune.Namespaces.Runtime","license":"ISC","name":"neptune-namespaces-runtime","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"3.0.7"}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })
/******/ ]);