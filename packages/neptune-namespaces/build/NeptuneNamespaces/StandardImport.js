"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let out; out = {glob: require('glob').glob, fsp: require('fs-extra'), Path: require('path')}; Caf.object(require('./Helper'), null, null, out); Caf.object(require('./MiniFoundation'), null, null, out); return out;});
//# sourceMappingURL=StandardImport.js.map
