module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("art-build-configurator");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var ArrayCompactFlatten, arraySlice, doFlattenInternal, flattenIfNeeded, isArguments, isArrayOrArguments, isPlainArray, keepAll, keepUnlessNullOrUndefined, needsFlatteningOrCompacting;

arraySlice = Array.prototype.slice;

isArguments = function(o) {
  return o && (typeof o.callee === "function") && (typeof o.length === "number");
};

isPlainArray = (function(_this) {
  return function(o) {
    return (o != null) && o.constructor === Array;
  };
})(this);

isArrayOrArguments = function(o) {
  return o && (isPlainArray(o) || isArguments(o));
};

doFlattenInternal = function(array, keepTester, output) {
  var a, i, len;
  output || (output = []);
  for (i = 0, len = array.length; i < len; i++) {
    a = array[i];
    if (isArrayOrArguments(a)) {
      flattenIfNeeded(a, keepTester, output);
    } else if (keepTester(a)) {
      output.push(a);
    }
  }
  return output;
};

needsFlatteningOrCompacting = function(array, keepTester) {
  var a, i, len;
  for (i = 0, len = array.length; i < len; i++) {
    a = array[i];
    if (isArrayOrArguments(a) || !keepTester(a)) {
      return true;
    }
  }
  return false;
};

flattenIfNeeded = function(array, keepTester, output) {
  var i, len, v;
  if (needsFlatteningOrCompacting(array, keepTester)) {
    return doFlattenInternal(array, keepTester, output);
  } else if (output) {
    for (i = 0, len = array.length; i < len; i++) {
      v = array[i];
      output.push(v);
    }
    return output;
  } else if (array.constructor !== Array) {
    return arraySlice.call(array);
  } else {
    return array;
  }
};

keepAll = function() {
  return true;
};

keepUnlessNullOrUndefined = function(a) {
  return a !== null && a !== void 0;
};

module.exports = ArrayCompactFlatten = (function() {
  function ArrayCompactFlatten() {}

  ArrayCompactFlatten.isPlainArray = isPlainArray;

  ArrayCompactFlatten.compact = function(array, keepTester) {
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

  ArrayCompactFlatten.flatten = function(firstArg) {
    return flattenIfNeeded(arguments.length === 1 ? isArrayOrArguments(firstArg) ? firstArg : [firstArg] : arguments, keepAll);
  };

  ArrayCompactFlatten.compactFlatten = function(array, keepTester) {
    if (keepTester == null) {
      keepTester = keepUnlessNullOrUndefined;
    }
    return flattenIfNeeded(array, keepTester);
  };

  return ArrayCompactFlatten;

})();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"abc": "./abc"
	},
	"dependencies": {
		"art-build-configurator": "^1.11.5",
		"art-class-system": "^1.5.2",
		"art-config": "^1.3.3",
		"art-standard-lib": "^1.11.1",
		"art-testbench": "^1.10.3",
		"caffeine-script": "^0.44.5",
		"case-sensitive-paths-webpack-plugin": "^1.1.4",
		"coffee-loader": "^0.7.2",
		"coffee-script": "^1.12.3",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.26.1",
		"detect-node": "^2.0.3",
		"fs-promise": "^1.0.0",
		"json-loader": "^0.5.4",
		"neptune-namespaces": "^2.2.2",
		"recursive-copy": "^2.0.6",
		"script-loader": "^0.7.0",
		"style-loader": "^0.13.1",
		"webpack": "^2.2.1",
		"webpack-dev-server": "^2.3.0",
		"webpack-merge": "^3.0.0",
		"webpack-node-externals": "^1.5.4"
	},
	"description": "Tools for configuring npm (package.json) and webpack (webpack.config.js)",
	"license": "ISC",
	"name": "art-build-configurator",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "1.11.6"
};

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var g;

g = typeof window !== "undefined" && window !== null ? window : typeof self !== "undefined" && self !== null ? self : global;

g.global = g;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var arrayIterableTest, each, extendedEach, isNonNegativeInt;

isNonNegativeInt = function(x) {
  return ((x | 0) === x) && x >= 0;
};

arrayIterableTest = function(source) {
  return source && isNonNegativeInt(source.length) && source.constructor !== Object;
};


/*
Notes:

Comprehension loop variables are always going to mask any variables
defined in a higher scope.

With e/ee we put all the when, with and key blocks in the same function,
so they naturally share one loop-scope.
 */

