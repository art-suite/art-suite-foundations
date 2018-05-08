{
  arrayBeforeEach
  arrayAfterEach
  arrayBetweenEach
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

