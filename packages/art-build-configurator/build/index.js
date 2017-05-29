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
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("caffeine-script-runtime");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return __webpack_require__(5).merge(
    __webpack_require__(5),
    __webpack_require__(9)
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Build, Configurator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Build = __webpack_require__(18);

module.exports = Build.Configurator || Build.addNamespace('Configurator', Configurator = (function(superClass) {
  extend(Configurator, superClass);

  function Configurator() {
    return Configurator.__super__.constructor.apply(this, arguments);
  }

  return Configurator;

})(Neptune.Base));

__webpack_require__(15);

__webpack_require__(17);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

module.exports.addModules({
  StandardDependencies: __webpack_require__(10),
  StandardPackageJson: __webpack_require__(29),
  StandardWebpackConfig: __webpack_require__(30)
});


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return {
    "neptune-namespaces": "^2.2.2",
    "art-testbench": "^1.10.3",
    "art-standard-lib": "^1.11.1",
    "art-class-system": "^1.5.2",
    "art-config": "^1.3.3",
    "art-build-configurator": "^1.11.5",
    "caffeine-script": "^0.44.5",
    "caffeine-script-runtime": "^1.0.0",
    "detect-node": "^2.0.3",
    "coffee-script": "^1.12.3",
    "coffee-loader": "^0.7.2",
    "css-loader": "^0.26.1",
    "json-loader": "^0.5.4",
    "script-loader": "^0.7.0",
    "style-loader": "^0.13.1",
    "case-sensitive-paths-webpack-plugin": "^1.1.4",
    "webpack-merge": "^3.0.0",
    webpack: "^2.2.1",
    "webpack-dev-server": "^2.3.0"
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let path,
    DefaultFiles,
    BaseClass,
    getCapitalizedCodeWords,
    peek,
    Dir,
    File,
    dashCase;
  ({
    BaseClass,
    getCapitalizedCodeWords,
    peek,
    Dir,
    File,
    dashCase
  } = Caf.import(
    ["BaseClass", "getCapitalizedCodeWords", "peek", "Dir", "File", "dashCase"],
    [__webpack_require__(3), __webpack_require__(16), global]
  ));
  path = __webpack_require__(2);
  return DefaultFiles = Caf.defClass(
    class DefaultFiles extends BaseClass {},
    function(DefaultFiles, classSuper, instanceSuper) {
      this.getDefaultFiles = function(npmRoot = process.cwd(), options = {}) {
        let npmName,
          namespacePath,
          namespaceDirPath,
          mostSpecificName,
          projectDotName;
        npmName = path.basename(npmRoot);
        namespacePath = getCapitalizedCodeWords(npmName);
        namespaceDirPath = namespacePath.join("/");
        mostSpecificName = peek(namespacePath);
        projectDotName = namespacePath.join(".");
        return Dir(
          ".",
          File(".travis.yml", 'language: node_js\nnode_js:\n  - "6"'),
          File("package.json", "{}"),
          File(
            "webpack.config.js",
            'module.exports = require("art-build-configurator").getWebpackConfig(__dirname);\n'
          ),
          File(
            "register.js",
            "require('coffee-script/register');\nrequire('caffeine-script/register');"
          ),
          File(
            "index.js",
            "if (false) { // use build? - true == fase, false == good for development\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./index.caf');\n};"
          ),
          File("index.caf", `&source/${Caf.toString(namespaceDirPath)}`),
          File(
            "art.build.config.caf",
            `target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: true\n\nnpm:\n  description: "" ${Caf.toString(
              projectDotName
            )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: index: {}`
          ),
          File(
            "README.md",
            `# ${Caf.toString(
              projectDotName
            )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
              dashCase(npmName)
            )}\n\`\`\``
          ),
          Dir(
            "source",
            Dir(
              namespaceDirPath,
              File(
                "StandardImport.caf",
                "&ArtStandardLib.merge &ArtStandardLib, @ArtClassSystem"
              )
            )
          ),
          Dir(
            "test",
            File(
              "index.js",
              "require('../register');\nrequire('./index.caf');"
            ),
            File(
              "index.caf",
              "require '../index.caf'\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests"
            ),
            Dir(
              "tests",
              Dir(
                namespaceDirPath,
                File(
                  "Test.caf",
                  `&StandardImport\nsuite: ->\n  test '${Caf.toString(
                    mostSpecificName
                  )}' -> assert.eq 1, 1`
                )
              )
            )
          )
        );
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let NeptuneNamespacesGenerator, Promise, log;
  ({ Promise, log } = Caf.import(["Promise", "log"], [
    __webpack_require__(3),
    global
  ]));
  NeptuneNamespacesGenerator = __webpack_require__(36);
  return function(dirname, watch) {
    let existingRoots, workers;
    existingRoots = Caf.each(NeptuneNamespacesGenerator.standardRoots, [], (
      root,
      k,
      into
    ) => {
      if (
        __webpack_require__(7).existsSync(
          `${Caf.toString(dirname)}/${Caf.toString(root)}`
        )
      ) {
        into.push(root);
      }
    });
    Caf.each(existingRoots, [], (root, k, into) => {
      into.push(
        log(
          "neptune-namespaces scanning: ".grey +
            `${Caf.toString(__webpack_require__(2).basename(dirname))}/${Caf.toString(
              root
            )}/*`.green
        )
      );
    });
    workers = Caf.each(existingRoots, [], (root, k, into) => {
      into.push(
        NeptuneNamespacesGenerator.generate(
          `${Caf.toString(dirname)}/${Caf.toString(root)}/*`,
          { watch }
        )
      );
    });
    return Promise.all(workers).then(() => {
      return log(
        "neptune-namespaces: ".grey +
          `done with ${Caf.toString(
            watch ? "initial " : ""
          )}namespace generation`.green
      );
    });
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigurePackageJson, StandardPackageJson, consistentJsonStringify, deepMerge, defineModule, fs, isPlainObject, path, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(5), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, deepMerge = ref.deepMerge, consistentJsonStringify = ref.consistentJsonStringify;

fs = __webpack_require__(7);

path = __webpack_require__(2);

BaseClass = __webpack_require__(9).BaseClass;

StandardPackageJson = __webpack_require__(8).StandardPackageJson;

Configurator = __webpack_require__(4);

defineModule(module, ConfigurePackageJson = (function(superClass) {
  extend(ConfigurePackageJson, superClass);

  function ConfigurePackageJson() {
    return ConfigurePackageJson.__super__.constructor.apply(this, arguments);
  }

  ConfigurePackageJson.outFileName = "package.json";


  /*
  IN:
   */

  ConfigurePackageJson.get = function(npmRoot, abcConfig) {
    return deepMerge(StandardPackageJson.get(abcConfig), abcConfig.npm);
  };


  /*
  consistentJsonStringify is there to guarantee a consistently formatted output for git.
   */

  ConfigurePackageJson.writeConfig = function(npmRoot, abcConfig) {
    var contents, packageConfig;
    packageConfig = ConfigurePackageJson.get(npmRoot, abcConfig);
    contents = consistentJsonStringify(packageConfig, "  ");
    return Configurator.updateFile(path.join(npmRoot, "package.json"), contents + "\n");
  };

  return ConfigurePackageJson;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigureWebpack, StandardWebpackConfig, array, compactFlatten, deepMerge, defineModule, fs, isPlainObject, log, merge, nodeExternals, object, objectKeyCount, path, ref, webpackMerge, webpackNodeExternals,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

nodeExternals = null;

ref = __webpack_require__(5), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, array = ref.array, object = ref.object, deepMerge = ref.deepMerge, log = ref.log, compactFlatten = ref.compactFlatten, objectKeyCount = ref.objectKeyCount, merge = ref.merge;

webpackMerge = __webpack_require__(37);

webpackNodeExternals = __webpack_require__(38);

BaseClass = __webpack_require__(9).BaseClass;

fs = __webpack_require__(7);

path = __webpack_require__(2);

Configurator = __webpack_require__(4);

StandardWebpackConfig = __webpack_require__(8).StandardWebpackConfig;

defineModule(module, ConfigureWebpack = (function(superClass) {
  extend(ConfigureWebpack, superClass);

  function ConfigureWebpack() {
    return ConfigureWebpack.__super__.constructor.apply(this, arguments);
  }


  /*
  IN:
    common: webpack config shared
    targets:
      myEntry: my target's overrides
   */

  ConfigureWebpack.get = function(npmRoot, abcConfig) {
    var baseConfig, common, config, entriesWithNoOverrides, standard, targets;
    if (abcConfig == null) {
      abcConfig = {};
    }
    config = abcConfig.webpack || (abcConfig.webpack = {});
    common = config.common, targets = config.targets;
    standard = StandardWebpackConfig.get(npmRoot, abcConfig);
    baseConfig = webpackMerge(standard, common);
    targets || (targets = {
      index: {}
    });
    entriesWithNoOverrides = null;
    return compactFlatten(array(ConfigureWebpack.normalizeTargets(targets), function(targetConfig) {
      var keys, ref1, webpackEntry;
      if (!entriesWithNoOverrides || (keys = 1 < objectKeyCount(targetConfig))) {
        webpackEntry = webpackMerge(baseConfig, targetConfig);
        if ((ref1 = abcConfig.target) != null ? ref1.node : void 0) {
          webpackEntry.target || (webpackEntry.target = "node");
        }
        config = ConfigureWebpack.normalizeTargetConfig(webpackEntry);
        if (!keys) {
          entriesWithNoOverrides = config;
        }
        return config;
      } else {
        entriesWithNoOverrides.entry = merge(entriesWithNoOverrides.entry, targetConfig.entry);
        return null;
      }
    }));
  };

  ConfigureWebpack.normalizeTargetConfig = function(targetConfig) {
    if (targetConfig.target === "node") {
      targetConfig = webpackMerge({
        output: {
          libraryTarget: "commonjs2"
        },
        externals: [
          nodeExternals || (nodeExternals = webpackNodeExternals({
            modulesFromFile: true
          }))
        ]
      }, targetConfig);
    }
    return targetConfig;
  };

  ConfigureWebpack.normalizeTargets = function(targets) {
    if (targets == null) {
      targets = {};
    }
    if (!isPlainObject(targets)) {
      throw new Error("targets must be an object");
    }
    return object(targets, function(targetConfig, targetName) {
      var obj;
      return webpackMerge({
        entry: (
          obj = {},
          obj["" + targetName] = "./" + targetName,
          obj
        )
      }, targetConfig);
    });
  };

  ConfigureWebpack.outFileName = "webpack.config.js";

  ConfigureWebpack.standardWebpackConfigJs = StandardWebpackConfig.js;

  ConfigureWebpack.writeConfig = function(npmRoot) {
    return Configurator.updateFile(path.join(npmRoot, ConfigureWebpack.outFileName), ConfigureWebpack.standardWebpackConfigJs);
  };

  return ConfigureWebpack;

})(BaseClass));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Configurator, Data,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Configurator = __webpack_require__(4);

module.exports = Configurator.Data || Configurator.addNamespace('Data', Data = (function(superClass) {
  extend(Data, superClass);

  function Data() {
    return Data.__super__.constructor.apply(this, arguments);
  }

  return Data;

})(Neptune.Base));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

module.exports.addModules({
  Dir: __webpack_require__(25),
  File: __webpack_require__(26)
});


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Configurator, FileBuilder,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Configurator = __webpack_require__(4);

module.exports = Configurator.FileBuilder || Configurator.addNamespace('FileBuilder', FileBuilder = (function(superClass) {
  extend(FileBuilder, superClass);

  function FileBuilder() {
    return FileBuilder.__super__.constructor.apply(this, arguments);
  }

  return FileBuilder;

})(Neptune.Base));


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Build,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(31);

module.exports = Art.Build || Art.addNamespace('Build', Build = (function(superClass) {
  extend(Build, superClass);

  function Build() {
    return Build.__super__.constructor.apply(this, arguments);
  }

  return Build;

})(Neptune.Base));

__webpack_require__(4);


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("art-object-tree-factory");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

module.exports.includeInNamespace(__webpack_require__(24)).addModules({
  ConfigurePackageJson: __webpack_require__(13),
  ConfigureWebpack: __webpack_require__(14),
  DefaultFiles: __webpack_require__(11),
  Publish: __webpack_require__(27),
  RunNeptuneNamespaces: __webpack_require__(12),
  StandardImport: __webpack_require__(3),
  Versioning: __webpack_require__(28)
});

__webpack_require__(8);

__webpack_require__(16);


/***/ }),
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let fs,
    path,
    realRequire,
    ConfigureWebpack,
    ConfigurePackageJson,
    Configurator,
    log,
    Promise,
    process,
    merge,
    compactFlatten,
    formattedInspect;
  fs = __webpack_require__(33);
  path = __webpack_require__(2);
  realRequire = eval("require");
  ConfigureWebpack = __webpack_require__(14);
  ConfigurePackageJson = __webpack_require__(13);
  ({
    log,
    Promise,
    process,
    merge,
    compactFlatten,
    formattedInspect
  } = Caf.import(
    [
      "log",
      "Promise",
      "process",
      "merge",
      "compactFlatten",
      "formattedInspect"
    ],
    [__webpack_require__(5), global]
  ));
  return Configurator = Caf.defClass(
    class Configurator extends Object {},
    function(Configurator, classSuper, instanceSuper) {
      this.configFilename = "art.build.config.caf";
      this.configBasename = "art.build.config";
      this.registerLoadersFilename = "register.js";
      this.go = (npmRoot, options) => {
        let pretend, configure, init, force;
        ({ pretend, configure, init, force } = options);
        if (pretend) {
          log("PRETEND".green);
        }
        return Promise
          .then(() => {
            if (init) {
              this.init(npmRoot, options);
            }
            return this.runNeptuneNamespaces(npmRoot);
          })
          .then(() => {
            return this.loadAndWriteConfig(npmRoot, options);
          });
      };
      this.registerLoaders = (npmRoot, vivify = false) => {
        let file;
        file = path.join(npmRoot, this.registerLoadersFilename);
        return fs.exists(file).then(exists => {
          return exists
            ? realRequire(file)
            : (vivify
                ? this.init(npmRoot, { verbose: true, select: /register.js/ })
                : undefined, {});
        });
      };
      this.loadConfig = (npmRoot, vivifyConfigFile = false) => {
        return this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
          let configFilepath;
          configFilepath = path.join(process.cwd(), this.configBasename);
          return __webpack_require__(34)(configFilepath + "*")
            .then(results => {
              return results.length > 0
                ? realRequire(configFilepath)
                : (vivifyConfigFile
                    ? this.init(npmRoot, {
                        verbose: true,
                        select: /art.build.config/
                      })
                    : undefined, {});
            })
            .then(config => {
              let p, packageFile;
              config.npm || (config.npm = config.package);
              p = config.npm
                ? Promise.resolve(config.npm)
                : fs
                    .exists(
                      packageFile = path.join(
                        npmRoot,
                        ConfigurePackageJson.outFileName
                      )
                    )
                    .then(exists => {
                      return exists ? realRequire(packageFile) : {};
                    });
              return p.then(finalNpm => {
                return merge(config, { npm: finalNpm });
              });
            });
        });
      };
      this.init = function(npmRoot, options) {
        let wrote;
        log(`\nINIT: ${Caf.toString(npmRoot)}`);
        wrote = compactFlatten(
          __webpack_require__(11)
            .getDefaultFiles(npmRoot, options)
            .write(options)
        );
        return log(`INIT: wrote ${Caf.toString(wrote.length)} files`);
      };
      this.pretendWriteConfig = function(npmRoot, abcConfig) {
        return log(
          formattedInspect(
            {
              npm: {
                out: {
                  "package.json": ConfigurePackageJson.get(npmRoot, abcConfig)
                }
              },
              webpack: {
                configGeneratedOnDemand: ConfigureWebpack.get(
                  npmRoot,
                  abcConfig
                ),
                out: {
                  "webpack.config.js": ConfigureWebpack.standardWebpackConfigJs
                }
              }
            },
            { color: true }
          )
        );
      };
      this.runNeptuneNamespaces = function(npmRoot, options) {
        let executable, firstArg, isWebpackDevServer;
        [executable, firstArg] = process.argv;
        isWebpackDevServer = !!(executable.match(/\/node$/) &&
          (Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/)));
        log(`\nNN: ${Caf.toString(npmRoot)}`);
        return __webpack_require__(12)(npmRoot);
      };
      this.loadAndWriteConfig = function(npmRoot, options) {
        let pretend, configure;
        ({ pretend, configure } = options);
        log(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
        return this.loadConfig(npmRoot, configure).then(abcConfig => {
          return pretend
            ? this.pretendWriteConfig(npmRoot, abcConfig)
            : this.writeConfig(npmRoot, abcConfig);
        });
      };
      this.writeConfig = function(npmRoot, abcConfig) {
        ConfigurePackageJson.writeConfig(npmRoot, abcConfig);
        return ConfigureWebpack.writeConfig(npmRoot, abcConfig);
      };
      this.getWebpackConfig = npmRoot => {
        return this.loadConfig(npmRoot).then(abcConfig => {
          this.writeConfig(npmRoot, abcConfig);
          return this.runNeptuneNamespaces(npmRoot).then(() => {
            return ConfigureWebpack.get(npmRoot, abcConfig);
          });
        });
      };
      this.updateFile = function(fileName, contents) {
        let oldContents;
        if (fs.existsSync(fileName)) {
          oldContents = fs.readFileSync(fileName).toString();
        }
        return oldContents !== contents
          ? (log("writing: ".gray + fileName.green), fs.writeFileSync(
              fileName,
              contents
            ))
          : log(`same:    ${Caf.toString(fileName)}`.gray);
      };
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let Path, DirClass, createObjectTreeFactory, BaseClass, merge;
  ({ createObjectTreeFactory, BaseClass, merge } = Caf.import(
    ["createObjectTreeFactory", "BaseClass", "merge"],
    [__webpack_require__(3), __webpack_require__(19), global]
  ));
  Path = __webpack_require__(2);
  return createObjectTreeFactory(
    DirClass = Caf.defClass(
      class DirClass extends BaseClass {
        constructor(props, children) {
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
                ...Caf.each(this.children, [], (child, k, into) => {
                  into.push(child.plainObjects || child);
                })
              )
            };
          }
        });
        this.prototype.write = function(options = {}) {
          let path;
          path = Path.join(options.path || ".", this.props.dirname);
          return Caf.each(this.children, [], (child, k, into) => {
            into.push(child.write(merge(options, { path })));
          });
        };
      }
    )
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let Path,
    FileClass,
    createObjectTreeFactory,
    BaseClass,
    isFunction,
    isRegExp,
    log;
  ({
    createObjectTreeFactory,
    BaseClass,
    isFunction,
    isRegExp,
    log
  } = Caf.import(
    ["createObjectTreeFactory", "BaseClass", "isFunction", "isRegExp", "log"],
    [__webpack_require__(3), __webpack_require__(19), global]
  ));
  Path = __webpack_require__(2);
  return createObjectTreeFactory(
    FileClass = Caf.defClass(
      class FileClass extends BaseClass {
        constructor(props, children) {
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
            logContents;
          ({ filename, contents } = this.props);
          ({
            path,
            pretend,
            force,
            verbose,
            select,
            fs = require("fs-extra")
          } = options);
          path = Path.join(path || ".", filename);
          selected = select != null
            ? isFunction(select)
                ? select(path)
                : isRegExp(select) ? select.test(path) : undefined
            : true;
          return selected
            ? (exists = fs.existsSync(path), verbose
                ? (logContents = exists
                    ? contents === fs.readFileSync(path).toString()
                        ? `same:    ${Caf.toString(path)}`.gray
                        : force
                            ? "overwriting: ".yellow + path.green
                            : `skipped: ${Caf.toString(path)}`.gray +
                                " (cowardly refusing to overwrite - use: force)".yellow
                    : "writing: ".gray + path.green, log(
                    pretend ? "PRETEND-".green + logContents : logContents
                  ))
                : undefined, !pretend && (!exists || force)
                ? (fs.ensureDirSync(Path.dirname(path)), fs.writeFileSync(
                    path,
                    contents
                  ), path)
                : undefined)
            : undefined;
        };
      }
    )
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let notPublished = global.notPublished, tagName;
  return notPublished
    ? (tagName = "published", `npm publish\ngit tag -f ${Caf.toString(
        tagName
      )}\ngit push origin "${Caf.toString(tagName)}" --force`)
    : undefined;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let Versioning, BaseClass, JSON;
  ({ BaseClass, JSON } = Caf.import(["BaseClass", "JSON"], [
    __webpack_require__(3),
    global
  ]));
  return Versioning = Caf.defClass(
    class Versioning extends BaseClass {},
    function(Versioning, classSuper, instanceSuper) {
      this.classGetter({
        current: function() {
          return JSON.parse(
            __webpack_require__(7).readFileSync("package.json").toString()
          ).version;
        }
      });
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var StandardPackageJson, deepMerge, fs, peek, ref;

fs = __webpack_require__(7);

ref = __webpack_require__(5), peek = ref.peek, deepMerge = ref.deepMerge;

module.exports = StandardPackageJson = (function() {
  function StandardPackageJson() {}

  StandardPackageJson.get = function(abcConfig) {
    var ref1;
    return {
      license: 'ISC',
      name: peek(process.cwd().split("/")),
      version: fs.existsSync("package.json") ? JSON.parse(fs.readFileSync("package.json").toString()).version : "0.0.1",
      author: "Shane Brinkman-Davis Delamore, Imikimi LLC",
      dependencies: __webpack_require__(10),
      scripts: {
        test: (abcConfig != null ? (ref1 = abcConfig.target) != null ? ref1.node : void 0 : void 0) ? "nn -s;mocha -u tdd --compilers coffee:coffee-script/register" : 'webpack-dev-server --progress',
        start: 'webpack-dev-server --hot --inline --progress',
        testInBrowser: 'webpack-dev-server --progress',
        build: 'webpack --progress'
      }
    };
  };

  return StandardPackageJson;

})();


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var CaseSensitivePathsPlugin, StandardWebpackConfig, path;

CaseSensitivePathsPlugin = __webpack_require__(32);

path = __webpack_require__(2);

module.exports = StandardWebpackConfig = (function() {
  function StandardWebpackConfig() {}

  StandardWebpackConfig.get = function(npmRoot, abcConfig) {
    var options, outputPath, ref;
    options = abcConfig.webpack;
    outputPath = (ref = options.outputPath) != null ? ref : "build";
    return {
      resolve: {
        extensions: [".webpack.js", ".web.js", ".coffee", ".caf", ".caffeine", ".js", ".json"]
      },
      output: {
        path: path.join(npmRoot, outputPath),
        filename: "[name].js"
      },
      plugins: [new CaseSensitivePathsPlugin],
      module: {
        rules: [
          {
            test: /\.caf(feine)?$/,
            loader: "caffeine-mc/webpack-loader"
          }, {
            test: /\.coffee$/,
            loader: "coffee-loader"
          }, {
            test: /\.(coffee\.md|litcoffee)$/,
            loader: "coffee-loader?literate"
          }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
          }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
          }, {
            test: /\.jpg$/,
            loader: "file-loader"
          }, {
            test: /\.json$/,
            loader: "json-loader"
          }
        ]
      }
    };
  };

  StandardWebpackConfig.js = "module.exports = require(\"art-build-configurator\").getWebpackConfig(__dirname);\n";

  return StandardWebpackConfig;

})();


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(35);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));

__webpack_require__(18);


/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("glob-promise");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces/generator");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(20);


/***/ })
/******/ ]);