"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Configurable"], [global, require('./StandardImport')], (Configurable) => {let TestConfigurable; return TestConfigurable = Caf.defClass(class TestConfigurable extends Configurable {}, function(TestConfigurable, classSuper, instanceSuper) {this.defaultConfig = {name: "TestName", verbose: false}; this.defaults(this.defaultConfig);});});});
//# sourceMappingURL=TestConfigurable.js.map
