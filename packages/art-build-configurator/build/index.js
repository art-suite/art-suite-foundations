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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Art, BuildConfigurator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(15);

module.exports = Art.BuildConfigurator || Art.addNamespace('BuildConfigurator', BuildConfigurator = (function(superClass) {
  extend(BuildConfigurator, superClass);

  function BuildConfigurator() {
    return BuildConfigurator.__super__.constructor.apply(this, arguments);
  }

  return BuildConfigurator;

})(Neptune.Base));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14).addModules({
  StandardDependencies: __webpack_require__(7),
  StandardPackageJson: __webpack_require__(12),
  StandardWebpackConfig: __webpack_require__(13)
});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, BuildConfigurator, ConfigurePackageJson, StandardPackageJson, consistentJsonStringify, deepMerge, defineModule, fs, isPlainObject, path, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(1), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, deepMerge = ref.deepMerge, consistentJsonStringify = ref.consistentJsonStringify;

fs = __webpack_require__(4);

path = __webpack_require__(2);

BaseClass = __webpack_require__(9).BaseClass;

StandardPackageJson = __webpack_require__(3).StandardPackageJson;

BuildConfigurator = __webpack_require__(0);

defineModule(module, ConfigurePackageJson = (function(superClass) {
  extend(ConfigurePackageJson, superClass);

  function ConfigurePackageJson() {
    return ConfigurePackageJson.__super__.constructor.apply(this, arguments);
  }

  ConfigurePackageJson.outFileName = "package.json";


  /*
  IN:
   */

  ConfigurePackageJson.get = function(npmRoot, abcConfig) {
    return deepMerge(StandardPackageJson.get(abcConfig), abcConfig.npm);
  };


  /*
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
   */

  ConfigurePackageJson.writeConfig = function(npmRoot, abcConfig) {
    var contents, packageConfig;
    packageConfig = ConfigurePackageJson.get(npmRoot, abcConfig);
    contents = consistentJsonStringify(packageConfig, "  ");
    return BuildConfigurator.updateFile(path.join(npmRoot, "package.json"), contents + "\n");
  };

  return ConfigurePackageJson;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, BuildConfigurator, ConfigureWebpack, StandardWebpackConfig, array, compactFlatten, deepMerge, defineModule, fs, isPlainObject, log, merge, nodeExternals, object, objectKeyCount, path, ref, webpackMerge, webpackNodeExternals,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

nodeExternals = null;

ref = __webpack_require__(1), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, array = ref.array, object = ref.object, deepMerge = ref.deepMerge, log = ref.log, compactFlatten = ref.compactFlatten, objectKeyCount = ref.objectKeyCount, merge = ref.merge;

webpackMerge = __webpack_require__(20);

webpackNodeExternals = __webpack_require__(21);

BaseClass = __webpack_require__(9).BaseClass;

fs = __webpack_require__(4);

path = __webpack_require__(2);

BuildConfigurator = __webpack_require__(0);

StandardWebpackConfig = __webpack_require__(3).StandardWebpackConfig;

defineModule(module, ConfigureWebpack = (function(superClass) {
  extend(ConfigureWebpack, superClass);

  function ConfigureWebpack() {
    return ConfigureWebpack.__super__.constructor.apply(this, arguments);
  }


  /*
  IN:
    common: webpack config shared
    targets:
      myEntry: my target's overrides
   */

  ConfigureWebpack.get = function(npmRoot, abcConfig) {
    var baseConfig, common, config, entriesWithNoOverrides, standard, targets;
    if (abcConfig == null) {
      abcConfig = {};
    }
    config = abcConfig.webpack || (abcConfig.webpack = {});
    common = config.common, targets = config.targets;
    standard = StandardWebpackConfig.get(npmRoot, abcConfig);
    baseConfig = webpackMerge(standard, common);
    targets || (targets = {
      index: {}
    });
    entriesWithNoOverrides = null;
    return compactFlatten(array(ConfigureWebpack.normalizeTargets(targets), function(targetConfig) {
      var keys, ref1, webpackEntry;
      if (!entriesWithNoOverrides || (keys = 1 < objectKeyCount(targetConfig))) {
        webpackEntry = webpackMerge(baseConfig, targetConfig);
        if ((ref1 = abcConfig.target) != null ? ref1.node : void 0) {
          webpackEntry.target || (webpackEntry.target = "node");
        }
        config = ConfigureWebpack.normalizeTargetConfig(webpackEntry);
        if (!keys) {
          entriesWithNoOverrides = config;
        }
        return config;
      } else {
        entriesWithNoOverrides.entry = merge(entriesWithNoOverrides.entry, targetConfig.entry);
        return null;
      }
    }));
  };

  ConfigureWebpack.normalizeTargetConfig = function(targetConfig) {
    if (targetConfig.target === "node") {
      targetConfig = webpackMerge({
        output: {
          libraryTarget: "commonjs2"
        },
        externals: [
          nodeExternals || (nodeExternals = webpackNodeExternals({
            modulesFromFile: true
          }))
        ]
      }, targetConfig);
    }
    return targetConfig;
  };

  ConfigureWebpack.normalizeTargets = function(targets) {
    if (targets == null) {
      targets = {};
    }
    if (!isPlainObject(targets)) {
      throw new Error("targets must be an object");
    }
    return object(targets, function(targetConfig, targetName) {
      var obj;
      return webpackMerge({
        entry: (
          obj = {},
          obj["" + targetName] = "./" + targetName,
          obj
        )
      }, targetConfig);
    });
  };

  ConfigureWebpack.outFileName = "webpack.config.js";

  ConfigureWebpack.standardWebpackConfigJs = "require('coffee-script/register');\nmodule.exports = require(\"art-build-configurator\").getWebpackConfig(__dirname);\n";

  ConfigureWebpack.writeConfig = function(npmRoot) {
    return BuildConfigurator.updateFile(path.join(npmRoot, ConfigureWebpack.outFileName), ConfigureWebpack.standardWebpackConfigJs);
  };

  return ConfigureWebpack;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  'neptune-namespaces': '^1.9.1',
  'art-testbench': '^1.0.0',
  'art-standard-lib': '^1.1.0',
  'art-class-system': '^1.0.1',
  'art-config': '^1.0.0',
  'art-build-configurator': '^1.8.1',
  'coffee-script': '^1.12.3',
  'coffee-loader': '^0.7.2',
  'css-loader': '^0.26.1',
  'json-loader': '^0.5.4',
  'script-loader': '^0.7.0',
  'style-loader': '^0.13.1',
  'case-sensitive-paths-webpack-plugin': '^1.1.4',
  'webpack-merge': '^3.0.0',
  'webpack': '^2.2.1',
  'webpack-dev-server': '^2.3.0'
};


/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).includeInNamespace(__webpack_require__(11)).addModules({
  ConfigurePackageJson: __webpack_require__(5),
  ConfigureWebpack: __webpack_require__(6)
});

__webpack_require__(3);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {var BuildConfigurator, ConfigurePackageJson, ConfigureWebpack, Promise, formattedInspect, fsp, log, merge, path, realRequire, recursiveCopy, ref;

fsp = __webpack_require__(17);

path = __webpack_require__(2);

realRequire = eval('require');

recursiveCopy = __webpack_require__(19);

ConfigureWebpack = __webpack_require__(6);

ConfigurePackageJson = __webpack_require__(5);

ref = __webpack_require__(1), formattedInspect = ref.formattedInspect, log = ref.log, Promise = ref.Promise, merge = ref.merge;

module.exports = BuildConfigurator = (function() {
  function BuildConfigurator() {}


  /*
  Ex:
    module.exports =
      npm: # or package:
        description: "my description"
  
      webpack:
        common: # common config for all targets
        targets: # default: index: {}
          index: # target 'index' specific config
   */

  BuildConfigurator.configFileName = "art.build.config.coffee";

  BuildConfigurator.standardConfigFileContents = "module.exports =\n  webpack:\n    common: {}\n    targets:\n      index: {}\n";

  BuildConfigurator.loadConfig = function(npmRoot, vivifyConfigFile) {
    var file;
    if (vivifyConfigFile == null) {
      vivifyConfigFile = false;
    }
    file = path.join(npmRoot, BuildConfigurator.configFileName);
    return fsp.exists(file).then(function(exists) {
      if (exists) {
        return realRequire(file);
      } else {
        if (vivifyConfigFile) {
          BuildConfigurator.updateFile(BuildConfigurator.configFileName, BuildConfigurator.standardConfigFileContents);
        }
        return {};
      }
    }).then(function(config) {
      var p, packageFile;
      config.npm || (config.npm = config["package"]);
      p = config.npm ? Promise.resolve(config.npm) : fsp.exists(packageFile = path.join(npmRoot, ConfigurePackageJson.outFileName)).then(function(exists) {
        if (exists) {
          return realRequire(packageFile);
        } else {
          return {};
        }
      });
      return p.then(function(finalNpm) {
        return merge(config, {
          npm: finalNpm
        });
      });
    });
  };

  BuildConfigurator.updateFile = function(fileName, contents) {
    var oldContents;
    if (fsp.existsSync(fileName)) {
      oldContents = fsp.readFileSync(fileName).toString();
    }
    if (oldContents !== contents) {
      log("generating and writing: ".gray + fileName.green);
      return fsp.writeFileSync(fileName, contents);
    } else {
      return log(("no change: " + fileName).gray);
    }
  };

  BuildConfigurator.go = function(npmRoot, arg) {
    var configure, init, pretend;
    pretend = arg.pretend, configure = arg.configure, init = arg.init;
    if (pretend) {
      log("PRETEND".red);
    }
    return Promise.then(function() {
      if (init) {
        return BuildConfigurator.init(npmRoot, {
          pretend: pretend
        });
      }
    }).then(function() {
      return BuildConfigurator.loadConfig(npmRoot, configure);
    }).then(function(abcConfig) {
      if (pretend) {
        return BuildConfigurator.pretend(npmRoot, abcConfig);
      } else {
        return BuildConfigurator.writeConfig(npmRoot, abcConfig);
      }
    });
  };

  BuildConfigurator.init = function(npmRoot, arg) {
    var dst, pretend, src;
    pretend = arg.pretend;
    src = path.join(__dirname, "../../../init-files");
    dst = npmRoot;
    log("cp standard files from: ".gray + src.green);
    if (!pretend) {
      return recursiveCopy(src, dst, {
        dot: true
      });
    }
  };

  BuildConfigurator.pretend = function(npmRoot, abcConfig) {
    return log(formattedInspect({
      npm: {
        out: {
          "package.json": ConfigurePackageJson.get(npmRoot, abcConfig)
        }
      },
      webpack: {
        configGeneratedOnDemand: ConfigureWebpack.get(npmRoot, abcConfig),
        out: {
          "webpack.config.js": ConfigureWebpack.standardWebpackConfigJs
        }
      }
    }, {
      color: true
    }));
  };

  BuildConfigurator.writeConfig = function(npmRoot, abcConfig) {
    ConfigurePackageJson.writeConfig(npmRoot, abcConfig);
    return ConfigureWebpack.writeConfig(npmRoot, abcConfig);
  };

  BuildConfigurator.getWebpackConfig = function(npmRoot) {
    return BuildConfigurator.loadConfig(npmRoot).then(function(abcConfig) {
      return ConfigureWebpack.get(npmRoot, abcConfig);
    });
  };

  return BuildConfigurator;

})();

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var StandardPackageJson, deepMerge, fs, peek, ref;

fs = __webpack_require__(4);

ref = __webpack_require__(1), peek = ref.peek, deepMerge = ref.deepMerge;

module.exports = StandardPackageJson = (function() {
  function StandardPackageJson() {}

  StandardPackageJson.get = function(abcConfig) {
    var ref1;
    return {
      license: 'ISC',
      name: peek(process.cwd().split("/")),
      version: fs.existsSync("package.json") ? JSON.parse(fs.readFileSync("package.json").toString()).version : "0.0.1",
      author: "Shane Brinkman-Davis Delamore, Imikimi LLC",
      dependencies: __webpack_require__(7),
      scripts: {
        test: (abcConfig != null ? (ref1 = abcConfig.target) != null ? ref1.node : void 0 : void 0) ? "nn -s;mocha -u tdd --compilers coffee:coffee-script/register" : 'webpack-dev-server --progress',
        start: 'webpack-dev-server --hot --inline --progress',
        build: 'webpack --progress'
      }
    };
  };

  return StandardPackageJson;

})();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var CaseSensitivePathsPlugin, StandardWebpackConfig, path;

CaseSensitivePathsPlugin = __webpack_require__(16);

path = __webpack_require__(2);

module.exports = StandardWebpackConfig = (function() {
  function StandardWebpackConfig() {}

  StandardWebpackConfig.get = function(npmRoot, abcConfig) {
    var options, outputPath, ref;
    options = abcConfig.webpack;
    outputPath = (ref = options.outputPath) != null ? ref : "build";
    return {
      resolve: {
        extensions: [".webpack.js", ".web.js", ".coffee", ".js", ".json"]
      },
      output: {
        path: path.join(npmRoot, outputPath),
        filename: "[name].js"
      },
      plugins: [new CaseSensitivePathsPlugin],
      module: {
        rules: [
          {
            test: /\.coffee$/,
            loader: "coffee-loader"
          }, {
            test: /\.(coffee\.md|litcoffee)$/,
            loader: "coffee-loader?literate"
          }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
          }, {
            test: /\.jpg$/,
            loader: "file-loader"
          }, {
            test: /\.json$/,
            loader: "json-loader"
          }
        ]
      }
    };
  };

  return StandardWebpackConfig;

})();


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var BuildConfigurator, Data,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

BuildConfigurator = __webpack_require__(0);

module.exports = BuildConfigurator.Data || BuildConfigurator.addNamespace('Data', Data = (function(superClass) {
  extend(Data, superClass);

  function Data() {
    return Data.__super__.constructor.apply(this, arguments);
  }

  return Data;

})(Neptune.Base));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(18);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("fs-promise");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("recursive-copy");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })
/******/ ]);