"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["lowerCamelCase", "present", "Number", "repeat", "ansiWordwrap", "min", "process", "isFunction", "Error", "formattedInspect", "merge"], [global, require('./StandardImport'), {ansiWordwrap: require('ansi-wordwrap')}], (lowerCamelCase, present, Number, repeat, ansiWordwrap, min, process, isFunction, Error, formattedInspect, merge) => {let normalizeCommandName, wrap, wrapProse; return {normalizeCommandName: normalizeCommandName = lowerCamelCase, wrap: wrap = function(text, indent, maxWidth = 160) {let m, res; return present(text) ? ((Caf.is(indent, Number) && indent > 0) ? indent = repeat(" ", indent) : undefined, /\n/.test(text) ? Caf.array(text.split("\n"), (line) => wrap(line, indent, maxWidth)).join("\n") : ((m = text.match(/^ +/)) ? indent = `${Caf.toString(indent)}${Caf.toString(m[0])}` : undefined, res = ansiWordwrap(text, {width: min(maxWidth, process.stdout.columns - 1 - (indent ? indent.length : 0))}), ((Caf.exists(indent) && indent.length) > 0) ? indent + res.replace(/\n/g, `\n${Caf.toString(indent)}`) : res)) : undefined;}, wrapProse: wrapProse = function(text, indent) {return wrap(text, indent, 100);}, normalizeCommands: function(inputCommands) {let commands, temp; commands = Caf.object(inputCommands, (v, k) => isFunction(v) ? {run: v} : !isFunction(Caf.exists(v) && v.run) ? (() => {throw new Error(`${Caf.toString(k)}'s run value is not a plain function. Details:\n\n${Caf.toString(formattedInspect({[k]: v}))}`);})() : v, null, null, (v, k) => normalizeCommandName(k)); ((temp = commands.help) != null ? temp : commands.help = {args: {argument: "command name", description: "command to display help for"}, description: "display help, optionally for a specific command"}); return commands;}, normalizeParsedOptionsWithDefaults: function(options, commandOptions = {}) {return merge(Caf.object(commandOptions, (v, k) => v.default, (v, k) => v.default != null), Caf.object(options, (v, k) => {let temp, base; return (() => {switch (v.length) {case 0: return ((temp = Caf.exists(base = commandOptions[k]) && base.default) != null ? temp : true); case 1: return v[0]; default: return v;};})();}));}};});});
//# sourceMappingURL=Util.js.map