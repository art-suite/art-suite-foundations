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
/******/ 	return __webpack_require__(__webpack_require__.s = 32);
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
    __webpack_require__(10)
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Build, Configurator,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Build = __webpack_require__(20);

module.exports = Build.Configurator || Build.addNamespace('Configurator', Configurator = (function(superClass) {
  extend(Configurator, superClass);

  function Configurator() {
    return Configurator.__super__.constructor.apply(this, arguments);
  }

  return Configurator;

})(Neptune.Base));

__webpack_require__(17);

__webpack_require__(19);


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

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let Path, DirClass, createObjectTreeFactory, BaseClass, merge;
  ({ createObjectTreeFactory, BaseClass, merge } = Caf.import(
    ["createObjectTreeFactory", "BaseClass", "merge"],
    [__webpack_require__(3), __webpack_require__(21), global]
  ));
  Path = __webpack_require__(2);
  return createObjectTreeFactory(
    (DirClass = Caf.defClass(
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
    ))
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(17);

module.exports.addModules({
  StandardDependencies: __webpack_require__(11),
  StandardPackageJson: __webpack_require__(33),
  StandardWebpackConfig: __webpack_require__(34)
});


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  return {
    "neptune-namespaces": "*",
    "art-build-configurator": "*",
    "art-class-system": "*",
    "art-config": "*",
    "art-standard-lib": "*",
    "art-testbench": "*",
    "caffeine-script": "*",
    "caffeine-script-runtime": "*",
    "coffee-script": "^1.12.6",
    "coffee-loader": "^0.7.3",
    "css-loader": "^0.28.4",
    "json-loader": "^0.5.4",
    "script-loader": "^0.7.0",
    "style-loader": "^0.18.1",
    webpack: "^2.6.1",
    "webpack-dev-server": "^2.4.5",
    "case-sensitive-paths-webpack-plugin": "^2.1.1",
    "webpack-merge": "^4.1.0",
    "webpack-node-externals": "^1.6.0",
    bluebird: "^3.5.0",
    colors: "^1.1.2",
    commander: "^2.9.0",
    dateformat: "^2.0.0",
    "detect-node": "^2.0.3",
    "fs-extra": "^3.0.1",
    "glob-promise": "^3.1.0",
    glob: "^7.1.2",
    mocha: "^3.4.2",
    chai: "^4.0.1"
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 12 */
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
    fileBuilder,
    dashCase,
    process;
  ({
    BaseClass,
    getCapitalizedCodeWords,
    peek,
    fileBuilder,
    dashCase,
    process
  } = Caf.import(
    [
      "BaseClass",
      "getCapitalizedCodeWords",
      "peek",
      "fileBuilder",
      "dashCase",
      "process"
    ],
    [__webpack_require__(3), __webpack_require__(18), global]
  ));
  path = __webpack_require__(2);
  return (DefaultFiles = Caf.defClass(
    class DefaultFiles extends BaseClass {},
    function(DefaultFiles, classSuper, instanceSuper) {
      this.getDefaultFiles = function(npmRoot = process.cwd(), options = {}) {
        let app,
          npmName,
          namespacePath,
          namespaceDirPath,
          mostSpecificName,
          projectDotName;
        ({ app } = options);
        npmName = path.basename(npmRoot);
        namespacePath = getCapitalizedCodeWords(npmName);
        namespaceDirPath = namespacePath.join("/");
        mostSpecificName = peek(namespacePath);
        projectDotName = namespacePath.join(".");
        return fileBuilder({
          ".travis.yml": 'language: node_js\nnode_js:\n  - "6"',
          ".gitignore": "node_modules/",
          "package.json": "{}",
          "webpack.config.js":
            'module.exports = require("art-build-configurator").getWebpackConfig(__dirname);\n',
          "register.js":
            "require('coffee-script/register');\nrequire('caffeine-script/register');",
          "index.js":
            !app &&
              "if (false) { // use build? - true == fase, false == good for development\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./index.caf');\n};",
          "index.caf": !app && `&source/${Caf.toString(namespaceDirPath)}`,
          "Client.caf":
            app && `&source/${Caf.toString(namespaceDirPath)}/Client`,
          "index.html":
            app &&
              '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>',
          "art.build.config.caf": `target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: ${Caf.toString(
            !app
          )}\n\nnpm:\n  description: "" ${Caf.toString(
            projectDotName
          )}\n  dependencies: ${Caf.toString(
            app
              ? "art-suite-app: :git://github.com/imikimi/art-suite-app"
              : "{}"
          )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
            app ? "Client" : "index"
          )}: {}`,
          "README.md": `# ${Caf.toString(
            projectDotName
          )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
            dashCase(npmName)
          )}\n\`\`\``,
          source: {
            [namespaceDirPath]: {
              "StandardImport.caf": app
                ? "&ArtSuite"
                : "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem",
              Client: app && {
                "Main.caf": `&Models\n&Pipelines\n&ArtSuiteApp.initArtSuiteClient\n  MainComponent: &Components/App\n  title:         :${Caf.toString(
                  projectDotName
                )}`,
                Components: {
                  "User.caf":
                    "import &StandardImport\n\nclass User extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  render: ->\n    Element\n      padding: 10\n      margin: 5\n      size: ww: 1 hch: 1\n      RectangleElement padding: -10 color: #0002\n      TextElement\n        &StyleProps.text\n        size: ww: 1 hch: 1\n        align: if @alignUsersLeft then :left else :right\n        animators: align: true\n        text: @props.user?.name",
                  "Users.caf":
                    'import &StandardImport\n\nclass Users extends FluxComponent\n  @subscriptions allUsers: ""\n\n  render: ->\n    PagingScrollElement\n      clip: true\n      array user from @allUsers with &User {user}',
                  "App.caf": `import &StandardImport\n\nclass App extends FluxComponent\n  @subscriptions :navState.alignUsersLeft\n\n  addUser: ->\n    @models.user.create data: name: randomString()\n    .then ->\n      @models.allUsers.reload ""\n\n  render: ->\n    CanvasElement\n      RectangleElement color: #48f #248\n\n      Element\n        padding: 10\n        childrenLayout: :column\n\n        Element\n          margin: 10\n          size: ww: 1 hch: 1\n          childrenLayout: :row\n          childrenAlignment: :bottomLeft\n          TextElement &StyleProps.titleText, text: "${Caf.toString(
                    projectDotName
                  )} Users"\n          TextElement\n            &StyleProps.text\n            margin: 10\n            on: pointerClick: @models.navState.toggleAlignUsersLeft\n            text: if @alignUsersLeft then 'alignment: left' else 'alignment: right'\n          TextElement\n            &StyleProps.text\n            margin: 10\n            on: pointerClick: @addUser\n            text: '+user'\n        &Users()`
                },
                "StyleProps.caf":
                  "import &StandardImport\nclass StyleProps extends HotStyleProps\n  @text:\n    fontFamily: :sans-serif\n    color: :white\n\n  @titleText:\n    fontSize:   24\n    fontWeight: :bold\n    fontFamily: :sans-serif\n    color: :white",
                Models: {
                  "NavState.caf":
                    "import &StandardImport\n\nclass NavState extends ApplicationState\n  @stateFields\n    alignUsersLeft: true"
                }
              },
              Pipelines: app && {
                "User.caf":
                  "import &StandardImport\n\nclass User extends Pipeline\n  @query\n    allUsers: (request) -> array request.pipeline.db\n\n  constructor: ->\n    super\n    @db =\n      abc123: id: :abc123 name: :Alice\n      efg456: id: :efg456 name: :Bill\n\n  @handlers\n    get: ({key}) ->\n      @db[key]\n\n    create: ({data}) ->\n      key = randomString()\n      @db[key] = merge data, {} key\n\n    update: ({data, key}) ->\n      if @db[key]\n        @db[key] = merge @db[key], data\n\n    delete: ({key}) ->\n      if @db[key]\n        @db = objectWithout @db, key\n        true"
              }
            }
          },
          test: {
            "index.js": "require('../register');\nrequire('./index.caf');",
            "index.caf":
              "require '../index.caf'\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests",
            "StandardImport.caf":
              "&ArtStandardLib.merge &ArtStandardLib, &ArtClassSystem, test: (args...) -> global.test args...",
            tests: {
              [namespaceDirPath]: {
                "Test.caf": `&StandardImport\nsuite: ->\n  test '${Caf.toString(
                  mostSpecificName
                )}' -> assert.eq 1, 1`
              }
            }
          }
        });
      };
    }
  ));
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 13 */
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
    [__webpack_require__(3), __webpack_require__(21), global]
  ));
  Path = __webpack_require__(2);
  return createObjectTreeFactory(
    (FileClass = Caf.defClass(
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
            fs = __webpack_require__(22)
          } = options);
          path = Path.join(path || ".", filename);
          selected = select != null
            ? isFunction(select)
              ? select(path)
              : isRegExp(select) ? select.test(path) : undefined
            : true;
          return selected
            ? (
                (exists = fs.existsSync(path)),
                verbose
                  ? (
                      (logContents = exists
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
                      )
                    )
                  : undefined,
                !pretend && (!exists || force)
                  ? (
                      fs.ensureDirSync(Path.dirname(path)),
                      fs.writeFileSync(path, contents),
                      path
                    )
                  : undefined
              )
            : undefined;
        };
      }
    ))
  );
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let NeptuneNamespacesGenerator, Promise, log;
  ({ Promise, log } = Caf.import(
    ["Promise", "log"],
    [__webpack_require__(3), global]
  ));
  NeptuneNamespacesGenerator = __webpack_require__(39);
  return function(dirname, watch) {
    let existingRoots, workers;
    existingRoots = Caf.each(
      NeptuneNamespacesGenerator.standardRoots,
      [],
      (root, k, into) => {
        if (
          __webpack_require__(7).existsSync(
            `${Caf.toString(dirname)}/${Caf.toString(root)}`
          )
        ) {
          into.push(root);
        }
      }
    );
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigurePackageJson, StandardPackageJson, consistentJsonStringify, deepMerge, defineModule, fs, isPlainObject, path, ref,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ref = __webpack_require__(5), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, deepMerge = ref.deepMerge, consistentJsonStringify = ref.consistentJsonStringify;

fs = __webpack_require__(7);

path = __webpack_require__(2);

BaseClass = __webpack_require__(10).BaseClass;

StandardPackageJson = __webpack_require__(9).StandardPackageJson;

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var BaseClass, Configurator, ConfigureWebpack, StandardWebpackConfig, array, compactFlatten, deepMerge, defineModule, fs, isPlainObject, log, merge, nodeExternals, object, objectKeyCount, path, ref, webpackMerge, webpackNodeExternals,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

nodeExternals = null;

ref = __webpack_require__(5), defineModule = ref.defineModule, isPlainObject = ref.isPlainObject, array = ref.array, object = ref.object, deepMerge = ref.deepMerge, log = ref.log, compactFlatten = ref.compactFlatten, objectKeyCount = ref.objectKeyCount, merge = ref.merge;

webpackMerge = __webpack_require__(40);

webpackNodeExternals = __webpack_require__(41);

BaseClass = __webpack_require__(10).BaseClass;

fs = __webpack_require__(7);

path = __webpack_require__(2);

Configurator = __webpack_require__(4);

StandardWebpackConfig = __webpack_require__(9).StandardWebpackConfig;

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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(19);

module.exports.includeInNamespace(__webpack_require__(29)).addModules({
  Dir: __webpack_require__(8),
  File: __webpack_require__(13)
});


/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Build,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(35);

module.exports = Art.Build || Art.addNamespace('Build', Build = (function(superClass) {
  extend(Build, superClass);

  function Build() {
    return Build.__super__.constructor.apply(this, arguments);
  }

  return Build;

})(Neptune.Base));

__webpack_require__(4);


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("art-object-tree-factory");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

module.exports.includeInNamespace(__webpack_require__(28)).addModules({
  ConfigurePackageJson: __webpack_require__(15),
  ConfigureWebpack: __webpack_require__(16),
  DefaultFiles: __webpack_require__(12),
  Publish: __webpack_require__(30),
  RunNeptuneNamespaces: __webpack_require__(14),
  StandardImport: __webpack_require__(3),
  Versioning: __webpack_require__(31)
});

__webpack_require__(9);

__webpack_require__(18);


/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
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
  fs = __webpack_require__(22);
  path = __webpack_require__(2);
  realRequire = eval("require");
  ConfigureWebpack = __webpack_require__(16);
  ConfigurePackageJson = __webpack_require__(15);
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
  return (Configurator = Caf.defClass(
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
        return Promise.then(() => {
          if (init) {
            this.init(npmRoot, options);
          }
          return this.runNeptuneNamespaces(npmRoot);
        }).then(() => {
          return this.loadAndWriteConfig(npmRoot, options);
        });
      };
      this.registerLoaders = (npmRoot, vivify = false) => {
        let file;
        file = path.join(npmRoot, this.registerLoadersFilename);
        return fs.exists(file).then(exists => {
          return exists
            ? realRequire(file)
            : (
                vivify
                  ? (
                      this.init(npmRoot, {
                        verbose: true,
                        select: /register.js/
                      }),
                      realRequire(file)
                    )
                  : undefined,
                {}
              );
        });
      };
      this.loadConfig = (npmRoot, vivifyConfigFile = false) => {
        return this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
          let configFilepath;
          configFilepath = path.join(process.cwd(), this.configBasename);
          return __webpack_require__(37)(configFilepath + "*")
            .then(results => {
              return results.length > 0
                ? realRequire(configFilepath)
                : (
                    vivifyConfigFile
                      ? this.init(npmRoot, {
                          verbose: true,
                          select: /art.build.config/
                        })
                      : undefined,
                    {}
                  );
            })
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
          __webpack_require__(12)
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
        isWebpackDevServer = !!(
          executable.match(/\/node$/) &&
          (Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/))
        );
        log(`\nNN: ${Caf.toString(npmRoot)}`);
        return __webpack_require__(14)(npmRoot, isWebpackDevServer);
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
          ? (
              log("writing: ".gray + fileName.green),
              fs.writeFileSync(fileName, contents)
            )
          : log(`same:    ${Caf.toString(fileName)}`.gray);
      };
    }
  ));
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let fileBuilder, isPlainObject, isString, Error, formattedInspect;
  ({ isPlainObject, isString, Error, formattedInspect } = Caf.import(
    ["isPlainObject", "isString", "Error", "formattedInspect"],
    [__webpack_require__(3), global]
  ));
  return {
    fileBuilder: (fileBuilder = function(name, contents) {
      return (() => {
        switch (false) {
          case !isPlainObject(name):
            return __webpack_require__(8)(
              ".",
              Caf.each(name, [], (contents, n, into) => {
                into.push(fileBuilder(n, contents));
              })
            );
          case !isString(contents):
            return __webpack_require__(13)(name, contents);
          case !isPlainObject(contents):
            return __webpack_require__(8)(name, fileBuilder(contents));
          case !(
            contents === null ||
            contents === undefined ||
            contents === false
          ):
            return null;
          default:
            return (() => {
              throw new Error(
                `expecting string or plain object. got: ${Caf.toString(
                  formattedInspect({ name, contents })
                )}`
              );
            })();
        }
      })();
    })
  };
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let notPublished = global.notPublished,
    tagName;
  return notPublished
    ? (
        (tagName = "published"),
        `npm publish\ngit tag -f ${Caf.toString(
          tagName
        )}\ngit push origin "${Caf.toString(tagName)}" --force`
      )
    : undefined;
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(1);
Caf.defMod(module, () => {
  let Versioning, BaseClass, JSON;
  ({ BaseClass, JSON } = Caf.import(
    ["BaseClass", "JSON"],
    [__webpack_require__(3), global]
  ));
  return (Versioning = Caf.defClass(
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
  ));
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 33 */
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
      dependencies: __webpack_require__(11),
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var CaseSensitivePathsPlugin, StandardWebpackConfig, path;

CaseSensitivePathsPlugin = __webpack_require__(36);

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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(38);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));

__webpack_require__(20);


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("case-sensitive-paths-webpack-plugin");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("glob-promise");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces/generator");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("webpack-merge");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })
/******/ ]);