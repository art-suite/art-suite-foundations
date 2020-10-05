"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge", "peek", "process", "JSON"],
    [global, require("art-standard-lib")],
    (merge, peek, process, JSON) => {
      let StandardPackageJson;
      return (StandardPackageJson = Caf.defClass(
        class StandardPackageJson extends Object {},
        function(StandardPackageJson, classSuper, instanceSuper) {
          this.getGitInfo = function() {
            return require("../ShellExecSimple")("git remote -v")
              .then(lines => {
                let match, _1, _2, domain, path, extension, bugs, homepage;
                return merge(
                  (match = Caf.find(lines.split(/\n/g), line =>
                    line
                      .trim()
                      .match(
                        /^origin\t(git@|https?:\/\/)([^\s\/:]+)[:\/]((?:(?!\.\w+\b)[^\s])+)\.?(\w+)?/i
                      )
                  ))
                    ? (([_1, _2, domain, path, extension] = match),
                      (bugs = homepage = `https://${Caf.toString(
                        domain
                      )}/${Caf.toString(path)}`),
                      domain === "github.com"
                        ? (bugs = require("path").join(bugs, "issues"))
                        : undefined,
                      {
                        repository: {
                          url: homepage + `.${Caf.toString(extension)}`,
                          type: extension
                        },
                        homepage,
                        bugs
                      })
                    : undefined
                );
              })
              .catch(() => {
                return {};
              });
          };
          this.get = function(abcConfig) {
            return this.getGitInfo().then(gitInfo => {
              let temp, base, base1;
              return merge(gitInfo, {
                license: "ISC",
                name: peek(process.cwd().split("/")),
                version:
                  (temp =
                    require("fs").existsSync("package.json") &&
                    JSON.parse(
                      require("fs")
                        .readFileSync("package.json")
                        .toString()
                    ).version) != null
                    ? temp
                    : "0.0.1",
                author: "Shane Brinkman-Davis Delamore, Imikimi LLC",
                dependencies: require("./StandardDependencies"),
                devDependencies: require("./StandardDevDependencies"),
                scripts: merge({
                  test:
                    Caf.exists(abcConfig) &&
                    Caf.exists((base = abcConfig.target)) && base.node
                      ? "nn -s;mocha -u tdd"
                      : "webpack-dev-server  --progress --env.devServer",
                  start:
                    "webpack-dev-server --hot --inline --progress --env.devServer",
                  testInBrowser:
                    Caf.exists(abcConfig) &&
                    Caf.exists((base1 = abcConfig.target)) && base1.node
                      ? "webpack-dev-server --progress --env.devServer"
                      : undefined,
                  build: "webpack --progress"
                })
              });
            });
          };
        }
      ));
    }
  );
});
