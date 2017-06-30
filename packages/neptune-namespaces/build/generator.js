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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var MiniFoundation, Path, colors,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

colors = __webpack_require__(4);

Path = __webpack_require__(1);

module.exports = MiniFoundation = (function() {
  var compactFlatten, escapeJavascriptString, formattedInspect, isFunction, isPlainArray, isPlainObject, isString, k, log, ref, ref1, v;

  function MiniFoundation() {}

  ref = __webpack_require__(15);
  for (k in ref) {
    v = ref[k];
    MiniFoundation[k] = v;
  }

  ref1 = MiniFoundation, compactFlatten = ref1.compactFlatten, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray, isPlainObject = ref1.isPlainObject, isString = ref1.isString;

  MiniFoundation.promiseSequence = function(promiseGeneratingFunctions) {
    var resolveNextPromise;
    promiseGeneratingFunctions = promiseGeneratingFunctions.reverse();
    resolveNextPromise = function() {
      if (promiseGeneratingFunctions.length > 0) {
        return promiseGeneratingFunctions.pop()().then(function() {
          return resolveNextPromise();
        });
      }
    };
    if (promiseGeneratingFunctions.length === 0) {
      return Promise.resolve();
    } else {
      return resolveNextPromise();
    }
  };

  MiniFoundation.escapeJavascriptString = escapeJavascriptString = function(str) {
    return JSON.stringify(str);
  };

  MiniFoundation.arrayWithoutLast = function(array) {
    return array.slice(0, array.length - 1);
  };

  MiniFoundation.fileWithoutExtension = function(file) {
    return file.split(/\.[a-zA-Z]+$/)[0];
  };

  MiniFoundation.peek = function(array, offset) {
    if (offset == null) {
      offset = -1;
    }
    return (array != null ? array.length : void 0) > 0 && array[array.length + offset];
  };

  MiniFoundation.pushIfUnique = function(array, value) {
    if (indexOf.call(array, value) < 0) {
      array.push(value);
    }
    return array;
  };

  MiniFoundation.indent = function(str, indentStr) {
    var joiner;
    if (indentStr == null) {
      indentStr = "  ";
    }
    joiner = "\n" + indentStr;
    return indentStr + str.split("\n").join(joiner);
  };

  MiniFoundation.pad = function(str, length, character) {
    var diff;
    if (character == null) {
      character = " ";
    }
    if (0 < (diff = length - str.length)) {
      str += character.repeat(diff);
    }
    return str;
  };

  MiniFoundation.withoutTrailingSlash = function(str) {
    return str.match(/^(.*[^\/])\/?$/)[1];
  };

  MiniFoundation.formattedInspect = formattedInspect = function(a, indent) {
    var el, inspected, str;
    if (indent == null) {
      indent = '';
    }
    if (isFunction(a != null ? a.getInspectedObjects : void 0)) {
      a = a.getInspectedObjects();
    }
    if (isPlainArray(a)) {
      inspected = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = a.length; i < len; i++) {
          el = a[i];
          results.push(formattedInspect(el, indent + '  '));
        }
        return results;
      })();
      return "[]\n" + indent + (inspected.join("\n" + indent));
    } else if (isPlainObject(a)) {
      inspected = (function() {
        var i, len, ref2, results;
        ref2 = Object.keys(a).sort();
        results = [];
        for (i = 0, len = ref2.length; i < len; i++) {
          k = ref2[i];
          results.push((k + ": ") + formattedInspect(a[k], indent + '  '));
        }
        return results;
      })();
      return "\n" + indent + (inspected.join("\n" + indent));
    } else if (isString(a)) {
      str = a.match(/\n/) ? compactFlatten(['"""', a.split(/\n/), '"""']).join("\n" + indent) : escapeJavascriptString(a);
      return str.green;
    } else {
      return "" + a;
    }
  };

  MiniFoundation.log = log = function() {
    var el, list;
    if (arguments.length === 1) {
      return console.log(formattedInspect(arguments[0]));
    } else {
      list = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = arguments.length; i < len; i++) {
          el = arguments[i];
          results.push(el);
        }
        return results;
      }).apply(this, arguments);
      return console.log(formattedInspect(list));
    }
  };

  MiniFoundation.getParentPath = function(path) {
    return Path.parse(path).dir;
  };

  MiniFoundation.getRelativePath = function(absFrom, absTo) {
    if (absFrom) {
      return Path.relative(absFrom, absTo);
    } else {
      return absTo;
    }
  };

  MiniFoundation.getAbsPath = function(absPath, relativePath) {
    if (absPath) {
      return Path.join(absPath, relativePath);
    } else {
      return relativePath;
    }
  };

  return MiniFoundation;

})();


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Helper, Path, arrayWithoutLast, fileWithoutExtension, log, peek, ref, upperCamelCase, version;

