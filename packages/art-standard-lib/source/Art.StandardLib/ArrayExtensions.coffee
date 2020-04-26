{bound, max, intRand, modulo} = require "./MathExtensions"
{isFunction, isNumber, isString} = require './TypesExtended'
{wordsRegex, exactlyOneWordRegex} = require './RegExpExtensions'

module.exports = class ArrayExtensions

  ###
  Useful compact and compactFlatten keepTester functions
  ###
  @keepAll: keepAll = -> true
  @keepIfRubyTrue: keepIfRubyTrue = (a) -> a != undefined && a != null && a != false

  # OUT: the array
  @reverseForEach: (array, f) ->
    f v for v in array by -1
    array

  @arrayToTruthMap: (array) ->
    res = {}
    for a in array
      res[a] = true
    res

  @arrayToFalseMap: (array) ->
    res = {}
    for a in array
      res[a] = false
    res

  @arrayAfterEach: (array, value) ->
    out = []
    for v in array
      out.push v
      out.push value
    out

  @arrayBeforeEach: (array, value) ->
    out = []
    for v in array
      out.push value
      out.push v
    out

  @arrayBetweenEach: (array, value) ->
    out = []
    for v, i in array
      out.push value if i > 0
      out.push v
    out

  @concatInto: (array, b) -> array.push.apply array, b

  @uniqueValues: (sortedArray, eqF = ((a, b) -> a == b)) ->
    v for v, i in sortedArray when i == 0 || !eqF v, sortedArray[i-1]

  ###
  IN:
    array: an array or falsy value
    element: anything
  OUT:
    array containing element as the last element

  EFFECT:
    if array was falsy, a new length-1 array is returned
    else, array was mutated by pushing the current element

  WHY?
    Why write this when arrays alread have push?

    1) if array is null, this works as desired
    2) this returns array, not array.length
      Returning the array is what Ruby's push does.
      It makes chaining pushes easy.

  ###
  @push: (array, element) ->
    if array
      array.push element
      array
    else
      [element]

  @peek: (array, offset = -1) =>
    if array?
      array[array.length + offset]
    else
      undefined

  basicCompareFunction = (a, b) -> a - b

  # if index < 0, index += array.length
  @leftOfIndex: leftOfIndex = (array, index)  ->
    return array unless array
    array.slice 0, index

  # if index < 0, index += array.length
  @rightOfIndex: rightOfIndex = (array, index) ->
    return array unless array
    if index < 0
      index += array.length
    array.slice index + 1

  # if value is in array, return the index of the first match
  # else, return the length of the array
  indexOfOrLength = (array, value) ->
    if 0 > i = array.indexOf value
      array.length
    else
      i

  # if value is not found, left returns whole array, right returns nothing
  # if value is found, left returns all elements before the first match, right returns all elements after
  @leftOf:   (array, value) -> leftOfIndex  array, indexOfOrLength array, value
  @rightOf:  (array, value) -> rightOfIndex array, indexOfOrLength array, value
  @splitArray: (array, value) ->
    index = indexOfOrLength array, value
    [
      leftOfIndex array, index
      rightOfIndex array, index
    ]

  ###
  findSortedFirst

  Acts as-if it sorted the array and returned the first element.

  Details:
    tests each element in the array againts the current "smallest"
    returns the element for which tests "smaller" than every other
    element a is "smaller" than b if compareFunction(a, b) returns >0 value

  IN:
    array - the array to search or null
    compareFunction - (a, b) -> # standard compare function
      returns:
        0: if a and b are equal
        <0: if b is greater than a
        >0: if a is greater than b
      default: (a, b) -> a - b

  OUT:
    largest value in array or undefined if array is null or length 0
  ###
  @findSortedFirst: (array, compareFunction = basicCompareFunction) ->
    return undefined unless array?.length > 0
    returnElement = array[0]
    for i in [1...array.length] by 1
      if 0 < compareFunction returnElement, element = array[i]
        returnElement = element

    returnElement

  @first: (array) => array[0]
  @second: (array) => array[1]
  @third: (array) => array[2]
  @forth: (array) => array[3]
  @fifth: (array) => array[4]
  @last: (array) => if array then array[array.length - 1] else undefined

  # push item into array unless it is already present in the array
  # returns true if the item was pushed
  @pushIfNotPresent: (array, item) =>
    if item in array
      false
    else
      array.push item
      true

  # ALIAS
  @pushUnique: @pushIfNotPresent

  ###
  IN:
    array: []
    randomizer:               [optional] () -> [0, 1) random number generator
    selectFromFirstNElements: [optional] int
  ###
  @randomElement: randomElement = (array, a, b) ->
    rand = if isFunction randomizer = a
      fromFirstN = b
      randomizer()
    else
      fromFirstN = a
      Math.random()

    array[rand * (fromFirstN ? array.length) | 0]

  @randomSortInPlace: randomSortInPlace = (array) ->
    len = array.length
    for i in [len-1..0] by -1
      j = intRand i
      a = array[i]
      array[i] = array[j]
      array[j] = a
    array

  # new array, randomly sorted
  # null/undefined > []
  @arrayWithRandomSort: (array) ->
    if array
      randomSortInPlace array.slice()
    else
      []

  @randomSort: @arrayWithRandomSort

  # insert -1 => add to end of array
  # insert -2 => insert one before the last element of the array
  @insert: (array, index, item) ->
    index = array.length + index + 1 if index<0
    array.splice index, 0, item
    array

  # same as insert, except doesn't modify input array; returns new array
  @arrayWithInsertedValue: arrayWithInsertedValue = (array, index, item) =>
    @insert array.slice(), index, item

  @withInserted: arrayWithInsertedValue

  # returns a new, sorted array
  @withSort: (array = [], sortFunction) ->
    array = array.slice()
    array.sort sortFunction

  @remove: (array, index, amount = 1) ->
    index = array.length + index + 1 if index<0
    array.splice index, amount
    array

  @removeFirstMatch: (array, toMatchValue) =>
    index = array.indexOf toMatchValue
    if index >= 0
      @remove array, index
    else
      array

  @arrayWithout: (array, index, amount = 1) =>
    if array?
      index = array.length - 1 unless index?
      @remove array.slice(), index, amount
    else []

  # OUT: returns the exact same array if value isn't present
  # else if array is null/undefined, returns []
  # else, returns the array with the first occurance of value removed.
  @arrayWithoutValue: (array, value) =>
    if array?
      if 0 <= index = array.indexOf value
        @remove array.slice(), index, 1
      else
        array
    else []

  @arrayWithoutLast: (array, amount = 1) ->
    if array? && amount < array.length
      array.slice 0, array.length - amount
    else
      []

  # returns a clone of array
  # pure-functional push
  # with value pushed at the end (value can be duplicated)
  # if array is null/undefined/false, returns new array with only value in it: [value]
  @arrayWith: (array, value) =>
    return [value] unless array
    array = array.slice()
    array.push value
    array

  @truncatedArrayWith: (array, length, value) =>
    return [value] unless array
    array = array.slice 0, length
    array.push value
    array

  # returns a clone of array without the last element
  # pure-functional pop
  @poppedArray: (array) =>
    array.slice 0, array.length - 1

  # returns a clone of array (or [value] if array is null)
  # with value pushed at the end ONLY IF value isn't already in the array
  # if array is null/undefined/false, returns new array with only value in it: [value]
  @arrayWithOne: (array, value) =>
    return [value] unless array
    array = array.slice()
    array.push value unless value in array
    array

  # ALIAS
  @arrayWithUnique: @arrayWithOne

  @slice: (a, b, c) -> arraySlice.call a, b, c

  @shuffleArray: (a) ->
    i = a.length
    while --i > 0
      j = ~~(Math.random() * (i + 1))
      t = a[j]
      a[j] = a[i]
      a[i] = t
    a

  # included here only for testing; use @moveArrayElement as a client
  @_moveArrayElementLargeArray: _moveArrayElementLargeArray = (array, from, to) ->
    array.splice to, 0, array.splice(from, 1)[0]
    array

  @_moveArrayElementSmallArray: _moveArrayElementSmallArray = (array, from, to) ->
    from = from | 0
    to = to | 0
    tmp = array[from]
    if from < to then array[i] = array[i + 1] for i in [from..to-1] by 1
    else              array[i] = array[i - 1] for i in [from..to+1] by -1
    array[to] = tmp
    array

  # move one element of the array FROM one location TO another.
  # IN: from/to are moduloed into valid indexes
  #   a = intMode a, array.length
  @moveArrayElement: moveArrayElement = (array, from, to) ->
    from = modulo from | 0, array.length
    to   = modulo to   | 0, array.length

    # 300 is a somewhat arbitrary value. It's approximately where
    # _moveArrayElementLargeArray becomes faster on Chrome 36.0.1985.143 (2014/9/21)
    # http://jsperf.com/array-prototype-move/19
    if Math.abs(from - to) > 300
      _moveArrayElementLargeArray array, from, to
    else
      _moveArrayElementSmallArray array, from, to
    array

  @arrayWithElementMoved: arrayWithElementMoved = (array, from, to) ->
    from = modulo from | 0, array.length
    to   = modulo to   | 0, array.length
    return array if from == to
    array = array.slice()
    moveArrayElement array, from, to

  @arrayWithElementValueMoved: (array, value, to) ->
    from = array.indexOf value
    return array if from < 0
    arrayWithElementMoved array, from, to

  @arrayWithElementReplaced: (array, value, index) ->
    array = array.slice()
    array[index] = value
    array

  @arrayWithAllButLast: (array, amount = 1) ->
    if array
      array.slice 0, array.length - amount
    else
      []

  ###
  stableSort is an in-place, stable sort

  "stable" means that if two elements are 'equal' under the compare test, their order won't
  change with respect to each other.

  NOTE: array.sort is not guaranteed to be stable
  ###
  @stableSort: (array, compare) ->
    compare ||= (a, b) -> a - b
    # FIRST PASS - a BUBBLE SORT
    notSorted = true
    length = array.length
    while notSorted
      notSorted = false
      for i in [1...length] by 1
        if compare(a = array[i-1], b = array[i]) > 0
          array[i-1] = b
          array[i] = a
          notSorted = true
    array

  # compares two arrays, element by element using == (javascript ===)
  # returns the longest array of elements which are:
  #   * in both a and b, and
  #   * in the same order in both a and b
  # FUTURE: should we use shallowEq?
  @longestCommonSubsequence = longestCommonSubsequence = (a, b) ->
    lcs = []
    row = []
    c = []

    # make sure shorter string is the column string
    if m < n
      s = a
      a = b
      b = s

    m = a.length
    n = b.length

    # build the c-table
    row[j] = 0 for j in [0...n] by 1

    for i in [0...m] by 1
      c[i] = row = row.slice()
      diag = 0
      for j in [0..n-1] by 1
        latch = row[j]
        if a[i] == b[j]
          row[j] = diag + 1
        else
          left = row[j - 1] || 0
          if left > row[j]
            row[j] = left
        diag = latch

    i--
    j--
    # row[j] now contains the length of the lcs
    # recover the lcs from the table
    while i > -1 && j > -1
      switch c[i][j]
        when i && c[i-1][j]
          i--
          continue
        when j && c[i][j-1]
          j--
        else
          j--
          lcs.unshift a[i]
          i--
          continue

    lcs

  # goal 1: Given a and b, merge them while maintain order.
  # goal 2: Given a and b contain no duplicates, returns an array with no duplicates.
  # As the simple example below shows, goal 1 and to can come into conflict. If so, b's order
  # is preferred and a's order is compromized.
  # Ex: a = [1, 2], b = [2, 1]
  #   goal-1-only-result: [2, 1, 2]
  #   goal-2 with b-order dominance: [2, 1]
  @minimumOrderedOverlappingMerge = (a, b) ->
    c = longestCommonSubsequence a, b

    m = a.length
    n = b.length
    o = c.length

    out = new Array n

    i = 0
    j = 0
    k = 0
    l = 0

    while i < m && j < n && k < o
      ai = a[i]
      bj = b[j]
      ck = c[k]
      if ai == ck && bj == ck
        i++
        j++
        k++
        out[l++] = ai
      else if ai != ck
        i++
        unless ai in b # skip duplicates
          out[l++] = ai
      else
        j++
        out[l++] = bj

    while i < m
      ai = a[i++]
      out[l++] = ai unless ai in b

    while j < n
      out[l++] = b[j++]

    out

  # SSNNSOONSSOONSON

  # SSSOOSSOOSO
  # SSNNSNSSNSN
  # SSSSSS

  # trying out various aliases to see which one I like
  @wordsArray: w = (args...)->
    out = []
    for arg in args
      if isString(arg) && !arg.match exactlyOneWordRegex
        out = out.concat arg.match wordsRegex
      else
        out.push arg
    out

  @wordArray: @wordsArray
  @w: @wordsArray # this one makes it feel a lot like ruby's %w{a b c}. Instead, we have: w "a b c"

  @a: a = (args...)-> args
