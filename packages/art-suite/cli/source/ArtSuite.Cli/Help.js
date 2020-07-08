"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "compactFlatten",
      "colors",
      "dashCase",
      "present",
      "String",
      "Array",
      "Object",
      "log",
      "Error",
      "objectHasKeys",
      "lowerCamelCase"
    ],
    [global, require("./StandardImport"), { colors: require("colors") }],
    (
      BaseClass,
      compactFlatten,
      colors,
      dashCase,
      present,
      String,
      Array,
      Object,
      log,
      Error,
      objectHasKeys,
      lowerCamelCase
    ) => {
      let Help;
      return (Help = Caf.defClass(class Help extends BaseClass {}, function(
        Help,
        classSuper,
        instanceSuper
      ) {
        this.classProperty("cliName");
        this.toHelpString = function(...args) {
          return compactFlatten(args)
            .join("\n")
            .trim();
        };
        this.classGetter({
          coloredCliName: function() {
            return colors.bold(colors.blue(this.cliName));
          }
        });
        this.getCommandSummary = function(
          commandName,
          { alias, description, options }
        ) {
          commandName = dashCase(commandName);
          return this.toHelpString(
            this.getCommandUsage(commandName, alias, options),
            present(description) ? `  ${Caf.toString(description)}` : undefined
          );
        };
        this.getOptionDetails = function(option, details) {
          let description, argument, advanced, required;
          switch (false) {
            case !Caf.is(details, String):
              description = details;
              break;
            case !(Caf.is(details, Array) && details.length === 2):
              [argument, description] = details;
              break;
            case !Caf.is(details, Object):
              ({ argument, description, advanced, required } = details);
              break;
            default:
              log.warn({ option, details });
              throw new Error(
                "expecting options details to be string, 2-length array or object"
              );
          }
          return this.toHelpString(
            compactFlatten([
              colors.green(`  --${Caf.toString(option)}`),
              argument ? colors.yellow(argument) : undefined,
              required ? colors.brightWhite("(REQUIRED)") : undefined,
              advanced ? colors.grey("(advanced)") : undefined
            ]).join(" "),
            "    " + description
          );
        };
        this.getCommandUsage = (command, alias, options) => {
          command = dashCase(command);
          return compactFlatten([
            this.coloredCliName,
            colors.bold(colors.brightWhite(command)),
            alias ? `(${Caf.toString(alias)})` : undefined,
            this.getOptionsList(
              Caf.object(options, null, o => o.required),
              true
            ),
            this.getOptionsList(Caf.object(options, null, o => !o.required))
          ]).join(" ");
        };
        this.getOptionsList = (options, required) => {
          let l, from, into, to, i, temp;
          return objectHasKeys(options)
            ? ((l = ((from = Object.keys(options).sort()),
              (into = []),
              from != null
                ? ((to = from.length),
                  (i = 0),
                  (() => {
                    while (i < to) {
                      let k;
                      k = from[i];
                      if (!options[k].advanced) {
                        into.push(colors.green(`--${Caf.toString(k)}`));
                      }
                      temp = i++;
                    }
                    return temp;
                  })())
                : undefined,
              into)
                .sort()
                .join(required ? " " : ", ")),
              required ? l : `[${Caf.toString(l)}]`)
            : undefined;
        };
        this.getCommandDetails = (
          command,
          { alias, description, options, examples }
        ) => {
          let from, into, to, i1, temp;
          return this.toHelpString(
            `usage: ${Caf.toString(
              this.getCommandUsage(command, alias, options)
            )}`,
            present(description) ? `\n${Caf.toString(description)}` : undefined,
            "",
            options ? colors.blue("options:\n") : undefined,
            options
              ? Caf.array(Object.keys(options).sort(), option =>
                  this.getOptionDetails(option, options[option])
                ).join("\n\n")
              : undefined,
            (Caf.exists(examples) && examples.length) > 0
              ? colors.blue("\nexamples:\n")
              : undefined,
            (Caf.exists(examples) && examples.length) > 0
              ? ((from = examples),
                (into = []),
                from != null
                  ? ((to = from.length),
                    (i1 = 0),
                    (() => {
                      while (i1 < to) {
                        let example, i;
                        example = from[i1];
                        i = i1;
                        into.push(
                          ((description = examples[i + 1]),
                          [
                            `  ${Caf.toString(
                              this.coloredCliName
                            )} ${Caf.toString(colors.brightWhite(command))} ` +
                              (Caf.is(example, Object)
                                ? Caf.array(
                                    example,
                                    (value, option) =>
                                      colors.green(
                                        `--${Caf.toString(option)}`
                                      ) +
                                      (value !== undefined && value !== true
                                        ? colors.yellow(" " + value)
                                        : "")
                                  ).join(" ")
                                : example),
                            "    " + description.replace(/\n/g, "\n    "),
                            ""
                          ])
                        );
                        temp = i1 += 2;
                      }
                      return temp;
                    })())
                  : undefined,
                into)
              : undefined
          );
        };
        this.getHelp = (startFile, help, commandName) => {
          let description, commands, commandSpecificHelp;
          if (help != null) {
            description = help.description;
            commands = Caf.object(help.commands, null, null, null, (v, k) =>
              lowerCamelCase(k)
            );
          }
          this.cliName = require("path").basename(startFile);
          commandSpecificHelp =
            Caf.exists(commands) && commands[lowerCamelCase(commandName)];
          return this.toHelpString(
            !commandSpecificHelp ? this.getGeneralInfo(description) : undefined,
            commands
              ? ((commands = Caf.object(commands, null, null, null, (v, k) =>
                  lowerCamelCase(k)
                )),
                commandSpecificHelp
                  ? this.getCommandDetails(commandName, commandSpecificHelp)
                  : Caf.array(Object.keys(commands).sort(), commandName =>
                      this.getCommandSummary(commandName, commands[commandName])
                    ).join("\n\n"))
              : undefined
          );
        };
        this.getGeneralInfo = description =>
          compactFlatten([
            `usage: ${Caf.toString(this.coloredCliName)} ${Caf.toString(
              colors.brightWhite("command")
            )} ${Caf.toString(colors.blue("[options]"))}` +
              "\nhelp: " +
              this.coloredCliName +
              colors.brightWhite(" command") +
              colors.green(" --help"),
            description
          ]).join("\n\n") + "\n";
      }));
    }
  );
});
