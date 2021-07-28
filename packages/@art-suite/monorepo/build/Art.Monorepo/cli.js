"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {return {cli: function() {return require('@art-suite/cli').start({commands: require('./Commands')});}};})();});
//# sourceMappingURL=cli.js.map
