"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {let parentImports; return Caf.importInvoke(["ArtCli"], parentImports = [global, require('./StandardImport')], (ArtCli) => {return Caf.importInvoke(["describe", "test", "start", "assert", "merge", "stripAnsi"], [parentImports, ArtCli.Main], (describe, test, start, assert, merge, stripAnsi) => {let expectedGoOutput; expectedGoOutput = "myCommand-myCommand-myCommand"; return describe({mainSuite: function() {test("start + myCommand", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: () => myCommandRan = true}, argv: ["nodeJs", "startFile", "myCommand"], output: assert.true}).then((out) => {assert.true(out); return assert.eq({myCommandRan}, {myCommandRan: true});});}); test("start + preprocessOptions", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: ({x}) => {return {myX: x | 0};}}, argv: ["nodeJs", "startFile", "myCommand", "--x", "123"], preprocessOptions: (options) => merge(options, {x: (options.x | 0) + 1}), output: () => {}}).then((out) => assert.eq(out, {myX: 124}));}); test("start + myCommand --verbose", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: () => myCommandRan = true}, argv: ["nodeJs", "startFile", "myCommand", "anArg", "--verbose"], output: assert.jsTrue}).then((out) => {assert.true(out); return assert.eq({myCommandRan}, {myCommandRan: true});});}); test("extra args past as args", () => start({commands: {myCommand: (options, args) => assert.eq(args, ["arg"])}, argv: ["nodeJs", "startFile", "myCommand", "arg"]})); test("argsToOptions", () => start({commands: {myCommand: {run: (options) => assert.eq(options.myArgs, ["arg"]), options: {myArgs: {required: true}}, args: {argsToOptions: (args) => {return {myArgs: args};}}}}, argv: ["nodeJs", "startFile", "myCommand", "arg"]})); test("args undefined if there are no extra args", () => start({commands: {myCommand: (options, args) => assert.eq(args, undefined)}, argv: ["nodeJs", "startFile", "myCommand"]})); test("start + myCommand + --help", () => {let myCommandRan, description, more; myCommandRan = false; return start({commands: {myCommand: {description: description = "xyz123 description", options: {more: more = "abc123 --more description"}, run: () => myCommandRan = true}}, argv: ["nodeJs", "startFile", "myCommand", "--help"], output: assert.jsTrue}).then(stripAnsi).then((out) => {assert.false(myCommandRan); assert.match(out, description); return assert.match(out, more);});}); test("start with no args", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: () => myCommandRan = true}, argv: ["nodeJs", "startFile"], output: () => {}}).then(stripAnsi).then((output) => {assert.match(output, "startFile my-command"); return assert.eq({myCommandRan}, {myCommandRan: false});});}); test("start with no args and default", () => {let myCommandOutput; myCommandOutput = undefined; return start({commands: {myCommand: () => myCommandOutput = expectedGoOutput}, default: "myCommand", argv: ["nodeJs", "startFile"], output: assert.jsTrue}).then(stripAnsi).then((output) => {assert.match(output, expectedGoOutput); return assert.eq({myCommandOutput}, {myCommandOutput: expectedGoOutput});});}); test("start + noGo", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: () => myCommandRan = true}, argv: ["nodeJs", "startFile", "noGo"], output: () => {}}).then(stripAnsi).then((output) => {assert.match(output, "startFile my-command"); return assert.eq({myCommandRan}, {myCommandRan: false});});}); return test("default help command", () => {let myCommandRan; myCommandRan = false; return start({commands: {myCommand: () => myCommandRan = true}, argv: ["nodeJs", "startFile", "help"], output: () => {}}).then(stripAnsi).then((output) => {assert.match(output, "startFile my-command"); return assert.eq({myCommandRan}, {myCommandRan: false});});});}});});});});
//# sourceMappingURL=Main.test.js.map