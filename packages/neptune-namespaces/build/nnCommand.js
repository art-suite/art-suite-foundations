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
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/*!************************************************!*\
  !*** ./source/NeptuneNamespaces/Generator.caf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "getPackageRoot",
      "Path",
      "console",
      "upperCamelCase",
      "fsp",
      "glob",
      "promiseSequence",
      "merge",
      "log",
      "Object",
      "normalizeDirectory",
      "IndexJsGenerator",
      "IndexGenerator",
      "NamespaceJsGenerator",
      "NamespaceGenerator",
      "NamespaceStructure",
      "Promise",
      "getRelativePath",
      "process",
      "indent",
      "generatedByStringBare",
      "String",
      "Error",
      "getParentPath"
    ],
    [
      global,
      __webpack_require__(/*! ./StandardImport */ 6),
      __webpack_require__(/*! ./Generators */ 15),
      __webpack_require__(/*! ./PackageRoot */ 23),
      { NamespaceStructure: __webpack_require__(/*! ./NamespaceStructure */ 24) }
    ],
    (
      getPackageRoot,
      Path,
      console,
      upperCamelCase,
      fsp,
      glob,
      promiseSequence,
      merge,
      log,
      Object,
      normalizeDirectory,
      IndexJsGenerator,
      IndexGenerator,
      NamespaceJsGenerator,
      NamespaceGenerator,
      NamespaceStructure,
      Promise,
      getRelativePath,
      process,
      indent,
      generatedByStringBare,
      String,
      Error,
      getParentPath
    ) => {
      let Generator;
      return (Generator = Caf.defClass(
        class Generator extends Object {
          constructor(root, options) {
            super(...arguments);
            this.root = root;
            if (!Caf.is(this.root, String)) {
              throw new Error("root required");
            }
            if (options) {
              Caf.each2(
                [
                  "pretend",
                  "verbose",
                  "lastGenerator",
                  "force",
                  "quiet",
                  "js",
                  "cleanup"
                ],
                option => (this[option] = options[option])
              );
            }
            this.js = this.cleanup = true;
            console.log(
              `Using @js=${Caf.toString(!!this.js)} and @cleanup=${Caf.toString(
                !!this.cleanup
              )}!!!`
            );
            this.versionFile = this.constructor.findVersionFile(this.root);
            this.rootPrefix = getParentPath(this.root);
          }
        },
        function(Generator, classSuper, instanceSuper) {
          this.standardRoots = ["source", "test", "performance", "src", "perf"];
          this.generatedFilenameRegexp = /(^|\/)(namespace|index)\.(coffee|js)$/;
          this.extensions = ["js", "coffee", "caffeine", "caf"];
          this.findVersionFile = function(path) {
            let packageRoot;
            return (packageRoot = getPackageRoot(path))
              ? Path.join(packageRoot, "package.json")
              : undefined;
          };
          this.infoLog = function(root, ...args) {
            root = Path.basename(root);
            args = args.join();
            args = args.split("\n");
            return Caf.each2(args, arg =>
              console.log(
                arg === ""
                  ? ""
                  : `Neptune.${Caf.toString(upperCamelCase(root))}: `.grey + arg
              )
            );
          };
          this.watch = function(root, options = {}) {
            let generator;
            this.infoLog(root, "watching...".green);
            generator = null;
            return fsp.watch(
              root,
              { persistent: options.persistent, recursive: true },
              (event, filename) =>
                event !== "change" &&
                !filename.match(this.generatedFilenameRegexp)
                  ? (this.infoLog(
                      root,
                      `watch event: ".bold.yellow + "${Caf.toString(
                        event
                      )} ${Caf.toString(filename.yellow)}`
                    ),
                    generator ? (options.lastGenerator = generator) : undefined,
                    (generator = new Generator(root, options)),
                    generator.generate())
                  : undefined
            );
          };
          this.generate = function(globRoot, options = {}) {
            let Klass;
            Klass = this;
            return glob(globRoot).then(roots =>
              promiseSequence(
                Caf.array(
                  roots,
                  root => () => {
                    let generator;
                    generator = new Klass(root, options);
                    return generator
                      .generate()
                      .then(() =>
                        options.watch
                          ? Generator.watch(
                              root,
                              merge(options, { lastGenerator: generator })
                            )
                          : undefined
                      )
                      .catch(error => log(error.stack));
                  },
                  root => fsp.statSync(root).isDirectory()
                )
              )
            );
          };
          this.prototype.infoLog = function(...args) {
            return !this.quiet
              ? this.constructor.infoLog(this._getRelativePath(), args.join())
              : undefined;
          };
          this.prototype.verboseLog = function(...args) {
            return this.verbose ? this.infoLog(...args) : undefined;
          };
          this.prototype.warningLog = function(...args) {
            return this.verbose ? this.infoLog(...args) : undefined;
          };
          this.prototype.generate = function() {
            let extensions;
            extensions = this.constructor.extensions;
            this.verboseLog(
              `\nscanning root: ${Caf.toString(this.root.yellow)}`
            );
            return glob(
              `${Caf.toString(this.root)}/**/*.{${Caf.toString(
                extensions.join(",")
              )}}`,
              { dot: true }
            ).then(files =>
              files.length === 0
                ? this.warningLog(
                    `no .${Caf.toString(extensions.join(", ."))} files found`
                  )
                : this.generateFromFiles(files)
            );
          };
          this.prototype.showNamespaceStructure = function(namespaces) {
            this.infoLog("generating namespace structure:");
            this.infoLog("  Neptune".yellow);
            return Caf.each2(Object.keys(namespaces).sort(), namespacePath => {
              this.infoLog(`  ${Caf.toString(namespacePath)}`.yellow);
              return Caf.each2(
                namespaces[namespacePath].getModuleNames(),
                moduleName =>
                  this.infoLog(`    ${Caf.toString(moduleName)}`.grey)
              );
            });
          };
          this.prototype.generateFiles = function(namespaces) {
            this.generatedFiles = {};
            return Caf.each2(namespaces, (namespace, namespacePath) => {
              let path, relativePath, relativeVersionFile;
              ({ path } = namespace);
              relativePath = this._getRelativePath(path);
              if (this.versionFile) {
                relativeVersionFile = Path.relative(
                  normalizeDirectory(path),
                  this.versionFile
                );
              }
              this._generateHelper({
                relativePath,
                path,
                name: "namespace",
                code: this.getNamespaceGenerator().generate(
                  namespace,
                  relativeVersionFile
                )
              });
              return this._generateHelper({
                relativePath,
                path,
                name: "index",
                code: this.getIndexGenerator().generate(namespace)
              });
            });
          };
          this.prototype.getIndexGenerator = function() {
            return this.js ? IndexJsGenerator : IndexGenerator;
          };
          this.prototype.getNamespaceGenerator = function() {
            return this.js ? NamespaceJsGenerator : NamespaceGenerator;
          };
          this.prototype.generateFromFiles = function(files) {
            let namespaces;
            if (this.cleanup) {
              this._cleanup(files);
            }
            ({ namespaces } = new NamespaceStructure({
              root: this.root,
              files
            }));
            if (this.verbose) {
              this.showNamespaceStructure(namespaces);
            }
            this.generateFiles(namespaces);
            return this.pretend
              ? Promise.resolve({
                  generatedFiles: this.generatedFiles,
                  namespaces
                })
              : this._writeFiles();
          };
          this.prototype._cleanup = function(files) {
            let regex;
            regex = RegExp(
              `(\$|\\/)(index|namespace).${Caf.toString(
                this.js ? "coffee" : "js"
              )}\$`
            );
            return Caf.each2(
              files,
              file => {
                let contents;
                contents = fsp.readFileSync(file).toString();
                return /generated by neptune namespaces/i.test(contents)
                  ? (log(`rm ${Caf.toString(file)}`), fsp.unlinkSync(file))
                  : undefined;
              },
              file => regex.test(file)
            );
          };
          this.prototype._writeFiles = function() {
            let filesWritten, filesTotal;
            filesWritten = 0;
            filesTotal = 0;
            return Promise.all(
              Caf.array(this.generatedFiles, (code, name) => {
                let logFileString, base;
                filesTotal++;
                logFileString = this._getLogFileString(name);
                return (Caf.exists((base = this.lastGenerator)) &&
                  base.generatedFiles[name]) === code
                  ? this.verbose
                    ? this.infoLog(
                        `no change: ${Caf.toString(logFileString)}`.grey
                      )
                    : undefined
                  : Promise.resolve(
                      fsp.existsSync(name)
                        ? fsp.readFile(name, "utf8")
                        : undefined
                    )
                      .then(currentContents =>
                        this.force || currentContents !== code
                          ? (filesWritten++,
                            this.infoLog(
                              `writing: ${Caf.toString(logFileString.yellow)}`
                            ),
                            fsp.writeFile(name, code))
                          : undefined
                      )
                      .catch(error =>
                        this.infoLog(
                          `error reading ${Caf.toString(logFileString)}`.red,
                          error
                        )
                      );
              })
            ).then(() => {
              if (filesWritten < filesTotal) {
                this.infoLog(
                  `${Caf.toString(filesTotal - filesWritten)}/${Caf.toString(
                    filesTotal
                  )} files current`
                );
              }
              return filesWritten > 0
                ? this.infoLog(
                    `${Caf.toString(filesWritten)}/${Caf.toString(
                      filesTotal
                    )} files ${Caf.toString(
                      this.lastGenerator ? "changed" : "written"
                    )}`
                  )
                : undefined;
            });
          };
          this.prototype._getRelativePath = function(path = this.root) {
            return getRelativePath(this.rootPrefix, path);
          };
          this.prototype._getLogFileString = function(file) {
            return getRelativePath(process.cwd(), file);
          };
          this.prototype._generateHelper = function({
            path,
            relativePath,
            name,
            code
          }) {
            let commentStart;
            name += this.js ? ".js" : ".coffee";
            if (this.pretend) {
              this.infoLog(
                `\ngenerated: ${Caf.toString(
                  this._getLogFileString(name).yellow
                )}`
              );
              this.infoLog(indent(code.green));
            }
            commentStart = this.js ? "//" : "#";
            code = `${Caf.toString(commentStart)} ${Caf.toString(
              generatedByStringBare
            )}\n${Caf.toString(commentStart)} file: ${Caf.toString(
              relativePath
            )}/${Caf.toString(name)}\n\n${Caf.toString(code)}`;
            return (this.generatedFiles[
              `${Caf.toString(path)}/${Caf.toString(name)}`
            ] = code);
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 4 */
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
/* 5 */
/*!******************************************************************************************!*\
  !*** external "require('caffeine-script-runtime' /* ABC - not inlining fellow NPM *_/)" ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('caffeine-script-runtime' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 6 */
/*!*****************************************************!*\
  !*** ./source/NeptuneNamespaces/StandardImport.caf ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  let out;
  out = {
    glob: __webpack_require__(/*! glob-promise */ 7),
    fsp: __webpack_require__(/*! fs-extra */ 8),
    Path: __webpack_require__(/*! path */ 9)
  };
  Caf.object(__webpack_require__(/*! ./Helper */ 10), null, null, out);
  Caf.object(__webpack_require__(/*! ./MiniFoundation */ 12), null, null, out);
  return out;
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 7 */
/*!*******************************************************************************!*\
  !*** external "require('glob-promise' /* ABC - not inlining fellow NPM *_/)" ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('glob-promise' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** external "require('fs-extra' /* ABC - not inlining fellow NPM *_/)" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('fs-extra' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 9 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 10 */
/*!************************************************!*\
  !*** ./source/NeptuneNamespaces/Helper.coffee ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Helper, Path, arrayWithoutLast, fileWithoutExtension, log, max, pad, peek, ref, upperCamelCase, version;

version = __webpack_require__(/*! ../../package.json */ 11).version;

ref = __webpack_require__(/*! ./MiniFoundation */ 12), log = ref.log, upperCamelCase = ref.upperCamelCase, fileWithoutExtension = ref.fileWithoutExtension, peek = ref.peek, arrayWithoutLast = ref.arrayWithoutLast, pad = ref.pad;

Path = __webpack_require__(/*! path */ 9);

max = Math.max;

module.exports = Helper = (function() {
  var toModuleName;

  function Helper() {}

  Helper.generatedByStringBare = "generated by Neptune Namespaces v" + version[0] + ".x.x";

  Helper.generatedByString = "# " + Helper.generatedByStringBare;

  Helper.globalNamespaceName = "Neptune";

  Helper.neptuneBaseClass = Helper.globalNamespaceName + ".Namespace";

  Helper.PackageNamespaceClassName = Helper.globalNamespaceName + ".PackageNamespace";

  Helper.shouldNotAutoload = function(itemName) {
    return !!itemName.match(/^([\._].*|(index|namespace)\.(coffee|js))$/);
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

  Helper.alignColumns = function() {
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
        maxLengths[i] = i === line.length - 1 ? cell : max(maxLengths[i] || 0, cell.length);
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

  return Helper;

})();


/***/ }),
/* 11 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bin, dependencies, description, license, name, scripts, version, default */
/***/ (function(module) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC\"","bin":{"neptune-namespaces":"./nn","nn":"./nn"},"dependencies":{"art-build-configurator":"*","neptune-namespaces-runtime":"*"},"description":"Generate index.coffee and namespace.coffee files from directory structures","license":"ISC","name":"neptune-namespaces","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress --env.devServer","test":"nn -s;mocha -u tdd","testInBrowser":"webpack-dev-server --progress --env.devServer"},"version":"3.4.2"};

/***/ }),
/* 12 */
/*!********************************************************!*\
  !*** ./source/NeptuneNamespaces/MiniFoundation.coffee ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var MiniFoundation, Path, colors,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

colors = __webpack_require__(/*! colors */ 13);

