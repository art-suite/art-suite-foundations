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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.StandardLib : void 0 : void 0) != null ? ref : __webpack_require__(/*! ./source/Art.StandardLib */ 1);


/***/ }),
/* 1 */
/*!*********************************************!*\
  !*** ./source/Art.StandardLib/index.coffee ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 2);

module.exports.includeInNamespace(__webpack_require__(/*! ./StandardLib */ 8)).addModules({
  ArrayExtensions: __webpack_require__(/*! ./ArrayExtensions */ 40),
  AsyncExtensions: __webpack_require__(/*! ./AsyncExtensions */ 49),
  CallStack: __webpack_require__(/*! ./CallStack */ 60),
  Clone: __webpack_require__(/*! ./Clone */ 58),
  CommonJs: __webpack_require__(/*! ./CommonJs */ 19),
  DateExtensions: __webpack_require__(/*! ./DateExtensions */ 50),
  Environment: __webpack_require__(/*! ./Environment */ 20),
  Eq: __webpack_require__(/*! ./Eq */ 39),
  ErrorWithInfo: __webpack_require__(/*! ./ErrorWithInfo */ 24),
  Function: __webpack_require__(/*! ./Function */ 51),
  Iteration: __webpack_require__(/*! ./Iteration */ 36),
  Log: __webpack_require__(/*! ./Log */ 59),
  Map: __webpack_require__(/*! ./Map */ 28),
  MapExtensions: __webpack_require__(/*! ./MapExtensions */ 53),
  MathExtensions: __webpack_require__(/*! ./MathExtensions */ 32),
  MinimalBaseObject: __webpack_require__(/*! ./MinimalBaseObject */ 30),
  ObjectDiff: __webpack_require__(/*! ./ObjectDiff */ 52),
  ObjectExtensions: __webpack_require__(/*! ./ObjectExtensions */ 35),
  ParseUrl: __webpack_require__(/*! ./ParseUrl */ 21),
  Promise: __webpack_require__(/*! ./Promise */ 15),
  PromisedFileReader: __webpack_require__(/*! ./PromisedFileReader */ 54),
  PromiseWorkerPool: __webpack_require__(/*! ./PromiseWorkerPool */ 62),
  RegExpExtensions: __webpack_require__(/*! ./RegExpExtensions */ 22),
  RequestError: __webpack_require__(/*! ./RequestError */ 63),
  ReschedulableTimer: __webpack_require__(/*! ./ReschedulableTimer */ 61),
  Ruby: __webpack_require__(/*! ./Ruby */ 55),
  ShallowClone: __webpack_require__(/*! ./ShallowClone */ 56),
  StringExtensions: __webpack_require__(/*! ./StringExtensions */ 31),
  Time: __webpack_require__(/*! ./Time */ 57),
  TypesExtended: __webpack_require__(/*! ./TypesExtended */ 18),
  Unique: __webpack_require__(/*! ./Unique */ 29)
});

__webpack_require__(/*! ./Core */ 9);

__webpack_require__(/*! ./Inspect */ 25);


/***/ }),
/* 2 */
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
/* 3 */
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 4 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"The Standard Library for JavaScript that aught to be.","license":"ISC","name":"art-standard-lib","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"1.45.1"};

/***/ }),
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
/*!***************************************************!*\
  !*** ./source/Art.StandardLib/StandardLib.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  __webpack_require__(/*! ./Core */ 9), [__webpack_require__(/*! ./Promise */ 15), "testPromise", "containsPromises", "deepAll"], __webpack_require__(/*! ./ArrayExtensions */ 40), __webpack_require__(/*! ./AsyncExtensions */ 49), __webpack_require__(/*! ./ObjectExtensions */ 35), __webpack_require__(/*! ./StringExtensions */ 31), __webpack_require__(/*! ./Eq */ 39), __webpack_require__(/*! ./Function */ 51), __webpack_require__(/*! ./ObjectDiff */ 52), __webpack_require__(/*! ./MapExtensions */ 53), __webpack_require__(/*! ./MathExtensions */ 32), __webpack_require__(/*! ./Environment */ 20), __webpack_require__(/*! ./ParseUrl */ 21), __webpack_require__(/*! ./PromisedFileReader */ 54), __webpack_require__(/*! ./RegExpExtensions */ 22), __webpack_require__(/*! ./Ruby */ 55), __webpack_require__(/*! ./ShallowClone */ 56), __webpack_require__(/*! ./Time */ 57), __webpack_require__(/*! ./TypesExtended */ 18), __webpack_require__(/*! ./CommonJs */ 19), __webpack_require__(/*! ./Iteration */ 36), __webpack_require__(/*! ./Inspect */ 25), __webpack_require__(/*! ./Clone */ 58), __webpack_require__(/*! ./Log */ 59), __webpack_require__(/*! ./CallStack */ 60), __webpack_require__(/*! ./DateExtensions */ 50), {
    PushBackTimer: __webpack_require__(/*! ./ReschedulableTimer */ 61)
  }
];


