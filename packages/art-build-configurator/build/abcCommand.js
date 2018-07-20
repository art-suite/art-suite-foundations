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
/******/ 	return __webpack_require__(__webpack_require__.s = "./abcCommand.caf");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack/buildin/module.js":
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

/***/ "./abcCommand.caf":
/*!************************!*\
  !*** ./abcCommand.caf ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  let process = global.process,
    console = global.console,
    pv,
    pretend,
    configure,
    init,
    commander;
  __webpack_require__(/*! colors */ "colors");
  ({ pv, pretend, configure, init } = commander = __webpack_require__(/*! commander */ "commander")
    .version(__webpack_require__(/*! ./package */ "./package.json").version)
    .option(
      "-p, --pretend",
      "show the configs that will be generated without writing them"
    )
    .option("-c, --configure", "configure and update all")
    .option("--pv", "show your package's current version")
    .option("--init", "initialize a new Art-style project")
    .option("-f, --force", "when initialize, force overwrite all")
    .option("-v, --verbose", "verbose")
    .option(
      "--app [basic|demo]",
      "use with --init to initialize a working ArtSuite App [default: basic]"
    )
    .on("--help", function() {
      return console.log(
        `looks for ${Caf.toString(
          __webpack_require__(/*! ./ */ "./index.coffee").configFileName
        )} and configs as instructed`
      );
    })
    .parse(process.argv));
  return pv
    ? console.log(__webpack_require__(/*! ./ */ "./index.coffee").Versioning.current)
    : pretend || configure || init
      ? __webpack_require__(/*! ./ */ "./index.coffee")
          .go(process.cwd(), commander)
          .catch(function(e) {
            return console.error(e.stack);
          })
      : commander.outputHelp();
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./index.coffee":
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./source/Art/Build/Configurator */ "./source/Art/Build/Configurator/index.coffee");


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","bin":{"abc":"./abc"},"dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-object-tree-factory":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.1","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.2","chai":"^4.1.2","coffee-loader":"^0.7.3","coffee-script":"^1.12.7","colors":"^1.3.0","commander":"^2.15.1","css-loader":"^1.0.0","dateformat":"^3.0.3","detect-node":"^2.0.3","fs-extra":"^6.0.1","glob":"^7.1.2","glob-promise":"^3.4.0","json-loader":"^0.5.7","mocha":"^5.2.0","neptune-namespaces":"*","recursive-copy":"^2.0.6","script-loader":"^0.7.2","style-loader":"^0.19.1","webpack":"^4.16.1","webpack-command":"*","webpack-dev-server":"^3.1.4","webpack-merge":"^4.1.3","webpack-node-externals":"^1.7.2","webpack-stylish":"^0.1.8"},"description":"Tools for configuring npm (package.json) and webpack (webpack.config.js)","license":"ISC","name":"art-build-configurator","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.18.6"};

/***/ }),

