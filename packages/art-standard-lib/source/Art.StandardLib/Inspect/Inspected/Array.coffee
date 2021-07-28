MinimalBaseObject = require '../../MinimalBaseObject'

module.exports = class Array extends MinimalBaseObject
  constructor: (inspectedArray) ->
    super
    @array = inspectedArray

  @getter
    arrayOfStrings: -> v.toString() for v in @array
    children: -> @array.slice()

  delimitedString: (delimiter = ", ") -> @arrayOfStrings.join(", ")

  toString: -> "[#{@delimitedString()}]"
