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
/******/ 	return __webpack_require__(__webpack_require__.s = "./generator.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./generator.coffee":
/*!**************************!*\
  !*** ./generator.coffee ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./source/NeptuneNamespaces/Generator */ \"./source/NeptuneNamespaces/Generator.coffee\");\n\n\n//# sourceURL=webpack:///./generator.coffee?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

eval("module.exports = {\"author\":\"Shane Brinkman-Davis Delamore, Imikimi LLC\",\"bin\":{\"neptune-namespaces\":\"./nn\",\"nn\":\"./nn\"},\"dependencies\":{\"art-build-configurator\":\"*\",\"neptune-namespaces-runtime\":\"*\"},\"description\":\"Generate index.coffee and namespace.coffee files from directory structures\",\"license\":\"ISC\",\"name\":\"neptune-namespaces\",\"scripts\":{\"build\":\"webpack --progress\",\"start\":\"webpack-dev-server --hot --inline --progress\",\"test\":\"nn -s;mocha -u tdd --compilers coffee:coffee-script/register\",\"testInBrowser\":\"webpack-dev-server --progress\"},\"version\":\"3.2.7\"};\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Generator.coffee":
/*!***************************************************!*\
  !*** ./source/NeptuneNamespaces/Generator.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Generator, IndexGenerator, NamespaceGenerator, NamespaceStructure, Path, colors, fsp, getAbsPath, getPackageRoot, getParentPath, getRelativePath, glob, indent, log, merge, normalizeDirectory, pad, peek, promiseSequence, pushIfUnique, ref, ref1, upperCamelCase, withoutTrailingSlash,\n  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },\n  slice = [].slice;\n\ncolors = __webpack_require__(/*! colors */ \"colors\");\n\nglob = __webpack_require__(/*! glob-promise */ \"glob-promise\");\n\nfsp = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nref = __webpack_require__(/*! ./MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\"), upperCamelCase = ref.upperCamelCase, peek = ref.peek, pushIfUnique = ref.pushIfUnique, indent = ref.indent, pad = ref.pad, withoutTrailingSlash = ref.withoutTrailingSlash, promiseSequence = ref.promiseSequence, merge = ref.merge, getRelativePath = ref.getRelativePath, getAbsPath = ref.getAbsPath, getParentPath = ref.getParentPath, log = ref.log, normalizeDirectory = ref.normalizeDirectory;\n\nPath = __webpack_require__(/*! path */ \"path\");\n\nNamespaceStructure = __webpack_require__(/*! ./NamespaceStructure */ \"./source/NeptuneNamespaces/NamespaceStructure.coffee\");\n\nref1 = __webpack_require__(/*! ./Generators */ \"./source/NeptuneNamespaces/Generators/index.coffee\"), IndexGenerator = ref1.IndexGenerator, NamespaceGenerator = ref1.NamespaceGenerator;\n\ngetPackageRoot = __webpack_require__(/*! ./PackageRoot */ \"./source/NeptuneNamespaces/PackageRoot.coffee\").getPackageRoot;\n\nmodule.exports = Generator = (function() {\n  Generator.standardRoots = [\"source\", \"test\", \"performance\", \"src\", \"perf\"];\n\n  Generator.findVersionFile = function(path) {\n    var packageRoot;\n    if (packageRoot = getPackageRoot(path)) {\n      return Path.join(packageRoot, \"package.json\");\n    }\n  };\n\n  Generator.generate = function(globRoot, options) {\n    if (options == null) {\n      options = {};\n    }\n    return glob(globRoot).then(function(roots) {\n      var filePromiseGenerators, root;\n      filePromiseGenerators = (function() {\n        var i, len, results;\n        results = [];\n        for (i = 0, len = roots.length; i < len; i++) {\n          root = roots[i];\n          if (fsp.statSync(root).isDirectory()) {\n            results.push((function(root) {\n              return function() {\n                var generator;\n                generator = new Generator(root, options);\n                return generator.generate().then(function() {\n                  if (options.watch) {\n                    return Generator.watch(root, merge(options, {\n                      lastGenerator: generator\n                    }));\n                  }\n                })[\"catch\"](function(error) {\n                  return log(error.stack);\n                });\n              };\n            })(root));\n          }\n        }\n        return results;\n      })();\n      return promiseSequence(filePromiseGenerators);\n    });\n  };\n\n  Generator.watch = function(root, options) {\n    var generator;\n    if (options == null) {\n      options = {};\n    }\n    this.log(root, \"watching...\".green);\n    generator = null;\n    return fsp.watch(root, {\n      persistent: options.persistent,\n      recursive: true\n    }, (function(_this) {\n      return function(event, filename) {\n        if (event !== \"change\" && !filename.match(/(^|\\/)(namespace|index)\\.coffee$/)) {\n          _this.log(root, \"watch event: \".bold.yellow + (event + \" \" + filename.yellow));\n          if (generator) {\n            options.lastGenerator = generator;\n          }\n          generator = new Generator(root, options);\n          return generator.generate();\n        }\n      };\n    })(this));\n  };\n\n  Generator.log = function() {\n    var arg, args, i, len, results, root;\n    root = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];\n    root = Path.basename(root);\n    args = args.join();\n    args = args.split(\"\\n\");\n    results = [];\n    for (i = 0, len = args.length; i < len; i++) {\n      arg = args[i];\n      results.push(console.log(arg === \"\" ? \"\" : (\"Neptune.\" + (upperCamelCase(root)) + \": \").grey + arg));\n    }\n    return results;\n  };\n\n  Generator.prototype.log = function() {\n    var args;\n    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];\n    if (!this.quiet) {\n      return Generator.log(this.getRelativePath(), args.join());\n    }\n  };\n\n  function Generator(root1, options) {\n    this.root = root1;\n    if (options == null) {\n      options = {};\n    }\n    this.generateFromFiles = bind(this.generateFromFiles, this);\n    if (typeof this.root !== \"string\") {\n      throw new Error(\"root required\");\n    }\n    this.pretend = options.pretend, this.verbose = options.verbose, this.lastGenerator = options.lastGenerator, this.force = options.force, this.quiet = options.quiet;\n    this.versionFile = Generator.findVersionFile(this.root);\n    this.rootPrefix = getParentPath(this.root);\n  }\n\n  Generator.prototype.generateHelper = function(arg1) {\n    var code, name;\n    name = arg1.name, code = arg1.code;\n    if (this.pretend) {\n      this.log(\"\\ngenerated: \" + (this.getLogFileString(name).yellow));\n      this.log(indent(code.green));\n    }\n    return this.generatedFiles[name] = code;\n  };\n\n  Generator.prototype.getRelativePath = function(path) {\n    if (path == null) {\n      path = this.root;\n    }\n    return getRelativePath(this.rootPrefix, path);\n  };\n\n  Generator.prototype.getLogFileString = function(file) {\n    return getRelativePath(process.cwd(), file);\n  };\n\n  Generator.prototype.writeFiles = function() {\n    var code, filesTotal, filesWritten, name, promises;\n    filesWritten = 0;\n    filesTotal = 0;\n    promises = (function() {\n      var ref2, results;\n      ref2 = this.generatedFiles;\n      results = [];\n      for (name in ref2) {\n        code = ref2[name];\n        results.push((function(_this) {\n          return function(name, code) {\n            var p, ref3;\n            filesTotal++;\n            if (((ref3 = _this.lastGenerator) != null ? ref3.generatedFiles[name] : void 0) === code) {\n              if (_this.verbose) {\n                return _this.log((\"no change: \" + (_this.getLogFileString(name))).grey);\n              }\n            } else {\n              p = fsp.existsSync(name) ? fsp.readFile(name, 'utf8') : Promise.resolve(null);\n              return p.then(function(currentContents) {\n                if (_this.force || currentContents !== code) {\n                  filesWritten++;\n                  _this.log(\"writing: \" + (_this.getLogFileString(name).yellow));\n                  return fsp.writeFile(name, code);\n                }\n              }, function(error) {\n                return _this.log((\"error reading \" + (_this.getLogFileString(name))).red, error);\n              });\n            }\n          };\n        })(this)(name, code));\n      }\n      return results;\n    }).call(this);\n    return Promise.all(promises).then((function(_this) {\n      return function() {\n        if (filesWritten < filesTotal) {\n          _this.log((filesTotal - filesWritten) + \"/\" + filesTotal + \" files current\");\n        }\n        if (filesWritten > 0) {\n          return _this.log(filesWritten + \"/\" + filesTotal + \" files \" + (_this.lastGenerator ? 'changed' : 'written'));\n        }\n      };\n    })(this));\n  };\n\n  Generator.prototype.generateFiles = function(namespaces) {\n    var namespace, namespacePath, path, relativeVersionFile, results;\n    this.generatedFiles = {};\n    results = [];\n    for (namespacePath in namespaces) {\n      namespace = namespaces[namespacePath];\n      path = namespace.path;\n      if (this.versionFile) {\n        relativeVersionFile = Path.relative(normalizeDirectory(path), this.versionFile);\n      }\n      this.generateHelper({\n        name: path + \"/namespace.coffee\",\n        code: NamespaceGenerator.generate(namespace, this.getRelativePath(path), relativeVersionFile)\n      });\n      results.push(this.generateHelper({\n        name: path + \"/index.coffee\",\n        code: IndexGenerator.generate(namespace, this.getRelativePath(path))\n      }));\n    }\n    return results;\n  };\n\n  Generator.prototype.showNamespaceStructure = function(namespaces) {\n    var i, len, moduleName, namespacePath, ref2, results;\n    this.log(\"generating namespace structure:\");\n    this.log(\"  Neptune\".yellow);\n    ref2 = Object.keys(namespaces).sort();\n    results = [];\n    for (i = 0, len = ref2.length; i < len; i++) {\n      namespacePath = ref2[i];\n      this.log((\"  \" + namespacePath).yellow);\n      results.push((function() {\n        var j, len1, ref3, results1;\n        ref3 = namespaces[namespacePath].getModuleNames();\n        results1 = [];\n        for (j = 0, len1 = ref3.length; j < len1; j++) {\n          moduleName = ref3[j];\n          results1.push(this.log((\"    \" + moduleName).grey));\n        }\n        return results1;\n      }).call(this));\n    }\n    return results;\n  };\n\n\n  /*\n  Input is a list of files with fill paths\n   */\n\n  Generator.prototype.generateFromFiles = function(files) {\n    var namespaces, nss;\n    namespaces = (nss = new NamespaceStructure({\n      root: this.root,\n      files: files\n    })).namespaces;\n    if (this.verbose) {\n      this.showNamespaceStructure(namespaces);\n    }\n    this.generateFiles(namespaces);\n    if (this.pretend) {\n      return Promise.resolve({\n        generatedFiles: this.generatedFiles,\n        namespaces: namespaces\n      });\n    } else {\n      return this.writeFiles();\n    }\n  };\n\n  Generator.prototype.generate = function() {\n    if (this.verbose) {\n      this.log(\"\\nscanning root: \" + this.root.yellow);\n    }\n    return glob(this.root + \"/**/*.{js,coffee,caffeine,caf}\", {\n      dot: true\n    }).then((function(_this) {\n      return function(files) {\n        var error;\n        if (files.length === 0) {\n          error = \"no .coffee files found\";\n          return _this.log(error.yellow.bold);\n        } else {\n          return _this.generateFromFiles(files);\n        }\n      };\n    })(this));\n  };\n\n  return Generator;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Generator.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Generators/IndexGenerator.coffee":
/*!*******************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/IndexGenerator.coffee ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NamespaceGenerator, alignColumns, compactFlatten, generatedByString, getRelativePath, log, max, neptuneBaseClass, pad, ref, ref1, requirePath;\n\nref = __webpack_require__(/*! ../MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\"), compactFlatten = ref.compactFlatten, log = ref.log, getRelativePath = ref.getRelativePath, pad = ref.pad;\n\nref1 = __webpack_require__(/*! ../Helper */ \"./source/NeptuneNamespaces/Helper.coffee\"), generatedByString = ref1.generatedByString, neptuneBaseClass = ref1.neptuneBaseClass, requirePath = ref1.requirePath;\n\nmax = Math.max;\n\nalignColumns = function() {\n  var cell, el, i, j, k, l, len, len1, len2, len3, line, listOfLists, m, maxLengths, paddedCells, results;\n  listOfLists = [];\n  for (j = 0, len = arguments.length; j < len; j++) {\n    el = arguments[j];\n    listOfLists = listOfLists.concat(el);\n  }\n  maxLengths = [];\n  for (k = 0, len1 = listOfLists.length; k < len1; k++) {\n    line = listOfLists[k];\n    for (i = l = 0, len2 = line.length; l < len2; i = ++l) {\n      cell = line[i];\n      maxLengths[i] = max(maxLengths[i] || 0, cell.length);\n    }\n  }\n  maxLengths[maxLengths - 1] = 0;\n  results = [];\n  for (m = 0, len3 = listOfLists.length; m < len3; m++) {\n    line = listOfLists[m];\n    paddedCells = (function() {\n      var len4, n, results1;\n      results1 = [];\n      for (i = n = 0, len4 = line.length; n < len4; i = ++n) {\n        cell = line[i];\n        results1.push(pad(cell, maxLengths[i]));\n      }\n      return results1;\n    })();\n    results.push(paddedCells.join(' '));\n  }\n  return results;\n};\n\nmodule.exports = NamespaceGenerator = (function() {\n  function NamespaceGenerator() {}\n\n  NamespaceGenerator.generate = function(namespace, relativeFilePath) {\n    var contents, generateNamespacedList, includeInNamespace, modules, name, path;\n    path = namespace.path, includeInNamespace = namespace.includeInNamespace;\n    generateNamespacedList = function(set) {\n      var item, items, j, len, namespaceName, ref2, results;\n      items = (function() {\n        var ref2, results;\n        ref2 = set.namespaced;\n        results = [];\n        for (namespaceName in ref2) {\n          path = ref2[namespaceName];\n          results.push({\n            namespaceName: namespaceName,\n            path: path\n          });\n        }\n        return results;\n      })();\n      ref2 = items.sort(function(a, b) {\n        return a.path.localeCompare(b.path);\n      });\n      results = [];\n      for (j = 0, len = ref2.length; j < len; j++) {\n        item = ref2[j];\n        results.push([\" \", item.namespaceName + \":\", \"require '\" + (requirePath(item.path)) + \"'\"]);\n      }\n      return results;\n    };\n    modules = generateNamespacedList(namespace.fileSet);\n    contents = compactFlatten([\n      generatedByString, \"# file: \" + (relativeFilePath || path) + \"/index.coffee\", \"\", (function() {\n        var j, len, ref2, results;\n        ref2 = namespace.getAllNonNamespacedRequires();\n        results = [];\n        for (j = 0, len = ref2.length; j < len; j++) {\n          name = ref2[j];\n          results.push(\"require '\" + (requirePath(name)) + \"'\");\n        }\n        return results;\n      })(), \"module.exports = require './namespace'\", \"module.exports\", includeInNamespace && (\".includeInNamespace require '\" + (requirePath(includeInNamespace)) + \"'\"), modules.length > 0 ? \".addModules\" : void 0, alignColumns(modules), (function() {\n        var j, len, ref2, results;\n        ref2 = namespace.getAllNamespacedSubdirRequires();\n        results = [];\n        for (j = 0, len = ref2.length; j < len; j++) {\n          name = ref2[j];\n          results.push(\"require './\" + name + \"'\");\n        }\n        return results;\n      })()\n    ]);\n    return contents.join(\"\\n\");\n  };\n\n  return NamespaceGenerator;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Generators/IndexGenerator.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Generators/NamespaceGenerator.coffee":
/*!***********************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/NamespaceGenerator.coffee ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NamespaceGenerator, PackageNamespaceClassName, generatedByString, isPathedNamespace, neptuneBaseClass, peek, ref, requirePath;\n\nref = __webpack_require__(/*! ../Helper */ \"./source/NeptuneNamespaces/Helper.coffee\"), generatedByString = ref.generatedByString, neptuneBaseClass = ref.neptuneBaseClass, PackageNamespaceClassName = ref.PackageNamespaceClassName, requirePath = ref.requirePath;\n\npeek = __webpack_require__(/*! ../MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\").peek;\n\nisPathedNamespace = Neptune.isPathedNamespace;\n\nmodule.exports = NamespaceGenerator = (function() {\n  function NamespaceGenerator() {}\n\n  NamespaceGenerator.generate = function(namespace, relativeFilePath, versionFile) {\n    var a, className, isPathNamespace, meat, name, namespaceName, parent, parentNamespaceName, parentNamespacePath, path, requireParent;\n    parent = namespace.parent, path = namespace.path, namespaceName = namespace.namespaceName, isPathNamespace = namespace.isPathNamespace;\n    className = isPathedNamespace(namespaceName) ? peek(namespaceName.split('.')) : namespaceName;\n    parentNamespaceName = parent.namespaceName;\n    parentNamespacePath = parent.parent ? \"../namespace\" : parent.path;\n    requireParent = \"(require '\" + parentNamespacePath + \"')\";\n    meat = isPathNamespace ? requireParent + \".vivifySubnamespace '\" + namespaceName + \"'\" : versionFile && namespace.getIsRootPackageNamespace() ? requireParent + \".addNamespace '\" + namespaceName + \"', class \" + className + \" extends \" + PackageNamespaceClassName + \"\\n  @version: require('\" + versionFile + \"').version\" : requireParent + \".addNamespace('\" + namespaceName + \"', class \" + className + \" extends \" + PackageNamespaceClassName + \")\";\n    return generatedByString + \"\\n# file: \" + (relativeFilePath || path) + \"/namespace.coffee\\n\\nmodule.exports = \" + meat + \"\\n\" + (a = (function() {\n      var i, len, ref1, results;\n      ref1 = namespace.getAllNamespacedSubdirRequires();\n      results = [];\n      for (i = 0, len = ref1.length; i < len; i++) {\n        name = ref1[i];\n        results.push(\"require './\" + name + \"/namespace'\");\n      }\n      return results;\n    })(), a.join(\";\\n\"));\n  };\n\n  return NamespaceGenerator;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Generators/NamespaceGenerator.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Generators/index.coffee":
/*!**********************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/index.coffee ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./namespace */ \"./source/NeptuneNamespaces/Generators/namespace.coffee\");\n\nmodule.exports.addModules({\n  IndexGenerator: __webpack_require__(/*! ./IndexGenerator */ \"./source/NeptuneNamespaces/Generators/IndexGenerator.coffee\"),\n  NamespaceGenerator: __webpack_require__(/*! ./NamespaceGenerator */ \"./source/NeptuneNamespaces/Generators/NamespaceGenerator.coffee\")\n});\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Generators/index.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Generators/namespace.coffee":
/*!**************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/namespace.coffee ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Generators,\n  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },\n  hasProp = {}.hasOwnProperty;\n\nmodule.exports = (__webpack_require__(/*! ../namespace */ \"./source/NeptuneNamespaces/namespace.coffee\")).addNamespace('Generators', Generators = (function(superClass) {\n  extend(Generators, superClass);\n\n  function Generators() {\n    return Generators.__super__.constructor.apply(this, arguments);\n  }\n\n  return Generators;\n\n})(Neptune.PackageNamespace));\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Generators/namespace.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/Helper.coffee":
/*!************************************************!*\
  !*** ./source/NeptuneNamespaces/Helper.coffee ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Helper, Path, arrayWithoutLast, fileWithoutExtension, log, peek, ref, upperCamelCase, version;\n\nversion = __webpack_require__(/*! ../../package.json */ \"./package.json\").version;\n\nref = __webpack_require__(/*! ./MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\"), log = ref.log, upperCamelCase = ref.upperCamelCase, fileWithoutExtension = ref.fileWithoutExtension, peek = ref.peek, arrayWithoutLast = ref.arrayWithoutLast;\n\nPath = __webpack_require__(/*! path */ \"path\");\n\nmodule.exports = Helper = (function() {\n  var toModuleName;\n\n  function Helper() {}\n\n  Helper.generatedByString = \"# generated by Neptune Namespaces v\" + version[0] + \".x.x\";\n\n  Helper.globalNamespaceName = \"Neptune\";\n\n  Helper.neptuneBaseClass = Helper.globalNamespaceName + \".Namespace\";\n\n  Helper.PackageNamespaceClassName = Helper.globalNamespaceName + \".PackageNamespace\";\n\n  Helper.shouldNotAutoload = function(itemName) {\n    return !!itemName.match(/^([\\._].*|index.coffee|namespace.coffee)$/);\n  };\n\n  Helper.shouldNotNamespace = function(itemName) {\n    return !!itemName.match(/^-/);\n  };\n\n  Helper.shouldIncludeInNamespace = function(file, namespaceName) {\n    return toModuleName(file) === peek(namespaceName.split('.'));\n  };\n\n  Helper.toFilename = function(path) {\n    return peek(path.split('/'));\n  };\n\n  Helper.toModuleName = toModuleName = function(itemName) {\n    return upperCamelCase(fileWithoutExtension(itemName));\n  };\n\n  Helper.requirePath = function(filenameWithExtension) {\n    return \"./\" + Path.parse(filenameWithExtension).name;\n  };\n\n  return Helper;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/Helper.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/MiniFoundation.coffee":
/*!********************************************************!*\
  !*** ./source/NeptuneNamespaces/MiniFoundation.coffee ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var MiniFoundation, Path, colors,\n  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };\n\ncolors = __webpack_require__(/*! colors */ \"colors\");\n\nPath = __webpack_require__(/*! path */ \"path\");\n\nmodule.exports = MiniFoundation = (function() {\n  var compactFlatten, escapeJavascriptString, formattedInspect, isFunction, isPlainArray, isPlainObject, isString, k, log, normalizeDirectory, ref, ref1, v;\n\n  function MiniFoundation() {}\n\n  if (v !== \"Core\") {\n    ref = __webpack_require__(/*! art-standard-lib/Core */ \"art-standard-lib/Core\");\n    for (k in ref) {\n      v = ref[k];\n      MiniFoundation[k] = v;\n    }\n  }\n\n  ref1 = MiniFoundation, compactFlatten = ref1.compactFlatten, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray, isPlainObject = ref1.isPlainObject, isString = ref1.isString;\n\n  MiniFoundation.promiseSequence = function(promiseGeneratingFunctions) {\n    var resolveNextPromise;\n    promiseGeneratingFunctions = promiseGeneratingFunctions.reverse();\n    resolveNextPromise = function() {\n      if (promiseGeneratingFunctions.length > 0) {\n        return promiseGeneratingFunctions.pop()().then(function() {\n          return resolveNextPromise();\n        });\n      }\n    };\n    if (promiseGeneratingFunctions.length === 0) {\n      return Promise.resolve();\n    } else {\n      return resolveNextPromise();\n    }\n  };\n\n  MiniFoundation.normalizeDirectory = normalizeDirectory = function(directory) {\n    return Path.normalize(Path.isAbsolute(directory) ? directory : Path.join(process.cwd(), directory));\n  };\n\n  MiniFoundation.escapeJavascriptString = escapeJavascriptString = function(str) {\n    return JSON.stringify(str);\n  };\n\n  MiniFoundation.arrayWithoutLast = function(array) {\n    return array.slice(0, array.length - 1);\n  };\n\n  MiniFoundation.fileWithoutExtension = function(file) {\n    return file.split(/\\.[a-zA-Z]+$/)[0];\n  };\n\n  MiniFoundation.peek = function(array, offset) {\n    if (offset == null) {\n      offset = -1;\n    }\n    return (array != null ? array.length : void 0) > 0 && array[array.length + offset];\n  };\n\n  MiniFoundation.pushIfUnique = function(array, value) {\n    if (indexOf.call(array, value) < 0) {\n      array.push(value);\n    }\n    return array;\n  };\n\n  MiniFoundation.indent = function(str, indentStr) {\n    var joiner;\n    if (indentStr == null) {\n      indentStr = \"  \";\n    }\n    joiner = \"\\n\" + indentStr;\n    return indentStr + str.split(\"\\n\").join(joiner);\n  };\n\n  MiniFoundation.pad = function(str, length, character) {\n    var diff;\n    if (character == null) {\n      character = \" \";\n    }\n    if (0 < (diff = length - str.length)) {\n      str += character.repeat(diff);\n    }\n    return str;\n  };\n\n  MiniFoundation.withoutTrailingSlash = function(str) {\n    return str.match(/^(.*[^\\/])\\/?$/)[1];\n  };\n\n  MiniFoundation.formattedInspect = formattedInspect = function(a, indent) {\n    var el, inspected, str;\n    if (indent == null) {\n      indent = '';\n    }\n    if (isFunction(a != null ? a.getInspectedObjects : void 0)) {\n      a = a.getInspectedObjects();\n    }\n    if (isPlainArray(a)) {\n      inspected = (function() {\n        var i, len, results;\n        results = [];\n        for (i = 0, len = a.length; i < len; i++) {\n          el = a[i];\n          results.push(formattedInspect(el, indent + '  '));\n        }\n        return results;\n      })();\n      return \"[]\\n\" + indent + (inspected.join(\"\\n\" + indent));\n    } else if (isPlainObject(a)) {\n      inspected = (function() {\n        var i, len, ref2, results;\n        ref2 = Object.keys(a).sort();\n        results = [];\n        for (i = 0, len = ref2.length; i < len; i++) {\n          k = ref2[i];\n          results.push((k + \": \") + formattedInspect(a[k], indent + '  '));\n        }\n        return results;\n      })();\n      return \"\\n\" + indent + (inspected.join(\"\\n\" + indent));\n    } else if (isString(a)) {\n      str = a.match(/\\n/) ? compactFlatten(['\"\"\"', a.split(/\\n/), '\"\"\"']).join(\"\\n\" + indent) : escapeJavascriptString(a);\n      return str.green;\n    } else {\n      return \"\" + a;\n    }\n  };\n\n  MiniFoundation.log = log = function() {\n    var el, list;\n    if (arguments.length === 1) {\n      return console.log(formattedInspect(arguments[0]));\n    } else {\n      list = (function() {\n        var i, len, results;\n        results = [];\n        for (i = 0, len = arguments.length; i < len; i++) {\n          el = arguments[i];\n          results.push(el);\n        }\n        return results;\n      }).apply(this, arguments);\n      return console.log(formattedInspect(list));\n    }\n  };\n\n  MiniFoundation.getParentPath = function(path) {\n    return Path.parse(path).dir;\n  };\n\n  MiniFoundation.getRelativePath = function(absFrom, absTo) {\n    if (absFrom) {\n      return Path.relative(absFrom, absTo);\n    } else {\n      return absTo;\n    }\n  };\n\n  MiniFoundation.getAbsPath = function(absPath, relativePath) {\n    if (absPath) {\n      return Path.join(absPath, relativePath);\n    } else {\n      return relativePath;\n    }\n  };\n\n  return MiniFoundation;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/MiniFoundation.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/NamespaceStructure.coffee":
/*!************************************************************!*\
  !*** ./source/NeptuneNamespaces/NamespaceStructure.coffee ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Namespace, NamespaceDir, NamespaceSet, NamespaceStructure, arrayWithoutLast, basename, fileWithoutExtension, globalNamespaceName, isPathedNamespace, log, merge, normalizeNamespaceName, peek, pushIfUnique, ref, ref1, shouldIncludeInNamespace, shouldNotAutoload, shouldNotNamespace, toFilename, toModuleName, upperCamelCase,\n  slice = [].slice;\n\nref = __webpack_require__(/*! ./MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\"), upperCamelCase = ref.upperCamelCase, peek = ref.peek, pushIfUnique = ref.pushIfUnique, log = ref.log, merge = ref.merge, arrayWithoutLast = ref.arrayWithoutLast, fileWithoutExtension = ref.fileWithoutExtension;\n\nref1 = __webpack_require__(/*! ./Helper */ \"./source/NeptuneNamespaces/Helper.coffee\"), globalNamespaceName = ref1.globalNamespaceName, shouldNotAutoload = ref1.shouldNotAutoload, shouldNotNamespace = ref1.shouldNotNamespace, shouldIncludeInNamespace = ref1.shouldIncludeInNamespace, toFilename = ref1.toFilename, toModuleName = ref1.toModuleName;\n\nbasename = __webpack_require__(/*! path */ \"path\").basename;\n\nisPathedNamespace = Neptune.isPathedNamespace;\n\nNamespaceSet = (function() {\n\n  /*\n  @length: number of non-ignored items\n   */\n  function NamespaceSet(items) {\n    var i, item, len;\n    this.ignored = [];\n    this.notNamespaced = [];\n    this.namespaced = {};\n    this.length = 0;\n    if (items) {\n      for (i = 0, len = items.length; i < len; i++) {\n        item = items[i];\n        this.addItem(item);\n      }\n    }\n  }\n\n  NamespaceSet.prototype.containsNormalizedItemName = function(itemName) {\n    return !!this.namespaced[toModuleName(itemName)];\n  };\n\n  NamespaceSet.prototype.addItem = function(item) {\n    var itemName;\n    itemName = peek(item.split('/'));\n    if (shouldNotAutoload(itemName)) {\n      return this.ignored.push(\"\" + (basename(item)));\n    }\n    this.length++;\n    if (shouldNotNamespace(itemName)) {\n      return this.notNamespaced.push(\"\" + (basename(item)));\n    }\n    return this.namespaced[toModuleName(itemName)] = item;\n  };\n\n  NamespaceSet.prototype.getInspectedObjects = function() {\n    var out;\n    out = {};\n    if (Object.keys(this.namespaced).length > 0) {\n      out.namespaced = this.namespaced;\n    }\n    if (this.notNamespaced.length > 0) {\n      out.notNamespaced = this.notNamespaced;\n    }\n    if (this.ignored.length > 0) {\n      out.ignored = this.ignored;\n    }\n    return out;\n  };\n\n  return NamespaceSet;\n\n})();\n\nNamespace = (function() {\n  function Namespace(arg) {\n    this.namespaceName = arg.namespaceName, this.path = arg.path, this.namespacePath = arg.namespacePath, this.files = arg.files, this.subdirs = arg.subdirs, this.parent = arg.parent, this.includeInNamespace = arg.includeInNamespace;\n    this.fileSet = new NamespaceSet(this.files);\n    this.subdirSet = new NamespaceSet(this.subdirs);\n    this.isPathNamespace = this.fileSet.length === 0 && !this.includeInNamespace && this.subdirSet.length <= 1;\n    this.isPackageNamespace = !this.isPathNamespace;\n  }\n\n  Namespace.prototype.getIsRootPackageNamespace = function() {\n    return !this.parent || !this.parent.getIsInsidePackageNamespace();\n  };\n\n  Namespace.prototype.getIsInsidePackageNamespace = function() {\n    var ref2;\n    return this.isPackageNamespace || ((ref2 = this.parent) != null ? ref2.getIsInsidePackageNamespace() : void 0);\n  };\n\n  Namespace.prototype.getInspectedObjects = function() {\n    var out, ref2, ref3;\n    out = {\n      namespaceName: this.namespaceName,\n      namespacePath: this.namespacePath,\n      path: this.path\n    };\n    if (this.includeInNamespace) {\n      out.includeInNamespace = this.includeInNamespace;\n    }\n    if (this.parent) {\n      out.parentNamespacePath = this.parent.namespacePath;\n    }\n    if (((ref2 = this.files) != null ? ref2.length : void 0) > 0) {\n      out.files = this.fileSet.getInspectedObjects();\n    }\n    if (((ref3 = this.subdirs) != null ? ref3.length : void 0) > 0) {\n      out.subdirs = this.subdirSet.getInspectedObjects();\n    }\n    return out;\n  };\n\n  Namespace.prototype.getModuleNames = function() {\n    return Object.keys(this.fileSet.namespaced).sort();\n  };\n\n  Namespace.prototype.getAllNonNamespacedRequires = function() {\n    var out, v;\n    out = [];\n    this.fileSet && ((function() {\n      var i, len, ref2, results;\n      ref2 = this.fileSet.notNamespaced;\n      results = [];\n      for (i = 0, len = ref2.length; i < len; i++) {\n        v = ref2[i];\n        results.push(out.push(v));\n      }\n      return results;\n    }).call(this));\n    this.subdirSet && ((function() {\n      var i, len, ref2, results;\n      ref2 = this.subdirSet.notNamespaced;\n      results = [];\n      for (i = 0, len = ref2.length; i < len; i++) {\n        v = ref2[i];\n        results.push(out.push(v));\n      }\n      return results;\n    }).call(this));\n    return out.sort();\n  };\n\n  Namespace.prototype.getAllNamespacedSubdirRequires = function() {\n    var k, out, ref2, v;\n    out = [];\n    if (this.subdirSet) {\n      ref2 = this.subdirSet.namespaced;\n      for (k in ref2) {\n        v = ref2[k];\n        if (!this.fileSet.containsNormalizedItemName(k)) {\n          out.push(v);\n        }\n      }\n    }\n    return out.sort();\n  };\n\n  return Namespace;\n\n})();\n\nnormalizeNamespaceName = function(name) {\n  var part, parts;\n  if (isPathedNamespace(name)) {\n    parts = (function() {\n      var i, len, ref2, results;\n      ref2 = name.split('.');\n      results = [];\n      for (i = 0, len = ref2.length; i < len; i++) {\n        part = ref2[i];\n        if (part.length > 0) {\n          results.push(upperCamelCase(part));\n        }\n      }\n      return results;\n    })();\n    return parts.join('.');\n  } else {\n    return upperCamelCase(name);\n  }\n};\n\nNamespaceDir = (function() {\n  function NamespaceDir(arg) {\n    var namespaceName, ref2;\n    namespaceName = arg.namespaceName, this.path = arg.path, this.parent = arg.parent;\n    this.files = [];\n    this.subdirs = [];\n    this.namespaceName = normalizeNamespaceName(namespaceName);\n    this.namespacePath = (((ref2 = this.parent) != null ? ref2.namespacePath : void 0) || globalNamespaceName) + \".\" + this.namespaceName;\n  }\n\n  NamespaceDir.prototype.addFile = function(file) {\n    return file && (shouldIncludeInNamespace(file, this.namespaceName) ? this.includeInNamespace = file : pushIfUnique(this.files, file));\n  };\n\n  NamespaceDir.prototype.addSubdir = function(subdir) {\n    return subdir && pushIfUnique(this.subdirs, subdir);\n  };\n\n  NamespaceDir.prototype.getInspectedObjects = function() {\n    var obj, ref2;\n    return (\n      obj = {},\n      obj[\"\" + this.path] = {\n        namespaceName: this.namespaceName,\n        namespacePath: this.namespacePath,\n        files: this.files,\n        subdirs: this.subdirs,\n        parent: (ref2 = this.parent) != null ? ref2.namespacePath : void 0\n      },\n      obj\n    );\n  };\n\n  return NamespaceDir;\n\n})();\n\nmodule.exports = NamespaceStructure = (function() {\n  var addNamespace;\n\n  NamespaceStructure.shouldNotAutoload = shouldNotAutoload;\n\n  NamespaceStructure.shouldNotNamespace = shouldNotNamespace;\n\n  function NamespaceStructure(arg) {\n    var file, i, len, ref2;\n    this.root = arg.root, this.files = arg.files;\n    this._dirs = {};\n    ref2 = this.files;\n    for (i = 0, len = ref2.length; i < len; i++) {\n      file = ref2[i];\n      this._addSourcePathArrayAndFile({\n        file: file\n      });\n    }\n    this.namespaces = this._generateNamespaces(this._dirs);\n  }\n\n  NamespaceStructure.prototype.getInspectedObjects = function() {\n    var k, namespace, out, ref2;\n    out = {};\n    ref2 = this.namespaces;\n    for (k in ref2) {\n      namespace = ref2[k];\n      out[k] = namespace.getInspectedObjects();\n    }\n    return out;\n  };\n\n  NamespaceStructure.prototype._addSourcePathArrayAndFile = function(arg) {\n    var base, dir, file, i, j, namespaceName, namespacePath, path, pathArray, ref2, subdir;\n    pathArray = arg.pathArray, file = arg.file, subdir = arg.subdir;\n    if (!pathArray) {\n      ref2 = file.split(\"/\"), pathArray = 2 <= ref2.length ? slice.call(ref2, 0, i = ref2.length - 1) : (i = 0, []), file = ref2[i++];\n    }\n    path = pathArray.join('/');\n    namespacePath = 2 <= pathArray.length ? slice.call(pathArray, 0, j = pathArray.length - 1) : (j = 0, []), namespaceName = pathArray[j++];\n    dir = (base = this._dirs)[path] || (base[path] = new NamespaceDir({\n      namespaceName: namespaceName,\n      path: path,\n      parent: this.root !== path ? this._addSourcePathArrayAndFile({\n        pathArray: namespacePath,\n        subdir: namespaceName\n      }) : void 0\n    }));\n    dir.addFile(file);\n    dir.addSubdir(subdir);\n    return dir;\n  };\n\n  addNamespace = function(namespaces, dir) {\n    var name1;\n    if (dir) {\n      return namespaces[name1 = dir.namespacePath] || (namespaces[name1] = new Namespace(merge(dir, {\n        parent: addNamespace(namespaces, dir.parent)\n      })));\n    } else {\n      return new Namespace({\n        namespaceName: globalNamespaceName,\n        namespacePath: globalNamespaceName,\n        path: 'neptune-namespaces'\n      });\n    }\n  };\n\n  NamespaceStructure.prototype._generateNamespaces = function(dirs) {\n    var dir, name, namespaces;\n    namespaces = {};\n    for (name in dirs) {\n      dir = dirs[name];\n      addNamespace(namespaces, dir);\n    }\n    return namespaces;\n  };\n\n  return NamespaceStructure;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/NamespaceStructure.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/PackageRoot.coffee":
/*!*****************************************************!*\
  !*** ./source/NeptuneNamespaces/PackageRoot.coffee ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var PackageRoot, fs, normalizeDirectory, path;\n\npath = __webpack_require__(/*! path */ \"path\");\n\nfs = __webpack_require__(/*! fs-extra */ \"fs-extra\");\n\nnormalizeDirectory = __webpack_require__(/*! ./MiniFoundation */ \"./source/NeptuneNamespaces/MiniFoundation.coffee\").normalizeDirectory;\n\nmodule.exports = PackageRoot = (function() {\n  function PackageRoot() {}\n\n  PackageRoot.getPackageRoot = function(directory) {\n    return PackageRoot._findRootR(normalizeDirectory(directory));\n  };\n\n  PackageRoot._knownPackageRoots = {};\n\n\n  /*\n  IN:\n    directory: must be a normalized string pointing at an actual directory\n  OUT:\n    string representing the first parent directory that contains package.json\n    OR false if none found\n   */\n\n  PackageRoot._findRootR = function(directory) {\n    var knownSourceRoot;\n    if (knownSourceRoot = this._knownPackageRoots[directory]) {\n      return knownSourceRoot;\n    } else {\n      if (fs.existsSync(path.join(directory, \"package.json\"))) {\n        return directory;\n      } else if (directory !== \"/\" && directory.length > 0) {\n        return this._knownPackageRoots[directory] = this._findRootR(path.dirname(directory));\n      } else {\n        return false;\n      }\n    }\n  };\n\n  return PackageRoot;\n\n})();\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/PackageRoot.coffee?");

/***/ }),