/***/ "./source/Art/Build/Configurator/Configurator.caf":
/*!********************************************************!*\
  !*** ./source/Art/Build/Configurator/Configurator.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  let fs, path, realRequire, ConfigureWebpack, ConfigurePackageJson;
  fs = __webpack_require__(/*! fs-extra */ "fs-extra");
  path = __webpack_require__(/*! path */ "path");
  realRequire = eval("require");
  ConfigureWebpack = __webpack_require__(/*! ./ConfigureWebpack */ "./source/Art/Build/Configurator/ConfigureWebpack.coffee");
  ConfigurePackageJson = __webpack_require__(/*! ./ConfigurePackageJson */ "./source/Art/Build/Configurator/ConfigurePackageJson.coffee");
  return Caf.importInvoke(
    [
      "log",
      "Promise",
      "process",
      "merge",
      "compactFlatten",
      "formattedInspect"
    ],
    [global, __webpack_require__(/*! art-standard-lib */ "art-standard-lib")],
    (log, Promise, process, merge, compactFlatten, formattedInspect) => {
      let Configurator;
      return (Configurator = Caf.defClass(
        class Configurator extends Object {},
        function(Configurator, classSuper, instanceSuper) {
          this.configFilename = "art.build.config.caf";
          this.configBasename = "art.build.config";
          this.registerLoadersFilename = "register.js";
          this.go = (npmRoot, options) => {
            let pretend, configure, init, force;
            ({ pretend, configure, init, force } = options);
            if (pretend) {
              log("PRETEND".green);
            }
            return Promise.then(() => {
              if (init) {
                this.init(npmRoot, options);
              }
              return this.runNeptuneNamespaces(npmRoot);
            }).then(() => this.loadAndWriteConfig(npmRoot, options));
          };
          this.registerLoaders = (npmRoot, vivify = false) => {
            let file;
            file = path.join(npmRoot, this.registerLoadersFilename);
            return fs
              .exists(file)
              .then(
                exists =>
                  exists
                    ? realRequire(file)
                    : (vivify
                        ? (this.init(npmRoot, {
                            verbose: true,
                            select: /register.js/
                          }),
                          realRequire(file))
                        : undefined,
                      {})
              );
          };
          this.loadConfig = (npmRoot, vivifyConfigFile = false) =>
            this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
              let configFilepath;
              configFilepath = path.join(process.cwd(), this.configBasename);
              return __webpack_require__(/*! glob-promise */ "glob-promise")(configFilepath + "*")
                .then(
                  results =>
                    results.length > 0
                      ? realRequire(configFilepath)
                      : (vivifyConfigFile
                          ? this.init(npmRoot, {
                              verbose: true,
                              select: /art.build.config/
                            })
                          : undefined,
                        {})
                )
                .then(config => {
                  let p, packageFile;
                  config.npm || (config.npm = config.package);
                  p = config.npm
                    ? Promise.resolve(config.npm)
                    : fs
                        .exists(
                          (packageFile = path.join(
                            npmRoot,
                            ConfigurePackageJson.outFileName
                          ))
                        )
                        .then(
                          exists => (exists ? realRequire(packageFile) : {})
                        );
                  return p.then(finalNpm => merge(config, { npm: finalNpm }));
                });
            });
          this.init = function(npmRoot, options) {
            let wrote;
            log(`\nINIT: ${Caf.toString(npmRoot)}`);
            wrote = compactFlatten(
              __webpack_require__(/*! ./DefaultFiles */ "./source/Art/Build/Configurator/DefaultFiles.caf")
                .getDefaultFiles(npmRoot, options)
                .write(options)
            );
            return log(`INIT: wrote ${Caf.toString(wrote.length)} files`);
          };
          this.pretendWriteConfig = function(npmRoot, abcConfig) {
            return log(
              formattedInspect(
                {
                  npm: {
                    out: {
                      "package.json": ConfigurePackageJson.get(
                        npmRoot,
                        abcConfig
                      )
                    }
                  },
                  webpack: {
                    configGeneratedOnDemand: ConfigureWebpack.get(
                      npmRoot,
                      abcConfig
                    ),
                    out: {
                      "webpack.config.js":
                        ConfigureWebpack.standardWebpackConfigJs
                    }
                  }
                },
                { color: true }
              )
            );
          };
          this.runNeptuneNamespaces = function(npmRoot, options) {
            let executable, firstArg, isWebpackDevServer;
            [executable, firstArg] = process.argv;
            isWebpackDevServer = !!(
              executable.match(/\/node$/) &&
              (Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/))
            );
            log(`\nNN: ${Caf.toString(npmRoot)}`);
            return __webpack_require__(/*! ./RunNeptuneNamespaces */ "./source/Art/Build/Configurator/RunNeptuneNamespaces.caf")(
              npmRoot,
              isWebpackDevServer
            );
          };
          this.loadAndWriteConfig = function(npmRoot, options) {
            let pretend, configure;
            ({ pretend, configure } = options);
            log(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
            return this.loadConfig(npmRoot, configure).then(
              abcConfig =>
                pretend
                  ? this.pretendWriteConfig(npmRoot, abcConfig)
                  : this.writeConfig(npmRoot, abcConfig)
            );
          };
          this.writeConfig = function(npmRoot, abcConfig) {
            ConfigurePackageJson.writeConfig(npmRoot, abcConfig);
            return ConfigureWebpack.writeConfig(npmRoot, abcConfig);
          };
          this.getWebpackConfig = npmRoot =>
            this.loadConfig(npmRoot).then(abcConfig => {
              this.writeConfig(npmRoot, abcConfig);
              return this.runNeptuneNamespaces(npmRoot).then(() =>
                ConfigureWebpack.get(npmRoot, abcConfig)
              );
            });
          this.updateFile = function(fileName, contents) {
            let oldContents;
            if (fs.existsSync(fileName)) {
              oldContents = fs.readFileSync(fileName).toString();
            }
            return oldContents !== contents
              ? (log("writing: ".gray + fileName.green),
                fs.writeFileSync(fileName, contents))
              : log(`same:    ${Caf.toString(fileName)}`.gray);
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/ConfigurePackageJson.coffee":
/*!*******************************************************************!*\
  !*** ./source/Art/Build/Configurator/ConfigurePackageJson.coffee ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigurePackageJson, StandardPackageJson, consistentJsonStringify, deepMerge, defineModule, fs, isFunction, isPlainObject, path, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(/*! art-standard-lib */ "art-standard-lib"), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, deepMerge = ref.deepMerge, consistentJsonStringify = ref.consistentJsonStringify, isFunction = ref.isFunction;

fs = __webpack_require__(/*! fs */ "fs");

path = __webpack_require__(/*! path */ "path");

BaseClass = __webpack_require__(/*! art-class-system */ "art-class-system").BaseClass;

StandardPackageJson = __webpack_require__(/*! ./Data */ "./source/Art/Build/Configurator/Data/index.coffee").StandardPackageJson;

Configurator = __webpack_require__(/*! ./namespace */ "./source/Art/Build/Configurator/namespace.coffee");

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
    var npmConfig;
    if (isFunction(npmConfig = abcConfig.npm)) {
      return npmConfig(StandardPackageJson.get(abcConfig));
    } else {
      return deepMerge(StandardPackageJson.get(abcConfig), npmConfig);
    }
  };


  /*
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
   */

  ConfigurePackageJson.writeConfig = function(npmRoot, abcConfig) {
    var contents, packageConfig;
    packageConfig = ConfigurePackageJson.get(npmRoot, abcConfig);
    contents = consistentJsonStringify(packageConfig, "  ");
    return Configurator.updateFile(path.join(npmRoot, "package.json"), contents + "\n");
  };

  return ConfigurePackageJson;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/ConfigureWebpack.coffee":
/*!***************************************************************!*\
  !*** ./source/Art/Build/Configurator/ConfigureWebpack.coffee ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigureWebpack, StandardWebpackConfig, array, compactFlatten, deepMerge, defineModule, fs, isFunction, isPlainObject, isRegExp, log, merge, nodeExternals, object, objectKeyCount, objectWithout, path, ref, webpackMerge,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

nodeExternals = null;

ref = __webpack_require__(/*! art-standard-lib */ "art-standard-lib"), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, array = ref.array, object = ref.object, deepMerge = ref.deepMerge, log = ref.log, compactFlatten = ref.compactFlatten, objectKeyCount = ref.objectKeyCount, merge = ref.merge, objectWithout = ref.objectWithout, isRegExp = ref.isRegExp, isFunction = ref.isFunction;

webpackMerge = __webpack_require__(/*! webpack-merge */ "webpack-merge");

BaseClass = __webpack_require__(/*! art-class-system */ "art-class-system").BaseClass;

fs = __webpack_require__(/*! fs */ "fs");

path = __webpack_require__(/*! path */ "path");

Configurator = __webpack_require__(/*! ./namespace */ "./source/Art/Build/Configurator/namespace.coffee");

StandardWebpackConfig = __webpack_require__(/*! ./Data */ "./source/Art/Build/Configurator/Data/index.coffee").StandardWebpackConfig;

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
      var includeNpms, keys, ref1, webpackEntry;
      includeNpms = targetConfig.includeNpms;
      if (includeNpms) {
        targetConfig = objectWithout(targetConfig, "includeNpms");
      }
      if (!entriesWithNoOverrides || (keys = 1 < objectKeyCount(targetConfig))) {
        webpackEntry = webpackMerge(baseConfig, targetConfig);
        if ((ref1 = abcConfig.target) != null ? ref1.node : void 0) {
          webpackEntry.target || (webpackEntry.target = "node");
        }
        config = ConfigureWebpack.normalizeTargetConfig(webpackEntry, includeNpms);
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

  ConfigureWebpack.normalizeTargetConfig = function(targetConfig, includeNpms) {
    if (targetConfig.target === "node") {
      return webpackMerge({
        output: {
          libraryTarget: "commonjs2",
          pathinfo: true
        },
        externals: [
          nodeExternals || (nodeExternals = function(context, request, callback) {
            var shouldInclude;
            if (request.match(/^[^.]/)) {
              shouldInclude = (function() {
                if (includeNpms) {
                  switch (false) {
                    case !isRegExp(includeNpms):
                      return includeNpms.test(request);
                    case !isFunction(includeNpms):
                      return includeNpms(request);
                  }
                }
              })();
              if (shouldInclude) {
                return callback();
              } else {
                return callback(null, "root require('" + request + "' /* ABC - not inlining fellow NPM */)");
              }
            } else {
              return callback();
            }
          })
        ]
      }, targetConfig);
    } else {
      return webpackMerge({
        output: {
          pathinfo: true
        }
      }, targetConfig);
    }
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

  ConfigureWebpack.standardWebpackConfigJs = StandardWebpackConfig.js;

  ConfigureWebpack.writeConfig = function(npmRoot) {
    return Configurator.updateFile(path.join(npmRoot, ConfigureWebpack.outFileName), ConfigureWebpack.standardWebpackConfigJs);
  };

  return ConfigureWebpack;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/Data/StandardDependencies.caf":
/*!*********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardDependencies.caf ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return { "art-build-configurator": "*" };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/Data/StandardPackageJson.coffee":
/*!***********************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardPackageJson.coffee ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var StandardPackageJson, deepMerge, fs, peek, ref;

fs = __webpack_require__(/*! fs */ "fs");

ref = __webpack_require__(/*! art-standard-lib */ "art-standard-lib"), peek = ref.peek, deepMerge = ref.deepMerge;

module.exports = StandardPackageJson = (function() {
  function StandardPackageJson() {}

  StandardPackageJson.get = function(abcConfig) {
    var ref1;
    return {
      license: 'ISC',
      name: peek(process.cwd().split("/")),
      version: fs.existsSync("package.json") ? JSON.parse(fs.readFileSync("package.json").toString()).version : "0.0.1",
      author: "Shane Brinkman-Davis Delamore, Imikimi LLC",
      dependencies: __webpack_require__(/*! ./StandardDependencies */ "./source/Art/Build/Configurator/Data/StandardDependencies.caf"),
      scripts: {
        test: (abcConfig != null ? (ref1 = abcConfig.target) != null ? ref1.node : void 0 : void 0) ? "nn -s;mocha -u tdd" : 'webpack-dev-server --progress',
        start: 'webpack-dev-server --hot --inline --progress',
        testInBrowser: 'webpack-dev-server --progress',
        build: 'webpack --progress'
      }
    };
  };

  return StandardPackageJson;

})();


/***/ }),

