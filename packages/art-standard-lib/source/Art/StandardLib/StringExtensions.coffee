FoundationMath = require './MathExtensions'
Types          = require './TypesExtended'
{wordsRegex} = require './RegExpExtensions'
{intRand} = FoundationMath
{isString, isNumber, isPlainObject, isArray} = Types
{compactFlatten} = require './Core'

escapedDoubleQuoteRegex    = /[\\]["]/g

{floor} = Math

module.exports = class StringExtensions

  ###
  IN: an array and optionally a string, in any order
    joiner: the string
    array-to-flatten-and-join: the array

  OUT:
    compactFlatten(array).join joiner || ""

  NOTE: this uses Ruby's default value for joining - the empty array, not ',' which is JavaScripts
  ###
  @compactFlattenJoin: (a, b) ->
    array = null
    joiner = if isString a
      array = b
      a
    else
      array = a
      b || ""
    compactFlatten(array).join joiner

  @base62Characters: base62Characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

  @randomString: (length = 32, chars = base62Characters) ->
    result = ''
    charsLength = chars.length
    (chars[intRand charsLength] for i in [0...length] by 1).join ''

  @randomBase62Character: -> base62Characters[intRand 62]

  ###
  should really use: https://www.npmjs.org/package/pluralize
    pluralize "food" >> "foods"
    pluralize 1, "food" -> "1 food"
    pluralize 0, "food" -> "0 foods"
    pluralize 2, "food" -> "2 foods"
    pluralize 3, "person", people" -> "2 people"
  ###
  @pluralize: pluralize = (a, b, pluralForm) ->
    if isNumber a
      "#{a} #{if a == 1 then b else pluralForm || pluralize b}"
    else if isString a ||= b
      a + "s" # dumb, english solution

  @replaceLast: (str, find, replaceWith) ->
    index = str.lastIndexOf find

    if index >= 0
      str.substring(0, index) + replaceWith + str.substring(index + find.length)
    else
      str.toString()

  @getPadding: getPadding = (length, padding = " ")->
    Array(length).join padding

  @pad: (str, length, padding, alignRight)->
    str = String(str)
    return str if str.length >= length
    exactPadding = getPadding Math.max(length - str.length + 1, 0), padding
    if alignRight
      exactPadding + str
    else
      str + exactPadding

  # take a string of anything and produce a javascript legal string
  @escapeDoubleQuoteJavascriptString: escapeDoubleQuoteJavascriptString = (str) =>
    s = String(str).replace(/[\\"]/g, "\\$&").replace /[\0\b\f\n\r\t\v\u2028\u2029]/g, (x) ->
      switch x
        when '\0'     then "\\0"
        when '\b'     then "\\b"
        when '\f'     then "\\f"
        when '\n'     then "\\n"
        when '\r'     then "\\r"
        when '\t'     then "\\t"
        when '\v'     then "\\v"
        when '\u2028' then "\\u2028"
        when '\u2029' then "\\u2029"

    s = '"' + s + '"'

  ###
  SBD for a while I only had JSON.stringify here, but I hate seeing: "I said, \"hello.\""
  when I could be seeing: 'I said, "hello."'

  Is this going to break anything? I figure if you really need "" only, just use stringify.
  ###
  @escapeJavascriptString: escapeJavascriptString = (str) =>
    s = JSON.stringify str
    # s = escapeDoubleQuoteJavascriptString str
    if s.match escapedDoubleQuoteRegex
      "'#{s.replace(escapedDoubleQuoteRegex, '"').replace(/'/g, "\\'").slice 1, -1}'"
    else
      s


  @allIndexes: (str, regex) =>
    indexes = []
    throw new Error "regex must be a global RegExp" unless (regex instanceof RegExp) && regex.global
    regex.lastIndex = 0
    while result = regex.exec str
      indexes.push result.index
      lastIndex = result

    indexes

  @repeat: repeat = if " ".repeat
    (str, times) -> str.repeat times # ECMASCRIPT 6
  else
    (str, count) ->
      count == floor count
      result = ''
      if count > 0 && str.length > 0
        while true
          result += str if (count & 1) == 1

          count >>>= 1

          break if count == 0
          str += str
      result

  @rightAlign: (str, width) ->
    if str.length >= width
      str
    else
      repeat(" ", width - str.length) + str

  # Note: regex must be global
  @eachMatch: (str, regex, f) =>
    regex.lastIndex = 0
    f result while result = regex.exec str
    null

  standardIndent =
    joiner: ', '
    openObject: '{'
    openArray: '['
    closeObject: "}"
    closeArray: "]"

  @consistentJsonStringify: consistentJsonStringify = (object, indent) ->
    out = if object == false || object == true || object == null || isNumber object
      "" + object
    else if isString object
      JSON.stringify object
    else
      indentObject = if indent
        if typeof indent == "string"
          joiner:       ",\n#{indent}"
          openObject:   "{\n#{indent}"
          openArray:    "[\n#{indent}"
          closeObject:  "\n}"
          closeArray:   "\n]"
          totalIndent: indent
          indent: indent
        else
          totalIndent:  totalIndent = indent.indent + lastTotalIndent = indent.totalIndent
          joiner:       ",\n#{totalIndent}"
          openObject:   "{\n#{totalIndent}"
          openArray:    "[\n#{totalIndent}"
          closeObject:  "\n#{lastTotalIndent}}"
          closeArray:   "\n#{lastTotalIndent}]"
          indent:       indent.indent

      {joiner, openObject, openArray, closeObject, closeArray} = indentObject || standardIndent

      if isPlainObject object
        openObject + (
          for k in (Object.keys object).sort() when object[k] != undefined
            JSON.stringify(k) + ": " + consistentJsonStringify object[k], indentObject
        ).join(joiner) +
        closeObject
      else if isArray object
        openArray +
        (consistentJsonStringify v, indentObject for v in object).join(joiner) +
        closeArray
      else
        Neptine.Art.StandardLib.log.error error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object
        throw new Error error

  @splitRuns = (str) ->
    return [] if str.length == 0
    lastCh = str[0]
    chCount = 1
    result = []
    for i in [1...str.length] by 1
      ch = str[i]
      if ch == lastCh
        chCount++
      else
        result.push [lastCh, chCount]
        chCount = 1
      lastCh = ch
    result.push [lastCh, chCount]
    result


  @eachRunAsCharCodes = (str, f) ->
    lastCh = str.charCodeAt 0
    chCount = 1
    for i in [1...str.length] by 1
      ch = str.charCodeAt i
      if ch == lastCh
        chCount++
      else
        f lastCh, chCount
        chCount = 1
      lastCh = ch
    f lastCh, chCount
    null

  ###
  TODO: I think this can be generalized to cover most all ellipsies and word-wrap scenarios:
    a) have an options object with options:
      maxLength: number         # similar to current maxLength
      minLength: number         # currently implied to be maxLength / 2, in additional customizable, it would also be optional
      brokenWordEllipsis: "…"   # used when only part of a word is included
      moreWordsEllipsis: "…"    # used when there are more words, but the last word is whole
      wordLengthFunction: (string) -> string.length
        # can be replaced with, say, the font pixel-width for a string
        # in this way, this function can be used by text-layout
        # minLength and maxLength would then be in pixels
      breakWords: false         # currently, this is effectively true - will break the last word on line in most situations
      breakOnlyWord: true       # even if breakWords is false, if this is the only word on the line and it doesn't fit, should we break it?
                                # should this even be an option?
      # future:
      wordBreakFunction: (word, maxLength) -> shorterWord
        # given a word and the maximum length of that word, returns
        # a word <= maxLength according to wordLengthFunction

    b) Use cases
      - TextLayout - uses pixels for length rather than characters
      - Art.Engine.Element 'flow' layout
        - if the input was an array of "words" and
        - wordLengthFunction returns the Element's width...
        I think this works. We'd need a way to handle margins though. I think this works:
          spaceLength: (leftWord, rightWord) -> 1
      - Shortend user display names:
        Options:
          wordBreakFunction: (word, maxLength) -> word[0]
          brokenWordEllipsis: "." or ""
        Example Output:
          "Shane Delamore", 10 > "Shane D." or
          "Shane Delamore", 10 > "Shane D"
        Or, just leave breakwords: false and get:
          "Shane Delamore", 10 > "Shane"

    c) returns both the output string and the "string remaining" - everything not included
    d) alternate input: an array of strings already broken up by words - the "remainging" return value would then also be an array of "words"
      (this would be for efficiency when doing multi-line layout)

  Right now, it works as follows:
  The output string is guaranteed to be:
    <= maxLength
    >= maxLength / 2 in almost all secenarios as long as inputString is >= maxLength / 2
  ###
  @humanFriendlyShorten: (inputString, maxLength) ->
    throw new error "maxLength must be > 0" unless maxLength > 0
    inputString = inputString.trim()

    return inputString unless inputString.length > maxLength

    minLength = maxLength / 2
    stringParts = inputString.split /\s+/
    string = ""
    for part in stringParts
      if string.length == 0
        string = part
      else if (string.length < minLength) || string.length + part.length + 2 <= maxLength
        string += " #{part}"
      else
        break

    string = string.slice(0, maxLength - 1).trim() if string.length > maxLength

    string + "…"

  @stripTrailingWhitespace: (a) ->
    a.split(/[ ]*\n/).join("\n").split(/[ ]*$/)[0].replace(/\n+$/,'')
