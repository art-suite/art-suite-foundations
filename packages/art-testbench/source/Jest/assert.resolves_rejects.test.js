"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert", "Promise", "Error"],
    [global, require("./StandardImport")],
    (test, assert, Promise, Error) => {
      test("assert.resolves", function () {
        assert.resolves("anything");
        assert.resolves(() => "function");
        return assert.resolves(Promise.resolve());
      });
      test("assert.rejects", function () {
        assert.rejects(() =>
          (() => {
            throw new Error("should_fail_here");
          })()
        );
        return assert.rejects(Promise.reject());
      });
      test("assert.resolves fails correctly", function () {
        return Promise.all([
          assert.rejects(() =>
            assert.resolves(() =>
              (() => {
                throw new Error("should_fail_here");
              })()
            )
          ),
          assert.rejects(() => assert.resolves(Promise.reject())),
        ]);
      });
      return test("assert.rejects fails correctly", function () {
        return Promise.all([
          assert.rejects(() => assert.rejects("anything")),
          assert.rejects(() => assert.rejects(() => "function")),
          assert.rejects(() => assert.rejects(Promise.resolve())),
        ]);
      });
    }
  );
});
