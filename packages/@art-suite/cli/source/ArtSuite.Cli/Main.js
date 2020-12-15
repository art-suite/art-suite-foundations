"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["log", "process", "normalizeCommands", "Promise", "merge"],
    [global, require("./StandardImport"), require("./Util")],
    (log, process, normalizeCommands, Promise, merge) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function (
        Main,
        classSuper,
        instanceSuper
      ) {
        this.start = ({
          commands,
          default: _default,
          description,
          help,
          argv,
          output,
        }) => {
          let nodeJs, startFile, args, options, commandFunction, commandName;
          output != null ? output : (output = log.unquoted);
          argv != null ? argv : (argv = process.argv);
          [nodeJs, startFile, ...args] = argv;
          ({
            options,
            commandFunction,
            commandName,
            args,
          } = require("./Parse").parseAndSelectCommand(
            (commands = normalizeCommands(commands, help)),
            args,
            _default
          ));
          return Promise.then(() =>
            commandFunction && !options.help
              ? (options.verbose
                  ? output({
                      "parsed-command-line": merge({
                        command: commandName,
                        args:
                          (Caf.exists(args) && args.length) > 0
                            ? args
                            : undefined,
                        options,
                      }),
                    })
                  : undefined,
                commandFunction(options, args))
              : require("./Help").getHelp(
                  startFile,
                  { commands, description },
                  commandName
                )
          ).tap((result) => result != null && output(result));
        };
      }));
    }
  );
});
