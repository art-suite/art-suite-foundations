"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert"],
    [global, require("../ArtChai"), global],
    (test, assert) => {
      test("assert.same", function() {
        let a;
        assert.same(0, 0);
        a = {};
        assert.same(a, a);
        return assert.rejects(() => {
          assert.same(0, 1);
          return assert.same(a, {});
        });
      });
      return test("assert.notSame", function() {
        let a;
        assert.notSame(0, 1);
        a = {};
        assert.notSame(a, {});
        return assert.rejects(() => {
          assert.notSame(0, 0);
          return assert.notSame(a, a);
        });
      });
    }
  );
});
