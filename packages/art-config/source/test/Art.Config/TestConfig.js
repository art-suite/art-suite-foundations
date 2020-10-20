"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Configuration"],
    [global, require("./StandardImport")],
    (Configuration) => {
      let TestConfig;
      return (TestConfig = Caf.defClass(
        class TestConfig extends Configuration {},
        function (TestConfig, classSuper, instanceSuper) {
          this.prototype.propA = "propAFromTestConfig";
          this.prototype.MyGrouping = { propB: "foo" };
          this.deepMergeInConfig({ MyGrouping: { propC: "bar" } });
        }
      ));
    }
  );
});
