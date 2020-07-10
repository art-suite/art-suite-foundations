"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "process", "log", "merge", "objectHasKeys"],
    [global, require("./StandardImport")],
    (Promise, process, log, merge, objectHasKeys) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function(
        Main,
        classSuper,
        instanceSuper
      ) {
        this.start = ({
          commands,
          help,
          argv = process.argv,
          output = log
        }) => {
          let nodeJs, startFile, args, options, commandFunction, commandName;
          [nodeJs, startFile, ...args] = argv;
          ({
            options,
            commandFunction,
            commandName,
            args
          } = require("./Parse").parseAndSelectCommand(commands, args));
          return Promise.then(() =>
            commandFunction && !options.help
              ? (options.verbose
                  ? output(
                      merge({
                        command: commandName,
                        options: objectHasKeys(options) ? options : undefined,
                        args:
                          (Caf.exists(args) && args.length) > 0
                            ? args
                            : undefined
                      })
                    )
                  : undefined,
                commandFunction(options, args))
              : require("./Help").getHelp(
                  startFile,
                  help != null
                    ? help
                    : {
                        commands: Caf.object(commands, () => {
                          return {};
                        })
                      },
                  Caf.exists(options) && options.help ? commandName : undefined
                )
          ).tap(result => result != null && output(result));
        };
      }));
    }
  );
});
