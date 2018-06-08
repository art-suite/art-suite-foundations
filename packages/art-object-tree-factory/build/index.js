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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

module.exports.includeInNamespace(__webpack_require__(3));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectTreeFactory, compactFlatten, fastBind, isClass, isFunction, isPlainObject, log, mergeIntoBasic, ref, ref1, upperCamelCase,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(0), compactFlatten = ref.compactFlatten, log = ref.log, upperCamelCase = ref.upperCamelCase, isFunction = ref.isFunction, isPlainObject = ref.isPlainObject, isClass = ref.isClass;

mergeIntoBasic = function(into, source) {
  var k, v;
  for (k in source) {
    v = source[k];
    into[k] = v;
  }
  return into;
};

ref1 = __webpack_require__(0), isFunction = ref1.isFunction, fastBind = ref1.fastBind;

module.exports = ObjectTreeFactory = (function() {
  var compactFlattenObjectTreeNodeNames, deepArgsProcessing, nodeNameRegexp, preprocessElementBasic;

  function ObjectTreeFactory() {}

  deepArgsProcessing = function(array, children) {
    var el, i, len;
    for (i = 0, len = array.length; i < len; i++) {
      el = array[i];
      if (el) {
        if (el.constructor === Array) {
          deepArgsProcessing(el, children);
        } else {
          children.push(el);
        }
      }
    }
    return null;
  };


  /*
  IN: any order of args which are:
    plainObject-options: (optional)
      mergePropsInto: (intoProps, fromProps) ->
        function to merge arguments 1 on into props
        default: mergeIntoBasic
  
      inspectedName: string
        for introspection:
          Factory.getName() == inspectedName
  
      class: a class
        if specified, additioanl properties will be set on the Factory function:
          Factory.class = class
          Factory._name = class.getName() + "Factory"
  
          all concrete class-methods are made available in the Factory
          (see BaseObject.abstractClass)
  
      bind: string or array of strings
        NODE: class must be set
        list of method-names to bind from class onto the factory
  
      preprocessElement: (element) -> element
        can do custom preprocssing of each argument to the factory.
  
  
        defualt: preprocessElementBasic (no-op)
  
    function-nodeFactory: (optional) ->
      IN:
        props:    plain object mapping props to prop-values
        children: flat, compacted array of children nodes
      OUT:
        node
  
    class-nodeClass: class Foo extends BaseObject
  
  OUT: objectTreeFactory = ->
    IN:
      Arguments are compacted and flattened
      The resulting list of arguments can be any combination of:
        plainObjects for props (merged in the order they appear)
        other objects which become the 'children'
  
    OUT:
      object-tree-node generated by the nodeFactory
   */

  preprocessElementBasic = function(a) {
    return a;
  };

  ObjectTreeFactory.createObjectTreeFactory = function() {
    var Factory, TreeFactoryNode, _children, _oneProps, _props, a, abstractClass, applyArgs, bindList, i, inspectedName, j, k, klass, len, len1, mergePropsInto, nodeFactory, options, preprocessElement, v;
    for (i = 0, len = arguments.length; i < len; i++) {
      a = arguments[i];
      if (a != null) {
        switch (false) {
          case !isClass(a):
            klass = a;
            break;
          case !isFunction(a):
            nodeFactory = a;
            break;
          case !isPlainObject(a):
            options = a;
        }
      }
    }
    options || (options = {});
    klass || (klass = options["class"]);
    nodeFactory || (nodeFactory = true ? (klass || (klass = TreeFactoryNode = (function(superClass) {
      extend(TreeFactoryNode, superClass);

      function TreeFactoryNode(props1, children1) {
        this.props = props1;
        this.children = children1;
      }

      return TreeFactoryNode;

    })(BaseObject)), function(props, children) {
      return new klass(props, children);
    }) : void 0);
    mergePropsInto = options.mergePropsInto, inspectedName = options.inspectedName, preprocessElement = options.preprocessElement;
    mergePropsInto || (mergePropsInto = mergeIntoBasic);
    preprocessElement || (preprocessElement = preprocessElementBasic);
    _children = _props = _oneProps = null;
    applyArgs = function(args) {
      var el, j, len1, results;
      results = [];
      for (j = 0, len1 = args.length; j < len1; j++) {
        el = args[j];
        if (el = preprocessElement(el)) {
          switch (el.constructor) {
            case Object:
              if (_oneProps) {
                _props = {};
                mergePropsInto(_props, _oneProps);
                _oneProps = null;
              }
              if (_props) {
                results.push(mergePropsInto(_props, el));
              } else {
                results.push(_oneProps = el);
              }
              break;
            case Array:
              results.push(applyArgs(el));
              break;
            default:
              results.push(_children.push(el));
          }
        }
      }
      return results;
    };
    Factory = function() {
      _oneProps = null;
      _props = null;
      _children = [];
      applyArgs(arguments);
      return nodeFactory(_props || _oneProps || {}, _children);
    };
    if (klass) {
      Factory["class"] = klass;
      klass.Factory = Factory;
      abstractClass = (typeof klass.getAbstractClass === "function" ? klass.getAbstractClass() : void 0) || Object;
      bindList = compactFlatten([
        (function() {
          var results;
          results = [];
          for (k in klass) {
            v = klass[k];
            if (!abstractClass[k] && isFunction(v)) {
              results.push(k);
            }
          }
          return results;
        })(), options.bind
      ]);
      inspectedName || (inspectedName = klass.getName() + "Factory");
      for (j = 0, len1 = bindList.length; j < len1; j++) {
        k = bindList[j];
        Factory[k] = fastBind(klass[k], klass);
      }
    }
    if (inspectedName) {
      Factory._name = inspectedName;
    }
    Factory.inspect = function() {
      return "<" + (inspectedName || 'ObjectTreeFactory') + ">";
    };
    return Factory;
  };


  /*
  IN:
    list: a string or abitrary structure of arrays, nulls and strings
      each string is split into tokens and each token is used as the nodeTypeName to create a Tree-factory
    nodeFactory: (nodeTypeName, props, children) -> node
      IN:
        nodeTypeName: node-type name
        props:    plain object mapping props to prop-values
        children: flat, compacted array of children nodes
      OUT:
        node
  OUT:
    map from nodeNames (upperCamelCased) to the factories returned from createObjectTreeFactory
  
  TODO:
    PERFORMANCE TEST:
      createObjectTreeFactoriesFromFactories
      vs
      createObjectTreeFactoriesFromFactoryFactories
  
      The latter is probably faster. It is also more powerful and generally cleaner.
   */

  ObjectTreeFactory.createObjectTreeFactories = function(options, list, nodeFactory) {
    var ref2;
    if (!nodeFactory) {
      ref2 = [options, list], list = ref2[0], nodeFactory = ref2[1];
      options = {};
    }
    if (nodeFactory.length === 1) {
      return ObjectTreeFactory._createObjectTreeFactoriesFromFactoryFactories(options, list, nodeFactory);
    } else {
      return ObjectTreeFactory._createObjectTreeFactoriesFromFactories(options, list, nodeFactory);
    }
  };

  ObjectTreeFactory._createObjectTreeFactoriesFromFactories = function(options, list, nodeFactory) {
    var fn, i, len, nodeTypeName, out, ref2, suffix;
    suffix = options.suffix || '';
    out = {};
    ref2 = compactFlattenObjectTreeNodeNames(list);
    fn = function(nodeTypeName) {
      options.inspectedName = nodeTypeName;
      return out[upperCamelCase(nodeTypeName) + suffix] = ObjectTreeFactory.createObjectTreeFactory(options, function(props, children) {
        return nodeFactory(nodeTypeName, props, children);
      });
    };
    for (i = 0, len = ref2.length; i < len; i++) {
      nodeTypeName = ref2[i];
      fn(nodeTypeName);
    }
    return out;
  };

  nodeNameRegexp = /[a-z0-9_]+/ig;

  ObjectTreeFactory._compactFlattenObjectTreeNodeNames = compactFlattenObjectTreeNodeNames = function(list) {
    var i, len, out, ref2, str;
    if (typeof list === "string") {
      return list.match(nodeNameRegexp);
    }
    out = [];
    ref2 = compactFlatten(list);
    for (i = 0, len = ref2.length; i < len; i++) {
      str = ref2[i];
      out = out.concat(str.match(nodeNameRegexp));
    }
    return out;
  };

  ObjectTreeFactory._createObjectTreeFactoriesFromFactoryFactories = function(options, list, nodeFactoryFactory) {
    var i, len, name, nodeFactory, nodeTypeName, out, ref2, suffix;
    suffix = options.suffix || '';
    out = {};
    ref2 = compactFlattenObjectTreeNodeNames(list);
    for (i = 0, len = ref2.length; i < len; i++) {
      nodeTypeName = ref2[i];
      nodeFactory = nodeFactoryFactory(nodeTypeName);
      name = upperCamelCase(nodeTypeName) + suffix;
      options.inspectedName = name;
      out[name] = ObjectTreeFactory.createObjectTreeFactory(options, nodeFactory);
    }
    return out;
  };

  return ObjectTreeFactory;

})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var ObjectTreeFactory,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(6)).addNamespace('Art.ObjectTreeFactory', ObjectTreeFactory = (function(superClass) {
  extend(ObjectTreeFactory, superClass);

  function ObjectTreeFactory() {
    return ObjectTreeFactory.__super__.constructor.apply(this, arguments);
  }

  ObjectTreeFactory.version = __webpack_require__(5).version;

  return ObjectTreeFactory;

})(Neptune.PackageNamespace));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"Create Declarative frameworks that output tree structures with properties (e.g. ArtReact)","license":"ISC","name":"art-object-tree-factory","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.2.1"}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);