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

Arrays and Objects are assigned a unique id using the StandardLib.Unique library.
"0", "", null, undefined and 0 are all different unique keys and can each have unique values.

###
Unique  = require './Unique'
MinimalBaseObject = require './MinimalBaseObject'
{isFunction} = require './Core'

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

class KeysIterator
  constructor: (@node) ->
    @started = false

  next: ->
    @node = if @started
      @node?.next
    else
      @started = true
      @node

    done:   !@node
    value:  @node?.key

class ValuesIterator
  constructor: (@node) ->
    @started = false

  next: ->
    @node = if @started
      @node?.next
    else
      @started = true
      @node

    done:   !@node
    value:  @node?.value


# ES6-compatible Map
# DEPRICATED - really, we should just use a standard polyfill
# this class exists because javascript hash keys must be strings
# this simple and inefficient class allows us to use objects as keys
module.exports = if isFunction(global.Map) && (m = new global.Map).set(1, 2) == m then global.Map else
  class Map extends MinimalBaseObject

    constructor: ->
      @_length  = 0
      @_map     = {}
      @_first   = @_last = null

    @getter
      size: -> @_length

    _getNodes: ->

      result = []
      n = @_first
      while n
        result.push n
        n = n.next
      result

    keys:   -> new KeysIterator   @_first
    values: -> new ValuesIterator @_first

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
      @

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

    # returns true if an element was removed
    delete: (key) ->
      !!@_remove key

    forEach: (f) ->
      f node.value, node.key, @ for node in @_getNodes()
      undefined

    has:    (key) -> !!@_map[Unique.id key]
