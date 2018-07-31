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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/*!*************************************************!*\
  !*** ./source/Art.StandardLib/Core/Core.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(/*! ./ArrayCompactFlatten */ 11), __webpack_require__(/*! ./StringCase */ 12), __webpack_require__(/*! ./Merge */ 13), __webpack_require__(/*! ./Types */ 14)];


/***/ }),

/***/ 11:
/*!****************************************************************!*\
  !*** ./source/Art.StandardLib/Core/ArrayCompactFlatten.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ArrayCompactFlatten;

module.exports = ArrayCompactFlatten = (function() {
  var arraySlice, compact, compactFlattenIfNeeded, deepArrayEach, doFlattenInternal, flatten, isArguments, isArrayOrArguments, keepAll, keepUnlessNullOrUndefined, needsFlatteningOrCompacting;

  function ArrayCompactFlatten() {}

  ArrayCompactFlatten.isArguments = isArguments = function(o) {
    return (o != null) && typeof o.length === "number" && o.toString() === '[object Arguments]';
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

/***/ 12:
/*!*******************************************************!*\
  !*** ./source/Art.StandardLib/Core/StringCase.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var StringCase, compactFlatten;

compactFlatten = __webpack_require__(/*! ./ArrayCompactFlatten */ 11).compactFlatten;

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

/***/ 13:
/*!**************************************************!*\
  !*** ./source/Art.StandardLib/Core/Merge.coffee ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Merge, compactFlatten, isPlainObject;

compactFlatten = __webpack_require__(/*! ./ArrayCompactFlatten */ 11).compactFlatten;

isPlainObject = __webpack_require__(/*! ./Types */ 14).isPlainObject;

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

/***/ 14:
/*!**************************************************!*\
  !*** ./source/Art.StandardLib/Core/Types.coffee ***!
  \**************************************************/
/*! no static exports found */
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
  var _functionsPrototype, getSuperclass, hasOwnProperties, hasProperties, isArray, isClass, isDirectPrototypeOf, isExtendedClass, isFunction, isJsonAtomicType, isNonNegativeInt, isNumber, isObject, isPlainObject, isString, oldIsClass;

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

  Types.isError = function(obj) {
    return obj && obj instanceof Error;
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

  Types.getSuperclass = getSuperclass = function(klass) {
    var ref, superclass;
    if (isFunction(klass)) {
      if ((superclass = Object.getPrototypeOf(klass)) && superclass !== _functionsPrototype) {
        return superclass;
      } else {
        return (ref = klass.__super__) != null ? ref.constructor : void 0;
      }
    }
  };


  /*
  NAME: isClass
  IN: obj:anything
  OUT: boolean
  
  Classes are Functions in JavaScript, and there is no built-in way to tell
  the differences even though, as-of ES6, there actually is a difference.
  
  WARNING #1: This function cannot reliably detect a class which doesn't extend another.
  
  TRUE-POSITIVES:
    100% true if obj is an extended class
    probably-true if obj is a function AND
      obj has enumerable properties or
      obj's prototype has enumerable properties
  
  FALSE-POSITIVES:
    If you passed in a function with one or more manually set, enumerable properties.
  
  FALSE-NEGATIVES:
    If you passed in a 'class' with no enumerable prototype properties and no enumerable
    static/class properties.
  
  WARNING #2:
    Static/class methods declared with ES6 class syntax ARE NOT ENUMERABLE (face-palm).
    Therefor, in this case, FALSE-NEGATIVES are possible even if you have class methods.
  
    It's just too costly to check for non-enumerable methods.
  
  RECOMENDAION:
    To make your classes reliabily detectable: ALWAYS extend something.
    If you aren't extending anything else, extend Object.
    This is what CaffeineScript does.
  
  WHY hasOwnProperties for obj and hasProperties for obj.prototype???
    hasProperties is faster
    hasOwnProperties because _functionsPrototype actuall has getName added to it
    already by NeptuneNamespaces to normalize getting the name of things.
    I could probably make that a non-enumerable...
   */

  Types.isClass = isClass = function(obj) {
    if (getSuperclass(obj)) {
      return true;
    } else if (isFunction(obj) && ((hasOwnProperties(obj)) || hasProperties(obj.prototype))) {

      /*
      HACK:
        If obj is a function and has properties or its prototype has properties
        it's a non-standard function,
        and therefor it's -probably- a class
       */
      return true;
    } else {
      return false;
    }
  };

  oldIsClass = function(obj) {
    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (getSuperclass(obj)) || (hasOwnProperties(obj)) || (obj.prototype && hasProperties(obj.prototype))));
  };

  Types.isExtendedClass = isExtendedClass = function(obj) {
    return !!getSuperclass(obj);
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

/***/ 2:
/*!*************************************************!*\
  !*** ./source/Art.StandardLib/namespace.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var StandardLib,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! neptune-namespaces */ 3)).addNamespace('Art.StandardLib', StandardLib = (function(superClass) {
  extend(StandardLib, superClass);

  function StandardLib() {
    return StandardLib.__super__.constructor.apply(this, arguments);
  }

  StandardLib.version = __webpack_require__(/*! ../../package.json */ 4).version;

  return StandardLib;

})(Neptune.PackageNamespace));

__webpack_require__(/*! ./Core/namespace */ 5);

__webpack_require__(/*! ./Inspect/namespace */ 6);


/***/ }),

/***/ 3:
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"The Standard Library for JavaScript that aught to be.","license":"ISC","name":"art-standard-lib","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"1.44.0"};

/***/ }),

/***/ 5:
/*!******************************************************!*\
  !*** ./source/Art.StandardLib/Core/namespace.coffee ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ 2)).addNamespace('Core', Core = (function(superClass) {
  extend(Core, superClass);

  function Core() {
    return Core.__super__.constructor.apply(this, arguments);
  }

  return Core;

})(Neptune.PackageNamespace));


/***/ }),

/***/ 6:
/*!*********************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/namespace.coffee ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Inspect,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ 2)).addNamespace('Inspect', Inspect = (function(superClass) {
  extend(Inspect, superClass);

  function Inspect() {
    return Inspect.__super__.constructor.apply(this, arguments);
  }

  return Inspect;

})(Neptune.PackageNamespace));

__webpack_require__(/*! ./Inspected/namespace */ 7);


/***/ }),

/***/ 65:
/*!*********************!*\
  !*** ./Core.coffee ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1, ref2;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? (ref2 = ref1.StandardLib) != null ? ref2.Core : void 0 : void 0 : void 0) != null ? ref : __webpack_require__(/*! ./source/Art.StandardLib/Core */ 9);


/***/ }),

/***/ 7:
/*!*******************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/namespace.coffee ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Inspected,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ 6)).addNamespace('Inspected', Inspected = (function(superClass) {
  extend(Inspected, superClass);

  function Inspected() {
    return Inspected.__super__.constructor.apply(this, arguments);
  }

  return Inspected;

})(Neptune.PackageNamespace));


/***/ }),

/***/ 9:
/*!**************************************************!*\
  !*** ./source/Art.StandardLib/Core/index.coffee ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 5);

module.exports.includeInNamespace(__webpack_require__(/*! ./Core */ 10)).addModules({
  ArrayCompactFlatten: __webpack_require__(/*! ./ArrayCompactFlatten */ 11),
  Merge: __webpack_require__(/*! ./Merge */ 13),
  StringCase: __webpack_require__(/*! ./StringCase */ 12),
  Types: __webpack_require__(/*! ./Types */ 14)
});


/***/ })

/******/ });