Path = __webpack_require__(/*! path */ 9);

module.exports = MiniFoundation = (function() {
  var compactFlatten, escapeJavascriptString, formattedInspect, isFunction, isPlainArray, isPlainObject, isString, k, log, normalizeDirectory, ref, ref1, v;

  function MiniFoundation() {}

  if (v !== "Core") {
    ref = __webpack_require__(/*! art-standard-lib/Core */ 14);
    for (k in ref) {
      v = ref[k];
      MiniFoundation[k] = v;
    }
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

  MiniFoundation.normalizeDirectory = normalizeDirectory = function(directory) {
    return Path.normalize(Path.isAbsolute(directory) ? directory : Path.join(process.cwd(), directory));
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
/* 13 */
/*!*************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 14 */
/*!****************************************************************************************!*\
  !*** external "require('art-standard-lib/Core' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib/Core' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 15 */
/*!******************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v3.x.x
// file: NeptuneNamespaces/Generators/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 16))

.addModules({
  IndexGenerator:       __webpack_require__(/*! ./IndexGenerator */ 19),
  IndexJsGenerator:     __webpack_require__(/*! ./IndexJsGenerator */ 20),
  NamespaceGenerator:   __webpack_require__(/*! ./NamespaceGenerator */ 21),
  NamespaceJsGenerator: __webpack_require__(/*! ./NamespaceJsGenerator */ 22)
});

/***/ }),
/* 16 */
/*!**********************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/namespace.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v3.x.x
// file: NeptuneNamespaces/Generators/namespace.js

module.exports = __webpack_require__(/*! ../namespace */ 17).addNamespace(
  'Generators',
  class Generators extends Neptune.PackageNamespace {}
);


