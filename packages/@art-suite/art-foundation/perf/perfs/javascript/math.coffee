{Foundation} = Neptune.Art

suite "Javascript.math", ->
  localA = 0
  state = 0
  amount = 1
  benchmark "add", ->
    localA = 1
    localA += amount

  benchmark "add with state", ->
    state += amount

  testArray = (n for n in [0..1000])
  benchmark "clone Array with push", ->
    clone = []
    clone.push n for n in testArray
    clone # force coffeescript not to make its own array

  benchmark "clone Array with slice then iterate", ->
    clone = testArray.slice()
    clone[i]=n for n,i in testArray
    clone # force coffeescript not to make its own array

