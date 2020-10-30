"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let notPublished = global.notPublished, tagName; return notPublished ? (tagName = "published", `npm publish\ngit tag -f ${Caf.toString(tagName)}\ngit push origin "${Caf.toString(tagName)}" --force`) : undefined;});
//# sourceMappingURL=Publish.js.map