/***/ "./source/Art/Build/Configurator/Data/StandardWebpackConfig.coffee":
/*!*************************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/StandardWebpackConfig.coffee ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CaseSensitivePathsPlugin, StandardWebpackConfig, path;

CaseSensitivePathsPlugin = __webpack_require__(/*! case-sensitive-paths-webpack-plugin */ "case-sensitive-paths-webpack-plugin");

path = __webpack_require__(/*! path */ "path");

module.exports = StandardWebpackConfig = (function() {
  function StandardWebpackConfig() {}

  StandardWebpackConfig.get = function(npmRoot, abcConfig) {
    var options, outputPath, ref;
    options = abcConfig.webpack;
    outputPath = (ref = options.outputPath) != null ? ref : "build";
    return {
      mode: "none",
      resolve: {
        extensions: [".webpack.js", ".web.js", ".coffee", ".caf", ".caffeine", ".js", ".json"]
      },
      output: {
        path: path.join(npmRoot, outputPath),
        filename: "[name].js"
      },
      plugins: [new CaseSensitivePathsPlugin],
      module: {
        rules: [
          {
            test: /\.caf(feine)?$/,
            use: {
              loader: "caffeine-mc/webpack-loader",
              options: {
                prettier: true
              }
            }
          }, {
            test: /\.coffee$/,
            use: {
              loader: "coffee-loader"
            }
          }, {
            test: /\.(coffee\.md|litcoffee)$/,
            use: {
              loader: "coffee-loader?literate"
            }
          }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }, {
            test: /\.png$/,
            use: {
              loader: "url-loader?limit=100000"
            }
          }, {
            test: /\.jpg$/,
            use: {
              loader: "file-loader"
            }
          }
        ]
      }
    };
  };

  StandardWebpackConfig.js = "module.exports = require(\"art-build-configurator\").getWebpackConfig(__dirname);\n";

  return StandardWebpackConfig;

})();


