MinimalBaseObject = require "../../MinimalBaseObject"
{escapeJavascriptString} = require '../../StringExtensions'

module.exports = class String extends MinimalBaseObject
  constructor: (clonedString) ->
    super
    @string = clonedString

  toString: -> escapeJavascriptString @string
