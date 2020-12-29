"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "isPlainObject",
      "Object",
      "objectName",
      "ansiSafeStringLength",
      "escapeJavascriptString",
    ],
    [
      global,
      require("../TypesExtended"),
      require("../Ansi"),
      require("../StringExtensions"),
    ],
    (
      isPlainObject,
      Object,
      objectName,
      ansiSafeStringLength,
      escapeJavascriptString
    ) => {
      let valueShouldBeOnOwnLine, barePropKeyRegExp, formattedInspectObject;
      valueShouldBeOnOwnLine = function (value) {
        return (
          value.length > 100 ||
          !value.match(
            /^([^,:()\[\]'"]+|\(.*\)|(\w+\s)?\{.*\}|\".*\"|\'.*\'|\[.*\])$/
          )
        );
      };
      barePropKeyRegExp = /^[-~!@\#$%^&*_+=|\\<>?\/.$\w\u007f-\uffff]+$/;
      return {
        formattedInspectObject: (formattedInspectObject = function (
          m,
          maxLineLength,
          options,
          formattedInspectRecursive
        ) {
          let colorize,
            newLineWithIndent,
            indent,
            inspectedLength,
            notPlainObject,
            plainObject,
            prototype,
            forceMultilineOutput,
            shouldBeOnOwnLine,
            keyCount,
            inspectedValues,
            objectStart,
            index,
            finalInspectedValues,
            from,
            into,
            temp,
            from1,
            into1,
            to,
            i,
            temp1;
          colorize = options.colorize;
          newLineWithIndent = options.newLineWithIndent;
          indent = options.indent;
          inspectedLength = 0;
          if ((notPlainObject = !(plainObject = isPlainObject(m)))) {
            prototype = Object.getPrototypeOf(m);
          }
          forceMultilineOutput = false;
          shouldBeOnOwnLine = false;
          keyCount = 0;
          inspectedValues =
            ((from = m),
            (into = []),
            from != null
              ? (() => {
                  for (let k in from) {
                    let value, key, inspected;
                    value = from[k];
                    key = k;
                    temp =
                      plainObject || m.hasOwnProperty(key)
                        ? into.push(
                            (keyCount++,
                            (inspected = formattedInspectRecursive(
                              value,
                              maxLineLength - indent.length,
                              options
                            )),
                            /\n/.test(inspected)
                              ? (!/^\[\]/.test(inspected)
                                  ? (inspected =
                                      newLineWithIndent +
                                      inspected.replace(
                                        /\n/g,
                                        newLineWithIndent
                                      ))
                                  : undefined,
                                !/\n\s*$/.test(inspected)
                                  ? (inspected += "\n")
                                  : undefined)
                              : ansiSafeStringLength(inspected) >
                                maxLineLength - (key.length + 2)
                              ? (inspected = `${Caf.toString(
                                  newLineWithIndent
                                )}${Caf.toString(inspected)}\n`)
                              : undefined,
                            !barePropKeyRegExp.test(key)
                              ? (key = escapeJavascriptString(key))
                              : undefined,
                            (inspectedLength +=
                              ansiSafeStringLength(inspected) + key.length + 2),
                            forceMultilineOutput ||
                              (forceMultilineOutput = shouldBeOnOwnLine),
                            (shouldBeOnOwnLine = valueShouldBeOnOwnLine(
                              inspected
                            )),
                            [key, inspected, value])
                          )
                        : undefined;
                  }
                  return temp;
                })()
              : undefined,
            into);
          objectStart = colorize.grey(
            notPlainObject
              ? `${Caf.toString(objectName(m))} {}`
              : (objectStart = "{}")
          );
          return keyCount === 0
            ? objectStart
            : ((index = 0),
              (finalInspectedValues =
                ((from1 = inspectedValues),
                (into1 = []),
                from1 != null
                  ? ((to = from1.length),
                    (i = 0),
                    (() => {
                      while (i < to) {
                        let k, v, value;
                        [k, v, value] = from1[i];
                        into1.push(
                          `${Caf.toString(
                            colorize.blue(`${Caf.toString(k)}:`)
                          )}\t${Caf.toString(v)}`
                        );
                        temp1 = i++;
                      }
                      return temp1;
                    })())
                  : undefined,
                into1)),
              (notPlainObject ? `${Caf.toString(objectStart)} ` : "") +
                finalInspectedValues.join(
                  forceMultilineOutput ||
                    inspectedLength + (inspectedValues.length - 1) * 2 >
                      maxLineLength
                    ? notPlainObject
                      ? newLineWithIndent
                      : "\n"
                    : ",\t"
                ));
        }),
      };
    }
  );
});
