{isObject, isString, objectName, isPlainObject, isPlainArray, isTypedArray, isFunction, isNumber} = require '../TypesExtended'
{toInspectedObjects} = require './InspectedObjects'
{w} = require '../ArrayExtensions'
{object} = require '../Iteration'

{formattedInspectObject} = require './FormattedInspectObject'
{formattedInspectString} = require './FormattedInspectString'
{isInspectableArray, formattedInspectArray} = require './FormattedInspectArray'
{alignTabs, postWhitespaceFormatting} = require './AlignTabs'

formattedInspectRecursive = (m, maxLineLength, options) ->
  if isInspectableArray m   then formattedInspectArray  m, maxLineLength, options, formattedInspectRecursive
  else if isString m        then formattedInspectString m, options
  else if isObject m
    if isFunction m.inspect
      options.colorize.yellow m.inspect()
    else
      formattedInspectObject m, maxLineLength, options, formattedInspectRecursive

  else options.colorize.yellow "#{m}"

colorNames = w("red yellow green blue grey")
colorizeFunctions = object colorNames, (c) -> (str) -> str[c] ? str

identity = (s) -> s
passThroughColorizeFunctions = object colorNames, -> identity

module.exports =
  alignTabs: alignTabs
  formattedInspectString: formattedInspectString
  failsafeInspect: failsafeInspect = (toInspect) ->
    "typeof: #{typeof toInspect}\n" +
    "constructor: #{toInspect?.constructor && toInspect?.constructor?.name}\n" +
    switch
      when isInspectableArray toInspect then "length: #{toInspect.length}\njoined: [#{toInspect.join(', ')}]"
      when toInspect? && typeof toInspect == 'object' then "keys: #{Object.keys(toInspect).join ', '}"
      else "toString: #{toInspect}"

  formattedInspect: (toInspect, options = {}) ->
    try
      if isNumber options
        maxLineLength = options
      else if isPlainObject options
        {indent, unquoted, color: colorizeEnabled, maxLineLength, maxArrayLength} = options
      else
        console.error invalid: {options}
        throw new Error "invalid options object type: #{typeof options}"

      maxLineLength ?= global.process?.stdout?.columns || 80
      maxArrayLength ?= 100
      indent ?= "  "

      out = postWhitespaceFormatting maxLineLength,
        formattedInspectRecursive toInspectedObjects(toInspect), maxLineLength, {
          unquoted, indent, maxLineLength, maxArrayLength
          newLineWithIndent: "\n#{indent}"
          colorize:
            if colorizeEnabled
              colorizeFunctions
            else
              passThroughColorizeFunctions
        }

      .replace /\n\n$/, "\n"
    catch error
      out = "Error in formattedInspect: #{error}\n#{failsafeInspect toInspect}"
      console.error out, {error, toInspect, options}
      out