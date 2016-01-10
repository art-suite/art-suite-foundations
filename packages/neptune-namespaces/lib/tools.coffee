module.exports = class Lib
  @capitalize: (str) ->
    str.charAt(0).toUpperCase() + str.slice 1

  @decapitalize: (str) ->
    str.charAt(0).toLowerCase() + str.slice 1

  @upperCamelCase: (str) =>
    words = str.split(/[-_\.]|\s+/)
    capWords = (@capitalize word for word in words)
    capWords.join("")

  @peek: (array, offset = -1) -> array?.length > 0 && array[array.length + offset]
  @pushIfUnique: (array, value) ->
    array.push value unless value in array
    array

  @indent: (str, indentStr = "  ")->
    joiner = "\n#{indentStr}"
    indentStr + str.split("\n").join joiner

  @pad: (str, length, character = " ") ->
    if 0 < diff = length - str.length
      str += character.repeat diff
    str

  @log: (args...) -> console.log args...

  @withoutTrailingSlash: (str) ->
    str.match(/^(.*[^\/])\/?$/)[1]
