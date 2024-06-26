"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["path", "Promise", "glob"],
    [
      global,
      require("./StandardImport"),
      require("glob"),
      { path: require("path") },
    ],
    (path, Promise, glob) => {
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
            configFilepath = path.join(npmRoot, this.configBasename);
            return Promise.then(() => this.registerLoaders())
              .then(() => glob(configFilepath + "*"))
              .then((results) =>
                results.length > 0
                  ? this.AceMain.realRequire(configFilepath)
                  : {}
              );
          };
        }
      ));
    }
  );
});