/***/ "./source/NeptuneNamespaces/namespace.coffee":
/*!***************************************************!*\
  !*** ./source/NeptuneNamespaces/namespace.coffee ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var NeptuneNamespaces,\n  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },\n  hasProp = {}.hasOwnProperty;\n\nmodule.exports = (__webpack_require__(/*! neptune-namespaces */ \"neptune-namespaces\")).addNamespace('NeptuneNamespaces', NeptuneNamespaces = (function(superClass) {\n  extend(NeptuneNamespaces, superClass);\n\n  function NeptuneNamespaces() {\n    return NeptuneNamespaces.__super__.constructor.apply(this, arguments);\n  }\n\n  NeptuneNamespaces.version = __webpack_require__(/*! ../../package.json */ \"./package.json\").version;\n\n  return NeptuneNamespaces;\n\n})(Neptune.PackageNamespace));\n\n__webpack_require__(/*! ./Generators/namespace */ \"./source/NeptuneNamespaces/Generators/namespace.coffee\");\n\n\n//# sourceURL=webpack:///./source/NeptuneNamespaces/namespace.coffee?");

/***/ }),

/***/ "art-standard-lib/Core":
/*!***************************************************************************************!*\
  !*** external "require('art-standard-lib/Core' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('art-standard-lib/Core' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('art-standard-lib/Core'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ }),

/***/ "colors":
/*!************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('colors' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('colors'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ }),

/***/ "fs-extra":
/*!**************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('fs-extra'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ }),

/***/ "glob-promise":
/*!******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('glob-promise'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ }),

/***/ "neptune-namespaces":
/*!************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('neptune-namespaces'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ }),

/***/ "path":
/*!**********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require('path' /* ABC - not inlining fellow NPM */);\n\n//# sourceURL=webpack:///external_%22require('path'_/*_ABC_-_not_inlining_fellow_NPM_*/)%22?");

/***/ })

/******/ });