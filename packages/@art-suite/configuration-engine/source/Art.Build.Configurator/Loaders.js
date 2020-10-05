"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "path",
      "fs",
      "initPackage",
      "AbcLog",
      "regexpEscape",
      "registerLoadersFilename",
    ],
    [
      global,
      require("./StandardImport"),
      require("./Initialization"),
      {
        AbcLog: require("./AbcLog"),
        fs: require("fs-extra"),
        path: require("path"),
      },
    ],
    (path, fs, initPackage, AbcLog, regexpEscape, registerLoadersFilename) => {
      let Loaders;
      return (Loaders = Caf.defClass(class Loaders extends Object {}, function (
        Loaders,
        classSuper,
        instanceSuper
      ) {
        this.realRequire = eval("require");
        this.registerLoadersFilename = "register.js";
        this.registerLoaders = (npmRoot, vivify = false) => {
          let file;
          file = path.join(npmRoot, this.registerLoadersFilename);
          return fs
            .exists(file)
            .then((exists) =>
              exists
                ? this.realRequire(file)
                : (vivify
                    ? (initPackage("core", npmRoot, {
                        verbose: !AbcLog.quiet,
                        select: RegExp(
                          `${Caf.toString(
                            regexpEscape(registerLoadersFilename)
                          )}`
                        ),
                      }),
                      this.realRequire(file))
                    : undefined,
                  {})
            );
        };
      }));
    }
  );
});
