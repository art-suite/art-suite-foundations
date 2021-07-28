"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["cleanMonorepo", "green"], [global, require('./StandardImport')], (cleanMonorepo, green) => {return function(options) {return cleanMonorepo().then(() => require('./update-sub-packages')(options)).then(() => require('./update-mono-package')(options)).then(() => green("All package.json files synced."));};});});
//# sourceMappingURL=sync.js.map