/***/ }),
/* 9 */
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


/***/ }),
/* 10 */
/*!*************************************************!*\
  !*** ./source/Art.StandardLib/Core/Core.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [__webpack_require__(/*! ./ArrayCompactFlatten */ 11), __webpack_require__(/*! ./StringCase */ 12), __webpack_require__(/*! ./Merge */ 13), __webpack_require__(/*! ./Types */ 14)];


/***/ }),
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/*!***********************************************!*\
  !*** ./source/Art.StandardLib/Promise.coffee ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BlueBirdPromise, ErrorWithInfo, Promise, deepEach, deepMap, defineModule, getEnv, isFunction, isPlainObject, isPromise, promiseDebug, ref;

Promise = BlueBirdPromise = __webpack_require__(/*! bluebird/js/browser/bluebird.core.min */ 17);

ref = __webpack_require__(/*! ./TypesExtended */ 18), deepMap = ref.deepMap, deepEach = ref.deepEach, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject;

defineModule = __webpack_require__(/*! ./CommonJs */ 19).defineModule;

getEnv = __webpack_require__(/*! ./Environment */ 20).getEnv;

if (promiseDebug = getEnv().artPromiseDebug) {
  console.log("Art.StandardLib.Promise: BlueBirdPromise debug ENABLED");
}

BlueBirdPromise.config({
  warnings: promiseDebug,
  longStackTraces: promiseDebug,
  cancellation: promiseDebug,
  monitoring: promiseDebug
});

isPromise = __webpack_require__(/*! ./Core/Types */ 14).isPromise;

ErrorWithInfo = __webpack_require__(/*! ./ErrorWithInfo */ 24);


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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 16)(module)))

/***/ }),
/* 16 */
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
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
/* 17 */
/*!*******************************************************************************************************!*\
  !*** external "require('bluebird/js/browser/bluebird.core.min' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('bluebird/js/browser/bluebird.core.min' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 18 */
/*!*****************************************************!*\
  !*** ./source/Art.StandardLib/TypesExtended.coffee ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core, Types, isFunction, isJsonAtomicType, isObject, isPlainArray, isPlainObject, isString, mergeInto, ref;

ref = Core = __webpack_require__(/*! ./Core */ 9), isPlainObject = ref.isPlainObject, mergeInto = ref.mergeInto, isString = ref.isString, isFunction = ref.isFunction, isObject = ref.isObject, isPlainArray = ref.isPlainArray, isJsonAtomicType = ref.isJsonAtomicType;

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
/* 19 */
/*!************************************************!*\
  !*** ./source/Art.StandardLib/CommonJs.coffee ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CommonJs, isClass, isFunction, ref;

ref = __webpack_require__(/*! ./TypesExtended */ 18), isClass = ref.isClass, isFunction = ref.isFunction;

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
/* 20 */
/*!***************************************************!*\
  !*** ./source/Art.StandardLib/Environment.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Environment, ParseUrl, defineModule, isNode, isString;

defineModule = __webpack_require__(/*! ./CommonJs */ 19).defineModule;

ParseUrl = __webpack_require__(/*! ./ParseUrl */ 21);

isString = __webpack_require__(/*! ./Core */ 9).isString;

isNode = __webpack_require__(/*! detect-node */ 23);

defineModule(module, Environment = (function() {
  function Environment() {}

  Environment.getEnv = function() {
    var k, out, v;
    return global.environment != null ? global.environment : global.environment = ((function() {
      var ref, ref1;
      if (global.location != null) {
        out = ParseUrl.parseQuery();
        ref = global.location;
        for (k in ref) {
          v = ref[k];
          if (k !== "search" && isString(v) && v.length > 0) {
            out[k] = v;
          }
        }
        return out;
      } else {
        return (ref1 = global.process) != null ? ref1.env : void 0;
      }
    })()) || {};
  };

  Environment.isBrowser = !!(global.window && global.navigator && global.document);

  Environment.isWebWorker = !!(!Environment.isBrowser && global.importScripts);

  Environment.isNode = !!isNode;

  return Environment;

})());

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 16)(module)))

/***/ }),
/* 21 */
/*!************************************************!*\
  !*** ./source/Art.StandardLib/ParseUrl.coffee ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ParseUrl, escapeRegExp, findUrlOrigin, ref,
  slice = [].slice;

ref = __webpack_require__(/*! ./RegExpExtensions */ 22), escapeRegExp = ref.escapeRegExp, findUrlOrigin = ref.findUrlOrigin;

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

  ParseUrl.urlJoin = function() {
    var path, paths, uri;
    uri = arguments[0], paths = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    return (uri.replace(/\/$/, '')) + "/" + (((function() {
      var j, len, results;
      results = [];
      for (j = 0, len = paths.length; j < len; j++) {
        path = paths[j];
        results.push(path.replace(/^\/|\/$/g, ''));
      }
      return results;
    })()).join('/'));
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
/* 22 */
/*!********************************************************!*\
  !*** ./source/Art.StandardLib/RegExpExtensions.coffee ***!
  \********************************************************/
/*! no static exports found */
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
/* 23 */
/*!*****************************************************************************!*\
  !*** external "require('detect-node' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('detect-node' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 24 */
/*!*****************************************************!*\
  !*** ./source/Art.StandardLib/ErrorWithInfo.coffee ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var ErrorWithInfo, defineModule, formattedInspect, isFunction, mergeInto, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defineModule = __webpack_require__(/*! ./CommonJs */ 19).defineModule;

