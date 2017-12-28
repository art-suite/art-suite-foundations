{compactFlatten} = require './ArrayCompactFlatten'
module.exports = class StringCase

  @getCodeWords: getCodeWords = (str) ->
    _words = str.match /[a-zA-Z][a-zA-Z0-9]*|[0-9]+/g
    return [] unless _words
    words = for word in _words
      word.match /(?:[A-Z]{2,}(?![a-z]))|[A-Z][a-z0-9]*|[a-z0-9]+/g #/[A-Z]+[a-z0-9]*|[a-z0-9]+/g

    compactFlatten words

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
