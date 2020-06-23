"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["JSON", "consistentJsonStringify", "Promise"],
    [global, require("art-standard-lib")],
    (JSON, consistentJsonStringify, Promise) => {
      let readJson;
      return {
        readJson: (readJson = function(file) {
          return require("fs-extra").existsSync(file)
            ? JSON.parse(require("fs-extra").readFileSync(file))
            : {};
        }),
        writeJson: function(file, data) {
          return require("fs-extra").writeFileSync(
            file,
            consistentJsonStringify(data, "  ") + "\n"
          );
        },
        loadAllPackages: function() {
          return require("glob-promise")(
            "!(node_modules)/*/**/package.json"
          ).then(results => {
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
        execShellCommand: function(cmd) {
          return new Promise((resolve, reject) =>
            require("child_process").exec(cmd, (error, stdout, stderr) =>
              error ? reject(stderr || stdout) : resolve(stdout || stderr)
            )
          );
        }
      };
    }
  );
});
