"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["loadAllPackages", "Promise", "log", "execShellCommand"],
    [global, require("art-standard-lib"), require("./lib")],
    (loadAllPackages, Promise, log, execShellCommand) => {
      return loadAllPackages()
        .then(function(packages) {
          return Caf.array(
            packages,
            ({ scripts }, packagePath) => packagePath,
            ({ scripts }, packagePath) => scripts.test
          );
        })
        .then(function(packagePaths) {
          return Promise.all(
            Caf.array(packagePaths, packagePath => {
              log({ TEST: packagePath });
              return execShellCommand(
                `cd ${Caf.toString(packagePath)};npm test`
              ).then(
                () => log({ PASS: packagePath }),
                () => log.error({ FAIL: packagePath })
              );
            })
          );
        });
    }
  );
});
