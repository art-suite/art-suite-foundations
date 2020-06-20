{compare} = require '../Eq'

module.exports = class InspectedObjectLiteral
  @inspectedObjectLiteral: (literal, isError) -> new InspectedObjectLiteral literal, isError
  constructor: (@literal, @isError) ->
  getInspectedObjects: -> @
  inspect: -> @literal
  compare: (b) -> compare @literal, b.literal
