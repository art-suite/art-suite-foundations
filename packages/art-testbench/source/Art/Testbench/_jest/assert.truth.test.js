"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert", "Promise"],
    [global, require("../ArtChai"), global],
    (test, assert, Promise) => {
      test("assert.true", function() {
        assert.true(true);
        return Promise.all(
          Caf.array(
            [null, undefined, false, 1, "true", "false", "", 0, 1, {}],
            v => assert.rejects(() => assert.true(v))
          )
        );
      });
      test("assert.false", function() {
        assert.false(false);
        return Promise.all(
          Caf.array(
            [null, undefined, true, 1, "true", "false", "", 0, 1, {}],
            v => assert.rejects(() => assert.false(v))
          )
        );
      });
      test("assert.jsTrue", function() {
        assert.jsTrue(true);
        assert.jsTrue(1);
        assert.jsTrue("true");
        assert.jsTrue("false");
        assert.jsTrue({});
        return Promise.all(
          Caf.array([false, null, undefined, "", 0], v =>
            assert.rejects(() => assert.jsTrue(v), { v })
          )
        );
      });
      test("assert.jsFalse", function() {
        assert.jsFalse(false);
        assert.jsFalse(0);
        assert.jsFalse("");
        assert.jsFalse(null);
        assert.jsFalse(undefined);
        return Promise.all(
          Caf.array([true, 1, "true", "false", 1, {}], v =>
            assert.rejects(() => assert.jsFalse(v), { v })
          )
        );
      });
      test("assert.rubyTrue", function() {
        assert.rubyTrue(true);
        assert.rubyTrue(1);
        assert.rubyTrue("true");
        assert.rubyTrue("false");
        assert.rubyTrue({});
        assert.rubyTrue("");
        assert.rubyTrue(0);
        return Promise.all(
          Caf.array([null, undefined, false], v =>
            assert.rejects(() => assert.rubyTrue(v), { v })
          )
        );
      });
      return test("assert.rubyFalse", function() {
        assert.rubyFalse(false);
        assert.rubyFalse(null);
        assert.rubyFalse(undefined);
        return Promise.all(
          Caf.array([true, 1, "true", "false", 1, 0, "", {}], v =>
            assert.rejects(() => assert.rubyFalse(v), { v })
          )
        );
      });
    }
  );
});
