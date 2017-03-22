{isString, isPlainObject, isPlainArray, isFunction, isNumber} = require '../TypesExtended'
{max} = Math
{pad, stripTrailingWhitespace, escapeJavascriptString} = require '../StringExtensions'
{inspect} = require './Inspector'
{objectKeyCount} = require '../ObjectExtensions'
{toInspectedObjects} = require './InspectedObjects'

indentString = '  '
indentLength = indentString.length
newLineWithIndentString = "\n#{indentString}"

formattedInspectObject = (m, maxLineLength, options) ->
  inspectedLength = 0

  forceMultilineOutput = false
  shouldBeOnOwnLine = false
  keyCount = 0

  inspectedValues = for key, value of m
    keyCount++
    inspected = formattedInspectRecursive value, maxLineLength - indentLength, options

    if inspected.match /\n/
      inspected = if inspected.match /^\[\]/
        "#{inspected}"
      else
        newLineWithIndentString + inspected.replace /\n/g, newLineWithIndentString
      inspected += "\n"
    else if ansiSafeStringLength(inspected) > maxLineLength - (key.length + 2)
      inspected = "#{newLineWithIndentString}#{inspected}\n"

    key = inspect key unless key.match /^[-._a-zA-Z[_a-zA-Z0-9]*$/
    inspectedLength += ansiSafeStringLength(inspected) + key.length + 2
    forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line
    shouldBeOnOwnLine = !inspected.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
    [key, inspected, value]

  return "{}" if keyCount == 0

  index = 0
  finalInspectedValues = for [k, v, value] in inspectedValues
    key = "#{k}:"
    key = key.blue if options.color
    if isPlainObject(value) && objectKeyCount(value) == 1
      "#{key} #{v}"
    else
      "#{key}\t#{v}"

  finalInspectedValues.join if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
    ",\t"
  else
    "\n"

formattedInspectArray = (m, maxLineLength, options) ->
  lengthOfInspectedValues = 0
  lastWasObject = false
  lastWasArray = false
  objectsMustBeExplicit = false
  oneLinerOk = true
  inspectedValuesContainNewlines = false

  for value, i in m
    if isPlainObject value
      oneLinerOk = false if i < m.length - 1 # non-tail object
      objectsMustBeExplicit = true if lastWasObject
      lastWasObject = true
    else
      lastWasObject = false

  inspectedValues = for value in m

    oneLinerOk = false if lastWasArray

    if isPlainArray value
      lastWasArray = true

    inspected = formattedInspectRecursive value, maxLineLength - indentLength, options

    inspectedHasNewlines = /\n/.test inspected

    if objectsMustBeExplicit && isPlainObject value
      inspected = if inspectedHasNewlines
        "{}#{newLineWithIndentString}#{inspected.replace(/\n/g, newLineWithIndentString)}"
      else
        "{} #{inspected}"

    if inspectedHasNewlines
      oneLinerOk = false
      inspected = inspected.replace(/\n/g, newLineWithIndentString) + "\n"

    lengthOfInspectedValues += ansiSafeStringLength inspected
    inspected

  lengthOfCommas = (inspectedValues.length - 1) * 2
  lengthOfStartBrackets = 3

  out = if oneLinerOk && maxLineLength >= lengthOfStartBrackets + lengthOfCommas + lengthOfInspectedValues
    if inspectedValues.length == 0
      "[]"
    else # if inspectedValues.length <= 1
      "[] #{inspectedValues.join ",\t"}"
    # else
    #   inspectedValues.join ",\t"
  else
    """
    []
      #{inspectedValues.join "\n  "}
    """

  if options.color
    out.replace /^\[\]/, "[]".gray
  else
    out

escapeForBlockString = (str) =>
  console.log "escapeForBlockString", escapeJavascriptString str
  String(str).replace /[\\\0\b\f\r\t\v\u001b\u2028\u2029]/g, (x) ->
    switch x
      when '\\'     then '\\\\'
      when '\0'     then "\\0"
      when '\b'     then "\\b"
      when '\f'     then "\\f"
      # when '\n'     then "\\n"
      when '\r'     then "\\r"
      when '\t'     then "\\t"
      when '\v'     then "\\v"
      when '\u2028' then "\\u2028"
      when '\u2029' then "\\u2029"
      when '\u001b' then '\\u001b'

formattedInspectString = (m, options) ->
  out = if m.match(/\n/) && !m.match /\ (\n|$)/
    [
      '"""'
      escapeForBlockString(m)
      .replace /\n/g, newLineWithIndentString
    ].join '\n  '

  # else if m.length > 10 && m.match / /
  #   TODO: support ""-block output using a word-wrap strategy if we can do-so isomorphically.
  #   i.e. the output string would generate exactly the input string in Caffeine-Script
  else
    escapeJavascriptString m

  if options.color
    out.green
  else
    out

formattedInspectRecursive = (m, maxLineLength, options) ->
  if isPlainObject m      then formattedInspectObject m, maxLineLength, options
  else if isPlainArray m  then formattedInspectArray  m, maxLineLength, options
  else if isString m      then formattedInspectString m, options
  else
    out = inspect m
    if options.color
      out.yellow
    else
      out

alignTabs = (linesString, maxLineLength = 10000) ->
  tabStops = 1
  lines = linesString.split "\n"

  # if all lines have the same number of columns, then numColumns == that number
  # Otherwise, it == 2.
  # In that case, all tabs after the first tabs are treated as spaces.
  # This a poor man's attempt to smartly align things like:
  #   {} AttributeName: "chatRoom",   AttributeType: "S"
  #   {} AttributeName: "createdAt",  AttributeType: "N"
  #   {} AttributeName: "id",         AttributeType: "S"
  # A better test would be if each column had the same label...

  numColumnsToPad = null
  maxColumnSizes = []
  maxColumnWidth = maxLineLength / 2
  for line in lines when (elements = line.split "\t").length > 1
    if !numColumnsToPad?
      numColumnsToPad = elements.length - 1
    else if numColumnsToPad != elements.length - 1
      numColumnsToPad = 1

    for el, i in elements when i < elements.length - 1 && (i == 0 || ansiSafeStringLength(el) < maxColumnWidth)
      maxColumnSizes.push 0 if maxColumnSizes.length == i
      maxColumnSizes[i] = max maxColumnSizes[i], ansiSafeStringLength(el) + 1

  alignedLines = for line in lines
    spaceAvailable = maxLineLength - ansiSafeStringLength line
    elements = line.split "\t"
    r = if elements.length > 1
      for el, i in elements
        elLength = ansiSafeStringLength el
        if i == elements.length - 1
          el
        else if maxColumnSizes[i]? && (expandAmount = maxColumnSizes[i] - elLength - 1) <= spaceAvailable
          spaceAvailable -= expandAmount
          el + pad '', maxColumnSizes[i] - elLength
        else
          spaceAvailable = 0
          "#{el} "
    else
      elements
    r.join ""

  alignedLines.join "\n"

ansiRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g

stripAnsi = (str) ->
  if ansiRegex.test str
    str.replace ansiRegex, ''
  else
    str

ansiSafeStringLength = (str)->
  throw new Error "not string" unless isString str
  if ansiRegex.test str
    str = str.replace ansiRegex, ''
    # console.log ansiSafeStringLength:
    #   str: str
    #   length: str.length
  str.length

postWhitespaceFormatting = (maxLineLength, string) ->
  lastIndent = 0
  sameIndentGroup = []
  outLines = []

  alignTabsInSameIndentGroup = ->
    return unless 0 < sameIndentGroup.length
    str = sameIndentGroup.join "\n"
    sameIndentGroup = []
    # console.log alignTabsInSameIndentGroup: maxLineLength: maxLineLength, str: str
    outLines.push alignTabs str, maxLineLength

  for line in string.split "\n"
    line = line.replace /\s+$/g, ''

    if lastIndent != indent = ansiSafeStringLength line.match(/^ *-?/)[0]
      alignTabsInSameIndentGroup()
      # outLines.push "" if indent < lastIndent

    sameIndentGroup.push line
    lastIndent = indent

  alignTabsInSameIndentGroup()

  outLines.join '\n'

module.exports = class FormattedInspect
  @ansiRegex: ansiRegex
  @stripAnsi: stripAnsi
  @ansiSafeStringLength: ansiSafeStringLength
  @alignTabs: alignTabs
  @formattedInspect: (toInspect, options = {}) ->
    try
      options = maxLineLength: options if isNumber options
      options.maxLineLength ?= global.process?.stdout?.columns || 80
      {maxLineLength} = options

      out = postWhitespaceFormatting maxLineLength,
        formattedInspectRecursive toInspectedObjects(toInspect), maxLineLength, options
      .replace /\n\n\n+/g, "\n\n"
      .replace /\n\n$/, "\n"
    catch error
      console.error out = "Error in formattedInspect", {error, toInspect, options}
      out