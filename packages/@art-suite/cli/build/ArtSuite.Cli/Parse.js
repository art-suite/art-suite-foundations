"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return Caf.importInvoke(["JSON", "ParseError", "lowerCamelCase", "normalizeCommandName", "normalizeParsedOptionsWithDefaults", "mergeInto", "Object", "log"], [global, require('./StandardImport'), require('./Util'), {ParseError: require('./ParseError')}], (JSON, ParseError, lowerCamelCase, normalizeCommandName, normalizeParsedOptionsWithDefaults, mergeInto, Object, log) => {let Parse; return Parse = Caf.defClass(class Parse extends Object {}, function(Parse, classSuper, instanceSuper) {this.optionRegExp = /^--([^=\[\]]+)(\[\])?(=(.+))?$/; this.evalJsRegExp = /^js:(.*)$/; this.typedArgumentRegExp = /^([a-z]+):(.*)$/; this.numberRegExp = /^[-+]?([0-9]*\.[0-9]+|[0-9]+)([eE][-+]?[0-9]+)?$/i; this.parseValue = function(value, errorContext) {let typedMatch, __, type, rawValue, error; return (() => {switch (false) {case !(value === "true"): return true; case !(value === "false"): return false; case !this.numberRegExp.test(value): return value / 1; case !(typedMatch = this.typedArgumentRegExp.exec(value)): ([__, type, rawValue] = typedMatch); return (() => {switch (type) {case "string": return rawValue; case "json": return (() => {try {return JSON.parse(rawValue);} catch (error1) {error = error1; return (() => {throw new ParseError(`Error parsing JSON rawValue for ${Caf.toString(errorContext)}: ${Caf.toString(error.message)}\n  Value: ${Caf.toString(rawValue)}`);})();};})(); case "js": return (() => {try {return eval(rawValue);} catch (error2) {error = error2; return (() => {throw new ParseError(`Error parsing JavaScript rawValue for ${Caf.toString(errorContext)}: ${Caf.toString(error.message)}\n  Value: ${Caf.toString(rawValue)}`);})();};})(); default: return value;};})(); default: return value;};})();}; this.parseArgs = (inputArgs) => {let errorContext, currentValueAccumulator, args, currentIsArray, commandName, options; errorContext = null; currentValueAccumulator = args = []; currentIsArray = false; if (inputArgs[0] && !this.optionRegExp.test(inputArgs[0])) {commandName = inputArgs[0]; inputArgs.shift();}; Caf.each2(inputArgs, (argument, i) => {let option, _, optionName, isArray, value, temp; return (option = argument.match(this.optionRegExp)) ? (([_, optionName, isArray, _, value] = option), currentIsArray = !!isArray, errorContext = argument, currentValueAccumulator = ((temp = options[lowerCamelCase(optionName)]) != null ? temp : options[lowerCamelCase(optionName)] = []), value ? (currentValueAccumulator.push(this.parseValue(value, errorContext)), errorContext = null, currentValueAccumulator = args) : undefined) : (currentValueAccumulator.push(this.parseValue(argument, errorContext != null ? errorContext : `argument ${Caf.toString(i + 1)}`)), !currentIsArray ? (errorContext = null, currentValueAccumulator = args) : undefined);}, null, options = {}); return {commandName, options, args};}; this.getCommandFunction = function(commands, commandName) {let command; return (command = commands[normalizeCommandName(commandName)]) ? command.run : undefined;}; this.parseAndSelectCommand = (commands, args, defaultCommandName) => {let commandName, options, selectedCommandConfig, commandFunction, argsToOptions, legalOptions, base, temp, temp1; ({commandName, options, args} = this.parseArgs(args)); commandName = lowerCamelCase(commandName != null ? commandName : defaultCommandName); if (selectedCommandConfig = commands[commandName]) {commandFunction = selectedCommandConfig.run; if (!((Caf.exists(args) && args.length) > 0)) {args = Caf.exists(base = selectedCommandConfig.args) && base.default;}; options = normalizeParsedOptionsWithDefaults(options, selectedCommandConfig.options); if (Caf.exists(temp = selectedCommandConfig.args) ? argsToOptions = temp.argsToOptions : undefined) {mergeInto(options, argsToOptions(args || []));}; if (selectedCommandConfig.onlyAllowListedOptions && !options.help) {legalOptions = ((temp1 = selectedCommandConfig.options) != null ? temp1 : {}); Caf.find(options, (v, k) => {legalOptions = Caf.array(Object.keys(selectedCommandConfig.options), (v) => `--${Caf.toString(v)}`); return (() => {throw new ParseError(`Option '${Caf.toString(k)}' is not a legal option for command '${Caf.toString(commandName)}'. Legal options: ${Caf.toString(legalOptions.join(", "))}`);})();}, (v, k) => !legalOptions[k]);} else {Caf.each2(selectedCommandConfig.options, (optionConfig, k) => {let message; message = `Option '--${Caf.toString(k)}' is required for command '${Caf.toString(commandName)}'`; return options.help ? log.error(message) : (() => {throw new ParseError(message);})();}, (optionConfig, k) => optionConfig.required && !(options[lowerCamelCase(k)] != null));};}; return {commandFunction, commandName, options, args};};});});});
//# sourceMappingURL=Parse.js.map