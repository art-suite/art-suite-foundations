{defineModule, Promise, log, objectKeyCount} = require 'art-standard-lib'
{isWebWorker} = require './WebWorker'
{workerRpc} = require './WorkerRpc'

###
AsyncLocalStorage defines a consistent API for localStorage across web-workers and the main thread.

API:
  AsyncLocalStorage.
    getItem:    (path)        -> promise.then -> item at path
    setItem:    (path, value) -> promise.then -> success
    removeItem: (path)        -> promise.then -> success
    clear:                    -> promise.then -> success
###

defineModule module, ->
  {localStorage} = global
  localStorage ||= class LocalStorageShimForNode
    @store: {}
    @getItem:     (k)     => @store[k]
    @setItem:     (k, v)  => @store[k] = v
    @removeItem:  (k)     => delete @store[k]
    @clear:               => @store = {}
    @key:         (i)     => Object.keys(@store)[i]
    @getLength:           => objectKeyCount @store

  if isWebWorker
    workerRpc.bindWithPromises localStorage: ["getItem", "setItem", "removeItem", "clear", "key"]
  else
    workerRpc.register localStorage: localStorage
    class AsyncLocalStorage
      @getItem:    (path)        -> Promise.then -> localStorage.getItem path
      @setItem:    (path, value) -> Promise.then -> localStorage.setItem path, value
      @removeItem: (path)        -> Promise.then -> localStorage.removeItem path
      @clear:                    -> Promise.then -> localStorage.clear()
      @key:        (index)       -> Promise.then -> localStorage.key index
      @getLength:                -> Promise.then -> localStorage.length
