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
  return __webpack_require__(/*! ./source */ 3);
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
/*!*************************!*\
  !*** ./source/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./ArtSuite.Cli */ 4);

/***/ }),
/* 4 */
/*!**************************************!*\
  !*** ./source/ArtSuite.Cli/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: ArtSuite.Cli/index.js

(module.exports = __webpack_require__(/*! ./namespace */ 5))
.includeInNamespace(__webpack_require__(/*! ./Cli */ 8))
.addModules({
  Help:           __webpack_require__(/*! ./Help */ 14),
  Main:           __webpack_require__(/*! ./Main */ 9),
  Parse:          __webpack_require__(/*! ./Parse */ 13),
  StandardImport: __webpack_require__(/*! ./StandardImport */ 10)
});

/***/ }),
/* 5 */
/*!******************************************!*\
  !*** ./source/ArtSuite.Cli/namespace.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// generated by Neptune Namespaces v4.x.x
// file: ArtSuite.Cli/namespace.js

module.exports = __webpack_require__(/*! neptune-namespaces */ 6).addNamespace(
  'ArtSuite.Cli',
  (class Cli extends Neptune.PackageNamespace {})
  ._configureNamespace(__webpack_require__(/*! ../../package.json */ 7))
);


/***/ }),
/* 6 */
/*!*************************************************************************************!*\
  !*** external "require('neptune-namespaces' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 7 */
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: author, bugs, dependencies, description, devDependencies, homepage, license, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"author\":\"Shane Brinkman-Davis Delamore, Imikimi LLC\",\"bugs\":\"https:/github.com/art-suite/art-cli/issues\",\"dependencies\":{\"art-build-configurator\":\"*\",\"art-colors\":\"^1.4.0\"},\"description\":\"Art.Cli\",\"devDependencies\":{\"art-testbench\":\"*\",\"case-sensitive-paths-webpack-plugin\":\"^2.2.0\",\"chai\":\"^4.2.0\",\"coffee-loader\":\"^0.7.3\",\"css-loader\":\"^3.0.0\",\"json-loader\":\"^0.5.7\",\"mocha\":\"^7.0.0\",\"mock-fs\":\"^4.10.0\",\"script-loader\":\"^0.7.2\",\"style-loader\":\"^1.0.0\",\"webpack\":\"^4.39.1\",\"webpack-cli\":\"*\",\"webpack-dev-server\":\"^3.7.2\",\"webpack-merge\":\"^4.2.1\",\"webpack-node-externals\":\"^1.7.2\",\"webpack-stylish\":\"^0.1.8\"},\"homepage\":\"https://github.com/art-suite/art-cli\",\"license\":\"ISC\",\"name\":\"@art-suite/cli\",\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/art-suite/art-cli.git\"},\"scripts\":{\"build\":\"webpack --progress\",\"start\":\"webpack-dev-server --hot --inline --progress --env.devServer\",\"test\":\"nn -s;mocha -u tdd\",\"testInBrowser\":\"webpack-dev-server --progress --env.devServer\"},\"version\":\"0.1.2\"}");

/***/ }),
/* 8 */
/*!*************************************!*\
  !*** ./source/ArtSuite.Cli/Cli.caf ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return { start: __webpack_require__(/*! ./Main */ 9).start };
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 9 */
/*!**************************************!*\
  !*** ./source/ArtSuite.Cli/Main.caf ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["log", "Promise", "process"],
    [global, __webpack_require__(/*! ./StandardImport */ 10)],
    (log, Promise, process) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function(
        Main,
        classSuper,
        instanceSuper
      ) {
        this.start = ({ commands, help, argv = process.argv }) => {
          let nodeJs, startFile, args, options, commandFunction, commandName;
          [nodeJs, startFile, ...args] = argv;
          ({
            options,
            commandFunction,
            commandName,
            args
          } = __webpack_require__(/*! ./Parse */ 13).parseAndSelectCommand(args));
          return commandFunction && !options.help
            ? (options.verbose
                ? log({ command: commandName, options })
                : undefined,
              Promise.then(() => commandFunction(options, args)).then(
                result => result != null && log(result)
              ))
            : log(
                __webpack_require__(/*! ./Help */ 14).getHelp(
                  startFile,
                  help,
                  options.help && commandName
                )
              );
        };
      }));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 10 */
