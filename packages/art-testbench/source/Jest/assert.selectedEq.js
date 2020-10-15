"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert"],
    [global, require("./StandardImport")],
    (test, assert) => {
      test("only requires partial match", function () {
        return assert.selectedEq({ foo: 1 }, { foo: 1, bar: 2 });
      });
      return test("fails correctly", function () {
        return assert.selectedEq({ foo: 2 }, { foo: 1, bar: 2 });
      });
    }
  );
});
