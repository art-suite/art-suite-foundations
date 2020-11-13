"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let setup, initTesting; return [require('art-standard-lib'), require('./JestExtensions'), ({setup, initTesting} = require('./Mocha'), {setup, initTesting}), require('./Test'), {chainedTest: require('@art-suite/chained-test').chainedTest, assert: require('@art-suite/assert').assert}];});
//# sourceMappingURL=Testbench.js.map
