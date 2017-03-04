
{StandardLib} = Neptune.Art
Unique = StandardLib.Unique

suite "Art.StandardLib.StandardLib.Unique", ->
  test "objectId", ->
    o = {}
    id = Unique.objectId o
    assert.equal (typeof id), "string"

  test "objectId is unique", ->
    o1 = {}
    o2 = {}
    id1 = Unique.objectId o1
    id2 = Unique.objectId o2
    assert.neq id1, id2

  test ".id object",    -> assert.match Unique.id({}), /object_[1-9][0-9]*/
  test ".id string",    -> assert.eq "string_hi",           Unique.id "hi"
  test ".id number",    -> assert.eq "0",               Unique.id 0
  test ".id null",      -> assert.eq "null",            Unique.id null
  test ".id undefined", -> assert.eq "undefined",       Unique.id undefined

  test ".id number != .id string", ->
    assert.neq Unique.id("0"), Unique.id(0)

  test "id property is hidden", ->
    a = {foo:1, bar:2}
    id1 = Unique.id a
    id2 = Unique.id a
    assert.eq id1, id2
    assert.eq Object.keys(a).join(), "foo,bar"
