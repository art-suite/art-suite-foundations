"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["lowerCamelCase", "isFunction", "isClass", "log", "Error", "mergeInto"],
    [global, require("./StandardImport")],
    (lowerCamelCase, isFunction, isClass, log, Error, mergeInto) => {
      let isNonClassFunction, normalizeCommandName;
      return {
        isNonClassFunction: (isNonClassFunction = function(f) {
          return isFunction(f) && !isClass(f);
        }),
        normalizeCommandName: (normalizeCommandName = lowerCamelCase),
        normalizeCommands: function(commands, help) {
          let description;
          commands = Caf.object(
            commands,
            (v, k) =>
              isNonClassFunction(v)
                ? { run: v }
                : !isNonClassFunction(Caf.exists(v) && v.run)
                ? (() => {
                    throw new Error(
                      "Values in the commands object must either be a Function or an object with at least: {run: Function}."
                    );
                  })()
                : v,
            null,
            null,
            (v, k) => normalizeCommandName(k)
          );
          if (help != null) {
            log.warn(
              "ArtSuite/cli: 'help' option is deprecated. Use the new, improved commands option."
            );
            description != null
              ? description
              : (description = help.description);
            Caf.each2(help.commands, (commandHelp, rawK) => {
              let k;
              k = normalizeCommandName(rawK);
              return commands[k]
                ? mergeInto(commands[k], commandHelp)
                : (() => {
                    throw new Error(
                      `No matching command for help: commands: ${Caf.toString(
                        rawK
                      )}: {}}`
                    );
                  })();
            });
          }
          return commands;
        }
      };
    }
  );
});
