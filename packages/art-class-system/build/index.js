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

module.exports = __webpack_require__(/*! ./source/Art.ClassSystem */ 1);


/***/ }),
/* 1 */
/*!*********************************************!*\
  !*** ./source/Art.ClassSystem/index.coffee ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 2);

module.exports.includeInNamespace(__webpack_require__(/*! ./ClassSystem */ 5)).addModules({
  BaseClass: __webpack_require__(/*! ./BaseClass */ 6),
  BaseObject: __webpack_require__(/*! ./BaseObject */ 11),
  DeclarableMixin: __webpack_require__(/*! ./DeclarableMixin */ 12),
  ExtendablePropertyMixin: __webpack_require__(/*! ./ExtendablePropertyMixin */ 9),
  WebpackHotLoader: __webpack_require__(/*! ./WebpackHotLoader */ 8)
});


/***/ }),
/* 2 */
/*!*************************************************!*\
  !*** ./source/Art.ClassSystem/namespace.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ClassSystem,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! neptune-namespaces */ 3)).addNamespace('Art.ClassSystem', ClassSystem = (function(superClass) {
  extend(ClassSystem, superClass);

  function ClassSystem() {
    return ClassSystem.__super__.constructor.apply(this, arguments);
  }

  ClassSystem.version = __webpack_require__(/*! ../../package.json */ 4).version;

  return ClassSystem;

})(Neptune.PackageNamespace));


/***/ }),
/* 3 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
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

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"Enhances javascript/coffeescript classes with features of more evolved class-based languages primarily through a new BaseClass.","license":"ISC","name":"art-class-system","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"1.11.1"};

/***/ }),
/* 5 */
/*!***************************************************!*\
  !*** ./source/Art.ClassSystem/ClassSystem.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
  createWithPostCreate: __webpack_require__(/*! ./BaseClass */ 6).createWithPostCreate
};


/***/ }),
/* 6 */
/*!*************************************************!*\
  !*** ./source/Art.ClassSystem/BaseClass.coffee ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var BaseClass, ExtendablePropertyMixin, Log, MinimalBaseObject, StandardLib, Unique, WebpackHotLoader, callStack, capitalize, concatInto, decapitalize, functionName, getModuleBeingDefined, getSuperclass, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isString, log, merge, mergeInto, neq, nextUniqueObjectId, object, objectName,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

StandardLib = __webpack_require__(/*! art-standard-lib */ 7);

WebpackHotLoader = __webpack_require__(/*! ./WebpackHotLoader */ 8);

capitalize = StandardLib.capitalize, decapitalize = StandardLib.decapitalize, log = StandardLib.log, isFunction = StandardLib.isFunction, objectName = StandardLib.objectName, isPlainObject = StandardLib.isPlainObject, functionName = StandardLib.functionName, isString = StandardLib.isString, isPlainArray = StandardLib.isPlainArray, Unique = StandardLib.Unique, callStack = StandardLib.callStack, Log = StandardLib.Log, log = StandardLib.log, inspectedObjectLiteral = StandardLib.inspectedObjectLiteral, MinimalBaseObject = StandardLib.MinimalBaseObject, getModuleBeingDefined = StandardLib.getModuleBeingDefined, concatInto = StandardLib.concatInto, mergeInto = StandardLib.mergeInto, merge = StandardLib.merge, neq = StandardLib.neq, isString = StandardLib.isString, object = StandardLib.object, getSuperclass = StandardLib.getSuperclass;

nextUniqueObjectId = Unique.nextUniqueObjectId;

