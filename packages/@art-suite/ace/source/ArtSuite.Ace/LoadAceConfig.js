"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["globPromise", "path"],
    [
      global,
      require("./StandardImport"),
      { path: require("path"), globPromise: require("glob-promise") },
    ],
    (globPromise, path) => {
      let LoadAceConfig;
      return (LoadAceConfig = Caf.defClass(
        class LoadAceConfig extends Object {},
        function (LoadAceConfig, classSuper, instanceSuper) {
          this.AceMain = null;
          this.configBasename = "ace.config";
          this.registerLoaders = () =>
            this.AceMain.realRequire("caffeine-script/register");
          this.loadAceConfig = (npmRoot) => {
            let configFilepath;
            this.registerLoaders();
            return globPromise(
              (configFilepath = path.join(npmRoot, this.configBasename)) + "*"
            ).then((results) =>
              results.length > 0 ? this.AceMain.realRequire(configFilepath) : {}
            );
          };
        }
      ));
    }
  );
});
