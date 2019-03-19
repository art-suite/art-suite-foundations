
{StandardLib} = Neptune.Art
{toInspectedObjects, inspectedObjectLiteral, log, neq} = StandardLib

suite "Art.StandardLib.Inspect.toInspectedObjects", ->
  test "toInspectedObjects 'hi'", ->
    assert.eq toInspectedObjects('hi'), "hi" # inspectedObjectLiteral '"hi"'

  test "toInspectedObjects function", ->
    if neq toInspectedObjects((a)->), inspectedObjectLiteral 'function(a) {}'
      assert.eq toInspectedObjects((a)->), inspectedObjectLiteral '(a) -> {}'

  test "toInspectedObjects a:1", ->
    assert.eq toInspectedObjects(a:1), a: 1

  test "toInspectedObjects [1, 2]", ->
    assert.eq toInspectedObjects([1,2]), [1, 2]

  test "toInspectedObjects [a:1, 2]", ->
    assert.eq toInspectedObjects([a:1, 2]), [a:1, 2]

  test "toInspectedObjects a:[1, 2], b:3", ->
    assert.eq toInspectedObjects(a:[1, 2], b:3), a:[1, 2], b: 3

  test "inspectedObjectLiteral", ->
    assert.eq toInspectedObjects(
      a: inspectedObjectLiteral "abc"
      ),
      a: inspectedObjectLiteral "abc"

  test "toInspectedObjects on JSON structure doesn't change anything", ->
    testStuff =
      string: "my string"
      number: 123
      nullProp: null
      trueProp: true
      falseProp: false
      nestedObject: a: 1, b: 2
      nestedArray: [1, 2]
    assert.eq testStuff, toInspectedObjects testStuff
    for atom in ["foo", null, 123, true, false, [], {}]
      assert.eq atom, toInspectedObjects atom

  test "toInspectedObjects twice doesn't change result", ->
    testStuff =
      string: "my string"
      number: 123
      literal: inspectedObjectLiteral "my literal"
      nestedObject: a: 1, b: 2
      nestedArray: [1, 2]
    once = toInspectedObjects testStuff
    twice = toInspectedObjects once
    assert.eq once, twice

    assert.eq once,
      string:       "my string"
      number:       123
      literal:      inspectedObjectLiteral "my literal"
      nestedObject: a: 1, b: 2
      nestedArray:  [1, 2]
