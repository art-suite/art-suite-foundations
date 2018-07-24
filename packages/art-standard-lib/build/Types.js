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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ({

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
  var _functionsPrototype, getSuperclass, hasOwnProperties, hasProperties, isArray, isClass, isDirectPrototypeOf, isExtendedClass, isFunction, isJsonAtomicType, isNonNegativeInt, isNumber, isObject, isPlainObject, isString;

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
    var prototype;
    return (typeof (prototype = Object.getPrototypeOf(klass)) === "function") && (prototype !== _functionsPrototype) && prototype;
  };

  Types.isClass = isClass = function(obj) {
    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (getSuperclass(obj)) || (hasOwnProperties(obj)) || (obj.prototype && hasProperties(obj.prototype))));
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

/***/ 64:
/*!**********************!*\
  !*** ./Types.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./source/Art.StandardLib/Core/Types */ 14);


/***/ })

/******/ });