version = __webpack_require__(14).version;

ref = __webpack_require__(0), log = ref.log, upperCamelCase = ref.upperCamelCase, fileWithoutExtension = ref.fileWithoutExtension, peek = ref.peek, arrayWithoutLast = ref.arrayWithoutLast;

Path = __webpack_require__(1);

module.exports = Helper = (function() {
  var toModuleName;

  function Helper() {}

  Helper.generatedByString = "# generated by Neptune Namespaces v" + version[0] + ".x.x";

  Helper.globalNamespaceName = "Neptune";

  Helper.neptuneBaseClass = Helper.globalNamespaceName + ".Namespace";

  Helper.PackageNamespaceClassName = Helper.globalNamespaceName + ".PackageNamespace";

  Helper.shouldIgnore = function(itemName) {
    return !!itemName.match(/^(\..*|index.coffee|namespace.coffee)$/);
  };

  Helper.shouldNotNamespace = function(itemName) {
    return !!itemName.match(/^-/);
  };

  Helper.shouldIncludeInNamespace = function(file, namespaceName) {
    return toModuleName(file) === peek(namespaceName.split('.'));
  };

  Helper.toFilename = function(path) {
    return peek(path.split('/'));
  };

  Helper.toModuleName = toModuleName = function(itemName) {
    return upperCamelCase(fileWithoutExtension(itemName));
  };

  Helper.requirePath = function(filenameWithExtension) {
    return "./" + Path.parse(filenameWithExtension).name;
  };

  return Helper;

})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Generators,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(13)).addNamespace('Generators', Generators = (function(superClass) {
  extend(Generators, superClass);

  function Generators() {
    return Generators.__super__.constructor.apply(this, arguments);
  }

  return Generators;

})(Neptune.PackageNamespace));


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Generator, IndexGenerator, NamespaceGenerator, NamespaceStructure, Path, colors, fsp, getAbsPath, getParentPath, getRelativePath, glob, indent, log, merge, pad, peek, promiseSequence, pushIfUnique, ref, ref1, upperCamelCase, withoutTrailingSlash,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  slice = [].slice;

colors = __webpack_require__(4);

glob = __webpack_require__(17);

fsp = __webpack_require__(16);

ref = __webpack_require__(0), upperCamelCase = ref.upperCamelCase, peek = ref.peek, pushIfUnique = ref.pushIfUnique, indent = ref.indent, pad = ref.pad, withoutTrailingSlash = ref.withoutTrailingSlash, promiseSequence = ref.promiseSequence, merge = ref.merge, getRelativePath = ref.getRelativePath, getAbsPath = ref.getAbsPath, getParentPath = ref.getParentPath, log = ref.log;

Path = __webpack_require__(1);

NamespaceStructure = __webpack_require__(12);

ref1 = __webpack_require__(11), IndexGenerator = ref1.IndexGenerator, NamespaceGenerator = ref1.NamespaceGenerator;

