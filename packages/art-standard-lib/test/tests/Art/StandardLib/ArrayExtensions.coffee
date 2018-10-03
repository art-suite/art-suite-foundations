{
  arrayBeforeEach
  arrayAfterEach
  arrayBetweenEach
  arrayWithoutValue
  arrayWithout
} = require './StandardImport'

module.exports = suite: ->
  test "arrayBeforeEach", ->
    assert.eq(
      arrayBeforeEach [1,2,3], 0
      [0,1,0,2,0,3]
    )

  test "arrayAfterEach", ->
    assert.eq(
      arrayAfterEach [1,2,3], 0
      [1,0,2,0,3,0]
    )

  test "arrayBetweenEach", ->
    assert.eq(
      arrayBetweenEach [1,2,3], 0
      [1,0,2,0,3]
    )

  test "arrayWithoutValue", ->
    assert.eq(
      arrayWithoutValue [1,2,3], 2
      [1,3]
    )

    assert.eq(
      arrayWithoutValue [1,2,3], 4
      [1,2,3]
    )
    assert.eq(
      arrayWithoutValue()
      []
    )


  test "arrayWithout", ->
    assert.eq(
      arrayWithout [1,2,3], 2
      [1,2]
    )
    assert.eq(
      arrayWithout()
      []
    )
