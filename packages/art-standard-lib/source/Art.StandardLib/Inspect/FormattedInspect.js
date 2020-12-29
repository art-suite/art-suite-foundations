"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "alignTabs",
      "formattedInspectString",
      "isObject",
      "isInspectableArray",
      "formattedInspectArray",
      "isString",
      "isFunction",
      "formattedInspectObject",
      "Object",
      "isNumber",
      "isPlainObject",
      "console",
      "Error",
      "postWhitespaceFormatting",
      "toInspectedObjects",
    ],
    [
      global,
      require("../TypesExtended"),
      require("./InspectedObjects"),
      require("./FormattedInspectObject"),
      require("./FormattedInspectString"),
      require("./FormattedInspectArray"),
      require("./AlignTabs"),
    ],
    (
      alignTabs,
      formattedInspectString,
      isObject,
      isInspectableArray,
      formattedInspectArray,
      isString,
      isFunction,
      formattedInspectObject,
      Object,
      isNumber,
      isPlainObject,
      console,
      Error,
      postWhitespaceFormatting,
      toInspectedObjects
    ) => {
      let inspecting,
        formattedInspectRecursive,
        formattedInspectRecursiveWrapper,
        colorNames,
        colorizeFunctions,
        identity,
        passThroughColorizeFunctions,
        typeOf,
        failsafeInspect;
      inspecting = [];
      formattedInspectRecursive = function (m, maxLineLength, options) {
        let out;
        return isObject(m) && Caf.in(m, inspecting)
          ? "<<< back reference"
          : (inspecting.push(m),
            (out = (() => {
              switch (false) {
                case !isInspectableArray(m):
                  return formattedInspectArray(
                    m,
                    maxLineLength,
                    options,
                    formattedInspectRecursive
                  );
                case !isString(m):
                  return formattedInspectString(m, options);
                case !isFunction(Caf.exists(m) && m.inspect):
                  return options.colorize.yellow(m.inspect());
                case !isObject(m):
                  return formattedInspectObject(
                    m,
                    maxLineLength,
                    options,
                    formattedInspectRecursive
                  );
                default:
                  return options.colorize.yellow("" + m);
              }
            })()),
            inspecting.pop(),
            out);
      };
      formattedInspectRecursiveWrapper = function (m, maxArrayLength, options) {
        let out, error;
        inspecting = [];
        return (() => {
          try {
            out = formattedInspectRecursive(m, maxArrayLength, options);
            inspecting = null;
            return out;
          } catch (error1) {
            error = error1;
            inspecting = null;
            return (() => {
              throw error;
            })();
          }
        })();
      };
      colorNames = ["red", "yellow", "green", "blue", "grey"];
      colorizeFunctions = Caf.object(
        colorNames,
        (c) =>
          function (str) {
            let temp;
            return (temp = str[c]) != null ? temp : str;
          }
      );
      identity = function (s) {
        return s;
      };
      passThroughColorizeFunctions = Caf.object(colorNames, () => identity);
      typeOf = eval("(a) => typeof a");
      return (module.exports = {
        alignTabs,
        formattedInspectString,
        failsafeInspect: (failsafeInspect = function (toInspect) {
          let base;
          return (
            `typeof: ${Caf.toString(typeOf(toInspect))}\n` +
            `constructor: ${Caf.toString(
              Caf.exists(toInspect) &&
                toInspect.constructor &&
                Caf.exists(toInspect) &&
                Caf.exists((base = toInspect.constructor)) &&
                base.name
            )}\n` +
            (() => {
              switch (false) {
                case !isInspectableArray(toInspect):
                  return `length: ${Caf.toString(
                    toInspect.length
                  )}\njoined: [${Caf.toString(toInspect.join(", "))}]`;
                case !(toInspect != null && typeOf(toInspect === "object")):
                  return `keys: ${Caf.toString(
                    Object.keys(toInspect).join(", ")
                  )}`;
                default:
                  return `toString: ${Caf.toString(toInspect)}`;
              }
            })()
          );
        }),
        formattedInspect: function (toInspect, options = {}) {
          let maxLineLength,
            indent,
            unquoted,
            colorizeEnabled,
            maxArrayLength,
            error,
            out,
            base,
            base1;
          return (() => {
            try {
              if (isNumber(options)) {
                maxLineLength = options;
              } else {
                if (isPlainObject(options)) {
                  indent = options.indent;
                  unquoted = options.unquoted;
                  colorizeEnabled = options.color;
                  maxLineLength = options.maxLineLength;
                  maxArrayLength = options.maxArrayLength;
                } else {
                  console.error({ invalid: { options } });
                  throw new Error(
                    `invalid options object type: ${Caf.toString(
                      typeOf(options)
                    )}`
                  );
                }
              }
              maxLineLength != null
                ? maxLineLength
                : (maxLineLength =
                    (Caf.exists((base = global.process)) &&
                      Caf.exists((base1 = base.stdout)) &&
                      base1.columns) ||
                    80);
              maxArrayLength != null ? maxArrayLength : (maxArrayLength = 100);
              indent != null ? indent : (indent = "  ");
              return postWhitespaceFormatting(
                maxLineLength,
                formattedInspectRecursiveWrapper(
                  toInspectedObjects(toInspect),
                  maxLineLength,
                  {
                    unquoted,
                    indent,
                    maxLineLength,
                    maxArrayLength,
                    newLineWithIndent: `\n${Caf.toString(indent)}`,
                    colorize: colorizeEnabled
                      ? colorizeFunctions
                      : passThroughColorizeFunctions,
                  }
                )
              ).replace(/\n\n$/, "\n");
            } catch (error1) {
              error = error1;
              out = `Error in formattedInspect: ${Caf.toString(
                error
              )}\n${Caf.toString(failsafeInspect(toInspect))}`;
              console.error(out, { error, toInspect, options });
              return out;
            }
          })();
        },
      });
    }
  );
});
