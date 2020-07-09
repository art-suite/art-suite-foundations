"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "assert",
      "addTester",
      "isFunction",
      "Promise",
      "isPromise",
      "failWithExpectedMessage"
    ],
    [
      global,
      require("art-standard-lib"),
      require("./Presentation"),
      require("chai"),
      require("./ArtChaiLib")
    ],
    (
      assert,
      addTester,
      isFunction,
      Promise,
      isPromise,
      failWithExpectedMessage
    ) => {
      let promisify;
      require("./ArtChai-old");
      promisify = function(a) {
        return isFunction(a)
          ? Promise.then(() => a())
          : isPromise(a)
          ? a
          : Promise.resolve(a);
      };
      assert.resolves = function(a, context) {
        return promisify(a).then(
          v => v,
          v =>
            failWithExpectedMessage(
              context,
              a,
              "to be resolved. Instead, it rejected with:",
              v
            )
        );
      };
      assert.rejects = function(a, context) {
        return promisify(a).then(
          v =>
            failWithExpectedMessage(
              context,
              a,
              "to be rejected. Instead, it succeeded with:",
              v
            ),
          v => v
        );
      };
      assert.within = function(a, b, c, context) {
        return a && a.gte && a.lte
          ? !(a.gte(b) && a.lte(c))
            ? failWithExpectedMessage(
                context,
                a,
                "to be gte",
                b,
                "to be lte",
                c
              )
            : undefined
          : !(a >= b && a <= c)
          ? failWithExpectedMessage(context, a, "to be >=", b, "to be <=", c)
          : undefined;
      };
      addTester("true", function(a) {
        return a === true;
      });
      addTester("false", function(a) {
        return a === false;
      });
      addTester("jsTrue", function(a) {
        return !!a;
      });
      addTester("jsFalse", function(a) {
        return !a;
      });
      addTester("rubyTrue", function(a) {
        return a !== false && a != null;
      });
      addTester("rubyFalse", function(a) {
        return a === false || !(a != null);
      });
      return require("chai");
    }
  );
});