module.exports = {

  /*
  IN:
    source:
      array-like (source.length is a number >= 0)
      null or undefined
      otherwise, properties are iterated
  
    out: the value that will be returned.
      out is initialized to source if out == undefined.
      This is for convenience and code-reduction in the "each-without-into-set" case.
  
    withBlock: (currentIterationValue, currentIterationKey, returning) -> ignored
  
  USE: object, array, each
   */
  each: each = function(source, out, withBlock) {
    var i, k, len, v;
    if (out === "undefined") {
      out = source;
    }
    if (source != null) {
      if (arrayIterableTest(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          withBlock(v, k, out);
        }
      } else {
        for (k in source) {
          v = source[k];
          withBlock(v, k, out);
        }
      }
    }
    return out;
  },
  e: each,

  /*
  enhanced-each
  
  Different from each :
    updating-out:   out is updated with the result of every withBlock call
    break-support:  withBlock is passed a forth argument: setShouldBreak
  
    NOTE: out is only initialized to source, if out == undefined. Any updated out
    could be set to undefined and that would be returned.
  
  setShouldBreak:
    IN: ()
    OUT: the undefined value
    EFFECT: this will be the last call to withBlock &
      the value returned by this last call will be the result
      of ee.
  
  This should be enough for all features:
    - "return" - requires a setShouldReturn function in the enclosing scope, and setShouldBreak
    - "next" - becomes a return-statement in withBlock - this works with the basic "e"
    - "break" - setShouldBreak();return out;
    - "break value" - setShouldBreak();return value;
    - "reduce" iteration - needs updating-out
    - "find" iteration - needs break-with-value
  
  Cons:
    possible performance and code-size hit:
    - ee requires more code in the withBlock: {...; return out;}
    - ee creates a setShouldBreak function every time
  
    But, with testing, we may decided those don't really matter.
  
  EXAMPLES:
  
    find v from o with v > 10
  
    Caf.ee o, null, (v, k, out, brk) ->
      brk v if v > 10
  
  
    reduce v1, v2 from o with f v1, v2
  
     * I think we need to remove the out = source default.
  
    Caf.ee o, undefined, (v2, k, v1, brk) ->
      if v1 == undefined
        v2
      else
        f v1, v2
  
     * example: object v from o with v + 1
    Caf.e(o, {}, function(v, k, into) {
      return into[k] = v + 1;
    });
  
     * example: object v from o when v > 3 with v + 1
    Caf.e(o, {}, function(v, k, into) {
      if( v > 3 ) {
        return into[k] = v + 1;
      };
    });
  
     * example: object o
    Caf.e(o, {}, function(v, k, into) {
      return into[k] = v;
    });
   */
  extendedEach: extendedEach = function(source, out, withBlock) {
    var i, k, len, setShouldBreak, shouldBreak, v;
    if (out === "undefined") {
      out = source;
    }
    if (source != null) {
      shouldBreak = false;
      setShouldBreak = function() {
        shouldBreak = true;
        return void 0;
      };
      if (arrayIterableTest(source)) {
        for (k = i = 0, len = source.length; i < len; k = ++i) {
          v = source[k];
          out = withBlock(v, k, out, setShouldBreak);
          if (shouldBreak) {
            break;
          }
        }
      } else {
        for (k in source) {
          v = source[k];
          out = withBlock(v, k, out, setShouldBreak);
          if (shouldBreak) {
            break;
          }
        }
      }
    }
    return out;
  },
  ee: extendedEach
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var _import, compactFlatten, getSuper, isDirectPrototypeOf, isFalse, isFunction, isPlainArray, isPlainObject, isTrue, ref,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

ref = __webpack_require__(1), compactFlatten = ref.compactFlatten, isPlainArray = ref.isPlainArray, isPlainObject = ref.isPlainObject;

__webpack_require__(7);

global.__definingModule = null;

module.exports = {
  "in": function(a, b) {
    return indexOf.call(b, a) >= 0;
  },
  mod: function(a, b) {
    return modulo(a, b);
  },
  div: function(a, b) {
    return Math.floor(a / b);
  },
  pow: function(a, b) {
    return Math.pow(a, b);
  },
  existsOr: function(a, b) {
    return a != null ? a : b();
  },
  exists: function(a) {
    return (a !== null && a !== void 0) || void 0;
  },

  /*
  Implements the 'import' function.
  
  IN:
    importNames: array of strings of identifiers to import
    libs: array of objects to import from, first has highest priority.
  
  OUT: and object with one property per importName
   */
  "import": _import = function(importNames, libs) {
    var i, importName, j, len, len1, lib, out, v;
    out = {};
    libs = compactFlatten(libs);
    for (i = 0, len = importNames.length; i < len; i++) {
      importName = importNames[i];
      for (j = 0, len1 = libs.length; j < len1; j++) {
        lib = libs[j];
        if ((v = lib[importName]) != null) {
          out[importName] = v;
          break;
        }
      }
    }
    return out;
  },
  isTrue: isTrue = function(a) {
    return (a != null) && a !== false;
  },
  isFalse: isFalse = function(a) {
    return a === false || (a == null);
  },
  isFunction: isFunction = function(a) {
    return typeof a === "function";
  },
  isDirectPrototypeOf: isDirectPrototypeOf = function(o, prototype) {
    return !isFunction(o) && prototype.constructor === o.constructor;
  },
  toString: function(a) {
    if (a != null) {
      if (isPlainArray(a)) {
        return a.join('');
      } else if (isFunction(a != null ? a.toString : void 0)) {
        return a.toString();
      } else {

      }
    } else {
      return '';
    }
  },
  gt: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a > b;
    } else {
      return a.gt(b);
    }
  },
  lt: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a < b;
    } else {
      return a.lt(b);
    }
  },
  lte: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a <= b;
    } else {
      return a.lte(b);
    }
  },
  gte: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a >= b;
    } else {
      return a.gte(b);
    }
  },
  add: function(a, b) {
    if ((typeof a === "number" && typeof b === "number") || (typeof a === "string" && typeof b === "string")) {
      return a + b;
    } else {
      return a.add(b);
    }
  },
  sub: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    } else {
      return a.sub(b);
    }
  },
  mul: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a * b;
    } else {
      return a.mul(b);
    }
  },
  div: function(a, b) {
    if (typeof a === "number" && typeof b === "number") {
      return a / b;
    } else {
      return a.div(b);
    }
  },

  /*
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
    ^  Object.prototypeOf
  
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
  getSuper: getSuper = function(o) {
    var _super, out;
    if (!((typeof o === "object") || (typeof o === "function"))) {
      throw new Error("getSuper expecting an object");
    }
    _super = Object.getPrototypeOf(o);
    out = _super === Function.prototype && o.__super__ ? o.__super__.constructor : isDirectPrototypeOf(o, _super) ? Object.getPrototypeOf(_super) : _super;
    return out;
  },

  /*
  IN:
    klass a new class-function object
    init: (klass) -> outKlass
  
  OUT: if isF outKlass.createWithPostCreate
    outKlass.createWithPostCreate outKlass
  OR
    outKlass (from init)
  
  EFFECT:
    outKlass.createWithPostCreate?(outKlass) ? outKlass
   */
  defClass: function(klass, init) {
    var ref1;
    if (init != null) {
      init.call(klass, klass, getSuper(klass), getSuper(klass.prototype));
    }
    return (ref1 = typeof klass.createWithPostCreate === "function" ? klass.createWithPostCreate(klass) : void 0) != null ? ref1 : klass;
  },
  getModuleBeingDefined: function() {
    return global.__definingModule;
  },

  /*
  IN:
    defineFunciton ||
   */
  defMod: function(_module, a) {
    var lastModule, result;
    lastModule = global.__definingModule;
    global.__definingModule = _module;
    result = _module.exports = a();
    global.__definingModule = lastModule;
    return result;
  },
  i: _import,
  t: isTrue,
  f: isFalse,
  isF: isFunction
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var k, out, ref, ref1, ref2, v;

