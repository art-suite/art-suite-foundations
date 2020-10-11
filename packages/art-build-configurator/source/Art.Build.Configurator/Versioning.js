"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "JSON"],
    [global, require("./StandardImport")],
    (BaseClass, JSON) => {
      let Versioning;
      return (Versioning = Caf.defClass(
        class Versioning extends BaseClass {},
        function (Versioning, classSuper, instanceSuper) {
          this.classGetter({
            current: function () {
              return JSON.parse(
                require("fs").readFileSync("package.json").toString()
              ).version;
            },
          });
        }
      ));
    }
  );
});