formattedInspect = __webpack_require__(/*! ./Inspect */ 25).formattedInspect;

ref = __webpack_require__(/*! ./Core */ 9), mergeInto = ref.mergeInto, isFunction = ref.isFunction;

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 16)(module)))

/***/ }),
/* 25 */
/*!*****************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/index.coffee ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 6);

module.exports.includeInNamespace(__webpack_require__(/*! ./Inspect */ 26)).addModules({
  FormattedInspect: __webpack_require__(/*! ./FormattedInspect */ 34),
  InspectedObjectLiteral: __webpack_require__(/*! ./InspectedObjectLiteral */ 38),
  InspectedObjects: __webpack_require__(/*! ./InspectedObjects */ 37),
  Inspector: __webpack_require__(/*! ./Inspector */ 27),
  Inspector2: __webpack_require__(/*! ./Inspector2 */ 43),
  PlainObjects: __webpack_require__(/*! ./PlainObjects */ 42)
});

__webpack_require__(/*! ./Inspected */ 44);


/***/ }),
/* 26 */
/*!*******************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspect.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/*
TODO: refactor so nothing in inspect/* uses BaseObject
Then, move into StandardLib.
 */
module.exports = [[__webpack_require__(/*! ./Inspector */ 27), "shallowInspect inspectLean inspect"], __webpack_require__(/*! ./FormattedInspect */ 34), __webpack_require__(/*! ./InspectedObjects */ 37), __webpack_require__(/*! ./PlainObjects */ 42), __webpack_require__(/*! ./InspectedObjectLiteral */ 38)];


/***/ }),
/* 27 */
/*!*********************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspector.coffee ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Inspector, Map, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, objectName, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Map = __webpack_require__(/*! ../Map */ 28);

escapeJavascriptString = __webpack_require__(/*! ../StringExtensions */ 31).escapeJavascriptString;

ref = __webpack_require__(/*! ../TypesExtended */ 18), objectName = ref.objectName, isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isClass = ref.isClass, isBrowserObject = ref.isBrowserObject, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray;

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
    if (this && this !== global) {
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
/*!*******************************************!*\
  !*** ./source/Art.StandardLib/Map.coffee ***!
  \*******************************************/
/*! no static exports found */
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
var KeysIterator, Map, MinimalBaseObject, Node, Unique, ValuesIterator, isFunction, m,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Unique = __webpack_require__(/*! ./Unique */ 29);

MinimalBaseObject = __webpack_require__(/*! ./MinimalBaseObject */ 30);

isFunction = __webpack_require__(/*! ./Core */ 9).isFunction;

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

module.exports = isFunction(global.Map) && (m = new global.Map).set(1, 2) === m ? global.Map : Map = (function(superClass) {
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
/* 29 */
/*!**********************************************!*\
  !*** ./source/Art.StandardLib/Unique.coffee ***!
  \**********************************************/
/*! no static exports found */
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
/* 30 */
/*!*********************************************************!*\
  !*** ./source/Art.StandardLib/MinimalBaseObject.coffee ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, capitalize, isFunction, isPlainObject, isString, ref;

capitalize = __webpack_require__(/*! ./Core */ 9).capitalize;

ref = __webpack_require__(/*! ./TypesExtended */ 18), isFunction = ref.isFunction, isString = ref.isString, isPlainObject = ref.isPlainObject;

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
/* 31 */
/*!********************************************************!*\
  !*** ./source/Art.StandardLib/StringExtensions.coffee ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var FoundationMath, StringExtensions, Types, compactFlatten, escapedDoubleQuoteRegex, floor, intRand, isArray, isBrowser, isNumber, isPlainObject, isString, wordsRegex;

FoundationMath = __webpack_require__(/*! ./MathExtensions */ 32);

Types = __webpack_require__(/*! ./TypesExtended */ 18);

wordsRegex = __webpack_require__(/*! ./RegExpExtensions */ 22).wordsRegex;

intRand = FoundationMath.intRand;

isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray;

compactFlatten = __webpack_require__(/*! ./Core */ 9).compactFlatten;

isBrowser = __webpack_require__(/*! ./Environment */ 20).isBrowser;

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
    if (l == null) {
      l = 16;
    }
    return randomString(l, c, crypto.getRandomValues(new Uint8Array(l)));
  } : (console.warn("window.crypto not available, using standard random for cryptoRandomString"), function(l, c) {
    if (l == null) {
      l = 16;
    }
    return randomString(l, c);
  })) : (crypto = __webpack_require__(/*! crypto */ 33), function(l, c) {
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
          Neptune.Art.StandardLib.log.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
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
/* 32 */
/*!******************************************************!*\
  !*** ./source/Art.StandardLib/MathExtensions.coffee ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MathExtensions, RegExpExtensions, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFlaot32Precision, max, min, numberRegexp, pow, random, ref, round;

RegExpExtensions = __webpack_require__(/*! ./RegExpExtensions */ 22);

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
/* 33 */
/*!************************************************************************!*\
  !*** external "require('crypto' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('crypto' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 34 */
/*!****************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/FormattedInspect.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var FormattedInspect, alignTabs, ansiRegex, ansiSafeStringLength, colorNames, colorizeFunctions, escapeForBlockString, escapeJavascriptString, formattedInspectArray, formattedInspectObject, formattedInspectRecursive, formattedInspectString, identity, indentLength, indentString, inspect, isFunction, isNumber, isPlainArray, isPlainObject, isString, max, newLineWithIndentString, object, objectKeyCount, pad, passThroughColorizeFunctions, postWhitespaceFormatting, ref, ref1, stripAnsi, stripTrailingWhitespace, toInspectedObjects, w;

ref = __webpack_require__(/*! ../TypesExtended */ 18), isString = ref.isString, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isNumber = ref.isNumber;

