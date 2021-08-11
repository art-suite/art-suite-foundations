{Foundation} = Neptune.Art

keyValuePairArray = []
keyArray = []
valueArray = []
myMap = {}
for i in [0...100]
  k = "key" + i
  keyValuePairArray.push [k, i]
  myMap[k] = i
  keyArray.push k
  valueArray.push i

suite "Javascript.Object and Arrays", ->

  benchmark "iterate over 100 properties of an object", ->
    sum = 0
    for k, v of myMap
      sum += v

  benchmark "iterate over 100 element array of keys, pull value from an object", ->
    sum = 0
    for k in keyArray
      sum += myMap[k]

  benchmark "iterate over 100 element array of keys and 100 element array of values together", ->
    sum = 0
    for k, i in keyArray
      v = valueArray[i]
      sum += v

  benchmark "iterate over 100 element array of values", ->
    sum = 0
    for v in valueArray
      sum += v

  benchmark "iterate 100 element with key-value sub-arrays", ->
    sum = 0
    for [k, v] in keyValuePairArray
      sum += v
