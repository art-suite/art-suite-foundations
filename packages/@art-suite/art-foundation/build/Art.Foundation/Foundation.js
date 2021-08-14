"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return [require('art-standard-lib'), require('art-class-system'), require('art-config'), require('art-binary'), require('art-validation'), require('art-object-tree-factory'), require('art-communication-status'), require('art-rest-client'), require('@art-suite/web-worker'), require('@art-suite/local-storage'), require('./ForHumans'), require('./Tools'), {RestClient: require('art-rest-client'), CommunicationStatus: require('art-communication-status'), Epoch: require('art-epoched-state').EpochClass, Browser: require('art-browser-tools'), Binary: require('art-binary')}];});
//# sourceMappingURL=Foundation.js.map