max = Math.max;

ref1 = __webpack_require__(/*! ../StringExtensions */ 31), pad = ref1.pad, stripTrailingWhitespace = ref1.stripTrailingWhitespace, escapeJavascriptString = ref1.escapeJavascriptString;

inspect = __webpack_require__(/*! ./Inspector */ 27).inspect;

objectKeyCount = __webpack_require__(/*! ../ObjectExtensions */ 35).objectKeyCount;

toInspectedObjects = __webpack_require__(/*! ./InspectedObjects */ 37).toInspectedObjects;

w = __webpack_require__(/*! ../ArrayExtensions */ 40).w;

object = __webpack_require__(/*! ../Iteration */ 36).object;

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
  var failsafeInspect;

  function FormattedInspect() {}

  FormattedInspect.ansiRegex = ansiRegex;

  FormattedInspect.stripAnsi = stripAnsi;

  FormattedInspect.ansiSafeStringLength = ansiSafeStringLength;

  FormattedInspect.alignTabs = alignTabs;

  FormattedInspect.formattedInspectString = formattedInspectString;

  FormattedInspect.failsafeInspect = failsafeInspect = function(toInspect) {
    var ref2;
    return ("typeof: " + (typeof toInspect) + "\n") + ("constructor: " + ((toInspect != null ? toInspect.constructor : void 0) && (toInspect != null ? (ref2 = toInspect.constructor) != null ? ref2.name : void 0 : void 0)) + "\n") + (function() {
      switch (false) {
        case !isPlainArray(toInspect):
          return "length: " + toInspect.length + "\njoined: [" + (toInspect.join(', ')) + "]";
        case !((toInspect != null) && typeof toInspect === 'object'):
          return "keys: " + (Object.keys(toInspect).join(', '));
        default:
          return "toString: " + toInspect;
      }
    })();
  };

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
      out = "Error in formattedInspect: " + error + "\n" + (failsafeInspect(toInspect));
      console.error(out, {
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
/* 35 */
/*!********************************************************!*\
  !*** ./source/Art.StandardLib/ObjectExtensions.coffee ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjectExtensions, compactFlatten, deepArrayEach, isArrayOrArguments, isFunction, isObject, isPlainArray, isPlainObject, mergeInto, object, present, ref, ref1,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(/*! ./Core */ 9), compactFlatten = ref.compactFlatten, deepArrayEach = ref.deepArrayEach, isArrayOrArguments = ref.isArrayOrArguments, mergeInto = ref.mergeInto;

ref1 = __webpack_require__(/*! ./TypesExtended */ 18), isPlainObject = ref1.isPlainObject, isObject = ref1.isObject, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray, present = ref1.present;

object = __webpack_require__(/*! ./Iteration */ 36).object;

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

  ObjectExtensions.objectWith = function(obj, k, v) {
    var _k, _v, o;
    o = {};
    for (_k in obj) {
      _v = obj[_k];
      o[_k] = _v;
    }
    o[k] = v;
    return o;
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
/* 36 */
/*!*************************************************!*\
  !*** ./source/Art.StandardLib/Iteration.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Iteration, compactFlatten, deepArrayEach, isArrayOrArguments, isFunction, isObject, isPlainArray, isPlainObject, log, mergeInto, ref, ref1;

ref = __webpack_require__(/*! ./Core */ 9), compactFlatten = ref.compactFlatten, deepArrayEach = ref.deepArrayEach, isArrayOrArguments = ref.isArrayOrArguments, mergeInto = ref.mergeInto;

ref1 = __webpack_require__(/*! ./TypesExtended */ 18), isPlainObject = ref1.isPlainObject, isObject = ref1.isObject, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray;

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
/* 37 */
/*!****************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/InspectedObjects.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var InspectedObjects, dateFormat, deepMap, escapeJavascriptString, inspectedObjectLiteral, isClass, isDate, isFunction, isNonNegativeInt, isPlainArray, isPlainObject, isPromise, isRegExp, isString, ref;

ref = __webpack_require__(/*! ../TypesExtended */ 18), isDate = ref.isDate, deepMap = ref.deepMap, isNonNegativeInt = ref.isNonNegativeInt, isClass = ref.isClass, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isString = ref.isString, isFunction = ref.isFunction, isPromise = ref.isPromise, isRegExp = ref.isRegExp;

