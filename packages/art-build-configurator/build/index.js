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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
/* 2 */
/*!******************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, devDependencies, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC\"","bin":{"abc":"./abc"},"dependencies":{"art-browser-tools":"*","art-build-configurator":"*","art-class-system":"*","art-config":"*","art-filebuilder":"*","art-object-tree-factory":"*","art-standard-lib":"*","bluebird":"^3.5.3","caffeine-script":"*","caffeine-script-runtime":"*","coffee-loader":"^0.7.3","coffee-script":"^1.12.7","colors":"^1.3.2","commander":"^2.19.0","css-loader":"^1.0.1","dateformat":"^3.0.3","detect-node":"^2.0.4","fs-extra":"^7.0.1","glob":"^7.1.4","glob-promise":"^3.4.0","json-loader":"^0.5.7","neptune-namespaces":"*","pluralize":"^7.0.0","script-loader":"^0.7.2","style-loader":"^0.23.1"},"description":"Tools for configuring npm (package.json) and webpack (webpack.config.js)","devDependencies":{"art-testbench":"*","case-sensitive-paths-webpack-plugin":"^2.1.2","chai":"^4.2.0","mocha":"^5.2.0","mock-fs":"^4.10.0","webpack":"^4.32.2","webpack-cli":"*","webpack-dev-server":"^3.4.1","webpack-merge":"^4.2.1","webpack-node-externals":"^1.7.2","webpack-stylish":"^0.1.8"},"license":"ISC","name":"art-build-configurator","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress --env.devServer","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress --env.devServer"},"version":"1.19.15"};

/***/ }),
/* 6 */
/*!************************************************!*\
  !*** ./source/Art.Build.Configurator/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 7))
.includeInNamespace(__webpack_require__(/*! ./Configurator */ 12))
.addModules({
  Main:                 __webpack_require__(/*! ./Main */ 13),
  Publish:              __webpack_require__(/*! ./Publish */ 43),
  Recipe:               __webpack_require__(/*! ./Recipe */ 36),
  RunNeptuneNamespaces: __webpack_require__(/*! ./RunNeptuneNamespaces */ 41),
  StandardImport:       __webpack_require__(/*! ./StandardImport */ 14),
  Versioning:           __webpack_require__(/*! ./Versioning */ 44)
});
__webpack_require__(/*! ./Configurators */ 26);
__webpack_require__(/*! ./Data */ 17);
__webpack_require__(/*! ./Recipes */ 34);

/***/ }),
/* 7 */
/*!****************************************************!*\
  !*** ./source/Art.Build.Configurator/namespace.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/namespace.js

module.exports = __webpack_require__(/*! neptune-namespaces */ 8).addNamespace(
  'Art.Build.Configurator',
  (class Configurator extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../package.json */ 5))
);
__webpack_require__(/*! ./Configurators/namespace */ 9);
__webpack_require__(/*! ./Data/namespace */ 10);
__webpack_require__(/*! ./Recipes/namespace */ 11);