/***/ }),

/***/ "./source/Art/Build/Configurator/Data/index.coffee":
/*!*********************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/index.coffee ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ "./source/Art/Build/Configurator/Data/namespace.coffee");

module.exports.addModules({
  StandardDependencies: __webpack_require__(/*! ./StandardDependencies */ "./source/Art/Build/Configurator/Data/StandardDependencies.caf"),
  StandardPackageJson: __webpack_require__(/*! ./StandardPackageJson */ "./source/Art/Build/Configurator/Data/StandardPackageJson.coffee"),
  StandardWebpackConfig: __webpack_require__(/*! ./StandardWebpackConfig */ "./source/Art/Build/Configurator/Data/StandardWebpackConfig.coffee")
});


/***/ }),

/***/ "./source/Art/Build/Configurator/Data/namespace.coffee":
/*!*************************************************************!*\
  !*** ./source/Art/Build/Configurator/Data/namespace.coffee ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Data,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ "./source/Art/Build/Configurator/namespace.coffee")).addNamespace('Data', Data = (function(superClass) {
  extend(Data, superClass);

  function Data() {
    return Data.__super__.constructor.apply(this, arguments);
  }

  return Data;

})(Neptune.PackageNamespace));


/***/ }),

/***/ "./source/Art/Build/Configurator/DefaultFiles.caf":
/*!********************************************************!*\
  !*** ./source/Art/Build/Configurator/DefaultFiles.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "getCapitalizedCodeWords",
      "peek",
      "log",
      "fileBuilder",
      "merge",
      "dashCase",
      "process"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf"), __webpack_require__(/*! ./FileBuilder */ "./source/Art/Build/Configurator/FileBuilder/index.coffee")],
    (
      BaseClass,
      getCapitalizedCodeWords,
      peek,
      log,
      fileBuilder,
      merge,
      dashCase,
      process
    ) => {
      let path, DefaultFiles;
      path = __webpack_require__(/*! path */ "path");
      return (DefaultFiles = Caf.defClass(
        class DefaultFiles extends BaseClass {},
        function(DefaultFiles, classSuper, instanceSuper) {
          this.getDefaultFiles = function(
            npmRoot = process.cwd(),
            options = {}
          ) {
            let app,
              clientApp,
              demoApp,
              npmName,
              namespacePath,
              namespaceDirPath,
              cafRequireFriendlyNamespaceDirPath,
              mostSpecificName,
              projectDotName;
            ({ app } = options);
            if (app === "demo") {
              clientApp = true;
              demoApp = true;
            } else {
              if (app != null) {
                clientApp = true;
              }
            }
            npmName = path.basename(npmRoot);
            namespacePath = getCapitalizedCodeWords(npmName);
            namespaceDirPath = namespacePath.join(".");
            cafRequireFriendlyNamespaceDirPath = namespacePath
              .join("")
              .replace(".", "");
            mostSpecificName = peek(namespacePath);
            projectDotName = namespacePath.join(".");
            log("-----------------------------------------");
            log(
              clientApp
                ? demoApp
                  ? "Initializing Demo ArtSuite client app."
                  : "Initializing Minimal ArtSuite client app."
                : "Initializing Basic ArtSuite NPM Module."
            );
            log("-----------------------------------------");
            log({
              InitAppInfo: {
                name: mostSpecificName,
                npmName,
                NeptuneNamespace: projectDotName
              }
            });
            return fileBuilder(
              merge(
                {
                  ".gitignore": "node_modules/",
                  ".travis.yml": 'language: node_js\nnode_js:\n  - "6"',
                  "package.json": "{}",
                  "register.js":
                    "require('coffee-script/register'); require('caffeine-mc/register');",
                  "art.build.config.caf": `target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: ${Caf.toString(
                    !clientApp
                  )}\n\nnpm:\n  description: "" ${Caf.toString(
                    projectDotName
                  )}\n  dependencies: ${Caf.toString(
                    clientApp
                      ? "art-suite-clientApp: :git://github.com/imikimi/art-suite-clientApp"
                      : "{}"
                  )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
                    clientApp ? "Client" : "index"
                  )}: {}`
                },
                clientApp
                  ? {
                      "Client.caf": `&source/${Caf.toString(
                        cafRequireFriendlyNamespaceDirPath
                      )}/Client`,
                      "index.html":
                        '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>'
                    }
                  : {
                      "index.js":
                        "if (false) { // use build? - true == fase, false == good for development\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./index.caf');\n};",
                      "index.caf": `&source/${Caf.toString(
                        cafRequireFriendlyNamespaceDirPath
                      )}`
                    },
                {
                  "README.md": `# ${Caf.toString(
                    projectDotName
                  )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
                    dashCase(npmName)
                  )}\n\`\`\``,
                  test: {
                    "index.js":
                      "require('../register');\nrequire('./index.caf');",
                    "index.caf":
                      "require '../index.caf'\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests",
                    "StandardImport.caf":
                      "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem, test: (args...) -> global.test args...",
                    tests: {
                      [namespaceDirPath]: {
                        "Test.caf": `import &StandardImport\nsuite: ->\n  test '${Caf.toString(
                          mostSpecificName
                        )}' -> assert.eq 1, 1`
                      }
                    }
                  },
                  source: {
                    [namespaceDirPath]: {
                      "StandardImport.caf": clientApp
                        ? "&ArtSuite"
                        : "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem",
                      Client: clientApp
                        ? !demoApp
                          ? {
                              "Main.caf": `import &StandardImport\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                                projectDotName
                              )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement\n          draw: #eee\n\n          TextElement\n            padding: 10\n            text: "" 'Hello world!' - ${Caf.toString(
                                projectDotName
                              )}`
                            }
                          : {
                              "Main.caf": `import &StandardImport\n&Models\n&Pipelines\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                                projectDotName
                              )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement &Components/App()`,
                              Components: {
                                "User.caf":
                                  "import &StandardImport\n\nclass User extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  render: ->\n    Element\n      size: ww: 1 hch: 1\n      TextElement\n        &TextStyles.text\n        size: ww: 1 hch: 1\n        align: if @alignUsersLeft then :left else :right\n        animators: align: true\n        text: @props.user?.name",
                                "Users.caf":
                                  'import &StandardImport\n\nclass Users extends FluxComponent\n  @subscriptions allUsers: ""\n\n  render: ->\n    ScrollElement\n      clip: true\n      childrenMargins: 10\n      array user from @allUsers with &User {user}',
                                "App.caf": `import &StandardImport\n\nclass App extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  addUser: ->\n    @models.user.create data: name: randomElement\n      ""\n        Craig   David   Elle      Frank\n        Greg    Hank    Ian       Jan\n        Kelly   Lois    Mary      Noah\n        Piper   Quinn   Robert    Sally\n        Tuck    Udy     Violette  William\n        Xavier  Yesler  Zane\n      .split /\\s+/\n\n    .then ->\n      @models.allUsers.reload ""\n\n  render: ->\n    Element\n      &StyleProps.background\n\n      Element\n        padding: 10\n        childrenLayout:   :column\n        childrenMargins:  10\n\n        Element\n          margin: 10\n          size: ww: 1 hch: 1\n          childrenLayout:     :row\n          childrenAlignment:  :centerLeft\n          childrenMargins:    10\n          TextElement &TextStyles.titleText, text: "${Caf.toString(
                                  projectDotName
                                )} Users"\n\n          &Button\n            text:   :add-user\n            action: @addUser\n\n          Element()\n\n          &Button\n            text: if @alignUsersLeft then 'alignment: left' else 'alignment: right'\n            action: @models.navState.toggleAlignUsersLeft\n\n        &Users()`,
                                "Button.caf":
                                  "import &StandardImport\n\nclass Button extends PointerActionsMixin Component\n\n  render: ->\n    Element\n      on:         @pointerHandlers\n      size:       cs: 1\n      padding:    10\n      cursor:     :pointer\n      animators:  :draw\n      draw:\n        rectangle: radius: 5\n        &Palette[if @hover then :secondary else :primary]\n\n      TextElement\n        &TextStyles.text\n        color:  &TextPalette.white.primary\n        text:   @props.text"
                              },
                              "StyleProps.caf":
                                "import &StandardImport\nclass StyleProps extends HotStyleProps\n  @background: draw: #f7f7f7",
                              "Palette.caf":
                                "import &StandardImport\nclass Palette extends HotStyleProps\n  @primary: #48f\n  @secondary: #f49",
                              "TextPalette.caf":
                                "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @black:\n    primary:          rgbColor #000000d2\n    secondary:        rgbColor #0008\n    disabled:         rgbColor #0004\n\n  @white:\n    primary:          rgbColor #fffd\n    secondary:        rgbColor #fff8\n    disabled:         rgbColor #fff4",
                              "TextStyles.caf":
                                "import &StandardImport\nclass TextStyles extends HotStyleProps\n  @text:\n    fontFamily: :sans-serif\n    color: &TextPalette.black.secondary\n\n  @titleText:\n    fontSize:   24\n    fontWeight: :bold\n    fontFamily: :sans-serif\n    color: &TextPalette.black.primary",
                              Models: {
                                "NavState.caf":
                                  "import &StandardImport\n\nclass NavState extends ApplicationState\n  @stateFields\n    alignUsersLeft: true"
                              }
                            }
                        : undefined,
                      Pipelines: demoApp && {
                        "User.caf":
                          "import &StandardImport\n\nclass User extends Pipeline\n  @query\n    allUsers: (request) -> array request.pipeline.db\n\n  constructor: ->\n    super\n    @db =\n      abc123: id: :abc123 name: :Alice\n      efg456: id: :efg456 name: :Bill\n\n  @handlers\n    get: ({key}) ->\n      @db[key]\n\n    create: ({data}) ->\n      key = randomString()\n      @db[key] = merge data, {} key\n\n    update: ({data, key}) ->\n      if @db[key]\n        @db[key] = merge @db[key], data\n\n    delete: ({key}) ->\n      if @db[key]\n        @db = objectWithout @db, key\n        true"
                      }
                    }
                  }
                }
              )
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/FileBuilder/Dir.caf":
/*!***********************************************************!*\
  !*** ./source/Art/Build/Configurator/FileBuilder/Dir.caf ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "merge"],
    [global, __webpack_require__(/*! ../StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf"), __webpack_require__(/*! art-object-tree-factory */ "art-object-tree-factory")],
    (createObjectTreeFactory, BaseClass, merge) => {
      let Path, DirClass;
      Path = __webpack_require__(/*! path */ "path");
      return createObjectTreeFactory(
        (DirClass = Caf.defClass(
          class DirClass extends BaseClass {
            constructor(props, children) {
              let dirname;
              super(...arguments);
              this.props = props;
              this.children = children;
              [dirname, ...children] = this.children;
              this.props.dirname = dirname;
              this.children = children;
            }
          },
          function(DirClass, classSuper, instanceSuper) {
            this.getter({
              plainObjects: function() {
                return {
                  [this.props.dirname]: merge(
                    ...Caf.array(
                      this.children,
                      child => child.plainObjects || child
                    )
                  )
                };
              }
            });
            this.prototype.write = function(options = {}) {
              let path;
              path = Path.join(options.path || ".", this.props.dirname);
              return Caf.array(this.children, child =>
                child.write(merge(options, { path }))
              );
            };
          }
        ))
      );
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/FileBuilder/File.caf":
/*!************************************************************!*\
  !*** ./source/Art/Build/Configurator/FileBuilder/File.caf ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "isFunction", "isRegExp", "log"],
    [global, __webpack_require__(/*! ../StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf"), __webpack_require__(/*! art-object-tree-factory */ "art-object-tree-factory")],
    (createObjectTreeFactory, BaseClass, isFunction, isRegExp, log) => {
      let Path, FileClass;
      Path = __webpack_require__(/*! path */ "path");
      return createObjectTreeFactory(
        (FileClass = Caf.defClass(
          class FileClass extends BaseClass {
            constructor(props, children) {
              super(...arguments);
              this.props = props;
              this.children = children;
              this.props.filename = this.children[0];
              this.props.contents = this.children[1];
            }
          },
          function(FileClass, classSuper, instanceSuper) {
            this.getter({
              plainObjects: function() {
                return { [this.props.filename]: this.props.contents };
              }
            });
            this.prototype.write = function(options = {}) {
              let filename,
                contents,
                path,
                pretend,
                force,
                verbose,
                select,
                fs,
                selected,
                exists,
                logContents;
              ({ filename, contents } = this.props);
              ({
                path,
                pretend,
                force,
                verbose,
                select,
                fs = __webpack_require__(/*! fs-extra */ "fs-extra")
              } = options);
              path = Path.join(path || ".", filename);
              selected =
                select != null
                  ? isFunction(select)
                    ? select(path)
                    : isRegExp(select)
                      ? select.test(path)
                      : undefined
                  : true;
              return selected
                ? ((exists = fs.existsSync(path)),
                  verbose
                    ? ((logContents = exists
                        ? contents === fs.readFileSync(path).toString()
                          ? `same:    ${Caf.toString(path)}`.gray
                          : force
                            ? "overwriting: ".yellow + path.green
                            : `skipped: ${Caf.toString(path)}`.gray +
                              " (cowardly refusing to overwrite - use: force)"
                                .yellow
                        : "writing: ".gray + path.green),
                      log(
                        pretend ? "PRETEND-".green + logContents : logContents
                      ))
                    : undefined,
                  !pretend && (!exists || force)
                    ? (fs.ensureDirSync(Path.dirname(path)),
                      fs.writeFileSync(path, contents),
                      path)
                    : undefined)
                : undefined;
            };
          }
        ))
      );
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/FileBuilder/FileBuilder.caf":
/*!*******************************************************************!*\
  !*** ./source/Art/Build/Configurator/FileBuilder/FileBuilder.caf ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isPlainObject", "isString", "Error", "formattedInspect"],
    [global, __webpack_require__(/*! ../StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf")],
    (isPlainObject, isString, Error, formattedInspect) => {
      let fileBuilder;
      return {
        fileBuilder: (fileBuilder = function(name, contents) {
          return (() => {
            switch (false) {
              case !isPlainObject(name):
                return __webpack_require__(/*! ./Dir */ "./source/Art/Build/Configurator/FileBuilder/Dir.caf")(
                  ".",
                  Caf.array(name, (contents, n) => fileBuilder(n, contents))
                );
              case !isString(contents):
                return __webpack_require__(/*! ./File */ "./source/Art/Build/Configurator/FileBuilder/File.caf")(name, contents);
              case !isPlainObject(contents):
                return __webpack_require__(/*! ./Dir */ "./source/Art/Build/Configurator/FileBuilder/Dir.caf")(name, fileBuilder(contents));
              case !(
                contents === null ||
                contents === undefined ||
                contents === false
              ):
                return null;
              default:
                return (() => {
                  throw new Error(
                    `expecting string or plain object. got: ${Caf.toString(
                      formattedInspect({ name, contents })
                    )}`
                  );
                })();
            }
          })();
        })
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/FileBuilder/index.coffee":
/*!****************************************************************!*\
  !*** ./source/Art/Build/Configurator/FileBuilder/index.coffee ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ "./source/Art/Build/Configurator/FileBuilder/namespace.coffee");

module.exports.includeInNamespace(__webpack_require__(/*! ./FileBuilder */ "./source/Art/Build/Configurator/FileBuilder/FileBuilder.caf")).addModules({
  Dir: __webpack_require__(/*! ./Dir */ "./source/Art/Build/Configurator/FileBuilder/Dir.caf"),
  File: __webpack_require__(/*! ./File */ "./source/Art/Build/Configurator/FileBuilder/File.caf")
});


