"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["isPlainObject", "Error", "pushIfNotPresent"], [global, require('art-standard-lib')], (isPlainObject, Error, pushIfNotPresent) => {let ArtConfig, ConfigRegistry; ArtConfig = require("./namespace"); return ConfigRegistry = Caf.defClass(class ConfigRegistry extends Object {}, function(ConfigRegistry, classSuper, instanceSuper) {this.configurables = []; this.configs = {}; this.registerConfig = (name, config) => {if (!isPlainObject(config)) {throw new Error("config must be a plain object");}; return this.configs[name] = config;}; this.registerConfigurable = (configurable) => pushIfNotPresent(this.configurables, configurable);});});});
//# sourceMappingURL=ConfigRegistry.js.map