/***/ }),
/* 8 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 9 */
/*!******************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/namespace.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Configurators/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 7).addNamespace(
  'Configurators',
  class Configurators extends Neptune.PackageNamespace {}
);


/***/ }),
/* 10 */
/*!*********************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/namespace.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Data/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 7).addNamespace(
  'Data',
  class Data extends Neptune.PackageNamespace {}
);


/***/ }),
/* 11 */
/*!************************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/namespace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Recipes/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 7).addNamespace(
  'Recipes',
  class Recipes extends Neptune.PackageNamespace {}
);


/***/ }),
/* 12 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurator.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return [__webpack_require__(/*! ./Main */ 13)];
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 13 */
/*!************************************************!*\
  !*** ./source/Art.Build.Configurator/Main.caf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "Promise",
      "path",
      "fs",
      "process",
      "ConfigurePackageJson",
      "merge",
      "upperCamelCase",
      "formattedInspect",
      "ConfigureWebpack"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ 14), __webpack_require__(/*! ./Configurators */ 26)],
    (
      log,
      Promise,
      path,
      fs,
      process,
      ConfigurePackageJson,
      merge,
      upperCamelCase,
      formattedInspect,
      ConfigureWebpack
    ) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function(
        Main,
        classSuper,
        instanceSuper
      ) {
        this.realRequire = eval("require");
        this.configFilename = "art.build.config.caf";
        this.configBasename = "art.build.config";
        this.registerLoadersFilename = "register.js";
        this.log = (...args) => (!this.quiet ? log(...args) : undefined);
        this.go = (npmRoot, options) => {
          let pretend, configure, init, force, quiet, temp;
          pretend = options.pretend;
          configure = options.configure;
          init = options.init;
          force = options.force;
          quiet = options.quiet;
          (temp = this.quiet) != null ? temp : (this.quiet = quiet);
          if (pretend) {
            this.log("PRETEND".green);
          }
          return Promise.then(() =>
            init ? this.init(init, npmRoot, options) : undefined
          )
            .then(() =>
              !(pretend && init)
                ? this.runNeptuneNamespaces(npmRoot)
                : undefined
            )
            .then(() =>
              !(pretend && init)
                ? this.loadAndWriteConfig(npmRoot, options)
                : undefined
            )
            .catch(error => log.error(error));
        };
        this.registerLoaders = (npmRoot, vivify = false) => {
          let file;
          file = path.join(npmRoot, this.registerLoadersFilename);
          return fs
            .exists(file)
            .then(exists =>
              exists
                ? Main.realRequire(file)
                : (vivify
                    ? (this.init("core", npmRoot, {
                        verbose: true,
                        select: /register.js/
                      }),
                      Main.realRequire(file))
                    : undefined,
                  {})
            );
        };
        this.loadConfig = (npmRoot, vivifyConfigFile = false) =>
          this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
            let configFilepath;
            configFilepath = path.join(process.cwd(), this.configBasename);
            return __webpack_require__(/*! glob-promise */ 33)(configFilepath + "*")
              .then(results =>
                results.length > 0
                  ? Main.realRequire(configFilepath)
                  : (vivifyConfigFile
                      ? this.init("core", npmRoot, {
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
                      .then(exists =>
                        exists ? Main.realRequire(packageFile) : {}
                      );
                return p.then(finalNpm => merge(config, { npm: finalNpm }));
              });
          });
        this.init = function(recipeName, npmRoot, options) {
          let pretend, verbose, recipe;
          pretend = options.pretend;
          verbose = options.verbose;
          if (pretend && !verbose) {
            options = merge(options, { verbose: true });
          }
          if (recipeName === true) {
            recipeName = null;
          }
          recipeName = upperCamelCase(recipeName != null ? recipeName : "core");
          return recipeName === "Help"
            ? (log(
                `Please select a valid recipe name:\n\n  ${Caf.toString(
                  __webpack_require__(/*! ./Recipes */ 34)
                    .getModuleNames()
                    .join("\n  ")
                )}\n\nEx: abc -i node`
              ),
              Promise.reject("exiting"))
            : (this.log(
                `\n${Caf.toString(
                  pretend ? "PRETEND-" : undefined
                )}INIT-${Caf.toString(recipeName)}: ${Caf.toString(npmRoot)}`
              ),
              !(recipe = __webpack_require__(/*! ./Recipes */ 34)[recipeName])
                ? Promise.reject(
                    `Please provide a valid recipe name. \`${Caf.toString(
                      recipeName
                    )}\` not found in. Valid recipes: ${Caf.toString(
                      __webpack_require__(/*! ./Recipes */ 34)
                        .getModuleNames()
                        .join(", ")
                    )}.`
                  )
                : (recipe.writeFiles(npmRoot, options),
                  this.log(
                    `${Caf.toString(
                      pretend ? "PRETEND-" : undefined
                    )}INIT-${Caf.toString(recipeName)}: done`
                  )));
        };
        this.pretendWriteConfig = function(npmRoot, abcConfig) {
          return this.log(
            formattedInspect(
              merge({
                abcConfig,
                npm: {
                  out: {
                    "package.json": ConfigurePackageJson.get(npmRoot, abcConfig)
                  }
                },
                indexHtml: abcConfig.indexHtml ? "<html>\n</html>" : undefined,
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
              }),
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
          this.log(`\nNeptuneNamespaces: ${Caf.toString(npmRoot)}`);
          return __webpack_require__(/*! ./RunNeptuneNamespaces */ 41)(npmRoot, isWebpackDevServer);
        };
        this.loadAndWriteConfig = function(npmRoot, options) {
          let pretend, configure, init;
          ({ pretend, configure, init } = options);
          this.log(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
          return this.loadConfig(npmRoot, configure).then(abcConfig =>
            pretend
              ? this.pretendWriteConfig(npmRoot, abcConfig)
              : this.writeConfig(npmRoot, abcConfig)
          );
        };
        this.writeConfig = function(npmRoot, abcConfig) {
          ConfigurePackageJson.writeConfig(npmRoot, abcConfig);
          return ConfigureWebpack.writeConfig(npmRoot, abcConfig);
        };
        this.getWebpackConfig = (npmRoot, env, argv) =>
          this.loadConfig(npmRoot).then(abcConfig => {
            this.writeConfig(npmRoot, abcConfig);
            return this.runNeptuneNamespaces(npmRoot).then(() =>
              ConfigureWebpack.get(npmRoot, abcConfig, { env, argv })
            );
          });
        this.updateFile = function(fileName, contents) {
          let oldContents;
          if (fs.existsSync(fileName)) {
            oldContents = fs.readFileSync(fileName).toString();
          }
          return oldContents !== contents
            ? (this.log("writing: ".gray + fileName.green),
              fs.writeFileSync(fileName, contents))
            : this.log(`same:    ${Caf.toString(fileName)}`.gray);
        };
      }));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 14 */
/*!**********************************************************!*\
  !*** ./source/Art.Build.Configurator/StandardImport.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 15).mergeWithSelf(
    __webpack_require__(/*! art-class-system */ 16),
    __webpack_require__(/*! ./Data */ 17),
    { Configurator: __webpack_require__(/*! ./namespace */ 7) },
    { fs: __webpack_require__(/*! fs-extra */ 25), path: __webpack_require__(/*! path */ 23) }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 15 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 16 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 17 */
