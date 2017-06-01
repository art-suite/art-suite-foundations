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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
/***/ (function(module, exports) {

module.exports = require("caffeine-script-runtime");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"abc": "./abc"
	},
	"dependencies": {
		"art-build-configurator": "^1.11.5",
		"art-class-system": "^1.5.2",
		"art-config": "^1.3.3",
		"art-object-tree-factory": "^1.0.0",
		"art-standard-lib": "^1.11.1",
		"art-testbench": "^1.10.3",
		"caffeine-script": "^0.44.5",
		"caffeine-script-runtime": "^1.0.0",
		"case-sensitive-paths-webpack-plugin": "^1.1.4",
		"coffee-loader": "^0.7.2",
		"coffee-script": "^1.12.3",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.26.1",
		"detect-node": "^2.0.3",
		"fs-extra": "^3.0.0",
		"glob-promise": "^3.1.0",
		"json-loader": "^0.5.4",
		"neptune-namespaces": "^2.2.2",
		"recursive-copy": "^2.0.6",
		"script-loader": "^0.7.0",
		"style-loader": "^0.13.1",
		"webpack": "^2.2.1",
		"webpack-dev-server": "^2.3.0",
		"webpack-merge": "^3.0.0",
		"webpack-node-externals": "^1.5.4"
	},
	"description": "Tools for configuring npm (package.json) and webpack (webpack.config.js)",
	"license": "ISC",
	"name": "art-build-configurator",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "1.14.1"
};

/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let process = global.process,
    console = global.console,
    pv,
    pretend,
    configure,
    init,
    commander;
  __webpack_require__(24);
  ({ pv, pretend, configure, init } = commander = __webpack_require__(25)
    .version(__webpack_require__(23).version)
    .option(
      "-p, --pretend",
      "show the configs that will be generated without writing them"
    )
    .option("-c, --configure", "configure and update all")
    .option("--pv", "show your package's current version")
    .option("--init", "initialize a new Art-style project")
    .option("-f, --force", "when initialize, force overwrite all")
    .option("-v, --verbose", "verbose")
    .option("--app", "use with --init to initialize a working ArtSuite App")
    .on("--help", function() {
      return console.log(
        `looks for ${Caf.toString(
          __webpack_require__(6).configFileName
        )} and configs as instructed`
      );
    })
    .parse(process.argv));
  return pv
    ? console.log(__webpack_require__(6).Versioning.current)
    : pretend || configure || init
        ? __webpack_require__(6)
            .go(process.cwd(), commander)
            .catch(function(e) {
              return console.error(e.stack);
            })
        : commander.outputHelp();
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

module.exports = require("art-build-configurator");

/***/ })

/******/ });