/***/ }),

/***/ "./source/Art/Build/Configurator/FileBuilder/namespace.coffee":
/*!********************************************************************!*\
  !*** ./source/Art/Build/Configurator/FileBuilder/namespace.coffee ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var FileBuilder,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ "./source/Art/Build/Configurator/namespace.coffee")).addNamespace('FileBuilder', FileBuilder = (function(superClass) {
  extend(FileBuilder, superClass);

  function FileBuilder() {
    return FileBuilder.__super__.constructor.apply(this, arguments);
  }

  return FileBuilder;

})(Neptune.PackageNamespace));


/***/ }),

/***/ "./source/Art/Build/Configurator/Publish.caf":
/*!***************************************************!*\
  !*** ./source/Art/Build/Configurator/Publish.caf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  let notPublished = global.notPublished,
    tagName;
  return notPublished
    ? ((tagName = "published"),
      `npm publish\ngit tag -f ${Caf.toString(
        tagName
      )}\ngit push origin "${Caf.toString(tagName)}" --force`)
    : undefined;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/RunNeptuneNamespaces.caf":
/*!****************************************************************!*\
  !*** ./source/Art/Build/Configurator/RunNeptuneNamespaces.caf ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "log"],
    [global, __webpack_require__(/*! ./StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf")],
    (Promise, log) => {
      let NeptuneNamespacesGenerator;
      NeptuneNamespacesGenerator = __webpack_require__(/*! neptune-namespaces/generator */ "neptune-namespaces/generator");
      return function(dirname, watch) {
        let existingRoots, workers;
        existingRoots = Caf.array(
          NeptuneNamespacesGenerator.standardRoots,
          root => root,
          root =>
            __webpack_require__(/*! fs */ "fs").existsSync(
              `${Caf.toString(dirname)}/${Caf.toString(root)}`
            )
        );
        Caf.array(existingRoots, root =>
          log(
            "neptune-namespaces scanning: ".grey +
              `${Caf.toString(
                __webpack_require__(/*! path */ "path").basename(dirname)
              )}/${Caf.toString(root)}/*`.green
          )
        );
        workers = Caf.array(existingRoots, root =>
          NeptuneNamespacesGenerator.generate(
            `${Caf.toString(dirname)}/${Caf.toString(root)}/*`,
            { watch }
          )
        );
        return Promise.all(workers).then(() =>
          log(
            "neptune-namespaces: ".grey +
              `done with ${Caf.toString(
                watch ? "initial " : ""
              )}namespace generation`.green
          )
        );
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/StandardImport.caf":
/*!**********************************************************!*\
  !*** ./source/Art/Build/Configurator/StandardImport.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ "art-standard-lib").merge(
    __webpack_require__(/*! art-standard-lib */ "art-standard-lib"),
    __webpack_require__(/*! art-class-system */ "art-class-system")
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/Versioning.caf":
/*!******************************************************!*\
  !*** ./source/Art/Build/Configurator/Versioning.caf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ "caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "JSON"],
    [global, __webpack_require__(/*! ./StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf")],
    (BaseClass, JSON) => {
      let Versioning;
      return (Versioning = Caf.defClass(
        class Versioning extends BaseClass {},
        function(Versioning, classSuper, instanceSuper) {
          this.classGetter({
            current: function() {
              return JSON.parse(
                __webpack_require__(/*! fs */ "fs")
                  .readFileSync("package.json")
                  .toString()
              ).version;
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../node_modules/webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./source/Art/Build/Configurator/index.coffee":
/*!****************************************************!*\
  !*** ./source/Art/Build/Configurator/index.coffee ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ "./source/Art/Build/Configurator/namespace.coffee");

module.exports.includeInNamespace(__webpack_require__(/*! ./Configurator */ "./source/Art/Build/Configurator/Configurator.caf")).addModules({
  ConfigurePackageJson: __webpack_require__(/*! ./ConfigurePackageJson */ "./source/Art/Build/Configurator/ConfigurePackageJson.coffee"),
  ConfigureWebpack: __webpack_require__(/*! ./ConfigureWebpack */ "./source/Art/Build/Configurator/ConfigureWebpack.coffee"),
  DefaultFiles: __webpack_require__(/*! ./DefaultFiles */ "./source/Art/Build/Configurator/DefaultFiles.caf"),
  Publish: __webpack_require__(/*! ./Publish */ "./source/Art/Build/Configurator/Publish.caf"),
  RunNeptuneNamespaces: __webpack_require__(/*! ./RunNeptuneNamespaces */ "./source/Art/Build/Configurator/RunNeptuneNamespaces.caf"),
  StandardImport: __webpack_require__(/*! ./StandardImport */ "./source/Art/Build/Configurator/StandardImport.caf"),
  Versioning: __webpack_require__(/*! ./Versioning */ "./source/Art/Build/Configurator/Versioning.caf")
});

