MinimalBaseObject = require '../../MinimalBaseObject'
module.exports = class Core extends MinimalBaseObject
  constructor: (value) ->
    super
    @value = value
    # NOTE: 'value.constructor == HTMLImageElement' doesn't always work - apparently there is more than one "kind" of HTMLImageElement
    @image = value if value && value.constructor.name == "HTMLImageElement"

  @getter
    children: -> null
  toString: -> "#{@value}"
