"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    (ArtCli) => {
      return Caf.importInvoke(
        ["describe", "test", "assert", "normalizeCommands"],
        [parentImports, ArtCli.Parse, ArtCli.Util],
        (describe, test, assert, normalizeCommands) => {
          return describe({
            normalizeCommands: function () {
              test("bad commands: string instead of function 1", () =>
                assert.rejects(() => normalizeCommands({ foo: "hi" })));
              return test("bad commands: string instead of function 2", () =>
                assert.rejects(() =>
                  normalizeCommands({ foo: { run: "hi" } })
                ));
            },
          });
        }
      );
    }
  );
});
