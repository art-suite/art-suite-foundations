"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return require('art-standard-lib').mergeWithSelf(require('art-class-system'), require('./Data'), {Configurator: require("./namespace")}, {fs: require('fs-extra'), path: require('path')});});
//# sourceMappingURL=StandardImport.js.map