escapeJavascriptString = __webpack_require__(/*! ../StringExtensions */ 31).escapeJavascriptString;

inspectedObjectLiteral = __webpack_require__(/*! ./InspectedObjectLiteral */ 38).inspectedObjectLiteral;

dateFormat = __webpack_require__(/*! dateformat */ 41);

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
      return inspectedObjectLiteral("class " + ((typeof m.getName === "function" ? m.getName() : void 0) || m.name));
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
/* 38 */
/*!**********************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/InspectedObjectLiteral.coffee ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var InspectedObjectLiteral, compare;

compare = __webpack_require__(/*! ../Eq */ 39).compare;

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
/* 39 */
/*!******************************************!*\
  !*** ./source/Art.StandardLib/Eq.coffee ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Eq, floatTrue0, isNumber, isString, min, objectKeyCount, ref, remove,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

remove = __webpack_require__(/*! ./ArrayExtensions */ 40).remove;

objectKeyCount = __webpack_require__(/*! ./ObjectExtensions */ 35).objectKeyCount;

floatTrue0 = __webpack_require__(/*! ./MathExtensions */ 32).floatTrue0;

ref = __webpack_require__(/*! ./TypesExtended */ 18), isString = ref.isString, isNumber = ref.isNumber;

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
    return a === b || 0 === Eq.compare(a, b, true);
  };

  Eq.neq = function(a, b) {
    if (a === b) {
      return false;
    } else {
      return 0 !== Eq.compare(a, b, true);
    }
  };

  Eq.fastEq = function(a, b) {
    return a === b || 0 === Eq.compare(a, b, false);
  };

  Eq.fastNeq = function(a, b) {
    if (a === b) {
      return false;
    } else {
      return 0 !== Eq.compare(a, b, false);
    }
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
  
  TODO:
    recursionBlockArray could be reused.
    Further, depth == 1 checks could be safely skipped to make
    even slow-compare fast for simple objects. Only if we
    have an object/array inside another object/array do we need
    to start checking.
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
/* 40 */
/*!*******************************************************!*\
  !*** ./source/Art.StandardLib/ArrayExtensions.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ArrayExtensions, bound, exactlyOneWordRegex, intRand, isNumber, isString, max, modulo, ref, ref1, ref2, wordsRegex,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(/*! ./MathExtensions */ 32), bound = ref.bound, max = ref.max, intRand = ref.intRand, modulo = ref.modulo;

ref1 = __webpack_require__(/*! ./TypesExtended */ 18), isNumber = ref1.isNumber, isString = ref1.isString;

ref2 = __webpack_require__(/*! ./RegExpExtensions */ 22), wordsRegex = ref2.wordsRegex, exactlyOneWordRegex = ref2.exactlyOneWordRegex;

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
    if (array == null) {
      array = [];
    }
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
/* 41 */
/*!****************************************************************************!*\
  !*** external "require('dateformat' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('dateformat' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 42 */
/*!************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/PlainObjects.coffee ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var PlainObjects, deepMap, hasKeys, inspectedObjectLiteral, isClass, isFunction, isPlainArray, isPlainObject, ref;

ref = __webpack_require__(/*! ../TypesExtended */ 18), deepMap = ref.deepMap, hasKeys = ref.hasKeys, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject, isFunction = ref.isFunction, isClass = ref.isClass;

inspectedObjectLiteral = __webpack_require__(/*! ./InspectedObjectLiteral */ 38).inspectedObjectLiteral;

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
/* 43 */
/*!**********************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspector2.coffee ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Inspected, Inspector2, Map, MinimalBaseObject, escapeJavascriptString, isArray, isBrowserObject, isClass, isDate, isFunction, isHTMLImageElement, isObject, isPlainObject, isRegExp, isString, objectName, parentString, ref,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(/*! ../MinimalBaseObject */ 30);

Map = __webpack_require__(/*! ../Map */ 28);

Inspected = __webpack_require__(/*! ./Inspected */ 44);

escapeJavascriptString = __webpack_require__(/*! ../StringExtensions */ 31).escapeJavascriptString;