ExtendablePropertyMixin = __webpack_require__(/*! ./ExtendablePropertyMixin */ 9);

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

  BaseClass.imprintObject = imprintObject = function(targetObject, sourceObject, preserveState, returnActionsTaken) {
    var addedProps, changedProps, i, j, len, len1, neqResult, removedProps, sourcePropDescriptor, sourcePropName, sourcePropertyNames, sourceValue, sourceValueIsFunction, targetPropDescriptor, targetPropName, targetPropertyNames, targetValue, targetValueIsFunction;
    if (preserveState == null) {
      preserveState = false;
    }
    targetPropertyNames = Object.getOwnPropertyNames(targetObject);
    sourcePropertyNames = Object.getOwnPropertyNames(sourceObject);
    if (returnActionsTaken) {
      addedProps = removedProps = changedProps = void 0;
    }
    if (!preserveState) {
      for (i = 0, len = targetPropertyNames.length; i < len; i++) {
        targetPropName = targetPropertyNames[i];
        if (!(!(indexOf.call(sourcePropertyNames, targetPropName) >= 0))) {
          continue;
        }
        if (returnActionsTaken) {
          (removedProps != null ? removedProps : removedProps = []).push(targetPropName);
        }
        thoroughDeleteProperty(targetObject, targetPropName);
      }
    }
    for (j = 0, len1 = sourcePropertyNames.length; j < len1; j++) {
      sourcePropName = sourcePropertyNames[j];
      if (!(!(indexOf.call(nonImprintableProps, sourcePropName) >= 0))) {
        continue;
      }
      targetPropDescriptor = Object.getOwnPropertyDescriptor(targetObject, sourcePropName);
      sourcePropDescriptor = Object.getOwnPropertyDescriptor(sourceObject, sourcePropName);
      sourceValueIsFunction = isFunction(sourceValue = sourcePropDescriptor.value);
      targetValueIsFunction = isFunction(targetValue = targetPropDescriptor != null ? targetPropDescriptor.value : void 0);
      if (!preserveState || !targetPropDescriptor || sourceValueIsFunction || targetValueIsFunction || !sourcePropName.match(/^_/)) {
        if (returnActionsTaken) {
          if (!targetPropDescriptor) {
            if (sourcePropName !== "_name") {
              (addedProps != null ? addedProps : addedProps = []).push(sourcePropName);
            }
          } else {
            if (neqResult = neq(sourceValue, targetValue, true)) {
              (changedProps != null ? changedProps : changedProps = []).push(sourcePropName);
            }
          }
        }
        Object.defineProperty(targetObject, sourcePropName, sourcePropDescriptor);
      }
    }
    if (returnActionsTaken) {
      return (removedProps || changedProps || addedProps) && merge({
        removedProps: removedProps,
        changedProps: changedProps,
        addedProps: addedProps
      });
    } else {
      return sourceObject;
    }
  };


  /*
  imprints both the class and its prototype.
  
  preserved in spite of imprintObject's rules:
    @namespace
    @::constructor
   */

  BaseClass.imprintFromClass = function(updatedKlass, returnActionsTaken) {
    var _name, classUpdates, namespace, namespacePath, oldConstructor, prototypeUpdates, ref;
    if (updatedKlass !== this) {
      ref = this, namespace = ref.namespace, namespacePath = ref.namespacePath, _name = ref._name;
      oldConstructor = this.prototype.constructor;
      classUpdates = imprintObject(this, updatedKlass, true, returnActionsTaken);
      prototypeUpdates = imprintObject(this.prototype, updatedKlass.prototype, false, returnActionsTaken);
      this.prototype.constructor = oldConstructor;
      this.namespace = namespace;
      this.namespacePath = namespacePath;
      this._name = _name;
    }
    if (returnActionsTaken) {
      return merge({
        "class": classUpdates,
        prototype: prototypeUpdates
      });
    } else {
      return this;
    }
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
      var classModuleState, hotReloadKey, hotReloaded, liveClass, obj1, updates;
      hotReloadKey = klass.getHotReloadKey();
      if (classModuleState = moduleState[hotReloadKey]) {
        liveClass = classModuleState.liveClass;
        hotReloaded = true;
        classModuleState.hotReloadVersion++;
        classModuleState.hotUpdatedFromClass = klass;
        liveClass.namespace._setChildNamespaceProps(liveClass.getName(), klass);
        klass._name = liveClass._name;
        liveClass.classModuleState = classModuleState;
        updates = liveClass.imprintFromClass(klass, true);
        log((
          obj1 = {},
          obj1["Art.ClassSystem.BaseClass " + (typeof liveClass.getName === "function" ? liveClass.getName() : void 0) + " HotReload"] = {
            version: classModuleState.hotReloadVersion,
            updates: updates
          },
          obj1
        ));
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
    var ref;
    if ((ref = this.namespacePath) != null ? ref.match(this.getName()) : void 0) {
      return this.namespacePath;
    } else {
      return this.namespacePath = "(no parent namespace)." + (this.getName());
    }
  };

  BaseClass.getNamespacePathWithExtendsInfo = function() {
    return (this.getNamespacePath()) + " extends " + (getSuperclass(this).getNamespacePath());
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
      return inspectedObjectLiteral("class " + (this.getNamespacePath()));
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
    superclass: function() {
      return getSuperclass(this);
    },
    isAbstractClass: function() {
      return !(this.prototype instanceof this._firstAbstractAncestor);
    },
    isConcreteClass: function() {
      return !this.getIsAbstractClass();
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

  BaseClass.prototype.freeze = function() {
    this.getUniqueId();
    Object.freeze(this);
    return this;
  };

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
/* 7 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 8 */
/*!********************************************************!*\
  !*** ./source/Art.ClassSystem/WebpackHotLoader.coffee ***!
  \********************************************************/
/*! no static exports found */
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
/* 9 */
/*!***************************************************************!*\
  !*** ./source/Art.ClassSystem/ExtendablePropertyMixin.coffee ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var cloneStructure, concatInto, defineModule, each, formattedInspect, isBoolean, isFunction, isNumber, isPlainArray, isPlainObject, isString, log, lowerCamelCase, merge, mergeInto, object, ref, upperCamelCase,
  extend1 = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(/*! art-standard-lib */ 7), defineModule = ref.defineModule, log = ref.log, object = ref.object, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase, each = ref.each, isPlainObject = ref.isPlainObject, isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isNumber = ref.isNumber, isBoolean = ref.isBoolean, cloneStructure = ref.cloneStructure, isString = ref.isString, mergeInto = ref.mergeInto, concatInto = ref.concatInto, formattedInspect = ref.formattedInspect, merge = ref.merge;


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
      var arrayPropertyExtender, defaultExtender, getOwnProperty, noOptions, objectPropertyExtender, optimizedInitFunction;

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
            cloneStructure object[property] || init
      
      EFFECT:
        if object.hasOwnProperty property, return its current value
        otherwise, initialize and return it with init()
       */

      ExtendablePropertyMixin.getOwnProperty = getOwnProperty = function(object, internalName, init) {
        if (object.hasOwnProperty(internalName)) {
          return object[internalName];
        } else {
          return object[internalName] = init(object, internalName);
        }
      };

      optimizedInitFunction = function(internalName, init) {
        switch (false) {
          case !isFunction(init):
            return init;
          case !(isString(init) || isNumber(init) || isBoolean(init)):
            return function(object) {
              var ref1;
              return (ref1 = object[internalName]) != null ? ref1 : init;
            };
          default:
            return function(object) {
              var ref1;
              return cloneStructure((ref1 = object[internalName]) != null ? ref1 : init);
            };
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
        inherit a cloneStructure of the property from up the inheritance tree, and then
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
      
            EFFECT: creates a extension (cloneStructure) of the property for the currnet class, subclass or instance
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
              extendablePropValue = getOwnProperty(this.prototype, internalName, optimizedInitFunction(internalName, defaultValue));
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
              extendablePropValue = getOwnProperty(this, internalName, optimizedInitFunction(internalName, defaultValue));
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 10)(module)))

/***/ }),
/* 10 */
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
/* 11 */
/*!**************************************************!*\
  !*** ./source/Art.ClassSystem/BaseObject.coffee ***!
  \**************************************************/
/*! no static exports found */
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

})(__webpack_require__(/*! ./BaseClass */ 6));


/***/ }),
/* 12 */
/*!*******************************************************!*\
  !*** ./source/Art.ClassSystem/DeclarableMixin.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var defineModule, each, isPlainObject, log, lowerCamelCase, object, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ 7), defineModule = ref.defineModule, log = ref.log, object = ref.object, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase, each = ref.each, isPlainObject = ref.isPlainObject;

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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 10)(module)))

/***/ })
/******/ ]);