"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["test", "assert"], [global, require('./StandardImport')], (test, assert) => {let RootClass, OtherRootClass, ChildClass; RootClass = Caf.defClass(class RootClass extends Object {}); OtherRootClass = Caf.defClass(class OtherRootClass extends Object {}); ChildClass = Caf.defClass(class ChildClass extends RootClass {}); return test("instanceof", function() {assert.instanceof(RootClass, new ChildClass); return assert.rejects(() => assert.instanceof(OtherRootClass, new ChildClass));});});});
//# sourceMappingURL=Type.test.js.map