ref = __webpack_require__(/*! ../TypesExtended */ 18), isString = ref.isString, isArray = ref.isArray, isFunction = ref.isFunction, isObject = ref.isObject, isPlainObject = ref.isPlainObject, isClass = ref.isClass, isDate = ref.isDate, isRegExp = ref.isRegExp, objectName = ref.objectName, isBrowserObject = ref.isBrowserObject;

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
/* 44 */
/*!***************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/index.coffee ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 7);

module.exports.addModules({
  Array: __webpack_require__(/*! ./Array */ 45),
  Core: __webpack_require__(/*! ./Core */ 46),
  Object: __webpack_require__(/*! ./Object */ 47),
  String: __webpack_require__(/*! ./String */ 48)
});


/***/ }),
/* 45 */
/*!***************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/Array.coffee ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Array, MinimalBaseObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(/*! ../../MinimalBaseObject */ 30);

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
/* 46 */
/*!**************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/Core.coffee ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Core, MinimalBaseObject,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(/*! ../../MinimalBaseObject */ 30);

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
/* 47 */
/*!****************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/Object.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, Object,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(/*! ../../MinimalBaseObject */ 30);

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
/* 48 */
/*!****************************************************************!*\
  !*** ./source/Art.StandardLib/Inspect/Inspected/String.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MinimalBaseObject, String, escapeJavascriptString,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

MinimalBaseObject = __webpack_require__(/*! ../../MinimalBaseObject */ 30);

escapeJavascriptString = __webpack_require__(/*! ../../StringExtensions */ 31).escapeJavascriptString;

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
/* 49 */
/*!*******************************************************!*\
  !*** ./source/Art.StandardLib/AsyncExtensions.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var AsyncExtensions, Promise, toSeconds;

Promise = __webpack_require__(/*! ./Promise */ 15);

toSeconds = __webpack_require__(/*! ./DateExtensions */ 50).toSeconds;

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
/* 50 */
/*!******************************************************!*\
  !*** ./source/Art.StandardLib/DateExtensions.coffee ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dateFormat, firstOfDay, firstOfDayLocal, firstOfHour, formattedInspect, isDate, isNumber, isString, march1973InMilliseconds, ref, secondsPerDay, secondsPerHour, toDate, toMilliseconds, toSeconds,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

ref = __webpack_require__(/*! ./Core/Types */ 14), isString = ref.isString, isNumber = ref.isNumber, isDate = ref.isDate;

formattedInspect = __webpack_require__(/*! ./Inspect */ 25).formattedInspect;

march1973InMilliseconds = 100000000000;

module.exports = {
  dateFormat: dateFormat = __webpack_require__(/*! dateformat */ 41),
  formatDate: function(value, format, utc) {
    if (isString(value)) {
      format = value;
      value = null;
    }
    return dateFormat(toDate(value), format, utc);
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
  toSeconds: toSeconds = function(v) {
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
  },
  secondsPerHour: secondsPerHour = 3600,
  secondsPerDay: secondsPerDay = secondsPerHour * 24,
  firstOfHour: firstOfHour = function(time) {
    return ((toSeconds(time) / secondsPerHour) | 0) * secondsPerHour;
  },
  firstOfDay: firstOfDay = function(time) {
    return ((toSeconds(time) / secondsPerDay) | 0) * secondsPerDay;
  },
  firstOfWeek: function(time) {
    return firstOfDay(time) - (modulo(toDate(time).getUTCDay() - 1, 7)) * secondsPerDay;
  },
  firstOfMonth: function(time) {
    return firstOfDay(time) - (toDate(time).getUTCDate() - 1) * secondsPerDay;
  },
  firstOfDayLocale: firstOfDayLocal = function(time) {
    return firstOfHour(time) - toDate(time).getHours() * secondsPerHour;
  },
  firstOfWeekLocale: function(time) {
    return firstOfDayLocal(time) - (modulo(toDate(time).getDay() - 1, 7)) * secondsPerDay;
  },
  firstOfMonthLocale: function(time) {
    return firstOfDayLocal(time) - (toDate(time).getDate() - 1) * secondsPerDay;
  }
};


/***/ }),
/* 51 */
/*!************************************************!*\
  !*** ./source/Art.StandardLib/Function.coffee ***!
  \************************************************/
/*! no static exports found */
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
/* 52 */
/*!**************************************************!*\
  !*** ./source/Art.StandardLib/ObjectDiff.coffee ***!
  \**************************************************/
/*! no static exports found */
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
/* 53 */
/*!*****************************************************!*\
  !*** ./source/Art.StandardLib/MapExtensions.coffee ***!
  \*****************************************************/
/*! no static exports found */
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
/* 54 */
/*!**********************************************************!*\
  !*** ./source/Art.StandardLib/PromisedFileReader.coffee ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Promise, PromisedFileReader;

Promise = __webpack_require__(/*! ./Promise */ 15);

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
/* 55 */
/*!********************************************!*\
  !*** ./source/Art.StandardLib/Ruby.coffee ***!
  \********************************************/
