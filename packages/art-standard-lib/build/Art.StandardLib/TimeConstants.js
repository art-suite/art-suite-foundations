"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let longTimeNames, normalizedTimeNames, secondsPer; longTimeNames = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", mo: "month", y: "year", w: "week"}; Caf.object(longTimeNames, (v, k) => k, null, normalizedTimeNames = {}, (v, k) => v); Caf.object(longTimeNames, (v, k) => k, null, normalizedTimeNames); secondsPer = {ms: 1 / 1000, s: 1, m: 60, h: 3600, d: 24 * 3600, w: 24 * 3600 * 7, mo: 24 * 3600 * 365.2425 / 12, y: 24 * 3600 * 365.2425}; Caf.each2(normalizedTimeNames, (shortName, name) => secondsPer[name] = secondsPer[shortName]); return {normalizedTimeNames, longTimeNames, secondsPer};});
//# sourceMappingURL=TimeConstants.js.map
