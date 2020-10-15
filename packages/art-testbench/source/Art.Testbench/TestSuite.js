"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "Object", "test", "Promise", "log"],
    [global, require("./StandardImport")],
    (BaseClass, Object, test, Promise, log) => {
      let TestSuite;
      return (TestSuite = Caf.defClass(
        class TestSuite extends BaseClass {},
        function (TestSuite, classSuper, instanceSuper) {
          this.abstractClass();
          this.postCreateConcreteClass = function () {
            global.suite(this.getName(), () =>
              Caf.each2(
                Object.keys(this),
                (key) => {
                  let tester, wrappedTester;
                  tester = this[key];
                  wrappedTester = this[key] = () => {
                    let base;
                    return (
                      (base = this)["_" + key] ||
                      (base["_" + key] = true
                        ? Promise.then(() => tester())
                            .tap(() =>
                              log(
                                `pass: ${Caf.toString(
                                  this.getName()
                                )}.${Caf.toString(key)}`
                              )
                            )
                            .catch((e) => {
                              log(
                                `fail: ${Caf.toString(
                                  this.getName()
                                )}.${Caf.toString(key)}`
                              );
                              return (() => {
                                throw e;
                              })();
                            })
                        : undefined)
                    );
                  };
                  return test(key, () => wrappedTester());
                },
                (key) => /^(test|setup)/.test(key)
              )
            );
            return undefined;
          };
        }
      ));
    }
  );
});
