"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["console", "formattedInspect"], [global, require('./FormattedInspect')], (console, formattedInspect) => {return {shallowInspect: function(a) {console.log("'shallowInspect' is DEPRECATED: use 'formattedInspect' instead"); return formattedInspect(a, {maxDepth: 1});}, inspectLean: function(a) {console.log("'inspectLean' is DEPRECATED: use 'formattedInspect' instead"); return formattedInspect(a);}, inspect: function(a) {console.log("'inspect' is DEPRECATED: use 'formattedInspect' instead"); return formattedInspect(a);}};});});
//# sourceMappingURL=DeprecatedInspectors.js.map
