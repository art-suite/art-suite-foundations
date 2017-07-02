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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
var ArtStandardLibCore, Namespace, isExtendedClass, isFunction, isPlainArray, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

ref = __webpack_require__(9), isFunction = ref.isFunction, isPlainArray = ref.isPlainArray, isExtendedClass = ref.isExtendedClass;

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
    return ArtStandardLibCore || (ArtStandardLibCore = __webpack_require__(8));
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Namespace, Neptune, version,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

__webpack_require__(5);

__webpack_require__(4);

version = (__webpack_require__(7)).version;

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

  Neptune.PackageNamespace = __webpack_require__(3);

  Neptune.namespacePath = "Neptune";

  Neptune.namespace = null;

  Neptune.version = version;

  Neptune.Base = Namespace;

  Neptune.isNode = __webpack_require__(6);

  return Neptune;

})(Namespace = __webpack_require__(0));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 3 */
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

})(__webpack_require__(0));


/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

var g;

g = typeof window !== "undefined" && window !== null ? window : typeof self !== "undefined" && self !== null ? self : global;

g.self || (g.self = g);

g.global || (g.global = g);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = false;

// Only Node.JS has a process variable that is of [[Class]] process
try {
 module.exports = Object.prototype.toString.call(global.process) === '[object process]' 
} catch(e) {}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"dependencies": {
		"art-standard-lib": "*",
		"coffee-script": "*"
	},
	"description": "Neptune.Namespaces.Runtime",
	"license": "ISC",
	"name": "neptune-namespaces-runtime",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "3.0.6"
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib/Core");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib/Types");

/***/ })
/******/ ]);