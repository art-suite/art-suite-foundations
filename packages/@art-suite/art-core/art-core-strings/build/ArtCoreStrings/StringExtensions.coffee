{intRand} = require '@art-suite/art-core-math'
{isString, isNumber, isPlainObject, isArray, stringIsPresent} = require '@art-suite/art-core-types'
{compactFlatten} = require '@art-suite/art-core-arrays'

escapedDoubleQuoteRegex    = /[\\]["]/g

{floor} = Math

standardJsonStringifyIndent =
  joiner: ', '
  openObject: '{'
  openArray: '['
  closeObject: "}"
  closeArray: "]"

getCryptoRandomBytes = (length) ->
  if global.crypto?.getRandomValues?
    crypto.getRandomValues new Uint8Array length
  else
    { randomBytes } = require 'crypto'
    new Uint8Array randomBytes(length).buffer

jsStringifyR = (o, s) ->
  if isPlainObject o
    s += "{"
    first = true
    for k, v of o
      if first
        first = false
      else
        s += ","
      if /^[a-zA-Z_][a-zA-Z0-9_]*$/.test k
        s += k
      else
        s += JSON.stringify k
      s += ":"
      s = jsStringifyR v, s

    s + "}"
  else if isArray o
    s += "["
    first = true
    for el in o
      if first
        first = false
      else
        s += ","
      s = jsStringifyR el, s
    s + "]"
  else
    s + JSON.stringify o

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

  @randomString: randomString = (length = 32, chars = base62Characters, randomNumbers) ->
    result = ''
    charsLength = chars.length
    if randomNumbers
      (chars[randomNumbers[i] % charsLength] for i in [0...length] by 1).join ''
    else
      (chars[intRand charsLength] for i in [0...length] by 1).join ''

  @cryptoRandomString: (length = 16, chars = base62Characters) ->
    randomString length, chars, getCryptoRandomBytes length

  @randomBase62Character: -> base62Characters[intRand 62]

  @replaceLast: (str, find, replaceWith) ->
    index = str.lastIndexOf find

    if index >= 0
      str.substring(0, index) + replaceWith + str.substring(index + find.length)
    else
      str.toString()

  @getPadding: getPadding = (length, padding = " ")->
    out = ""
    for i in [0...length]
      out += padding
    out

  @pad: (str, length, padding, alignRight)->
    str = String(str)
    return str if str.length >= length
    exactPadding = getPadding Math.max(length - str.length, 0), padding
    if alignRight
      exactPadding + str
    else
      str + exactPadding

  ### escapeJavascriptString
    SBD for a while I only had JSON.stringify here, but I hate seeing: "I said, \"hello.\""
    when I could be seeing: 'I said, "hello."'

    Is this going to break anything? I figure if you really need "" only, just use stringify.
  ###
  @escapeJavascriptString: escapeJavascriptString = (str, withoutQuotes) =>
    s = JSON.stringify str
    if withoutQuotes
      s.slice 1, -1
    else if s.match escapedDoubleQuoteRegex
      singleQuotes = "'#{s.replace(escapedDoubleQuoteRegex, '"').replace(/'/g, "\\'").slice 1, -1}'"
      if singleQuotes.length < s.length
        singleQuotes
      else
        s
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

  # Note: regex must be global
  @eachMatch: (str, regex, f) =>
    throw new Error('Regex must have global flag') unless regex.global
    regex.lastIndex = 0
    f result while result = regex.exec str
    null

  @jsStringify: (obj) -> jsStringifyR obj, ""

  @consistentJsonStringify: consistentJsonStringify = (object, indent) ->
    out = if object == false || object == true || object == null || isNumber object
      "" + object
    else if isString object
      JSON.stringify object
    else
      indentObject = if indent
        if isString indent
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

      {joiner, openObject, openArray, closeObject, closeArray} = indentObject || standardJsonStringifyIndent

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
        console.log.error error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object
        throw new Error error

  ### humanFriendlyShorten
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
