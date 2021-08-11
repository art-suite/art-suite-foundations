{Foundation} = Neptune.Art
{log} = Foundation

class MyObject
  constructor: ->
    @foo = 0

  doIt: (v) -> @foo += v

object = new MyObject
f = (v) -> @foo += v
f0 = -> @foo += 1
f1 = (a)-> @foo += a
f2 = (a,b)-> @foo += a + b
f3 = (a,b,c)-> @foo += a + b + c
f4 = (a,b,c,d) -> @foo += a + b + c + d

boundF = f.bind object
callBind = Foundation.fastBind
applyBind = (f, _this) ->

  -> f.apply _this, arguments

callBoundF = callBind f, object
applyBoundF = applyBind f, object


uncurriedFunction = (a, b, c) ->
  a + b + c

curriedFunction = (b, c) ->
  (a) ->
    a+ b + c

class CurryObject
  constructor: (@b, @c) ->
  f: (a) -> a + @b + @c

curriedViaObject = (b, c) ->
  new CurryObject b, c

uf = uncurriedFunction(1,2,3)
cf = curriedFunction(2,3)(1)
cvo = curriedViaObject(2,3).f(1)

throw "bug" if uncurriedFunction(1,2,3) != curriedFunction(2,3)(1)
throw "bug" if uncurriedFunction(1,2,3) != curriedViaObject(2,3).f(1)

suite "Javascript.method invocation", ->

  benchmark "object.doIt", ->
    object.doIt 1
    object.doIt 1
    object.doIt 1
    object.doIt 1
    object.doIt 1

    object.doIt 1
    object.doIt 1
    object.doIt 1
    object.doIt 1
    object.doIt 1

  benchmark "f.call object, 1", ->
    f.call object, 1
    f.call object, 1
    f.call object, 1
    f.call object, 1
    f.call object, 1

    f.call object, 1
    f.call object, 1
    f.call object, 1
    f.call object, 1
    f.call object, 1

  benchmark "f.apply object, [1]", ->
    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]

    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]
    f.apply object, [1]

  benchmark "boundF 1", ->
    boundF 1
    boundF 1
    boundF 1
    boundF 1
    boundF 1

    boundF 1
    boundF 1
    boundF 1
    boundF 1
    boundF 1

  benchmark "applyBoundF 1", ->
    applyBoundF 1
    applyBoundF 1
    applyBoundF 1
    applyBoundF 1
    applyBoundF 1

    applyBoundF 1
    applyBoundF 1
    applyBoundF 1
    applyBoundF 1
    applyBoundF 1

  benchmark "callBoundF 1", ->
    callBoundF 1
    callBoundF 1
    callBoundF 1
    callBoundF 1
    callBoundF 1

    callBoundF 1
    callBoundF 1
    callBoundF 1
    callBoundF 1
    callBoundF 1

  benchmark "callBoundF 10", ->
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    callBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

  benchmark "applyBoundF 10", ->
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
    applyBoundF 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

  benchmark "uncurriedFunction", ->
    uncurriedFunction 1, 2, 3

  benchmark "curriedFunction", ->
    curriedFunction(2, 3)(1)

  benchmark "curriedViaObject", ->
    curriedViaObject(2, 3).f(1)
