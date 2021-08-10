{Foundation} = Neptune.Art


{argumentsToArray, compactFlatten, isPlainObject, deepEach, keepIfRubyTrue} = Foundation

class Foo
  constructor: ->
    @a = 1
    @b = 2

  ordered: (a, b) ->
    @a = a
    @b = b

  dotDotDot: (args...) ->
    @a = args[0]
    @b = args[1]

  iterateOverArgumentsInline: ->
    args = new Array arguments.length
    args[i] = arguments[i] for i in [0...arguments.length] by 1

    @a = args[0]
    @b = args[1]

  argumentsToArray = (_arguments) ->
    args = new Array _arguments.length
    args[i] = _arguments[i] for i in [0...arguments.length] by 1
    args

  useArgumentsToArrayFunction: ->
    args = argumentsToArray arguments
    @a = args[0]
    @b = args[1]

  dotDotDot2: (a, args...) ->
    @a = a
    @b = args[0]

  iterateOverArgs2: (a) ->
    @a = a
    args = new Array arguments.length - 1
    args[i-1] = arguments[i] for i in [1...arguments.length] by 1

    @b = args[0]

  hash: (args) ->
    @a = args.a
    @b = args.b

  callback: (f) ->
    f @

emptyProps = {}
simpleProps =
  name: "george"
  size: 100
  color: "#ff0"
  radius: 10

emptyChildren = []
flatChildren = [1, 2, 3, 4]
nonFlatChildren = [1, [2, 3], [[4]]]
nonFlatNonCompactChildren = [
  nonFlatNonCompactChildren_1 = 1
  nonFlatNonCompactChildren_2 = [2, null, 3]
  nonFlatNonCompactChildren_3 = [[null, 4]]
  nonFlatNonCompactChildren_4 = null
]

instance = new Foo

suite "Javascript.parameter passing", ->

  benchmark "a, b (ordered parameters)", -> instance.ordered 2, 3
  benchmark "a... (arguments.length = 1)", -> instance.dotDotDot 2, 3
  benchmark "a... (arguments.length = 10)", -> instance.dotDotDot 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "a... (arguments.length = 50)", -> instance.dotDotDot 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "useArgumentsToArrayFunction(arguments.length = 1)",  -> instance.useArgumentsToArrayFunction 2, 3
  benchmark "useArgumentsToArrayFunction(arguments.length = 10)", -> instance.useArgumentsToArrayFunction 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "useArgumentsToArrayFunction(arguments.length = 50)", -> instance.useArgumentsToArrayFunction 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "iterateOverArgumentsInline(arguments.length = 1)", -> instance.iterateOverArgumentsInline 2, 3
  benchmark "iterateOverArgumentsInline(arguments.length = 10)", -> instance.iterateOverArgumentsInline 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "iterateOverArgumentsInline(arguments.length = 50)", -> instance.iterateOverArgumentsInline 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "a, b... (arguments.length = 1)", -> instance.dotDotDot2 2, 3
  benchmark "a, b... (arguments.length = 10)", -> instance.dotDotDot2 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "a, b... (arguments.length = 50)", -> instance.dotDotDot2 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "a, b=iterate over arguments(arguments.length = 1)", -> instance.iterateOverArgs2 2, 3
  benchmark "a, b=iterate over arguments(arguments.length = 10)", -> instance.iterateOverArgs2 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "a, b=iterate over arguments(arguments.length = 50)", -> instance.iterateOverArgs2 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  benchmark "hash", -> instance.dotDotDot a:2, b:3
  benchmark "callBack", -> instance.dotDotDot (obj) -> obj.a = 2; obj.b = 3
