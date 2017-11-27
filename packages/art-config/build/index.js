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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseObject, ConfigRegistry, Promise, clone, compactFlatten, deepMerge, defineModule, expandPathedProperties, formattedInspect, inspect, isPlainObject, isString, log, merge, mergeInto, parseQuery, pushIfNotPresent, ref, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(1), defineModule = ref.defineModule, log = ref.log, Promise = ref.Promise, inspect = ref.inspect, formattedInspect = ref.formattedInspect, merge = ref.merge, deepMerge = ref.deepMerge, mergeInto = ref.mergeInto, parseQuery = ref.parseQuery, pushIfNotPresent = ref.pushIfNotPresent, isPlainObject = ref.isPlainObject, isString = ref.isString, upperCamelCase = ref.upperCamelCase, expandPathedProperties = ref.expandPathedProperties, clone = ref.clone, compactFlatten = ref.compactFlatten;

BaseObject = __webpack_require__(3).BaseObject;

defineModule(module, ConfigRegistry = (function(superClass) {
  extend(ConfigRegistry, superClass);

  function ConfigRegistry() {
    return ConfigRegistry.__super__.constructor.apply(this, arguments);
  }

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

  ConfigRegistry.configure = function() {
    var args, ref1;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    console.error("DEPRICATED: use Art.Config.configure");
    return (ref1 = Neptune.Art.Config).configure.apply(ref1, args);
  };

  return ConfigRegistry;

})(BaseObject));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseObject, ConfigRegistry, Configuration, defineModule, log, merge, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(1), defineModule = ref.defineModule, log = ref.log, merge = ref.merge;

BaseObject = __webpack_require__(3).BaseObject;

ConfigRegistry = __webpack_require__(2);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var Lib, Promise, clone, compactFlatten, deepMerge, defineModule, expandPathedProperties, formattedInspect, getEnv, inspect, isPlainObject, isString, jsonParsableRegexp, log, merge, mergeInto, parseQuery, pushIfNotPresent, ref, upperCamelCase;

ref = __webpack_require__(1), defineModule = ref.defineModule, log = ref.log, Promise = ref.Promise, inspect = ref.inspect, formattedInspect = ref.formattedInspect, merge = ref.merge, deepMerge = ref.deepMerge, mergeInto = ref.mergeInto, parseQuery = ref.parseQuery, pushIfNotPresent = ref.pushIfNotPresent, isPlainObject = ref.isPlainObject, isString = ref.isString, upperCamelCase = ref.upperCamelCase, expandPathedProperties = ref.expandPathedProperties, clone = ref.clone, compactFlatten = ref.compactFlatten, getEnv = ref.getEnv;

