FoundationMath = require './MathExtensions'
Types          = require './TypesExtended'
{wordsRegex} = require './RegExpExtensions'
{intRand} = FoundationMath
{isString, isNumber, isPlainObject, isArray, stringIsPresent} = Types
{compactFlatten} = require './Core'
{isBrowser} = require './Environment'

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

  @fastHash: (string) ->
    # 39 tokens
    hash = 2147483647
    if string.length > 0
      for i in [0...string.length]
        hash = ((hash << 5) - hash) + string.charCodeAt(i) & ( (1 << 31) - 1)

    hash

  ###
  # CaffeineScript once we have reduce + til support:

  @fastHash: (string) ->
    # 22 tokens
    reduce hash, i til string.length inject 0
      hash << 5
      - hash
      + string.charCodeAt i
      | 0
  ###

  @randomString: randomString = (length = 32, chars = base62Characters, randomNumbers) ->
    result = ''
    charsLength = chars.length
    if randomNumbers
      (chars[randomNumbers[i] % charsLength] for i in [0...length] by 1).join ''
    else
      (chars[intRand charsLength] for i in [0...length] by 1).join ''

  @cryptoRandomString: if isBrowser
    {crypto} = global
    if crypto
      (l = 16, c) -> randomString l, c, crypto.getRandomValues new Uint8Array l
    else
      console.warn "window.crypto not available, using standard random for cryptoRandomString"
      (l = 16, c) -> randomString l, c
  else
    crypto = require 'crypto'
    (l, c) -> randomString l, c, crypto.randomBytes l

  @randomBase62Character: -> base62Characters[intRand 62]

  ### pluralize
    Examples:
      # just, always, pluralize:
      pluralize "food" >> "foods"

      # pluralize and output number
      pluralize -1, "food" -> "-1 foods"
      pluralize 0, "food" -> "0 foods"
      pluralize 1, "food" -> "1 food"
      pluralize 2, "food" -> "2 foods"

      # order of the first 2 params doesn't matter
      pluralize 1, "food" -> "1 food"
      pluralize "food", 1 -> "1 food"

      # custom pluralForms
      pluralize 1, "dragon", "frogs" -> "1 dragon"
      pluralize 3, "dragon", "frogs" -> "2 frogs"

    IN:
      various signatures:
        pluralize singleForm
        pluralize singleForm, number
        pluralize number, singleForm
        pluralize singleForm, number, pluralForm
        pluralize number, singleForm, pluralForm

      number:     <Number>
      singleForm: <String> singular noun
        NOTE: if pluralForm is not provided, it's ok
          if this is a plural nown, it'll still
          'do the right thing'

      pluralForm: <String> plural noun

    OUT:

      unless number == 0
        pluralForm ?=

      if a number was provided
        "#{number} #{correct singleForm or pluralForm}"
      else
        pluralForm

    NOTE:
      Now using: https://www.npmjs.com/package/pluralize
      It provides nice functionality and knows about all the odd
      english words.

      Compatibility:
        ArtStandardLib's pluralize always outputs the number
        if the number is given, unlike npm-pluralize, which
        requires a 'true' in the 3rd argument to enable outputting
        the number.

        ArtStandardLib let's you provide your own, custom pluralForm.
        npm-pluralize requires you to 'register' it first via addIrregularRule.
        You can still do that, if you wish, but it's renamed 'addPluralizeRule'
        in ArtStandardLib since it's expected you'll import it 'bare' and
        'addIrregularRule' could mean anything out-of-context.

      It's an extra 2.1k payload minimized and brotli-zipped for client-side.

      It also allows us to provide:
        {@plural, @singular, @isSingular, @isPlural, @addPluralizeRule}
  ###
  {
    @plural, @singular, @isSingular, @isPlural
    addIrregularRule: @addPluralizeRule
  } = npmPluralize = require 'pluralize'

  patchedNpmPluralize = (noun, a, b) ->
    if match = /^(.*)(_|[^\w])+$/.exec noun
      [__, noun, append] = match
    out = npmPluralize noun, a, b
    if append
      out + append
    else
      out

  @pluralize: pluralize = (a, b, pluralForm) ->
    # normalize inputs

    number = if b? && isNumber b
      singleForm = a
      b
    else if isNumber a
      singleForm = b
      a
    else
      singleForm = if stringIsPresent a then a else if stringIsPresent b then b
      null

    # validate
    if !isString(singleForm) || (pluralForm && !isString pluralForm)
      throw new Error "
        singleForm and pluralForm(optional) should be non-empty strings
        (inputs: #{Neptune.Art.StandardLib.formattedInspect {a,b,pluralForm}})"

    newPluralize = switch
      when pluralForm?
        "#{number} #{if number == 1 then singleForm else pluralForm}"

      when number?
        patchedNpmPluralize singleForm, number, true

      else
        patchedNpmPluralize singleForm

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

  # take a string of anything and produce a javascript legal string
  @escapeDoubleQuoteJavascriptString: escapeDoubleQuoteJavascriptString = (str) =>
    console.warn "DEPRICATED: escapeDoubleQuoteJavascriptString. USE: escapeJavascriptString"
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
  @escapeJavascriptString: escapeJavascriptString = (str, withoutQuotes) =>
    s = JSON.stringify str
    # s = escapeDoubleQuoteJavascriptString str
    if withoutQuotes
      s.slice 1, -1
    else if s.match escapedDoubleQuoteRegex
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

  @jsStringify: (obj) ->
    jsStringifyR obj, ""

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
        Neptune.Art.StandardLib.log.error error = "invalid object type for Json. Expecting: null, false, true, number, string, plain-object or array", object
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
