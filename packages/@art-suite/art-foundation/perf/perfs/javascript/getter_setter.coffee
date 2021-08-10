{Foundation} = Neptune.Art

suite "Javascript.getters and setters", ->

  class GetSetTest

    @getter: (map) ->
      Object.defineProperty @::, prop, {get: getter, configurable: yes} for prop, getter of map
      map

    @setter: (map) ->
      Object.defineProperty @::, prop, {set: setter, configurable: yes} for prop, setter of map
      map

    @setterReturningValue: (map) ->
      for prop, setter of map
        Object.defineProperty @::, prop,
          set: (v) -> setter.call @, v; v
          configurable: yes
      map

    @altGetter: (map) ->
      for prop, getter of map
        @::.__defineGetter__ prop, getter
      map

    @altSetter: (map) ->
      for prop, setter of map
        @::.__defineSetter__ prop, setter
      map

    constructor: (a,b,c)->
      @_a = a
      @_b = b
      @_c = c
      @state = a:a, b:b, c:c

    @getter
      a: -> @_a
      b: -> @_b
      c: -> @_c

    @setter
      a: (v)-> @_a = v
      b: (v)-> @_b = v
      c: (v)-> @_c = v

    @setterReturningValue
      aReturningValue: (v)-> @_a = v
      bReturningValue: (v)-> @_b = v
      cReturningValue: (v)-> @_c = v

    @altGetter
      alt_a: -> @_a
      alt_b: -> @_b
      alt_c: -> @_c

    @altSetter
      alt_a: (v)-> @_a = v
      alt_b: (v)-> @_b = v
      alt_c: (v)-> @_c = v

    getA: -> @_a
    getB: -> @_b
    getC: -> @_c

    setA: (v)-> @_a = v
    setB: (v)-> @_b = v
    setC: (v)-> @_c = v


  objs = new Array(1024)
  for i in [0..1023]
    objs[i] = new GetSetTest 0,0,0

  benchmark "new object set plain property", ->
    for i in [0..1023]
      o = {}
      o.b = i
    null

  benchmark "new object with plain property", ->
    for i in [0..1023]
      o = b: i
    null

  benchmark "new object defineProperty", ->
    for i in [0..1023]
      o = {}
      Object.defineProperty o, "b",
        enumerable: false
        value: i
    null


  benchmark "plain props get", ->
    sum = 0
    for o in objs
      sum += o._a + o._b + o._c
    sum

  benchmark "plain props set", ->
    for o, i in objs
      o._a = o._b = o._c = i
    null

  benchmark "function props getter", ->
    sum = 0
    for o in objs
      sum += o.getA() + o.getB() + o.getC()
    sum

  benchmark "function props setter", ->
    for o, i in objs
      o.setA o.setB o.setC i
    null

  benchmark "defineProperty props getter", ->
    sum = 0
    for o in objs
      sum += o.a + o.b + o.c
    sum

  benchmark "defineProperty 1 prop, used 3x getter", ->
    sum = 0
    for o in objs
      v = o.a
      sum += v + v + v
    sum

  benchmark "defineProperty props setter", ->
    for o, i in objs
      o.a = o.b = o.c = i
    null

  benchmark "defineProperty props setter with returningValue wrapper", ->
    for o, i in objs
      o.aReturningValue = o.bReturningValue = o.cReturningValue = i
    null

  benchmark "__defineGetter__ props get", ->
    sum = 0
    for o in objs
      sum += o.alt_a + o.alt_b + o.alt_c
    sum

  benchmark "__defineSetter__ props set", ->
    for o, i in objs
      o.alt_a = o.alt_b = o.alt_c = i
    null

  benchmark "indirect plain props get", ->
    sum = 0
    for o in objs
      sum += o.state.a + o.state.b + o.state.c
    sum

  benchmark "indirect plain props set", ->
    for o, i in objs
      o.state.a = o.state.b = o.state.c = i
    null

  benchmark "test and use function getter", ->
    sum = 0
    for o in objs
      sum += (if o.getA then o.getA() else o.a) +
        (if o.getB then o.getB() else o.b) +
        (if o.getC then o.getC() else o.c)
    sum

  benchmark "test and use function setter", ->
    sum = 0
    for o in objs
      if o.setA then o.setA i else o.a = i
      if o.setB then o.setB i else o.b = i
      if o.setC then o.setC i else o.c = i
    sum
