"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["formattedInspect", "test", "assert"], [global, require('art-standard-lib'), require('../'), require('@art-suite/assert')], (formattedInspect, test, assert) => {return [require('art-standard-lib'), require('@art-suite/assert'), require('../'), {pairedAssertTests: function(trueAssertName, notTrueAssertName, truthToValueTuples) {return Caf.each2(truthToValueTuples, ([truth, ...args]) => {let vString; vString = (args.length === 1) ? formattedInspect(args[0]) : formattedInspect(args); return test(`${Caf.toString(truth)}: assert.${Caf.toString(trueAssertName)}(${Caf.toString(vString)})`, () => {let acceptsTest, rejectsTest, runTrueAsset, runNotTrueAssert; ([acceptsTest, rejectsTest] = ([runTrueAsset, runNotTrueAssert] = [() => assert[trueAssertName](...args, `expected assert.${Caf.toString(trueAssertName)}(${Caf.toString(vString)}) to be ${Caf.toString(truth)}`), () => assert[notTrueAssertName](...args, `expected assert.${Caf.toString(notTrueAssertName)}(${Caf.toString(vString)}) to be ${Caf.toString(!truth)}`)], [runTrueAsset, runNotTrueAssert])); if (!truth) {([acceptsTest, rejectsTest] = [runNotTrueAssert, runTrueAsset]);}; acceptsTest(); return assert.rejects(rejectsTest);});});}}];});});
//# sourceMappingURL=StandardImport.js.map