{compactFlatten} = require './ArrayCompactFlatten'
{isArray, isString} = require './Types'
module.exports = class StringCase

  findWordsRegExp = /[a-zA-Z][a-zA-Z0-9]*|[0-9]+/g
  findCapStartWordsRegExp = /(?:[A-Z]{2,}(?![a-z]))|[A-Z][a-z0-9]*|[a-z0-9]+/g
  ### getCodeWords
    INv1: <String>
    INv2: <Array* <String>>
    OUT: <Array <String>>
  ###
  @getCodeWords: getCodeWords = (str) ->
    compactFlatten(
      if isArray str
        str
      else if isString(str) && findWordsRegExp.test str
        for word in str.match findWordsRegExp
          word.match findCapStartWordsRegExp
      else []
    )

  @codeWords: getCodeWords

  @lowerCase: (str) -> str?.toLocaleLowerCase()
  @upperCase: (str) -> str?.toLocaleUpperCase()

  @capitalize:   (str) => @upperCase(str.charAt 0) + str.slice 1
  @decapitalize: (str) => @lowerCase(str.charAt 0) + str.slice 1

  @getLowerCaseCodeWords:   (str) =>              @lowerCase word for word in @getCodeWords str
  @getCapitalizedCodeWords: (str) =>              @capitalize @lowerCase word for word in @getCodeWords str
  @upperCamelCase:          (str, joiner = "") => (@capitalize word for word in @getLowerCaseCodeWords str).join joiner
  @lowerCamelCase:          (str, joiner = "") => @decapitalize @upperCamelCase str, joiner
  @snakeCase:               (str) =>              (@getLowerCaseCodeWords str).join "_"
  @dashCase:                (str) =>              (@getLowerCaseCodeWords str).join "-"
  @capitalizedDashCase:     (str) =>              (@getCapitalizedCodeWords str).join "-"

  # Should all work - add when we have a use-case
  # @getUpperCaseCodeWords: (str) => word.toUpperCase() for word in @getCodeWords str
  # @capsCase:              (str) => (@getUpperCaseCodeWords str).join "_"