/*!*****************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Data/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 10))

.addModules({
  StandardDependencies:    __webpack_require__(/*! ./StandardDependencies */ 18),
  StandardDevDependencies: __webpack_require__(/*! ./StandardDevDependencies */ 19),
  StandardPackageJson:     __webpack_require__(/*! ./StandardPackageJson */ 20),
  StandardWebpackConfig:   __webpack_require__(/*! ./StandardWebpackConfig */ 22)
});

/***/ }),
/* 18 */
/*!*********************************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/StandardDependencies.caf ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return { "art-build-configurator": "*" };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 19 */
/*!************************************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/StandardDevDependencies.caf ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return {
    webpack: "^4.32.2",
    "webpack-cli": "*",
    "webpack-dev-server": "^3.4.1",
    "webpack-stylish": "^0.1.8",
    "case-sensitive-paths-webpack-plugin": "^2.1.2",
    "webpack-merge": "^4.2.1",
    "webpack-node-externals": "^1.7.2",
    mocha: "^5.2.0",
    chai: "^4.2.0",
    "mock-fs": "^4.10.0",
    "art-testbench": "*"
  };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 20 */
/*!********************************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/StandardPackageJson.caf ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["peek", "process", "JSON", "merge"],
    [global, __webpack_require__(/*! art-standard-lib */ 15)],
    (peek, process, JSON, merge) => {
      let StandardPackageJson;
      return (StandardPackageJson = Caf.defClass(
        class StandardPackageJson extends Object {},
        function(StandardPackageJson, classSuper, instanceSuper) {
          this.get = function(abcConfig) {
            let base, base1;
            return {
              license: "ISC",
              name: peek(process.cwd().split("/")),
              version: __webpack_require__(/*! fs */ 21).existsSync("package.json")
                ? JSON.parse(
                    __webpack_require__(/*! fs */ 21)
                      .readFileSync("package.json")
                      .toString()
                  ).version
                : "0.0.1",
              author: 'Shane Brinkman-Davis Delamore, Imikimi LLC"',
              dependencies: __webpack_require__(/*! ./StandardDependencies */ 18),
              devDependencies: __webpack_require__(/*! ./StandardDevDependencies */ 19),
              scripts: merge({
                test:
                  Caf.exists(abcConfig) &&
                  (Caf.exists((base = abcConfig.target)) && base.node)
                    ? "nn -s;mocha -u tdd"
                    : "webpack-dev-server  --progress --env.devServer",
                start:
                  "webpack-dev-server --hot --inline --progress --env.devServer",
                testInBrowser:
                  Caf.exists(abcConfig) &&
                  (Caf.exists((base1 = abcConfig.target)) && base1.node)
                    ? "webpack-dev-server --progress --env.devServer"
                    : undefined,
                build: "webpack --progress"
              })
            };
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 21 */
/*!*********************************************************************!*\
  !*** external "require('fs' /* ABC - not inlining fellow NPM *_/)" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 22 */
/*!**********************************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/StandardWebpackConfig.caf ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["getEnv"],
    [global, __webpack_require__(/*! art-standard-lib */ 15)],
    getEnv => {
      let StandardWebpackConfig;
      return (StandardWebpackConfig = Caf.defClass(
        class StandardWebpackConfig extends Object {},
        function(StandardWebpackConfig, classSuper, instanceSuper) {
          this.get = function(npmRoot, abcConfig, targetNode) {
            let outputPath, temp, temp1;
            outputPath =
              undefined !== (temp = abcConfig.webpack.outputPath)
                ? temp
                : "build";
            return {
              mode:
                (temp1 = getEnv().webpackMode) != null
                  ? temp1
                  : targetNode
                  ? "none"
                  : "development",
              resolve: {
                extensions: [
                  ".webpack.js",
                  ".web.js",
                  ".coffee",
                  ".caf",
                  ".caffeine",
                  ".js",
                  ".json"
                ]
              },
              output: {
                path: __webpack_require__(/*! path */ 23).join(npmRoot, outputPath),
                filename: "[name].js"
              },
              plugins: [new (__webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 24))()],
              module: {
                rules: [
                  {
                    test: /\.caf(feine)?$/,
                    use: {
                      loader: "caffeine-mc/webpack-loader",
                      options: { prettier: true }
                    }
                  },
                  { test: /\.coffee$/, use: { loader: "coffee-loader" } },
                  {
                    test: /\.(coffee\.md|litcoffee)$/,
                    use: { loader: "coffee-loader?literate" }
                  },
                  { test: /\.css$/, use: ["style-loader", "css-loader"] },
                  {
                    test: /\.png$/,
                    use: { loader: "url-loader?limit=100000" }
                  },
                  { test: /\.jpg$/, use: { loader: "file-loader" } }
                ]
              }
            };
          };
          this.js =
            'module.exports = (env, argv) => require("art-build-configurator").getWebpackConfig(__dirname, env, argv);';
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 23 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 24 */
/*!******************************************************************************************************!*\
  !*** external "require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 25 */
/*!***************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 26 */
/*!**************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Configurators/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 9))

.addModules({
  ConfigureBase:        __webpack_require__(/*! ./ConfigureBase */ 27),
  ConfigureIndexHtml:   __webpack_require__(/*! ./ConfigureIndexHtml */ 28),
  ConfigurePackageJson: __webpack_require__(/*! ./ConfigurePackageJson */ 30),
  ConfigureWebpack:     __webpack_require__(/*! ./ConfigureWebpack */ 31)
});

/***/ }),
/* 27 */
/*!***********************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/ConfigureBase.caf ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "path"],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    (BaseClass, path) => {
      let ConfigureBase;
      return (ConfigureBase = Caf.defClass(
        class ConfigureBase extends BaseClass {},
        function(ConfigureBase, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.getFileContents = function(npmRoot, abcConfig) {
            return this.get(npmRoot, abcConfig) + "\n";
          };
          this.writeConfig = function(npmRoot, abcConfig) {
            return __webpack_require__(/*! ../Main */ 13).updateFile(
              path.join(npmRoot, this.outFileName),
              this.getFileContents(npmRoot, abcConfig)
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 28 */
/*!****************************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/ConfigureIndexHtml.caf ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Html", "Body", "Ul", "Li", "A"],
    [
      global,
      __webpack_require__(/*! ../StandardImport */ 14),
      __webpack_require__(/*! art-browser-tools */ 29).DomElementFactories
    ],
    (Html, Body, Ul, Li, A) => {
      let ConfigureIndexHtml;
      return (ConfigureIndexHtml = Caf.defClass(
        class ConfigureIndexHtml extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigureIndexHtml, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.get = (npmRoot, abcConfig) =>
            Html(
              Body(
                Ul(
                  Caf.array(["Client", "Admin"], target =>
                    Li(
                      A({ href: `./${Caf.toString(target)}` }, target),
                      "(",
                      A({ href: `./${Caf.toString(target)}?dev` }, "dev"),
                      ")"
                    )
                  )
                )
              )
            );
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 29 */
/*!************************************************************************************!*\
  !*** external "require('art-browser-tools' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-browser-tools' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 30 */
/*!******************************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/ConfigurePackageJson.caf ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isFunction",
      "StandardPackageJson",
      "deepMerge",
      "consistentJsonStringify"
    ],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    (isFunction, StandardPackageJson, deepMerge, consistentJsonStringify) => {
      let ConfigurePackageJson;
      return (ConfigurePackageJson = Caf.defClass(
        class ConfigurePackageJson extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigurePackageJson, classSuper, instanceSuper) {
          this.outFileName = "package.json";
          this.get = (npmRoot, abcConfig) => {
            let npmConfig;
            return isFunction((npmConfig = abcConfig.npm))
              ? npmConfig(StandardPackageJson.get(abcConfig))
              : deepMerge(StandardPackageJson.get(abcConfig), npmConfig);
          };
          this.getFileContents = (npmRoot, abcConfig) =>
            consistentJsonStringify(this.get(npmRoot, abcConfig), "  ") + "\n";
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 31 */
/*!**************************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/ConfigureWebpack.caf ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "StandardWebpackConfig",
      "webpackMerge",
      "compactFlatten",
      "objectWithout",
      "objectKeyCount",
      "merge",
      "isRegExp",
      "isFunction",
      "isPlainObject",
      "Error",
      "String"
    ],
    [
      global,
      __webpack_require__(/*! ../StandardImport */ 14),
      __webpack_require__(/*! ../Data */ 17),
      { webpackMerge: __webpack_require__(/*! webpack-merge */ 32) }
    ],
    (
      StandardWebpackConfig,
      webpackMerge,
      compactFlatten,
      objectWithout,
      objectKeyCount,
      merge,
      isRegExp,
      isFunction,
      isPlainObject,
      Error,
      String
    ) => {
      let nodeExternals, Configurator, ConfigureWebpack;
      nodeExternals = null;
      Configurator = __webpack_require__(/*! ./namespace */ 9);
      return (ConfigureWebpack = Caf.defClass(
        class ConfigureWebpack extends __webpack_require__(/*! ./ConfigureBase */ 27) {},
        function(ConfigureWebpack, classSuper, instanceSuper) {
          this.outFileName = "webpack.config.js";
          this.get = (npmRoot, abcConfig, webpackConfigOptions) => {
            let env,
              devServer,
              argv,
              config,
              common,
              targets,
              targetNode,
              standard,
              baseConfig,
              entriesWithNoOverrides,
              temp,
              base;
            abcConfig != null ? abcConfig : (abcConfig = {});
            if (Caf.exists(webpackConfigOptions)) {
              env = webpackConfigOptions.env;
              if (Caf.exists(env)) {
                devServer = env.devServer;
              }
              argv = webpackConfigOptions.argv;
            }
            temp = config = abcConfig.webpack || (abcConfig.webpack = {});
            common = temp.common;
            targets = temp.targets;
            targetNode =
              !devServer &&
              !!(Caf.exists((base = abcConfig.target)) && base.node);
            standard = StandardWebpackConfig.get(
              npmRoot,
              abcConfig,
              targetNode
            );
            baseConfig = webpackMerge(standard, common);
            targets || (targets = { index: {} });
            entriesWithNoOverrides = null;
            return compactFlatten(
              Caf.array(this.normalizeTargets(targets), targetConfig => {
                let includeNpms, keys, webpackEntry;
                ({ includeNpms } = targetConfig);
                if (includeNpms) {
                  targetConfig = objectWithout(targetConfig, "includeNpms");
                }
                return !entriesWithNoOverrides ||
                  (keys = 1 < objectKeyCount(targetConfig))
                  ? ((webpackEntry = webpackMerge(baseConfig, targetConfig)),
                    targetNode
                      ? webpackEntry.target || (webpackEntry.target = "node")
                      : undefined,
                    (config = this.normalizeTargetConfig(
                      webpackEntry,
                      includeNpms
                    )),
                    !keys ? (entriesWithNoOverrides = config) : undefined,
                    config)
                  : ((entriesWithNoOverrides.entry = merge(
                      entriesWithNoOverrides.entry,
                      targetConfig.entry
                    )),
                    null);
              })
            );
          };
          this.getTargets = function() {};
          this.normalizeTargetConfig = function(targetConfig, includeNpms) {
            return targetConfig.target === "node"
              ? webpackMerge(
                  {
                    output: { libraryTarget: "commonjs2", pathinfo: true },
                    externals: [
                      nodeExternals ||
                        (nodeExternals = (context, request, callback) => {
                          let shouldInclude;
                          return request.match(/^[^.]/)
                            ? ((shouldInclude = includeNpms
                                ? (() => {
                                    switch (false) {
                                      case !isRegExp(includeNpms):
                                        return includeNpms.test(request);
                                      case !isFunction(includeNpms):
                                        return includeNpms(request);
                                    }
                                  })()
                                : undefined),
                              shouldInclude
                                ? callback()
                                : callback(
                                    null,
                                    `root require('${Caf.toString(
                                      request
                                    )}' /* ABC - not inlining fellow NPM */)`
                                  ))
                            : callback();
                        })
                    ]
                  },
                  targetConfig
                )
              : webpackMerge({ output: { pathinfo: true } }, targetConfig);
          };
          this.normalizeTargets = function(targets = {}) {
            let from, into, temp;
            if (!isPlainObject(targets)) {
              throw new Error("targets must be an object");
            }
            return (
              (from = targets),
              (into = {}),
              from != null
                ? (() => {
                    for (let k in from) {
                      let targetConfig, targetName, entry;
                      targetConfig = from[k];
                      targetName = k;
                      temp = targetConfig
                        ? (into[k] = (Caf.is(
                            (entry = targetConfig.entry),
                            String
                          )
                            ? (targetConfig = objectWithout(
                                targetConfig,
                                "entry"
                              ))
                            : undefined,
                          webpackMerge(
                            {
                              entry: {
                                [targetName]:
                                  entry != null
                                    ? entry
                                    : `./${Caf.toString(targetName)}`
                              }
                            },
                            targetConfig
                          )))
                        : undefined;
                    }
                    return temp;
                  })()
                : undefined,
              into
            );
          };
          this.getFileContents = function() {
            return StandardWebpackConfig.js;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 32 */
/*!********************************************************************************!*\
  !*** external "require('webpack-merge' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('webpack-merge' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 33 */
/*!*******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 34 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Recipes/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 11))

.addModules({
  ClientApp: __webpack_require__(/*! ./ClientApp */ 35),
  Core:      __webpack_require__(/*! ./Core */ 38),
  DemoApp:   __webpack_require__(/*! ./DemoApp */ 39),
  Node:      __webpack_require__(/*! ./Node */ 40)
});

/***/ }),
/* 35 */
/*!*************************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/ClientApp.caf ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge"],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    deepMerge => {
      let ClientApp;
      return (ClientApp = Caf.defClass(
        class ClientApp extends __webpack_require__(/*! ../Recipe */ 36) {},
        function(ClientApp, classSuper, instanceSuper) {
          this.getter({
            files: function() {
              return deepMerge(
                this.recipe(__webpack_require__(/*! ./Core */ 38), { targets: "Client" }),
                {
                  "Client.caf": `&source/${Caf.toString(
                    this.cafRequireFriendlyNamespaceDirPath
                  )}/Client`,
                  "index.html":
                    '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>\n</body></html>',
                  source: {
                    [this.namespaceDirPath]: {
                      _Client: {
                        "StandardImport.caf": "&ArtSuite",
                        "Main.caf": `import &StandardImport\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                          this.packageDotName
                        )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement\n          draw:       #eee\n\n          TextElement\n            padding:  10\n            text:     "" 'Hello world!' - ${Caf.toString(
                          this.packageDotName
                        )}`
                      }
                    }
                  }
                }
              );
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 36 */
/*!**************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipe.caf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "fileBuilder",
      "merge",
      "path",
      "upperCamelCase",
      "dashCase",
      "getCapitalizedCodeWords",
      "peek",
      "process"
    ],
    [
      global,
      __webpack_require__(/*! ./StandardImport */ 14),
      __webpack_require__(/*! art-filebuilder */ 37),
      { path: __webpack_require__(/*! path */ 23) }
    ],
    (
      BaseClass,
      fileBuilder,
      merge,
      path,
      upperCamelCase,
      dashCase,
      getCapitalizedCodeWords,
      peek,
      process
    ) => {
      let Recipe;
      return (Recipe = Caf.defClass(
        class Recipe extends BaseClass {
          constructor(packageRoot, options) {
            super(...arguments);
            this._packageRoot =
              packageRoot != null ? packageRoot : process.cwd();
            this._options = options != null ? options : {};
            this._namespacePath = this._options.namespacePath;
          }
        },
        function(Recipe, classSuper, instanceSuper) {
          this.getFiles = function(packageRoot, options) {
            return new this(packageRoot, options).files;
          };
          this.writeFiles = function(packageRoot, options) {
            return fileBuilder(this.getFiles(packageRoot, options)).write(
              options
            );
          };
          this.prototype.recipe = function(recipeClass, moreOptions) {
            return recipeClass.getFiles(
              this.packageRoot,
              merge(this.options, moreOptions)
            );
          };
          this.getter("options", "packageRoot", {
            packageName: function() {
              return path.basename(this.packageRoot);
            },
            packageUppercaseName: function() {
              return upperCamelCase(this.npmName);
            },
            packageDotName: function() {
              return this.namespacePath.join(".");
            },
            packageDashName: function() {
              return dashCase(this.packageName);
            },
            namespacePath: function() {
              let temp;
              return (temp = this._namespacePath) != null
                ? temp
                : (this._namespacePath = getCapitalizedCodeWords(this.npmName));
            },
            namespaceDirPath: function() {
              return this.namespacePath.join(".");
            },
            mostSpecificName: function() {
              return peek(this.namespacePath);
            },
            npmRoot: function() {
              return this.packageRoot;
            },
            npmName: function() {
              return path.basename(this.packageRoot);
            },
            cafRequireFriendlyNamespaceDirPath: function() {
              return this.namespacePath.join("").replace(".", "");
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 37 */
/*!**********************************************************************************!*\
  !*** external "require('art-filebuilder' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-filebuilder' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 38 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/Core.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["String"],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    String => {
      let Core;
      return (Core = Caf.defClass(
        class Core extends __webpack_require__(/*! ../Recipe */ 36) {},
        function(Core, classSuper, instanceSuper) {
          this.getter({
            files: function() {
              let targets;
              targets = this.options.targets;
              if (Caf.is(targets, String)) {
                targets = [targets];
              } else {
                targets != null ? targets : (targets = ["index"]);
              }
              return {
                ".gitignore": "node_modules/",
                ".travis.yml": 'language: node_js\nnode_js:\n  - "8"',
                "register.js":
                  "require('coffee-script/register'); require('caffeine-mc/register');",
                "art.build.config.caf": `${Caf.toString(
                  this.options.node
                    ? "target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: true"
                    : undefined
                )}\n\nnpm:\n  description: "" ${Caf.toString(
                  this.packageDotName
                )}\n  dependencies:\n    art-build-configurator: :*\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
                  Caf.array(
                    targets,
                    target => `${Caf.toString(target)}: {}`
                  ).join(", ")
                )}`,
                "README.md": `# ${Caf.toString(
                  this.packageDotName
                )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
                  this.packageDashName
                )}\n\`\`\``,
                test: {
                  "index.js":
                    "require('../register');\nrequire('./index.caf');",
                  "index.caf":
                    "&StandardImport\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests",
                  "StandardImport.caf": `&ArtStandardLib.mergeWithSelf\n  &ArtClassSystem\n  &ArtTestbench\n  &${Caf.toString(
                    this.packageUppercaseName
                  )}`,
                  tests: {
                    [this.namespaceDirPath]: {
                      "Test.caf": `import &StandardImport\nsuite: ->\n  test '${Caf.toString(
                        this.mostSpecificName
                      )}' -> assert.eq 1, 1`
                    }
                  }
                },
                source: {
                  "index.js": `module.exports = require('./${Caf.toString(
                    this.namespaceDirPath
                  )}');`,
                  [this.namespaceDirPath]: {
                    "StandardImport.caf":
                      "&ArtStandardLib.mergeWithSelf\n  &ArtClassSystem"
                  }
                }
              };
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 39 */
/*!***********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/DemoApp.caf ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge"],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    deepMerge => {
      let DemoApp;
      return (DemoApp = Caf.defClass(
        class DemoApp extends __webpack_require__(/*! ../Recipe */ 36) {},
        function(DemoApp, classSuper, instanceSuper) {
          this.getter({
            files: function() {
              return deepMerge(this.recipe(__webpack_require__(/*! ./ClientApp */ 35)), {
                source: {
                  [this.namespaceDirPath]: {
                    "StandardImport.caf": "&ArtSuite/Node",
                    _Client: {
                      "Main.caf": `import &StandardImport\n&Models\n&Pipelines\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                        this.packageDotName
                      )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement &Components/App()`,
                      Components: {
                        "User.caf":
                          'import &StandardImport\n\nclass User extends FluxComponent\n\n  delete: ->\n    pipelines.user.delete @props.user?.id\n    .then -> @models.allUsers.reload ""\n\n  render: ->\n    Element\n      :parentWidthChildrenHeight\n      animators: size: toFrom: h: 0\n      :clip\n      Element\n        :parentWidthChildrenHeight\n        :row :childrenCenterLeft\n        childrenMargins: 10\n        TextElement\n          &TextStyles.text\n          :parentWidthChildrenHeight\n          text:       @props.user?.name\n        &Button\n          text: :delete\n          action: @delete',
                        "Users.caf":
                          'import &StandardImport\n\nclass Users extends FluxComponent\n  @subscriptions\n    allUsers: ""\n    :viewState.descending\n\n  render: ->\n    ScrollElement\n      clip: true\n      childrenMargins: 10\n      array user from @allUsers?.sort\n          if @descending\n            (a, b) -> a.name.localeCompare b.name\n          else\n            (a, b) -> b.name.localeCompare a.name\n        &User {} user, key: user.id',
                        "App.caf": `import &StandardImport\n\nclass App extends FluxComponent\n  @subscriptions :viewState.descending\n\n  addUser: ->\n    @models.user.create data: name: randomElement []\n      :Craig   :David   :Elle      :Frank,\n      :Greg    :Hank    :Ian       :Jan,\n      :Kelly   :Lois    :Mary      :Noah,\n      :Piper   :Quinn   :Robert    :Sally,\n      :Tuck    :Udy     :Violette  :William,\n      :Xavier  :Yesler  :Zane\n\n    .then ->\n      @models.allUsers.reload ""\n\n  render: ->\n    Element\n      &StyleProps.background\n\n      Element\n        padding: 10\n        childrenLayout:   :column\n        childrenMargins:  10\n\n        Element\n          margin: 10\n          :parentWidthChildrenHeight\n          :row :childrenCenterLeft\n          childrenMargins:  10\n          TextElement\n            &TextStyles.titleText\n            :parentWidthChildrenHeight\n            text:   :${Caf.toString(
                          this.packageDotName
                        )}\n\n          &Button\n            text:   if @descending then :descending else :ascending\n            action: @models.viewState.toggleDescending\n\n          &Button\n            text:   :add-user\n            action: @addUser\n\n        &Users()`,
                        "Button.caf":
                          "import &StandardImport\n\nclass Button extends PointerActionsMixin Component\n\n  render: ->\n    Element\n      on:         @pointerHandlers\n      size:       cs: 1\n      padding:    10\n      cursor:     :pointer\n      animators:  :draw\n      draw:\n        rectangle: radius: 5\n        &Palette[if @hover then :secondary else :primary]\n\n      TextElement\n        &TextStyles.text\n        :childrenSize\n        color:  &TextPalette.white.primary\n        text:   @props.text"
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
                        "ViewState.caf":
                          "import &StandardImport\n\nclass ViewState extends ApplicationState\n  @stateFields\n    descending: true"
                      }
                    },
                    Pipelines: {
                      "User.caf":
                        "import &StandardImport\n\nclass User extends Pipeline\n  @publicRequestTypes :get :create :update :delete :allUsers\n  @query\n    allUsers: (request) -> array request.pipeline.db\n\n  constructor: ->\n    super\n    @db =\n      abc123: id: :abc123 name: :Alice\n      efg456: id: :efg456 name: :Bill\n\n  @handlers\n    get: ({key}) ->\n      @db[key]\n\n    create: ({data}) ->\n      @db[id = randomString()] = merge data, {} id\n\n    update: ({data, key}) ->\n      if @db[key]\n        @db[key] = merge @db[key], data\n\n    delete: ({key}) ->\n      if @db[key]\n        @db = objectWithout @db, key\n        true"
                    }
                  }
                }
              });
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 40 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/Node.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, __webpack_require__(/*! ../StandardImport */ 14)],
    merge => {
      let Node;
      return (Node = Caf.defClass(
        class Node extends __webpack_require__(/*! ../Recipe */ 36) {},
        function(Node, classSuper, instanceSuper) {
          this.getter({
            files: function() {
              return merge(this.recipe(__webpack_require__(/*! ./Core */ 38), { node: true }), {
                "index.js":
                  "if (false) { // use build? - true == fast, false == good for development\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./index.caf');\n};",
                "index.caf": `&source/${Caf.toString(
                  this.cafRequireFriendlyNamespaceDirPath
                )}`
              });
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 41 */
/*!****************************************************************!*\
  !*** ./source/Art.Build.Configurator/RunNeptuneNamespaces.caf ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "log"],
    [global, __webpack_require__(/*! ./StandardImport */ 14), __webpack_require__(/*! ./Main */ 13)],
    (Promise, log) => {
      let NeptuneNamespacesGenerator;
      NeptuneNamespacesGenerator = __webpack_require__(/*! neptune-namespaces/generator */ 42);
      return function(dirname, watch) {
        let existingRoots, workers;
        existingRoots = Caf.array(
          NeptuneNamespacesGenerator.standardRoots,
          root => root,
          root =>
            __webpack_require__(/*! fs */ 21).existsSync(
              `${Caf.toString(dirname)}/${Caf.toString(root)}`
            )
        );
        Caf.array(existingRoots, root =>
          log(
            "neptune-namespaces scanning: ".grey +
              `${Caf.toString(
                __webpack_require__(/*! path */ 23).basename(dirname)
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 42 */
/*!***********************************************************************************************!*\
  !*** external "require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 43 */
/*!***************************************************!*\
  !*** ./source/Art.Build.Configurator/Publish.caf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 44 */
/*!******************************************************!*\
  !*** ./source/Art.Build.Configurator/Versioning.caf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "JSON"],
    [global, __webpack_require__(/*! ./StandardImport */ 14)],
    (BaseClass, JSON) => {
      let Versioning;
      return (Versioning = Caf.defClass(
        class Versioning extends BaseClass {},
        function(Versioning, classSuper, instanceSuper) {
          this.classGetter({
            current: function() {
              return JSON.parse(
                __webpack_require__(/*! fs */ 21)
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 45 */,
/* 46 */
/*!*******************!*\
  !*** ./index.caf ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! ./source/Art.Build.Configurator */ 6);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ })
/******/ ]);