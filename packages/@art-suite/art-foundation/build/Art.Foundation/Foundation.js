"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return [require('art-standard-lib'), require('art-class-system'), require('art-config'), require('art-binary'), require('./ForHumans'), require('./Tools'), {Epoch: require('art-epoched-state').EpochClass, Browser: require('art-browser-tools'), Binary: require('art-binary')}];});
//# sourceMappingURL=Foundation.js.map
