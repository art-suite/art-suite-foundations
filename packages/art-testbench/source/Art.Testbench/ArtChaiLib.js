"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "assert",
      "isFunction",
      "isPlainObject",
      "Error",
      "failWithExpectedMessage",
      "inspectedObjectLiteral",
      "log",
      "inspectLean",
      "isPlainArray",
      "inspect",
    ],
    [
      global,
      require("art-standard-lib"),
      require("./Presentation"),
      require("chai"),
    ],
    (
      assert,
      isFunction,
      isPlainObject,
      Error,
      failWithExpectedMessage,
      inspectedObjectLiteral,
      log,
      inspectLean,
      isPlainArray,
      inspect
    ) => {
      let getTesterFor, addTester;
      assert.test = {};
      return {
        getTesterFor: (getTesterFor = function (name, a, b) {
          let tester, options;
          tester = isFunction(a)
            ? a
            : isPlainObject(a)
            ? ((options = a), b)
            : (() => {
                throw new Error("expected object or function");
              })();
          if (!isFunction(tester)) {
            throw new Error("expected tester function");
          }
          return (() => {
            switch (tester.length) {
              case 1:
                return (testValue, context) =>
                  !tester(testValue)
                    ? Caf.exists(options) && options.customFailure
                      ? Caf.exists(options) &&
                        options.customFailure(name, testValue, context)
                      : failWithExpectedMessage(
                          context,
                          inspectedObjectLiteral(name),
                          "to be true for",
                          testValue
                        )
                    : undefined;
              default:
                return (value1, value2, context) =>
                  !tester(value1, value2)
                    ? Caf.exists(options) && options.customFailure
                      ? Caf.exists(options) &&
                        options.customFailure(name, value1, value2, context)
                      : failWithExpectedMessage(context, value1, name, value2)
                    : undefined;
            }
          })();
        }),
        addTester: (addTester = function (name, a, b) {
          let testerFor;
          assert[name] = testerFor = getTesterFor(name, a, b);
          return (assert.test[name] =
            testerFor.length === 2
              ? (func, args, context) => {
                  let invoke;
                  log.warn(
                    "DEPRICATED: assert.test.* (no alternative provided, sorry!)"
                  );
                  if (!(args != null)) {
                    args = [];
                  }
                  invoke =
                    args.length === 0
                      ? `${Caf.toString(func.getName())}()`
                      : `${Caf.toString(func.getName())} ${Caf.toString(
                          inspectLean(args, { forArgs: true })
                        )}`;
                  if (!isPlainArray(args)) {
                    args = [args];
                  }
                  return global.test(
                    `${Caf.toString(name)} ${Caf.toString(invoke)}`,
                    () => testerFor(func(...args), context)
                  );
                }
              : (func, args, testValue, context) => {
                  let invoke;
                  log.warn(
                    "DEPRICATED: assert.test.* (no alternative provided, sorry!)"
                  );
                  if (!(args != null)) {
                    args = [];
                  }
                  invoke =
                    args.length === 0
                      ? `${Caf.toString(func.getName())}()`
                      : `(${Caf.toString(func.getName())} ${Caf.toString(
                          inspectLean(args, { forArgs: true })
                        )})`;
                  if (!isPlainArray(args)) {
                    args = [args];
                  }
                  return global.test(
                    `${Caf.toString(name)} ${Caf.toString(
                      invoke
                    )}, ${Caf.toString(inspect(testValue))}`,
                    () => testerFor(func(...args), testValue, context)
                  );
                });
        }),
      };
    }
  );
});