/*!************************************************!*\
  !*** ./source/ArtSuite.Cli/StandardImport.caf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return __webpack_require__(/*! art-standard-lib */ 11).mergeWithSelf(__webpack_require__(/*! art-class-system */ 12));
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 11 */
/*!***********************************************************************************!*\
  !*** external "require('art-standard-lib' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-standard-lib' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 12 */
/*!***********************************************************************************!*\
  !*** external "require('art-class-system' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('art-class-system' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 13 */
/*!***************************************!*\
  !*** ./source/ArtSuite.Cli/Parse.caf ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isFunction", "isClass", "lowerCamelCase", "log", "merge"],
    [global, __webpack_require__(/*! ./StandardImport */ 10)],
    (isFunction, isClass, lowerCamelCase, log, merge) => {
      let isNonClassFunction, Parse;
      isNonClassFunction = function(f) {
        return isFunction(f) && !isClass(f);
      };
      return (Parse = Caf.defClass(class Parse extends Object {}, function(
        Parse,
        classSuper,
        instanceSuper
      ) {
        this.optionRegExp = /^--(.+)$/;
        this.evalJsRegExp = /^js:(.*)$/;
        this.numberRegExp = /^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?$/i;
        this.parseArgs = args => {
          let currentOptionName, commands, currentOption, parsedOptions;
          currentOptionName = "arg";
          commands = currentOption = [];
          Caf.each2(
            args,
            (arg, i) => {
              let option, evalMatch, error;
              return (option = arg.match(this.optionRegExp))
                ? (currentOption = parsedOptions[
                    (currentOptionName = lowerCamelCase(option[1]))
                  ] = [])
                : currentOption.push(
                    (() => {
                      switch (false) {
                        case !this.numberRegExp.test(arg):
                          return arg / 1;
                        case !this.evalJsRegExp.test(arg):
                          evalMatch = arg.match(this.evalJsRegExp);
                          return (() => {
                            try {
                              return eval(evalMatch[1]);
                            } catch (error1) {
                              error = error1;
                              return log.error({
                                evaluationError: {
                                  option: currentOptionName,
                                  source: evalMatch[1],
                                  raw: arg,
                                  error
                                }
                              });
                            }
                          })();
                        default:
                          return arg;
                      }
                    })()
                  );
            },
            null,
            (parsedOptions = {})
          );
          return {
            commands,
            options: Caf.object(parsedOptions, (o, k) =>
              (() => {
                switch (o.length) {
                  case 0:
                    return true;
                  case 1:
                    return o[0];
                  default:
                    return o;
                }
              })()
            )
          };
        };
        this.selectCommand = function(commands, commandNames) {
          let commandName, args, commandFunction;
          [commandName, ...args] = commandNames;
          if (
            !isNonClassFunction(
              (commandFunction =
                commands[(commandName = lowerCamelCase(commandName))])
            )
          ) {
            if (
              !isNonClassFunction(
                (commandFunction = commands[(commandName = commands.default)])
              )
            ) {
              commandFunction = undefined;
              commandName = undefined;
            }
            args = commandNames;
          }
          return merge({
            commandFunction,
            commandName,
            args: args.length > 0 ? args : undefined
          });
        };
        this.parseAndSelectCommand = (commands, args) => {
          let options, commandNames, commandFunction, commandName;
          ({ options, commands: commandNames } = this.parseArgs(args));
          ({ commandFunction, commandName, args } = this.selectCommand(
            commands,
            commandNames
          ));
          return { commandFunction, commandName, args, options };
        };
      }));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 14 */
/*!**************************************!*\
  !*** ./source/ArtSuite.Cli/Help.caf ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
let Caf = __webpack_require__(/*! caffeine-script-runtime */ 2);
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "compactFlatten",
      "dashCase",
      "colors",
      "String",
      "Array",
      "Object",
      "log",
      "Error",
      "lowerCamelCase"
    ],
    [global, __webpack_require__(/*! ./StandardImport */ 10), { colors: __webpack_require__(/*! colors */ 15) }],
    (
      compactFlatten,
      dashCase,
      colors,
      String,
      Array,
      Object,
      log,
      Error,
      lowerCamelCase
    ) => {
      let Help;
      return (Help = Caf.defClass(class Help extends Object {}, function(
        Help,
        classSuper,
        instanceSuper
      ) {
        this.toHelpString = function(...args) {
          return compactFlatten(args).join("\n");
        };
        this.getCommandSummary = function(
          commandName,
          { alias, description, options }
        ) {
          let from, into, temp;
          commandName = dashCase(commandName);
          return this.toHelpString(
            `\n-----------------------\n${Caf.toString(
              colors.bold(
                colors.brightWhite(`commandName: ${Caf.toString(commandName)}`)
              )
            )} ${Caf.toString(alias && `(${Caf.toString(alias)})`)}`,
            description,
            options
              ? "\noptions: " +
                  colors.green(
                    ((from = options),
                    (into = []),
                    from != null
                      ? (() => {
                          for (let k1 in from) {
                            let v, k;
                            v = from[k1];
                            k = k1;
                            temp = !v.advanced ? into.push(k) : undefined;
                          }
                          return temp;
                        })()
                      : undefined,
                    into)
                      .sort()
                      .join(", ")
                  )
              : undefined,
            options
              ? "detailed help: " +
                  colors.green(`${Caf.toString(commandName)} --help`)
              : undefined
          );
        };
        this.getOptionDetails = function(option, details) {
          let description, argument, advanced;
          switch (false) {
            case !Caf.is(details, String):
              description = details;
              break;
            case !(Caf.is(details, Array) && details.length === 2):
              [argument, description] = details;
              break;
            case !Caf.is(details, Object):
              ({ argument, description, advanced } = details);
              break;
            default:
              log.warn({ option, details });
              throw new Error(
                "expecting options details to be string, 2-length array or object"
              );
          }
          return this.toHelpString(
            colors.blue("option: ") +
              colors.green(
                ` --${Caf.toString(option)} ${Caf.toString(
                  argument ? colors.yellow(argument) : undefined
                )}` + (advanced ? colors.grey(" (advanced)") : "")
              ),
            "  " + description + "\n"
          );
        };
        this.getCommandDetails = (command, { alias, description, options }) =>
          this.toHelpString(
            `\n-----------------------\n${Caf.toString(
              colors.bold(
                colors.brightWhite(`Command: ${Caf.toString(command)}`)
              )
            )} ${Caf.toString(alias && `(${Caf.toString(alias)})`)}`,
            description + "\n",
            options &&
              Caf.array(Object.keys(options).sort(), option =>
                this.getOptionDetails(option, options[option])
              )
          );
        this.getHelp = (startFile, help, commandName) => {
          let commands, description, commandSpecificHelp;
          return this.toHelpString(
            `${Caf.toString(startFile)} help:\n\nUsage: ${Caf.toString(
              __webpack_require__(/*! path */ 16).basename(startFile)
            )} command [options]`,
            help != null
              ? (((commands = help.commands), (description = help.description)),
                [
                  description ? `\n${Caf.toString(description)}\n` : undefined,
                  commands
                    ? ((commands = Caf.object(
                        commands,
                        null,
                        null,
                        null,
                        (v, k) => lowerCamelCase(k)
                      )),
                      (commandSpecificHelp =
                        commands[lowerCamelCase(commandName)])
                        ? this.getCommandDetails(
                            commandName,
                            commandSpecificHelp
                          )
                        : Caf.array(Object.keys(commands).sort(), commandName =>
                            this.getCommandSummary(
                              commandName,
                              commands[commandName]
                            )
                          ))
                    : undefined
                ])
              : undefined,
            !(Caf.exists(help) && help.commands)
              ? `Commands: ${Caf.toString(Object.keys(commands).join(", "))}`
              : undefined
          );
        };
      }));
    }
  );
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ 1)(module)))

/***/ }),
/* 15 */
/*!*************************************************************************!*\
  !*** external "require('colors' /* ABC - not inlining fellow NPM *_/)" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('colors' /* ABC - not inlining fellow NPM */);

/***/ }),
/* 16 */
/*!***********************************************************************!*\
  !*** external "require('path' /* ABC - not inlining fellow NPM *_/)" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require('path' /* ABC - not inlining fellow NPM */);

/***/ })
/******/ ]);