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
/*!**********************!*\
  !*** ./index.coffee ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./source/Art.ObjectTreeFactory */ 1);


/***/ }),
/* 1 */
/*!***************************************************!*\
  !*** ./source/Art.ObjectTreeFactory/index.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./namespace */ 2);

module.exports.includeInNamespace(__webpack_require__(/*! ./ObjectTreeFactory */ 5));


/***/ }),
/* 2 */
/*!*******************************************************!*\
  !*** ./source/Art.ObjectTreeFactory/namespace.coffee ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjectTreeFactory,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(/*! neptune-namespaces */ 3)).addNamespace('Art.ObjectTreeFactory', ObjectTreeFactory = (function(superClass) {
  extend(ObjectTreeFactory, superClass);

  function ObjectTreeFactory() {
    return ObjectTreeFactory.__super__.constructor.apply(this, arguments);
  }

  ObjectTreeFactory.version = __webpack_require__(/*! ../../package.json */ 4).version;

  return ObjectTreeFactory;

})(Neptune.PackageNamespace));


/***/ }),
/* 3 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 4 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"Create Declarative frameworks that output tree structures with properties (e.g. ArtReact)","license":"ISC","name":"art-object-tree-factory","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress"},"version":"2.1.3"};

/***/ }),
/* 5 */
/*!************************************************************!*\
  !*** ./source/Art.ObjectTreeFactory/ObjectTreeFactory.caf ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 7);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "Object",
      "compactFlattenFast",
      "isClass",
      "isFunction",
      "isPlainObject",
      "rubyTrue",
      "Array",
      "fastBind",
      "upperCamelCase",
      "isString"
    ],
    [global, __webpack_require__(/*! art-standard-lib */ 8)],
    (
      log,
      Object,
      compactFlattenFast,
      isClass,
      isFunction,
      isPlainObject,
      rubyTrue,
      Array,
      fastBind,
      upperCamelCase,
      isString
    ) => {
      let mergeIntoBasic, ObjectTreeFactory;
      mergeIntoBasic = function(_into, source) {
        let from, into, temp;
        return (
          (from = source),
          (into = _into),
          from != null
            ? (() => {
                for (let k in from) {
                  let v;
                  v = from[k];
                  temp = into[k] = v;
                }
                return temp;
              })()
            : undefined,
          into
        );
      };
      return (ObjectTreeFactory = Caf.defClass(
        class ObjectTreeFactory extends Object {},
        function(ObjectTreeFactory, classSuper, instanceSuper) {
          let preprocessElementBasic,
            nodeNameRegexp,
            compactFlattenObjectTreeNodeNames;
          preprocessElementBasic = function(a) {
            return a;
          };
          this.createObjectTreeFactory = (...args) => {
            let options,
              klass,
              nodeFactory,
              TreeFactoryNode,
              mergePropsInto,
              name,
              inspectedName,
              preprocessElement,
              _children,
              _props,
              _oneProps,
              applyArg,
              Factory,
              abstractClass,
              bindList,
              from,
              into,
              temp;
            Caf.each2(
              args,
              a =>
                (() => {
                  switch (false) {
                    case !isClass(a):
                      return (klass = a);
                    case !isFunction(a):
                      return (nodeFactory = a);
                    case !isPlainObject(a):
                      return (options = a);
                  }
                })(),
              a => a != null
            );
            options != null ? options : (options = {});
            klass != null ? klass : (klass = options.class);
            nodeFactory != null
              ? nodeFactory
              : (nodeFactory = true
                  ? (!(klass != null)
                      ? log.warn(
                          "DEPRICATED: one of nodeFactory or class is now required"
                        )
                      : undefined,
                    klass != null
                      ? klass
                      : (klass = TreeFactoryNode = Caf.defClass(
                          class TreeFactoryNode extends __webpack_require__(/*! art-class-system */ 9)
                            .BaseClass {
                            constructor(props, children) {
                              super(...arguments);
                              this.props = props;
                              this.children = children;
                            }
                          }
                        )),
                    (props, children) => new klass(props, children))
                  : undefined);
            ({
              mergePropsInto,
              name,
              inspectedName = name,
              preprocessElement
            } = options);
            mergePropsInto != null
              ? mergePropsInto
              : (mergePropsInto = mergeIntoBasic);
            preprocessElement != null
              ? preprocessElement
              : (preprocessElement = preprocessElementBasic);
            _children = _props = _oneProps = undefined;
            applyArg = el => {
              let from1, into1, to, i;
              if (rubyTrue(preprocessElement(el, Factory))) {
                switch (el.constructor) {
                  case Object:
                    if (!_oneProps) {
                      _oneProps = el;
                    } else {
                      if (!_props) {
                        mergePropsInto((_props = {}), _oneProps);
                      }
                      mergePropsInto(_props, el);
                    }
                    break;
                  case Array:
                    from1 = el;
                    into1 = from1;
                    if (from1 != null) {
                      to = from1.length;
                      i = 0;
                      while (i < to) {
                        let el2;
                        el2 = from1[i];
                        applyArg(el2);
                        i++;
                      }
                    }
                    into1;
                    break;
                  default:
                    (_children != null ? _children : (_children = [])).push(el);
                }
              }
              return null;
            };
            Factory = (...args) => {
              let from1, into1, to, i;
              _children = _props = _oneProps = undefined;
              from1 = args;
              into1 = from1;
              if (from1 != null) {
                to = from1.length;
                i = 0;
                while (i < to) {
                  let el;
                  el = from1[i];
                  applyArg(el);
                  i++;
                }
              }
              into1;
              return nodeFactory(_props || _oneProps, _children);
            };
            if (klass) {
              Factory.class = klass;
              klass.Factory = Factory;
              abstractClass =
                (Caf.isF(klass.getAbstractClass) && klass.getAbstractClass()) ||
                Object;
              bindList = compactFlattenFast([
                ((from = klass),
                (into = []),
                from != null
                  ? (() => {
                      for (let k1 in from) {
                        let v, k;
                        v = from[k1];
                        k = k1;
                        temp =
                          !abstractClass[k] && isFunction(v)
                            ? into.push(k)
                            : undefined;
                      }
                      return temp;
                    })()
                  : undefined,
                into),
                options.bind
              ]);
              inspectedName != null
                ? inspectedName
                : (inspectedName = klass.getName() + "Factory");
              Caf.each2(
                bindList,
                k => (Factory[k] = fastBind(klass[k], klass))
              );
            }
            if (inspectedName) {
              Factory._name = inspectedName;
            }
            Factory.inspect = () =>
              `<${Caf.toString(inspectedName || "ObjectTreeFactory")}>`;
            return Factory;
          };
          this.createObjectTreeFactories = (options, list, nodeFactory) => {
            if (!nodeFactory) {
              [list, nodeFactory] = [options, list];
              options = {};
            }
            return nodeFactory.length === 1
              ? this._createObjectTreeFactoriesFromFactoryFactories(
                  options,
                  list,
                  nodeFactory
                )
              : this._createObjectTreeFactoriesFromFactories(
                  options,
                  list,
                  nodeFactory
                );
          };
          this._createObjectTreeFactoriesFromFactories = (
            options,
            list,
            nodeFactory
          ) => {
            let suffix, out;
            suffix = options.suffix || "";
            out = {};
            Caf.each2(compactFlattenObjectTreeNodeNames(list), nodeTypeName =>
              (nodeTypeName => {
                options.inspectedName = nodeTypeName;
                return (out[
                  upperCamelCase(nodeTypeName) + suffix
                ] = this.createObjectTreeFactory(options, (props, children) =>
                  nodeFactory(nodeTypeName, props, children)
                ));
              })(nodeTypeName)
            );
            return out;
          };
          nodeNameRegexp = /[a-z0-9_]+/gi;
          this._compactFlattenObjectTreeNodeNames = compactFlattenObjectTreeNodeNames = function(
            list
          ) {
            let out;
            if (isString(list)) {
              return list.match(nodeNameRegexp);
            }
            out = [];
            Caf.each2(
              compactFlattenFast(list),
              str => (out = out.concat(str.match(nodeNameRegexp)))
            );
            return out;
          };
          this._createObjectTreeFactoriesFromFactoryFactories = (
            options,
            list,
            nodeFactoryFactory
          ) => {
            let suffix, out;
            suffix = options.suffix || "";
            out = {};
            Caf.each2(compactFlattenObjectTreeNodeNames(list), nodeTypeName => {
              let nodeFactory, name;
              nodeFactory = nodeFactoryFactory(nodeTypeName);
              name = upperCamelCase(nodeTypeName) + suffix;
              options.inspectedName = name;
              return (out[name] = this.createObjectTreeFactory(
                options,
                nodeFactory
              ));
            });
            return out;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 6)(module)))

/***/ }),
/* 6 */
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
/* 7 */
/*!******************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 8 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 9 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);