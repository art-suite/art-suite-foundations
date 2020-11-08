"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let test, setup, initTesting; return require('art-standard-lib').merge(require('./Jest'), ({test, setup, initTesting} = require('./Mocha'), {test, setup, initTesting}), {chainedTest: require('./ChainedTest').chainedTest, assert: require('./Assert').assert});});
//# sourceMappingURL=Testbench.js.map