module.exports = Generator = (function() {
  Generator.standardRoots = ["source", "test", "performance", "src", "perf"];

  Generator.generate = function(globRoot, options) {
    if (options == null) {
      options = {};
    }
    return glob(globRoot).then(function(roots) {
      var filePromiseGenerators, root;
      filePromiseGenerators = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = roots.length; i < len; i++) {
          root = roots[i];
          if (fsp.statSync(root).isDirectory()) {
            results.push((function(root) {
              return function() {
                var generator;
                generator = new Generator(root, options);
                return generator.generate().then(function() {
                  if (options.watch) {
                    return Generator.watch(root, merge(options, {
                      lastGenerator: generator
                    }));
                  }
                })["catch"](function(error) {
                  return log("Error: ".red, foo);
                });
              };
            })(root));
          }
        }
        return results;
      })();
      return promiseSequence(filePromiseGenerators);
    });
  };

  Generator.watch = function(root, options) {
    var generator;
    if (options == null) {
      options = {};
    }
    this.log(root, "watching...".green);
    generator = null;
    return fsp.watch(root, {
      persistent: options.persistent,
      recursive: true
    }, (function(_this) {
      return function(event, filename) {
        if (event !== "change" && !filename.match(/(^|\/)(namespace|index)\.coffee$/)) {
          _this.log(root, "watch event: ".bold.yellow + (event + " " + filename.yellow));
          if (generator) {
            options.lastGenerator = generator;
          }
          generator = new Generator(root, options);
          return generator.generate();
        }
      };
    })(this));
  };

  Generator.log = function() {
    var arg, args, i, len, results, root;
    root = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    root = Path.basename(root);
    args = args.join();
    args = args.split("\n");
    results = [];
    for (i = 0, len = args.length; i < len; i++) {
      arg = args[i];
      results.push(console.log(arg === "" ? "" : ("Neptune." + (upperCamelCase(root)) + ": ").grey + arg));
    }
    return results;
  };

  Generator.prototype.log = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    if (!this.quiet) {
      return Generator.log(this.getRelativePath(), args.join());
    }
  };

  function Generator(root1, options) {
    this.root = root1;
    if (options == null) {
      options = {};
    }
    this.generateFromFiles = bind(this.generateFromFiles, this);
    if (typeof this.root !== "string") {
      throw new Error("root required");
    }
    this.pretend = options.pretend, this.verbose = options.verbose, this.lastGenerator = options.lastGenerator, this.force = options.force, this.quiet = options.quiet;
    this.rootPrefix = getParentPath(this.root);
  }

  Generator.prototype.generateHelper = function(arg1) {
    var code, name;
    name = arg1.name, code = arg1.code;
    if (this.pretend) {
      this.log("\ngenerated: " + (this.getRelativePath(name).yellow));
      this.log(indent(code.green));
    }
    return this.generatedFiles[name] = code;
  };

  Generator.prototype.getRelativePath = function(path) {
    if (path == null) {
      path = this.root;
    }
    return getRelativePath(this.rootPrefix, path);
  };

  Generator.prototype.writeFiles = function() {
    var code, filesTotal, filesWritten, name, promises;
    filesWritten = 0;
    filesTotal = 0;
    promises = (function() {
      var ref2, results;
      ref2 = this.generatedFiles;
      results = [];
      for (name in ref2) {
        code = ref2[name];
        results.push((function(_this) {
          return function(name, code) {
            var p, ref3;
            filesTotal++;
            if (((ref3 = _this.lastGenerator) != null ? ref3.generatedFiles[name] : void 0) === code) {
              if (_this.verbose) {
                return _this.log(("no change: " + (_this.getRelativePath(name))).grey);
              }
            } else {
              p = fsp.existsSync(name) ? fsp.readFile(name, 'utf8') : Promise.resolve(null);
              return p.then(function(currentContents) {
                if (_this.force || currentContents !== code) {
                  filesWritten++;
                  _this.log("writing: " + (_this.getRelativePath(name).yellow));
                  return fsp.writeFile(name, code);
                }
              }, function(error) {
                return _this.log(("error reading " + (_this.getRelativePath(name))).red, error);
              });
            }
          };
        })(this)(name, code));
      }
      return results;
    }).call(this);
    return Promise.all(promises).then((function(_this) {
      return function() {
        if (filesWritten < filesTotal) {
          _this.log((filesTotal - filesWritten) + "/" + filesTotal + " files current");
        }
        if (filesWritten > 0) {
          return _this.log(filesWritten + "/" + filesTotal + " files " + (_this.lastGenerator ? 'changed' : 'written'));
        }
      };
    })(this));
  };

  Generator.prototype.generateFiles = function(namespaces) {
    var namespace, namespacePath, path, results;
    this.generatedFiles = {};
    results = [];
    for (namespacePath in namespaces) {
      namespace = namespaces[namespacePath];
      path = namespace.path;
      this.generateHelper({
        name: path + "/namespace.coffee",
        code: NamespaceGenerator.generate(namespace, this.getRelativePath(path))
      });
      results.push(this.generateHelper({
        name: path + "/index.coffee",
        code: IndexGenerator.generate(namespace, this.getRelativePath(path))
      }));
    }
    return results;
  };

  Generator.prototype.showNamespaceStructure = function(namespaces) {
    var i, len, moduleName, namespacePath, ref2, results;
    this.log("generating namespace structure:");
    this.log("  Neptune".yellow);
    ref2 = Object.keys(namespaces).sort();
    results = [];
    for (i = 0, len = ref2.length; i < len; i++) {
      namespacePath = ref2[i];
      this.log(("  " + namespacePath).yellow);
      results.push((function() {
        var j, len1, ref3, results1;
        ref3 = namespaces[namespacePath].getModuleNames();
        results1 = [];
        for (j = 0, len1 = ref3.length; j < len1; j++) {
          moduleName = ref3[j];
          results1.push(this.log(("    " + moduleName).grey));
        }
        return results1;
      }).call(this));
    }
    return results;
  };


  /*
  Input is a list of files with fill paths
   */

  Generator.prototype.generateFromFiles = function(files) {
    var namespaces, nss;
    namespaces = (nss = new NamespaceStructure({
      root: this.root,
      files: files
    })).namespaces;
    if (this.verbose) {
      this.showNamespaceStructure(namespaces);
    }
    this.generateFiles(namespaces);
    if (this.pretend) {
      return Promise.resolve({
        generatedFiles: this.generatedFiles,
        namespaces: namespaces
      });
    } else {
      return this.writeFiles();
    }
  };

  Generator.prototype.generate = function() {
    if (this.verbose) {
      this.log("\nscanning root: " + this.root.yellow);
    }
    return glob(this.root + "/**/*.{js,coffee,caffeine,caf}", {
      dot: true
    }).then((function(_this) {
      return function(files) {
        var error;
        if (files.length === 0) {
          error = "no .coffee files found";
          return _this.log(error.yellow.bold);
        } else {
          return _this.generateFromFiles(files);
        }
      };
    })(this));
  };

  return Generator;

})();


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(5);


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var NamespaceGenerator, alignColumns, compactFlatten, generatedByString, getRelativePath, log, max, neptuneBaseClass, pad, ref, ref1, requirePath;

