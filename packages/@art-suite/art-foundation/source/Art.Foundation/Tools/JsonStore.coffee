{log, Promise, isNumber} = require 'art-standard-lib'
ClassSystem = require 'art-class-system'
AsyncLocalStorage = require './AsyncLocalStorage'
{BaseObject} = ClassSystem
module.exports = class JsonStore extends BaseObject
  @singletonClass()
  # store: localStorage or sessionStorage
  #   OR anything that implements the Async Storage interface (localStorage but returns promises):
  #     length
  #     key(index)
  #     getItem(key)
  #     setItem(key, value)
  #     removeItem(key)
  #     clear()
  constructor: (store = AsyncLocalStorage) -> @store = store

  # returns the string-value written or null if non written (for example, if nothing changed)
  setItem: (key, value) ->
    json = null
    @store.getItem key
    .then (oldJson) =>
      if oldJson != json = JSON.stringify value
        @store.setItem key, json
        .then -> json

      else
        null

    .catch (error) ->
      log.error JsonStore_setItem: {key, value, json, error}
      throw error

  getItem: (key) ->
    Promise.then    => @store.getItem key
    .then (json)    => json && JSON.parse json
    .catch (error) ->
      log.error JsonStore_getItem: {key, json, error}
      throw error

  removeItem: (k)    -> Promise.then => @store.removeItem k
  clear:             -> Promise.then => @store.clear()
  key:        (i)    -> Promise.then => @store.key i

  getLength:         -> Promise.then => if isNumber @store.length then @store.length else @store.getLength()
