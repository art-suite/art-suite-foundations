"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert"], [global, require('art-testbench'), require('../Art.Monorepo')], (test, assert) => {return test("nothing", function() {return assert.true(true);});});});
//# sourceMappingURL=Monorepo.test.js.map
