"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let isNull, isNullish; return {exists: (value) => value != null, isNull: isNull = (value) => value === null, isNotNull: (value) => !isNull(value), isNullish: isNullish = (value) => value === null || value === undefined, isNotNullish: (value) => !isNullish(value)};});
//# sourceMappingURL=TypesCaf.js.map
