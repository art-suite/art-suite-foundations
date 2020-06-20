"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["formattedInspect", "compactFlattenJoin", "isString"],
    [global, require("art-standard-lib")],
    (formattedInspect, compactFlattenJoin, isString) => {
      let maxLength,
        indent,
        format,
        failWithExpectedMessage,
        failWithExpectedMessageBase;
      return {
        maxLength: (maxLength = 80),
        indent: (indent = function(str) {
          return "  " + str.replace(/\n/g, "\n  ");
        }),
        format: (format = function(val) {
          return formattedInspect(val, maxLength);
        }),
        failWithExpectedMessage: (failWithExpectedMessage = function(
          context,
          a,
          verb,
          b,
          verb2,
          c
        ) {
          return failWithExpectedMessageBase(context, a, b, [
            indent(format(a)),
            verb,
            indent(format(b)),
            verb2 ? [verb2, indent(format(c))] : undefined
          ]);
        }),
        failWithExpectedMessageBase: (failWithExpectedMessageBase = function(
          context,
          a,
          b,
          lines
        ) {
          return require("chai").assert.fail(
            a,
            b,
            compactFlattenJoin("\n\n", [
              context
                ? isString(context)
                  ? context
                  : formattedInspect(context)
                : undefined,
              "expected",
              lines
            ]) + "\n"
          );
        })
      };
    }
  );
});
