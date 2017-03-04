
{StandardLib} = Neptune.Art
clone = StandardLib.Clone.clone
Inspected = StandardLib.Inspect.Inspected

suite "Art.StandardLib.Inspect.Inspected.Core", ->
  test "number", ->
    inspected = new Inspected.Core 123
    assert.equal inspected.toString(), "123"

  test "null", ->
    inspected = new Inspected.Core null
    assert.equal inspected.toString(), "null"

  test "undefined", ->
    inspected = new Inspected.Core undefined
    assert.equal inspected.toString(), "undefined"

suite "Art.StandardLib.Inspect.Inspected.String", ->
  test "basic", ->
    inspected = new Inspected.String "hi"
    assert.equal inspected.toString(), '"hi"'

  test "with needs-escaping", ->
    inspected = new Inspected.String "\"hi\"\n\"bye\""
    assert.equal inspected.toString(), '\'"hi"\\n"bye"\''

suite "Art.StandardLib.Inspect.Inspected.array", ->
  test "basic", ->
    inspected = new Inspected.Array [
      new Inspected.String "foo"
      new Inspected.String "bar"
    ]
    assert.equal inspected.toString(), "[\"foo\", \"bar\"]"

suite "Art.StandardLib.Inspect.Inspected.Object", ->
  test "basic", ->
    inspected = new Inspected.Object
      foo: new Inspected.Core 13
      bar: new Inspected.Core 17
    assert.equal inspected.toString(), "{foo: 13, bar: 17}"

  test "with instanceOf", ->
    inspected = new Inspected.Object {
      foo: new Inspected.Core 13
      bar: new Inspected.Core 17
    }, "myClass"
    assert.equal inspected.toString(), "{myClass foo: 13, bar: 17}"
