"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    ArtCli => {
      return Caf.importInvoke(
        ["describe", "test", "assert", "normalizeCommands"],
        [parentImports, ArtCli.Parse, ArtCli.Util],
        (describe, test, assert, normalizeCommands) => {
          return describe({
            normalizeCommands: function() {
              test("bad commands: class instead of function 1", () =>
                assert.rejects(() => {
                  let Bar;
                  return normalizeCommands({
                    foo: (Bar = Caf.defClass(class Bar extends Object {}))
                  });
                }));
              return test("bad commands: class instead of function 2", () =>
                assert.rejects(() => {
                  let Bar;
                  return normalizeCommands({
                    foo: {
                      run: (Bar = Caf.defClass(class Bar extends Object {}))
                    }
                  });
                }));
            }
          });
        }
      );
    }
  );
});
