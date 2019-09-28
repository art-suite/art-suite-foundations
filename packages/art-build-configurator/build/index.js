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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
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
/* 5 */,
/* 6 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, bugs, dependencies, description, devDependencies, homepage, license, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Shane Brinkman-Davis Delamore, Imikimi LLC\",\"bin\":{\"abc\":\"./abc\",\"art-build-configurator\":\"./art-build-configurator\"},\"bugs\":\"https:/github.com/art-suite/art-build-configurator/issues\",\"dependencies\":{\"art-browser-tools\":\"*\",\"art-build-configurator\":\"*\",\"art-class-system\":\"*\",\"art-config\":\"*\",\"art-filebuilder\":\"*\",\"art-object-tree-factory\":\"*\",\"art-standard-lib\":\"*\",\"bluebird\":\"^3.5.5\",\"caffeine-script\":\"*\",\"caffeine-script-runtime\":\"*\",\"coffee-script\":\"^1.12.7\",\"colors\":\"^1.3.2\",\"commander\":\"^2.19.0\",\"dateformat\":\"^3.0.3\",\"detect-node\":\"^2.0.4\",\"fs-extra\":\"^8.0.0\",\"glob\":\"^7.1.4\",\"glob-promise\":\"^3.4.0\",\"neptune-namespaces\":\"*\",\"pluralize\":\"^8.0.0\"},\"description\":\"Tools for configuring npm (package.json) and webpack (webpack.config.js)\",\"devDependencies\":{\"art-testbench\":\"*\",\"case-sensitive-paths-webpack-plugin\":\"^2.2.0\",\"chai\":\"^4.2.0\",\"coffee-loader\":\"^0.7.3\",\"css-loader\":\"^3.0.0\",\"json-loader\":\"^0.5.7\",\"mocha\":\"^6.2.0\",\"mock-fs\":\"^4.10.0\",\"script-loader\":\"^0.7.2\",\"style-loader\":\"^1.0.0\",\"webpack\":\"^4.39.1\",\"webpack-cli\":\"*\",\"webpack-dev-server\":\"^3.7.2\",\"webpack-merge\":\"^4.2.1\",\"webpack-node-externals\":\"^1.7.2\",\"webpack-stylish\":\"^0.1.8\"},\"homepage\":\"https://github.com/art-suite/art-build-configurator\",\"license\":\"ISC\",\"name\":\"art-build-configurator\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/art-suite/art-build-configurator.git\"},\"scripts\":{\"build\":\"webpack --progress\",\"start\":\"webpack-dev-server --hot --inline --progress --env.devServer\",\"test\":\"nn -s;mocha -u tdd\",\"testInBrowser\":\"webpack-dev-server --progress --env.devServer\"},\"version\":\"1.26.8\"}");

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
/*!*******************!*\
  !*** ./index.caf ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! ./source/Art.Build.Configurator */ 9);
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 9 */
/*!************************************************!*\
  !*** ./source/Art.Build.Configurator/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 10))
.includeInNamespace(__webpack_require__(/*! ./Configurator */ 15))
.addModules({
  Main:                 __webpack_require__(/*! ./Main */ 16),
  Publish:              __webpack_require__(/*! ./Publish */ 48),
  Recipe:               __webpack_require__(/*! ./Recipe */ 40),
  RecipeRegistry:       __webpack_require__(/*! ./RecipeRegistry */ 42),
  RunNeptuneNamespaces: __webpack_require__(/*! ./RunNeptuneNamespaces */ 46),
  ShellExecSimple:      __webpack_require__(/*! ./ShellExecSimple */ 23),
  StandardImport:       __webpack_require__(/*! ./StandardImport */ 17),
  Versioning:           __webpack_require__(/*! ./Versioning */ 49)
});
__webpack_require__(/*! ./Configurators */ 30);
__webpack_require__(/*! ./Data */ 19);
__webpack_require__(/*! ./Recipes */ 38);

