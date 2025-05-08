"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["currentSecond", "console", "humanDurationString"], [global, require('./currentSecond'), require('./TimePresenters')], (currentSecond, console, humanDurationString) => {return {time: (a, b) => {let f, start, fResult, timeResult; f = b || a; start = currentSecond(); fResult = f(); timeResult = currentSecond() - start; return b ? (console.log(`time: ${Caf.toString(a)} took ${Caf.toString(humanDurationString(timeResult))}`), fResult) : timeResult;}};});});
//# sourceMappingURL=Time.js.map
