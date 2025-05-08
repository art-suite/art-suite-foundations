"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["isString"], [global, require('@art-suite/art-core-types')], (isString) => {let wordsRegex, exactlyOneWordRegex; wordsRegex = /[^\s]+/g; exactlyOneWordRegex = /^[^\s]+$/; return {w: function(...args) {let out, from, into, to, i; out = []; from = args; into = from; if (from != null) {to = from.length; i = 0; while (i < to) {let arg; arg = from[i]; if (isString(arg) && !arg.match(exactlyOneWordRegex)) {out = out.concat(arg.match(wordsRegex));} else {out.push(arg);}; i++;};}; into; return out;}};});});
//# sourceMappingURL=ArrayConstructors.js.map
