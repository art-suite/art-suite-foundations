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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseObject, ConfigRegistry, Promise, deepMerge, defineModule, expandPathedProperties, formattedInspect, inspect, isPlainObject, isString, log, merge, mergeInto, parseQuery, pushIfNotPresent, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(3), defineModule = ref.defineModule, log = ref.log, Promise = ref.Promise, inspect = ref.inspect, formattedInspect = ref.formattedInspect, merge = ref.merge, deepMerge = ref.deepMerge, mergeInto = ref.mergeInto, parseQuery = ref.parseQuery, pushIfNotPresent = ref.pushIfNotPresent, isPlainObject = ref.isPlainObject, isString = ref.isString, upperCamelCase = ref.upperCamelCase, expandPathedProperties = ref.expandPathedProperties;

BaseObject = __webpack_require__(2).BaseObject;

defineModule(module, ConfigRegistry = (function(superClass) {
  var defaultArtConfigName;

  extend(ConfigRegistry, superClass);

  function ConfigRegistry() {
    return ConfigRegistry.__super__.constructor.apply(this, arguments);
  }

  ConfigRegistry.artConfigName = defaultArtConfigName = "Development";

  ConfigRegistry.artConfig = {};

  ConfigRegistry.configurables = [];

  ConfigRegistry.configs = {};

  ConfigRegistry.registerConfig = function(name, config) {
    if (!isPlainObject(config)) {
      throw new Error("config must be a plain object");
    }
    return ConfigRegistry.configs[name] = config;
  };

  ConfigRegistry.registerConfigurable = function(configurable) {
    return pushIfNotPresent(ConfigRegistry.configurables, configurable);
  };


  /*
  IN: configureOptions:
    artConfigName: string
      can be passed in:
        as an argument
        via process.env
        via the browser query string
  
      default: "Development"
  
      EFFECT:
        @artConfigName =
          externalEnvironment.artConfigName ||
          artConfigName
  
    artConfig: JSON string OR plain object structure
      can be passed in:
        as an argument
        via process.env
        via the browser query string
  
      default: {}
  
      EFFECT:
        mergeInto @artConfig, deepMerge
          @configs[artConfigName]
          global.artConfig
          artConfig
          externalEnvironment.artConfig
  
    IF artConfig IS NOT SET:
      artConfig is set to a clone of configureOptions with artConfigName removed.
  
  EFFECTS:
    callback @artConfig for callback in @configurables
  
  Note the priority order of artConfig sources:
  
  Priority:
    #1. externalEnvironment.artConfig
    #2. the artConfig passed into configure
  
  
  EXAMPLES:
     * artConfig = verbose: true
    ConfigRegistry.configure
      verbose: true
  
     * artConfig = verbose: true
     * artConfigName = "Production"
    ConfigRegistry.configure
      artConfigName: "Production"
      verbose: true
  
     * artConfig = verbose: true
     * artConfigName = "Production"
    ConfigRegistry.configure
      artConfigName: "Production"
      artConfig: verbose: true
  
  TEST INPUTS: the second and third inputs are env and
    queryString, and are only there as mocks for testing.
   */

  ConfigRegistry.configure = function() {
    var __testEnv, __testQueryString, artConfigArgument, artConfigGlobal, artConfigNameArgument, c, conf, config, configureOptions, externalEnvironment, i, j, len, len1, name, obj, obj1, ref1, ref2, ref3, ref4, verbose;
    configureOptions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ref1 = ConfigRegistry.configureOptions = deepMerge.apply(null, configureOptions), artConfigNameArgument = ref1.artConfigName, artConfigArgument = ref1.artConfig, __testEnv = ref1.__testEnv, __testQueryString = ref1.__testQueryString;
    if (!artConfigArgument) {
      artConfigArgument = merge(ConfigRegistry.configureOptions);
      delete artConfigArgument.artConfigName;
    }
    artConfigGlobal = global.artConfig;
    externalEnvironment = ConfigRegistry.getExternalEnvironment(__testEnv, __testQueryString);
    ConfigRegistry.artConfigName = externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName;
    ConfigRegistry.artConfigName = ConfigRegistry.normalizeArtConfigName(ConfigRegistry.artConfigName);
    if (ConfigRegistry.artConfigName && !ConfigRegistry.configs[ConfigRegistry.artConfigName]) {
      throw new Error("no config registered with name: " + ConfigRegistry.artConfigName);
    }
    ConfigRegistry.artConfigName || (ConfigRegistry.artConfigName = defaultArtConfigName);
    ConfigRegistry.resetCurrentConfig();
    ref2 = [ConfigRegistry.configs[ConfigRegistry.artConfigName], artConfigGlobal, artConfigArgument, externalEnvironment.artConfig];
    for (i = 0, len = ref2.length; i < len; i++) {
      conf = ref2[i];
      expandPathedProperties(conf, ConfigRegistry.artConfig);
    }
    verbose = ConfigRegistry.artConfig.verbose;
    if (verbose) {
      log("------------- ConfigRegistry: inputs");
      log({
        ConfigRegistry: {
          configs: Object.keys(ConfigRegistry.configs),
          configurables: (function() {
            var j, len1, ref3, results;
            ref3 = this.configurables;
            results = [];
            for (j = 0, len1 = ref3.length; j < len1; j++) {
              c = ref3[j];
              results.push(c.namespacePath);
            }
            return results;
          }).call(ConfigRegistry),
          artConfigName: {
            algorithm: "select first non-null",
            inputs: {
              fromExternalEnvironment: externalEnvironment.artConfigName,
              fromArguments: artConfigNameArgument,
              "default": defaultArtConfigName
            }
          },
          artConfig: {
            algorithm: "deep merge all, last has priority",
            inputs: {
              selected_config: (
                obj = {},
                obj["" + ConfigRegistry.artConfigName] = ConfigRegistry.configs[ConfigRegistry.artConfigName],
                obj
              ),
              "global.artConfig": artConfigGlobal,
              "arguments": artConfigArgument,
              environment: externalEnvironment.artConfig
            }
          }
        }
      });
    }
    verbose && log("------------- ConfigRegistry: combined config");
    verbose && log({
      ConfigRegistry: {
        artConfigName: ConfigRegistry.artConfigName,
        artConfig: ConfigRegistry.artConfig
      }
    });
    verbose && log("------------- ConfigRegistry: configuring Configurables...");
    ConfigRegistry._configureAllConfigurables();
    verbose && log("------------- ConfigRegistry: Configurables configured");
    if (verbose) {
      ref3 = ConfigRegistry.configurables;
      for (j = 0, len1 = ref3.length; j < len1; j++) {
        ref4 = ref3[j], name = ref4.name, config = ref4.config;
        log((
          obj1 = {},
          obj1["" + name] = config,
          obj1
        ));
      }
    }
    return verbose && log("------------- ConfigRegistry: done");
  };

  ConfigRegistry.resetCurrentConfig = function() {
    var k, ref1, results, v;
    ref1 = ConfigRegistry.artConfig;
    results = [];
    for (k in ref1) {
      v = ref1[k];
      results.push(delete ConfigRegistry.artConfig[k]);
    }
    return results;
  };

  ConfigRegistry.reload = function() {
    return ConfigRegistry.configure(ConfigRegistry.configureOptions);
  };

  ConfigRegistry.getExternalEnvironment = function(env, queryString) {
    var artConfig, artConfigName, e, externalEnvironment, ref1, ref2, ref3;
    if (env == null) {
      env = (ref1 = global.process) != null ? ref1.env : void 0;
    }
    if (queryString == null) {
      queryString = (ref2 = global.location) != null ? ref2.search : void 0;
    }
    ref3 = externalEnvironment = merge(env, parseQuery(queryString)), artConfig = ref3.artConfig, artConfigName = ref3.artConfigName;
    artConfig = (function() {
      if (isPlainObject(artConfig)) {
        return artConfig;
      } else if (isString(artConfig)) {
        try {
          return JSON.parse(artConfig);
        } catch (error) {
          e = error;
          log.error("\nInvalid 'artConfig' from externalEnvironment. Must be valid JSON.\n\n" + (formattedInspect({
            externalEnvironment: externalEnvironment
          })) + "\n\nartConfig: " + (formattedInspect(artConfig)) + "\n\nerror: " + e + "\n");
          return null;
        }
      }
    })();
    return {
      artConfig: artConfig,
      artConfigName: artConfigName
    };
  };


  /*
  normalized:
    map standard aliases (dev and prod)
    upperCamelCase
   */

  ConfigRegistry.normalizeArtConfigName = function(artConfigName) {
    switch (artConfigName) {
      case "dev":
        return "Development";
      case "prod":
        return "Production";
      default:
        return artConfigName && upperCamelCase(artConfigName);
    }
  };

  ConfigRegistry._configureAllConfigurables = function() {
    var configurable, i, j, len, len1, ref1, ref2, results;
    ref1 = this.configurables;
    for (i = 0, len = ref1.length; i < len; i++) {
      configurable = ref1[i];
      configurable.configure(this.artConfig);
    }
    ref2 = this.configurables;
    results = [];
    for (j = 0, len1 = ref2.length; j < len1; j++) {
      configurable = ref2[j];
      results.push(configurable.configured());
    }
    return results;
  };

  return ConfigRegistry;

})(BaseObject));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseObject, ConfigRegistry, Configuration, defineModule, log, merge, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(3), defineModule = ref.defineModule, log = ref.log, merge = ref.merge;

