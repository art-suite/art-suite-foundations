{compactFlatten} = require './ArrayCompactFlatten'
module.exports = class StringCase

  @getCodeWords: (str) ->
    _words = str.match /[a-zA-Z][a-zA-Z0-9]*/g
    return [] unless _words
    words = for word in _words
      word.match /(?:[A-Z]{2,}(?![a-z]))|[A-Z][a-z0-9]*|[a-z0-9]+/g #/[A-Z]+[a-z0-9]*|[a-z0-9]+/g

    compactFlatten words

  @capitalize:   (str) -> str.charAt(0).toUpperCase() + str.slice 1
  @decapitalize: (str) -> str.charAt(0).toLowerCase() + str.slice 1

  @getLowerCaseCodeWords: (str) => word.toLowerCase() for word in @getCodeWords str
  @upperCamelCase:        (str) => (@capitalize word for word in @getLowerCaseCodeWords str).join ""
  @lowerCamelCase:        (str) => @decapitalize @upperCamelCase str
  @snakeCase:             (str) => (@getLowerCaseCodeWords str).join "_"
  @dashCase:              (str) => (@getLowerCaseCodeWords str).join "-"

  # Should all work - add when we have a use-case
  # @getUpperCaseCodeWords: (str) => word.toUpperCase() for word in @getCodeWords str
  # @capsCase:              (str) => (@getUpperCaseCodeWords str).join "_"
