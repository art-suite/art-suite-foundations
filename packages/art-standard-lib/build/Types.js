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

/***/ 12:
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
  var _functionsPrototype, getSuperclass, hasOwnProperties, hasProperties, isArray, isArrayBuffer, isClass, isDirectPrototypeOf, isExtendedClass, isFunction, isJsonAtomicType, isNonNegativeInt, isNumber, isObject, isPlainObject, isString, oldIsClass;

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
    return (obj != null) && obj instanceof Error;
  };

  Types.isDate = function(obj) {
    return (obj != null ? obj.constructor : void 0) === Date;
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

  Types.isArrayBuffer = isArrayBuffer = global.ArrayBuffer ? function(obj) {
    return (obj != null) && obj.constructor === ArrayBuffer;
  } : function() {
    return false;
  };

  Types.isTypedArray = function(obj) {
    return (obj != null) && obj.length >= 0 && obj.length === (obj.length | 0) && isArrayBuffer(obj.buffer);
  };

  _functionsPrototype = Object.getPrototypeOf(function() {});

  Types.getSuperclass = getSuperclass = function(klass) {
    var ref, superclass;
    if (isFunction(klass)) {
      if (((superclass = Object.getPrototypeOf(klass)) != null) && superclass !== _functionsPrototype) {
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
    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (getSuperclass(obj)) || (hasOwnProperties(obj)) || ((obj.prototype != null) && hasProperties(obj.prototype))));
  };

  Types.isExtendedClass = isExtendedClass = function(obj) {
    return !!getSuperclass(obj);
  };

  Types.isArrayUniversal = Array.isArray;

  Types.isArray = isArray = Types.isArrayUniversal;

  Types.isArguments = function(o) {
    return (o != null) && typeof o.length === "number" && o.toString() === '[object Arguments]';
  };

  Types.isPlainArray = isArray;

  Types.isNonNegativeInt = isNonNegativeInt = function(x) {
    return (x != null) && x >= 0;
  };

  Types.isArrayIterable = function(source) {
    return (source != null) && isNonNegativeInt(source.length);
  };

  Types.isJsonAtomicType = isJsonAtomicType = function(a) {
    return isString(a) || isNumber(a) || a === true || a === false || a === null;
  };

  Types.isJsonType = function(a) {
    return isJsonAtomicType(a) || isPlainObject(a) || isArray(a);
  };

  Types.isObject = isObject = function(obj) {
    return (obj != null) && typeof obj === "object" && !isArray(obj);
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

/***/ 65:
/*!**********************!*\
  !*** ./Types.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./source/Art.StandardLib/Core/Types */ 12);


/***/ })

/******/ });