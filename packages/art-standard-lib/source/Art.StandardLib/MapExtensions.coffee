
module.exports = class MapExtensions
  @iteratorToArray: (iterator) ->
    out = []
    while !(obj = iterator.next()).done
      out.push obj.value
    out

  @mapToKeysArray:   (map) => @iteratorToArray map.keys()
  @mapToValuesArray: (map) => @iteratorToArray map.values()
