"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    (ArtCli) => {
      return Caf.importInvoke(
        ["test", "start", "assert", "stripAnsi"],
        [parentImports, ArtCli.Main],
        (test, start, assert, stripAnsi) => {
          let expectedGoOutput;
          expectedGoOutput = "myCommand-myCommand-myCommand";
          test("start + myCommand", function () {
            let myCommandRan;
            myCommandRan = false;
            return start({
              commands: { myCommand: () => (myCommandRan = true) },
              argv: ["nodeJs", "startFile", "myCommand"],
              output: assert.true,
            }).then((out) => {
              assert.true(out);
              return assert.eq({ myCommandRan }, { myCommandRan: true });
            });
          });
          test("start + myCommand --verbose", function () {
            let myCommandRan;
            myCommandRan = false;
            return start({
              commands: { myCommand: () => (myCommandRan = true) },
              argv: ["nodeJs", "startFile", "myCommand", "anArg", "--verbose"],
              output: assert.jsTrue,
            }).then((out) => {
              assert.true(out);
              return assert.eq({ myCommandRan }, { myCommandRan: true });
            });
          });
          test("start + myCommand + --help", function () {
            let myCommandRan, description, more;
            myCommandRan = false;
            return start({
              commands: {
                myCommand: {
                  description: (description = "xyz123 description"),
                  options: { more: (more = "abc123 --more description") },
                  run: () => (myCommandRan = true),
                },
              },
              argv: ["nodeJs", "startFile", "myCommand", "--help"],
              output: assert.jsTrue,
            })
              .then(stripAnsi)
              .then((out) => {
                assert.false(myCommandRan);
                assert.match(out, description);
                return assert.match(out, more);
              });
          });
          test("start with no args", function () {
            let myCommandRan;
            myCommandRan = false;
            return start({
              commands: { myCommand: () => (myCommandRan = true) },
              argv: ["nodeJs", "startFile"],
              output: () => {},
            })
              .then(stripAnsi)
              .then((output) => {
                assert.match(output, "startFile my-command");
                return assert.eq({ myCommandRan }, { myCommandRan: false });
              });
          });
          test("start with no args and default", function () {
            let myCommandOutput;
            myCommandOutput = undefined;
            return start({
              commands: {
                myCommand: () => (myCommandOutput = expectedGoOutput),
              },
              default: "myCommand",
              argv: ["nodeJs", "startFile"],
              output: assert.jsTrue,
            })
              .then(stripAnsi)
              .then((output) => {
                assert.match(output, expectedGoOutput);
                return assert.eq(
                  { myCommandOutput },
                  { myCommandOutput: expectedGoOutput }
                );
              });
          });
          return test("start + noGo", function () {
            let myCommandRan;
            myCommandRan = false;
            return start({
              commands: { myCommand: () => (myCommandRan = true) },
              argv: ["nodeJs", "startFile", "noGo"],
              output: () => {},
            })
              .then(stripAnsi)
              .then((output) => {
                assert.match(output, "startFile my-command");
                return assert.eq({ myCommandRan }, { myCommandRan: false });
              });
          });
        }
      );
    }
  );
});