ref = __webpack_require__(0), compactFlatten = ref.compactFlatten, log = ref.log, getRelativePath = ref.getRelativePath, pad = ref.pad;

ref1 = __webpack_require__(2), generatedByString = ref1.generatedByString, neptuneBaseClass = ref1.neptuneBaseClass, requirePath = ref1.requirePath;

max = Math.max;

alignColumns = function() {
  var cell, el, i, j, k, l, len, len1, len2, len3, line, listOfLists, m, maxLengths, paddedCells, results;
  listOfLists = [];
  for (j = 0, len = arguments.length; j < len; j++) {
    el = arguments[j];
    listOfLists = listOfLists.concat(el);
  }
  maxLengths = [];
  for (k = 0, len1 = listOfLists.length; k < len1; k++) {
    line = listOfLists[k];
    for (i = l = 0, len2 = line.length; l < len2; i = ++l) {
      cell = line[i];
      maxLengths[i] = max(maxLengths[i] || 0, cell.length);
    }
  }
  maxLengths[maxLengths - 1] = 0;
  results = [];
  for (m = 0, len3 = listOfLists.length; m < len3; m++) {
    line = listOfLists[m];
    paddedCells = (function() {
      var len4, n, results1;
      results1 = [];
      for (i = n = 0, len4 = line.length; n < len4; i = ++n) {
        cell = line[i];
        results1.push(pad(cell, maxLengths[i]));
      }
      return results1;
    })();
    results.push(paddedCells.join(' '));
  }
  return results;
};