/*! no static exports found */
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
/* 56 */
/*!****************************************************!*\
  !*** ./source/Art.StandardLib/ShallowClone.coffee ***!
  \****************************************************/
/*! no static exports found */
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
/* 57 */
/*!********************************************!*\
  !*** ./source/Art.StandardLib/Time.coffee ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Time, base, commaize, dateSecondMinusPerformanceSecond, initDateSecond, initPerformanceSecond;

commaize = __webpack_require__(/*! ./MathExtensions */ 32).commaize;

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
/* 58 */
/*!*********************************************!*\
  !*** ./source/Art.StandardLib/Clone.coffee ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
2018-07-27 SBD Notes

I want to move towards:

  clone: is a combination of stuctural clone and calling .clone, if available. Otherwise, it doesn't do what I'm calling invasive-cloning.
    invasiveCloning: false
    customCloning: true
    recusiveSafe: fully
    Note: ArtAtomic objects have .clones that return new objects, however, ArtAtomic objects are designed to be used in a read-only way,
      so this is a waste most of the time. UNLESS you intend to modify the cloned object, which sometimes you do need to do.
      So, that's why cloneStructure is often the right answer - it won't clone non-plain-objects

  cloneStructure: clone only plain-object and arrays. Everything else is just a simple assignment.
    invasiveCloning: false
    customCloning: false
    recusiveSafe: stack - (See below)

  invasiveClone:
    invasiveCloning: false
    customCloning: false
    recusiveSafe: full
    (cloneByProperties basically did this)
    Deeply clone everything, manually cloning objects regardless if they have a .clone method.

---
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
 */
var Clone, Map, Unique, byProperties, byStructure, clonedMap, inspect, isArray, isPlainObject, ref, topObject, uniquePropertyName;

Map = __webpack_require__(/*! ./Map */ 28);

Unique = __webpack_require__(/*! ./Unique */ 29);

inspect = __webpack_require__(/*! ./Inspect */ 25).inspect;

ref = __webpack_require__(/*! ./Core/Types */ 14), isPlainObject = ref.isPlainObject, isArray = ref.isArray;

uniquePropertyName = Unique.PropertyName;

clonedMap = null;

byStructure = false;

byProperties = false;

topObject = null;

module.exports = Clone = (function() {
  var _clone, _cloneStructure, cloneArray, cloneByProperties, cloneByStructure, cloneObject, cloneStructure, cloneStructureFromStack, cloneStructurePush, cloneStructureToStack, cloneSturcturePop, emptyClone, isStructural;

  function Clone() {}

  cloneArray = function(array) {
    var clonedArray, index, j, len, value;
    clonedMap.set(array, clonedArray = array.slice());
    for (index = j = 0, len = clonedArray.length; j < len; index = ++j) {
      value = clonedArray[index];
      clonedArray[index] = _clone(value);
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
        clonedObject[k] = _clone(v);
      }
    }
    return clonedObject;
  };

  Clone.emptyClone = emptyClone = function(obj) {
    if (isArray(obj)) {
      return [];
    } else {
      return Object.create(Object.getPrototypeOf(obj));
    }
  };

  Clone._clone = _clone = function(obj, mode) {
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
    if (byStructure && !(isArray(obj || isPlainObject(obj)))) {
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
    clonedObject = isArray(obj) ? cloneArray(obj) : cloneObject(obj);
    if (topObject === obj) {
      byStructure = false;
      byProperties = false;
      topObject = null;
      clonedMap = null;
    }
    return clonedObject;
  };

  Clone.clone = function(obj, mode) {
    if (mode != null) {
      console.error("2018-07-27: clone mode-param is DEPRICATED. Partial solution, see: cloneStructure");
    }
    return _clone(obj, mode);
  };

  Clone.cloneByProperties = cloneByProperties = function(obj) {
    console.error("2018-07-27: cloneByProperties is DEPRICATED. Partial solution, see: cloneStructure");
    return _clone(obj, "byProperties");
  };

  Clone.cloneByStructure = cloneByStructure = function(obj) {
    console.error("2018-07-27: cloneByStructure is DEPRICATED. Use: cloneStructure");
    return _clone(obj, "byStructure");
  };

  Clone.prototype.isStructural = isStructural = function(obj) {
    return isPlainObject(obj) || isArray(obj);
  };


  /*
  clones plain objects and arrays, but not any other type
  
  FEATURES
    - no allocations beyond the newly crearted object and arrays
  
  recursiveSafe: uses a stack
    This means:
      NO two objects or arrays in the output structure will be "==="
      UNLESS they were in a (grand)parent/(grand)child relationship in the source.
  
      This means if you have the same (===) object/array more than once in the structure,
      in a non (grand)parent/(grand)child way, each use will get a separate cloned output
      in the new structure. In other words
  
    This as a nice advantage: the output is JSON-compatible.
  
    This is mostly a performance optimization. It allows us to avoid any extra object allocations.
    Once we can safely use the new ES6 Map everywhere, we might perf-test again to see if full
    recursion-safety isn't just as fast.
    But then we lose JSON-compatible output guarantees...
   */

  Clone.cloneStructure = cloneStructure = function(inValue) {
    var cloningStructurePushed, isA;
    cloningStructurePushed = false;
    if (isPlainObject(inValue) || (isA = isArray(inValue))) {
      return _cloneStructure(inValue, isA);
    } else {
      return inValue;
    }
  };

  cloneStructureFromStack = [];

  cloneStructureToStack = [];

  cloneStructurePush = function(inValue, outValue) {
    cloneStructureFromStack.push(inValue);
    cloneStructureToStack.push(outValue);
    return true;
  };

  cloneSturcturePop = function() {
    cloneStructureFromStack.pop();
    return cloneStructureToStack.pop();
  };

  _cloneStructure = function(inObjOrArray, inputIsArray) {
    var i, j, k, len, outValue, pushed, v, vIsArray;
    if (0 <= (i = cloneStructureFromStack != null ? cloneStructureFromStack.indexOf(inObjOrArray) : void 0)) {
      return cloneStructureToStack[i];
    } else {
      pushed = false;
      outValue = null;
      if (inputIsArray) {
        outValue = [];
        for (j = 0, len = inObjOrArray.length; j < len; j++) {
          v = inObjOrArray[j];
          outValue.push(isPlainObject(v) || (vIsArray = isArray(v)) ? (pushed || (pushed = cloneStructurePush(inObjOrArray, outValue)), _cloneStructure(v, vIsArray)) : v);
        }
      } else {
        outValue = {};
        for (k in inObjOrArray) {
          v = inObjOrArray[k];
          outValue[k] = isPlainObject(v) || (vIsArray = isArray(v)) ? (pushed || (pushed = cloneStructurePush(inObjOrArray, outValue)), _cloneStructure(v, vIsArray)) : v;
        }
      }
      if (pushed) {
        cloneSturcturePop();
      }
      return outValue;
    }
  };

  return Clone;

})();


