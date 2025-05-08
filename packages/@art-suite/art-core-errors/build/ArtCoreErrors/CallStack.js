"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let Error = global.Error, CallStackLine, rawCallStack; CallStackLine = require("./CallStackLine"); return {rawCallStack: rawCallStack = function(ignoreTop = 0) {return (new Error).stack.split(/\n  */).slice(ignoreTop + 2);}, callStack: function(ignoreTop = 0) {return Caf.array(rawCallStack(ignoreTop + 1), (line) => new CallStackLine(line));}};});
//# sourceMappingURL=CallStack.js.map