module.exports = NamespaceGenerator = (function() {
  function NamespaceGenerator() {}

  NamespaceGenerator.generate = function(namespace, relativeFilePath) {
    var contents, generateNamespacedList, includeInNamespace, modules, name, path;
    path = namespace.path, includeInNamespace = namespace.includeInNamespace;
    generateNamespacedList = function(set) {
      var item, items, j, len, namespaceName, ref2, results;
      items = (function() {
        var ref2, results;
        ref2 = set.namespaced;
        results = [];
        for (namespaceName in ref2) {
          path = ref2[namespaceName];
          results.push({
            namespaceName: namespaceName,
            path: path
          });
        }
        return results;
      })();
      ref2 = items.sort(function(a, b) {
        return a.path.localeCompare(b.path);
      });
      results = [];
      for (j = 0, len = ref2.length; j < len; j++) {
        item = ref2[j];
        results.push([" ", item.namespaceName + ":", "require '" + (requirePath(item.path)) + "'"]);
      }
      return results;
    };
    modules = generateNamespacedList(namespace.fileSet);
    contents = compactFlatten([
      generatedByString, "# file: " + (relativeFilePath || path) + "/index.coffee", "", (function() {
        var j, len, ref2, results;
        ref2 = namespace.getAllNonNamespacedRequires();
        results = [];
        for (j = 0, len = ref2.length; j < len; j++) {
          name = ref2[j];
          results.push("require '" + (requirePath(name)) + "'");
        }
        return results;
      })(), "module.exports = require './namespace'", "module.exports", includeInNamespace && (".includeInNamespace require '" + (requirePath(includeInNamespace)) + "'"), modules.length > 0 ? ".addModules" : void 0, alignColumns(modules), (function() {
        var j, len, ref2, results;
        ref2 = namespace.getAllNamespacedSubdirRequires();
        results = [];
        for (j = 0, len = ref2.length; j < len; j++) {
          name = ref2[j];
          results.push("require './" + name + "'");
        }
        return results;
      })()
    ]);
    return contents.join("\n");
  };

  return NamespaceGenerator;

})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var NamespaceGenerator, PackageNamespaceClassName, generatedByString, isPathedNamespace, neptuneBaseClass, peek, ref, requirePath;

ref = __webpack_require__(2), generatedByString = ref.generatedByString, neptuneBaseClass = ref.neptuneBaseClass, PackageNamespaceClassName = ref.PackageNamespaceClassName, requirePath = ref.requirePath;

peek = __webpack_require__(0).peek;

isPathedNamespace = Neptune.isPathedNamespace;

module.exports = NamespaceGenerator = (function() {
  function NamespaceGenerator() {}

  NamespaceGenerator.generate = function(namespace, relativeFilePath) {
    var a, className, isPathNamespace, meat, name, namespaceName, parent, parentNamespaceName, parentNamespacePath, path, requireParent;
    parent = namespace.parent, path = namespace.path, namespaceName = namespace.namespaceName, isPathNamespace = namespace.isPathNamespace;
    className = isPathedNamespace(namespaceName) ? peek(namespaceName.split('.')) : namespaceName;
    parentNamespaceName = parent.namespaceName;
    parentNamespacePath = parent.parent ? "../namespace" : parent.path;
    requireParent = "(require '" + parentNamespacePath + "')";
    meat = isPathNamespace ? requireParent + ".vivifiySubnamespace '" + namespaceName + "'" : requireParent + ".addNamespace('" + namespaceName + "', class " + className + " extends " + PackageNamespaceClassName + ")";
    return generatedByString + "\n# file: " + (relativeFilePath || path) + "/namespace.coffee\n\nmodule.exports = " + meat + "\n" + (a = (function() {
      var i, len, ref1, results;
      ref1 = namespace.getAllNamespacedSubdirRequires();
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        name = ref1[i];
        results.push("require './" + name + "/namespace'");
      }
      return results;
    })(), a.join(";\n"));
  };

  return NamespaceGenerator;

})();


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

