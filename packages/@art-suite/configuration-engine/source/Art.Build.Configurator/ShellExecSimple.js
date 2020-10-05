"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "process", "merge", "log", "present", "Error"],
    [global, require("./StandardImport")],
    (Promise, process, merge, log, present, Error) => {
      let shellExec, ShellExecSimple;
      shellExec = function (cmd, opts) {
        return Promise.then(() => {
          let child, isWin;
          child = require("child_process").spawn(
            (isWin = process.platform === "win32") ? "cmd" : "sh",
            [isWin ? "/C" : "-c", cmd],
            merge({ stdio: "pipe", cwd: process.cwd() }, opts)
          );
          return new Promise((resolve) => {
            let stdout, stderr, base, base1;
            stdout = stderr = "";
            Caf.exists((base = child.stdout)) &&
              base.on("data", (data) => (stdout += data));
            Caf.exists((base1 = child.stderr)) &&
              base1.on("data", (data) => (stderr += data));
            child.on("error", (error) =>
              resolve({ stdout, stderr, cmd, error })
            );
            return child.on("close", (code) =>
              resolve({ stdout, stderr, cmd, code })
            );
          });
        });
      };
      return (ShellExecSimple = Caf.defClass(
        class ShellExecSimple extends Object {},
        function (ShellExecSimple, classSuper, instanceSuper) {
          this.shellExecSimple = function (command, options) {
            let verbose;
            if (Caf.exists(options) ? (verbose = options.verbose) : undefined) {
              log(`> ${Caf.toString(command)}`.green);
            }
            return shellExec(command).then((result) => {
              let out;
              return present(result.error)
                ? Promise.reject(
                    new Error(
                      `shellExec: ${Caf.toString(
                        command
                      )}\n\nstderr:\n${Caf.toString(
                        result.stderr.trim()
                      )}\n\nstdout:\n${Caf.toString(result.stdout.trim())}`
                    )
                  )
                : ((out = result.stdout.trim()),
                  verbose
                    ? present(out)
                      ? log(out.blue)
                      : log("<success; no output>".grey)
                    : undefined,
                  out);
            });
          };
        }
      ));
    }
  );
});