jsonParsableRegexp = /^(\[.*\]|\{.*\}|\".*\"|((-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|true|false|null))$/;

defineModule(module, Lib = (function() {
  var smartJsonDecode;

  function Lib() {}

  Lib.smartJsonDecode = smartJsonDecode = function(value) {
    if (isString(value) && jsonParsableRegexp.test(value)) {
      return JSON.parse(value);
    } else {
      return value != null ? value : null;
    }
  };

  Lib.getExternalEnvironment = function(externalEnvironment) {
    var artConfig, artConfigName, e, k, m, v;
    if (externalEnvironment == null) {
      externalEnvironment = getEnv();
    }
    artConfig = externalEnvironment.artConfig, artConfigName = externalEnvironment.artConfigName;
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
      } else {
        return {};
      }
    })();
    for (k in externalEnvironment) {
      v = externalEnvironment[k];
      if (m = k.match(/^artConfig([\._])(.+)$/)) {
        if (m[1] === "_") {
          artConfig[m[2].replace(/_/g, '.')] = smartJsonDecode(v);
        } else {
          artConfig[m[2]] = smartJsonDecode(v);
        }
      }
    }
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

  Lib.normalizeArtConfigName = function(artConfigName) {
    switch (artConfigName) {
      case "dev":
        return "Development";
      case "prod":
        return "Production";
      default:
        return artConfigName && upperCamelCase(artConfigName);
    }
  };

  return Lib;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseObject, ConfigRegistry, Main, Promise, clone, compactFlatten, deepMerge, defineModule, expandPathedProperties, formattedInspect, getExternalEnvironment, inspect, isPlainObject, isString, log, merge, mergeInto, normalizeArtConfigName, parseQuery, pushIfNotPresent, ref, ref1, upperCamelCase,
  slice = [].slice;

ref = __webpack_require__(1), defineModule = ref.defineModule, log = ref.log, Promise = ref.Promise, inspect = ref.inspect, formattedInspect = ref.formattedInspect, merge = ref.merge, deepMerge = ref.deepMerge, mergeInto = ref.mergeInto, parseQuery = ref.parseQuery, pushIfNotPresent = ref.pushIfNotPresent, isPlainObject = ref.isPlainObject, isString = ref.isString, upperCamelCase = ref.upperCamelCase, expandPathedProperties = ref.expandPathedProperties, clone = ref.clone, compactFlatten = ref.compactFlatten;

BaseObject = __webpack_require__(3).BaseObject;

ConfigRegistry = __webpack_require__(2);

ref1 = __webpack_require__(5), normalizeArtConfigName = ref1.normalizeArtConfigName, getExternalEnvironment = ref1.getExternalEnvironment;

defineModule(module, Main = (function() {
  var defaultArtConfigName;

  function Main() {}

  Main.artConfigName = defaultArtConfigName = "Development";

  Main.artConfig = {};


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
          ConfigRegistry.configs[artConfigName]
          global.artConfig
          artConfig
          externalEnvironment.artConfig
  
  EFFECTS:
    callback @artConfig for callback in ConfigRegistry.configurables
  
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

  Main.configure = function() {
    var __testEnv, artConfigArgument, artConfigNameArgument, c, conf, configurable, configureOptions, externalEnvironment, i, len, obj, ref2, ref3, ref4, verbose;
    configureOptions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ref2 = Main.configureOptions = deepMerge.apply(null, configureOptions), artConfigNameArgument = ref2.artConfigName, artConfigArgument = ref2.artConfig, __testEnv = ref2.__testEnv;
    externalEnvironment = getExternalEnvironment(__testEnv);
    Main.artConfigName = externalEnvironment.artConfigName || artConfigNameArgument || global.artConfigName;
    Main.artConfigName = normalizeArtConfigName(Main.artConfigName);
    if (Main.artConfigName && !ConfigRegistry.configs[Main.artConfigName]) {
      throw new Error("no config registered with name: " + Main.artConfigName);
    }
    Main.artConfigName || (Main.artConfigName = defaultArtConfigName);
    Neptune.Art.Config.configName = Neptune.Art.configName = Main.artConfigName;
    Neptune.Art.Config.config = Neptune.Art.config = Main.artConfig;
    Main.resetCurrentConfig();
    ref3 = compactFlatten([
      (function() {
        var j, len, ref3, results;
        ref3 = ConfigRegistry.configurables;
        results = [];
        for (j = 0, len = ref3.length; j < len; j++) {
          configurable = ref3[j];
          results.push(configurable.getPathedDefaultConfig());
        }
        return results;
      })(), ConfigRegistry.configs[Main.artConfigName], global.artConfig, artConfigArgument, externalEnvironment.artConfig
    ]);
    for (i = 0, len = ref3.length; i < len; i++) {
      conf = ref3[i];
      expandPathedProperties(conf, Main.artConfig);
    }
    verbose = Main.artConfig.verbose;
    verbose || (verbose = (ref4 = Main.configureOptions) != null ? ref4.verbose : void 0);
    if (verbose) {
      log("------------- ConfigRegistry: inputs");
      log({
        ConfigRegistry: {
          configNames: Object.keys(ConfigRegistry.configs),
          configurables: (function() {
            var j, len1, ref5, results;
            ref5 = ConfigRegistry.configurables;
            results = [];
            for (j = 0, len1 = ref5.length; j < len1; j++) {
              c = ref5[j];
              results.push(c.namespacePath);
            }
            return results;
          })(),
          setConfigName: {
            algorithm: "select LAST non-null",
            inputs: {
              defaultArtConfigName: defaultArtConfigName,
              "global.artConfigName": global.artConfigName,
              "arguments.artConfigName": artConfigNameArgument,
              "environment.artConfigName": externalEnvironment.artConfigName
            }
          },
          setConfig: {
            algorithm: "deep, pathed merge-all, LAST has priority",
            inputs: (
              obj = {
                defaultConfigs: (function() {
                var j, len1, ref5, results;
                ref5 = ConfigRegistry.configurables;
                results = [];
                for (j = 0, len1 = ref5.length; j < len1; j++) {
                  configurable = ref5[j];
                  results.push(configurable.getPathedDefaultConfig());
                }
                return results;
              })()
              },
              obj["configs." + Main.artConfigName] = ConfigRegistry.configs[Main.artConfigName],
              obj["global.artConfig"] = global.artConfig,
              obj["arguments.artConfig"] = artConfigArgument,
              obj["environment.artConfig"] = externalEnvironment.artConfig,
              obj
            )
          }
        }
      });
      log("------------- ConfigRegistry: configuring Configurables...");
    }
    Main._configureAllConfigurables();
    if (verbose) {
      log("------------- ConfigRegistry: configured");
      log({
        Art: {
          configName: Main.artConfigName,
          config: Main.artConfig
        }
      });
      return log("------------- ConfigRegistry: done");
    }
  };

  Main.resetCurrentConfig = function() {
    var k, ref2, results, v;
    ref2 = Main.artConfig;
    results = [];
    for (k in ref2) {
      v = ref2[k];
      results.push(delete Main.artConfig[k]);
    }
    return results;
  };

  Main.reload = function() {
    return Main.configure(Main.configureOptions);
  };

  Main._configureAllConfigurables = function() {
    var configurable, i, len, ref2;
    ref2 = ConfigRegistry.configurables;
    for (i = 0, len = ref2.length; i < len; i++) {
      configurable = ref2[i];
      configurable.configure(this.artConfig);
    }
    return this._notifyConfigurablesConfigured();
  };

  Main._notifyConfigurablesConfigured = function() {
    var configurable, i, len, ref2, results;
    ref2 = ConfigRegistry.configurables;
    results = [];
    for (i = 0, len = ref2.length; i < len; i++) {
      configurable = ref2[i];
      results.push(configurable.configured());
    }
    return results;
  };

  return Main;

})());

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);

module.exports.includeInNamespace(__webpack_require__(9)).addModules({
  ConfigRegistry: __webpack_require__(2),
  Configurable: __webpack_require__(10),
  Configuration: __webpack_require__(4),
  Lib: __webpack_require__(5),
  Main: __webpack_require__(6)
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = [
  {
    Config: __webpack_require__(4)
  }, __webpack_require__(6)
];


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, ConfigRegistry, Configurable, EventedMixin, deepMerge, defineModule, isPlainObject, log, merge, mergeInto, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ref = __webpack_require__(1), defineModule = ref.defineModule, log = ref.log, merge = ref.merge, isPlainObject = ref.isPlainObject, mergeInto = ref.mergeInto, deepMerge = ref.deepMerge, isPlainObject = ref.isPlainObject;

BaseClass = __webpack_require__(3).BaseClass;

ConfigRegistry = __webpack_require__(2);

EventedMixin = __webpack_require__(13).EventedMixin;


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

  Configurable.getDefaultConfig = function() {
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
      obj["" + (this.getConfigurationPathString())] = this.config,
      obj
    );
  };

  Configurable.getPathedDefaultConfig = function() {
    var obj;
    return (
      obj = {},
      obj["" + (this.getConfigurationPathString())] = this.getDefaultConfig(),
      obj
    );
  };

  Configurable.configure = function(globalConfig) {
    var obj;
    globalConfig.verbose && log({
      Configurable: (
        obj = {},
        obj["" + (this.getConfigurationPathString())] = this.getConfigurationFromPath(globalConfig),
        obj
      )
    });
    this.reset();
    return mergeInto(this.config, this.getConfigurationFromPath(globalConfig));
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

  Configurable.getConfigurationPathString = function() {
    return this.getConfigurationPath().join('.');
  };

  Configurable.getConfigurationFromPath = function(config, path) {
    var el, i, len;
    if (path == null) {
      path = this.getConfigurationPath();
    }
    for (i = 0, len = path.length; i < len; i++) {
      el = path[i];
      config = config != null ? config[el] : void 0;
    }
    return config;
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(14)).addNamespace('Art.Config', Config = (function(superClass) {
  extend(Config, superClass);

  function Config() {
    return Config.__super__.constructor.apply(this, arguments);
  }

  Config.version = __webpack_require__(12).version;

  return Config;

})(Neptune.PackageNamespace));


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-events":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.0","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.1","chai":"^4.0.1","coffee-loader":"^0.7.3","coffee-script":"^1.12.6","colors":"^1.1.2","commander":"^2.9.0","css-loader":"^0.28.4","dateformat":"^2.0.0","detect-node":"^2.0.3","fs-extra":"^3.0.1","glob":"^7.1.2","glob-promise":"^3.1.0","json-loader":"^0.5.4","mocha":"^3.4.2","neptune-namespaces":"*","script-loader":"^0.7.0","style-loader":"^0.18.1","webpack":"^2.6.1","webpack-dev-server":"^2.4.5","webpack-merge":"^4.1.0","webpack-node-externals":"^1.6.0"},"description":"A powerful yet simple tool for configuring all your libraries consistently.","license":"ISC","name":"art-config","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.7.1"}

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("art-events");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ })
/******/ ]);