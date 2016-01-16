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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Xbd;

	module.exports = Xbd = __webpack_require__(3);

	Xbd.Dictionary = __webpack_require__(7);

	Xbd.Tag = __webpack_require__(79);

	Xbd.Xbd = __webpack_require__(80);

	Xbd.finishLoad(["Dictionary", "Tag", "Xbd"]);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Art,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Art = __webpack_require__(4);

	module.exports = Art.Xbd || (Art.Xbd = (function(superClass) {
	  extend(Xbd, superClass);

	  function Xbd() {
	    return Xbd.__super__.constructor.apply(this, arguments);
	  }

	  Xbd.namespace = Art;

	  Xbd.namespacePath = "Neptune.Art.Xbd";

	  return Xbd;

	})(Neptune.Base));

	Art.addNamespace(Art.Xbd);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	__webpack_require__(5);

	module.exports = Neptune.Art || (Neptune.Art = (function(superClass) {
	  extend(Art, superClass);

	  function Art() {
	    return Art.__super__.constructor.apply(this, arguments);
	  }

	  Art.namespace = Neptune;

	  Art.namespacePath = "Neptune.Art";

	  return Art;

	})(Neptune.Base));

	Neptune.addNamespace(Neptune.Art);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var Base, Neptune,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	if (typeof global === 'object') {
	  global.self = global;
	}

	Base = (function() {
	  function Base() {}

	  Base.namespacePath = "Neptune.Base";

	  Base.namespace = null;

	  Base.allNamespaces = {};

	  Base.classes = [];

	  Base.namespaces = [];

	  Base.addNamespace = function(namespace) {
	    var base, base1, name1, name2;
	    (base = this.allNamespaces)[name1 = namespace.namespacePath] || (base[name1] = []);
	    this.namespaces = (base1 = this.allNamespaces)[name2 = this.namespacePath] || (base1[name2] = []);
	    return this.namespaces.push(namespace);
	  };

	  Base.finishLoad = function(classes) {
	    var klass, name, newClasses;
	    newClasses = (function() {
	      var i, len, results;
	      results = [];
	      for (i = 0, len = classes.length; i < len; i++) {
	        name = classes[i];
	        if (!(typeof (klass = this[name]) === "function")) {
	          continue;
	        }
	        klass.namespace = this;
	        klass.namespacePath = this.namespacePath + "." + klass.name;
	        results.push(klass);
	      }
	      return results;
	    }).call(this);
	    return this.classes = this.classes.concat(newClasses);
	  };

	  return Base;

	})();

	module.exports = self.Neptune = Neptune = (function(superClass) {
	  extend(Neptune, superClass);

	  function Neptune() {
	    return Neptune.__super__.constructor.apply(this, arguments);
	  }

	  Neptune.Base = Base;

	  Neptune.namespacePath = "Neptune";

	  Neptune.namespace = null;

	  return Neptune;

	})(Base);

	console.log("neptune-namespaces global defined: self.Neptune");

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, Dictionary, binary, stream;

	Binary = __webpack_require__(8).Binary;

	binary = Binary.binary;

	stream = Binary.stream;

	module.exports = Dictionary = (function() {
	  Dictionary.parse = function(stream, name) {
	    var encoded_dictionary, lengths, num_entries, strings;
	    encoded_dictionary = stream.read_asi_string();
	    num_entries = encoded_dictionary.read_asi();
	    lengths = [];
	    while (num_entries--) {
	      lengths.push(encoded_dictionary.read_asi());
	    }
	    strings = lengths.map(function(len) {
	      return encoded_dictionary.read(len);
	    });
	    return new Dictionary(strings, name);
	  };

	  function Dictionary(strings, name) {
	    this.strings = strings;
	    this.name = name;
	  }

	  Dictionary.prototype.read_string = function(stream) {
	    var id, string;
	    id = stream.read_asi();
	    string = this.strings[id];
	    if (!string) {
	      throw "string id(" + id + ") not in " + this.name + " dictionary. keys = '" + (Element.keys(this.strings)) + "'";
	    }
	    return string;
	  };

	  return Dictionary;

	})();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation;

	module.exports = Foundation = __webpack_require__(10);

	Foundation.Async = __webpack_require__(12);

	Foundation.Binary = __webpack_require__(28);

	Foundation.Browser = __webpack_require__(47);

	Foundation.Inspect = __webpack_require__(31);

	Foundation.All = __webpack_require__(54);

	Foundation.Analytics = __webpack_require__(69);

	Foundation.Array = __webpack_require__(55);

	Foundation.BaseModule = __webpack_require__(70);

	Foundation.BaseObject = __webpack_require__(18);

	Foundation.BatchLoader = __webpack_require__(71);

	Foundation.CallStack = __webpack_require__(19);

	Foundation.Clone = __webpack_require__(56);

	Foundation.Epoch = __webpack_require__(72);

	Foundation.Eq = __webpack_require__(57);

	Foundation.Function = __webpack_require__(59);

	Foundation.Hash = __webpack_require__(58);

	Foundation.JsonStore = __webpack_require__(73);

	Foundation.Log = __webpack_require__(16);

	Foundation.Map = __webpack_require__(40);

	Foundation.Math = __webpack_require__(24);

	Foundation.Promise = __webpack_require__(60);

	Foundation.Regexp = __webpack_require__(25);

	Foundation.Ruby = __webpack_require__(66);

	Foundation.SequencedEventManager = __webpack_require__(74);

	Foundation.ShallowClone = __webpack_require__(26);

	Foundation.SingleObjectTransaction = __webpack_require__(75);

	Foundation.Stat = __webpack_require__(76);

	Foundation.String = __webpack_require__(23);

	Foundation.Time = __webpack_require__(67);

	Foundation.Transaction = __webpack_require__(77);

	Foundation.Types = __webpack_require__(21);

	Foundation.Unique = __webpack_require__(22);

	Foundation.WebWorker = __webpack_require__(68);

	Foundation.WorkerRpc = __webpack_require__(78);

	Foundation.finishLoad(["All", "Analytics", "Array", "BaseModule", "BaseObject", "BatchLoader", "CallStack", "Clone", "Epoch", "Eq", "Function", "Hash", "JsonStore", "Log", "Map", "Math", "Promise", "Regexp", "Ruby", "SequencedEventManager", "ShallowClone", "SingleObjectTransaction", "Stat", "String", "Time", "Transaction", "Types", "Unique", "WebWorker", "WorkerRpc"]);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Art,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Art = __webpack_require__(11);

	module.exports = Art.Foundation || (Art.Foundation = (function(superClass) {
	  extend(Foundation, superClass);

	  function Foundation() {
	    return Foundation.__super__.constructor.apply(this, arguments);
	  }

	  Foundation.namespace = Art;

	  Foundation.namespacePath = "Neptune.Art.Foundation";

	  return Foundation;

	})(Neptune.Base));

	Art.addNamespace(Art.Foundation);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	__webpack_require__(5);

	module.exports = Neptune.Art || (Neptune.Art = (function(superClass) {
	  extend(Art, superClass);

	  function Art() {
	    return Art.__super__.constructor.apply(this, arguments);
	  }

	  Art.namespace = Neptune;

	  Art.namespacePath = "Neptune.Art";

	  return Art;

	})(Neptune.Base));

	Neptune.addNamespace(Neptune.Art);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Async;

	module.exports = Async = __webpack_require__(13);

	Async.All = __webpack_require__(14);

	Async.Basic = __webpack_require__(15);

	Async.Join = __webpack_require__(17);

	Async.Sequence = __webpack_require__(27);

	Async.finishLoad(["All", "Basic", "Join", "Sequence"]);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(10);

	module.exports = Foundation.Async || (Foundation.Async = (function(superClass) {
	  extend(Async, superClass);

	  function Async() {
	    return Async.__super__.constructor.apply(this, arguments);
	  }

	  Async.namespace = Foundation;

	  Async.namespacePath = "Neptune.Art.Foundation.Async";

	  return Async;

	})(Neptune.Base));

	Foundation.addNamespace(Foundation.Async);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Async, Basic, addAll;

	Async = __webpack_require__(13);

	Basic = __webpack_require__(15);

	addAll = function(klass) {
	  var k, results, v;
	  results = [];
	  for (k in klass) {
	    v = klass[k];
	    if (Async[k]) {
	      console.log("addAll to Foundation: conflict on " + k + " from " + klass.name);
	    }
	    results.push(Async[k] = v);
	  }
	  return results;
	};

	addAll(Basic);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Basic, log;

	log = __webpack_require__(16).log;

	module.exports = Basic = (function() {
	  var timeout;

	  function Basic() {}

	  Basic.timeout = timeout = function(ms, f) {
	    return setTimeout(f, ms);
	  };

	  Basic.requestAnimationFrame = self.requestAnimationFrame || self.webkitRequestAnimationFrame || self.mozRequestAnimationFrame || self.oRequestAnimationFrame || self.msRequestAnimationFrame || function(f) {
	    return setTimeout(f, 1000 / 60);
	  };

	  Basic.nextTick = function(f) {
	    return timeout(0, f);
	  };

	  Basic.throwErrorOutOfStack = function(e) {
	    return timeout(0, function() {
	      throw e;
	    });
	  };

	  Basic.evalAndThrowErrorsOutOfStack = function(f) {
	    var e, error;
	    try {
	      return f();
	    } catch (error) {
	      e = error;
	      console.error(e.stack);
	      return Basic.throwErrorOutOfStack(e);
	    }
	  };

	  return Basic;

	})();


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, Log, log,
	  slice = [].slice;

	Foundation = __webpack_require__(10);

	module.exports = Log = (function() {
	  function Log() {}

	  Log.contextString = function(stack, defaultContext) {
	    var caller, context;
	    if (stack && (caller = stack[1])) {
	      context = caller["function"] ? caller["class"] ? caller["class"] + "::" + caller["function"] + "()" : caller["function"] + "()" : defaultContext ? defaultContext + ":" : "";
	      if (caller.sourceFileName) {
	        return caller.sourceFileName + ("-" + caller.sourceLine + ": ") + context;
	      }
	    } else {
	      return "()";
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
	    while ((inspected = Foundation.Inspect.inspectLean(toInspect, {
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
	      return this.autoSizedIndepect(params);
	    }
	  };

	  Log.hideLogging = function() {
	    return this.loggingHidden = true;
	  };

	  Log.showLogging = function() {
	    return this.loggingHidden = false;
	  };

	  Log.rawLog = function() {
	    if (!this.loggingHidden) {
	      return console.log.apply(console, arguments);
	    }
	  };

	  Log.rawErrorLog = function() {
	    if (!this.loggingHidden) {
	      return console.error.apply(console, arguments);
	    }
	  };

	  Log.logCore = function(m, stack, className) {
	    if (this.alternativeLogger) {
	      return this.alternativeLogger.logCore(m, stack, className);
	    } else {
	      return this.rawLog(((this.contextString(stack, className)) + " ") + this.loggedParamsString(m));
	    }
	  };

	  return Log;

	})();

	Log.log = log = function() {
	  var args, m, stack;
	  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	  m = args.length === 1 ? args[0] : args;
	  stack = Foundation.callStack();
	  Log.logCore(m, stack, this.name);
	  return args[args.length - 1];
	};

	Log.logL = function(obj) {
	  var k, ret, v;
	  ret = null;
	  for (k in obj) {
	    v = obj[k];
	    ret = v;
	  }
	  log(obj);
	  return ret;
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Basic, Join, nextTick,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	Basic = __webpack_require__(15);

	nextTick = Basic.nextTick;

	console.log("Foundation.Async.Join is depricated. Use Promises.");

	module.exports = Join = (function(superClass) {
	  extend(Join, superClass);

	  function Join(onJoin) {
	    Join.__super__.constructor.apply(this, arguments);
	    this.onJoin = onJoin;
	    this.results = [];
	    this.functions = [];
	    this.resultsPending = 0;
	  }

	  Join.prototype.join = function(onJoin) {
	    this.onJoin = onJoin;
	    if (!this.startQueued) {
	      return this.queueStart();
	    }
	  };

	  Join.prototype["do"] = function() {
	    var f, i, len;
	    if (this.started) {
	      throw new Error("already started");
	    }
	    for (i = 0, len = arguments.length; i < len; i++) {
	      f = arguments[i];
	      this.functions.push(f);
	    }
	    if (!this.startQueued) {
	      return this.queueStart();
	    }
	  };

	  Join.prototype.queueStart = function() {
	    this.startQueued = true;
	    return nextTick((function(_this) {
	      return function() {
	        return _this.start();
	      };
	    })(this));
	  };

	  Join.prototype.start = function() {
	    var f, i, len, ref, resultIndex, results;
	    if (this.functions.length === 0) {
	      return this.onJoin(this.results);
	    }
	    this.started = true;
	    this.results = new Array(this.functions.length);
	    this.resultsPending = this.functions.length;
	    ref = this.functions;
	    results = [];
	    for (resultIndex = i = 0, len = ref.length; i < len; resultIndex = ++i) {
	      f = ref[resultIndex];
	      results.push((function(_this) {
	        return function(f, resultIndex) {
	          if (f.length > 0) {
	            return f(function(result) {
	              return _this.jobDone(resultIndex, result);
	            });
	          } else {
	            return _this.jobDone(resultIndex, f());
	          }
	        };
	      })(this)(f, resultIndex));
	    }
	    return results;
	  };

	  Join.prototype.jobDone = function(resultIndex, result) {
	    this.results[resultIndex] = result;
	    this.resultsPending--;
	    if (this.resultsPending === 0) {
	      return this.onJoin(this.results);
	    }
	  };

	  return Join;

	})(BaseObject);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, CallStack, Log, ShallowClone, String, Types, Unique, callStack, capitalize, decapitalize, extendClone, functionName, isFunction, isPlainObject, log, nextUniqueObjectId, objectName,
	  slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	CallStack = __webpack_require__(19);

	Log = __webpack_require__(16);

	Types = __webpack_require__(21);

	Unique = __webpack_require__(22);

	String = __webpack_require__(23);

	ShallowClone = __webpack_require__(26);

	capitalize = String.capitalize, decapitalize = String.decapitalize;

	log = Log.log;

	callStack = CallStack.callStack;

	extendClone = ShallowClone.extendClone;

	isFunction = Types.isFunction, objectName = Types.objectName, isPlainObject = Types.isPlainObject, functionName = Types.functionName;

	nextUniqueObjectId = Unique.nextUniqueObjectId;

	module.exports = BaseObject = (function() {
	  var addGetter, addGetters, addSetter, addSetters, defProperties, defProperty, excludedKeys, mixInto, propGetterName, propInternalName, propSetterName;

	  BaseObject.objectsCreated = 0;

	  BaseObject.objectsCreatedByType = {};

	  BaseObject.resetStats = function() {
	    BaseObject.objectsCreated = 0;
	    return BaseObject.objectsCreatedByType = {};
	  };

	  BaseObject.inspect = function() {
	    return this.getClassPathName();
	  };


	  /*
	  TODO: consolidated on one inspector system
	  NOTE: "inspector" parameter is part of the old inspect system
	    The purpose was to resolve recurson on recursive structures.
	    But it ended up being ungainly most the time.
	   */

	  BaseObject.createWithPostCreate = function(klass) {
	    return (klass != null ? klass.postCreate() : void 0) || klass;
	  };

	  BaseObject.postCreate = function() {
	    return this;
	  };

	  excludedKeys = ["__super__", "namespace", "namespacePath"].concat(Object.keys(Neptune.Base));

	  BaseObject.mixInto = mixInto = function() {
	    var i, intoClass, k, keys, klass, len, v;
	    intoClass = arguments[0], klass = arguments[1], keys = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	    if (keys.length === 0) {
	      keys = Object.keys(klass);
	    }
	    for (i = 0, len = keys.length; i < len; i++) {
	      k = keys[i];
	      if (!(indexOf.call(excludedKeys, k) < 0)) {
	        continue;
	      }
	      v = klass[k];
	      if (intoClass[k]) {
	        console.error("Foundation.mixInto - mix " + klass.name + " into " + intoClass.name + ": " + k + " already exists.");
	      }
	      intoClass[k] = v;
	    }
	    return intoClass;
	  };

	  BaseObject.createAllClass = function() {
	    var All, arg, args, i, len, namespace;
	    namespace = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    for (i = 0, len = args.length; i < len; i++) {
	      arg = args[i];
	      if (arg.prototype instanceof BaseObject) {
	        console.error("createAllClass arguments cannot be subclasses of BaseObject: " + namespace.name + ":" + arg.name);
	      }
	      mixInto(namespace, arg);
	    }
	    return All = (function(superClass) {
	      extend(All, superClass);

	      function All() {
	        return All.__super__.constructor.apply(this, arguments);
	      }

	      return All;

	    })(namespace);
	  };

	  function BaseObject() {
	    this.__uniqueId = null;
	  }

	  BaseObject.implementsInterface = function(object, methods) {
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
	   */

	  BaseObject.include = function(obj) {
	    var key, ref, value;
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

	  BaseObject.getPrototypePropertyExtendedByInheritance = function(propertyName, defaultStructure) {
	    if (this.prototype.hasOwnProperty(propertyName)) {
	      return this.prototype[propertyName];
	    } else {
	      return this.prototype[propertyName] = extendClone(this.__super__[propertyName] || defaultStructure);
	    }
	  };

	  BaseObject._propInternalName = propInternalName = function(prop) {
	    return "_" + prop;
	  };

	  BaseObject._propGetterName = propGetterName = function(prop) {
	    return "get" + capitalize(prop);
	  };

	  BaseObject._propSetterName = propSetterName = function(prop) {
	    return "set" + capitalize(prop);
	  };

	  BaseObject._addGetter = addGetter = function(obj, prop, getter) {
	    obj[propGetterName(prop)] = getter;
	    Object.defineProperty(obj, prop, {
	      get: getter,
	      configurable: true
	    });
	    return prop;
	  };

	  BaseObject._addGetters = addGetters = function(obj, a, b) {
	    var getter, map, prop;
	    if (isPlainObject(map = a)) {
	      for (prop in map) {
	        getter = map[prop];
	        addGetter(obj, prop, getter);
	      }
	      return map;
	    } else {
	      return addGetter(obj, a, b);
	    }
	  };

	  BaseObject._addSetter = addSetter = function(obj, prop, setter) {
	    obj[propSetterName(prop)] = setter;
	    Object.defineProperty(obj, prop, {
	      set: setter,
	      configurable: true
	    });
	    return prop;
	  };

	  BaseObject._addSetters = addSetters = function(obj, a, b) {
	    var map, prop, setter;
	    if (isPlainObject(map = a)) {
	      for (prop in map) {
	        setter = map[prop];
	        addSetter(obj, prop, setter);
	      }
	      return map;
	    } else {
	      return addSetter(obj, a, b);
	    }
	  };

	  BaseObject._defProperty = defProperty = function(obj, prop, defineGetter, defineSetter, initializer) {
	    var propName;
	    propName = propInternalName(prop);
	    if (defineGetter) {
	      addGetter(obj, prop, obj[propGetterName(prop)] = isFunction(initializer) ? function() {
	        if (this[propName] != null) {
	          return this[propName];
	        } else {
	          return this[propName] = initializer();
	        }
	      } : initializer ? function() {
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

	  BaseObject._defProperties = defProperties = function(obj, props, defineGetter, defineSetter) {
	    var i, initializer, len, prop, propMap, results;
	    results = [];
	    for (i = 0, len = props.length; i < len; i++) {
	      prop = props[i];
	      if (isPlainObject(propMap = prop)) {
	        results.push((function() {
	          var results1;
	          results1 = [];
	          for (prop in propMap) {
	            initializer = propMap[prop];
	            results1.push(defProperty(obj, prop, defineGetter, defineSetter, initializer));
	          }
	          return results1;
	        })());
	      } else {
	        results.push(defProperty(obj, prop, defineGetter, defineSetter, null));
	      }
	    }
	    return results;
	  };

	  BaseObject.property = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, true, true);
	  };

	  BaseObject.propGetter = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, true, false);
	  };

	  BaseObject.propSetter = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, false, true);
	  };

	  BaseObject.getter = function(a, b) {
	    return addGetters(this.prototype, a, b);
	  };

	  BaseObject.setter = function(a, b) {
	    return addSetters(this.prototype, a, b);
	  };

	  BaseObject.classGetter = function(a, b) {
	    return addGetters(this, a, b);
	  };

	  BaseObject.classSetter = function(a, b) {
	    return addSetters(this, a, b);
	  };

	  BaseObject.classProperty = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, true, true);
	  };

	  BaseObject.classPropGetter = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, true, false);
	  };

	  BaseObject.classPropSetter = function() {
	    var props;
	    props = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return defProperties(this.prototype, props, false, true);
	  };

	  BaseObject.classGetter({
	    classPath: function() {
	      return this.namespace.namespacePath;
	    },
	    classPathArray: function() {
	      return this.namespacePathArray || (this.namespacePathArray = this.getClassPath().split("."));
	    },
	    classPathName: function() {
	      var p, ref;
	      if (p = (ref = this.namespace) != null ? ref.namespacePath : void 0) {
	        return p + "." + this.name;
	      } else {
	        return this.name;
	      }
	    },
	    className: function() {
	      return this.prototype.constructor.name;
	    }
	  });


	  /*
	  creates the classGetter "singleton" which returns a single instance of the current class.
	  
	  IN: args are passed to the singleton constructor
	  OUT: null
	  
	  The singleton instance is created on demand the first time it is accessed.
	   */

	  BaseObject.singletonClass = function() {
	    var args, map;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    map = {
	      singleton: (function(_this) {
	        return function() {
	          return _this._singleton || (_this._singleton = (function(func, args, ctor) {
	            ctor.prototype = func.prototype;
	            var child = new ctor, result = func.apply(child, args);
	            return Object(result) === result ? result : child;
	          })(_this, args, function(){}));
	        };
	      })(this)
	    };
	    map[decapitalize(functionName(this))] = (function(_this) {
	      return function() {
	        return _this.getSingleton();
	      };
	    })(this);
	    this.classGetter(map);
	    return null;
	  };

	  BaseObject.getter({
	    className: function() {
	      return this["class"].name;
	    },
	    "class": function() {
	      return this.constructor;
	    },
	    keys: function() {
	      return Object.keys(this);
	    },
	    classPathArray: function() {
	      return this["class"].getClassPathArray();
	    },
	    classPath: function() {
	      return this["class"].getClassPath();
	    },
	    classPathName: function() {
	      return this["class"].getClassPathName();
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

	  BaseObject.prototype.implementsInterface = function(methods) {
	    return Function.BaseObject.implementsInterface(this, methods);
	  };

	  BaseObject.prototype.tap = function(f) {
	    f(this);
	    return this;
	  };

	  BaseObject.rawLog = function() {
	    return Log.rawLog.apply(Log, arguments);
	  };

	  BaseObject.log = function() {
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
	    Log.logCore(toLog, stack, this.className);
	    return arguments[arguments.length - 1];
	  };

	  BaseObject.prototype.log = BaseObject.log;

	  BaseObject.prototype.rawLog = BaseObject.rawLog;

	  return BaseObject;

	})();


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var CallStack, Parse, parseURL;

	Parse = __webpack_require__(20);

	parseURL = Parse.url;

	module.exports = CallStack = (function() {
	  var CallStackLine;

	  function CallStack() {}

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
	        url = parseURL(this.source);
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
	    var e, error;
	    if (ignoreTop == null) {
	      ignoreTop = 0;
	    }
	    try {
	      throw new Error;
	    } catch (error) {
	      e = error;
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


/***/ },
/* 20 */
/***/ function(module, exports) {

	var Parse;

	module.exports = Parse = (function() {
	  function Parse() {}

	  Parse.query = function(qs) {
	    var i, j, key, len, obj, pair, ref, val;
	    if (qs == null) {
	      qs = self.location.search;
	    }
	    obj = {};
	    ref = qs.replace('?', '').split('&');
	    for (j = 0, len = ref.length; j < len; j++) {
	      pair = ref[j];
	      i = pair.indexOf('=');
	      key = pair.slice(0, i);
	      val = pair.slice(i + 1);
	      if (key.length > 0) {
	        obj[key] = decodeURIComponent(val);
	      }
	    }
	    return obj;
	  };

	  Parse.url = function(url) {
	    var _, a, anchor, fileName, host, hostWithPort, m, password, path, pathName, port, protocol, query, username;
	    m = url.match(/(([A-Za-z]+):(\/\/)?)?(([\-;&=\+\$,\w]+)(:([\-;:&=\+\$,\w]+))?@)?([A-Za-z0-9\.\-]+)(:([0-9]+))?(\/[\+~%\/\.\w\-]*)?(\?([\-\+=&;%@\.\w,]*))?(\#([\.\!\/\\\w]*))?/);
	    if (!m) {
	      return void 0;
	    }
	    _ = m[0], _ = m[1], protocol = m[2], _ = m[3], _ = m[4], username = m[5], _ = m[6], password = m[7], host = m[8], _ = m[9], port = m[10], pathName = m[11], _ = m[12], query = m[13], _ = m[14], anchor = m[15];
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
	      query: query && Parse.query(query),
	      anchor: anchor
	    };
	  };

	  return Parse;

	})();


/***/ },
/* 21 */
/***/ function(module, exports) {

	
	/*
	Maybe we should just the API for array compatibility rather than specific types.
	  typeof obj == "object" &&
	    && isFunction obj.forEach
	    && isFunction obj.indexOf
	    && isNumber obj.length
	 */
	var Types, isArray;

	isArray = self.Uint8ClampedArray ? function(obj) {
	  return !!obj && (obj.constructor === Array || obj instanceof Uint8ClampedArray || obj instanceof Int8Array || obj instanceof Uint8Array || obj instanceof Int16Array || obj instanceof Uint16Array || obj instanceof Int32Array || obj instanceof Uint32Array || obj instanceof Float32Array || obj instanceof Float64Array);
	} : function(obj) {
	  return !!obj && (obj.constructor === Array || obj instanceof Int8Array || obj instanceof Uint8Array || obj instanceof Int16Array || obj instanceof Uint16Array || obj instanceof Int32Array || obj instanceof Uint32Array || obj instanceof Float32Array || obj instanceof Float64Array);
	};

	module.exports = Types = (function() {
	  var cloneObjectUpToKey, deepEach, deepMap, deepMapArray, deepMapObject, functionName, hasKeys, isClass, isFunction, isObject, isPlainArray, isPlainObject, isString, noopMapper, objectName;

	  function Types() {}

	  Types.isRegExp = function(obj) {
	    return obj instanceof RegExp;
	  };

	  Types.isNumber = function(obj) {
	    return typeof obj === "number";
	  };

	  Types.isArray = isArray;

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

	  Types.isClass = isClass = function(obj) {
	    return !!(typeof obj === "function" && ((typeof obj.__super__ === "object") || (obj.prototype && hasKeys(obj.prototype))));
	  };


	  /*
	  like RubyOnRails#present:
	    "An object is present if it's not blank."
	  
	  Examples:
	    "", undefined, null => false
	    0 => true
	  
	  If 'obj' has method: obj.present() => !!obj.present()
	   */

	  Types.present = function(obj) {
	    if (isFunction(obj != null ? obj.present : void 0)) {
	      return !!obj.present();
	    } else {
	      return obj !== "" && obj !== void 0 && obj !== null;
	    }
	  };

	  Types.isObject = isObject = function(obj) {
	    return !!obj && typeof obj === "object" && !isArray(obj);
	  };

	  Types.functionName = functionName = function(f) {
	    var matched;
	    return f.name || ((matched = ("" + f).match(/function ([a-zA-Z]+)\(/)) && matched[1]) || "function";
	  };

	  Types.objectName = objectName = function(obj) {
	    var a, name, ref;
	    if (!obj) {
	      return "" + obj;
	    } else if (a = typeof obj.getClassPathName === "function" ? obj.getClassPathName() : void 0) {
	      return a;
	    } else if (a = obj.classPathName) {
	      return a;
	    } else if (obj.constructor === Object) {
	      return "Object";
	    } else if (isFunction(obj)) {
	      return functionName(obj);
	    } else if (isString(name = (ref = obj.constructor) != null ? ref.name : void 0) && name.length > 0) {
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

	  Types.isPlainArray = isPlainArray = function(v) {
	    if (v) {
	      return v.constructor === Array;
	    } else {
	      return false;
	    }
	  };

	  Types.isPlainObject = isPlainObject = function(v) {
	    if (v) {
	      return v.constructor === Object;
	    } else {
	      return false;
	    }
	  };

	  Types.hasKeys = hasKeys = function(o) {
	    var k;
	    for (k in o) {
	      return true;
	    }
	    return false;
	  };

	  Types.deepEach = deepEach = function(v, f) {
	    var j, k, len, subV;
	    if (isPlainArray(v)) {
	      for (j = 0, len = v.length; j < len; j++) {
	        subV = v[j];
	        deepEach(subV, f);
	      }
	    } else if (isPlainObject(v)) {
	      for (k in v) {
	        subV = v[k];
	        deepEach(subV, f);
	      }
	    } else {
	      f(v);
	    }
	    return v;
	  };


	  /*
	  only creates a new array if the children changed
	   */

	  deepMapArray = function(array, mapper, options) {
	    var i, j, len, r, res, v;
	    res = null;
	    for (i = j = 0, len = array.length; j < len; i = ++j) {
	      v = array[i];
	      r = deepMap(v, mapper, options);
	      if (r !== v) {
	        res || (res = array.slice());
	        res[i] = r;
	      }
	    }
	    return res || array;
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
	    var k, r, res, v;
	    res = null;
	    for (k in obj) {
	      v = obj[k];
	      r = deepMap(v, mapper, options);
	      if (r !== v || res) {
	        res || (res = cloneObjectUpToKey(obj, k));
	        res[k] = r;
	      }
	    }
	    return res || obj;
	  };


	  /*
	  Applies "f" to every -value- in a nested structure of plain arrays and objects.
	  Pure functional efficient:
	    If an array or object, and all its sub values, didn't change, the original array/object is reused.
	   */

	  noopMapper = function(v) {
	    return v;
	  };

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
	      if (isObject(o) && !isPlainObject(o)) {
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

	  return Types;

	})();


/***/ },
/* 22 */
/***/ function(module, exports) {

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
	    if (typeof key === "object") {
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


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var FoundationMath, String, Types, escapedNonQuoteRegex, escapedQuoteRegex, floor, intRand, isArray, isNumber, isPlainObject, isString, jString;

	FoundationMath = __webpack_require__(24);

	Types = __webpack_require__(21);

	intRand = FoundationMath.intRand;

	isString = Types.isString, isNumber = Types.isNumber, isPlainObject = Types.isPlainObject, isArray = Types.isArray;

	jString = self.String;

	escapedQuoteRegex = /[\\]["]/;

	escapedNonQuoteRegex = /[\\][^"]/;

	floor = Math.floor;

	module.exports = String = (function() {
	  var consistentJsonStringify, escapeDoubleQuoteJavascriptString, escapeJavascriptString, pluralize, repeat;

	  function String() {}

	  String.randomString = function(length, chars) {
	    var charsLength, i, result;
	    if (length == null) {
	      length = 32;
	    }
	    if (chars == null) {
	      chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    }
	    result = '';
	    charsLength = chars.length;
	    return ((function() {
	      var j, ref, results;
	      results = [];
	      for (i = j = 0, ref = length; j < ref; i = j += 1) {
	        results.push(chars[intRand(charsLength)]);
	      }
	      return results;
	    })()).join('');
	  };

	  String.pluralize = pluralize = function(a, b, pluralForm) {
	    if (typeof a === "number") {
	      return a + " " + (a === 1 ? b : pluralForm || pluralize(b));
	    } else {
	      return a + "s";
	    }
	  };

	  String.replaceLast = function(str, find, replaceWith) {
	    var index;
	    index = str.lastIndexOf(find);
	    if (index >= 0) {
	      return str.substring(0, index) + replaceWith + str.substring(index + find.length);
	    } else {
	      return str.toString();
	    }
	  };

	  String.pad = function(str, length, padding) {
	    if (padding == null) {
	      padding = "0";
	    }
	    str = jString(str);
	    return Array(Math.max(length - str.length + 1, 0)).join(padding) + str;
	  };

	  String.capitalize = function(str) {
	    return str.charAt(0).toUpperCase() + str.slice(1);
	  };

	  String.decapitalize = function(str) {
	    return str.charAt(0).toLowerCase() + str.slice(1);
	  };

	  String.upperCamelCase = function(str) {
	    var capWords, word, words;
	    words = str.split('_');
	    capWords = (function() {
	      var j, len, results;
	      results = [];
	      for (j = 0, len = words.length; j < len; j++) {
	        word = words[j];
	        results.push(this.capitalize(word));
	      }
	      return results;
	    }).call(String);
	    return capWords.join("");
	  };

	  String.lowerCamelCase = function(str) {
	    var capWords, word, words;
	    words = str.split('_');
	    capWords = [words[0]].concat((function() {
	      var j, len, ref, results;
	      ref = words.slice(1, words.length);
	      results = [];
	      for (j = 0, len = ref.length; j < len; j++) {
	        word = ref[j];
	        results.push(this.capitalize(word));
	      }
	      return results;
	    }).call(String));
	    return capWords.join("");
	  };

	  String.snakeCase = function(str) {
	    var word;
	    return ((function() {
	      var j, len, ref, results;
	      ref = str.split(/(?=[A-Z])/);
	      results = [];
	      for (j = 0, len = ref.length; j < len; j++) {
	        word = ref[j];
	        results.push(word.toLowerCase());
	      }
	      return results;
	    })()).join("_");
	  };

	  String.escapeDoubleQuoteJavascriptString = escapeDoubleQuoteJavascriptString = function(str) {
	    var s;
	    s = jString(str).replace(/[\\"]/g, "\\$&").replace(/[\0\b\f\n\r\t\v\u2028\u2029]/g, function(x) {
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

	  String.escapeJavascriptString = escapeJavascriptString = function(str) {
	    return JSON.stringify(str);
	  };

	  String.allIndexes = function(str, regex) {
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

	  String.repeat = repeat = " ".repeat ? function(str, times) {
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

	  String.rightAlign = function(str, width) {
	    if (str.length >= width) {
	      return str;
	    } else {
	      return repeat(" ", width - str.length) + str;
	    }
	  };

	  String.eachMatch = function(str, regex, f) {
	    var result;
	    regex.lastIndex = 0;
	    while (result = regex.exec(str)) {
	      f(result);
	    }
	    return null;
	  };

	  String.consistentJsonStringify = consistentJsonStringify = function(object) {
	    var error, k, v;
	    if (object === false || object === true || object === null || isNumber(object)) {
	      return "" + object;
	    } else if (isString(object)) {
	      return escapeJavascriptString(object);
	    } else if (isPlainObject(object)) {
	      return "{" + ((function() {
	        var j, len, ref, results;
	        ref = (Object.keys(object)).sort();
	        results = [];
	        for (j = 0, len = ref.length; j < len; j++) {
	          k = ref[j];
	          if (object[k] !== void 0) {
	            results.push(escapeJavascriptString(k) + ": " + consistentJsonStringify(object[k]));
	          }
	        }
	        return results;
	      })()).join(', ') + "}";
	    } else if (isArray(object)) {
	      return "[" + ((function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = object.length; j < len; j++) {
	          v = object[j];
	          results.push(consistentJsonStringify(v));
	        }
	        return results;
	      })()).join(', ') + "]";
	    } else {
	      console.error(error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object);
	      throw new Error(error);
	    }
	  };

	  String.splitRuns = function(str) {
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

	  String.eachRunAsCharCodes = function(str, f) {
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

	  String.humanFriendlyShorten = function(inputString, maxLength) {
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

	  return String;

	})();


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, Math, Regexp, abs, ceil, float32Precision, float64Precision, floor, inverseFloat64Precision, inverstFlaot32Precision, max, min, numberRegexp, pow, random, ref, round;

	Foundation = __webpack_require__(10);

	Regexp = __webpack_require__(25);

	numberRegexp = Regexp.numberRegexp;

	float64Precision = 0.0000000001;

	float32Precision = 0.0000001;

	inverseFloat64Precision = 1 / float64Precision;

	inverstFlaot32Precision = 1 / float32Precision;

	ref = self.Math, abs = ref.abs, min = ref.min, max = ref.max, ceil = ref.ceil, floor = ref.floor, round = ref.round, random = ref.random, pow = ref.pow;

	module.exports = Math = (function() {
	  var bound;

	  function Math() {}

	  Math.nearInfinity = pow(10, 100);

	  Math.nearInfinityResult = pow(10, 50);

	  Math.float32Precision = float32Precision;

	  Math.float64Precision = float64Precision;

	  Math.modulo = function(a, b) {
	    var r;
	    r = a % b;
	    if (r < 0) {
	      return r + b;
	    } else {
	      return r;
	    }
	  };

	  Math.stringToNumberArray = function(string) {
	    var a, i, j, len, match, v;
	    a = string.split(",");
	    for (i = j = 0, len = a.length; j < len; i = ++j) {
	      v = a[i];
	      match = v.match(numberRegexp);
	      a[i] = match != null ? match[0] - 0 : 0;
	    }
	    return a;
	  };

	  Math.minMagnitude = function(a, magnitude) {
	    if (a < 0) {
	      return min(a, -magnitude);
	    } else {
	      return max(a, magnitude);
	    }
	  };

	  Math.maxMagnitude = function(a, magnitude) {
	    return bound(-magnitude, a, magnitude);
	  };

	  Math.maxChange = function(newValue, oldValue, maxChangeV) {
	    return bound(oldValue - maxChangeV, newValue, oldValue + maxChangeV);
	  };

	  Math.bound = bound = function(a, b, c) {
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

	  Math.absGt = function(a, b) {
	    return abs(a) > abs(b);
	  };

	  Math.absLt = function(a, b) {
	    return abs(a) < abs(b);
	  };

	  Math.absGte = function(a, b) {
	    return abs(a) >= abs(b);
	  };

	  Math.absLte = function(a, b) {
	    return abs(a) <= abs(b);
	  };

	  Math.abs = abs;

	  Math.min = min;

	  Math.max = max;

	  Math.round = round;

	  Math.ceil = function(v, m) {
	    if (m == null) {
	      m = 1;
	    }
	    return ceil(v / m) * m;
	  };

	  Math.floor = function(v, m) {
	    if (m == null) {
	      m = 1;
	    }
	    return floor(v / m) * m;
	  };

	  Math.round = function(v, m) {
	    if (m == null) {
	      m = 1;
	    }
	    return round(v / m) * m;
	  };

	  Math.simplifyNum = function(num) {
	    return round(num * inverseFloat64Precision) * float64Precision;
	  };

	  Math.floatEq = function(n1, n2) {
	    return n1 === n2 || float64Precision > abs(n1 - n2);
	  };

	  Math.float32Eq = function(n1, n2) {
	    return n1 === n2 || float32Precision > abs(n1 - n2);
	  };

	  Math.floatEq0 = function(n1) {
	    return n1 === 0 || float64Precision > abs(n1);
	  };

	  Math.float32Eq0 = function(n1) {
	    return n1 === 0 || float32Precision > abs(n1);
	  };

	  Math.random = random;

	  Math.intRand = function(max) {
	    return random() * max | 0;
	  };

	  Math.iPart = function(v) {
	    return v - (v % 1);
	  };

	  Math.fPart = function(v) {
	    return v % 1;
	  };

	  Math.commaize = function(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  };

	  Math.cyclingSequenceFunction = function(sequence) {
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

	  return Math;

	})();


/***/ },
/* 25 */
/***/ function(module, exports) {

	var Regexp;

	module.exports = Regexp = (function() {
	  var urlQueryRegexp;

	  function Regexp() {}

	  Regexp.findUrlProtocolRegexp = /[\w-]+:\/\//;

	  Regexp.findDomainRegexp = /[\w]+(?:-[\w]+)*(?:\.[\w]+(?:-[\w]+)*)*(?:\.[a-z]{2,20})?/;

	  urlQueryRegexp = '(?:[-=+*._\\w]|%[a-f\\d]{2})*';

	  Regexp.findUrlPathRegexp = /(?:\/~?(?:[-+*._\w]|%[a-f\d]{2})*)*/;

	  Regexp.findUrlPortRegexp = /\:(\d+)/;

	  Regexp.emailRegexp = RegExp("^([_\\w-]+(?:\\.[_\\w]+)*)@(" + Regexp.findDomainRegexp.source + ")$", "i");

	  Regexp.numberRegexp = /([-]?\.[0-9]+)|([-]?[0-9]+(\.[0-9]+)?)/;

	  Regexp.urlProtocolRegexp = RegExp("^" + Regexp.findUrlProtocolRegexp.source + "$", "i");

	  Regexp.domainRegexp = RegExp("^" + Regexp.findDomainRegexp.source + "$", "i");

	  Regexp.urlPathRegexp = RegExp("^" + Regexp.findUrlPathRegexp.source + "$", "i");

	  Regexp.urlQueryRegexp = RegExp("^" + urlQueryRegexp + "$", "i");

	  Regexp.isoDateRegexp = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

	  Regexp.hex16ColorRegex = /^#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?$/i;

	  Regexp.hex256ColorRegex = /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?$/i;

	  Regexp.rgbColorRegex = /rgb *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *\)/;

	  Regexp.rgbaColorRegex = /rgba *\( *(\d+%?) *, *(\d+%?) *, *(\d+%?) *, *(\d*\.?\d*)\)/;

	  Regexp.colorRegex = new RegExp("(" + Regexp.hex16ColorRegex.source + ")|(" + Regexp.hex256ColorRegex.source + ")|(" + Regexp.rgbColorRegex.source + ")|(" + Regexp.rgbaColorRegex.source + ")");

	  Regexp.findUrlRegexp = RegExp("(" + Regexp.findUrlProtocolRegexp.source + ")(" + Regexp.findDomainRegexp.source + ")(?:" + Regexp.findUrlPortRegexp.source + ")?(" + Regexp.findUrlPathRegexp.source + ")?(?:\\?(" + urlQueryRegexp + "))?", "i");

	  Regexp.findSourceReferenceUrlRegexp = RegExp("(" + Regexp.findUrlProtocolRegexp.source + ")(" + Regexp.findDomainRegexp.source + ")?(?:" + Regexp.findUrlPortRegexp.source + ")?(" + Regexp.findUrlPathRegexp.source + ")?(?:\\?(" + urlQueryRegexp + "))?(?:\\:(\\d+))?(?:\\:(\\d+))?", "i");

	  Regexp.urlRegexp = RegExp("^" + Regexp.findUrlRegexp.source + "$", "i");

	  return Regexp;

	})();


/***/ },
/* 26 */
/***/ function(module, exports) {

	
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


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Basic, Sequence, nextTick,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	Basic = __webpack_require__(15);

	nextTick = Basic.nextTick;

	console.log("Foundation.Async.Sequence is depricated. Use Promises.");

	module.exports = Sequence = (function(superClass) {
	  extend(Sequence, superClass);

	  function Sequence() {
	    Sequence.__super__.constructor.apply(this, arguments);
	    this.toExecute = [];
	    this.resultIndex = 0;
	    this.results = [];
	    this.nextQueued = false;
	  }

	  Sequence.prototype["do"] = function() {
	    var f, j, len;
	    for (j = 0, len = arguments.length; j < len; j++) {
	      f = arguments[j];
	      if (f.length > 0) {
	        this.addAsyncFunction(f);
	      } else {
	        this.addSyncFunction(f);
	      }
	    }
	    return this.executeNext();
	  };

	  Sequence.prototype.join = function(f) {
	    var j, len;
	    for (j = 0, len = arguments.length; j < len; j++) {
	      f = arguments[j];
	      if (f.length > 0) {
	        this.addAsyncJoinFunction(f);
	      } else {
	        this.addJoinFunction(f);
	      }
	    }
	    return this.executeNext();
	  };

	  Sequence.prototype.addAsyncFunction = function(f) {
	    var i;
	    i = this.resultIndex++;
	    return this.toExecute.push((function(_this) {
	      return function() {
	        return f(function(result) {
	          _this.results[i] = result;
	          _this.executeNext();
	          return result;
	        });
	      };
	    })(this));
	  };

	  Sequence.prototype.addSyncFunction = function(f) {
	    var i;
	    i = this.resultIndex++;
	    return this.toExecute.push((function(_this) {
	      return function() {
	        _this.results[i] = f();
	        return _this.executeNext();
	      };
	    })(this));
	  };

	  Sequence.prototype.addJoinFunction = function(f) {
	    return this.toExecute.push((function(_this) {
	      return function() {
	        f(_this.results);
	        return _this.executeNext();
	      };
	    })(this));
	  };

	  Sequence.prototype.addAsyncJoinFunction = function(f) {
	    return this.toExecute.push((function(_this) {
	      return function() {
	        return f(_this.results, function() {
	          return _this.executeNext();
	        });
	      };
	    })(this));
	  };

	  Sequence.prototype.executeNext = function() {
	    if (this.nextQueued) {
	      return;
	    }
	    this.nextQueued = true;
	    return nextTick((function(_this) {
	      return function() {
	        var next;
	        _this.nextQueued = false;
	        if (_this.toExecute.length > 0) {
	          next = _this.toExecute[0];
	          _this.toExecute = _this.toExecute.slice(1);
	          return next();
	        }
	      };
	    })(this));
	  };

	  return Sequence;

	})(BaseObject);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Binary;

	module.exports = Binary = __webpack_require__(29);

	Binary.EncodedImage = __webpack_require__(30);

	Binary.RestClient = __webpack_require__(43);

	Binary.Stream = __webpack_require__(46);

	Binary.String = __webpack_require__(44);

	Binary.Utf8 = __webpack_require__(45);

	Binary.finishLoad(["EncodedImage", "RestClient", "Stream", "String", "Utf8"]);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(10);

	module.exports = Foundation.Binary || (Foundation.Binary = (function(superClass) {
	  extend(Binary, superClass);

	  function Binary() {
	    return Binary.__super__.constructor.apply(this, arguments);
	  }

	  Binary.namespace = Foundation;

	  Binary.namespacePath = "Neptune.Art.Foundation.Binary";

	  return Binary;

	})(Neptune.Base));

	Foundation.addNamespace(Foundation.Binary);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var EncodedImage, Inspect, Log, RestClient, binary, inspect, log;

	Inspect = __webpack_require__(31);

	Log = __webpack_require__(16);

	RestClient = __webpack_require__(43);

	binary = __webpack_require__(44).binary;

	inspect = Inspect.inspect;

	log = Log.log;

	module.exports = EncodedImage = (function() {
	  function EncodedImage() {}

	  EncodedImage.get = function(url, callBack, errorBack) {
	    var image;
	    if (errorBack == null) {
	      errorBack = null;
	    }
	    image = new Image;

	    /*
	    NOTE: This crossOrigin setting makes file:// urls not work with WkWebKit
	    image.crossOrigin = "Anonymous"
	    
	    Odly, everything currently seems to work without it. I thought it was required to request
	    remote images. I'm leaving it commented out here in case we have future problems. It is
	    possible we could included it only if the url is not a file:// url.
	     */
	    image.onload = function() {
	      return callBack(image);
	    };
	    image.onerror = function(e) {
	      self.encodedImageErrorEvent = e;
	      console.log("EncodedImage.get error START");
	      console.log("self.encodedImageErrorEvent = e");
	      console.log(e);
	      console.log(e.currentTarget);
	      console.log(e.target);
	      console.log(image);
	      console.log("image status");
	      console.log(image.status);
	      console.log("EncodedImage.get error END");
	      return errorBack(e);
	    };
	    return image.src = url;
	  };

	  EncodedImage.toDataURI = function(data, callBack, errorBack) {
	    var dataURI, reader;
	    if (data instanceof self.File) {
	      reader = new FileReader;
	      reader.readAsDataURL(data);
	      reader.onerror = errorBack;
	      reader.onload = (function(_this) {
	        return function(e) {
	          var dataURI;
	          dataURI = e.target.result;
	          return _this.toDataURI(dataURI, callBack, errorBack);
	        };
	      })(this);
	      return;
	    }
	    dataURI = (function() {
	      if ((typeof data) === "string" && data.slice(0, 5) === "data:") {
	        return data;
	      } else {
	        if (!data) {
	          throw new Error("data must be set");
	        }
	        return "data:image/png;base64," + binary(data).toBase64();
	      }
	    })();
	    errorBack || (errorBack = function(error) {
	      return log("WARNING - Image loading failed. Error was not handled.\nbuffer: " + (inspect(data)));
	    });
	    return callBack(dataURI);
	  };

	  EncodedImage.toImage = function(data, callBack, errorBack) {
	    return this.toDataURI(data, function(dataURI) {
	      var image;
	      image = new Image;
	      image.src = dataURI;
	      image.onload = function() {
	        return callBack(image, dataURI);
	      };
	      return image.onerror = errorBack;
	    }, errorBack);
	  };

	  return EncodedImage;

	})();


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect;

	module.exports = Inspect = __webpack_require__(32);

	Inspect.Inspected = __webpack_require__(33);

	Inspect.Inspector = __webpack_require__(39);

	Inspect.Inspector2 = __webpack_require__(41);

	Inspect.Main = __webpack_require__(42);

	Inspect.finishLoad(["Inspector", "Inspector2", "Main"]);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(10);

	module.exports = Foundation.Inspect || (Foundation.Inspect = (function(superClass) {
	  extend(Inspect, superClass);

	  function Inspect() {
	    return Inspect.__super__.constructor.apply(this, arguments);
	  }

	  Inspect.namespace = Foundation;

	  Inspect.namespacePath = "Neptune.Art.Foundation.Inspect";

	  return Inspect;

	})(Neptune.Base));

	Foundation.addNamespace(Foundation.Inspect);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var Inspected;

	module.exports = Inspected = __webpack_require__(34);

	Inspected.Array = __webpack_require__(35);

	Inspected.Core = __webpack_require__(36);

	Inspected.Object = __webpack_require__(37);

	Inspected.String = __webpack_require__(38);

	Inspected.finishLoad(["Array", "Core", "Object", "String"]);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Inspect,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Inspect = __webpack_require__(32);

	module.exports = Inspect.Inspected || (Inspect.Inspected = (function(superClass) {
	  extend(Inspected, superClass);

	  function Inspected() {
	    return Inspected.__super__.constructor.apply(this, arguments);
	  }

	  Inspected.namespace = Inspect;

	  Inspected.namespacePath = "Neptune.Art.Foundation.Inspect.Inspected";

	  return Inspected;

	})(Neptune.Base));

	Inspect.addNamespace(Inspect.Inspected);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Array, BaseObject,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

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

	})(BaseObject);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Core,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

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

	})(BaseObject);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Object,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

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

	})(BaseObject);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Foundation, String,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	Foundation = __webpack_require__(10);

	module.exports = String = (function(superClass) {
	  extend(String, superClass);

	  function String(clonedString) {
	    String.__super__.constructor.apply(this, arguments);
	    this.string = clonedString;
	  }

	  String.prototype.toString = function() {
	    return Foundation.String.escapeJavascriptString(this.string);
	  };

	  return String;

	})(BaseObject);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Inspect, Inspector, Map, StringExtensions, Types, escapeJavascriptString, isArray, isBrowserObject, isClass, isFunction, isObject, isString, objectName,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	Types = __webpack_require__(21);

	StringExtensions = __webpack_require__(23);

	Map = __webpack_require__(40);

	Inspect = __webpack_require__(32);

	escapeJavascriptString = StringExtensions.escapeJavascriptString;

	isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject, isClass = Types.isClass, objectName = Types.objectName, isBrowserObject = Types.isBrowserObject;

	module.exports = Inspector = (function(superClass) {
	  extend(Inspector, superClass);

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
	    this.maxLength = options.maxLength || 1000;
	    this.allowCustomInspectors = !options.noCustomInspectors;
	    this.maxDepth = options.maxDepth != null ? options.maxDepth : 10;
	    this.outArray = [];
	    this.length = 0;
	    this.depth = 0;
	    this.inspectingMap = new Map;
	    this.done = false;
	  }

	  Inspector.prototype.put = function(s) {
	    if (this.done) {
	      return;
	    }
	    this.outArray.push(this.length + s.length > this.maxLength ? (this.done = true, "...") : (this.length += s.length, s));
	    return s;
	  };

	  Inspector.getter({
	    result: function() {
	      return this.outArray.join("");
	    }
	  });

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
	      return obj.inspect(this);
	    } else if (isObject(obj) || isFunction(obj)) {
	      return this.inspectObject(obj);
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

	})(BaseObject);


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	Map is a Key-Value map which preserves order.

	Unlike Javascript objects, you can use any object or value as keys. This includes:

	  Strings
	  Numbers
	  null
	  undefined
	  Arrays
	  Objects

	Arrays and Objects are assigned a unique id using the Foundation.Unique library.
	"0", "", null, undefined and 0 are all different unique keys and can each have unique values.
	 */
	var BaseObject, Foundation, Map, Node, Unique,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(10);

	Unique = __webpack_require__(22);

	BaseObject = __webpack_require__(18);

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

	module.exports = Map = (function(superClass) {
	  extend(Map, superClass);

	  Map.inverseMap = function(array) {
	    var i, k, len, result, v;
	    result = new Map;
	    for (k = i = 0, len = array.length; i < len; k = ++i) {
	      v = array[k];
	      result.set(v, k);
	    }
	    return result;
	  };

	  function Map() {
	    this._length = 0;
	    this._map = {};
	    this._first = this._last = null;
	  }

	  Map.getter({
	    length: function() {
	      return this._length;
	    },
	    nodes: function() {
	      var n, result;
	      result = [];
	      n = this._first;
	      while (n) {
	        result.push(n);
	        n = n.next;
	      }
	      return result;
	    },
	    keys: function() {
	      var i, len, node, ref, results;
	      ref = this.nodes;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        node = ref[i];
	        results.push(node.key);
	      }
	      return results;
	    },
	    values: function() {
	      var i, len, node, ref, results;
	      ref = this.nodes;
	      results = [];
	      for (i = 0, len = ref.length; i < len; i++) {
	        node = ref[i];
	        results.push(node.value);
	      }
	      return results;
	    }
	  });

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
	    return value;
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

	  Map.prototype.remove = function(key) {
	    var n;
	    if (n = this._remove(key)) {
	      return n.value;
	    } else {
	      return void 0;
	    }
	  };

	  Map.prototype["delete"] = function(key) {
	    return !!this._remove(key);
	  };

	  Map.prototype.exists = function(key) {
	    return this._map[Unique.id(key)];
	  };

	  Map.prototype.forEach = function(f) {
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      f(node.value);
	    }
	    return this;
	  };

	  Map.prototype.findFirst = function(testF) {
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      if (testF(node.value)) {
	        return node.value;
	      }
	    }
	    return void 0;
	  };

	  Map.prototype.each = function(f) {
	    var i, len, node, ref;
	    ref = this.nodes;
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      f(node.key, node.value);
	    }
	    return this;
	  };

	  Map.prototype.map = function(f) {
	    var i, len, node, ref, results;
	    ref = this.nodes;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      node = ref[i];
	      results.push(f(node.key, node.value));
	    }
	    return results;
	  };

	  Map.prototype.inspect = function(inspector) {
	    var _inspect, first;
	    _inspect = function(o) {
	      if (typeof o === "string" && o.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
	        return inspector.put(o);
	      } else {
	        return inspector.inspect(o);
	      }
	    };
	    inspector.put("{Map ");
	    first = true;
	    this.map(function(k, v) {
	      if (!first) {
	        inspector.put(", ");
	      }
	      _inspect(k);
	      inspector.put(": ");
	      inspector.inspect(v);
	      return first = false;
	    });
	    return inspector.put("}");
	  };

	  Map.prototype.verifyNodes = function() {
	    var inspect, length, node, prev;
	    inspect = Foundation.Inspect.inspect;
	    if ((this._first == null) && (this._last == null) && this._length === 0) {
	      return;
	    }
	    if (this._length === 0 && this._first) {
	      throw new Error("length == " + this.length + " but @_first is not null");
	    }
	    if (this._length === 0 && this._last) {
	      throw new Error("length == " + this.length + " but @_last is not null");
	    }
	    if (!this._first) {
	      throw new Error("length == " + this.length + " and @_first is null");
	    }
	    if (!this._last) {
	      throw new Error("length == " + this.length + " and @_last is null");
	    }
	    if (this._first.prev) {
	      throw new Error("@_first has prev");
	    }
	    if (this._last.next) {
	      throw new Error("@_last has next");
	    }
	    length = 0;
	    prev = null;
	    node = this._first;
	    while (node) {
	      length++;
	      if (node.prev !== prev) {
	        throw new Error("node.prev != prev. " + (inspect({
	          lenght: length,
	          nodePrev: node.prev,
	          prev: prev
	        }, 1)));
	      }
	      prev = node;
	      node = node.next;
	    }
	    if (this.length !== length) {
	      throw new Error("@length is " + this.length + ", but it should be " + length);
	    }
	  };

	  return Map;

	})(BaseObject);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Inspected, Inspector2, Map, StringExtensions, Types, escapeJavascriptString, isArray, isBrowserObject, isClass, isDate, isFunction, isHTMLImageElement, isObject, isPlainObject, isRegExp, isString, objectName, parentString,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	Types = __webpack_require__(21);

	StringExtensions = __webpack_require__(23);

	Map = __webpack_require__(40);

	Inspected = __webpack_require__(33);

	escapeJavascriptString = StringExtensions.escapeJavascriptString;

	isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject, isPlainObject = Types.isPlainObject, isClass = Types.isClass, isDate = Types.isDate, isRegExp = Types.isRegExp, objectName = Types.objectName, isBrowserObject = Types.isBrowserObject;

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
	    obj.toImage((function(_this) {
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
	      if (typeof obj.inspect2 === "function") {
	        res.inspected = obj.inspect2();
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
	    if (isFunction(obj != null ? obj.inspectStructure : void 0)) {
	      obj = obj.inspectStructure();
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

	})(BaseObject);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation, Inspect, Inspector, Types, customInspectable, inspect, inspectLean, isArray, isFunction, isObject, isString;

	Foundation = __webpack_require__(10);

	Inspect = __webpack_require__(32);

	Types = __webpack_require__(21);

	Inspector = __webpack_require__(39);

	isString = Types.isString, isArray = Types.isArray, isFunction = Types.isFunction, isObject = Types.isObject;

	customInspectable = (function(_this) {
	  return function(obj) {
	    return obj && obj.inspect2 && !(typeof obj === "function");
	  };
	})(this);

	Inspect.miniInspect = (function(_this) {
	  return function(obj) {
	    if (obj == null) {
	      return "" + obj;
	    } else if (customInspectable(obj)) {
	      return inspect(obj);
	    } else if (isString(obj)) {
	      return Foundation.String.escapeJavascriptString(obj);
	    } else if (isArray(obj)) {
	      return "<<Array length: " + obj.length + ">>";
	    } else if (isFunction(obj) && obj.name === "") {
	      return "<<function args: " + obj.length + ">>";
	    } else {
	      return ("<<" + (typeof obj) + ": ") + (obj.name ? obj.name : obj) + ">>";
	    }
	  };
	})(this);

	Inspect.inspectLean = inspectLean = (function(_this) {
	  return function(obj, options) {
	    var i, inspected, k, keys, last, v;
	    if (customInspectable(obj)) {
	      return obj.inspect2();
	    } else if (isObject(obj)) {
	      keys = Object.keys(obj);
	      last = keys.length - 1;
	      inspected = (function() {
	        var j, len, results;
	        results = [];
	        for (i = j = 0, len = keys.length; j < len; i = ++j) {
	          k = keys[i];
	          v = obj[k];
	          v = i === last ? inspectLean(v, options) : inspect(v, options);
	          if (!Inspector.unquotablePropertyRegex.test(k)) {
	            k = inspect(k);
	          }
	          results.push(k + ": " + v);
	        }
	        return results;
	      })();
	      return inspected.join(', ');
	    } else {
	      return inspect(obj, options);
	    }
	  };
	})(this);

	Inspect.inspect = inspect = (function(_this) {
	  return function(obj, options) {
	    var inspector;
	    if (options == null) {
	      options = {};
	    }
	    inspector = new Inspector(options);
	    inspector.inspect(obj);
	    return inspector.result;
	  };
	})(this);


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, RestClient, binary,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	binary = __webpack_require__(44).binary;

	BaseObject = __webpack_require__(18);

	module.exports = RestClient = (function(superClass) {
	  extend(RestClient, superClass);

	  function RestClient() {
	    return RestClient.__super__.constructor.apply(this, arguments);
	  }

	  RestClient.get = function(url, onSuccess, onError, onProgress) {
	    var request;
	    request = new XMLHttpRequest;
	    request.open("GET", url, true);
	    request.responseType = "arraybuffer";
	    request.onload = function(rawEvent) {
	      var arrayBuffer;
	      arrayBuffer = request.response;
	      if (arrayBuffer && arrayBuffer.byteLength > 0 && (request.status === 200 || request.status === 0)) {
	        return onSuccess(binary(arrayBuffer), url, request);
	      } else {
	        if (onError) {
	          return onError(rawEvent, url, request);
	        }
	      }
	    };
	    if (onProgress) {
	      request.onprogress = function(rawEvent) {
	        return onProgress(rawEvent, url, request);
	      };
	    }
	    if (onError) {
	      request.onerror = function(rawEvent) {
	        return onError(rawEvent, url, request);
	      };
	    }
	    return request.send(null);
	  };

	  RestClient.multipartPost = function(url, parts, onSuccess, onError, onProgress) {
	    var formData, k, request, v;
	    formData = new FormData;
	    for (k in parts) {
	      v = parts[k];
	      this.log({
	        k: k,
	        v: v
	      });
	      formData.append(k, v);
	    }
	    request = new XMLHttpRequest;
	    request.open("POST", url, true);
	    request.onload = function(rawEvent) {
	      if (request.status === 200) {
	        return onSuccess(request.response, url, request);
	      } else if (onError) {
	        return onError(rawEvent, url, parts, request);
	      }
	    };
	    if (onProgress) {
	      request.upload.onprogress = function(rawEvent) {
	        return onProgress(rawEvent, url, parts, request);
	      };
	    }
	    if (onError) {
	      request.onerror = (function(_this) {
	        return function(rawEvent) {
	          return onError(rawEvent, url, parts, request);
	        };
	      })(this);
	    }
	    return request.send(formData);
	  };

	  return RestClient;

	})(BaseObject);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, BinaryString, Types, Utf8, encodings, isFunction, isString;

	Binary = __webpack_require__(29);

	Utf8 = __webpack_require__(45);

	Types = __webpack_require__(21);

	isString = Types.isString, isFunction = Types.isFunction;

	encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	Binary.binary = function(arg) {
	  if (arg instanceof BinaryString) {
	    return arg;
	  } else {
	    return new BinaryString(arg);
	  }
	};

	module.exports = BinaryString = (function() {
	  BinaryString.binary = Binary.binary;

	  BinaryString.cloneUint8Array = function(srcU8A) {
	    var dstU8A;
	    dstU8A = new Uint8Array(new ArrayBuffer(src.length));
	    dstU8A.set(srcU8A);
	    return dstU8A;
	  };

	  function BinaryString(arg) {
	    this.bytes = (function() {
	      if (arg instanceof BinaryString) {
	        return BinaryString.cloneUint8Array(arg.bytes);
	      } else if (isFunction(arg.uint8Array)) {
	        return arg.uint8Array();
	      } else if (arg instanceof ArrayBuffer) {
	        return new Uint8Array(arg);
	      } else if (arg instanceof Uint8Array) {
	        return arg;
	      } else if (isString(arg)) {
	        return Utf8.toBuffer(arg);
	      } else {
	        throw new Error("invalid argument: " + arg);
	      }
	    })();
	    this.length = this.bytes.length;
	  }

	  BinaryString.fromBase64 = function(base64encoding) {
	    var byteString, i, j, len, ref, uInt8Array;
	    byteString = atob(base64encoding);
	    len = byteString.length;
	    uInt8Array = new Uint8Array(new ArrayBuffer(len));
	    for (i = j = 0, ref = len; j < ref; i = j += 1) {
	      uInt8Array[i] = byteString.charCodeAt(i);
	    }
	    return new BinaryString(uInt8Array);
	  };

	  BinaryString.prototype.toDataURI = function(callback) {
	    var blob, reader;
	    blob = new Blob([this.bytes]);
	    reader = new FileReader;
	    reader.readAsDataURL(blob);
	    return reader.onloadend = function() {
	      return callback(reader.result);
	    };
	  };

	  BinaryString.prototype.toBase64Callback = function(callback) {
	    return this.toDataURI(function(r) {
	      return callback(r.split(',')[1]);
	    });
	  };

	  BinaryString.fromDataURI = function(dataURI) {
	    var base64encoding, splitDataURI;
	    splitDataURI = dataURI.split(',');
	    base64encoding = splitDataURI[1];
	    return this.fromBase64(base64encoding);
	  };

	  BinaryString.prototype.toString = function() {
	    return Utf8.toString(this.bytes);
	  };

	  BinaryString.prototype.toBlob = function() {
	    return new Blob([this.bytes]);
	  };

	  BinaryString.prototype.toBase64 = function() {
	    return btoa(String.fromCharCode.apply(null, Array.prototype.slice.call(this.bytes)));
	  };

	  return BinaryString;

	})();


/***/ },
/* 45 */
/***/ function(module, exports) {

	var Utf8;

	module.exports = Utf8 = (function() {
	  function Utf8() {}

	  Utf8.toBuffer = function(string) {
	    return new Uint8Array(this.toArray(string));
	  };

	  Utf8.toArray = function(string) {
	    var char, i, results, uriEncoded;
	    uriEncoded = encodeURIComponent(string);
	    i = 0;
	    results = [];
	    while (i < uriEncoded.length) {
	      char = uriEncoded.charCodeAt(i++);
	      if (char === 0x25) {
	        i += 2;
	        results.push(parseInt(uriEncoded.substr(i - 2, 2), 16));
	      } else {
	        results.push(char);
	      }
	    }
	    return results;
	  };

	  Utf8.toString = function(a) {
	    var error, error1, x, y;
	    if (a === void 0) {
	      return "<undefined>";
	    }
	    if (a === null) {
	      return "<null>";
	    }
	    try {
	      if (a instanceof ArrayBuffer) {
	        a = new Uint8Array(a);
	      }
	      return decodeURIComponent(((function() {
	        var j, len, results;
	        results = [];
	        for (j = 0, len = a.length; j < len; j++) {
	          x = a[j];
	          y = x.toString(16);
	          if (y.length < 2) {
	            y = "0" + y;
	          }
	          results.push("%" + y);
	        }
	        return results;
	      })()).join(''));
	    } catch (error1) {
	      error = error1;
	      return "<" + a.length + " binary bytes>";
	    }
	  };

	  return Utf8;

	})();


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, Stream, binary;

	Binary = __webpack_require__(29);

	binary = __webpack_require__(44).binary;

	Binary.stream = function(arg) {
	  if (arg instanceof Binary.Stream) {
	    return arg;
	  } else if (arg instanceof ArrayBuffer) {
	    return Binary.Stream.from_array_buffer(arg);
	  } else if (arg instanceof Uint8Array) {
	    return new Binary.Stream(arg);
	  } else {
	    return new Binary.Stream(binary(arg).bytes);
	  }
	};

	Stream = (function() {
	  Stream.from_array_buffer = function(array_buffer) {
	    return new Binary.Stream(new Uint8Array(array_buffer, 0, array_buffer.byteLength));
	  };

	  function Stream(byte_view) {
	    this.byte_view = byte_view;
	    this.pos = 0;
	  }

	  Stream.prototype.read_byte = function() {
	    return this.byte_view[this.pos++];
	  };

	  Stream.prototype.read_asi = function() {
	    var debug, ret, shift, val;
	    debug = this.inspect();
	    ret = 0;
	    shift = 0;
	    val = 128;
	    while (val >= 128) {
	      val = this.read_byte();
	      ret += (val % 128) << shift;
	      shift += 7;
	    }
	    return ret;
	  };

	  Stream.prototype.uint8Array = function() {
	    return this.byte_view;
	  };

	  Stream.prototype.read = function(length) {
	    var begin, end;
	    begin = this.pos;
	    this.pos += length;
	    end = this.pos;
	    return new Binary.Stream(this.byte_view.subarray(begin, end));
	  };

	  Stream.prototype.inspect = function() {
	    return "{Binary.Stream pos=" + this.pos + " byteOffset=" + this.byte_view.byteOffset + " length=" + this.byte_view.length + "}";
	  };

	  Stream.prototype.read_asi_string = function() {
	    return this.read(this.read_asi());
	  };

	  Stream.prototype.done = function() {
	    return this.pos >= this.byte_view.length;
	  };

	  Stream.prototype.toString = function() {
	    return binary(this.byte_view).toString();
	  };

	  return Stream;

	})();


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var Browser;

	module.exports = Browser = __webpack_require__(48);

	Browser.Cookie = __webpack_require__(49);

	Browser.Dom = __webpack_require__(52);

	Browser.File = __webpack_require__(53);

	Browser.Parse = __webpack_require__(20);

	Browser.finishLoad(["Cookie", "Dom", "File", "Parse"]);


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Foundation,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Foundation = __webpack_require__(10);

	module.exports = Foundation.Browser || (Foundation.Browser = (function(superClass) {
	  extend(Browser, superClass);

	  function Browser() {
	    return Browser.__super__.constructor.apply(this, arguments);
	  }

	  Browser.namespace = Foundation;

	  Browser.namespacePath = "Neptune.Art.Foundation.Browser";

	  return Browser;

	})(Neptune.Base));

	Foundation.addNamespace(Foundation.Browser);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var $, BaseObject, Browser, log,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	Browser = __webpack_require__(48);

	log = __webpack_require__(16).log;

	BaseObject = __webpack_require__(18);

	$ = __webpack_require__(50);

	__webpack_require__(51);

	$.cookie.json = true;

	Browser.Cookie = (function(superClass) {
	  extend(Cookie, superClass);

	  function Cookie() {
	    return Cookie.__super__.constructor.apply(this, arguments);
	  }

	  Cookie.set = function(name, value, options) {
	    return $.cookie(name, value, options);
	  };

	  Cookie.get = function(name) {
	    return $.cookie(name);
	  };

	  Cookie.remove = function(name, options) {
	    return $.removeCookie(name, options);
	  };

	  Cookie.classGetter({
	    all: function() {
	      return $.cookie();
	    },
	    json: function() {
	      return $.cookie.json;
	    },
	    raw: function() {
	      return $.cookie.raw;
	    }
	  });

	  Cookie.classSetter({
	    json: function(v) {
	      return $.cookie.json = v;
	    },
	    raw: function(v) {
	      return $.cookie.raw = v;
	    }
	  });

	  return Cookie;

	})(BaseObject);


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-01-08T20:02Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];

	var document = window.document;

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		version = "2.2.0",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {

			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {

		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor();
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {

			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {

				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {

						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend( {

		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {

			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},

		isPlainObject: function( obj ) {

			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {

				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {

					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval

					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		each: function( obj, callback ) {
			var length, i = 0;

			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );

	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */

	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );

	function isArrayLike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",

		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,

			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;

		results = results || [];

		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {

			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;

			if ( documentIsHTML ) {

				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

					// ID selector
					if ( (m = match[1]) ) {

						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}

						// Element context
						} else {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {

								results.push( elem );
								return results;
							}
						}

					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;

					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {

						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}

				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;

					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {

						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}

						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );

						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}

					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );

		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );

			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return document;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {

											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {

								// Seek `elem` from a previously-cached index

								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}

								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {

										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {

											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});

												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});

												uniqueCache[ type ] = [ dirruns, diff ];
											}

											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}

				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;

				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {

			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};


	var siblings = function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	};


	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};

	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {

					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {

								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {

							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :

					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,

		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );

	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {

				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );



	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );

		var // Flag to know if list is currently firing
			firing,

			// Last fire value for non-forgettable lists
			memory,

			// Flag to know if list was already fired
			fired,

			// Flag to prevent firing
			locked,

			// Actual callback list
			list = [],

			// Queue of execution data for repeatable lists
			queue = [],

			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,

			// Fire callbacks
			fire = function() {

				// Enforce single-firing
				locked = options.once;

				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {

						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {

							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}

				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}

				firing = false;

				// Clean up if we're done firing for good
				if ( locked ) {

					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];

					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},

			// Actual Callbacks object
			self = {

				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {

						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}

						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );

						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},

				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );

							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},

				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},

				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},

				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},

				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},

				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},

				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},

				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend( {

		Deferred: function( func ) {
			var tuples = [

					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},

					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add( function() {

						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	} );


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {

		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend( {

		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {

				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {

		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};




	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;

	Data.prototype = {

		register: function( owner, initial ) {
			var value = initial || {};

			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;

			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}

			// Check if the owner object already has a cache
			var value = owner[ this.expando ];

			// If not, create one
			if ( !value ) {
				value = {};

				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {

					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;

					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}

			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {

				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;

			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}

			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];

			if ( cache === undefined ) {
				return;
			}

			if ( key === undefined ) {
				this.register( owner );

			} else {

				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {

					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );

					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;

				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}

			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();

	var dataUser = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :

						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}

				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );

	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );

					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}

			return access( this, function( value ) {
				var data, camelKey;

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {

					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||

						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );

					if ( data !== undefined ) {
						return data;
					}

					camelKey = jQuery.camelCase( key );

					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {

					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );


	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );

	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}

			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},

		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {

			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};



	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );

		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];

			// Make sure we update the tween properties later on
			valueParts = valueParts || [];

			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;

			do {

				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";

				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );

			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}

		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;

			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );

	var rtagName = ( /<([\w:-]+)/ );

	var rscriptType = ( /^$|\/(?:java|ecma)script/i );



	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;


	function getAll( context, tag ) {

		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}


	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}


	var rhtml = /<|&#?\w+;/;

	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {

			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	}


	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {

			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {

				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}

		if ( data == null && fn == null ) {

			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {

				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {

				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {

				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};

			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {

					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {

				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {

				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {

				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};

	jQuery.Event = function( src, props ) {

		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&

					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );

	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {

				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {

				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {

				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,

		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}

		return elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}

		return elem;
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			dataUser.set( dest, udataCur );
		}
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	function domManip( collection, args, callback, ignored ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}

		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {

							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( collection[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {

							if ( node.src ) {

								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return collection;
	}

	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;

		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}

			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}

		return elem;
	}

	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},

		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;

			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {

						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );

	jQuery.fn.extend( {

		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,

		detach: function( selector ) {
			return remove( this, selector, true );
		},

		remove: function( selector ) {
			return remove( this, selector );
		},

		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},

		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},

		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},

		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},

		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = jQuery.htmlPrefilter( value );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var ignored = [];

			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;

				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}

			// Force callback invocation
			}, ignored );
		}
	} );

	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	} );


	var iframe,
		elemdisplay = {

			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */

	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			display = jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = ( /^margin/ );

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {

			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;

			if ( !view.opener ) {
				view = window;
			}

			return view.getComputedStyle( elem );
		};

	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var documentElement = document.documentElement;



	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );

			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";

			documentElement.removeChild( container );
		}

		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {

				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {

				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =

					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );

				documentElement.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		} );
	} )();


	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?

			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {

		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {

					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}


	var

		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}

	function setPositiveNumber( elem, value, subtract ) {

		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?

			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?

			// If we already have the right measurement, avoid augmentation
			4 :

			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {

			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {

				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {

				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Support: IE11 only
		// In IE 11 fullscreen elements inside of an iframe have
		// 100x too small dimensions (gh-1764).
		if ( document.msFullscreenElement && window.top !== window ) {

			// Support: IE11 only
			// Running getBoundingClientRect on a disconnected node
			// in IE throws an error.
			if ( elem.getClientRects().length ) {
				val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
			}
		}

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {

			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {

				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend( {

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );

					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {

					style[ name ] = value;
				}

			} else {

				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );

	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);

				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {

					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}

				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );

	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );

	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );

				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {

				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;

	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always( function() {

				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;

				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {

				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ] );

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,

						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},

		prefilters: [ defaultPrefilter ],

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {

					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {

						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );

	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );

	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];

			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		window.clearInterval( timerId );

		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,

		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};


	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();


	var boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );

	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}

			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}

				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				elem.setAttribute( name, value + "" );
				return value;
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {

						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		}
	} );

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {

				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );




	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;

	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );

	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}

				return ( elem[ name ] = value );
			}

			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}

			return elem[ name ];
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {

					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );

					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},

		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );




	var rclass = /[\t\r\n\f]/g;

	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}

	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}

			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}

			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];

				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );

					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );

					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {

							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}

			return this.each( function() {
				var className, i, self, classNames;

				if ( type === "string" ) {

					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];

					while ( ( className = classNames[ i++ ] ) ) {

						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {

						// Store className if set
						dataPriv.set( this, "__className__", className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},

		hasClass: function( selector ) {
			var className, elem,
				i = 0;

			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}

			return false;
		}
	} );




	var rreturn = /\r/g;

	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?

						// Handle most common string cases
						ret.replace( rreturn, "" ) :

						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each( function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );

	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {

					// Support: IE<11
					// option.value not trimmed (#14858)
					return jQuery.trim( elem.value );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&

								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );

	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );




	// Return jQuery for attributes-only inclusion


	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

	jQuery.extend( jQuery.event, {

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf( "." ) > -1 ) {

				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		// Piggyback on a donor event to simulate a different one
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true

					// Previously, `originalEvent: {}` was set here, so stopPropagation call
					// would not be triggered on donor event, since in our own
					// jQuery.event.stopPropagation function we had a check for existence of
					// originalEvent.stopPropagation method, so, consequently it would be a noop.
					//
					// But now, this "simulate" function is used only for events
					// for which stopPropagation() is noop, so there is no need for that anymore.
					//
					// For the compat branch though, guard for "click" and "submit"
					// events is still used, but was moved to jQuery.event.stopPropagation function
					// because `originalEvent` should point to the original event for the constancy
					// with other events and for more focused logic
				}
			);

			jQuery.event.trigger( e, null, elem );

			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}

	} );

	jQuery.fn.extend( {

		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );


	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );

	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );




	support.focusin = "onfocusin" in window;


	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );

					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;

	var nonce = jQuery.now();

	var rquery = ( /\?/ );



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {

				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {

					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {

			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}

			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},

			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {

									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend( {

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,

				// URL without anti-cache param
				cacheURL,

				// Response headers
				responseHeadersString,
				responseHeaders,

				// timeout handle
				timeoutTimer,

				// Url cleanup var
				urlAnchor,

				// To know if global events are to be dispatched
				fireGlobals,

				// Loop variable
				i,

				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),

				// Callbacks context
				callbackContext = s.context || s,

				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),

				// Status-dependent callbacks
				statusCode = s.statusCode || {},

				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},

				// The jqXHR state
				state = 0,

				// Default abort message
				strAbort = "canceled",

				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {

									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {

								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );

				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;

					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {

					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}

				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}

				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {

					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );

					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {

					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {

			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,

			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};


	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map( function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				} ).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}

			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			} );
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},

		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );


	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {

		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {

			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {

					// Treat each array item as a scalar.
					add( prefix, v );

				} else {

					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {

			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {

			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {

				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );

		} else {

			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};

	var xhrSuccessStatus = {

			// File protocol always yields status code 0, assume 200
			0: 200,

			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();

					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {

									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(

											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,

										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );

					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {

							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {

								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}

					// Create the abort callback
					callback = callback( "abort" );

					try {

						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {

						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {

		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);

					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// Force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always( function() {

				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );

				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}

				// Save back as free
				if ( s[ callbackName ] ) {

					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			} );

			// Delegate to script
			return "script";
		}
	} );




	// Support: Safari 8+
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();


	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		context = context || ( support.createHTMLDocument ?
			document.implementation.createHTMLDocument( "" ) :
			document );

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}

		parsed = buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf( " " );

		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,

				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};




	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {

				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {

				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {

				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				// Subtract offsetParent scroll positions
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ) -
					offsetParent.scrollTop();
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true ) -
					offsetParent.scrollLeft();
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;

				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || documentElement;
			} );
		}
	} );

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );

	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );

					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {

			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {

						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?

						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );


	jQuery.fn.extend( {

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {

			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}



	var

		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}

	return jQuery;
	}));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery Cookie Plugin v1.4.1
	 * https://github.com/carhartl/jquery-cookie
	 *
	 * Copyright 2013 Klaus Hartl
	 * Released under the MIT license
	 */
	(function (factory) {
		if (true) {
			// AMD
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(50)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			// CommonJS
			factory(require('jquery'));
		} else {
			// Browser globals
			factory(jQuery);
		}
	}(function ($) {

		var pluses = /\+/g;

		function encode(s) {
			return config.raw ? s : encodeURIComponent(s);
		}

		function decode(s) {
			return config.raw ? s : decodeURIComponent(s);
		}

		function stringifyCookieValue(value) {
			return encode(config.json ? JSON.stringify(value) : String(value));
		}

		function parseCookieValue(s) {
			if (s.indexOf('"') === 0) {
				// This is a quoted cookie as according to RFC2068, unescape...
				s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}

			try {
				// Replace server-side written pluses with spaces.
				// If we can't decode the cookie, ignore it, it's unusable.
				// If we can't parse the cookie, ignore it, it's unusable.
				s = decodeURIComponent(s.replace(pluses, ' '));
				return config.json ? JSON.parse(s) : s;
			} catch(e) {}
		}

		function read(s, converter) {
			var value = config.raw ? s : parseCookieValue(s);
			return $.isFunction(converter) ? converter(value) : value;
		}

		var config = $.cookie = function (key, value, options) {

			// Write

			if (value !== undefined && !$.isFunction(value)) {
				options = $.extend({}, config.defaults, options);

				if (typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setTime(+t + days * 864e+5);
				}

				return (document.cookie = [
					encode(key), '=', stringifyCookieValue(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path    ? '; path=' + options.path : '',
					options.domain  ? '; domain=' + options.domain : '',
					options.secure  ? '; secure' : ''
				].join(''));
			}

			// Read

			var result = key ? undefined : {};

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			var cookies = document.cookie ? document.cookie.split('; ') : [];

			for (var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = parts.join('=');

				if (key && key === name) {
					// If second argument (value) is a function it's a converter...
					result = read(cookie, value);
					break;
				}

				// Prevent storing a cookie that we couldn't decode.
				if (!key && (cookie = read(cookie)) !== undefined) {
					result[name] = cookie;
				}
			}

			return result;
		};

		config.defaults = {};

		$.removeCookie = function (key, options) {
			if ($.cookie(key) === undefined) {
				return false;
			}

			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return !$.cookie(key);
		};

	}));


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var $, Dom;

	$ = __webpack_require__(50);

	module.exports = Dom = (function() {
	  function Dom() {}

	  Dom.getDevicePixelRatio = function() {
	    return ((self.devicePixelRatio != null) && self.devicePixelRatio) || 1;
	  };

	  Dom.zIndex = function(target, setZIndex) {
	    var elem, value;
	    target = $(target);
	    if (setZIndex !== void 0) {
	      return target.css("zIndex", setZIndex);
	    }
	    elem = $(target[0]);
	    while (elem.length && elem[0] !== document) {
	      switch (elem.css("position")) {
	        case "absolute":
	        case "relative":
	        case "fixed":
	          value = parseInt(elem.css("zIndex"));
	          if (!isNaN(value) && value !== 0) {
	            return value;
	          }
	      }
	      elem = elem.parent();
	    }
	    return 0;
	  };

	  Dom.domElementOffset = function(elem) {
	    var body, box, clientLeft, clientTop, docEl, left, scrollLeft, scrollTop, top;
	    box = elem.getBoundingClientRect();
	    body = document.body;
	    docEl = document.documentElement;
	    scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	    scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
	    clientTop = docEl.clientTop || body.clientTop || 0;
	    clientLeft = docEl.clientLeft || body.clientLeft || 0;
	    top = box.top + scrollTop - clientTop;
	    left = box.left + scrollLeft - clientLeft;
	    return {
	      top: Math.round(top),
	      left: Math.round(left)
	    };
	  };

	  return Dom;

	})();


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	var $, File;

	$ = __webpack_require__(50);

	module.exports = File = (function() {
	  function File() {}

	  File.request = function(options) {
	    var body, fileInput;
	    if (options == null) {
	      options = {};
	    }
	    if (this.hiddenDivForFileInput) {
	      this.hiddenDivForFileInput.detach();
	    }
	    this.hiddenDivForFileInput = $("<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>");
	    body = $("body");
	    fileInput = $("<input type='file' " + (options.accept ? 'accept=' + options.accept : void 0) + " " + (options.multiple ? 'multiple=true' : void 0) + "/>");
	    fileInput.appendTo(this.hiddenDivForFileInput);
	    this.hiddenDivForFileInput.appendTo(body);
	    fileInput.change(function(e) {
	      var file, fileList, fileSizes, fileTypes;
	      fileList = (function() {
	        var i, len, ref, results;
	        ref = fileInput[0].files;
	        results = [];
	        for (i = 0, len = ref.length; i < len; i++) {
	          file = ref[i];
	          results.push(file);
	        }
	        return results;
	      })();
	      fileTypes = (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = fileList.length; i < len; i++) {
	          file = fileList[i];
	          results.push(file.type);
	        }
	        return results;
	      })();
	      fileSizes = (function() {
	        var i, len, results;
	        results = [];
	        for (i = 0, len = fileList.length; i < len; i++) {
	          file = fileList[i];
	          results.push(file.size);
	        }
	        return results;
	      })();
	      return options.onChange && options.onChange(fileList);
	    });
	    return fileInput.click();
	  };

	  return File;

	})();


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Array, Async, BaseObject, CallStack, Clone, Eq, Foundation, Function, GlobalCounts, Hash, Inspect, Log, Map, Math, Promise, Regexp, Ruby, ShallowClone, String, Time, Types, WebWorker, createAllClass, select;

	Array = __webpack_require__(55);

	Async = __webpack_require__(12);

	BaseObject = __webpack_require__(18);

	CallStack = __webpack_require__(19);

	Clone = __webpack_require__(56);

	Eq = __webpack_require__(57);

	Foundation = __webpack_require__(10);

	Function = __webpack_require__(59);

	Hash = __webpack_require__(58);

	Inspect = __webpack_require__(31);

	Log = __webpack_require__(16);

	Map = __webpack_require__(40);

	Math = __webpack_require__(24);

	Promise = __webpack_require__(60);

	Regexp = __webpack_require__(25);

	Ruby = __webpack_require__(66);

	ShallowClone = __webpack_require__(26);

	String = __webpack_require__(23);

	Time = __webpack_require__(67);

	Types = __webpack_require__(21);

	WebWorker = __webpack_require__(68);

	createAllClass = BaseObject.createAllClass;

	select = Hash.select;

	GlobalCounts = (function() {
	  var currentSecond, globalCounts, globalTime, isPlainObject;

	  function GlobalCounts() {}

	  isPlainObject = Types.isPlainObject;

	  currentSecond = Time.currentSecond;

	  Foundation.globalCounts = globalCounts = {};

	  globalTime = null;

	  GlobalCounts.resetGlobalCounts = function() {
	    globalTime = currentSecond();
	    return Foundation.globalCounts = globalCounts = {};
	  };

	  GlobalCounts.globalCount = function(name, amount) {
	    var k, last, results, v;
	    if (amount == null) {
	      amount = 1;
	    }
	    if (isPlainObject(amount)) {
	      if (last = globalCounts[name]) {
	        results = [];
	        for (k in amount) {
	          v = amount[k];
	          results.push(last[k] += v);
	        }
	        return results;
	      } else {
	        return globalCounts[name] = amount;
	      }
	    } else {
	      return globalCounts[name] = (globalCounts[name] || 0) + amount;
	    }
	  };

	  GlobalCounts.countStep = function() {
	    var globalCount, nextTime;
	    nextTime = currentSecond();
	    if (nextTime - globalCount > .002) {
	      console.error("gap");
	    }
	    globalCount = nextTime;
	    return Foundation.globalCount("step");
	  };

	  return GlobalCounts;

	})();

	createAllClass(Foundation, select(BaseObject, "createWithPostCreate", "mixInto", "createAllClass"), select(Inspect, "inspect", "inspectLean", "miniInspect"), GlobalCounts, Array, Ruby, CallStack, Clone, ShallowClone, Eq, Hash, Log, Math, Regexp, String, Time, Types, Function, Async, WebWorker);


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var ArrayExtensions, arraySlice, bound, doFlattenInternal, flattenIfNeeded, intRand, isArguments, isArray, isArrayOrArguments, keepAll, log, max, moveArrayElement1, moveArrayElement2, needsFlatteningOrCompacting, ref,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	ref = __webpack_require__(24), bound = ref.bound, max = ref.max, intRand = ref.intRand;

	log = __webpack_require__(16).log;

	arraySlice = Array.prototype.slice;

	isArguments = function(o) {
	  return o.constructor === Object && (typeof o.callee === "function") && (typeof o.length === "number");
	};

	isArrayOrArguments = function(o) {
	  return o && (o.constructor === Array || isArguments(o));
	};

	isArray = function(o) {
	  return o && o.constructor === Array;
	};

	doFlattenInternal = function(array, keepTester, output) {
	  var a, len1, p;
	  output || (output = []);
	  for (p = 0, len1 = array.length; p < len1; p++) {
	    a = array[p];
	    if (isArrayOrArguments(a)) {
	      flattenIfNeeded(a, keepTester, output);
	    } else if (keepTester(a)) {
	      output.push(a);
	    }
	  }
	  return output;
	};

	needsFlatteningOrCompacting = function(array, keepTester) {
	  var a, len1, p;
	  for (p = 0, len1 = array.length; p < len1; p++) {
	    a = array[p];
	    if (isArrayOrArguments(a) || !keepTester(a)) {
	      return true;
	    }
	  }
	  return false;
	};

	keepAll = function() {
	  return true;
	};

	flattenIfNeeded = function(array, keepTester, output) {
	  var len1, p, v;
	  if (keepTester == null) {
	    keepTester = keepAll;
	  }
	  if (needsFlatteningOrCompacting(array, keepTester)) {
	    return doFlattenInternal(array, keepTester, output);
	  } else if (output) {
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      v = array[p];
	      output.push(v);
	    }
	    return output;
	  } else if (array.constructor !== Array) {
	    return arraySlice.call(array);
	  } else {
	    return array;
	  }
	};

	moveArrayElement1 = function(array, from, to) {
	  array.splice(to, 0, array[from]);
	  return array;
	};

	moveArrayElement2 = function(array, from, to) {
	  var i, p, q, ref1, ref2, ref3, ref4, tmp;
	  tmp = array[from];
	  if (from < to) {
	    for (i = p = ref1 = from, ref2 = to - 1; p <= ref2; i = p += 1) {
	      array[i] = array[i + 1];
	    }
	  } else {
	    for (i = q = ref3 = from, ref4 = to + 1; q <= ref4; i = q += 1) {
	      array[i] = array[i - 1];
	    }
	  }
	  array[to] = tmp;
	  return array;
	};

	module.exports = ArrayExtensions = (function() {
	  var basicCompareFunction, compact, discardNullAndUndefined, flatten, keepIfRubyTrue, longestCommonSubsequence, randomElement;

	  function ArrayExtensions() {}


	  /*
	  Useful compact and compactFlatten keepTester functions
	   */

	  ArrayExtensions.keepAll = keepAll = function() {
	    return true;
	  };

	  ArrayExtensions.discardNullAndUndefined = discardNullAndUndefined = function(a) {
	    return a !== void 0 && a !== null;
	  };

	  ArrayExtensions.keepIfRubyTrue = keepIfRubyTrue = function(a) {
	    return a !== void 0 && a !== null && a !== false;
	  };

	  ArrayExtensions.peek = function(array, offset) {
	    if (offset == null) {
	      offset = -1;
	    }
	    if (array) {
	      return array[array.length + offset];
	    } else {
	      return void 0;
	    }
	  };

	  basicCompareFunction = function(a, b) {
	    return a - b;
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
	    var element, i, p, ref1, returnElement;
	    if (compareFunction == null) {
	      compareFunction = basicCompareFunction;
	    }
	    if (!((array != null ? array.length : void 0) > 0)) {
	      return void 0;
	    }
	    returnElement = array[0];
	    for (i = p = 1, ref1 = array.length; p < ref1; i = p += 1) {
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

	  ArrayExtensions.compact = compact = function(array, keepTester) {
	    var a, len1, p;
	    if (keepTester == null) {
	      keepTester = discardNullAndUndefined;
	    }
	    for (p = 0, len1 = array.length; p < len1; p++) {
	      a = array[p];
	      if (!keepTester(a)) {
	        return (function() {
	          var len2, q, results;
	          results = [];
	          for (q = 0, len2 = array.length; q < len2; q++) {
	            a = array[q];
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

	  ArrayExtensions.randomSort = function(array) {
	    var a, i, j, len, p, ref1;
	    len = array.length;
	    for (i = p = ref1 = len - 1; p >= 0; i = p += -1) {
	      j = intRand(i);
	      a = array[i];
	      array[i] = array[j];
	      array[j] = a;
	    }
	    return array;
	  };

	  ArrayExtensions.flatten = flatten = function(firstArg) {
	    return flattenIfNeeded(arguments.length === 1 ? isArrayOrArguments(firstArg) ? firstArg : [firstArg] : arguments);
	  };

	  ArrayExtensions.compactFlatten = function(array, keepTester) {
	    if (keepTester == null) {
	      keepTester = discardNullAndUndefined;
	    }
	    return flattenIfNeeded(array, keepTester);
	  };

	  ArrayExtensions.insert = function(array, index, item) {
	    if (index < 0) {
	      index = array.length + index + 1;
	    }
	    array.splice(index, 0, item);
	    array;
	    return array;
	  };

	  ArrayExtensions.withInserted = function(array, index, item) {
	    return ArrayExtensions.insert(array.slice(), index, item);
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
	    return ArrayExtensions.remove(array.slice(), index, amount);
	  };

	  ArrayExtensions.arrayWithoutValue = function(array, value) {
	    return ArrayExtensions.remove(array.slice(), array.indexOf(value), 1);
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

	  ArrayExtensions.moveArrayElement1 = moveArrayElement1;

	  ArrayExtensions.moveArrayElement2 = moveArrayElement2;

	  ArrayExtensions.moveArrayElement = function(array, from, to) {
	    from = bound(0, from | 0, array.length(-1));
	    to = bound(0, to | 0, array.length(-1));
	    if (Math.abs(from - to) > 300) {
	      return moveArrayElement1(array, from, to);
	    } else {
	      return moveArrayElement2(array, from, to);
	    }
	  };

	  ArrayExtensions.stableSort = function(array, compare) {
	    var a, b, i, length, notSorted, p, ref1;
	    compare || (compare = function(a, b) {
	      return a - b;
	    });
	    notSorted = true;
	    length = array.length;
	    while (notSorted) {
	      notSorted = false;
	      for (i = p = 1, ref1 = length; p < ref1; i = p += 1) {
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
	    var c, diag, i, j, latch, lcs, left, m, n, p, q, r, ref1, ref2, ref3, row, s;
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
	    for (j = p = 0, ref1 = n; p < ref1; j = p += 1) {
	      row[j] = 0;
	    }
	    for (i = q = 0, ref2 = m; q < ref2; i = q += 1) {
	      c[i] = row = row.slice();
	      diag = 0;
	      for (j = r = 0, ref3 = n - 1; r <= ref3; j = r += 1) {
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

	  return ArrayExtensions;

	})();


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	This current iteration of clone relies on some singleton variables shared across all invocations of clone.
	This is fine as long as javascript stays single-threaded.
	It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

	FUTURE
	A potentially better solution would be to create a new closer each time clone is called at the top-most level,
	but when recursing, pass in a new function bound to that closure which is different from the global clone function.

	populateClone would need to take an additional argument - the clone function to use for recursive cloning.
	 */
	var Clone, Foundation, Inspect, Map, Unique, byProperties, byStructure, clonedMap, inspect, topObject, uniquePropertyName;

	Foundation = __webpack_require__(10);

	Map = __webpack_require__(40);

	Unique = __webpack_require__(22);

	Inspect = __webpack_require__(31);

	uniquePropertyName = Unique.PropertyName;

	inspect = Inspect.inspect;

	clonedMap = null;

	byStructure = false;

	byProperties = false;

	topObject = null;

	module.exports = Clone = (function() {
	  var clone, cloneArray, cloneByProperties, cloneByStructure, cloneObject, emptyClone;

	  function Clone() {}

	  cloneArray = function(array) {
	    var clonedArray, i, index, len, value;
	    clonedArray = clonedMap.set(array, array.slice());
	    for (index = i = 0, len = clonedArray.length; i < len; index = ++i) {
	      value = clonedArray[index];
	      clonedArray[index] = clone(value);
	    }
	    return clonedArray;
	  };

	  cloneObject = function(obj) {
	    var clonedObject, k, v;
	    clonedObject = clonedMap.set(obj, emptyClone(obj));
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


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Eq, inspect, isNumber, isString, min, objectKeyCount, ref, remove,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	inspect = __webpack_require__(31).inspect;

	remove = __webpack_require__(55).remove;

	objectKeyCount = __webpack_require__(58).objectKeyCount;

	ref = __webpack_require__(21), isString = ref.isString, isNumber = ref.isNumber;

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

	  Eq.eq = function(a, b, recursionBlockEnabled) {
	    return 0 === Eq.compare(a, b, recursionBlockEnabled);
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
	      return NaN;
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
	    var error, error1, info;
	    try {
	      return Eq._compare(a, b, recursionBlockEnabled && []);
	    } catch (error1) {
	      error = error1;
	      info = "compare(a, b, " + recursionBlockEnabled + ") threw error: ";
	      console.error(info, error);
	      throw new Error(info + error);
	    }
	  };

	  Eq._compare = function(a, b, recursionBlockArray) {
	    var _constructor;
	    if (a === b) {
	      return 0;
	    }
	    if (a && b && a.constructor === (_constructor = b.constructor)) {
	      if (isString(a)) {
	        return a.localeCompare(b);
	      }
	      if (isNumber(a)) {
	        return a - b;
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
	    return NaN;
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

	  Eq.shallowEq = function(a, b) {
	    return a === b || (a && b && a.eq && a.eq(b));
	  };

	  return Eq;

	})();


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var Hash, compactFlatten,
	  slice = [].slice,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	compactFlatten = __webpack_require__(55).compactFlatten;

	module.exports = Hash = (function() {
	  var defaultEq, mergeInto;

	  function Hash() {}

	  Hash.countKeys = function(o) {
	    return Object.keys(o).length;
	  };

	  defaultEq = function(a, b) {
	    return a === b;
	  };

	  Hash.objectDiff = function(o1, o2, added, removed, changed, nochange, eq, o2KeyCount) {
	    var k, o1KeyCount, o2KeyCountIsAtLeast, v1, v2;
	    if (eq == null) {
	      eq = defaultEq;
	    }
	    o2KeyCountIsAtLeast = 0;
	    o1KeyCount = 0;
	    for (k in o1) {
	      v1 = o1[k];
	      o1KeyCount++;
	      if (typeof (v2 = o2[k]) !== "undefined" || o2.hasOwnProperty(k)) {
	        o2KeyCountIsAtLeast++;
	        if (!eq(v1, v2)) {
	          changed(k, v1, v2);
	        } else {
	          if (typeof nochange === "function") {
	            nochange(k, v1);
	          }
	        }
	      } else {
	        added(k, v1);
	      }
	    }
	    if (!(o2KeyCount != null) || o2KeyCountIsAtLeast !== o2KeyCount) {
	      for (k in o2) {
	        if (!(typeof o1[k] !== "undefined" || o1.hasOwnProperty(k))) {
	          removed(k, o2[k]);
	        }
	      }
	    }
	    return o1KeyCount;
	  };

	  Hash.objectWithout = function() {
	    var fields, k, o, result, v;
	    o = arguments[0], fields = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    result = {};
	    for (k in o) {
	      v = o[k];
	      if (indexOf.call(compactFlatten(fields), k) < 0) {
	        result[k] = v;
	      }
	    }
	    return result;
	  };

	  Hash.objectKeyCount = function(o) {
	    var count, k, v;
	    count = 0;
	    for (k in o) {
	      v = o[k];
	      count++;
	    }
	    return count;
	  };


	  /*
	  
	  merge "flattens" its arguments and then adds all keys from all objects in
	  the list into a new object which is returned.
	  
	  return: new object
	  
	  The first object's keys are added first. If two or more objects have the same
	  keys, the value set in the result is the last object's in the list with that key.
	   */

	  Hash.merge = function() {
	    return mergeInto({}, arguments);
	  };


	  /*
	  The same as 'merge' with one difference:
	  
	  Instead of a new object, all objects are merged into the first object in the list.
	  
	  return: first object in the flattened list
	  return: null if no source objects
	   */

	  Hash.mergeInto = mergeInto = function() {
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
	        result[k] = v;
	      }
	    }
	    return result;
	  };

	  Hash.hasAllProps = function(o1, o2) {
	    var k, v;
	    for (k in o1) {
	      v = o1[k];
	      if (!o2.hasOwnProperty(k)) {
	        return false;
	      }
	    }
	    return true;
	  };

	  Hash.pureMerge = function() {
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
	        if (!Hash.hasAllProps(source, last)) {
	          return Hash.merge(sources);
	        }
	      }
	    }
	    return last;
	  };

	  Hash.select = function() {
	    var j, len, obj, prop, properties, ref, result, v;
	    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    result = {};
	    ref = compactFlatten(properties);
	    for (j = 0, len = ref.length; j < len; j++) {
	      prop = ref[j];
	      if (v = obj[prop] || obj.hasOwnProperty(prop)) {
	        result[prop] = v;
	      }
	    }
	    return result;
	  };

	  Hash.selectAll = function() {
	    var j, len, obj, prop, properties, ref, result;
	    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    result = {};
	    ref = compactFlatten(properties);
	    for (j = 0, len = ref.length; j < len; j++) {
	      prop = ref[j];
	      result[prop] = obj[prop];
	    }
	    return result;
	  };

	  Hash.objectWithout = function() {
	    var anythingToDo, j, len, obj, prop, properties, result, v;
	    obj = arguments[0], properties = 2 <= arguments.length ? slice.call(arguments, 1) : [];
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

	  return Hash;

	})();


/***/ },
/* 59 */
/***/ function(module, exports) {

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


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var ArtPromise, Promise;

	Promise = self.Promise || __webpack_require__(61);


	/*
	ArtPromise extends ES6 Promises in the following ways:

	- constructing a promise with no parameters is allowed
	- promise.resolve and promise.reject are supported as
	  alternative ways to resolve or reject a promise

	If native promises are supported, they are used,
	otherwise a polyfill is used.
	 */

	module.exports = ArtPromise = (function() {
	  ArtPromise.all = Promise.all;

	  ArtPromise.race = Promise.race;

	  ArtPromise.reject = Promise.reject;

	  ArtPromise.resolve = Promise.resolve;

	  function ArtPromise(_function) {
	    this.resolve = this.reject = null;
	    this._nativePromise = null;
	    this._nativePromise = new Promise((function(_this) {
	      return function(resolve, reject) {
	        _this.resolve = resolve;
	        _this.reject = reject;
	        return typeof _function === "function" ? _function(_this.resolve, _this.reject) : void 0;
	      };
	    })(this));
	  }

	  ArtPromise.prototype.then = function(a, b) {
	    return this._nativePromise.then(a, b);
	  };

	  ArtPromise.prototype["catch"] = function(a) {
	    return this._nativePromise["catch"](a);
	  };

	  return ArtPromise;

	})();


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.0.2
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$toString = {}.toString;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(64);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable) {
	      if (maybeThenable.constructor === promise.constructor) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        var then = lib$es6$promise$$internal$$getThen(maybeThenable);

	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value);
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      var enumerator = this;

	      enumerator._instanceConstructor = Constructor;
	      enumerator.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (enumerator._validateInput(input)) {
	        enumerator._input     = input;
	        enumerator.length     = input.length;
	        enumerator._remaining = input.length;

	        enumerator._init();

	        if (enumerator.length === 0) {
	          lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	        } else {
	          enumerator.length = enumerator.length || 0;
	          enumerator._enumerate();
	          if (enumerator._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(enumerator.promise, enumerator._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(enumerator.promise, enumerator._validationError());
	      }
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._validateInput = function(input) {
	      return lib$es6$promise$utils$$isArray(input);
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._validationError = function() {
	      return new Error('Array Methods must be provided an Array');
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._init = function() {
	      this._result = new Array(this.length);
	    };

	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var enumerator = this;

	      var length  = enumerator.length;
	      var promise = enumerator.promise;
	      var input   = enumerator._input;

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        enumerator._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var enumerator = this;
	      var c = enumerator._instanceConstructor;

	      if (lib$es6$promise$utils$$isMaybeThenable(entry)) {
	        if (entry.constructor === c && entry._state !== lib$es6$promise$$internal$$PENDING) {
	          entry._onerror = null;
	          enumerator._settledAt(entry._state, i, entry._result);
	        } else {
	          enumerator._willSettleAt(c.resolve(entry), i);
	        }
	      } else {
	        enumerator._remaining--;
	        enumerator._result[i] = entry;
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var enumerator = this;
	      var promise = enumerator.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        enumerator._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          enumerator._result[i] = value;
	        }
	      }

	      if (enumerator._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, enumerator._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        lib$es6$promise$$internal$$reject(promise, new TypeError('You must pass an array to race.'));
	        return promise;
	      }

	      var length = entries.length;

	      function onFulfillment(value) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      }

	      function onRejection(reason) {
	        lib$es6$promise$$internal$$reject(promise, reason);
	      }

	      for (var i = 0; promise._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        lib$es6$promise$$internal$$subscribe(Constructor.resolve(entries[i]), undefined, onFulfillment, onRejection);
	      }

	      return promise;
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;

	    var lib$es6$promise$promise$$counter = 0;

	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this._id = lib$es6$promise$promise$$counter++;
	      this._state = undefined;
	      this._result = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        if (!lib$es6$promise$utils$$isFunction(resolver)) {
	          lib$es6$promise$promise$$needsResolver();
	        }

	        if (!(this instanceof lib$es6$promise$promise$$Promise)) {
	          lib$es6$promise$promise$$needsNew();
	        }

	        lib$es6$promise$$internal$$initializePromise(this, resolver);
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: function(onFulfillment, onRejection) {
	        var parent = this;
	        var state = parent._state;

	        if (state === lib$es6$promise$$internal$$FULFILLED && !onFulfillment || state === lib$es6$promise$$internal$$REJECTED && !onRejection) {
	          return this;
	        }

	        var child = new this.constructor(lib$es6$promise$$internal$$noop);
	        var result = parent._result;

	        if (state) {
	          var callback = arguments[state - 1];
	          lib$es6$promise$asap$$asap(function(){
	            lib$es6$promise$$internal$$invokeCallback(state, child, callback, result);
	          });
	        } else {
	          lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	        }

	        return child;
	      },

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(65)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62), (function() { return this; }()), __webpack_require__(63)(module)))

/***/ },
/* 62 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 64 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 66 */
/***/ function(module, exports) {

	var Ruby,
	  hasProp = {}.hasOwnProperty;

	module.exports = Ruby = (function() {
	  function Ruby() {}

	  Ruby.rubyTrue = function(a) {
	    return a !== void 0 && a !== null && a !== false;
	  };

	  Ruby.rubyFalse = function(a) {
	    return a === void 0 || a === null || a === false;
	  };

	  Ruby.rubyOr = function(a, b) {
	    if (a != null) {
	      return a;
	    } else {
	      return b;
	    }
	  };

	  Ruby.rubyAnd = function(a, b) {
	    if (a != null) {
	      return b;
	    } else {
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


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var Time, base, commaize, dateSecondMinusPerformanceSecond, initDateSecond, initPerformanceSecond, log;

	log = __webpack_require__(16).log;

	commaize = __webpack_require__(24).commaize;

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
	      log("time: " + a + " took " + (Time.durationString(timeResult)));
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
	    log(a + " (" + (Time.lastTime ? Time.durationString(time - Time.lastTime) : void 0) + ")");
	    return Time.lastTime = time;
	  };

	  return Time;

	})();


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var WebWorker, log;

	log = __webpack_require__(16).log;


	/*
	SRC:
	  http://jsfiddle.net/uqcFM/49/
	  http://stackoverflow.com/a/10372280/2121000
	 */

	module.exports = WebWorker = (function() {
	  var startWorkerFromJsString;

	  function WebWorker() {}

	  WebWorker.echoWebWorker = "self.onmessage=function(e){postMessage('Worker: '+e.data);}";

	  WebWorker.isBrowser = !!(self.window && self.navigator && self.document);

	  WebWorker.isWebWorker = !WebWorker.isBrowser && self.importScripts;

	  WebWorker.startWorkerFromJsString = startWorkerFromJsString = function(workerSource) {
	    return new Worker(URL.createObjectURL(new Blob([workerSource], {
	      type: 'application/javascript'
	    })));
	  };

	  WebWorker.startWorkerFromFunction = function(workerFunction) {
	    return startWorkerFromJsString("(" + workerFunction + ")();");
	  };

	  return WebWorker;

	})();


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var Analytics, BaseObject, inspectLean,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	inspectLean = __webpack_require__(31).inspectLean;

	Analytics = (function(superClass) {
	  extend(Analytics, superClass);

	  function Analytics() {
	    return Analytics.__super__.constructor.apply(this, arguments);
	  }

	  Analytics.defaultCategory = "Foundation.Analytics";

	  Analytics.event = function(options) {
	    var action, category, label, noninteraction, value;
	    if (options == null) {
	      options = {};
	    }
	    category = options.category || this.defaultCategory;
	    action = options.action;
	    label = options.label;
	    value = options.value;
	    noninteraction = !!options.noninteraction;
	    if (self._gaq) {
	      self._gaq.push(['_trackEvent', category, action, label, value, noninteraction]);
	      return this.rawLog("ANALYTICS-EVENT: " + (inspectLean(options)));
	    } else {
	      return this.rawLog("(no)ANALYTICS-EVENT: " + (inspectLean(options)));
	    }
	  };

	  return Analytics;

	})(BaseObject);


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var BaseModule, log, mergeInto;

	log = __webpack_require__(16).log;

	mergeInto = __webpack_require__(58).mergeInto;


	/*
	TODO:
	  BaseModule should be with BaseObject
	  BaseObject should be renamed BaseClass

	  Some of BaseObject's code should be shared with BaseModule via a common extended parent class.
	    - getPrototypePropertyExtendedByInheritance

	  BaseObject should maintain a list of all included modules:
	    - should prevent including a module twice
	    - should call each module's constructor from BaseObject's constructor
	    -
	 */

	module.exports = BaseModule = (function() {
	  function BaseModule() {}


	  /*
	  TODO: @_getters should work with inheritance. Right now, an inheriting class's @getter
	  declarations will add to the top-mose inheriting from class with getters!
	   */

	  BaseModule.getter = function(getters) {
	    return this._getters = mergeInto(this._getters, getters);
	  };

	  BaseModule.setter = function(setters) {
	    return this._setters = mergeInto(this._setters, setters);
	  };


	  /*
	  this/@: the module
	  IN:
	    includedInto: the BaseObject-extending-class this module was included into
	   */

	  BaseModule.included = function(includedInto) {
	    if (this._getters) {
	      includedInto.getter(this._getters);
	    }
	    if (this._setters) {
	      return includedInto.setter(this._setters);
	    }
	  };

	  return BaseModule;

	})();


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, BatchLoader, inspect, log, nextTick, ref, timeout,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	log = __webpack_require__(16).log;

	inspect = __webpack_require__(31).inspect;

	ref = __webpack_require__(12), nextTick = ref.nextTick, timeout = ref.timeout;

	module.exports = BatchLoader = (function(superClass) {
	  extend(BatchLoader, superClass);

	  function BatchLoader(loadFunction) {
	    this.assets = {};
	    this.loadingAssets = {};
	    this.loadFunction = loadFunction;
	  }

	  BatchLoader.prototype.load = function(sources, onLoad) {
	    if (typeof sources === "string") {
	      sources = [sources];
	    }
	    return this.loadAssets(sources, onLoad);
	  };

	  BatchLoader.prototype.addAsset = function(source, asset) {
	    var base;
	    if (asset == null) {
	      throw new Error("not a valid asset: " + (inspect(asset)));
	    }
	    delete this.loadingAssets[source];
	    (base = this.assets)[source] || (base[source] = asset);
	    return this.notifyListeners();
	  };

	  BatchLoader.getter({
	    blankInfo: function() {
	      return {
	        loadedFromCache: 0,
	        loadedAsynchronously: 0,
	        alreadyLoadingAsynchronously: 0
	      };
	    }
	  });

	  BatchLoader.prototype.loadAssets = function(sources, onLoad) {
	    var info;
	    info = this.blankInfo;
	    sources.forEach((function(_this) {
	      return function(src) {
	        if (_this.assets[src] != null) {
	          return info.loadedFromCache++;
	        } else if (_this.loadingAssets[src]) {
	          info.loadedAsynchronously++;
	          return info.alreadyLoadingAsynchronously++;
	        } else {
	          info.loadedAsynchronously++;
	          _this.loadingAssets[src] = true;
	          return _this.loadFunction(src, function(src, asset) {
	            return _this.addAsset(src, asset);
	          });
	        }
	      };
	    })(this));
	    this.addLoaderListener(sources, onLoad, info);
	    return nextTick((function(_this) {
	      return function() {
	        return _this.notifyListeners();
	      };
	    })(this));
	  };

	  BatchLoader.prototype.addLoaderListener = function(sources, onLoad, info) {
	    this.loadingListeners || (this.loadingListeners = []);
	    return this.loadingListeners.push({
	      sources: sources,
	      onLoad: onLoad,
	      info: info
	    });
	  };

	  BatchLoader.prototype.notifyListeners = function() {
	    var allLoaded, i, j, len, len1, listener, oldloadingListeners, ref1, source;
	    if (!this.loadingListeners) {
	      return;
	    }
	    oldloadingListeners = this.loadingListeners;
	    this.loadingListeners = [];
	    for (i = 0, len = oldloadingListeners.length; i < len; i++) {
	      listener = oldloadingListeners[i];
	      allLoaded = true;
	      ref1 = listener.sources;
	      for (j = 0, len1 = ref1.length; j < len1; j++) {
	        source = ref1[j];
	        if (!this.assets[source]) {
	          allLoaded = false;
	        }
	      }
	      if (allLoaded) {
	        listener.onLoad(this.assets, listener.sources, listener.info);
	      } else {
	        this.loadingListeners.push(listener);
	      }
	    }
	    return this.loadingListeners;
	  };

	  return BatchLoader;

	})(BaseObject);


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var Async, BaseObject, Epoch, Foundation, Inspect, Promise, evalAndThrowErrorsOutOfStack, inspect, requestAnimationFrame,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	Foundation = __webpack_require__(10);

	BaseObject = __webpack_require__(18);

	Async = __webpack_require__(12);

	Inspect = __webpack_require__(31);

	Promise = __webpack_require__(60);

	requestAnimationFrame = Async.requestAnimationFrame, evalAndThrowErrorsOutOfStack = Async.evalAndThrowErrorsOutOfStack;

	inspect = Inspect.inspect;

	module.exports = Epoch = (function(superClass) {
	  extend(Epoch, superClass);

	  function Epoch(options) {
	    if (options == null) {
	      options = {};
	    }
	    Epoch.__super__.constructor.apply(this, arguments);
	    this._emptyQueueAfterProcessing = !!options.emptyQueueAfterProcessing;
	    this._queuedItems = [];
	    this._nextReadyQueue = [];
	    this._epochQueued = false;
	    this._processingEpoch = false;
	    this._epochCount = 0;
	  }

	  Epoch.propGetter("processingEpoch", "epochQueued", "epochCount", "emptyQueueAfterProcessing");

	  Epoch.getter({
	    epochLength: function() {
	      return this._queuedItems.length + this._nextReadyQueue.length;
	    }
	  });

	  Epoch.prototype.updateGlobalCounts = function() {
	    Foundation.globalCount(this["class"].name + "_queuedItems", this._queuedItems.length);
	    return Foundation.globalCount(this["class"].name + "_nextReadyQueue", this._nextReadyQueue.length);
	  };

	  Epoch.prototype.onNextReady = function(f) {
	    if (f) {
	      if (typeof f !== "function") {
	        throw new Error("not a function: " + (inspect(f)));
	      }
	      if (!this._processingEpoch) {
	        this.queueNextEpoch();
	      }
	      return this._nextReadyQueue.push(f);
	    } else {
	      return new Promise((function(_this) {
	        return function(resolve) {
	          return _this._nextReadyQueue.push(function() {
	            return resolve();
	          });
	        };
	      })(this));
	    }
	  };

	  Epoch.prototype._ready = function() {
	    var f, i, len, nrq, results;
	    if (!((nrq = this._nextReadyQueue).length > 0)) {
	      return;
	    }
	    this._nextReadyQueue = [];
	    results = [];
	    for (i = 0, len = nrq.length; i < len; i++) {
	      f = nrq[i];
	      results.push(evalAndThrowErrorsOutOfStack((function(_this) {
	        return function() {
	          return f();
	        };
	      })(this)));
	    }
	    return results;
	  };

	  Epoch.prototype.queueItem = function(item) {
	    if (item) {
	      this._queuedItems.push(item);
	      this.queueNextEpoch();
	    }
	    return item;
	  };

	  Epoch.prototype.isItemQueued = function(item) {
	    return indexOf.call(this._queuedItems, item) >= 0;
	  };

	  Epoch.prototype.queueNextEpoch = function() {
	    if (!this._epochQueued) {
	      this._epochQueued = true;
	      return requestAnimationFrame((function(_this) {
	        return function() {
	          _this._epochQueued = false;
	          return _this.processEpoch();
	        };
	      })(this));
	    }
	  };

	  Epoch.prototype.flushEpochNow = function() {
	    return this.processEpoch();
	  };

	  Epoch.prototype.processEpoch = function() {
	    var items;
	    this._processingEpoch = true;
	    items = this._queuedItems;
	    if (this._emptyQueueAfterProcessing) {
	      this.processEpochItemsWithErrorHandling(items);
	      this._queuedItems = [];
	    } else {
	      this._queuedItems = [];
	      this.processEpochItemsWithErrorHandling(items);
	    }
	    this._processingEpoch = false;
	    this._epochCount++;
	    return this._ready();
	  };

	  Epoch.prototype.processEpochItemsWithErrorHandling = function(items) {
	    return evalAndThrowErrorsOutOfStack((function(_this) {
	      return function() {
	        return _this.processEpochItems(items);
	      };
	    })(this));
	  };

	  Epoch.prototype.processEpochItems = function(items) {
	    var i, item, len, results;
	    results = [];
	    for (i = 0, len = items.length; i < len; i++) {
	      item = items[i];
	      results.push(item());
	    }
	    return results;
	  };

	  return Epoch;

	})(BaseObject);


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, JsonStore,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	BaseObject = __webpack_require__(18);

	module.exports = JsonStore = (function(superClass) {
	  extend(JsonStore, superClass);

	  function JsonStore(store) {
	    if (store == null) {
	      store = localStorage;
	    }
	    this.store = store;
	  }

	  JsonStore.prototype.setItem = function(k, v) {
	    return this.store.setItem(k, JSON.stringify(v));
	  };

	  JsonStore.prototype.getItem = function(k) {
	    return JSON.parse(this.store.getItem(k));
	  };

	  JsonStore.prototype.removeItem = function(k) {
	    return this.store.removeItem(k);
	  };

	  JsonStore.prototype.clear = function() {
	    return this.store.clear();
	  };

	  JsonStore.prototype.key = function(k) {
	    return this.store.key(k);
	  };

	  JsonStore.getter({
	    length: function() {
	      return this.store.length;
	    }
	  });

	  return JsonStore;

	})(BaseObject);


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var EventStackNode, SequencedEventManager, nextTick, rawLog;

	rawLog = __webpack_require__(16).rawLog;

	nextTick = __webpack_require__(12).nextTick;

	console.log("SequencedEventManager is depricated.");

	EventStackNode = (function() {
	  function EventStackNode(eventFunction, options, parent) {
	    this["catch"] = options != null ? options["catch"] : void 0;
	    this.parent = parent;
	    this.eventFunction = eventFunction;
	    this.nextSubNode = null;
	    this.lastSubNode = null;
	    this.nextPeer = null;
	    this.done = false;
	    this.started = false;
	  }

	  EventStackNode.prototype.addSubNode = function(node) {
	    node.parent = this;
	    if (!this.lastSubNode) {
	      return this.lastSubNode = this.nextSubNode = node;
	    } else {
	      this.lastSubNode.nextPeer = node;
	      return this.lastSubNode = node;
	    }
	  };

	  EventStackNode.prototype.queue = function(eventFunction, options) {
	    return this.addSubNode(new EventStackNode(eventFunction, options));
	  };

	  EventStackNode.prototype.evaluateFunction = function() {
	    var error, error1;
	    try {
	      SequencedEventManager.currentNode = this;
	      return this.eventFunction();
	    } catch (error1) {
	      error = error1;
	      return SequencedEventManager["throw"](error);
	    }
	  };

	  EventStackNode.prototype.topmostParent = function() {
	    var parent;
	    parent = this;
	    while (parent.parent) {
	      parent = parent.parent;
	    }
	    return parent;
	  };

	  EventStackNode.prototype.notDoneParent = function() {
	    var parent;
	    parent = this.parent;
	    while (parent && parent.done) {
	      parent = parent.parent;
	    }
	    return parent;
	  };

	  EventStackNode.prototype.unstartedSelfOrChild = function() {
	    var result;
	    if (!this.started) {
	      return this;
	    }
	    if (this.done) {
	      return null;
	    }
	    while (this.nextSubNode && !(result = this.nextSubNode.unstartedSelfOrChild())) {
	      this.nextSubNode = this.nextSubNode.nextPeer;
	    }
	    if (result) {
	      return result;
	    } else {
	      this.done = true;
	      return null;
	    }
	  };

	  EventStackNode.prototype.unstartedParentOrChild = function() {
	    var notDoneParent, result;
	    result = null;
	    while (!result && (notDoneParent = this.notDoneParent())) {
	      result = notDoneParent.unstartedSelfOrChild();
	    }
	    return result;
	  };

	  EventStackNode.prototype.nextUnstartedNode = function() {
	    return this.unstartedSelfOrChild() || this.unstartedParentOrChild();
	  };

	  EventStackNode.prototype.next = function() {
	    var ref;
	    return (ref = this.nextUnstartedNode()) != null ? ref.start() : void 0;
	  };

	  EventStackNode.prototype.start = function() {
	    this.started = true;
	    this.done = false;
	    this.evaluateFunction();
	    return true;
	  };

	  EventStackNode.prototype.inspectStructure = function() {
	    var node, result;
	    result = !this.eventFunction ? "" : this.done ? "d" : this.started ? "s" : "p";
	    if (this.nextSubNode) {
	      node = this.nextSubNode;
	      result += "(" + (node.inspectStructure());
	      while (node = node.nextPeer) {
	        result += ", " + (node.inspectStructure());
	      }
	      return result + ")";
	    } else {
	      return result;
	    }
	  };

	  return EventStackNode;

	})();

	module.exports = SequencedEventManager = (function() {
	  function SequencedEventManager() {}

	  SequencedEventManager.currentNode = null;

	  SequencedEventManager.resetIds = function() {
	    return EventStackNode.resetIds();
	  };

	  SequencedEventManager.queue = function(eventFunction, options) {
	    if (options == null) {
	      options = {};
	    }
	    this.scheduleNextTick();
	    if (!this.currentNode) {
	      this.currentNode = new EventStackNode;
	      this.currentNode.started = true;
	    }
	    return this.currentNode.queue(eventFunction, options);
	  };

	  SequencedEventManager.inspectStructure = function() {
	    return this.currentNode && this.currentNode.topmostParent().inspectStructure();
	  };


	  /*
	  User should not call methods below directly
	  private:
	   */

	  SequencedEventManager["throw"] = function(error) {
	    while (this.currentNode) {
	      if (this.currentNode["catch"]) {
	        this.currentNode.done = true;
	        this.currentNode["catch"](error);
	        return;
	      } else {
	        this.currentNode = this.currentNode.parent;
	      }
	    }
	    rawLog("SequencedEventManager. Uncaught exception: " + error.name);
	    rawLog(error);
	    throw error;
	  };

	  SequencedEventManager.next = function() {
	    var ref;
	    while ((ref = this.currentNode) != null ? ref.done : void 0) {
	      this.currentNode = this.currentNode.parent;
	    }
	    if (this.currentNode) {
	      return this.currentNode.next();
	    } else {
	      this.rootNode = this.currentNode = null;
	      rawLog("SequencedEventManager.next: everything is already done!");
	      return false;
	    }
	  };

	  SequencedEventManager.scheduleNextTick = function() {
	    if (!this.nextTickScheduled) {
	      this.nextTickScheduled = true;
	      return nextTick((function(_this) {
	        return function() {
	          var ref;
	          _this.nextTickScheduled = false;
	          _this.next();
	          if ((ref = _this.currentNode) != null ? ref.nextUnstartedNode() : void 0) {
	            return _this.scheduleNextTick();
	          } else {
	            return _this.currentNode = null;
	          }
	        };
	      })(this));
	    }
	  };

	  return SequencedEventManager;

	})();


	/*
	each time we execute a user eventFunction, we push an item onto the stack
	each time we finish a eventFunction we execute the next eventFunction - which is always the next eventFunction of the most recent stack-node
	we only pop stack nodes when all eventFunctions have been executed
	 */


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Map, SingleObjectTransaction, cloneByStructure, eq, inspect, removeFirstMatch, rubyTrue,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	BaseObject = __webpack_require__(18);

	Map = __webpack_require__(40);

	removeFirstMatch = __webpack_require__(55).removeFirstMatch;

	rubyTrue = __webpack_require__(66).rubyTrue;

	eq = __webpack_require__(57).eq;

	inspect = __webpack_require__(31).inspect;

	cloneByStructure = __webpack_require__(56).cloneByStructure;

	module.exports = SingleObjectTransaction = (function(superClass) {
	  var setValues;

	  extend(SingleObjectTransaction, superClass);

	  function SingleObjectTransaction(a) {
	    var options;
	    SingleObjectTransaction.__super__.constructor.apply(this, arguments);
	    this.object = (function() {
	      if (a.constructor === Array) {
	        if (a.length !== 2) {
	          throw new Error("new SingleObjectTransaction: expected length-2 array like: [obj, optionsMap]");
	        }
	        this.options = a[1];
	        return a[0];
	      } else {
	        this.options = {};
	        return a;
	      }
	    }).call(this);
	    if (this.object == null) {
	      throw new Error("object must not be null or undefined");
	    }
	    this.props = [];
	    this.from = {};
	    options = this.options;
	    if (options.properties) {
	      this.addProperties(options.properties);
	    }
	    if (options.property) {
	      this.addProp(options.property);
	    }
	    if (options.from) {
	      this.addFromValues(options.from);
	    }
	    if (options.to) {
	      this.addToValues(options.to);
	    }
	  }

	  SingleObjectTransaction.prototype.toString = function() {
	    return (inspect(this.object, 0)) + " from:" + (inspect(this.from, 1)) + " to:" + (inspect(this.to, 1));
	  };

	  SingleObjectTransaction.prototype.inspect = function(inspector) {
	    var i, k, len, ref, results;
	    inspector.put(this.object.classPathName + ":");
	    ref = this.props;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      k = ref[i];
	      inspector.put("\n    " + k + ": ");
	      if (rubyTrue(this.from && this.from[k])) {
	        inspector.inspect(this.from[k], 1);
	      }
	      inspector.put(" ... ");
	      if (rubyTrue(this.to && this.to[k])) {
	        results.push(inspector.inspect(this.to[k], 1));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  SingleObjectTransaction.getter({
	    properties: function() {
	      return this.props;
	    },
	    hasToValues: function() {
	      return !!this.to;
	    },
	    valuesChanged: function() {
	      var fromValue, k, ref, toValue;
	      ref = this.from;
	      for (k in ref) {
	        fromValue = ref[k];
	        toValue = this.to[k];
	        if (!eq(fromValue, toValue)) {
	          return true;
	        }
	      }
	      return false;
	    }
	  });

	  SingleObjectTransaction.prototype.addFromValues = function(from) {
	    var base, k, v;
	    for (k in from) {
	      v = from[k];
	      this.addProp(k);
	      this.from[k] = v;
	    }
	    return typeof (base = this.object).preprocessProperties === "function" ? base.preprocessProperties(this.from) : void 0;
	  };

	  SingleObjectTransaction.prototype.addToValues = function(to) {
	    var base, k, v;
	    this.to || (this.to = {});
	    for (k in to) {
	      v = to[k];
	      this.addProp(k);
	      this.to[k] = v;
	    }
	    return typeof (base = this.object).preprocessProperties === "function" ? base.preprocessProperties(this.to) : void 0;
	  };

	  SingleObjectTransaction.prototype.addProperties = function(props) {
	    var i, len, prop, results, results1, v;
	    if (props.constructor === Array) {
	      results = [];
	      for (i = 0, len = props.length; i < len; i++) {
	        prop = props[i];
	        results.push(this.addProp(prop));
	      }
	      return results;
	    } else {
	      results1 = [];
	      for (prop in props) {
	        v = props[prop];
	        results1.push(this.addProp(prop));
	      }
	      return results1;
	    }
	  };

	  SingleObjectTransaction.prototype.addProp = function(propName) {
	    if (indexOf.call(this.props, propName) < 0) {
	      return this.props.push(propName);
	    }
	  };

	  SingleObjectTransaction.prototype.deleteProp = function(propName) {
	    removeFirstMatch(this.props, propName);
	    delete this.from[propName];
	    return delete this.to[propName];
	  };

	  SingleObjectTransaction.prototype.saveValues = function(saveTo) {
	    var getterName, i, len, metaProperties, prop, ref, ref1, value;
	    this.clearOptimizations();
	    metaProperties = this.object.metaProperties;
	    ref = this.props;
	    for (i = 0, len = ref.length; i < len; i++) {
	      prop = ref[i];
	      if (!saveTo.hasOwnProperty(prop)) {
	        value = saveTo[prop] = cloneByStructure((getterName = metaProperties != null ? (ref1 = metaProperties[prop]) != null ? ref1.getterName : void 0 : void 0) ? this.object[getterName]() : this.object[prop]);
	      }
	    }
	    return null;
	  };

	  SingleObjectTransaction.prototype.saveFromValues = function() {
	    return this.saveValues(this.from || (this.from = {}));
	  };

	  SingleObjectTransaction.prototype.saveToValues = function() {
	    return this.saveValues(this.to || (this.to = {}));
	  };

	  SingleObjectTransaction._setValues = setValues = function(o, values, f) {
	    var metaProperties, prop, ref, setterName, v;
	    metaProperties = o.metaProperties;
	    for (prop in values) {
	      v = values[prop];
	      if (f) {
	        v = f(prop, v);
	      }
	      if (setterName = metaProperties != null ? (ref = metaProperties[prop]) != null ? ref.setterName : void 0 : void 0) {
	        o[setterName](v);
	      } else {
	        o[prop] = v;
	      }
	    }
	    return null;
	  };

	  SingleObjectTransaction.prototype.rollBack = function() {
	    return setValues(this.object, this.from);
	  };

	  SingleObjectTransaction.prototype.rollForward = function() {
	    return setValues(this.object, this.to);
	  };

	  SingleObjectTransaction.prototype.clearOptimizations = function() {
	    return this.numberDeltas = this.interpolateToObjects = null;
	  };

	  SingleObjectTransaction.prototype.optimizeInterpolation = function() {
	    var field, from, ref, results, to;
	    this.numberDeltas = {};
	    this.interpolateToObjects = {};
	    this.nonInterpolatingFields = {
	      to: {},
	      from: {}
	    };
	    ref = this.from;
	    results = [];
	    for (field in ref) {
	      from = ref[field];
	      to = this.to[field];
	      if (typeof from === "number") {
	        results.push(this.numberDeltas[field] = to - from);
	      } else if (typeof (from != null ? from.interpolate : void 0) === "function") {
	        results.push(this.interpolateToObjects[field] = to);
	      } else {
	        this.nonInterpolatingFields.from[field] = from;
	        results.push(this.nonInterpolatingFields.to[field] = to);
	      }
	    }
	    return results;
	  };

	  SingleObjectTransaction.prototype.interpolateNumberFields = function(p) {
	    return setValues(this.object, this.numberDeltas, (function(_this) {
	      return function(field, delta) {
	        return _this.from[field] + delta * p;
	      };
	    })(this));
	  };

	  SingleObjectTransaction.prototype.interpolateObjectFields = function(p) {
	    var e, error;
	    try {
	      return setValues(this.object, this.interpolateToObjects, (function(_this) {
	        return function(field, toObject) {
	          return _this.from[field].interpolate(toObject, p);
	        };
	      })(this));
	    } catch (error) {
	      e = error;
	      this.log("Art.Foundation.Transaction#interpolateObjectFields(p=" + p + "): error " + e + " deltas: " + (inspect(this.interpolateToObjects)) + " from:   " + (inspect(this.from)) + " to:     " + (inspect(this.to)));
	      throw e;
	    }
	  };

	  SingleObjectTransaction.prototype.setNonInterpolatingFields = function(p) {
	    return setValues(this.object, this.nonInterpolatingFields[p >= 1 ? "to" : "from"]);
	  };

	  SingleObjectTransaction.prototype.interpolate = function(p) {
	    if (!this.numberDeltas) {
	      this.optimizeInterpolation();
	    }
	    this.interpolateNumberFields(p);
	    this.interpolateObjectFields(p);
	    return this.setNonInterpolatingFields(p);
	  };

	  SingleObjectTransaction.getter({
	    noChanges: function() {
	      return this.props.length === 0;
	    }
	  });

	  SingleObjectTransaction.prototype.optimizeProperties = function() {
	    var i, len, prop, ref, results;
	    this.clearOptimizations();
	    ref = this.props;
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      prop = ref[i];
	      if (!this.from.hasOwnProperty(prop) || !this.to.hasOwnProperty(prop) || eq(this.from[prop], this.to[prop])) {
	        results.push(this.deleteProp(prop));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  return SingleObjectTransaction;

	})(BaseObject);


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Stat, inspect, max, min, ref, round,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	ref = __webpack_require__(24), min = ref.min, max = ref.max, round = ref.round;

	BaseObject = __webpack_require__(18);

	inspect = __webpack_require__(31).inspect;

	module.exports = Stat = (function(superClass) {
	  extend(Stat, superClass);

	  function Stat() {
	    this.reset();
	  }

	  Stat.prototype.reset = function() {
	    this.values = [];
	    this.sum = 0;
	    return this.max = this.min = null;
	  };

	  Stat.getter({
	    length: function() {
	      return this.values.length;
	    },
	    average: function() {
	      return this.sum / this.values.length;
	    },
	    median: function() {
	      return this.values.slice().sort()[this.length / 2 | 0];
	    }
	  });

	  Stat.prototype.percential = function(zeroToOneHundred) {
	    var i, sorted;
	    i = ((this.length - 1) * zeroToOneHundred / 100) | 0;
	    sorted = this.values.slice().sort(function(v1, v2) {
	      return v2 - v1;
	    });
	    return sorted[i];
	  };

	  Stat.prototype.histogram = function(divisions, min, max) {
	    var bin, delta, hist, j, k, len, mul, ref1, ref2, v;
	    if (min == null) {
	      min = this.min;
	    }
	    if (max == null) {
	      max = this.max;
	    }
	    delta = max - min;
	    mul = divisions / delta;
	    hist = {};
	    for (v = j = 0, ref1 = divisions; j < ref1; v = j += 1) {
	      hist[min + v / mul] = 0;
	    }
	    ref2 = this.values;
	    for (k = 0, len = ref2.length; k < len; k++) {
	      v = ref2[k];
	      bin = (v - min) * mul | 0;
	      if (bin < 0) {
	        bin = 0;
	      }
	      if (bin >= divisions) {
	        bin = divisions - 1;
	      }
	      hist[min + bin / mul]++;
	    }
	    return hist;
	  };

	  Stat.prototype.toString = function() {
	    return inspect({
	      length: this.length,
	      average: this.average,
	      median: this.median,
	      min: this.min,
	      max: this.max
	    });
	  };

	  Stat.prototype.toInfoMap = function() {
	    return {
	      length: this.length,
	      average: this.average,
	      median: this.median,
	      min: this.min,
	      max: this.max,
	      p90: this.percential(90),
	      p95: this.percential(95),
	      p99: this.percential(99)
	    };
	  };

	  Stat.prototype.toIntInfoMap = function() {
	    return {
	      length: this.length,
	      average: round(this.average),
	      median: round(this.median),
	      min: round(this.min),
	      max: round(this.max),
	      p90: round(this.percential(90)),
	      p95: round(this.percential(95)),
	      p99: round(this.percential(99))
	    };
	  };

	  Stat.prototype.toIntString = function() {
	    return inspect(this.toIntInfoMap());
	  };

	  Stat.prototype.add = function(v) {
	    this.values.push(v);
	    this.sum += v;
	    if (this.values.length === 1) {
	      return this.max = this.min = v;
	    } else {
	      this.max = max(this.max, v);
	      return this.min = min(this.min, v);
	    }
	  };

	  return Stat;

	})(BaseObject);


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	Transaction provides a manual, yet easy way to log the before and after values
	of fields over many objects.

	It is "manual" in that you must:

	  Pre-specify all objects you wish to track.
	  Specify the properties you wish to track for all objects and/or uniquely for each object.
	  Pass in the "from" values or call saveFromValues
	  Pass in the "to" values or call saveToValues

	Once you have capture the "from" and "to" values of the transaction, you can:

	  rollBack and set all properties to their "from" values
	  rollForward and set all properties to their "to" values
	  interpolate(p) and set all properties to their linearly interpolated value
	    between their saved "from" (p=0) and "to" (p=1) values.
	    If you use interpolate:
	      to/from values should be pair-wise the same type
	      only to/from values of the following types will be interpolated:
	        numbers
	        objects implementing: a.add(b), a.sub(b) and a.mul(number)
	      Non-interpolatable types are handled as follows:
	        switch p
	          when 0 then set to "from" values
	          when 1 then set to "to" values
	          else left unchanged

	Example initializers:

	   * example-a: track obj's "foo" and "bar" properties
	  new Transaction obj, properties: ["foo", "bar"]

	   * same as example-a, but also initialize obj's from-values as obj.foo=1 and obj.bar=2
	  new Transaction obj, from: foo:1, bar:2

	   * same as example-a, but also initialize obj's to-values as obj.foo=1 and obj.bar=2
	  new Transaction obj, to: foo:1, bar:2

	   * track obj1 and obj2's "foo" and "bar" properties
	  new Transaction [obj1, obj2], properties: ["foo", "bar"]

	   * track:
	   *   obj1's foo, bar, noo and mar properties, with both from and to values initialized
	   *   obj2's goo, har, noo and mar properties, with both from and to values initialized
	  new Transaction [
	      [obj1,
	        from: foo:1, bar:2
	        to:   foo:2, bar:3
	      ],
	      [obj2,
	        from: goo:1, har:2
	        to:   goo:2, har:3
	      ]
	    ],
	    from: noo:4, mar:5
	    to:   noo:4, mar:5
	 */
	var BaseObject, Map, SingleObjectTransaction, Transaction, cloneByStructure, eq, inspect, rubyTrue,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

	SingleObjectTransaction = __webpack_require__(75);

	Map = __webpack_require__(40);

	BaseObject = __webpack_require__(18);

	rubyTrue = __webpack_require__(66).rubyTrue;

	eq = __webpack_require__(57).eq;

	inspect = __webpack_require__(31).inspect;

	cloneByStructure = __webpack_require__(56).cloneByStructure;

	module.exports = Transaction = (function(superClass) {
	  extend(Transaction, superClass);

	  Transaction.SingleObjectTransaction = SingleObjectTransaction;

	  function Transaction(objects, options) {
	    if (options == null) {
	      options = {};
	    }
	    Transaction.__super__.constructor.apply(this, arguments);
	    this._objects = new Map;
	    if (objects.constructor === Array) {
	      this.addObjects(objects);
	    } else {
	      this.addObject(objects);
	    }
	    if (options.properties) {
	      this.addProperties(options.properties);
	    }
	    if (options.property) {
	      this.addProperties([options.property]);
	    }
	    if (options.from) {
	      this.addFromValues(options.from);
	    }
	    if (options.to) {
	      this.addToValues(options.to);
	    }
	    this.saveFromValues();
	  }

	  Transaction.prototype.inspect = function(inspector) {
	    inspector.put(this.classPathName + ":");
	    return this.inspectParts(inspector);
	  };

	  Transaction.prototype.inspectParts = function(inspector) {
	    return this._objects.each((function(_this) {
	      return function(k, v) {
	        inspector.put("\n  ");
	        return inspector.inspect(v);
	      };
	    })(this));
	  };

	  Transaction.getter({
	    objects: function() {
	      return this._objects.keys;
	    }
	  });

	  Transaction.prototype.properties = function(obj) {
	    return this._objects.get(obj).properties;
	  };

	  Transaction.prototype.from = function(obj) {
	    return this._objects.get(obj).from;
	  };

	  Transaction.prototype.to = function(obj) {
	    return this._objects.get(obj).to;
	  };

	  Transaction.prototype.rollBack = function() {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.rollBack();
	      };
	    })(this));
	  };

	  Transaction.prototype.rollForward = function() {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.rollForward();
	      };
	    })(this));
	  };

	  Transaction.prototype.interpolate = function(p) {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.interpolate(p);
	      };
	    })(this));
	  };

	  Transaction.prototype.optimize = function() {
	    this.optimizeProperties();
	    return this.optimizeObjects();
	  };

	  Transaction.getter({
	    hasToValues: function() {
	      var result;
	      result = false;
	      this._objects.forEach((function(_this) {
	        return function(oi) {
	          if (oi.hasToValues) {
	            return result = true;
	          }
	        };
	      })(this));
	      return result;
	    },
	    valuesChanged: function() {
	      var result;
	      result = false;
	      this._objects.forEach((function(_this) {
	        return function(object) {
	          if (object.valuesChanged) {
	            return result = true;
	          }
	        };
	      })(this));
	      return result;
	    }
	  });

	  Transaction.prototype.toString = function() {
	    return (this.className + "\n  ") + (this._objects.map(function(obj, single) {
	      return single.toString();
	    })).join("  \n");
	  };

	  Transaction.prototype.addFromValues = function(from) {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.addFromValues(from);
	      };
	    })(this));
	  };

	  Transaction.prototype.addToValues = function(to) {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.addToValues(to);
	      };
	    })(this));
	  };

	  Transaction.prototype.addProperties = function(properties) {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.addProperties(properties);
	      };
	    })(this));
	  };

	  Transaction.prototype.addObject = function(obj) {
	    var oi;
	    oi = new SingleObjectTransaction(obj);
	    return this._objects.set(oi.object, oi);
	  };

	  Transaction.prototype.addObjects = function(objects) {
	    var i, len, obj, results;
	    results = [];
	    for (i = 0, len = objects.length; i < len; i++) {
	      obj = objects[i];
	      results.push(this.addObject(obj));
	    }
	    return results;
	  };

	  Transaction.prototype.saveFromValues = function() {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.saveFromValues();
	      };
	    })(this));
	  };

	  Transaction.prototype.saveToValues = function() {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.saveToValues();
	      };
	    })(this));
	  };

	  Transaction.prototype.optimizeProperties = function() {
	    return this._objects.forEach((function(_this) {
	      return function(oi) {
	        return oi.optimizeProperties();
	      };
	    })(this));
	  };

	  Transaction.prototype.optimizeObjects = function() {
	    var objs;
	    objs = this._objects;
	    this._objects = new Map;
	    return objs.forEach((function(_this) {
	      return function(oi) {
	        if (!oi.noChanges) {
	          return _this._objects.set(oi.object, oi);
	        }
	      };
	    })(this));
	  };

	  return Transaction;

	})(BaseObject);


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var BaseObject, Promise, WorkerRpc, debugPrefix, isFunction, isPlainArray, isString, isWebWorker, log, mergeInto, ref,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;

	BaseObject = __webpack_require__(18);

	Promise = __webpack_require__(60);

	log = __webpack_require__(16).log;

	ref = __webpack_require__(21), isPlainArray = ref.isPlainArray, isFunction = ref.isFunction, isString = ref.isString;

	mergeInto = __webpack_require__(58).mergeInto;

	isWebWorker = __webpack_require__(68).isWebWorker;


	/*
	WorkerRPC has two modes: singleton and instanced.

	SINGLETON:
	  Including WorkerRPC automatically creates the singleton instance.
	  In a worker, the singleton automatically binds to the worker's self.onmessage and starts listenting.
	  In workers or the browser, any handler registered with the singleton will be available to respond
	  to any message received by the singleton OR ANY OTHER INSTANCE of WorkerRPC in that thread.
	  You can think of the singleton as the global registry for handlers.

	In practice:
	  In browser:
	     * to register all your handlers, call this one or more times:
	    WorkerRpc.register ...

	     * call for each each worker you want to listen for RPC calls from,
	     * and bind any remote procedures you want to be able to invoke on that specific worker-thread
	    aBoundWorker = new WorkerRpc worker,
	      bind: ...
	      bindWithPromises: ...

	     * to make remote-procedure-calls to the worker:
	     * NOTE: if registered with bindWithPromises, will return a promise for the RPC's result.
	    aBoundWorker.MyWorkerNamespace.myWorkerFunction ...

	  In worker:
	     * to register all your handlers, call this one or more times:
	    WorkerRpc.register ...

	     * bind any remote procedures you want to be able to invoke on the browser-thread
	    WorkerRpc.bind ...
	    WorkerRpc.bindWithPromises ...

	NOTES:
	  registered functions are invoked with @/this set to the namespace. That way you can invoke
	  callback functions you previously bound back to the specific worker that invoked the
	  function with: @MyWorkerNamespace.myWorkerFunction()

	Real world example:

	  Suppose you want to access the localStorage object on the browser thread from your worker.
	  The 6 lines of code below create the 'self.asyncLocalStorage' object which works just like
	  'localStorage' except it returns Art.Foundation.Promises for the function results.

	  browser: (before starting the worker)
	    {WorkerRpc} = Art.Foundation
	    WorkerRpc.register localStorage: localStorage
	    new WorkerRpc workerSourcePath

	  worker:
	    {workerRpc} = Art.Foundation.WorkerRpc
	    workerRpc.bindWithPromises localStorage: ["getItem", "setItem", "removeItem", "clear"]
	    self.asyncLocalStorage = workerRpc.localStorage

	  SBD: Isn't that nice! So streamlined!

	General examples:

	Usage with no return value expected:
	  browser thread:

	    new WorkerRpc (new Worker workerUrl),
	      register:
	        MyMainNamespace:
	          doWork: (a) -> ...

	  worker thread:

	    {MyMainNamespace} = new WorkerRpc self,
	      bind:
	        MyMainNamespace: ["doWork"]

	    MyMainNamespace.doWork myStructuredData

	Usage with promises:

	  browser thread:

	    new WorkerRpc (new Worker workerUrl),
	      register:
	        MyMainNamespace:
	          concatStrings: (a, b) ->
	            a + b
	             * equivelent to: Promise.resolve a + b
	             * if the result is not a Promse, Promise.resolve(result) is automatically applied

	  worker thread:

	    {MyMainNamespace} = new WorkerRpc self,
	      bindWithPromises:
	        MyMainNamespace: ["concatStrings"]

	    MyMainNamespace.concatStrings "hi ", "Shane"
	    .then (result) ->
	       * result == "hi Shane"

	Usage with arbitrary response messages:

	  Sometimes you want a handle to the workerRpc instance for the thread that just send
	  you the message inside your registered response functions. You can access that
	  via the global: WorkerRpc.lastMessageReceivedFrom.

	  browser thread:

	    new WorkerRpc (new Worker workerUrl),
	      register:
	        MyMainNamespace:
	          doWorkAndRespond: (key) ->
	            count == 0
	            invokeThreeTimes =>
	              count++
	              WorkerRpc.lastMessageReceivedFrom.MyWorkerNamespace.respond key, count

	  worker thread:

	    {MyMainNamespace} = new WorkerRpc self,
	      register:
	        MyWorkerNamespace:
	          respond: (key, count) -> console.log "MyWorkerNamespace#respond: #{key} #{count}"
	      bind:
	        MyMainNamespace: ["doWorkAndRespond"]

	    MyMainNamespace.doWorkAndRespond "myKey"

	Usage - add to global registery:

	  WorkerRpc.register
	    MyGlobalClass:
	      doSomethingNoMatterWhoCalls: ->
	        ...
	 */

	debugPrefix = isWebWorker ? "WorkerRpc(worker)" : "WorkerRpc(browser)";

	module.exports = WorkerRpc = (function(superClass) {
	  extend(WorkerRpc, superClass);

	  WorkerRpc.singletonClass();

	  WorkerRpc.register = function(toRegister) {
	    return WorkerRpc.singleton.register(toRegister);
	  };

	  WorkerRpc.bind = function(toBind) {
	    return WorkerRpc.singleton._bind(toBind, false);
	  };

	  WorkerRpc.bindWithPromises = function(toBind) {
	    return WorkerRpc.singleton._bind(toBind, true);
	  };


	  /*
	  INPUT:
	    thread:
	      must implement onmessage= and postMessage or be null
	      In a webworker, this gets set to self if it is null.
	    options:
	      bind: map # invokes: @bind map
	      bindWithPromises: map # invokes: @bindWithPromises map
	   */

	  function WorkerRpc(thread, options) {
	    if (isString(thread)) {
	      log("WorkerRpc starting worker: " + thread);
	      thread = new Worker(thread);
	      log("WorkerRpc starting worker: " + thread + ", started?:", thread);
	    }
	    if (!(thread || self === self.window)) {
	      thread = self;
	    }
	    this._reset();
	    this._bindOnmessage(this._thread = thread);
	    if (options) {
	      this._applyOptions(options);
	    }
	  }

	  WorkerRpc.prototype.register = function(toRegister) {
	    var functionMap, namespaceName;
	    if (!toRegister) {
	      return;
	    }
	    for (namespaceName in toRegister) {
	      functionMap = toRegister[namespaceName];
	      if (this._registry.hasOwnProperty(namespaceName)) {
	        mergeInto(this._registry[namespaceName], functionMap);
	      } else {
	        this._registry[namespaceName] = functionMap;
	      }
	    }
	    return this._registry;
	  };


	  /*
	  Creates functions to make specific remote-procedure-calls.
	  
	  IN:
	    toBind: map to arrays of strings
	      Each key in the map specifies a namespace.
	      The array of strings specify the names of each RPC you want to be able to invoke.
	  
	  For a given namespaceName and functionName, this binds the function so you can
	  invoke it as follows:
	    @myNamespaceName.myFunctionName()
	  
	  The created functions are one-way. They return null as soon as the message has been sent
	  to the remote thread. If you want the results, see @bindWithPromises
	   */

	  WorkerRpc.prototype.bind = function(toBind) {
	    return this._bind(toBind, false);
	  };


	  /*
	  Same as @bind except each function created will return a promise which will return
	  the results return from the remote procedure call when they are ready.
	   */

	  WorkerRpc.prototype.bindWithPromises = function(toBind) {
	    return this._bind(toBind, true);
	  };

	  WorkerRpc.prototype._bind = function(toBind, withPromises) {
	    var functionName, functionNames, i, len, namespace, namespaceName, ref1;
	    if (!isFunction((ref1 = this._thread) != null ? ref1.postMessage : void 0)) {
	      throw new Error("@_thread.postMessage required for remote requests");
	    }
	    if (!toBind) {
	      return;
	    }
	    for (namespaceName in toBind) {
	      functionNames = toBind[namespaceName];
	      if (!this.hasOwnProperty(namespaceName)) {
	        this[namespaceName] = {};
	      }
	      namespace = this[namespaceName];
	      for (i = 0, len = functionNames.length; i < len; i++) {
	        functionName = functionNames[i];
	        namespace[functionName] = withPromises ? this._newRemoteRequestFunctionWithPromise(namespaceName, functionName) : this._newRemoteRequestFunction(namespaceName, functionName);
	      }
	    }
	    return null;
	  };

	  WorkerRpc.prototype._reset = function() {
	    return this._registry = {
	      promiseCallback: {
	        success: (function(_this) {
	          return function(promiseId, result) {
	            return WorkerRpc._resolvePromise(promiseId, result);
	          };
	        })(this),
	        error: (function(_this) {
	          return function(promiseId, error) {
	            return WorkerRpc._rejectPromise(promiseId, error);
	          };
	        })(this)
	      }
	    };
	  };

	  WorkerRpc.prototype._applyOptions = function(arg) {
	    var bind, bindWithPromises, register;
	    register = arg.register, bind = arg.bind, bindWithPromises = arg.bindWithPromises;
	    this.register(register);
	    this.bind(bind);
	    this.bindWithPromises(bindWithPromises);
	    return this;
	  };

	  WorkerRpc.prototype._send = function(namespaceName, functionName, promiseId, args) {
	    return this._thread.postMessage([namespaceName, functionName, promiseId, args]);
	  };

	  WorkerRpc.prototype._newRemoteRequestFunctionWithPromise = function(namespaceName, functionName) {
	    return (function(_this) {
	      return function() {
	        var args;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return WorkerRpc._bindPromise(function(promiseId) {
	          return _this._send(namespaceName, functionName, promiseId, args);
	        });
	      };
	    })(this);
	  };

	  WorkerRpc.prototype._newRemoteRequestFunction = function(namespaceName, functionName) {
	    return (function(_this) {
	      return function() {
	        var args;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return _this._send(namespaceName, functionName, null, args);
	      };
	    })(this);
	  };

	  WorkerRpc.prototype._bindOnmessage = function(thread) {
	    return thread != null ? thread.onmessage = (function(_this) {
	      return function(arg) {
	        var args, data, functionName, namespaceName, promiseId;
	        data = arg.data;
	        if (!isPlainArray(data)) {
	          return console.warn(debugPrefix + ": data was not an array", data);
	        }
	        namespaceName = data[0], functionName = data[1], promiseId = data[2], args = data[3];
	        return _this._invokeLocalFunction(namespaceName, functionName, promiseId, args);
	      };
	    })(this) : void 0;
	  };

	  WorkerRpc.prototype._invokeLocalFunction = function(namespaceName, functionName, promiseId, args) {
	    var localFunction, namespace, singleton;
	    if ((namespace = this._registry[namespaceName]) && (localFunction = namespace[functionName])) {
	      localFunction;
	    } else {
	      singleton = WorkerRpc.singleton;
	      if (this !== singleton && (namespace = singleton._registry[namespaceName]) && (localFunction = namespace[functionName])) {
	        localFunction;
	      }
	    }
	    if (!localFunction) {
	      console.warn(debugPrefix + "_onmessage: could not find: '" + namespaceName + "." + functionName + "'\n\nnamespaces: " + (Object.keys(this._registry).join(', ')) + "\nglobal namespaces: " + (singleton === this ? "(same)" : Object.keys(singleton._registry).join(', ')));
	    }
	    if (localFunction) {
	      WorkerRpc.lastMessageReceivedFrom = this;
	      return this._resolveOrRejectRemotePromise(promiseId, localFunction.apply(namespace, args));
	    }
	  };

	  WorkerRpc.prototype._resolveOrRejectRemotePromise = function(promiseId, result) {
	    if (promiseId == null) {
	      return;
	    }
	    return Promise.resolve(result).then((function(_this) {
	      return function(result) {
	        return _this._send("promiseCallback", "success", null, [promiseId, result], function(error) {
	          return _this._send("promiseCallback", "error", null, [promiseId, error]);
	        });
	      };
	    })(this));
	  };


	  /*
	  IN:   f: (promiseId) -> ignored
	  OUT:  promise
	  
	  Creates a new promise, addes it to @_promises with a unique id, and invokes f, passing in
	  the promise's id.
	   */

	  WorkerRpc._promises = {};

	  WorkerRpc._nextPromiseId = 0;

	  WorkerRpc._bindPromise = function(f) {
	    var promise, promiseId;
	    this._promises[promiseId = this._nextPromiseId++] = promise = new Promise;
	    f(promiseId);
	    return promise;
	  };

	  WorkerRpc._resolvePromise = function(promiseId, result) {
	    var ref1;
	    if ((ref1 = this._promises[promiseId]) != null) {
	      ref1.resolve(result);
	    }
	    return delete this._promises[promiseId];
	  };

	  WorkerRpc._rejectPromise = function(promiseId, error) {
	    var ref1;
	    if ((ref1 = this._promises[promiseId]) != null) {
	      ref1.reject(error);
	    }
	    return delete this._promises[promiseId];
	  };

	  return WorkerRpc;

	})(BaseObject);


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, Tag, binary, stream,
	  slice = [].slice;

	Binary = __webpack_require__(8).Binary;

	binary = Binary.binary;

	stream = Binary.stream;

	module.exports = Tag = (function() {
	  Tag.parse = function(stream, tagsd, attrsd, valuesd) {
	    var attr_data, attributes, n, name, name1, subTag, tag_data, tags, v;
	    tag_data = stream.read_asi_string();
	    name = tagsd.read_string(tag_data).toString();
	    attr_data = tag_data.read_asi_string();
	    attributes = null;
	    while (!attr_data.done()) {
	      if (!attributes) {
	        attributes = {};
	      }
	      n = attrsd.read_string(attr_data).toString();
	      v = valuesd.read_string(attr_data);
	      attributes[n] = v;
	    }
	    tags = [];
	    while (!tag_data.done()) {
	      subTag = Xbd.Tag.parse(tag_data, tagsd, attrsd, valuesd);
	      tags.push(subTag);
	      tags[name1 = subTag.name] || (tags[name1] = subTag);
	    }
	    return new Xbd.Tag(name, attributes, tags);
	  };

	  function Tag(name, attributes, tags) {
	    if (attributes == null) {
	      attributes = {};
	    }
	    if (tags == null) {
	      tags = [];
	    }
	    this.name = name;
	    this.attributes = attributes;
	    if (tags instanceof Function) {
	      this.tags = [];
	      tags(this);
	    } else {
	      this.tags = tags;
	    }
	  }

	  Tag.prototype.add = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return this.tags.push((function(func, args, ctor) {
	      ctor.prototype = func.prototype;
	      var child = new ctor, result = func.apply(child, args);
	      return Object(result) === result ? result : child;
	    })(Xbd.Tag, args, function(){}));
	  };

	  Tag.prototype.tag = function(name) {
	    var i, len, ref, tag;
	    ref = this.tags;
	    for (i = 0, len = ref.length; i < len; i++) {
	      tag = ref[i];
	      if (tag.name === name) {
	        return tag;
	      }
	    }
	    return null;
	  };

	  Tag.prototype.decode_attribute_values = function(func) {
	    var i, k, len, ref, ref1, results, t, v;
	    ref = this.attributes;
	    for (k in ref) {
	      v = ref[k];
	      this.attributes[k] = func(v, k, this.name);
	    }
	    ref1 = this.tags;
	    results = [];
	    for (i = 0, len = ref1.length; i < len; i++) {
	      t = ref1[i];
	      results.push(t.decode_attribute_values(func));
	    }
	    return results;
	  };

	  Tag.prototype.toString = function() {
	    return this.toXml("  ");
	  };

	  Tag.prototype.attributesXml = function() {
	    var k, out, v;
	    out = (function() {
	      var ref, results;
	      ref = this.attributes;
	      results = [];
	      for (k in ref) {
	        v = ref[k];
	        results.push(k + "='" + v + "'");
	      }
	      return results;
	    }).call(this);
	    return out.join(" ");
	  };

	  Tag.prototype.tagsXml = function(indent) {
	    var out;
	    out = this.tags.map(function(tag) {
	      return tag.toXml(indent);
	    });
	    return Xbd.indent(out.join("\n"), indent);
	  };

	  Tag.prototype.toXml = function(indent) {
	    var attr_xml;
	    if (indent == null) {
	      indent = "";
	    }
	    attr_xml = "";
	    if (this.attributes && (attr_xml = this.attributesXml())) {
	      attr_xml = " " + attr_xml;
	    }
	    if (this.tags.length === 0) {
	      return "<" + this.name + attr_xml + "/>";
	    } else {
	      return "<" + this.name + attr_xml + ">\n" + (this.tagsXml(indent)) + "\n</" + this.name + ">";
	    }
	  };

	  return Tag;

	})();


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var Binary, Dictionary, Tag, Xbd, stream;

	Binary = __webpack_require__(8).Binary;

	stream = Binary.stream;

	Tag = __webpack_require__(79);

	Dictionary = __webpack_require__(7);

	module.exports = Xbd = __webpack_require__(3);

	Xbd.indent = function(str, indentStr) {
	  return indentStr + str.split("\n").join("\n" + indentStr);
	};

	Xbd.parse = function(input) {
	  var attrsd, header, header_should_match, tagsd, valuesd;
	  input = stream(input);
	  header_should_match = "SBDXML\x01\x00";
	  header = input.read(header_should_match.length);
	  tagsd = Xbd.Dictionary.parse(input, "tag names");
	  attrsd = Xbd.Dictionary.parse(input, "attribute names");
	  valuesd = Xbd.Dictionary.parse(input, "attribute values");
	  return Xbd.Tag.parse(input, tagsd, attrsd, valuesd);
	};


/***/ }
/******/ ]);