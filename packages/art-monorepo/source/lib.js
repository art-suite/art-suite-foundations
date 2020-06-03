"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["JSON", "consistentJsonStringify", "Promise"],
    [global, require("art-standard-lib")],
    (JSON, consistentJsonStringify, Promise) => {
      return {
        readJson: function(file) {
          return require("fs-extra").existsSync(file)
            ? JSON.parse(require("fs-extra").readFileSync(file))
            : {};
        },
        writeJson: function(file, data) {
          return require("fs-extra").writeFileSync(
            file,
            consistentJsonStringify(data, "  ") + "\n"
          );
        },
        execShellCommand: function(cmd) {
          return new Promise((resolve, reject) =>
            require("child_process").exec(cmd, (error, stdout, stderr) =>
              error(reject(stderr || stdout))
                ? undefined
                : resolve(stdout || stderr)
            )
          );
        }
      };
    }
  );
});