module.exports.addModules({
  IndexGenerator: __webpack_require__(9),
  NamespaceGenerator: __webpack_require__(10)
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Namespace, NamespaceDir, NamespaceSet, NamespaceStructure, arrayWithoutLast, basename, fileWithoutExtension, globalNamespaceName, isPathedNamespace, log, merge, normalizeNamespaceName, peek, pushIfUnique, ref, ref1, shouldIgnore, shouldIncludeInNamespace, shouldNotNamespace, toFilename, toModuleName, upperCamelCase,
  slice = [].slice;

ref = __webpack_require__(0), upperCamelCase = ref.upperCamelCase, peek = ref.peek, pushIfUnique = ref.pushIfUnique, log = ref.log, merge = ref.merge, arrayWithoutLast = ref.arrayWithoutLast, fileWithoutExtension = ref.fileWithoutExtension;

ref1 = __webpack_require__(2), globalNamespaceName = ref1.globalNamespaceName, shouldIgnore = ref1.shouldIgnore, shouldNotNamespace = ref1.shouldNotNamespace, shouldIncludeInNamespace = ref1.shouldIncludeInNamespace, toFilename = ref1.toFilename, toModuleName = ref1.toModuleName;

basename = __webpack_require__(1).basename;

isPathedNamespace = Neptune.isPathedNamespace;

NamespaceSet = (function() {
  function NamespaceSet(items) {
    var i, item, len;
    this.ignored = [];
    this.notNamespaced = [];
    this.namespaced = {};
    if (items) {
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        this.addItem(item);
      }
      this.length = items.length;
    }
  }

  NamespaceSet.prototype.containsNormalizedItemName = function(itemName) {
    return !!this.namespaced[toModuleName(itemName)];
  };

  NamespaceSet.prototype.addItem = function(item) {
    var itemName;
    itemName = peek(item.split('/'));
    if (shouldIgnore(itemName)) {
      return this.ignored.push("" + (basename(item)));
    }
    if (shouldNotNamespace(itemName)) {
      return this.notNamespaced.push("" + (basename(item)));
    }
    return this.namespaced[toModuleName(itemName)] = item;
  };

  NamespaceSet.prototype.getInspectedObjects = function() {
    var out;
    out = {};
    if (Object.keys(this.namespaced).length > 0) {
      out.namespaced = this.namespaced;
    }
    if (this.notNamespaced.length > 0) {
      out.notNamespaced = this.notNamespaced;
    }
    if (this.ignored.length > 0) {
      out.ignored = this.ignored;
    }
    return out;
  };

  return NamespaceSet;

})();

Namespace = (function() {
  function Namespace(arg) {
    this.namespaceName = arg.namespaceName, this.path = arg.path, this.namespacePath = arg.namespacePath, this.files = arg.files, this.subdirs = arg.subdirs, this.parent = arg.parent, this.includeInNamespace = arg.includeInNamespace;
    this.fileSet = new NamespaceSet(this.files);
    this.subdirSet = new NamespaceSet(this.subdirs);
    this.isPathNamespace = this.fileSet.length === 0 && this.subdirSet.length <= 1;
  }

  Namespace.prototype.getInspectedObjects = function() {
    var out, ref2, ref3;
    out = {
      namespaceName: this.namespaceName,
      namespacePath: this.namespacePath,
      path: this.path
    };
    if (this.includeInNamespace) {
      out.includeInNamespace = this.includeInNamespace;
    }
    if (this.parent) {
      out.parentNamespacePath = this.parent.namespacePath;
    }
    if (((ref2 = this.files) != null ? ref2.length : void 0) > 0) {
      out.files = this.fileSet.getInspectedObjects();
    }
    if (((ref3 = this.subdirs) != null ? ref3.length : void 0) > 0) {
      out.subdirs = this.subdirSet.getInspectedObjects();
    }
    return out;
  };

  Namespace.prototype.getModuleNames = function() {
    return Object.keys(this.fileSet.namespaced).sort();
  };

  Namespace.prototype.getAllNonNamespacedRequires = function() {
    var out, v;
    out = [];
    this.fileSet && ((function() {
      var i, len, ref2, results;
      ref2 = this.fileSet.notNamespaced;
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        v = ref2[i];
        results.push(out.push(v));
      }
      return results;
    }).call(this));
    this.subdirSet && ((function() {
      var i, len, ref2, results;
      ref2 = this.subdirSet.notNamespaced;
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        v = ref2[i];
        results.push(out.push(v));
      }
      return results;
    }).call(this));
    return out.sort();
  };

  Namespace.prototype.getAllNamespacedSubdirRequires = function() {
    var k, out, ref2, v;
    out = [];
    if (this.subdirSet) {
      ref2 = this.subdirSet.namespaced;
      for (k in ref2) {
        v = ref2[k];
        if (!this.fileSet.containsNormalizedItemName(k)) {
          out.push(v);
        }
      }
    }
    return out.sort();
  };

  return Namespace;

})();