__webpack_require__(/*! ./Data */ "./source/Art/Build/Configurator/Data/index.coffee");

__webpack_require__(/*! ./FileBuilder */ "./source/Art/Build/Configurator/FileBuilder/index.coffee");


/***/ }),

/***/ "./source/Art/Build/Configurator/namespace.coffee":
/*!********************************************************!*\
  !*** ./source/Art/Build/Configurator/namespace.coffee ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Configurator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! ../namespace */ "./source/Art/Build/namespace.coffee")).addNamespace('Configurator', Configurator = (function(superClass) {
  extend(Configurator, superClass);

  function Configurator() {
    return Configurator.__super__.constructor.apply(this, arguments);
  }

  Configurator.version = __webpack_require__(/*! ../../../../package.json */ "./package.json").version;

  return Configurator;

})(Neptune.PackageNamespace));

__webpack_require__(/*! ./Data/namespace */ "./source/Art/Build/Configurator/Data/namespace.coffee");

__webpack_require__(/*! ./FileBuilder/namespace */ "./source/Art/Build/Configurator/FileBuilder/namespace.coffee");


/***/ }),

/***/ "./source/Art/Build/namespace.coffee":
/*!*******************************************!*\
  !*** ./source/Art/Build/namespace.coffee ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! ../namespace */ "./source/Art/namespace.coffee")).vivifySubnamespace('Build');

