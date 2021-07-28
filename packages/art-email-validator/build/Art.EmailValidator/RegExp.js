"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return {findAllNonDomainCharactersRegexp: /[ \-\\\]!"\#$%&'()*+,\/:;<=>?@[^_{|}~`]+/gi, simpleValidDomainRegexp: /^[^.].*\..*[^.]$/};});
//# sourceMappingURL=RegExp.js.map
