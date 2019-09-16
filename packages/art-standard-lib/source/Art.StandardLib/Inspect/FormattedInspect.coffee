{isString, objectName, isPlainObject, isPlainArray, isTypedArray, isFunction, isNumber} = require '../TypesExtended'
{max} = Math
{pad, stripTrailingWhitespace, escapeJavascriptString} = require '../StringExtensions'
{inspect} = require './Inspector'
{objectKeyCount} = require '../ObjectExtensions'
{toInspectedObjects} = require './InspectedObjects'
{w} = require '../ArrayExtensions'
{object} = require '../Iteration'

indentString = '  '
indentLength = indentString.length
newLineWithIndentString = "\n#{indentString}"

formattedInspectObject = (m, maxLineLength, options) ->
  {colorize} = options
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
      inspected += "\n" unless /\n\s*$/.test inspected
    else if ansiSafeStringLength(inspected) > maxLineLength - (key.length + 2)
      inspected = "#{newLineWithIndentString}#{inspected}\n"

    key = inspect key unless /^[-~!@\#$%^&*_+=|\\<>?\/.$\w\u007f-\uffff]+$/.test key
    inspectedLength += ansiSafeStringLength(inspected) + key.length + 2
    forceMultilineOutput ||= shouldBeOnOwnLine # if previous entry should be on own line, force all on own line

    # This regexp can cause Chrome's RegExp engine to become extraordinarily inefficient.
    # SEE: https://jsperf.com/pathological-regexp
    # This string causes the provlem with this regexp: """'{"mappings":{"post_search":{"_parent":{"type":"topic"},"properties":{"topicId":{"type":"keyword"},"userId":{"type":"keyword"},"postOrder":{"type":"long"},"createdAt":{"type":"long"},"updatedAt":{"type":"long"},"isChapterStart":{"type":"boolean"},"caption":{"type":"text","analyzer":"english"},"tags":{"type":"text"},"mentions":{"type":"text"},"mediaMimeType":{"type":"keyword"},"mediaAspectRatio":{"type":"short"},"mediaUrl":{"type":"keyword","index":false},"mediaFocus":{"type":"object","index":false},"mediaDimensions":{"type":"object","index":false},"mediaColorInfo":{"type":"object","index":false},"templateUrl":{"type":"keyword","index":false},"templateType":{"type":"keyword"},"templateDropInCount":{"type":"byte"},"templateText":{"type":"text","analyzer":"english"},"templateDropInLocations":{"type":"nested","index":false},"templateUses":{"type":"integer"},"activityCount":{"type":"integer"},"lastActivityAt":{"type":"long"},"messageCount":{"type":"integer","index":false},"participantCount":{"type":"integer","index":false},"lastActiveUserId":{"type":"keyword","index":false},"lastMessageId":{"type":"keyword","index":false}}},"topic_search":{"_parent":{"type":"user"},"properties":{"title":{"type":"text","analyzer":"english"},"createdAt":{"type":"long"},"updatedAt":{"type":"long"},"lastPostCreatedAt":{"type":"long"},"lastPostId":{"type":"keyword"},"lastChapterPostId":{"type":"keyword"},"postCount":{"type":"integer"},"followerCount":{"type":"integer"},"activityCount":{"type":"long"},"messageCount":{"type":"long"},"isProfileTopic":{"type":"boolean"}}},"user_search":{"properties":{"displayName":{"type":"text","analyzer":"english"},"postCount":{"type":"integer"},"topicCount":{"type":"short"},"followerCount":{"type":"integer"},"messageCount":{"type":"integer"},"lastTopicCreatedAt":{"type":"long"},"lastPostCreatedAt":{"type":"long"},"profileTopicId":{"type":"keyword","index":false}}}},"settings":{}}'"""
    # HACK - right now I'm just assuming any string longer than 100 chars should be on its own line
    shouldBeOnOwnLine = inspected.length > 100 || !inspected.match /^([^,:]|\(.*\)|\{.*\}|\".*\"|\'.*\'|\[.*\])*$/
    [key, inspected, value]

  objectStart = "{}"
  objectStart = colorize.grey objectStart

  if keyCount == 0
    objectStart
  else

    index = 0
    finalInspectedValues = for [k, v, value] in inspectedValues
      key = "#{k}:"
      key = colorize.blue key
      # if isPlainObject(value) && objectKeyCount(value) == 1
      #   "#{key} #{v}"
      # else
      "#{key}\t#{v}"

    finalInspectedValues.join if !forceMultilineOutput && maxLineLength >= inspectedLength + (inspectedValues.length - 1) * 2
      ",\t"
    else
      "\n"

formattedInspectArray = (m, maxLineLength, options) ->
  {colorize} = options
  lengthOfInspectedValues = 0
  lastWasObject = false
  lastWasArray = false
  maxArrayLength = options.maxArrayLength || 100
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

  inspectedValues = for value in m.slice 0, maxArrayLength

    oneLinerOk = false if lastWasArray

    if isInspectableArray value
      lastWasArray = true

    inspected = formattedInspectRecursive value, maxLineLength - indentLength, options

    inspectedHasNewlines = /\n/.test inspected

    if objectsMustBeExplicit && isPlainObject(value) && objectKeyCount(value) > 0
      objectStart = "{}"
      objectStart = colorize.grey objectStart
      inspected = if inspectedHasNewlines
        "#{objectStart}#{newLineWithIndentString}#{inspected.replace(/\n/g, newLineWithIndentString)}"
      else
        "#{objectStart} #{inspected}"

    if inspectedHasNewlines
      oneLinerOk = false
      inspected = inspected.replace /\n/g, newLineWithIndentString
      inspected += "\n" unless /\n\s*$/.test inspected

    lengthOfInspectedValues += ansiSafeStringLength inspected
    inspected

  lengthOfCommas = (inspectedValues.length - 1) * 2
  lengthOfStartBrackets = 3

  arrayStart = if isTypedArray m then "{#{objectName m}}" else "[]"
  if m.length > maxArrayLength
    arrayStart += " <length: #{m.length}>"
    suffix = "..."
  arrayStart = colorize.grey arrayStart

  if oneLinerOk && maxLineLength >= lengthOfStartBrackets + lengthOfCommas + lengthOfInspectedValues
    if inspectedValues.length == 0
      arrayStart
    else
      "#{arrayStart} #{inspectedValues.join ",\t"}#{suffix ? ""}"
  else
    """
    #{arrayStart}
      #{inspectedValues.join "\n  "}#{if suffix then "\n  #{suffix}" else ''}
    """

escapeForBlockString = (str) =>
  String str
  .replace /[\\\0\b\f\r\t\v\u001b\u2028\u2029]/g, (x) ->
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

  # escape leading and trailing spaces
  .replace /^[\n ]+|[\n ]+$|[ ]+(?=\n)/g, (x) ->
    escapeJavascriptString x, true
    .replace /\ /g, '\\s'

cafScriptWordStringRegExp = ///
  ^(?=[^'":])

  (
    [^ \# \s \0-\x20 \x7f ; , () [ \] {} \\ ]
    | \# ([^{]|$)
  )+

  $
///

formattedInspectString = (m, options) ->
  out = switch
    when cafScriptWordStringRegExp.test m
      ":#{m}"
    when /[^\n\s].*\n(.|\n)*[^\n\s]/.test m
      ('"""' + newLineWithIndentString +
      escapeForBlockString(m).replace /\n/g, newLineWithIndentString
      ).replace /\ +\n/g, '\n'

    # else if m.length > 10 && m.match / /
    #   TODO: support ""-block output using a word-wrap strategy if we can do-so isomorphically.
    #   i.e. the output string would generate exactly the input string in Caffeine-Script
    else
      escapeJavascriptString m

  if options.colorize
    options.colorize.green out
  else out

isInspectableArray = (v) ->
  isPlainArray(v) ||
  isTypedArray v

formattedInspectRecursive = (m, maxLineLength, options) ->
  if isPlainObject m            then formattedInspectObject m, maxLineLength, options
  else if isInspectableArray m  then formattedInspectArray  m, maxLineLength, options
  else if isString m            then formattedInspectString m, options
  else
    options.colorize.yellow inspect m

###
TODO:

  special mode for a chunk of lines that all have this pattern:

    /^\s*([a-z]:\t)*[^\t]+$/

  Example:
    hi: there: my: friends: "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Currently that becomes:
    hi:                   there:            my:       friends: "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Which is pretty awkward. I want:
    hi: there: my: friends:                           "my value"
    somethingElseIThough: indexAllMyThings: withThis: "foo"

  Basically, replace all but the last tab with a space.

  But only if ALL lines in a chunk are this pattern.

  CounterExample:
    properties:
      autoTags:          type: "text", analyzer: "standard"
      autoText:          type: "text", analyzer: "english"
      updatedAt:         type: "long"
      createdAt:         type: "long"
      title:             type: "text", analyzer: "english"
      userId:            type: "keyword"
      lastPostCreatedAt: type: "long"
      lastPostId:        type: "keyword"
      lastChapterPostId: type: "keyword"
      postCount:         type: "integer"
      followerCount:     type: "integer"
      activityCount:     type: "long"
      messageCount:      type: "long"
      isProfileTopic:    type: "boolean"
      private:           type: "boolean"

  Should NOT look like this:
    properties:
      autoTags:                type: "text", analyzer: "standard"
      autoText:                type: "text", analyzer: "english"
      updatedAt: type:         "long"
      createdAt: type:         "long"
      title:                   type: "text", analyzer: "english"
      userId: type:            "keyword"
      lastPostCreatedAt: type: "long"
      lastPostId: type:        "keyword"
      lastChapterPostId: type: "keyword"
      postCount: type:         "integer"
      followerCount: type:     "integer"
      activityCount: type:     "long"
      messageCount: type:      "long"
      isProfileTopic: type:    "boolean"
      private: type:           "boolean"
###

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

  maxColumnSizes = []
  maxColumnWidth = maxLineLength / 2
  for line in lines when (elements = line.split "\t").length > 1
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
  str.length

postWhitespaceFormatting = (maxLineLength, string) ->
  lastIndent = 0
  sameIndentGroup = []
  outLines = []

  alignTabsInSameIndentGroup = ->
    return unless 0 < sameIndentGroup.length
    str = sameIndentGroup.join "\n"
    sameIndentGroup = []
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

colorNames = w("red yellow green blue grey")
colorizeFunctions = object colorNames, (c) -> (str) -> str[c] ? str

identity = (s) -> s
passThroughColorizeFunctions = object colorNames, -> identity

module.exports = class FormattedInspect
  @ansiRegex: ansiRegex
  @stripAnsi: stripAnsi
  @ansiSafeStringLength: ansiSafeStringLength
  @alignTabs: alignTabs
  @_escapeForBlockString: escapeForBlockString
  @formattedInspectString: formattedInspectString
  @failsafeInspect: failsafeInspect = (toInspect) ->
    "typeof: #{typeof toInspect}\n" +
    "constructor: #{toInspect?.constructor && toInspect?.constructor?.name}\n" +
    switch
      when isInspectableArray toInspect then "length: #{toInspect.length}\njoined: [#{toInspect.join(', ')}]"
      when toInspect? && typeof toInspect == 'object' then "keys: #{Object.keys(toInspect).join ', '}"
      else "toString: #{toInspect}"

  @formattedInspect: (toInspect, options = {}) ->
    try
      if isNumber options
        options = maxLineLength: options
      else
        unless isPlainObject options
          console.error invalid: {options}
          throw new Error "invalid options object type: #{typeof options}"
      options.maxLineLength ?= global.process?.stdout?.columns || 80
      {maxLineLength} = options
      options.colorize = if options.color
        colorizeFunctions
      else
        passThroughColorizeFunctions

      out = postWhitespaceFormatting maxLineLength,
        formattedInspectRecursive toInspectedObjects(toInspect), maxLineLength, options
      .replace /\n\n$/, "\n"
    catch error
      out = "Error in formattedInspect: #{error}\n#{failsafeInspect toInspect}"
      console.error out, {error, toInspect, options}
      out