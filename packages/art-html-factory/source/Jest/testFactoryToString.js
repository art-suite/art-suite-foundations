"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["String", "Error", "test", "assert"],
    [global, require("./StandardImport")],
    (String, Error, test, assert) => {
      let testFactoryToString;
      return (testFactoryToString = function(...args) {
        let from, into, to, i1, temp;
        return (
          (from = args),
          (into = from),
          from != null
            ? ((to = from.length),
              (i1 = 0),
              (() => {
                while (i1 < to) {
                  let nodeF, i, expectedOutput;
                  nodeF = from[i1];
                  i = i1;
                  expectedOutput = args[i + 1];
                  if (!Caf.is(expectedOutput, String)) {
                    throw new Error(
                      `Expecting a string at index ${Caf.toString(
                        i + 1
                      )}! Make sure to pass an even number of pairs alternating between nodes and strings`
                    );
                  }
                  test(expectedOutput.replace(/\n/g, "\\n"), () =>
                    assert.eq(nodeF().toString(), expectedOutput, {
                      FactoryToStringTestNumber: 1 + i / 2
                    })
                  );
                  temp = i1 += 2;
                }
                return temp;
              })())
            : undefined,
          into
        );
      });
    }
  );
});
