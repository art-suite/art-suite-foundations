###
TODO: This is almost identical to ES6's Map: Switch to using a Polyfill like:
  https://github.com/paulmillr/es6-shim

Map is a Key-Value map which preserves order.

Unlike Javascript objects, you can use any object or value as keys. This includes:

  Strings
  Numbers
  null
  undefined
  Arrays
  Objects

Arrays and Objects are assigned a unique id using the Foundation.Unique library.
"0", "", null, undefined and 0 are all different unique keys and can each have unique values.

###
Unique  = require './Unique'
MinimalBaseObject = require './MinimalBaseObject'

class Node
  constructor: (key, value, prev, next) ->
    @key = key
    @value = value
    @prev = prev || null
    @next = next || null
    prev.next = @ if prev
    next.prev = @ if next

  remove: ->
    n = @next
    p = @prev
    if p
      p.next = n
      @prev = null
    if n
      n.prev = p
      @next = null

# this class exists because javascript hash keys must be strings
# this simple and inefficient class allows us to use objects as keys
module.exports = class Map extends MinimalBaseObject
  @inverseMap: (array) ->
    result = new Map
    result.set v, k for v, k in array
    result

  constructor: ->
    @_length = 0
    @_map = {}
    @_first = @_last = null

  @getter
    length: -> @_length
    nodes: ->
      result = []
      n = @_first
      while n
        result.push n
        n = n.next
      result
    keys: -> node.key for node in @nodes
    values: -> node.value for node in @nodes

  get: (key) ->
    node = @_map[Unique.id key]
    node && node.value

  set: (key, value) ->
    id = Unique.id key
    if @_map[id]
      @_map[id].value = value
    else
      @_length++
      @_last = @_map[id] = new Node key, value, @_last
      @_first = @_last unless @_first
    value

  # returns the removed element node or undefined
  _remove: (key) ->
    id = Unique.id key
    if n = @_map[id]
      @_length--
      delete @_map[id]
      @_first = n.next if @_first == n
      @_last = n.prev if @_last == n
      n.remove()
      n
    else
      undefined

  # returns the removed element's value or undefined
  # NOTE: "undefined" is a legal element value
  remove: (key) ->
    if n = @_remove key
      n.value
    else
      undefined

  # returns true if an element was removed
  delete: (key) ->
    !!@_remove key

  exists: (key) -> @_map[Unique.id key]

  # yields just values like Array.forEach
  # returns @
  forEach: (f) ->
    f node.value for node in @nodes
    @

  # return the value of the first element that passes the test
  # or undefined
  findFirst: (testF) ->
    return node.value for node in @nodes when testF node.value
    undefined

  # yields key, value for each element like jQuery .each and Ruby's Hash.each
  # returns @
  each: (f) ->
    f node.key, node.value for node in @nodes
    @

  # yields key, value for each element like jQuery .each and Ruby's Hash.each
  # returns array of the result of applying f to each key, value pair
  map: (f) -> f node.key, node.value for node in @nodes

  inspect: (inspector) ->
    Neptune.Art.Foundation.log "inspect map"
    return Neptune.Art.Foundation.inspect @ unless inspector
    _inspect = (o) ->
      if typeof o is "string" && o.match /^[a-zA-Z_][a-zA-Z_0-9]*$/
        inspector.put o
      else
        inspector.inspect o
    inspector.put "{Map "
    first = true
    @map (k, v) ->
      inspector.put ", " unless first
      _inspect k
      inspector.put ": "
      inspector.inspect v
      first = false
    inspector.put "}"

  # verify nodes are correct
  verifyNodes: ->
    {inspect} = Neptune.Art.Foundation
    return if !@_first? && !@_last? && @_length == 0 # empty - is OK
    throw new Error "length == #{@length} but @_first is not null" if @_length == 0 && @_first
    throw new Error "length == #{@length} but @_last is not null" if @_length == 0 && @_last
    throw new Error "length == #{@length} and @_first is null" unless @_first
    throw new Error "length == #{@length} and @_last is null" unless @_last

    throw new Error "@_first has prev" if @_first.prev
    throw new Error "@_last has next" if @_last.next
    length = 0
    prev = null
    node = @_first
    while node
      length++
      throw new Error "node.prev != prev. #{inspect {lenght: length, nodePrev:node.prev, prev:prev},1}" unless node.prev == prev
      prev = node
      node = node.next
    throw new Error "@length is #{@length}, but it should be #{length}" unless @length == length
