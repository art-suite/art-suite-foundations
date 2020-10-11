"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "Promise", "path"],
    [global, require("../StandardImport")],
    (BaseClass, Promise, path) => {
      let ConfigureBase;
      return (ConfigureBase = Caf.defClass(
        class ConfigureBase extends BaseClass {},
        function (ConfigureBase, classSuper, instanceSuper) {
          this.outFileName = "index.html";
          this.getFileContents = function (npmRoot, abcConfig) {
            return Promise.then(() => this.get(npmRoot, abcConfig)).then(
              (v) => v + "\n"
            );
          };
          this.writeConfig = function (npmRoot, abcConfig) {
            return this.getFileContents(npmRoot, abcConfig).then((contents) =>
              require("../Main").updateFile(
                path.join(npmRoot, this.outFileName),
                contents
              )
            );
          };
        }
      ));
    }
  );
});
