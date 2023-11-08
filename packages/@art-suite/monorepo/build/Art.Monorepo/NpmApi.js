"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["getJson", "objectWith"], [global, require('art-standard-lib'), require('art-rest-client')], (getJson, objectWith) => {let getPublishedPackageInfo, getLatestPublishedPackageJson; return {getPublishedPackageInfo: getPublishedPackageInfo = function(packageName) {return getJson(`https://registry.npmjs.org/${Caf.toString(packageName)}`).then((props) => objectWith(props, {distTags: props["dist-tags"]}));}, getLatestPublishedPackageJson: getLatestPublishedPackageJson = function(packageName) {return getJson(`https://registry.npmjs.org/${Caf.toString(packageName)}/latest`);}};});});
//# sourceMappingURL=NpmApi.js.map
