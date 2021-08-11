{Foundation} = Neptune.Art
{
  inspect, log, time, eq, plainObjectsDeepEq, shallowEq, floatEq, BaseObject
  isFunction, isNumber, isPlainObject, isString
} = Foundation

myFunction = ->
myNumber = 1
myString = "hi"
myPlainObject = a:1, b:2

class Color extends BaseObject
myColor = new Color

suite "Art.Foundation.Types", ->
  @timeout 100000

  benchmark "value is true", ->
    !!myFunction

  benchmark "value is false", ->
    !!false

  benchmark "isFunction == true", ->
    isFunction myFunction

  benchmark "isNumber 0", ->
    isNumber 0

  num = 123
  benchmark "num > 0", ->
    num > 0

  benchmark "num > 0 || num == 0", ->
    num > 0 || num == 0

  benchmark "num > 0 || num == 0 || num < 0", ->
    num > 0 || num == 0 || num < 0

  benchmark "0 != null && 0 != undefined", ->
    0 != null && 0 != undefined

  benchmark "typeof == 'function'", ->
    typeof myFunction == 'function'

  benchmark "isFunction == false", ->
    isFunction myString

  benchmark "isPlainObject == true", ->
    isPlainObject myPlainObject

  benchmark "isPlainObject == false", ->
    isPlainObject myString

  benchmark "isString == true", ->
    isString myString

  benchmark "isString == false", ->
    isString myFunction

  benchmark "myColor.class == Color", ->
    myColor.class == Color


  benchmark "instanceof Color", ->
    myColor instanceof Color

  benchmark "myColor instanceof BaseObject", ->
    myColor instanceof Color
