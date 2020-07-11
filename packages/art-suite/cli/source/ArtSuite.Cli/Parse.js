"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isFunction",
      "isClass",
      "lowerCamelCase",
      "JSON",
      "log",
      "Error",
      "merge"
    ],
    [global, require("./StandardImport")],
    (isFunction, isClass, lowerCamelCase, JSON, log, Error, merge) => {
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
        this.typedArgumentRegExp = /^([a-z]+):(.*)$/;
        this.numberRegExp = /^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?$/i;
        this.parseArgs = args => {
          let currentOptionName, commands, currentOption, parsedOptions;
          currentOptionName = "argument";
          commands = currentOption = [];
          Caf.each2(
            args,
            (argument, i) => {
              let option, typedMatch, __, type, value, error;
              return (option = argument.match(this.optionRegExp))
                ? (currentOption = parsedOptions[
                    (currentOptionName = lowerCamelCase(option[1]))
                  ] = [])
                : currentOption.push(
                    (() => {
                      switch (false) {
                        case !(argument === "true"):
                          return true;
                        case !(argument === "false"):
                          return false;
                        case !this.numberRegExp.test(argument):
                          return argument / 1;
                        case !(typedMatch = this.typedArgumentRegExp.exec(
                          argument
                        )):
                          [__, type, value] = typedMatch;
                          return (() => {
                            switch (type) {
                              case "string":
                                return value;
                              case "json":
                                return (() => {
                                  try {
                                    return JSON.parse(value);
                                  } catch (error1) {
                                    error = error1;
                                    log.error({
                                      JsonParseError: {
                                        option: currentOptionName,
                                        type,
                                        value,
                                        argument,
                                        error: error.message
                                      }
                                    });
                                    return (() => {
                                      throw error;
                                    })();
                                  }
                                })();
                              case "js":
                                return (() => {
                                  try {
                                    return eval(value);
                                  } catch (error2) {
                                    error = error2;
                                    error.info = {
                                      JavaScriptEvalError: {
                                        option: currentOptionName,
                                        type,
                                        value,
                                        argument
                                      }
                                    };
                                    return (() => {
                                      throw error;
                                    })();
                                  }
                                })();
                              default:
                                return (() => {
                                  throw new Error(
                                    `invalid data-type '${Caf.toString(
                                      type
                                    )}:' in: ${Caf.toString(
                                      argument
                                    )}\nExpecting: 'string:' or 'js:'`
                                  );
                                })();
                            }
                          })();
                        default:
                          return argument;
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
        this.getCommand = function(commands, commandName) {
          let c, temp;
          c = commands[lowerCamelCase(commandName)];
          c = (temp = Caf.exists(c) && c.action) != null ? temp : c;
          return isNonClassFunction(c) ? c : undefined;
        };
        this.selectCommand = (commands, commandNames) => {
          let commandName, args, commandFunction;
          [commandName, ...args] = commandNames;
          commands = Caf.object(commands, null, null, null, (v, k) =>
            lowerCamelCase(k)
          );
          if (!(commandFunction = this.getCommand(commands, commandName))) {
            if (
              !(commandFunction = this.getCommand(
                commands,
                (commandName = commands.default)
              ))
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
          return {
            commandFunction,
            commandName,
            options:
              (Caf.exists(args) && args.length) > 0
                ? merge(options, { args })
                : options
          };
        };
      }));
    }
  );
});
