"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "loadAceConfig"],
    [global, require("./StandardImport"), require("./LoadAceConfig")],
    (BaseClass, loadAceConfig) => {
      let AceMain;
      return (require("./LoadAceConfig").AceMain = AceMain = Caf.defClass(
        class AceMain extends BaseClass {},
        function (AceMain, classSuper, instanceSuper) {
          this.realRequire = eval("require");
          this.aceUpdate = function (options) {
            return loadAceConfig(options.package).then((aceConfig) => {});
          };
        }
      ));
    }
  );
});
