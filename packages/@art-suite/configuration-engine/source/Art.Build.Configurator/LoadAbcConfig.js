"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["path", "fs", "Main", "Initialization", "process", "GlobPromise"],
    [
      global,
      require("./StandardImport"),
      {
        Initialization: require("./Initialization"),
        fs: require("fs-extra"),
        path: require("path"),
        GlobPromise: require("glob-promise"),
      },
    ],
    (path, fs, Main, Initialization, process, GlobPromise) => {
      let LoadConfig;
      return (LoadConfig = Caf.defClass(
        class LoadConfig extends Object {},
        function (LoadConfig, classSuper, instanceSuper) {
          this.configBasename = "art.build.config";
          this.registerLoaders = (npmRoot, vivify = false) => {
            let file;
            file = path.join(npmRoot, this.registerLoadersFilename);
            return fs
              .exists(file)
              .then((exists) =>
                exists
                  ? Main.realRequire(file)
                  : (vivify
                      ? (Initialization.init("core", npmRoot, {
                          verbose: !this.quiet,
                          select: /register.js/,
                        }),
                        Main.realRequire(file))
                      : undefined,
                    {})
              );
          };
          this.loadAbcConfig = (npmRoot, vivifyConfigFile = false) =>
            this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
              let configFilepath;
              configFilepath = path.join(process.cwd(), this.configBasename);
              return GlobPromise(configFilepath + "*").then((results) =>
                results.length > 0
                  ? Main.realRequire(configFilepath)
                  : (vivifyConfigFile
                      ? this.init("core", npmRoot, {
                          verbose: !this.quiet,
                          select: /art.build.config/,
                        })
                      : undefined,
                    {})
              );
            });
        }
      ));
    }
  );
});
