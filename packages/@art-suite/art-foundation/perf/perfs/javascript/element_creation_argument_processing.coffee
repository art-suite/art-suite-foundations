{Foundation} = Neptune.Art

{argumentsToArray, compactFlatten, isPlainObject, isArray, keepIfRubyTrue} = Foundation

class TestElement
  constructor: ->
    @a = 1
    @b = 2

  elementCreationArgumentProcessingNaive: (@a, b...) ->
    @b = compactFlatten b

  elementCreationArgumentProcessingGuaranteedChildrenAreArray: (@a, b) ->
    @b = compactFlatten b

  elementCreationArgumentProcessingNoProcessing: (@a, @b) ->

  elementCreationArgumentProcessingInlineSimple: (@a) ->
    args = new Array arguments.length - 1
    args[i-1] = arguments[i] for i in [1...arguments.length] by 1
    @b = args

  deepArgsProcessing = (array, children) ->
    for el in array when el
      if el.constructor == Array
        deepArgsProcessing el, children
      else children.push el
    null

  elementCreationArgumentProcessingInlineFullFeatured: ->
    oneProps = null
    props = null
    children = []

    for el in arguments when el
      switch el.constructor
        when Object
          if oneProps
            props = {}
            props[k] = v for k, v of oneProps
            oneProps = null
          if props
            props[k] = v for k, v of el
          else
            oneProps = el

        when Array  then deepArgsProcessing el, children
        else children.push el

    @a = props || oneProps
    @b = children

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

instance = new TestElement

suite "Javascript.elementCreationArgumentProcessing", ->
  benchmark "elementCreationArgumentProcessingNaive simpleProps, 1, 2, 3, 4", -> instance.elementCreationArgumentProcessingNaive simpleProps, 1, 2, 3, 4
  benchmark "elementCreationArgumentProcessingNoProcessing simpleProps, [1, 2, 3, 4]", -> instance.elementCreationArgumentProcessingNoProcessing simpleProps, 1, 2, 3, 4
  benchmark "elementCreationArgumentProcessingGuaranteedChildrenAreArray simpleProps, [1, 2, 3, 4]", -> instance.elementCreationArgumentProcessingGuaranteedChildrenAreArray simpleProps, flatChildren
  benchmark "elementCreationArgumentProcessingInlineSimple simpleProps, 1, 2, 3, 4", -> instance.elementCreationArgumentProcessingInlineSimple simpleProps, 1, 2, 3, 4
  benchmark "elementCreationArgumentProcessingInlineFullFeatured simpleProps, 1, 2, 3, 4", -> instance.elementCreationArgumentProcessingInlineFullFeatured simpleProps, 1, 2, 3, 4
  benchmark "elementCreationArgumentProcessingInlineFullFeatured simpleProps, # nonFlatNonCompactChildren splatted", -> instance.elementCreationArgumentProcessingInlineFullFeatured simpleProps, nonFlatNonCompactChildren_1, nonFlatNonCompactChildren_2, nonFlatNonCompactChildren_3, nonFlatNonCompactChildren_4
