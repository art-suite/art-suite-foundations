"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["skipKnownFailingTest", "assert"], [global, require('./StandardImport')], (skipKnownFailingTest, assert) => {return skipKnownFailingTest("foo", function() {return assert.fail("add a test which is currently expected to be failing, but eventually should be fixed");});});});
//# sourceMappingURL=Test.test.js.map
