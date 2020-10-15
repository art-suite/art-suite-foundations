"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert"],
    [global, require("./StandardImport")],
    (test, assert) => {
      test("assert.match", function () {
        assert.match("hi frank", /fr/);
        return assert.rejects(() => assert.match("hi frank", /fri/));
      });
      return test("assert.notMatch", function () {
        assert.notMatch("hi frank", /fri/);
        return assert.rejects(() => assert.notMatch("hi frank", /fr/));
      });
    }
  );
});