/***/ }),
/* 10 */
/*!****************************************************!*\
  !*** ./source/Art.Build.Configurator/namespace.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/namespace.js

module.exports = __webpack_require__(/*! neptune-namespaces */ 11).addNamespace(
  'Art.Build.Configurator',
  (class Configurator extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../package.json */ 6))
);
__webpack_require__(/*! ./Configurators/namespace */ 12);
__webpack_require__(/*! ./Data/namespace */ 13);
__webpack_require__(/*! ./Recipes/namespace */ 14);

/***/ }),
/* 11 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 12 */
/*!******************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/namespace.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Configurators/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 10).addNamespace(
  'Configurators',
  class Configurators extends Neptune.PackageNamespace {}
);


/***/ }),
/* 13 */
/*!*********************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/namespace.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Data/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 10).addNamespace(
  'Data',
  class Data extends Neptune.PackageNamespace {}
);


/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/namespace.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Recipes/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 10).addNamespace(
  'Recipes',
  class Recipes extends Neptune.PackageNamespace {}
);


/***/ }),
/* 15 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurator.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return [__webpack_require__(/*! ./Main */ 16)];
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 16 */
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
      "dashCase",
      "ConfigureWebpack"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ 17), __webpack_require__(/*! ./Configurators */ 30)],
    (
      log,
      Promise,
      path,
      fs,
      process,
      ConfigurePackageJson,
      merge,
      dashCase,
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
          let pretend, configure, init, force, quiet, git, temp;
          pretend = options.pretend;
          configure = options.configure;
          init = options.init;
          force = options.force;
          quiet = options.quiet;
          git = options.git;
          (temp = this.quiet) != null ? temp : (this.quiet = quiet);
          if (pretend) {
            this.log("PRETEND".green);
          }
          return Promise.then(() =>
            init ? this.init(init, npmRoot, options) : undefined
          )
            .then(() =>
              !(pretend && init)
                ? this.loadAndWriteConfig(npmRoot, options)
                : undefined
            )
            .then(() =>
              !(pretend && init)
                ? this.runNeptuneNamespaces(npmRoot)
                : undefined
            )
            .then(() =>
              git
                ? __webpack_require__(/*! fs */ 26).existsSync(".git")
                  ? this.log(
                      "git already initialized. Not touching it. Cheers!".yellow
                    )
                  : (this.log("initializing git...".yellow),
                    __webpack_require__(/*! ./ShellExecSimple */ 23)("git init")
                      .then(() => __webpack_require__(/*! ./ShellExecSimple */ 23)("git add ."))
                      .then(() =>
                        __webpack_require__(/*! ./ShellExecSimple */ 23)(
                          `git commit -m "initial checkin by art-build-configurator${Caf.toString(
                            init ? ` --init ${Caf.toString(init)}` : ""
                          )}"`
                        )
                      )
                      .then(() => this.log("git initialized".yellow)))
                : undefined
            );
        };
        this.shellExec = function(command) {
          return __webpack_require__(/*! ./ShellExecSimple */ 23)(command, { quiet: this.quiet });
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
            return __webpack_require__(/*! glob-promise */ 37)(configFilepath + "*")
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
          recipeName = dashCase(recipeName != null ? recipeName : "core");
          return recipeName === "Help"
            ? (log(
                `Please select a valid recipe name:\n\n  ${Caf.toString(
                  __webpack_require__(/*! ./Recipes */ 38)
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
              !(recipe = __webpack_require__(/*! ./RecipeRegistry */ 42).recipes[recipeName])
                ? (log({
                    recipes: Caf.object(
                      __webpack_require__(/*! ./RecipeRegistry */ 42).recipes,
                      (recipe, name) => {
                        let temp;
                        return (temp = recipe.description) != null
                          ? temp
                          : "(no description)";
                      }
                    )
                  }),
                  Promise.reject("Please provide a valid recipe name."))
                : (recipe.writeFiles(npmRoot, options),
                  this.log(
                    `${Caf.toString(
                      pretend ? "PRETEND-" : undefined
                    )}INIT-${Caf.toString(recipeName)}: done`
                  )));
        };
        this.pretendWriteConfig = function(npmRoot, abcConfig) {
          return Promise.deepAll(
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
                out: { "webpack.config.js": ConfigureWebpack.getFileContents() }
              }
            })
          ).then(this.log);
        };
        this.runNeptuneNamespaces = function(npmRoot, options) {
          let executable, firstArg, isWebpackDevServer;
          [executable, firstArg] = process.argv;
          isWebpackDevServer = !!(
            executable.match(/\/node$/) &&
            (Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/))
          );
          this.log(`\nNeptuneNamespaces: ${Caf.toString(npmRoot)}`);
          return __webpack_require__(/*! ./RunNeptuneNamespaces */ 46)(npmRoot, isWebpackDevServer);
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
          return Promise.then(() =>
            ConfigurePackageJson.writeConfig(npmRoot, abcConfig)
          ).then(() => ConfigureWebpack.writeConfig(npmRoot, abcConfig));
        };
        this.getWebpackConfig = (npmRoot, env, argv) =>
          this.loadConfig(npmRoot).then(abcConfig =>
            this.writeConfig(npmRoot, abcConfig).then(() =>
              this.runNeptuneNamespaces(npmRoot).then(() =>
                ConfigureWebpack.get(npmRoot, abcConfig, { env, argv })
              )
            )
          );
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
/* 17 */
/*!**********************************************************!*\
  !*** ./source/Art.Build.Configurator/StandardImport.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 7).mergeWithSelf(
    __webpack_require__(/*! art-class-system */ 18),
    __webpack_require__(/*! ./Data */ 19),
    { Configurator: __webpack_require__(/*! ./namespace */ 10) },
    { fs: __webpack_require__(/*! fs-extra */ 29), path: __webpack_require__(/*! path */ 25) }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 18 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 19 */
/*!*****************************************************!*\
  !*** ./source/Art.Build.Configurator/Data/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Data/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 13))

.addModules({
  StandardDependencies:    __webpack_require__(/*! ./StandardDependencies */ 20),
  StandardDevDependencies: __webpack_require__(/*! ./StandardDevDependencies */ 21),
  StandardPackageJson:     __webpack_require__(/*! ./StandardPackageJson */ 22),
  StandardWebpackConfig:   __webpack_require__(/*! ./StandardWebpackConfig */ 27)
});

/***/ }),
/* 20 */
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
/* 21 */
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
    webpack: "^4.39.1",
    "webpack-cli": "*",
    "webpack-dev-server": "^3.7.2",
    "webpack-stylish": "^0.1.8",
    "case-sensitive-paths-webpack-plugin": "^2.2.0",
    "webpack-merge": "^4.2.1",
    "webpack-node-externals": "^1.7.2",
    "coffee-loader": "^0.7.3",
    "css-loader": "^3.0.0",
    "json-loader": "^0.5.7",
    "script-loader": "^0.7.2",
    "style-loader": "^1.0.0",
    mocha: "^6.2.0",
    chai: "^4.2.0",
    "mock-fs": "^4.10.0",
    "art-testbench": "*"
  };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 22 */
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
    ["merge", "peek", "process", "JSON"],
    [global, __webpack_require__(/*! art-standard-lib */ 7)],
    (merge, peek, process, JSON) => {
      let StandardPackageJson;
      return (StandardPackageJson = Caf.defClass(
        class StandardPackageJson extends Object {},
        function(StandardPackageJson, classSuper, instanceSuper) {
          this.getGitInfo = function() {
            return __webpack_require__(/*! ../ShellExecSimple */ 23)("git remote -v")
              .then(lines => {
                let match, _1, _2, domain, path, extension, bugs, homepage;
                return merge(
                  (match = Caf.find(lines.split(/\n/g), line =>
                    line
                      .trim()
                      .match(
                        /^origin\t(git@|https?:\/\/)([^\s\/:]+)[:\/]((?:(?!\.\w+\b)[^\s])+)\.?(\w+)?/i
                      )
                  ))
                    ? (([_1, _2, domain, path, extension] = match),
                      (bugs = homepage = `https://${Caf.toString(
                        domain
                      )}/${Caf.toString(path)}`),
                      domain === "github.com"
                        ? (bugs = __webpack_require__(/*! path */ 25).join(bugs, "issues"))
                        : undefined,
                      {
                        repository: {
                          url: homepage + `.${Caf.toString(extension)}`,
                          type: extension
                        },
                        homepage,
                        bugs
                      })
                    : undefined
                );
              })
              .catch(() => {
                return {};
              });
          };
          this.get = function(abcConfig) {
            return this.getGitInfo().then(gitInfo => {
              let temp, base, base1;
              return merge(gitInfo, {
                license: "ISC",
                name: peek(process.cwd().split("/")),
                version:
                  (temp =
                    __webpack_require__(/*! fs */ 26).existsSync("package.json") &&
                    JSON.parse(
                      __webpack_require__(/*! fs */ 26)
                        .readFileSync("package.json")
                        .toString()
                    ).version) != null
                    ? temp
                    : "0.0.1",
                author: "Shane Brinkman-Davis Delamore, Imikimi LLC",
                dependencies: __webpack_require__(/*! ./StandardDependencies */ 20),
                devDependencies: __webpack_require__(/*! ./StandardDevDependencies */ 21),
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
              });
            });
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 23 */
/*!***********************************************************!*\
  !*** ./source/Art.Build.Configurator/ShellExecSimple.caf ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "process", "merge", "log", "present", "Error"],
    [global, __webpack_require__(/*! ./StandardImport */ 17)],
    (Promise, process, merge, log, present, Error) => {
      let shellExec;
      shellExec = function(cmd, opts) {
        return Promise.then(() => {
          let child, isWin;
          child = __webpack_require__(/*! child_process */ 24).spawn(
            (isWin = process.platform === "win32") ? "cmd" : "sh",
            [isWin ? "/C" : "-c", cmd],
            merge({ stdio: "pipe", cwd: process.cwd() }, opts)
          );
          return new Promise(resolve => {
            let stdout, stderr, base, base1;
            stdout = stderr = "";
            Caf.exists((base = child.stdout)) &&
              base.on("data", data => (stdout += data));
            Caf.exists((base1 = child.stderr)) &&
              base1.on("data", data => (stderr += data));
            child.on("error", error => resolve({ stdout, stderr, cmd, error }));
            return child.on("close", code =>
              resolve({ stdout, stderr, cmd, code })
            );
          });
        });
      };
      return function(command, options) {
        let verbose;
        if (Caf.exists(options) ? (verbose = options.verbose) : undefined) {
          log(`> ${Caf.toString(command)}`.green);
        }
        return shellExec(command).then(result => {
          let out;
          return present(result.stderr)
            ? Promise.reject(
                new Error(
                  `shellExec: ${Caf.toString(
                    command
                  )}\n\nstderr:\n${Caf.toString(result.stderr)}`
                )
              )
            : ((out = result.stdout.trim()),
              verbose
                ? out.length > 0
                  ? log(out.blue)
                  : log("<success; no output>".grey)
                : undefined,
              out);
        });
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 24 */
/*!********************************************************************************!*\
  !*** external "require('child_process' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('child_process' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 25 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 26 */
/*!*********************************************************************!*\
  !*** external "require('fs' /* ABC - not inlining fellow NPM *_/)" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 27 */
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
    [global, __webpack_require__(/*! art-standard-lib */ 7)],
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
                path: __webpack_require__(/*! path */ 25).join(npmRoot, outputPath),
                filename: "[name].js"
              },
              plugins: [new (__webpack_require__(/*! case-sensitive-paths-webpack-plugin */ 28))()],
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
/* 28 */
/*!******************************************************************************************************!*\
  !*** external "require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('case-sensitive-paths-webpack-plugin' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 29 */
/*!***************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 30 */
/*!**************************************************************!*\
  !*** ./source/Art.Build.Configurator/Configurators/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Configurators/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 12))

.addModules({
  ConfigureBase:        __webpack_require__(/*! ./ConfigureBase */ 31),
  ConfigureIndexHtml:   __webpack_require__(/*! ./ConfigureIndexHtml */ 32),
  ConfigurePackageJson: __webpack_require__(/*! ./ConfigurePackageJson */ 34),
  ConfigureWebpack:     __webpack_require__(/*! ./ConfigureWebpack */ 35)
});

/***/ }),
/* 31 */
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
    ["BaseClass", "Promise", "path"],
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    (BaseClass, Promise, path) => {
      let ConfigureBase;
      return (ConfigureBase = Caf.defClass(
        class ConfigureBase extends BaseClass {},
        function(ConfigureBase, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.getFileContents = function(npmRoot, abcConfig) {
            return Promise.then(() => this.get(npmRoot, abcConfig)).then(
              v => v + "\n"
            );
          };
          this.writeConfig = function(npmRoot, abcConfig) {
            return this.getFileContents(npmRoot, abcConfig).then(contents =>
              __webpack_require__(/*! ../Main */ 16).updateFile(
                path.join(npmRoot, this.outFileName),
                contents
              )
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 32 */
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
      __webpack_require__(/*! ../StandardImport */ 17),
      __webpack_require__(/*! art-browser-tools */ 33).DomElementFactories
    ],
    (Html, Body, Ul, Li, A) => {
      let ConfigureIndexHtml;
      return (ConfigureIndexHtml = Caf.defClass(
        class ConfigureIndexHtml extends __webpack_require__(/*! ./ConfigureBase */ 31) {},
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
/* 33 */
/*!************************************************************************************!*\
  !*** external "require('art-browser-tools' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-browser-tools' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 34 */
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
      "Promise",
      "StandardPackageJson",
      "isFunction",
      "deepMerge",
      "consistentJsonStringify"
    ],
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    (
      Promise,
      StandardPackageJson,
      isFunction,
      deepMerge,
      consistentJsonStringify
    ) => {
      let ConfigurePackageJson;
      return (ConfigurePackageJson = Caf.defClass(
        class ConfigurePackageJson extends __webpack_require__(/*! ./ConfigureBase */ 31) {},
        function(ConfigurePackageJson, classSuper, instanceSuper) {
          this.outFileName = "package.json";
          this.get = (npmRoot, abcConfig) =>
            Promise.then(() => StandardPackageJson.get(abcConfig)).then(
              baseConfig => {
                let npmConfig;
                return isFunction((npmConfig = abcConfig.npm))
                  ? npmConfig(baseConfig)
                  : deepMerge(baseConfig, npmConfig);
              }
            );
          this.getFileContents = function(npmRoot, abcConfig) {
            return this.get(npmRoot, abcConfig).then(
              contents => consistentJsonStringify(contents, "  ") + "\n"
            );
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 35 */
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
      "compactFlatten",
      "objectWithout",
      "objectKeyCount",
      "merge",
      "isRegExp",
      "isFunction",
      "isPlainObject",
      "Error",
      "String",
      "Promise"
    ],
    [global, __webpack_require__(/*! ../StandardImport */ 17), __webpack_require__(/*! ../Data */ 19)],
    (
      StandardWebpackConfig,
      compactFlatten,
      objectWithout,
      objectKeyCount,
      merge,
      isRegExp,
      isFunction,
      isPlainObject,
      Error,
      String,
      Promise
    ) => {
      let nodeExternals, Configurator, ConfigureWebpack;
      nodeExternals = null;
      Configurator = __webpack_require__(/*! ./namespace */ 12);
      return (ConfigureWebpack = Caf.defClass(
        class ConfigureWebpack extends __webpack_require__(/*! ./ConfigureBase */ 31) {},
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
            baseConfig = __webpack_require__(/*! webpack-merge */ 36)(standard, common);
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
                  ? ((webpackEntry = __webpack_require__(/*! webpack-merge */ 36)(
                      baseConfig,
                      targetConfig
                    )),
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
              ? __webpack_require__(/*! webpack-merge */ 36)(
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
              : __webpack_require__(/*! webpack-merge */ 36)(
                  { output: { pathinfo: true } },
                  targetConfig
                );
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
                        ? (into[k] =
                            (Caf.is((entry = targetConfig.entry), String)
                              ? (targetConfig = objectWithout(
                                  targetConfig,
                                  "entry"
                                ))
                              : undefined,
                            __webpack_require__(/*! webpack-merge */ 36)(
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
            return Promise.then(() => StandardWebpackConfig.js);
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 36 */
/*!********************************************************************************!*\
  !*** external "require('webpack-merge' /* ABC - not inlining fellow NPM *_/)" ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('webpack-merge' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 37 */
/*!*******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 38 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.Build.Configurator/Recipes/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 14))

.addModules({
  App:  __webpack_require__(/*! ./App */ 39),
  Core: __webpack_require__(/*! ./Core */ 43),
  Demo: __webpack_require__(/*! ./Demo */ 44),
  Node: __webpack_require__(/*! ./Node */ 45)
});

/***/ }),
/* 39 */
/*!*******************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/App.caf ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge", "merge"],
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    (deepMerge, merge) => {
      let App;
      return (App = Caf.defClass(
        class App extends __webpack_require__(/*! ../Recipe */ 40) {},
        function(App, classSuper, instanceSuper) {
          this.description = "A minimal ArtSuiteJS app. (base: core)";
          this.getter({
            files: function() {
              let clientFiles;
              clientFiles = this.options.clientFiles;
              return deepMerge(
                this.recipe(
                  __webpack_require__(/*! ./Core */ 43),
                  deepMerge(
                    {
                      targets: "Client",
                      dependencies: { "art-suite-app": "*" }
                    },
                    this.options
                  )
                ),
                {
                  "Client.caf": `&source/${Caf.toString(
                    this.cafRequireFriendlyNamespaceDirPath
                  )}/Client`,
                  "index.caf": "&source",
                  "index.html":
                    '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>\n</body></html>',
                  source: {
                    [this.namespaceDirPath]: {
                      _Client: merge(
                        {
                          "StandardImport.caf": "&ArtSuite",
                          "Main.caf": `import &StandardImport\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                            this.packageDotName
                          )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement\n          draw:       #eee\n\n          TextElement\n            padding:  10\n            text:     "" 'Hello world!' - ${Caf.toString(
                            this.packageDotName
                          )}`
                        },
                        clientFiles
                      )
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
/* 40 */
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
      __webpack_require__(/*! ./StandardImport */ 17),
      __webpack_require__(/*! art-filebuilder */ 41),
      { path: __webpack_require__(/*! path */ 25) }
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
          this.abstractClass();
          this.getFiles = function(packageRoot, options) {
            return new this(packageRoot, options).files;
          };
          this.writeFiles = function(packageRoot, options) {
            return fileBuilder(this.getFiles(packageRoot, options)).write(
              options
            );
          };
          this.postCreateConcreteClass = function() {
            __webpack_require__(/*! ./RecipeRegistry */ 42).register(this);
            return classSuper.postCreateConcreteClass.apply(this, arguments);
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
/* 41 */
/*!**********************************************************************************!*\
  !*** external "require('art-filebuilder' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-filebuilder' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 42 */
/*!**********************************************************!*\
  !*** ./source/Art.Build.Configurator/RecipeRegistry.caf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "dashCase", "Object"],
    [global, __webpack_require__(/*! ./StandardImport */ 17)],
    (BaseClass, dashCase, Object) => {
      let RecipeRegistry;
      return (RecipeRegistry = Caf.defClass(
        class RecipeRegistry extends BaseClass {},
        function(RecipeRegistry, classSuper, instanceSuper) {
          this.recipes = {};
          this.register = function(recipeClass) {
            return (this.recipes[dashCase(recipeClass.name)] = recipeClass);
          };
          this.classGetter({
            recipeNames: function() {
              return Object.keys(this.recipes);
            }
          });
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 43 */
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
    ["String", "formattedInspect", "merge"],
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    (String, formattedInspect, merge) => {
      let Core;
      return (Core = Caf.defClass(
        class Core extends __webpack_require__(/*! ../Recipe */ 40) {},
        function(Core, classSuper, instanceSuper) {
          this.description = "Basics for buliding any app with the ArtSuiteJS";
          this.getter({
            files: function() {
              let targets, dependencies, temp;
              temp = this.options;
              targets = temp.targets;
              dependencies = temp.dependencies;
              if (Caf.is(targets, String)) {
                targets = [targets];
              } else {
                targets != null ? targets : (targets = ["index"]);
              }
              return {
                ".gitignore": "node_modules/",
                "register.js":
                  "/*\n  REGISTER CoffeeScript (.coffee) and CaffeineScript (.caf) loaders & compilers.\n  NOTE: for Node; ultimately a NOOP for Webpack.\n*/\nrequire('coffee-script/register');\nrequire('caffeine-mc/register');",
                "art.build.config.caf": `${Caf.toString(
                  this.options.node
                    ? "target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: true"
                    : undefined
                )}\n\n\n${Caf.toString(
                  formattedInspect({
                    npm: {
                      description: this.packageDotName,
                      dependencies: merge(
                        { "art-build-configurator": "*" },
                        dependencies
                      )
                    }
                  })
                )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
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
/* 44 */
/*!********************************************************!*\
  !*** ./source/Art.Build.Configurator/Recipes/Demo.caf ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge"],
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    deepMerge => {
      let Demo;
      return (Demo = Caf.defClass(
        class Demo extends __webpack_require__(/*! ../Recipe */ 40) {},
        function(Demo, classSuper, instanceSuper) {
          this.description = "A demo ArtSuiteJS app (base: app)";
          this.getter({
            files: function() {
              return deepMerge(this.recipe(__webpack_require__(/*! ./App */ 39)), {
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
/* 45 */
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
    [global, __webpack_require__(/*! ../StandardImport */ 17)],
    merge => {
      let Node;
      return (Node = Caf.defClass(
        class Node extends __webpack_require__(/*! ../Recipe */ 40) {},
        function(Node, classSuper, instanceSuper) {
          this.description =
            "Boilerplate for writing a Node NPM for the art-suite. (base: core)";
          this.getter({
            files: function() {
              return merge(this.recipe(__webpack_require__(/*! ./Core */ 43), { node: true }), {
                "index.js":
                  "/*\n  NOTE: node PREFERS index.js OVER index.caf\n  I.E. webpack will ignore this file if index.caf is present.\n\n  use-build == true:  fast (no need to compile non-js files; all one file)\n  use-build == false: good for development of this package; don't have to re-build it to use it\n*/\nif (require('./use-build')) {\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./source');\n};",
                "index.caf":
                  "##\n  NOTE: webpack PREFERS index.caf OVER index.js\n  I.E. node will ignore this file if index.js is present.\n&source",
                "use-build.js":
                  '/*\n  true:   load package from ./build\n  false:  load package from ./source\n\n  "use-build" is provided as a stand-alone file in case you\n  have multiple entry-points to your package. Each one can\n  reference this one value to decide to use ./build of ./source.\n*/\nmodule.exports = true;'
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
/* 46 */
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
    [global, __webpack_require__(/*! ./StandardImport */ 17), __webpack_require__(/*! ./Main */ 16)],
    (Promise, log) => {
      let NeptuneNamespacesGenerator;
      NeptuneNamespacesGenerator = __webpack_require__(/*! neptune-namespaces/generator */ 47);
      return function(dirname, watch) {
        let existingRoots, workers;
        existingRoots = Caf.array(
          NeptuneNamespacesGenerator.standardRoots,
          root => root,
          root =>
            __webpack_require__(/*! fs */ 26).existsSync(
              `${Caf.toString(dirname)}/${Caf.toString(root)}`
            )
        );
        Caf.array(existingRoots, root =>
          log(
            "neptune-namespaces scanning: ".grey +
              `${Caf.toString(
                __webpack_require__(/*! path */ 25).basename(dirname)
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
/* 47 */
/*!***********************************************************************************************!*\
  !*** external "require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces/generator' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 48 */
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
/* 49 */
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
    [global, __webpack_require__(/*! ./StandardImport */ 17)],
    (BaseClass, JSON) => {
      let Versioning;
      return (Versioning = Caf.defClass(
        class Versioning extends BaseClass {},
        function(Versioning, classSuper, instanceSuper) {
          this.classGetter({
            current: function() {
              return JSON.parse(
                __webpack_require__(/*! fs */ 26)
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

/***/ })
/******/ ]);