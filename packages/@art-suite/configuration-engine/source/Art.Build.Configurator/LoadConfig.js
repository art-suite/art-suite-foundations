"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "path",
      "fs",
      "Main",
      "Initialization",
      "process",
      "GlobPromise",
      "Promise",
      "ConfigurePackageJson",
      "merge"
    ],
    [global, require("./StandardImport")],
    (
      path,
      fs,
      Main,
      Initialization,
      process,
      GlobPromise,
      Promise,
      ConfigurePackageJson,
      merge
    ) => {
      let LoadConfig;
      return (LoadConfig = Caf.defClass(
        class LoadConfig extends Object {},
        function(LoadConfig, classSuper, instanceSuper) {
          this.configBasename = "art.build.config";
          this.registerLoaders = (npmRoot, vivify = false) => {
            let file;
            file = path.join(npmRoot, this.registerLoadersFilename);
            return fs
              .exists(file)
              .then(exists =>
                exists
                  ? Main.realRequire(file)
                  : (vivify
                      ? (Initialization.init("core", npmRoot, {
                          verbose: !this.quiet,
                          select: /register.js/
                        }),
                        Main.realRequire(file))
                      : undefined,
                    {})
              );
          };
          this.loadConfig = (npmRoot, vivifyConfigFile = false) =>
            this.registerLoaders(npmRoot, vivifyConfigFile).then(() => {
              let configFilepath;
              configFilepath = path.join(process.cwd(), this.configBasename);
              return GlobPromise(configFilepath + "*")
                .then(results =>
                  results.length > 0
                    ? Main.realRequire(configFilepath)
                    : (vivifyConfigFile
                        ? this.init("core", npmRoot, {
                            verbose: !this.quiet,
                            select: /art.build.config/
                          })
                        : undefined,
                      {})
                )
                .then(config => {
                  let p, packageFile;
                  config.npm || (config.npm = config.package);
                  p = config.npm
                    ? Promise.resolve(config.npm)
                    : fs
                        .exists(
                          (packageFile = path.join(
                            npmRoot,
                            ConfigurePackageJson.outFileName
                          ))
                        )
                        .then(exists =>
                          exists ? Main.realRequire(packageFile) : {}
                        );
                  return p.then(finalNpm => merge(config, { npm: finalNpm }));
                });
            });
        }
      ));
    }
  );
});
