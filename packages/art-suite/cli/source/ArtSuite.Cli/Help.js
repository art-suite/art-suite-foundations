"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "wrap",
      "compactFlatten",
      "colors",
      "dashCase",
      "wrapProse",
      "String",
      "Array",
      "Object",
      "log",
      "Error",
      "objectHasKeys",
      "lowerCamelCase"
    ],
    [
      global,
      require("./StandardImport"),
      require("./Util"),
      { colors: require("colors") }
    ],
    (
      BaseClass,
      wrap,
      compactFlatten,
      colors,
      dashCase,
      wrapProse,
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
          return wrap(
            compactFlatten(args)
              .join("\n")
              .trim()
          );
        };
        this.classGetter({
          coloredCliName: function() {
            return colors.bold(colors.blue(this.cliName));
          }
        });
        this.getCommandSummary = function(
          commandName,
          { description, options }
        ) {
          commandName = dashCase(commandName);
          return this.toHelpString(
            this.getCommandUsage(commandName, options),
            wrapProse(description, 2)
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
              advanced ? colors.grey("(ADVANCED)") : undefined
            ]).join(" "),
            wrapProse(description, 4)
          );
        };
        this.getCommandUsage = (command, options) => {
          command = dashCase(command);
          return compactFlatten([
            this.coloredCliName,
            colors.bold(colors.brightWhite(command)),
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
          { description, options, examples }
        ) => {
          let keys, from, into, to, i1, temp;
          return this.toHelpString(
            `usage: ${Caf.toString(this.getCommandUsage(command, options))}`,
            wrapProse(description),
            "",
            options ? colors.blue("options:\n") : undefined,
            options
              ? ((keys = Object.keys(options).sort()),
                compactFlatten([
                  Caf.array(
                    keys,
                    option => this.getOptionDetails(option, options[option]),
                    option =>
                      options[option].required && !options[option].advanced
                  ),
                  Caf.array(
                    keys,
                    option => this.getOptionDetails(option, options[option]),
                    option =>
                      !options[option].required && !options[option].advanced
                  ),
                  Caf.array(
                    keys,
                    option => this.getOptionDetails(option, options[option]),
                    option => options[option].advanced
                  )
                ]).join("\n\n"))
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
                            wrapProse(description, 4),
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
            wrapProse(description)
          ]).join("\n\n") + "\n";
      }));
    }
  );
});
