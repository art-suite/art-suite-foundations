"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {return {cleanErrorStack: function(error, stackTraceIgnoreLineRegExp) {error.stack = Caf.array(error.stack.split("\n"), null, (line) => !stackTraceIgnoreLineRegExp.test(line)).slice(0, 30).join("\n"); return error;}};})();});
//# sourceMappingURL=ErrorExtensions.js.map
