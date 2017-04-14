{mapToKeysArray, mapToValuesArray, Map, inspect, log} = Neptune.Art.StandardLib

# suite "Art.StandardLib.Map.inspect", ->
#   test "inspect just string keys", ->
#     om = new Map
#     log
#         om: typeof om
#         ins: om instanceof Neptune.Base
#         inspect: inspect
#     om.set "foo", 1
#     om.set "bar", 2
#     assert.eq "{Map foo: 1, bar: 2}", inspect om

#   test "inspect just number keys", ->
#     om = new Map
#     om.set 1, "foo"
#     om.set 2, "bar"
#     assert.eq "{Map 1: \"foo\", 2: \"bar\"}", inspect om

#   test "inspect complex keys", ->
#     om = new Map
#     om.set [1,2,3], 101
#     om.set {foo:1, bar:2}, 102
#     assert.eq "{Map [1, 2, 3]: 101, {foo: 1, bar: 2}: 102}", inspect om

#   test "inspect directly recursive keys", ->
#     om = new Map
#     om.set "foo", 101
#     om.set om, 102
#     om.set "bar", 103
#     assert.eq "{Map foo: 101, <parent>: 102, bar: 103}", inspect om

#   test "inspect indirectly recursive keys", ->
#     om = new Map
#     om2 = new Map
#     om2.set om, 201
#     om2.set "bar", 202

#     om.set "foo", 101
#     om.set om2, 102
#     assert.eq "{Map foo: 101, {Map <grandparent>: 201, bar: 202}: 102}", inspect om

#   test "inspect directly recursive values", ->
#     om = new Map
#     om.set "foo", om
#     om.set "bar", 102
#     assert.eq "{Map foo: <parent>, bar: 102}", inspect om

suite "Art.StandardLib.Map", ->
  test "new", ->
    om = new Map
    assert.eq om.size, 0

  test "set", ->
    om = new Map
    assert.eq om, om.set "foo", "bar"

  test "get/set number key", ->
    om = new Map
    om.set 1, 123
    om.set 2, 456
    assert.eq om.get(1), 123
    assert.eq om.get(2), 456
    assert.eq om.get(3), undefined

  test "get/set null-like keys", ->
    om = new Map
    om.set null, 123
    om.set undefined, 234
    om.set 0, 345
    om.set "", 456
    om.set "0", 567

    assert.eq mapToKeysArray(om), [null, undefined, 0, "", "0"]
    assert.eq mapToValuesArray(om), [123, 234, 345, 456, 567]
    assert.eq om.size, 5
    assert.eq om.get(null), 123
    assert.eq om.get(undefined), 234
    assert.eq om.get(0), 345
    assert.eq om.get(""), 456
    assert.eq om.get("0"), 567

  test "get unset value == undefined", ->
    om = new Map
    om.set "foo", 123
    assert.eq om.get("bar"), undefined

  test "get/set string key", ->
    om = new Map
    om.set "hi", 123
    om.set "bye", 456
    assert.eq om.get("hi"), 123
    assert.eq om.get("bye"), 456

  test "get/set {} key", ->
    om = new Map
    om.set (a={}), 123
    om.set (b={}), 456
    assert.eq om.get(a), 123
    assert.eq om.get(b), 456

  test "get/set [] key", ->
    om = new Map
    om.set (a=[]), 123
    om.set (b=[]), 456
    assert.eq om.get(a), 123
    assert.eq om.get(b), 456

  test "delete", ->
    om = new Map
    om.set (a={}), 123
    om.set (b={}), 456
    assert.equal om.size, 2
    om.delete a
    assert.equal om.size, 1
    assert.eq om.get(a), undefined
    assert.eq om.get(b), 456

  test "has", ->
    om = new Map
    om.set (a={}), 123
    om.set (b={}), 456
    assert.ok om.has a
    assert.ok om.has b
    assert.ok !om.has {}
    om.delete a
    assert.ok !om.has a

  test "order preserved with sets & re-sets", ->
    om = new Map
    om.set "a", 123
    om.set "b", 234
    om.set "c", 345
    om.set "d", 456
    om.set "e", 567
    # om.verifyNodes()
    assert.eq mapToKeysArray(om), ["a", "b", "c", "d", "e"]
    assert.eq mapToValuesArray(om), [123, 234, 345, 456, 567]

    # re-sets
    om.set "b", "foo"
    om.set "e", "bar"
    # om.verifyNodes()
    assert.eq mapToKeysArray(om), ["a", "b", "c", "d", "e"]
    assert.eq mapToValuesArray(om), [123, "foo", 345, 456, "bar"]

    # test reverse order with re-sets
    om = new Map
    om.set "e", 567
    om.set "d", 456
    om.set "c", 345
    om.set "b", 234
    om.set "a", 123
    om.set "b", "foo"
    om.set "e", "bar"
    # om.verifyNodes()
    assert.eq mapToKeysArray(om), ["e", "d", "c", "b", "a"]
    assert.eq mapToValuesArray(om), ["bar", 456, 345, "foo", 123]

  test "order preserved with deletes", ->
    om = new Map
    om.set "a", 123
    om.set "b", 234
    om.set "c", 345
    om.set "d", 456
    om.set "e", 567
    # om.verifyNodes()

    om.delete "b";     assert.eq mapToKeysArray(om), ["a", "c", "d", "e"]
    om.delete "e";     assert.eq mapToKeysArray(om), ["a", "c", "d"]
    om.set "b", "foo"; assert.eq mapToKeysArray(om), ["a", "c", "d", "b"]
    om.set "e", "bar"; assert.eq mapToKeysArray(om), ["a", "c", "d", "b", "e"]
    om.delete "a";     assert.eq mapToKeysArray(om), ["c", "d", "b", "e"]
    assert.eq mapToValuesArray(om), [345, 456, "foo", "bar"]




