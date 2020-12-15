"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["assert"], [global, require('./StandardImport')], (assert) => {require('./Comparison'); require('./Truth'); require('./Type'); require('./CommunicationStatus'); require('./Promises'); return {assert};});});
//# sourceMappingURL=Assert.js.map