normalizeNamespaceName = function(name) {
  var part, parts;
  if (isPathedNamespace(name)) {
    parts = (function() {
      var i, len, ref2, results;
      ref2 = name.split('.');
      results = [];
      for (i = 0, len = ref2.length; i < len; i++) {
        part = ref2[i];
        if (part.length > 0) {
          results.push(upperCamelCase(part));
        }
      }
      return results;
    })();
    return parts.join('.');
  } else {
    return upperCamelCase(name);
  }
};

NamespaceDir = (function() {
  function NamespaceDir(arg) {
    var namespaceName, parent;
    namespaceName = arg.namespaceName, this.path = arg.path, parent = arg.parent;
    this.files = [];
    this.subdirs = [];
    this.namespaceName = normalizeNamespaceName(namespaceName);
    this.namespacePath = ((parent != null ? parent.namespacePath : void 0) || globalNamespaceName) + "." + this.namespaceName;
  }

  NamespaceDir.prototype.addFile = function(file) {
    return file && (shouldIncludeInNamespace(file, this.namespaceName) ? this.includeInNamespace = file : pushIfUnique(this.files, file));
  };

  NamespaceDir.prototype.addSubdir = function(subdir) {
    return subdir && pushIfUnique(this.subdirs, subdir);
  };

  return NamespaceDir;

})();

