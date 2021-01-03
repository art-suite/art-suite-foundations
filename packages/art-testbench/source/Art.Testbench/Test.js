"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["cleanErrorStack", "isPromise", "assert"], [global, require('./StandardImport'), require('./ErrorExtensions'), require('@art-suite/assert')], (cleanErrorStack, isPromise, assert) => {return {test: function(name, test, ...rest) {let temp; return ((temp = global.it) != null ? temp : global.test)(name, () => {let p, error; p = (() => {try {return test();} catch (error1) {error = error1; return (() => {throw cleanErrorStack(error, /art-testbench|caffeine-script-runtime|bluebird|jest-jasmine2/);})();};})(); return isPromise(p) ? p.catch((error) => (() => {throw cleanErrorStack(error, /art-testbench|caffeine-script-runtime|bluebird|jest-jasmine2/);})()) : undefined;}, ...rest);}, skipKnownFailingTest: function(name, f) {let message, temp; message = `SKIPPING KNOWN-FAILING TEST: ${Caf.toString(name)}`; return ((temp = global.it) != null ? temp : global.test)(message, () => assert.rejects(f, "This test is passing now, yay! Switch to a normal test."));}};});});
//# sourceMappingURL=Test.js.map