/***/ }),
/* 59 */
/*!*******************************************!*\
  !*** ./source/Art.StandardLib/Log.coffee ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Inspect, Log, callStack, containsPromises, deepResolve, disableLog, getEnv, isNode, isString, merge, peek, ref, ref1,
  slice = [].slice;

Inspect = __webpack_require__(/*! ./Inspect/namespace */ 6);

callStack = __webpack_require__(/*! ./CallStack */ 60).callStack;

isString = __webpack_require__(/*! ./TypesExtended */ 18).isString;

peek = __webpack_require__(/*! ./ArrayExtensions */ 40).peek;

merge = __webpack_require__(/*! ./Core */ 9).merge;

ref = __webpack_require__(/*! ./Promise */ 15), deepResolve = ref.deepResolve, containsPromises = ref.containsPromises;

ref1 = __webpack_require__(/*! ./Environment */ 20), isNode = ref1.isNode, getEnv = ref1.getEnv;

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
/* 60 */
/*!*************************************************!*\
  !*** ./source/Art.StandardLib/CallStack.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CallStack, inspect, isString, parseUrl;

isString = __webpack_require__(/*! ./TypesExtended */ 18).isString;

parseUrl = __webpack_require__(/*! ./ParseUrl */ 21).parseUrl;

inspect = __webpack_require__(/*! ./Inspect */ 25).inspect;

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
/* 61 */
/*!**********************************************************!*\
  !*** ./source/Art.StandardLib/ReschedulableTimer.coffee ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ReschedulableTimer, currentSecond, timeout;

currentSecond = __webpack_require__(/*! ./Time */ 57).currentSecond;

timeout = __webpack_require__(/*! ./AsyncExtensions */ 49).timeout;

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
/* 62 */
/*!*********************************************************!*\
  !*** ./source/Art.StandardLib/PromiseWorkerPool.coffee ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Promise, PromiseWorkerPool, log;

Promise = __webpack_require__(/*! ./Promise */ 15);

log = __webpack_require__(/*! ./Log */ 59).log;


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
/* 63 */
/*!****************************************************!*\
  !*** ./source/Art.StandardLib/RequestError.coffee ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var RequestError, compactFlatten, defineModule, formattedInspect, isFunction, merge, mergeInto, objectWithout, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defineModule = __webpack_require__(/*! ./CommonJs */ 19).defineModule;

formattedInspect = __webpack_require__(/*! ./Inspect */ 25).formattedInspect;

ref = __webpack_require__(/*! ./Core */ 9), mergeInto = ref.mergeInto, isFunction = ref.isFunction, upperCamelCase = ref.upperCamelCase, compactFlatten = ref.compactFlatten, merge = ref.merge;

objectWithout = __webpack_require__(/*! ./ObjectExtensions */ 35).objectWithout;


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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 16)(module)))

/***/ })
/******/ ]);