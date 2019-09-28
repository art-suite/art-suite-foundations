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
/*!************************!*\
  !*** ./abcCommand.caf ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  let Neptune = global.Neptune,
    console = global.console,
    process = global.process,
    String = global.String,
    ArtBuildConfigurator,
    realRequire,
    git,
    pv,
    pretend,
    configure,
    init,
    force,
    verbose,
    app,
    requireOption,
    commander;
  __webpack_require__(/*! colors */ 3);
  ArtBuildConfigurator = Neptune.Art.Build.Configurator;
  realRequire = eval("require");
  if (!__webpack_require__(/*! ./use-build */ 4)) {
    console.log("\nDEV-WARNING: use-build == false".yellow);
  }
  ({
    git,
    pv,
    pretend,
    configure,
    init,
    force,
    verbose,
    app,
    require: requireOption
  } = commander = __webpack_require__(/*! commander */ 5)
    .option("-c, --configure", "configure and update all")
    .option("-v, --verbose", "verbose")
    .option(
      "-r, --require [source]",
      "require(source) - use to register recipes"
    )
    .option(
      "-p, --pretend",
      "show the configs that will be generated without writing them"
    )
    .option("-f, --force", "when initialize, force overwrite all")
    .option(
      "-i, --init [recipe]",
      "initialize a new Art-style project [default recipe: core]"
    )
    .option("--git", "init git (unless .git is already present)")
    .option("--pv", "show YOUR package's current version")
    .version(__webpack_require__(/*! ./package */ 6).version)
    .on("--help", function() {
      return console.log(
        `\n${Caf.toString(
          "art-build-configurator (abc) - initialize and configure ArtSuiteJS projects"
            .white
        )}\n\nConfig: ${Caf.toString(
          ArtBuildConfigurator.configFilename.green
        )}\n\nManaged: (don't edit directly, edit abc's config)\n- ${Caf.toString(
          "package.json".green
        )}\n- ${Caf.toString("webpack.config.js".green)}`
      );
    })
    .parse(process.argv));
  return (() => {
    switch (false) {
      case !pv:
        return console.log(ArtBuildConfigurator.Versioning.current);
      case !(pretend || configure || init || git):
        if (Caf.is(requireOption, String)) {
          console.log(
            "loading: require ".blue + `'${Caf.toString(requireOption)}'`.green
          );
          realRequire(requireOption);
        }
        return ArtBuildConfigurator.go(process.cwd(), {
          pretend,
          configure,
          init,
          force,
          verbose,
          app,
          git
        })
          .tap(function() {
            return console.log("success".green);
          })
          .catch(function(e) {
            return __webpack_require__(/*! art-standard-lib */ 7).log.error(e);
          });
      default:
        return commander.outputHelp();
    }
  })();
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
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
/* 3 */
/*!*************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 4 */
/*!**********************!*\
  !*** ./use-build.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true

/***/ }),
/* 5 */
/*!****************************************************************************!*\
  !*** external "require('commander' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('commander' /* ABC - not inlining fellow NPM */);

/***/ }),
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

/***/ })
/******/ ]);