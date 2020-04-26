###
TODO: refactor so nothing in inspect/* uses BaseObject
Then, move into StandardLib.
###

module.exports = [
  [(require  "./Inspector"), "shallowInspect inspectLean inspect"]
  require './FormattedInspect'
  require './InspectedObjects'
  require './PlainObjects'
  require './InspectedObjectLiteral'
]