BaseObject = __webpack_require__(2).BaseObject;

ConfigRegistry = __webpack_require__(0);

defineModule(module, Configuration = (function(superClass) {
  extend(Configuration, superClass);

  function Configuration() {
    return Configuration.__super__.constructor.apply(this, arguments);
  }

  Configuration.abstractClass();

  Configuration.register = function() {
    return ConfigRegistry.registerConfig(this.getName(), this.getProps());
  };

  Configuration.postCreateConcreteClass = function(arg) {
    var hotReloaded;
    hotReloaded = arg.hotReloaded;
    this.register();
    if (hotReloaded) {
      ConfigRegistry.reload();
    }
    return Configuration.__super__.constructor.postCreateConcreteClass.apply(this, arguments);
  };

  Configuration.getProps = function() {
    return this.getConcretePrototypeProperties();
  };

  return Configuration;

})(BaseObject));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(10);

module.exports = Art.Config || Art.addNamespace('Config', Config = (function(superClass) {
  extend(Config, superClass);

  function Config() {
    return Config.__super__.constructor.apply(this, arguments);
  }

  return Config;

})(Neptune.Base));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);

module.exports.includeInNamespace(__webpack_require__(8)).addModules({
  ConfigRegistry: __webpack_require__(0),
  Configurable: __webpack_require__(9),
  Configuration: __webpack_require__(4)
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  {
    Config: __webpack_require__(4)
  }, [__webpack_require__(0), "configure"]
];


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, ConfigRegistry, Configurable, EventedMixin, deepMerge, defineModule, isPlainObject, log, merge, mergeInto, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(3), defineModule = ref.defineModule, log = ref.log, merge = ref.merge, isPlainObject = ref.isPlainObject, mergeInto = ref.mergeInto, deepMerge = ref.deepMerge, isPlainObject = ref.isPlainObject;

BaseClass = __webpack_require__(2).BaseClass;

ConfigRegistry = __webpack_require__(0);

EventedMixin = __webpack_require__(11).EventedMixin;


/*

TO USE:
1) Inherit from Configurable and
2) OPTIONAL: call @defaults to set configuration defaults
3) OPTIONAL, override one of:
  @configure
  @preprocessConfig
  @configured
 */

defineModule(module, Configurable = (function(superClass) {
  extend(Configurable, superClass);

  function Configurable() {
    return Configurable.__super__.constructor.apply(this, arguments);
  }

  Configurable.abstractClass();

  Configurable.defaults = function() {
    var defaults;
    defaults = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.defaultConfig = merge.apply(null, defaults);
  };

  Configurable.getDefaults = function() {
    return this.defaultConfig;
  };

  Configurable.reset = function() {
    var k, ref1, ref2, v;
    if (this.config) {
      ref1 = this.config;
      for (k in ref1) {
        v = ref1[k];
        delete this.config[k];
      }
    } else {
      this.config = {};
    }
    if (this.defaultConfig) {
      mergeInto(this.config, this.defaultConfig);
    }
    if ((ref2 = this.namespace) != null) {
      ref2.config = this.config;
    }
    return this.config;
  };

  Configurable.getInspectedObjects = function() {
    var obj;
    return (
      obj = {},
      obj["" + (this.getConfigurationPath().join('.'))] = this.config,
      obj
    );
  };

  Configurable.configure = function(config) {
    var k, ref1, results, v;
    this.reset();
    ref1 = this.getPathedConfiguration(config);
    results = [];
    for (k in ref1) {
      v = ref1[k];
      if (k.match(/^[^A-Z]/)) {
        results.push(this.config[k] = isPlainObject(v) ? deepMerge(this.config[k], v) : v);
      }
    }
    return results;
  };

  Configurable.on = function() {
    var a, ref1;
    a = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return (ref1 = this.getSingleton()).on.apply(ref1, a);
  };

  Configurable.configured = function() {
    return this.getSingleton().handleEvent("configured");
  };

  Configurable.getConfigurationPath = function() {
    var _Configurable, _Neptune, i, path, ref1;
    ref1 = this.getNamespacePath().split('.'), _Neptune = ref1[0], path = 3 <= ref1.length ? slice.call(ref1, 1, i = ref1.length - 1) : (i = 1, []), _Configurable = ref1[i++];
    return path;
  };

  Configurable.getPathedConfiguration = function(globalConfig) {
    var el, i, len, ref1;
    ref1 = this.getConfigurationPath();
    for (i = 0, len = ref1.length; i < len; i++) {
      el = ref1[i];
      globalConfig = globalConfig != null ? globalConfig[el] : void 0;
    }
    return globalConfig;
  };

  Configurable._register = function() {
    this.reset();
    return ConfigRegistry.registerConfigurable(this);
  };

  Configurable.postCreateConcreteClass = function(arg) {
    var hotReloaded;
    hotReloaded = arg.hotReloaded;
    if (hotReloaded) {
      ConfigRegistry.reload();
    } else {
      this._register();
    }
    return Configurable.__super__.constructor.postCreateConcreteClass.apply(this, arguments);
  };

  return Configurable;

})(EventedMixin(BaseClass)));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(12);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));

__webpack_require__(5);


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("art-events");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ })
/******/ ]);