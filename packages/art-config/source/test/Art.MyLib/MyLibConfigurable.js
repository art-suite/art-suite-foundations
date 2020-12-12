"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["Configurable"], [global, require('../StandardImport')], (Configurable) => {let MyLibConfigurable; return MyLibConfigurable = Caf.defClass(class MyLibConfigurable extends Configurable {}, function(MyLibConfigurable, classSuper, instanceSuper) {this.defaultConfig = {name: "MyLib", level: 1}; this.defaults(this.defaultConfig);});});});
//# sourceMappingURL=MyLibConfigurable.js.map
