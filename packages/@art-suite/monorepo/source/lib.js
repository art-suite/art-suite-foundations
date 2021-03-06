"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "existsSync",
      "JSON",
      "readFileSync",
      "log",
      "process",
      "writeFileSync",
      "consistentJsonStringify",
      "blue",
      "pluralize",
      "Promise",
      "unlink",
      "yellow",
    ],
    [
      global,
      require("art-standard-lib"),
      require("chalk"),
      require("fs"),
      require("fs").promises,
    ],
    (
      existsSync,
      JSON,
      readFileSync,
      log,
      process,
      writeFileSync,
      consistentJsonStringify,
      blue,
      pluralize,
      Promise,
      unlink,
      yellow
    ) => {
      let readJson, removePackageLocks, removeNodeModules, execShellCommand;
      return {
        readJson: (readJson = function (file) {
          let error;
          return existsSync(file)
            ? (() => {
                try {
                  return JSON.parse(readFileSync(file));
                } catch (error1) {
                  error = error1;
                  log.error(
                    `Failed to parse: ${Caf.toString(file)}\n\n${Caf.toString(
                      error.message
                    )}`
                  );
                  return process.exit(1);
                }
              })()
            : {};
        }),
        writeJson: function (file, data) {
          return writeFileSync(
            file,
            consistentJsonStringify(data, "  ") + "\n"
          );
        },
        loadAllPackages: function () {
          return require("glob-promise")(
            "!(node_modules)/**/package.json"
          ).then((results) => {
            let from, into, to, i, temp;
            return (
              (from = results),
              (into = {}),
              from != null
                ? ((to = from.length),
                  (i = 0),
                  (() => {
                    while (i < to) {
                      let file;
                      file = from[i];
                      if (!/node_modules\//.test(file)) {
                        into[file.split(/\/package.json$/)[0]] = readJson(file);
                      }
                      temp = i++;
                    }
                    return temp;
                  })())
                : undefined,
              into
            );
          });
        },
        removePackageLocks: (removePackageLocks = function () {
          return require("glob-promise")(
            "!(node_modules)/**/package-lock.json"
          ).then((results) => {
            if (results.length > 0) {
              log(
                blue(
                  `Removing ${Caf.toString(
                    pluralize(
                      results.length,
                      "package-specific package-lock.json file"
                    )
                  )}...`
                )
              );
            }
            return Promise.all(
              Caf.array(results, (packageLock) => {
                log({ rm: packageLock });
                return unlink(packageLock);
              })
            ).then(() =>
              results.length > 0
                ? log(
                    blue(
                      `Removed ${Caf.toString(
                        pluralize(
                          results.length,
                          "package-specific package-lock.json file"
                        )
                      )}.`
                    )
                  )
                : undefined
            );
          });
        }),
        removeNodeModules: (removeNodeModules = function () {
          return require("glob-promise")(
            "!(node_modules)/**/node_modules"
          ).then((results) => {
            if (results.length > 0) {
              log(
                blue(
                  `Removing ${Caf.toString(
                    pluralize(
                      results.length,
                      "package-specific node_modules/ directory"
                    )
                  )}...`
                )
              );
            }
            return Promise.all(
              Caf.array(results, (nodeModules) => {
                let cmd;
                log(yellow((cmd = `rm -rf ${Caf.toString(nodeModules)}`)));
                return execShellCommand(cmd);
              })
            ).then(() =>
              results.length > 0
                ? log(
                    blue(
                      `Removed ${Caf.toString(
                        pluralize(
                          results.length,
                          "package-specific node_modules/ directory"
                        )
                      )}.`
                    )
                  )
                : undefined
            );
          });
        }),
        cleanMonorepo: function () {
          return removePackageLocks().then(() => removeNodeModules());
        },
        execShellCommand: (execShellCommand = function (cmd) {
          return new Promise((resolve, reject) =>
            require("child_process").exec(cmd, (error, stdout, stderr) =>
              error ? reject({ stderr, stdout }) : resolve(stdout)
            )
          );
        }),
      };
    }
  );
});
