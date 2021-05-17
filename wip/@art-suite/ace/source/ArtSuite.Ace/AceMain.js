"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "loadAceConfig", "process"],
    [global, require("./StandardImport"), require("./LoadAceConfig")],
    (BaseClass, loadAceConfig, process) => {
      let AceMain;
      return (require("./LoadAceConfig").AceMain = AceMain =
        Caf.defClass(
          class AceMain extends BaseClass {},
          function (AceMain, classSuper, instanceSuper) {
            this.realRequire = eval("require");
            this.aceUpdate = function (options) {
              let temp;
              return loadAceConfig(
                (temp = Caf.exists(options) && options.package) != null
                  ? temp
                  : process.cwd()
              ).tap((aceConfig) => {});
            };
          }
        ));
    }
  );
});
