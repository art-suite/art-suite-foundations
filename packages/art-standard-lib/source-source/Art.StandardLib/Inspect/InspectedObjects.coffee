{isTypedArray, isDate, deepMap, isNonNegativeInt, isClass, isPlainArray, isPlainObject, isString, isFunction, isPromise, isRegExp} = require '../TypesExtended'
{escapeJavascriptString} = require '../StringExtensions'
{inspectedObjectLiteral} = require './InspectedObjectLiteral'
dateFormat = require 'dateformat'

module.exports = class InspectedObjects
  @toInspectedObjects: toInspectedObjects = (m) ->
    return m unless m?
    oldm = m
    if m == global
      inspectedObjectLiteral "global"
    else if out = m.getInspectedObjects?()
      out
    else if isPromise m
      inspectedObjectLiteral "Promise"
    else if isPlainObject(m) || isPlainArray(m)
      deepMap m, (v) -> toInspectedObjects v
    else if isTypedArray m
      m
    else if m instanceof Error
      literal = inspectedObjectLiteral m.stack || m.toString(), true
      if m.info
        toInspectedObjects Error: info: m.info, stack: literal
      else
        Error:
          class: toInspectedObjects m.constructor
          stack: literal

    else if isRegExp m
      inspectedObjectLiteral "#{m}"

    else if isDate m
      inspectedObjectLiteral dateFormat m, "UTC:yyyy-mm-dd HH:MM:ss Z"

    else if isClass m
      inspectedObjectLiteral "class #{m.getName?() || m.name}"

    else if isFunction m
      functionString = "#{m}"
      reducedFunctionString = functionString
      .replace /\s+/g, ' '
      .replace /^function (\([^)]*\))/, "$1 ->"
      .replace /^\(\)\s*/, ''
      inspectedObjectLiteral if reducedFunctionString.length < 80
        reducedFunctionString
      else
        functionString.slice 0, 5 * 80
    else if m && !isString m
      if isNonNegativeInt m.length
        inspectedObjectLiteral "{#{m.constructor.name} length: #{m.length}}"
      else if isNonNegativeInt m.byteLength
        inspectedObjectLiteral "{#{m.constructor.name} byteLength: #{m.byteLength}}"
      else m
    else
      m
