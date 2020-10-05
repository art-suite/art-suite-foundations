"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "silenceLog",
      "abcLog",
      "Promise",
      "initPackage",
      "configurePackage",
      "initGit",
    ],
    [
      global,
      require("./StandardImport"),
      require("./AbcLog"),
      require("./Configuration"),
      require("./Initialization"),
    ],
    (silenceLog, abcLog, Promise, initPackage, configurePackage, initGit) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function (
        Main,
        classSuper,
        instanceSuper
      ) {
        this.go = (npmRoot, options) => {
          let pretend, init, quiet, git;
          pretend = options.pretend;
          init = options.init;
          quiet = options.quiet;
          git = options.git;
          if (quiet) {
            silenceLog();
          }
          if (pretend) {
            abcLog("PRETEND".green);
          }
          return Promise.then(() =>
            init ? initPackage(init, npmRoot, options) : undefined
          )
            .then(() => configurePackage(npmRoot, options))
            .then(() => (git ? initGit() : undefined));
        };
      }));
    }
  );
});