module.exports = out = {};

ref = __webpack_require__(1);
for (k in ref) {
  v = ref[k];
  out[k] = v;
}

ref1 = __webpack_require__(8);
for (k in ref1) {
  v = ref1[k];
  out[k] = v;
}

ref2 = __webpack_require__(9);
for (k in ref2) {
  v = ref2[k];
  out[k] = v;
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(2);
Caf.defMod(module, () => {
  let process = global.process,
    console = global.console,
    pv,
    pretend,
    configure,
    init,
    commander;
  __webpack_require__(5);
  ({ pv, pretend, configure, init } = commander = __webpack_require__(6)
    .version(__webpack_require__(3).version)
    .option(
      "-p, --pretend",
      "show the configs that will be generated without writing them"
    )
    .option("-c, --configure", "configure and update all")
    .option("--pv", "show your package's current version")
    .option("--init", "initialize a new Art-style project")
    .on("--help", function() {
      return console.log(
        `looks for ${Caf.toString(
          __webpack_require__(0).configFileName
        )} and configs as instructed`
      );
    })
    .parse(process.argv));
  return pv
    ? console.log(__webpack_require__(0).Versioning.current)
    : pretend || configure || init
        ? __webpack_require__(0)
            .go(process.cwd(), commander)
            .catch(function(e) {
              return console.error(e.stack);
            })
        : commander.outputHelp();
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ })
/******/ ]);