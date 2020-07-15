"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "lowerCamelCase",
      "log",
      "isFunction",
      "Error",
      "formattedInspect",
      "mergeInto"
    ],
    [global, require("./StandardImport")],
    (lowerCamelCase, log, isFunction, Error, formattedInspect, mergeInto) => {
      let normalizeCommandName;
      return {
        normalizeCommandName: (normalizeCommandName = lowerCamelCase),
        normalizeCommands: function(commands, help) {
          let description;
          commands = Caf.object(
            commands,
            (v, k) =>
              isFunction(v)
                ? { run: v }
                : !isFunction(Caf.exists(v) && v.run)
                ? (() => {
                    throw new Error(
                      `${Caf.toString(
                        k
                      )}'s run value is not a plain function. Details:\n\n${Caf.toString(
                        formattedInspect({ [k]: v })
                      )}`
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
