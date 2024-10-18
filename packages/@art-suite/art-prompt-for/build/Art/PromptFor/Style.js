"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["merge", "red", "blue", "green", "cyan", "white", "bold", "whiteBright", "greenBright"], [global, require('art-standard-lib'), require('chalk')], (merge, red, blue, green, cyan, white, bold, whiteBright, greenBright) => {let hex; hex = require('chalk').hex.bind(require('chalk')); return merge({red, blue, green, cyan, white, yellow: hex("#ffd400"), bold, brightWhite: whiteBright, brightGreen: greenBright, grey: require('chalk').hex("#777").bold, red: require('chalk').hex("#e96b00").bold, blue: require('chalk').hex("#65b1ff")});});});
//# sourceMappingURL=Style.js.map