__webpack_require__(/*! ./Configurator/namespace */ "./source/Art/Build/Configurator/namespace.coffee");


/***/ }),

/***/ "./source/Art/namespace.coffee":
/*!*************************************!*\
  !*** ./source/Art/namespace.coffee ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(/*! neptune-namespaces */ "neptune-namespaces")).vivifySubnamespace('Art');

__webpack_require__(/*! ./Build/namespace */ "./source/Art/Build/namespace.coffee");


/***/ }),

/***/ "art-class-system":
/*!**********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "art-object-tree-factory":
/*!*****************************************************************************************!*\
  !*** external "require('art-object-tree-factory' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-object-tree-factory' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "art-standard-lib":
/*!**********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "caffeine-script-runtime":
/*!*****************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "case-sensitive-paths-webpack-plugin":
/*!*****************************************************************************************************!*\
  !*** external "require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "colors":
/*!************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "commander":
/*!***************************************************************************!*\
  !*** external "require('commander' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('commander' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "fs":
/*!********************************************************************!*\
  !*** external "require('fs' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "fs-extra":
/*!**************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "glob-promise":
/*!******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "neptune-namespaces":
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "neptune-namespaces/generator":
/*!**********************************************************************************************!*\
  !*** external "require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "path":
/*!**********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),

/***/ "webpack-merge":
/*!*******************************************************************************!*\
  !*** external "require('webpack-merge' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('webpack-merge' /* ABC - not inlining fellow NPM */);

/***/ })

/******/ });