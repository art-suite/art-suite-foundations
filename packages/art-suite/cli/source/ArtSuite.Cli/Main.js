"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["normalizeCommands", "Promise", "process", "log", "merge"],
    [global, require("./StandardImport"), require("./Util")],
    (normalizeCommands, Promise, process, log, merge) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function(
        Main,
        classSuper,
        instanceSuper
      ) {
        this.start = ({
          commands,
          default: _default,
          description,
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
          } = require("./Parse").parseAndSelectCommand(
            (commands = normalizeCommands(commands, help)),
            args,
            _default
          ));
          return Promise.then(() =>
            commandFunction && !options.help
              ? (options.verbose
                  ? output(
                      merge({
                        options,
                        command: commandName,
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
                  { commands, description },
                  commandName
                )
          ).tap(result => result != null && output(result));
        };
      }));
    }
  );
});
