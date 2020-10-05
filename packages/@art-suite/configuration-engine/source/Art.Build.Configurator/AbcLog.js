"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "log"],
    [global, require("art-standard-lib"), require("art-class-system")],
    (BaseClass, log) => {
      let AbcLog;
      return (AbcLog = Caf.defClass(
        class AbcLog extends BaseClass {},
        function (AbcLog, classSuper, instanceSuper) {
          this.classProperty("quiet");
          this.silenceLog = function () {
            return (this.quiet = true);
          };
          this.abcLog = function (...args) {
            return !this.quiet ? log(...args) : undefined;
          };
        }
      ));
    }
  );
});
