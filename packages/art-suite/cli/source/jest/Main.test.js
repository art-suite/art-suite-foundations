"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    ArtCli => {
      return Caf.importInvoke(
        ["test", "start", "assert", "stripAnsi"],
        [parentImports, ArtCli.Main],
        (test, start, assert, stripAnsi) => {
          let expectedGoOutput;
          expectedGoOutput = "go-go-go";
          test("start + go", function() {
            let goRan;
            goRan = false;
            return start({
              commands: { go: () => (goRan = true) },
              argv: ["nodeJs", "startFile", "go"],
              output: assert.true
            }).then(out => {
              assert.true(out);
              return assert.eq({ goRan }, { goRan: true });
            });
          });
          test("start with no args", function() {
            let goRan;
            goRan = false;
            return start({
              commands: { go: () => (goRan = true) },
              argv: ["nodeJs", "startFile"],
              output: () => {}
            })
              .then(stripAnsi)
              .then(output => {
                assert.match(output, "startFile go");
                return assert.eq({ goRan }, { goRan: false });
              });
          });
          test("start with no args and default", function() {
            let goOutput;
            goOutput = undefined;
            return start({
              commands: {
                default: "go",
                go: () => (goOutput = expectedGoOutput)
              },
              argv: ["nodeJs", "startFile"],
              output: assert.jsTrue
            })
              .then(stripAnsi)
              .then(output => {
                assert.match(output, expectedGoOutput);
                return assert.eq({ goOutput }, { goOutput: expectedGoOutput });
              });
          });
          return test("start + noGo", function() {
            let goRan;
            goRan = false;
            return start({
              commands: { go: () => (goRan = true) },
              argv: ["nodeJs", "startFile", "noGo"],
              output: () => {}
            })
              .then(stripAnsi)
              .then(output => {
                assert.match(output, "startFile go");
                return assert.eq({ goRan }, { goRan: false });
              });
          });
        }
      );
    }
  );
});
