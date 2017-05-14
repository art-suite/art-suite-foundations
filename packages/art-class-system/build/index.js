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
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, Log, MinimalBaseObject, StandardLib, Unique, WebpackHotLoader, callStack, capitalize, clone, concatInto, decapitalize, extendClone, functionName, getModuleBeingDefined, inspectedObjectLiteral, isFunction, isPlainArray, isPlainObject, isString, log, mergeInto, nextUniqueObjectId, object, objectName,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

StandardLib = __webpack_require__(3);

WebpackHotLoader = __webpack_require__(1);

capitalize = StandardLib.capitalize, decapitalize = StandardLib.decapitalize, log = StandardLib.log, extendClone = StandardLib.extendClone, clone = StandardLib.clone, isFunction = StandardLib.isFunction, objectName = StandardLib.objectName, isPlainObject = StandardLib.isPlainObject, functionName = StandardLib.functionName, isString = StandardLib.isString, isPlainArray = StandardLib.isPlainArray, Unique = StandardLib.Unique, callStack = StandardLib.callStack, Log = StandardLib.Log, log = StandardLib.log, inspectedObjectLiteral = StandardLib.inspectedObjectLiteral, MinimalBaseObject = StandardLib.MinimalBaseObject, getModuleBeingDefined = StandardLib.getModuleBeingDefined, concatInto = StandardLib.concatInto, mergeInto = StandardLib.mergeInto, isString = StandardLib.isString, object = StandardLib.object;

nextUniqueObjectId = Unique.nextUniqueObjectId;