/***/ }),
/* 17 */
/*!***********************************************!*\
  !*** ./source/NeptuneNamespaces/namespace.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v3.x.x
// file: NeptuneNamespaces/namespace.js

module.exports = __webpack_require__(/*! neptune-namespaces */ 18).addNamespace(
  'NeptuneNamespaces',
  (class NeptuneNamespaces extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../package.json */ 11))
);
__webpack_require__(/*! ./Generators/namespace */ 16);

/***/ }),
/* 18 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 19 */
/*!****************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/IndexGenerator.caf ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "requirePath", "alignColumns"],
    [global, __webpack_require__(/*! ../StandardImport */ 6)],
    (compactFlatten, requirePath, alignColumns) => {
      let IndexGenerator;
      return (IndexGenerator = Caf.defClass(
        class IndexGenerator extends Object {},
        function(IndexGenerator, classSuper, instanceSuper) {
          this.generate = function(namespace) {
            let includeInNamespace, generateNamespacedList, modules;
            ({ includeInNamespace } = namespace);
            generateNamespacedList = set =>
              Caf.array(
                Caf.array(set.namespaced, (path, namespaceName) => {
                  return { namespaceName, path };
                }).sort((a, b) => a.path.localeCompare(b.path)),
                item => [
                  " ",
                  item.namespaceName + ":",
                  `require '${Caf.toString(requirePath(item.path))}'`
                ]
              );
            modules = generateNamespacedList(namespace.fileSet);
            return compactFlatten([
              Caf.array(
                namespace.getAllNonNamespacedRequires(),
                name => `require '${Caf.toString(requirePath(name))}'`
              ),
              "module.exports = require './namespace'",
              includeInNamespace || modules.length > 0
                ? "module.exports"
                : undefined,
              includeInNamespace &&
                `.includeInNamespace require '${Caf.toString(
                  requirePath(includeInNamespace)
                )}'`,
              modules.length > 0 ? ".addModules" : undefined,
              alignColumns(modules),
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require './${Caf.toString(name)}'`
              )
            ]).join("\n");
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 20 */
/*!******************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/IndexJsGenerator.caf ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "requirePath", "alignColumns"],
    [global, __webpack_require__(/*! ../StandardImport */ 6)],
    (compactFlatten, requirePath, alignColumns) => {
      let IndexJsGenerator;
      return (IndexJsGenerator = Caf.defClass(
        class IndexJsGenerator extends Object {},
        function(IndexJsGenerator, classSuper, instanceSuper) {
          this.generate = function(namespace) {
            let includeInNamespace,
              generateNamespacedList,
              modules,
              setExportString;
            ({ includeInNamespace } = namespace);
            generateNamespacedList = set => {
              let list;
              return Caf.array(
                (list = Caf.array(set.namespaced, (path, namespaceName) => {
                  return { namespaceName, path };
                }).sort((a, b) => a.path.localeCompare(b.path))),
                (item, index) => [
                  " ",
                  item.namespaceName + ":",
                  `require('${Caf.toString(
                    requirePath(item.path)
                  )}')${Caf.toString(
                    index < list.length - 1 ? "," : undefined
                  )}`
                ]
              );
            };
            modules = generateNamespacedList(namespace.fileSet);
            setExportString = "module.exports = require('./namespace')";
            return compactFlatten([
              Caf.array(
                namespace.getAllNonNamespacedRequires(),
                name => `require('${Caf.toString(requirePath(name))}');`
              ),
              includeInNamespace || modules.length > 0
                ? `(${Caf.toString(setExportString)})\n${Caf.toString(
                    includeInNamespace
                      ? `.includeInNamespace(require('${Caf.toString(
                          requirePath(includeInNamespace)
                        )}'))`
                      : undefined
                  )}\n${Caf.toString(
                    modules.length > 0
                      ? `.addModules({\n${Caf.toString(
                          compactFlatten(alignColumns(modules)).join("\n")
                        )}\n})`
                      : undefined
                  )};`
                : `${Caf.toString(setExportString)};`,
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require('./${Caf.toString(name)}');`
              )
            ]).join("\n");
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 21 */
/*!********************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/NamespaceGenerator.caf ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isPathedNamespace", "peek", "PackageNamespaceClassName"],
    [global, __webpack_require__(/*! ../StandardImport */ 6)],
    (isPathedNamespace, peek, PackageNamespaceClassName) => {
      let NamespaceGenerator;
      return (NamespaceGenerator = Caf.defClass(
        class NamespaceGenerator extends Object {},
        function(NamespaceGenerator, classSuper, instanceSuper) {
          this.getClassName = function({ namespaceName }) {
            return isPathedNamespace(namespaceName)
              ? peek(namespaceName.split("."))
              : namespaceName;
          };
          this.getParentNamespacePath = function({ parent }) {
            let temp;
            return (temp = parent.parent && "../namespace") != null
              ? temp
              : parent.path;
          };
          this.generate = function(namespace, versionFile) {
            let namespaceName,
              isPathNamespace,
              className,
              parentNamespacePath,
              requireParent;
            namespaceName = namespace.namespaceName;
            isPathNamespace = namespace.isPathNamespace;
            className = this.getClassName(namespace);
            parentNamespacePath = this.getParentNamespacePath(namespace);
            requireParent = `(require '${Caf.toString(parentNamespacePath)}')`;
            return `module.exports = ${Caf.toString(
              (() => {
                switch (false) {
                  case !isPathNamespace:
                    return `${Caf.toString(
                      requireParent
                    )}.vivifySubnamespace '${Caf.toString(namespaceName)}'`;
                  case !(versionFile && namespace.getIsRootPackageNamespace()):
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace '${Caf.toString(
                      namespaceName
                    )}', class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(
                      PackageNamespaceClassName
                    )}\n  @version: require('${Caf.toString(
                      versionFile
                    )}').version`;
                  default:
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace('${Caf.toString(
                      namespaceName
                    )}', class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(PackageNamespaceClassName)})`;
                }
              })()
            )}\n${Caf.toString(
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require './${Caf.toString(name)}/namespace'`
              ).join(";\n")
            )}`;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 22 */
/*!**********************************************************************!*\
  !*** ./source/NeptuneNamespaces/Generators/NamespaceJsGenerator.caf ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 5);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["PackageNamespaceClassName"],
    [global, __webpack_require__(/*! ../StandardImport */ 6)],
    PackageNamespaceClassName => {
      let NamespaceJsGenerator;
      return (NamespaceJsGenerator = Caf.defClass(
        class NamespaceJsGenerator extends __webpack_require__(/*! ./NamespaceGenerator */ 21) {},
        function(NamespaceJsGenerator, classSuper, instanceSuper) {
          this.generate = function(namespace, versionFile) {
            let namespaceName,
              isPathNamespace,
              className,
              parentNamespacePath,
              requireParent;
            namespaceName = namespace.namespaceName;
            isPathNamespace = namespace.isPathNamespace;
            className = this.getClassName(namespace);
            parentNamespacePath = this.getParentNamespacePath(namespace);
            requireParent = `require('${Caf.toString(parentNamespacePath)}')`;
            return `module.exports = ${Caf.toString(
              (() => {
                switch (false) {
                  case !isPathNamespace:
                    return `module.exports =  ${Caf.toString(
                      requireParent
                    )}.vivifySubnamespace('${Caf.toString(namespaceName)}');`;
                  case !(versionFile && namespace.getIsRootPackageNamespace()):
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace(\n  '${Caf.toString(
                      namespaceName
                    )}',\n  (class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(
                      PackageNamespaceClassName
                    )} {})\n  ._configureNamespace(require('${Caf.toString(
                      versionFile
                    )}'))\n);`;
                  default:
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace(\n  '${Caf.toString(
                      namespaceName
                    )}',\n  class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(
                      PackageNamespaceClassName
                    )} {}\n);`;
                }
              })()
            )}\n${Caf.toString(
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require('./${Caf.toString(name)}/namespace');`
              ).join("\n")
            )}`;
          };
        }
      ));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ 4)(module)))

/***/ }),
/* 23 */
/*!*****************************************************!*\
  !*** ./source/NeptuneNamespaces/PackageRoot.coffee ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var PackageRoot, fs, normalizeDirectory, path;

path = __webpack_require__(/*! path */ 9);

fs = __webpack_require__(/*! fs-extra */ 8);

normalizeDirectory = __webpack_require__(/*! ./MiniFoundation */ 12).normalizeDirectory;

module.exports = PackageRoot = (function() {
  function PackageRoot() {}

  PackageRoot.getPackageRoot = function(directory) {
    return PackageRoot._findRootR(normalizeDirectory(directory));
  };

  PackageRoot._knownPackageRoots = {};


  /*
  IN:
    directory: must be a normalized string pointing at an actual directory
  OUT:
    string representing the first parent directory that contains package.json
    OR false if none found
   */

  PackageRoot._findRootR = function(directory) {
    var knownSourceRoot;
    if (knownSourceRoot = this._knownPackageRoots[directory]) {
      return knownSourceRoot;
    } else {
      if (fs.existsSync(path.join(directory, "package.json"))) {
        return directory;
      } else if (directory !== "/" && directory.length > 0) {
        return this._knownPackageRoots[directory] = this._findRootR(path.dirname(directory));
      } else {
        return false;
      }
    }
  };

  return PackageRoot;

})();


/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./source/NeptuneNamespaces/NamespaceStructure.coffee ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Namespace, NamespaceDir, NamespaceSet, NamespaceStructure, arrayWithoutLast, basename, fileWithoutExtension, globalNamespaceName, isPathedNamespace, log, merge, normalizeNamespaceName, peek, pushIfUnique, ref, ref1, shouldIncludeInNamespace, shouldNotAutoload, shouldNotNamespace, toFilename, toModuleName, upperCamelCase,
  slice = [].slice;

ref = __webpack_require__(/*! ./MiniFoundation */ 12), upperCamelCase = ref.upperCamelCase, peek = ref.peek, pushIfUnique = ref.pushIfUnique, log = ref.log, merge = ref.merge, arrayWithoutLast = ref.arrayWithoutLast, fileWithoutExtension = ref.fileWithoutExtension;

ref1 = __webpack_require__(/*! ./Helper */ 10), globalNamespaceName = ref1.globalNamespaceName, shouldNotAutoload = ref1.shouldNotAutoload, shouldNotNamespace = ref1.shouldNotNamespace, shouldIncludeInNamespace = ref1.shouldIncludeInNamespace, toFilename = ref1.toFilename, toModuleName = ref1.toModuleName;

basename = __webpack_require__(/*! path */ 9).basename;

isPathedNamespace = Neptune.isPathedNamespace;

NamespaceSet = (function() {

  /*
  @length: number of non-ignored items
   */
  function NamespaceSet(items) {
    var i, item, len;
    this.ignored = [];
    this.notNamespaced = [];
    this.namespaced = {};
    this.length = 0;
    if (items) {
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        this.addItem(item);
      }
    }
  }

  NamespaceSet.prototype.containsNormalizedItemName = function(itemName) {
    return !!this.namespaced[toModuleName(itemName)];
  };

  NamespaceSet.prototype.addItem = function(item) {
    var itemName;
    itemName = peek(item.split('/'));
    if (shouldNotAutoload(itemName)) {
      return this.ignored.push("" + (basename(item)));
    }
    this.length++;
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
    this.isPathNamespace = this.fileSet.length === 0 && !this.includeInNamespace && this.subdirSet.length <= 1;
    this.isPackageNamespace = !this.isPathNamespace;
  }

  Namespace.prototype.getIsRootPackageNamespace = function() {
    return !this.parent || !this.parent.getIsInsidePackageNamespace();
  };

  Namespace.prototype.getIsInsidePackageNamespace = function() {
    var ref2;
    return this.isPackageNamespace || ((ref2 = this.parent) != null ? ref2.getIsInsidePackageNamespace() : void 0);
  };

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
    var namespaceName, ref2;
    namespaceName = arg.namespaceName, this.path = arg.path, this.parent = arg.parent;
    this.files = [];
    this.subdirs = [];
    this.namespaceName = normalizeNamespaceName(namespaceName);
    this.namespacePath = (((ref2 = this.parent) != null ? ref2.namespacePath : void 0) || globalNamespaceName) + "." + this.namespaceName;
  }

  NamespaceDir.prototype.addFile = function(file) {
    return file && (shouldIncludeInNamespace(file, this.namespaceName) ? this.includeInNamespace = file : pushIfUnique(this.files, file));
  };

  NamespaceDir.prototype.addSubdir = function(subdir) {
    return subdir && pushIfUnique(this.subdirs, subdir);
  };

  NamespaceDir.prototype.getInspectedObjects = function() {
    var obj, ref2;
    return (
      obj = {},
      obj["" + this.path] = {
        namespaceName: this.namespaceName,
        namespacePath: this.namespacePath,
        files: this.files,
        subdirs: this.subdirs,
        parent: (ref2 = this.parent) != null ? ref2.namespacePath : void 0
      },
      obj
    );
  };

  return NamespaceDir;

})();

module.exports = NamespaceStructure = (function() {
  var addNamespace;

  NamespaceStructure.shouldNotAutoload = shouldNotAutoload;

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

  addNamespace = function(namespaces, dir) {
    var name1;
    if (dir) {
      return namespaces[name1 = dir.namespacePath] || (namespaces[name1] = new Namespace(merge(dir, {
        parent: addNamespace(namespaces, dir.parent)
      })));
    } else {
      return new Namespace({
        namespaceName: globalNamespaceName,
        namespacePath: globalNamespaceName,
        path: 'neptune-namespaces'
      });
    }
  };

  NamespaceStructure.prototype._generateNamespaces = function(dirs) {
    var dir, name, namespaces;
    namespaces = {};
    for (name in dirs) {
      dir = dirs[name];
      addNamespace(namespaces, dir);
    }
    return namespaces;
  };

  return NamespaceStructure;

})();


/***/ }),
/* 25 */
/*!**************************!*\
  !*** ./nnCommand.coffee ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Commander, Generator, compactFlatten, log, promiseSequence, ref, root, run, standardRoots, version, withoutTrailingSlash;

ref = __webpack_require__(/*! ./source/NeptuneNamespaces/MiniFoundation */ 12), log = ref.log, withoutTrailingSlash = ref.withoutTrailingSlash, promiseSequence = ref.promiseSequence, compactFlatten = ref.compactFlatten;

Generator = __webpack_require__(/*! ./source/NeptuneNamespaces/Generator */ 3);

version = __webpack_require__(/*! ./package.json */ 11).version;

standardRoots = (function() {
  var i, len, ref1, results;
  ref1 = Generator.standardRoots;
  results = [];
  for (i = 0, len = ref1.length; i < len; i++) {
    root = ref1[i];
    results.push(root + "/*");
  }
  return results;
})();

Commander = __webpack_require__(/*! commander */ 26).version(version).usage('[options] <root ...>').option('-r, --root', 'list one or more --root arguments').option('-w, --watch', 'stay running, watch for changes, and automatically update').option('-v, --verbose', 'enable verbose output').option('-q, --quiet', 'suppress all output').option('-j, --js', 'output .js files instead of .coffee (experimental)').option('--cleanup', 'cleanup .coffee files if generating .js or visa-versa').option('-f, --force', 'overwrite all index and namespace files').option('-s, --std', "include the standard roots: " + (standardRoots.join(', '))).on("--help", function() {
  return console.log("Generates 'namespace.(js|coffee)' and 'index.(js|coffee)' files to bind each specified root to the global Neptune namespace at runtime. \n\nRun with -v to see everything NN is doing.");
}).parse(process.argv);

run = function(targetPaths, arg) {
  var cleanup, force, js, quiet, targetPath, todoList, verbose, watch;
  watch = arg.watch, verbose = arg.verbose, quiet = arg.quiet, force = arg.force, js = arg.js, cleanup = arg.cleanup;
  if (verbose) {
    console.log("neptune-namespaces (" + version + ")\n\nroots: " + (targetPaths.join(', ')));
    log({
      watch: watch,
      verbose: verbose,
      quiet: quiet,
      force: force,
      js: js,
      cleanup: cleanup
    });
  }
  todoList = (function() {
    var i, len, results;
    results = [];
    for (i = 0, len = targetPaths.length; i < len; i++) {
      targetPath = targetPaths[i];
      results.push((function(targetPath) {
        var doWork;
        targetPath = withoutTrailingSlash(targetPath);
        doWork = function() {
          return Generator.generate(targetPath, {
            verbose: verbose,
            force: force,
            quiet: quiet,
            watch: watch,
            cleanup: cleanup,
            js: js,
            persistent: true
          });
        };
        return doWork;
      })(targetPath));
    }
    return results;
  })();
  return promiseSequence(todoList);
};

root = Commander.args || [];

if (Commander.std) {
  root = root.concat(standardRoots);
}

if (root.length === 0) {
  console.error("no roots specified (run with -h for help)");
} else {
  run(root, Commander);
}


/***/ }),
/* 26 */
/*!****************************************************************************!*\
  !*** external "require('commander' /* ABC - not inlining fellow NPM *_/)" ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('commander' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);