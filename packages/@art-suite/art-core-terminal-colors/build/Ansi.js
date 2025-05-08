"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let ansiRegex; return {ansiRegex: ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, stripAnsi: function(str) {return ansiRegex.test(str) ? str.replace(ansiRegex, "") : str;}, ansiSafeStringLength: function(str) {if (ansiRegex.test(str)) {str = str.replace(ansiRegex, "");}; return str.length;}};});
//# sourceMappingURL=Ansi.js.map