module.exports = BaseClass = (function(superClass) {
  var arrayPropertyExtender, createWithPostCreate, excludedKeys, getOwnProperty, imprintObject, objectPropertyExtender, warnedAboutIncludeOnce;

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
    toObject:   object will be altered to be an "imprint" of fromObject
    fromObject: object pattern used to imprint toObject
    preserveState:
      false:
        toObject has every property updated to exactly match fromObject
  
        This includes:
          1. delete properties in toObject that are not in fromObject
          2. add every property in fromObject but not in toObject
          3. overwriting every property in toObject also in fromObject
  
      true:
        Attempts to preserve the state of toObject while updating its functionality.
        This means properties which are functions in either object are updated.
  
        WARNING: This is a grey area for JavaScript. It is not entirely clear what is
          state and what is 'functionality'. I, SBD, have made the following heuristic decisions:
  
        Imprint actions taken when preserving State:
  
        1. DO NOTHING to properties in toObject that are not in fromObject
        2. add every property in fromObject but not in toObject
        3. properties in toObject that are also in fromObject are updated
          if one of the following are true:
          - isFunction fromObject[propName]
          - isFunction toObject[propName]
          - !toObject.hasOwnProperty propName
          - propName does NOT start with "_"
   */

  BaseClass.imprintObject = imprintObject = function(toObject, fromObject, preserveState) {
    var fromValue, k, v;
    if (preserveState == null) {
      preserveState = false;
    }
    if (!preserveState) {
      for (k in toObject) {
        v = toObject[k];
        if (!fromObject.hasOwnProperty(k)) {
          delete toObject[k];
        }
      }
    }
    for (k in fromObject) {
      fromValue = fromObject[k];
      if (fromObject.hasOwnProperty(k)) {
        if (!preserveState || isFunction(fromValue) || isFunction(toObject[k]) || !k.match(/^_/) || !toObject.hasOwnProperty(k)) {
          toObject[k] = fromValue;
        }
      }
    }
    return fromObject;
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
      var classModuleState, hotReloaded, liveClass;
      if (classModuleState = moduleState[klass.getName()]) {
        liveClass = classModuleState.liveClass;
        hotReloaded = true;
        classModuleState.hotReloadVersion++;
        classModuleState.hotUpdatedFromClass = klass;
        liveClass.namespace._setChildNamespaceProps(liveClass.getName(), klass);
        klass._name = liveClass._name;
        liveClass.imprintFromClass(klass);
        log({
          "Art.ClassSystem.BaseClass: class hot-reload": {
            "class": liveClass.getNamespacePath(),
            version: classModuleState.hotReloadVersion
          }
        });
      } else {
        hotReloaded = false;
        klass._hotClassModuleState = moduleState[klass.getName()] = classModuleState = {
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

  BaseClass.postCreateAbstractClass = function(options) {
    return this;
  };

  BaseClass.postCreateConcreteClass = function(options) {
    return this;
  };

  excludedKeys = ["__super__", "namespace", "namespacePath"].concat(Object.keys(Neptune.Base));

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


  /*
  Allows you to define properties on the prototype that inherit their data from
  their super-classes prototype.
  
  By default, uses extendClone to init. extendClone has these semantics:
    Object properties actually create a parallel inheritance structure such that
      later-changes on the super-object are reflected in the inheriting object.
      They ARE updated with later parent-changes
    Array properties inherit the values in the super-class array at declaration time,
      They ARE NOT updated with any later parent-changes!
      If we ever need that functionality, we'll need to make a special Object-type
      that extendClone recognizes that handles the logic of "ExtendableArray".
   */

  BaseClass.getPrototypePropertyExtendedByInheritance = function(propertyName, defaultStructure, _clone) {
    if (_clone == null) {
      _clone = extendClone;
    }
    log.error("DEPRICATED: getPrototypePropertyExtendedByInheritance. use extendableProperty");
    return getOwnProperty(this.prototype, propertyName, function(object) {
      return _clone(object[propertyName] || defaultStructure);
    });
  };


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

  BaseClass.getOwnProperty = getOwnProperty = function(object, property, init) {
    if (object.hasOwnProperty(property)) {
      return object[property];
    } else {
      return object[property] = isFunction(init) ? init(object) : clone(object[property] || init);
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

  BaseClass.objectPropertyExtender = objectPropertyExtender = function(mapOrKey, value) {
    if (isString(mapOrKey)) {
      this[mapOrKey] = value;
    } else if (isPlainObject(mapOrKey)) {
      mergeInto(this, mapOrKey);
    } else {
      throw new Error("first value argument must be a plain object or string");
    }
    return this;
  };


  /*
  arrayPropertyExtender
  
  IN: @ is set to the property-value to extend
  
  API 1:
    IN: array
    EFFECT: concatInto propValue, array
  
  API 2:
    IN: value
    EFFECT: propValue.push value
  
  NOTE: if you want to concat an array-as-a-value to the end of propValue, do this:
    arrayPropertyExtender.call propValue, [arrayAsValue]
  
  OUT: ignore
   */

  BaseClass.arrayPropertyExtender = arrayPropertyExtender = function(arrayOrValue) {
    if (isPlainArray(arrayOrValue)) {
      concatInto(this, arrayOrValue);
    } else {
      this.push(arrayOrValue);
    }
    return this;
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
  @extendableProperty: (map, propertyExtender = defaultPropertyExtender) -> ...
  
  IN: map
  IN: propertyExtender = (args...) ->
    IN: @ is propValue
    IN: 1 or more args
    OUT: new property value
    EFFECT:
      Can optionaly modify @ directly. If you do, just return @.
      @ is always the a unique clone for the current Class or Instance.
  
  EFFECT: for each {foo: defaultValue} in map, extendableProperty:
    defines standard getters:
      @class.getFoo()
      @prototype.getFoo()
      @prototype.foo # getter
      WARNING:
        !!! Don't modify the object returned by a getter !!!
  
        Getters only return the current, most-extended property value. It may not be extended to the
        current subclass or instance! Instead, call @extendFoo() if you wish to manually modify
        the extended property.
  
    defines extender functions:
      @class.extendFoo value      # extends the property on the PROTOTYPE object
      @prototype.extendFoo value  # extends the property on the INSTANCE object (which inherits from the prototype)
  
      EFFECT: extends the property if not already extended
      OUT: extendedPropValue
  
      API 1: IN: 0 args
        NO ADDITIONAL EFFECT - just returns the extended property
      API 2: IN: 1 or more args
        In addition to extending and returning the extended property:
        calls: propExtender extendedPropValue, args...
  
    NOTE: gthe prototype getters call the class getter for extension purposes.
      The result is each instance won't get its own version of the property.
      E.G. Interitance is done at the Class level, not the Instance level.
   */

  BaseClass.extendableProperty = function(map, propertyExtender) {
    var defaultValue, prop, results;
    results = [];
    for (prop in map) {
      defaultValue = map[prop];
      if (!(isPlainArray(defaultValue) || isPlainObject(defaultValue))) {
        throw new Error("only plain objects or plain arrays supported for defaultValue");
      }
      results.push((function(_this) {
        return function(prop, defaultValue) {
          var extenderName, getterName, internalName, propExtender, ucProp;
          propExtender = propertyExtender || (function() {
            if (isPlainObject(defaultValue)) {
              return objectPropertyExtender;
            } else if (isPlainArray(defaultValue)) {
              return arrayPropertyExtender;
            } else {
              throw new Error("Unsupported property type for extendableProperty: " + (inspect(defaultValue)) + ". Please specify a custom propertyExtender function.");
            }
          })();
          internalName = _this.propInternalName(prop);
          ucProp = capitalize(prop);
          getterName = "get" + ucProp;
          extenderName = "extend" + ucProp;
          _this[getterName] = function() {
            return this.prototype[internalName] || defaultValue;
          };
          _this.addGetter(prop, function() {
            return this[internalName] || defaultValue;
          });
          _this[extenderName] = function(value) {
            var propValue;
            propValue = getOwnProperty(this.prototype, internalName, defaultValue);
            if (arguments.length > 0) {
              this.prototype[internalName] = propExtender.apply(propValue, arguments);
            }
            return propValue;
          };
          return _this.prototype[extenderName] = function(value) {
            var propValue;
            propValue = getOwnProperty(this, internalName, defaultValue);
            if (arguments.length > 0) {
              this[internalName] = propExtender.apply(propValue, arguments);
            }
            return propValue;
          };
        };
      })(this)(prop, defaultValue));
    }
    return results;
  };

  BaseClass.getNamespacePath = function() {
    var ref, ref1;
    if (!this.namespacePath) {
      return this.namespacePath = (this.getName()) + " extends " + (this.__super__["class"].getNamespacePath());
    } else if (((ref = this.__super__) != null ? (ref1 = ref["class"]) != null ? ref1.namespacePath : void 0 : void 0) === this.namespacePath) {
      return this.namespacePath = (this.getName()) + " extends " + (this.__super__["class"].getNamespacePath());
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
      return !!this.getSingleton;
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
  creates the classGetter "singleton" which returns a single instance of the current class.
  
  IN: args are passed to the singleton constructor
  OUT: null
  
  The singleton instance is created on demand the first time it is accessed.
   */

  BaseClass.singletonClass = function() {
    var args, obj1;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (args.length > 0) {
      log.error({
        args: args
      });
      if (args.length > 0) {
        throw new Error("singletonClass args are DEPRICATED");
      }
    }
    if (this.getIsAbstractClass()) {
      throw new Error("singleton classes cannot be abstract");
    }
    this.classGetter((
      obj1 = {
        singleton: function() {
        var ref;
        if (((ref = this._singleton) != null ? ref["class"] : void 0) === this) {
          return this._singleton;
        } else {
          return this._singleton = new this;
        }
      }
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

  BaseClass.rawLog = function() {
    return Log.rawLog.apply(Log, arguments);
  };

  BaseClass.log = function() {
    var a, stack, toLog;
    stack = callStack();
    toLog = (function() {
      var i, len, results;
      if (arguments.length > 1) {
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          a = arguments[i];
          results.push(a);
        }
        return results;
      } else {
        return arguments[0];
      }
    }).apply(this, arguments);
    Log.logCore(toLog, stack, {
      className: this.className
    });
    return arguments[arguments.length - 1];
  };

  BaseClass.prototype.log = BaseClass.log;

  BaseClass.prototype.rawLog = BaseClass.rawLog;

  return BaseClass;

})(MinimalBaseObject);


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Art, ClassSystem,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(8);

module.exports = Art.ClassSystem || Art.addNamespace('ClassSystem', ClassSystem = (function(superClass) {
  extend(ClassSystem, superClass);

  function ClassSystem() {
    return ClassSystem.__super__.constructor.apply(this, arguments);
  }

  return ClassSystem;

})(Neptune.Base));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

module.exports.includeInNamespace(__webpack_require__(6)).addModules({
  BaseClass: __webpack_require__(0),
  BaseObject: __webpack_require__(5),
  DeclarableMixin: __webpack_require__(7),
  WebpackHotLoader: __webpack_require__(1)
});


/***/ }),
/* 5 */
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

})(__webpack_require__(0));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  {
    createWithPostCreate: __webpack_require__(0).createWithPostCreate
  }, [__webpack_require__(0), "mixInto createAllClass  createHotWithPostCreate"]
];


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var defineModule, each, isPlainObject, log, lowerCamelCase, object, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(3), defineModule = ref.defineModule, log = ref.log, object = ref.object, upperCamelCase = ref.upperCamelCase, lowerCamelCase = ref.lowerCamelCase, each = ref.each, isPlainObject = ref.isPlainObject;

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
          return function(v, k) {
            var getterName, name, preprocess, ucName, validate, valuePropertyName;
            if (isPlainObject(v)) {
              preprocess = v.preprocess, validate = v.validate;
            }
            preprocess || (preprocess = function(v) {
              return v;
            });
            validate || (validate = function() {
              return true;
            });
            name = lowerCamelCase(k);
            ucName = upperCamelCase(k);
            valuePropertyName = "_" + name;
            getterName = "get" + ucName;
            _this[name] = function(value) {
              if (!validate(value)) {
                throw new Error("invalid value: " + (formattedInspect({
                  value: value,
                  name: name
                })));
              }
              value = preprocess(value);
              return this[valuePropertyName] = value;
            };
            _this[getterName] = function() {
              return this[valuePropertyName];
            };
            return _this.addGetter(name, function() {
              return this["class"][valuePropertyName];
            });
          };
        })(this));
      };

      return DeclarableMixin;

    })(superClass);
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(10);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));

__webpack_require__(2);


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ })
/******/ ]);