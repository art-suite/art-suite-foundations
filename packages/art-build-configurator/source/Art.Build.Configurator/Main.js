"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "Promise",
      "path",
      "fs",
      "process",
      "ConfigurePackageJson",
      "merge",
      "dashCase",
      "ConfigureWebpack"
    ],
    [global, require("./StandardImport"), require("./Configurators")],
    (
      log,
      Promise,
      path,
      fs,
      process,
      ConfigurePackageJson,
      merge,
      dashCase,
      ConfigureWebpack
    ) => {
      let Main;
      return (Main = Caf.defClass(class Main extends Object {}, function(
        Main,
        classSuper,
        instanceSuper
      ) {
        this.realRequire = eval("require");
        this.configFilename = "art.build.config.caf";
        this.configBasename = "art.build.config";
        this.registerLoadersFilename = "register.js";
        this.log = (...args) => (!this.quiet ? log(...args) : undefined);
        this.go = (npmRoot, options) => {
          let pretend, configure, init, force, quiet, git, temp;
          pretend = options.pretend;
          configure = options.configure;
          init = options.init;
          force = options.force;
          quiet = options.quiet;
          git = options.git;
          (temp = this.quiet) != null ? temp : (this.quiet = quiet);
          if (pretend) {
            this.log("PRETEND".green);
          }
          return Promise.then(() =>
            init ? this.init(init, npmRoot, options) : undefined
          )
            .then(() =>
              !(pretend && init)
                ? this.loadAndWriteConfig(npmRoot, options)
                : undefined
            )
            .then(() =>
              !(pretend && init)
                ? this.runNeptuneNamespaces(npmRoot)
                : undefined
            )
            .then(() =>
              git
                ? require("fs").existsSync(".git")
                  ? this.log(
                      "git already initialized. Not touching it. Cheers!".yellow
                    )
                  : (this.log("initializing git...".yellow),
                    require("./ShellExecSimple")("git init")
                      .then(() => require("./ShellExecSimple")("git add ."))
                      .then(() =>
                        require("./ShellExecSimple")(
                          `git commit -m "initial checkin by art-build-configurator${Caf.toString(
                            init ? ` --init ${Caf.toString(init)}` : ""
                          )}"`
                        )
                      )
                      .then(() => this.log("git initialized".yellow)))
                : undefined
            );
        };
        this.shellExec = function(command) {
          return require("./ShellExecSimple")(command, { quiet: this.quiet });
        };
        this.registerLoaders = (npmRoot, vivify = false) => {
          let file;
          file = path.join(npmRoot, this.registerLoadersFilename);
          return fs
            .exists(file)
            .then(exists =>
              exists
                ? Main.realRequire(file)
                : (vivify
                    ? (this.init("core", npmRoot, {
                        verbose: true,
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
            return require("glob-promise")(configFilepath + "*")
              .then(results =>
                results.length > 0
                  ? Main.realRequire(configFilepath)
                  : (vivifyConfigFile
                      ? this.init("core", npmRoot, {
                          verbose: true,
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
        this.init = function(recipeName, npmRoot, options) {
          let pretend, verbose, recipe;
          pretend = options.pretend;
          verbose = options.verbose;
          if (pretend && !verbose) {
            options = merge(options, { verbose: true });
          }
          if (recipeName === true) {
            recipeName = null;
          }
          recipeName = dashCase(recipeName != null ? recipeName : "core");
          return recipeName === "Help"
            ? (log(
                `Please select a valid recipe name:\n\n  ${Caf.toString(
                  require("./Recipes")
                    .getModuleNames()
                    .join("\n  ")
                )}\n\nEx: abc -i node`
              ),
              Promise.reject("exiting"))
            : (this.log(
                `\n${Caf.toString(
                  pretend ? "PRETEND-" : undefined
                )}INIT-${Caf.toString(recipeName)}: ${Caf.toString(npmRoot)}`
              ),
              !(recipe = require("./RecipeRegistry").recipes[recipeName])
                ? (log({
                    recipes: Caf.object(
                      require("./RecipeRegistry").recipes,
                      (recipe, name) => {
                        let temp;
                        return (temp = recipe.description) != null
                          ? temp
                          : "(no description)";
                      }
                    )
                  }),
                  Promise.reject("Please provide a valid recipe name."))
                : (recipe.writeFiles(npmRoot, options),
                  this.log(
                    `${Caf.toString(
                      pretend ? "PRETEND-" : undefined
                    )}INIT-${Caf.toString(recipeName)}: done`
                  )));
        };
        this.pretendWriteConfig = function(npmRoot, abcConfig) {
          return Promise.deepAll(
            merge({
              abcConfig,
              npm: {
                out: {
                  "package.json": ConfigurePackageJson.get(npmRoot, abcConfig)
                }
              },
              indexHtml: abcConfig.indexHtml ? "<html>\n</html>" : undefined,
              webpack: {
                configGeneratedOnDemand: ConfigureWebpack.get(
                  npmRoot,
                  abcConfig
                ),
                out: { "webpack.config.js": ConfigureWebpack.getFileContents() }
              }
            })
          ).then(this.log);
        };
        this.runNeptuneNamespaces = function(npmRoot, options) {
          let executable, firstArg, isWebpackDevServer;
          [executable, firstArg] = process.argv;
          isWebpackDevServer = !!(
            executable.match(/\/node$/) &&
            Caf.exists(firstArg) && firstArg.match(/webpack-dev-server/)
          );
          this.log(`\nNeptuneNamespaces: ${Caf.toString(npmRoot)}`);
          return require("./RunNeptuneNamespaces")(npmRoot, isWebpackDevServer);
        };
        this.loadAndWriteConfig = function(npmRoot, options) {
          let pretend, configure, init;
          ({ pretend, configure, init } = options);
          this.log(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
          return this.loadConfig(npmRoot, configure).then(abcConfig =>
            pretend
              ? this.pretendWriteConfig(npmRoot, abcConfig)
              : this.writeConfig(npmRoot, abcConfig)
          );
        };
        this.writeConfig = function(npmRoot, abcConfig) {
          return Promise.then(() =>
            ConfigurePackageJson.writeConfig(npmRoot, abcConfig)
          ).then(() => ConfigureWebpack.writeConfig(npmRoot, abcConfig));
        };
        this.getWebpackConfig = (npmRoot, env, argv) =>
          this.loadConfig(npmRoot).then(abcConfig =>
            this.writeConfig(npmRoot, abcConfig).then(() =>
              this.runNeptuneNamespaces(npmRoot).then(() =>
                ConfigureWebpack.get(npmRoot, abcConfig, { env, argv })
              )
            )
          );
        this.updateFile = function(fileName, contents) {
          let oldContents;
          if (fs.existsSync(fileName)) {
            oldContents = fs.readFileSync(fileName).toString();
          }
          return oldContents !== contents
            ? (this.log("writing: ".gray + fileName.green),
              fs.writeFileSync(fileName, contents))
            : this.log(`same:    ${Caf.toString(fileName)}`.gray);
        };
      }));
    }
  );
});
