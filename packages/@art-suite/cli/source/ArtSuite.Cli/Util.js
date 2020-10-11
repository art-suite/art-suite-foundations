"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "lowerCamelCase",
      "present",
      "Number",
      "repeat",
      "ansiWordwrap",
      "min",
      "process",
      "log",
      "isFunction",
      "Error",
      "formattedInspect",
      "mergeInto",
    ],
    [
      global,
      require("./StandardImport"),
      { ansiWordwrap: require("ansi-wordwrap") },
    ],
    (
      lowerCamelCase,
      present,
      Number,
      repeat,
      ansiWordwrap,
      min,
      process,
      log,
      isFunction,
      Error,
      formattedInspect,
      mergeInto
    ) => {
      let normalizeCommandName, wrap, wrapProse;
      return {
        normalizeCommandName: (normalizeCommandName = lowerCamelCase),
        wrap: (wrap = function (text, indent, maxWidth = 160) {
          let m, res;
          return present(text)
            ? (Caf.is(indent, Number) && indent > 0
                ? (indent = repeat(" ", indent))
                : undefined,
              /\n/.test(text)
                ? Caf.array(text.split("\n"), (line) =>
                    wrap(line, indent, maxWidth)
                  ).join("\n")
                : ((m = text.match(/^ +/))
                    ? (indent = `${Caf.toString(indent)}${Caf.toString(m[0])}`)
                    : undefined,
                  (res = ansiWordwrap(text, {
                    width: min(
                      maxWidth,
                      process.stdout.columns - 1 - (indent ? indent.length : 0)
                    ),
                  })),
                  (Caf.exists(indent) && indent.length) > 0
                    ? indent + res.replace(/\n/g, `\n${Caf.toString(indent)}`)
                    : res))
            : undefined;
        }),
        wrapProse: (wrapProse = function (text, indent) {
          return wrap(text, indent, 100);
        }),
        normalizeCommands: function (commands, help) {
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
        },
      };
    }
  );
});
