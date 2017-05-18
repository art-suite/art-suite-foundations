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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var NamespaceBaseClass, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

NamespaceBaseClass = __webpack_require__(1);

global.Neptune || (global.Neptune = module.exports = Neptune = (function(superClass) {
  extend(Neptune, superClass);

  function Neptune() {
    return Neptune.__super__.constructor.apply(this, arguments);
  }

  Neptune.Base = NamespaceBaseClass;

  Neptune.namespacePath = "Neptune";

  Neptune.namespace = null;

  Neptune.isNamespace = function(klass) {
    return (klass != null ? klass.prototype : void 0) instanceof NamespaceBaseClass;
  };

  Neptune.isNode = __webpack_require__(7);

  Neptune.version = (__webpack_require__(4)).version;

  return Neptune;

})(NamespaceBaseClass));

NamespaceBaseClass.namespace = Neptune;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/*
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

I think we can do that with one change: addNamespace needs to
change to take a name argument: @addNamespace: (name, namespace) ->
 */
var ArtStandardLibCore, NamespaceBaseClass, isExtendedClass, isFunction, isPlainArray, ref,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

__webpack_require__(3);

__webpack_require__(2);

ref = __webpack_require__(6), isFunction = ref.isFunction, isPlainArray = ref.isPlainArray, isExtendedClass = ref.isExtendedClass;

ArtStandardLibCore = null;

module.exports = NamespaceBaseClass = (function() {
  var excludedPropNames;

  function NamespaceBaseClass() {}

  NamespaceBaseClass.allNamespaces = {};

  NamespaceBaseClass.getAllNamespacePaths = function() {
    return Object.keys(NamespaceBaseClass.allNamespaces).sort();
  };

  NamespaceBaseClass.toString = function() {
    return this.namespacePath;
  };

  NamespaceBaseClass.inspect = function() {
    return this.namespacePath;
  };

  NamespaceBaseClass._name = "NamespaceBaseClass";

  NamespaceBaseClass.namespacePath = "Neptune.NamespaceBaseClass";

  NamespaceBaseClass.namespace = null;

  NamespaceBaseClass.namespaces = {};

  NamespaceBaseClass.modules = {};

  NamespaceBaseClass.getNamespacePath = function() {
    return this.namespacePath;
  };

  NamespaceBaseClass.getNamespaceNames = function() {
    return Object.keys(this.namespaces).sort();
  };

  NamespaceBaseClass.getModuleNames = function() {
    return Object.keys(this.modules).sort();
  };

  NamespaceBaseClass.getNeptuneLib = function() {
    return ArtStandardLibCore || (ArtStandardLibCore = __webpack_require__(5));
  };

  NamespaceBaseClass.getInspectedObjects = function(includeModules) {
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

  NamespaceBaseClass.getVersions = function() {
    var key, out, recurse, ref1, subNamespace;
    out = {};
    if (this === Neptune) {
      out.version = this.version;
    }
    ref1 = this.namespaces;
    for (key in ref1) {
      subNamespace = ref1[key];
      if (0 < Object.keys(recurse = subNamespace.getVersions()).length) {
        out[key] = recurse;
      }
      if (subNamespace.version != null) {
        (out[key] || (out[key] = {})).version = subNamespace.version;
      }
    }
    return out;
  };

  NamespaceBaseClass.addNamespace = function(name, namespace) {
    return this.allNamespaces[namespace.namespacePath] = this.namespaces[name] = this[name] = namespace._init(name, this);
  };

  NamespaceBaseClass.addModules = function(map) {
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

  NamespaceBaseClass.includeInNamespace = function() {
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

  NamespaceBaseClass._setChildNamespaceProps = function(name, child) {
    if (isFunction(child)) {
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

  NamespaceBaseClass._init = function(name, namespace1) {
    this.namespace = namespace1;
    this._name = name;
    this.modules = {};
    this.namespaces = {};
    this.namespace._setChildNamespaceProps(name, this);
    return this;
  };

  excludedPropNames = ["__super__"].concat(Object.keys(NamespaceBaseClass));


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

  NamespaceBaseClass._addToNamespace = function(propName, addingFrom) {
    var addingFromString, value;
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
      return this[propName];
    } else {
      return this[propName] = value;
    }
  };

  return NamespaceBaseClass;

})();


/***/ }),
/* 2 */
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
  return this._name || this.name || "anonymousFunction";
};

global.Function.prototype.hasName = function() {
  return !!(this._name || this.name);
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

g = typeof window !== "undefined" && window !== null ? window : typeof self !== "undefined" && self !== null ? self : global;

g.self || (g.self = g);

g.global || (g.global = g);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"neptune-namespaces": "./nn",
		"nn": "./nn"
	},
	"dependencies": {
		"art-build-configurator": "^1.8.1",
		"art-class-system": "^1.5.1",
		"art-config": "^1.0.0",
		"art-standard-lib": "^1.11.1",
		"art-testbench": "^1.0.0",
		"caffeine-script": "^0.38.1",
		"case-sensitive-paths-webpack-plugin": "^1.1.4",
		"coffee-loader": "^0.7.2",
		"coffee-script": "^1.12.3",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.26.1",
		"detect-node": "^2.0.3",
		"fs-promise": "^1.0.0",
		"glob-promise": "^3.1.0",
		"json-loader": "^0.5.4",
		"neptune-namespaces": "^2.0.0",
		"script-loader": "^0.7.0",
		"style-loader": "^0.13.1",
		"webpack": "^2.2.1",
		"webpack-dev-server": "^2.3.0",
		"webpack-merge": "^3.0.0"
	},
	"description": "Generate index.coffee and namespace.coffee files from directory structures",
	"devDependencies": {
		"chai": "^3.5.0",
		"mocha": "^2.5.3"
	},
	"license": "ISC",
	"name": "neptune-namespaces",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "2.2.1"
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib/Core");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib/Types");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("detect-node");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);