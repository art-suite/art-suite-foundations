"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "log",
      "blue",
      "loadAllPackages",
      "pluralize",
      "Promise",
      "grey",
      "execShellCommand",
      "green",
      "red",
      "present",
      "yellow",
      "process"
    ],
    [global, require("art-standard-lib"), require("./lib"), require("colors")],
    (
      log,
      blue,
      loadAllPackages,
      pluralize,
      Promise,
      grey,
      execShellCommand,
      green,
      red,
      present,
      yellow,
      process
    ) => {
      let indent, logTest, test;
      indent = function(str) {
        return "    " + str.replace(/\n/g, "\n    ");
      };
      logTest = function(verb, packagePath) {
        return log(blue(`${Caf.toString(verb)}: `) + packagePath);
      };
      return (test = function() {
        return loadAllPackages()
          .then(packages =>
            Caf.array(
              packages,
              ({ scripts }, packagePath) => packagePath,
              ({ scripts }, packagePath) => scripts.test
            )
          )
          .then(packagePaths => {
            let passed, failed;
            logTest("TESTING", pluralize("package", packagePaths.length));
            passed = [];
            failed = [];
            return Promise.all(
              Caf.array(packagePaths, packagePath => {
                logTest("TEST", grey(packagePath));
                return execShellCommand(
                  `cd ${Caf.toString(packagePath)};npm test`
                ).then(
                  () => {
                    passed.push(packagePath);
                    return logTest("PASSED", green(packagePath));
                  },
                  ({ stdout, stderr }) => {
                    failed.push(packagePath);
                    logTest("FAILED", red(packagePath));
                    if (present(stdout)) {
                      log(
                        blue(
                          `  ${Caf.toString(packagePath)} > npm test (stdout)`
                        )
                      );
                      log(indent(stdout.trim()));
                      log("");
                    }
                    return present(stderr)
                      ? (log(
                          blue(
                            `  ${Caf.toString(packagePath)} > npm test (stderr)`
                          )
                        ),
                        log(red(indent(stderr.trim()))),
                        log(""))
                      : undefined;
                  }
                );
              })
            ).then(() => {
              log(blue("\nRESULTS:"));
              log(blue("  passed: " + yellow(passed.length)));
              if (failed.length > 0) {
                Caf.each2(failed, f => log(blue("  failed: " + red(f))));
              }
              if (failed > 1) {
                process.exit(1);
              }
              return null;
            });
          });
      });
    }
  );
});
