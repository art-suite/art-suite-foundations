"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["abcLog"],
    [global, require("./StandardImport"), require("./AbcLog")],
    (abcLog) => {
      let Git;
      return (Git = Caf.defClass(class Git extends Object {}, function (
        Git,
        classSuper,
        instanceSuper
      ) {
        this.initGit = function () {
          let git;
          return (git = require("simple-git")()).init().then(({ existing }) =>
            existing
              ? abcLog(
                  "git already initialized. Not touching it. Cheers!".yellow
                )
              : (abcLog("git initialized. Adding initial files...".yellow),
                git
                  .add(["."])
                  .then(() =>
                    git.commit("initial checkin by art-build-configurator")
                  )
                  .then(() =>
                    abcLog("git initialized with initial commit.".yellow)
                  ))
          );
        };
      }));
    }
  );
});