module.exports = NamespaceStructure = (function() {
  NamespaceStructure.shouldIgnore = shouldIgnore;

  NamespaceStructure.shouldNotNamespace = shouldNotNamespace;

  function NamespaceStructure(arg) {
    var file, i, len, ref2;
    this.root = arg.root, this.files = arg.files;
    this._dirs = {};
    ref2 = this.files;
    for (i = 0, len = ref2.length; i < len; i++) {
      file = ref2[i];
      this._addSourcePathArrayAndFile({
        file: file
      });
    }
    this.namespaces = this._generateNamespaces(this._dirs);
  }

  NamespaceStructure.prototype.getInspectedObjects = function() {
    var k, namespace, out, ref2;
    out = {};
    ref2 = this.namespaces;
    for (k in ref2) {
      namespace = ref2[k];
      out[k] = namespace.getInspectedObjects();
    }
    return out;
  };

  NamespaceStructure.prototype._addSourcePathArrayAndFile = function(arg) {
    var base, dir, file, i, j, namespaceName, namespacePath, path, pathArray, ref2, subdir;
    pathArray = arg.pathArray, file = arg.file, subdir = arg.subdir;
    if (!pathArray) {
      ref2 = file.split("/"), pathArray = 2 <= ref2.length ? slice.call(ref2, 0, i = ref2.length - 1) : (i = 0, []), file = ref2[i++];
    }
    path = pathArray.join('/');
    namespacePath = 2 <= pathArray.length ? slice.call(pathArray, 0, j = pathArray.length - 1) : (j = 0, []), namespaceName = pathArray[j++];
    dir = (base = this._dirs)[path] || (base[path] = new NamespaceDir({
      namespaceName: namespaceName,
      path: path,
      parent: this.root !== path ? this._addSourcePathArrayAndFile({
        pathArray: namespacePath,
        subdir: namespaceName
      }) : void 0
    }));
    dir.addFile(file);
    dir.addSubdir(subdir);
    return dir;
  };

  NamespaceStructure.prototype._generateNamespaces = function(dirs) {
    var globalNamespace, info, name, namespace, namespacePath, namespaces, parentNamespacePath;
    namespaces = {};
    globalNamespace = new Namespace({
      namespaceName: globalNamespaceName,
      path: 'neptune-namespaces',
      namespacePath: globalNamespaceName
    });
    for (name in dirs) {
      info = dirs[name];
      namespaces[info.namespacePath] = new Namespace(info);
    }
    for (namespacePath in namespaces) {
      namespace = namespaces[namespacePath];
      parentNamespacePath = arrayWithoutLast(namespacePath.split('.')).join('.');
      namespace.parent = namespaces[parentNamespacePath] || globalNamespace;
    }
    return namespaces;
  };

  return NamespaceStructure;

})();


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Generation,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(18)).addNamespace('Generation', Generation = (function(superClass) {
  extend(Generation, superClass);

  function Generation() {
    return Generation.__super__.constructor.apply(this, arguments);
  }

  return Generation;

})(Neptune.PackageNamespace));

__webpack_require__(3);


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = {
	"author": "Shane Brinkman-Davis Delamore, Imikimi LLC",
	"bin": {
		"neptune-namespaces": "./nn",
		"nn": "./nn"
	},
	"dependencies": {
		"art-build-configurator": "*",
		"art-class-system": "*",
		"art-config": "*",
		"art-standard-lib": "*",
		"art-testbench": "*",
		"bluebird": "^3.5.0",
		"caffeine-script": "*",
		"caffeine-script-runtime": "*",
		"case-sensitive-paths-webpack-plugin": "^2.1.1",
		"chai": "^4.0.1",
		"coffee-loader": "^0.7.3",
		"coffee-script": "^1.12.6",
		"colors": "^1.1.2",
		"commander": "^2.9.0",
		"css-loader": "^0.28.4",
		"dateformat": "^2.0.0",
		"detect-node": "^2.0.3",
		"fs-extra": "^3.0.1",
		"glob": "^7.1.2",
		"glob-promise": "^3.1.0",
		"json-loader": "^0.5.4",
		"mocha": "^3.4.2",
		"neptune-namespaces": "*",
		"neptune-namespaces-runtime": "*",
		"script-loader": "^0.7.0",
		"style-loader": "^0.18.1",
		"webpack": "^2.6.1",
		"webpack-dev-server": "^2.4.5",
		"webpack-merge": "^4.1.0",
		"webpack-node-externals": "^1.6.0"
	},
	"description": "Generate index.coffee and namespace.coffee files from directory structures",
	"license": "ISC",
	"name": "neptune-namespaces",
	"scripts": {
		"build": "webpack --progress",
		"start": "webpack-dev-server --hot --inline --progress",
		"test": "nn -s;mocha -u tdd --compilers coffee:coffee-script/register",
		"testInBrowser": "webpack-dev-server --progress"
	},
	"version": "3.1.0"
};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib/Core");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("glob-promise");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ })
/******/ ]);