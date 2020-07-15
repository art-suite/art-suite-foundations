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
/*!*******************!*\
  !*** ./index.caf ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! ./source/Art.FileBuilder */ 3);
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
/*!*****************************************!*\
  !*** ./source/Art.FileBuilder/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.FileBuilder/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 4))
.includeInNamespace(__webpack_require__(/*! ./FileBuilder */ 7))
.addModules({
  Dir:            __webpack_require__(/*! ./Dir */ 14),
  File:           __webpack_require__(/*! ./File */ 15),
  StandardImport: __webpack_require__(/*! ./StandardImport */ 8)
});

/***/ }),
/* 4 */
/*!*********************************************!*\
  !*** ./source/Art.FileBuilder/namespace.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: Art.FileBuilder/namespace.js

module.exports = __webpack_require__(/*! neptune-namespaces */ 5).addNamespace(
  'Art.FileBuilder',
  (class FileBuilder extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../package.json */ 6))
);


/***/ }),
/* 5 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 6 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, dependencies, description, devDependencies, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Shane Brinkman-Davis Delamore, Imikimi LLC\",\"dependencies\":{\"art-binary\":\"*\",\"art-build-configurator\":\"*\"},\"description\":\"Art.FileBuilder\",\"devDependencies\":{\"art-testbench\":\"*\",\"case-sensitive-paths-webpack-plugin\":\"^2.2.0\",\"chai\":\"^4.2.0\",\"mocha\":\"^6.2.0\",\"mock-fs\":\"^4.10.0\",\"webpack\":\"^4.39.1\",\"webpack-cli\":\"*\",\"webpack-dev-server\":\"^3.7.2\",\"webpack-merge\":\"^4.2.1\",\"webpack-node-externals\":\"^1.7.2\",\"webpack-stylish\":\"^0.1.8\"},\"license\":\"ISC\",\"name\":\"art-filebuilder\",\"scripts\":{\"build\":\"webpack --progress\",\"start\":\"webpack-dev-server --hot --inline --progress --env.devServer\",\"test\":\"nn -s;mocha -u tdd\",\"testInBrowser\":\"webpack-dev-server --progress --env.devServer\"},\"version\":\"2.1.1\"}");

/***/ }),
/* 7 */
/*!************************************************!*\
  !*** ./source/Art.FileBuilder/FileBuilder.caf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isPlainObject", "isString", "isBinary", "Error", "formattedInspect"],
    [global, __webpack_require__(/*! ./StandardImport */ 8)],
    (isPlainObject, isString, isBinary, Error, formattedInspect) => {
      let fileBuilder;
      return {
        fileBuilder: (fileBuilder = function(name, contents) {
          return (() => {
            switch (false) {
              case !isPlainObject(name):
                return __webpack_require__(/*! ./Dir */ 14)(
                  ".",
                  Caf.array(name, (contents, n) => fileBuilder(n, contents))
                );
              case !isString(contents):
                return __webpack_require__(/*! ./File */ 15)(name, contents);
              case !isBinary(contents):
                return __webpack_require__(/*! ./File */ 15)(name, contents);
              case !isPlainObject(contents):
                return __webpack_require__(/*! ./Dir */ 14)(name, fileBuilder(contents));
              case !(
                contents === null ||
                contents === undefined ||
                contents === false
              ):
                return null;
              default:
                return (() => {
                  throw new Error(
                    `expecting string, Art.Binary string, or plain object. got: ${Caf.toString(
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 8 */
/*!***************************************************!*\
  !*** ./source/Art.FileBuilder/StandardImport.caf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 9).mergeWithSelf(
    __webpack_require__(/*! art-class-system */ 10),
    __webpack_require__(/*! art-object-tree-factory */ 11),
    __webpack_require__(/*! art-binary */ 12),
    { Path: __webpack_require__(/*! path */ 13) }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 9 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 10 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 11 */
/*!******************************************************************************************!*\
  !*** external "require('art-object-tree-factory' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-object-tree-factory' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 12 */
/*!*****************************************************************************!*\
  !*** external "require('art-binary' /* ABC - not inlining fellow NPM *_/)" ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-binary' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 13 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 14 */
/*!****************************************!*\
  !*** ./source/Art.FileBuilder/Dir.caf ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "merge"],
    [global, __webpack_require__(/*! ./StandardImport */ 8)],
    (createObjectTreeFactory, BaseClass, merge) => {
      let Path, DirClass;
      Path = __webpack_require__(/*! path */ 13);
      return createObjectTreeFactory(
        (DirClass = Caf.defClass(
          class DirClass extends BaseClass {
            constructor(props = {}, children = []) {
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 15 */
/*!*****************************************!*\
  !*** ./source/Art.FileBuilder/File.caf ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "isFunction", "isRegExp", "log"],
    [global, __webpack_require__(/*! ./StandardImport */ 8), __webpack_require__(/*! art-object-tree-factory */ 11)],
    (createObjectTreeFactory, BaseClass, isFunction, isRegExp, log) => {
      let Path, FileClass;
      Path = __webpack_require__(/*! path */ 13);
      return createObjectTreeFactory(
        (FileClass = Caf.defClass(
          class FileClass extends BaseClass {
            constructor(props = {}, children = []) {
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
                logContents,
                temp;
              ({ filename, contents } = this.props);
              ({
                path,
                pretend,
                force,
                verbose,
                select,
                fs = __webpack_require__(/*! fs-extra */ 16)
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
                      fs.writeFileSync(
                        path,
                        (temp = Caf.exists(contents) && contents.nodeBuffer) !=
                          null
                          ? temp
                          : contents
                      ),
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 16 */
/*!***************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);