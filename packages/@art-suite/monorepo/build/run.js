"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["process", "merge"], [global, require('./StandardImport')], (process, merge) => {return {options: {command: "Shell command to run.", verbose: "true/false", path: 'find all packages in this path. default: "."'}, run: function(options) {let path; if (path = options.path) {process.chdir(path);}; return require('./runLib')(merge(options, {verb: "run"}));}};});});
//# sourceMappingURL=run.js.map
