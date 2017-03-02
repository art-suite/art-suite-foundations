{isString, isPlainObject, isPlainArray, isFunction, isNumber} = require '../TypesExtended'
{max} = Math
{pad, stripTrailingWhitespace, escapeJavascriptString} = require '../StringExtensions'
{inspect} = require './Inspector'
{toInspectedObjects} = require './InspectedObjects'

indentString = '  '
indentLength = indentString.length
newLineWithIndentString = "\n#{indentString}"

formattedInspectObject = (m, maxLineLength) ->
  inspectedLength = 0

  forceMultilineOutput = false
  shouldBeOnOwnLine = false
  keyCount = 0

  inspectedValues = for key, value of m
    keyCount++
    inspected = formattedInspectRecursive value, maxLineLength - indentLength

    if inspected.match /\n/
      inspected = if inspected.match /^- /
        "\n#{inspected}"
      else
        newLineWithIndentString + inspected.replace /\n/g, newLineWithIndentString
      inspected += "\n"
    else if inspected.length > maxLineLength - (key.length + 2)
      inspected = "#{newLineWithIndentString}#{inspected}\n"

    key = inspect key unless key.match /^[-._a-zA-Z[_a-zA-Z0-9]*$/
    inspectedLength += inspected.length + key.length + 2
    forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line
    shouldBeOnOwnLine = !inspected.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
    [key, inspected]

  return "{}" if keyCount == 0

  index = 0
  finalInspectedValues = for [k, v] in inspectedValues
    "#{k}:\t#{v}"

  finalInspectedValues.join if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
    ",\t"
  else
    "\n"

formattedInspectArray = (m, maxLineLength, implicitRepresentationOk) ->
  inspectedLength = 0
  lastWasObject = false
  lastWasArray = false
  containsConsecutiveObjects = false
  containsConsecutiveArrays = false
  inspectedValues = for value in m
    implicitRepresentationOk = true
    if _isPlainObject = isPlainObject value
      containsConsecutiveObjects ||= lastWasObject
      lastWasObject = true
    else
      lastWasObject = false

    if isPlainArray value
      implicitRepresentationOk = false
      containsConsecutiveArrays ||= lastWasArray
      lastWasArray = true

    inspected = formattedInspectRecursive value, maxLineLength - indentLength, implicitRepresentationOk

    if inspected.match /\n/
      inspected = inspected.replace(/\n/g, newLineWithIndentString) + "\n"

    inspectedLength += inspected.length
    inspected

  if !containsConsecutiveArrays && !containsConsecutiveObjects && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
    if inspectedValues.length == 0
      "[]"
    else if inspectedValues.length <= 1
      "- #{inspectedValues.join ",\t"}"
    else
      inspectedValues.join ",\t"
  else
    indentedInspectedArray = for inspectedEl, i in inspectedValues
      "- #{inspectedEl}"
    """
    #{indentedInspectedArray.join "\n"}
    """

formattedInspectString = (m) ->
  if m.length > 10 && m.match(/\n/) && !m.match /\ (\n|$)/
    [
      '"""'
      m.replace(/"""/g, '""\\"').replace /\\/g, '\\\\'
      '"""'
    ].join '\n'
  else
    escapeJavascriptString m

formattedInspectRecursive = (m, maxLineLength, implicitRepresentationOk) ->
  if isPlainObject m      then formattedInspectObject m, maxLineLength
  else if isPlainArray m  then formattedInspectArray  m, maxLineLength, implicitRepresentationOk
  else if isString m      then formattedInspectString m
  else
    inspect m

alignTabs = (maxLineLength, linesString) ->
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

    for el, i in elements when i < elements.length - 1 && (i == 0 || el.length < maxColumnWidth)
      maxColumnSizes.push 0 if maxColumnSizes.length == i
      maxColumnSizes[i] = max maxColumnSizes[i], el.length + 1

  alignedLines = for line in lines
    spaceAvailable = maxLineLength - line.length
    elements = line.split "\t"
    r = if elements.length > 1
      for el, i in elements
        if i == elements.length - 1
          el
        else if maxColumnSizes[i]? && (expandAmount = maxColumnSizes[i] - el.length - 1) <= spaceAvailable
          spaceAvailable -= expandAmount
          pad el, maxColumnSizes[i]
        else
          spaceAvailable = 0
          "#{el} "
    else
      elements
    r.join ""

  alignedLines.join "\n"

# alignTabStopsByBlocks = (maxLineLength, linesString) ->
#   alignTabs maxLineLength, linesString

postWhitespaceFormatting = (maxLineLength, string) ->
  lastIndent = 0
  sameIndentGroup = []
  outLines = []

  alignTabsInSameIndentGroup = ->
    return unless sameIndentGroup.length > 0
    str = sameIndentGroup.join "\n"
    sameIndentGroup = []
    outLines.push alignTabs maxLineLength, str

  for line in string.split "\n"
    line = line.replace /\s+$/g, ''

    if lastIndent != indent = line.match(/^ *-?/)[0].length
      alignTabsInSameIndentGroup()
      # outLines.push "" if indent < lastIndent

    sameIndentGroup.push line
    lastIndent = indent

  alignTabsInSameIndentGroup()

  outLines.join '\n'

module.exports = class FormattedInspect
  @formattedInspect: (toInspect, options = {}) ->
    try
      maxLineLength = if isNumber options
        options
      else
        options.maxLineLength || 80

      out = postWhitespaceFormatting maxLineLength,
        formattedInspectRecursive toInspectedObjects(toInspect), maxLineLength
      .replace /\n\n\n+/g, "\n\n"
      .replace /\n\n$/, "\n"
    catch error
      console.error out = "Error in formattedInspect", {error, toInspect, options}
      out