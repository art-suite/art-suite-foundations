# promise-polyfill takes advantage of setImmediate for performance gains
# This polyfil promises good setImmediate performance: https://github.com/YuzuJS/setImmediate
Promise = BlueBirdPromise = require 'bluebird/js/browser/bluebird.core.min'
# global.Promise ||= require 'promise-polyfill'
{deepMap, deepEach, isFunction, isPlainObject} = require './TypesExtended'
{defineModule} = require './CommonJs'
{getEnv} = require './Environment'
namespace = require './namespace'

if promiseDebug = getEnv().artPromiseDebug
  console.log "Art.StandardLib.Promise: BlueBirdPromise debug ENABLED"

BlueBirdPromise.config
  warnings:         promiseDebug
  longStackTraces:  promiseDebug
  cancellation:     promiseDebug
  monitoring:       promiseDebug

{isPromise} = require './Core/Types'

ErrorWithInfo = require "./ErrorWithInfo"

###
ArtPromise extends ES6 Promises in the following ways:

- constructing a promise with no parameters is allowed
- promise.resolve and promise.reject are supported as
  alternative ways to resolve or reject a promise

If native promises are supported, they are used,
otherwise a polyfill is used.

TODO:
  ES6 says Promises are designed to be extensible:
  http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects

  If I properly extend Promise, will my new methods be available on all promise objects... ???
    At least all promises chained off of one created using my Promise class... ???

  But I had problems doing that. Maybe it's how CoffeeScript extends things?

TODO:
  I want a way to do 'then' and 'catch' without effecting any following 'thens' or 'caches'

  It's easy to implement, but what to call it? Leaning towards tapThen. If I had Ruby's 'tap', then
  I could do this effectively with:

    .tap (a) -> a.then ->
    but
    .tapThen ->
    is even nicer

  Will it be available on returned promises?
    (see ES6 Promise extension above)

  tapThen: (successF, failF) ->
    @then successF, failF
    @ # return the current promise, not the one returned from the then-call above
###
defineModule module, ->
  class ArtPromise #extends BlueBirdPromise
    # @ES6Promise: Promise
    # @all: Promise.all
    # @race: Promise.race
    # @reject: Promise.reject
    # @resolve: Promise.resolve
    # @then: (f) -> Promise.resolve().then f

    @isPromise: isPromise
    @testPromise: (promise) ->
      promise.then  (v) -> console.log "promise.resolve", v
      promise.catch (v) -> console.log "promise.reject", v
    @mapAll: (map) ->
      keys = Object.keys map
      Promise.all(map[key] for key in keys)
      .then (values) ->
        out = {}
        out[key] = values[i] for key, i in keys
        out

    @containsPromises: (plainStructure) ->
      containsPromises = false
      deepEach plainStructure, (v) -> containsPromises ||= isPromise v
      containsPromises

    ###
    For use with Node-style callbacks:
      IN: (error, data) ->
        error: null or set if there was an error
        data: set if error is null

    Example:
      Promise.withCallback (callback) ->
        doAsyncStuff -> callback()
    ###
    @withCallback: (startPromiseBodyFunction) ->
      new BlueBirdPromise (resolve, reject) ->
        callback = (err, data) ->
          return reject new Error err if err
          resolve data

        startPromiseBodyFunction callback

    @newExternallyResolvable: ->
      out = {}
      p = new BlueBirdPromise (resolve, reject) ->
        out.resolve = resolve
        out.reject = reject
      p.resolve = out.resolve
      p.reject = out.reject
      p

    noop = (a) -> a
    @deepAll: deepAll = (plainStructure, resolvedResultPreprocessor = noop) ->
      promises = []

      deepEach plainStructure, (v) ->
        promises.push v if isPromise v

      Promise.all promises
      .then (resolved) ->
        i = 0
        deepMap plainStructure, (v) ->
          if isPromise v
            resolvedResultPreprocessor resolved[i++]
          else
            v

    @deepResolve: deepAll

    ###
    Serializer makes it easy to ensure promise-returning functions are invoked in order, after each
    promise is resolved.

    USAGE:

      # EXAMPLE 1: Basic - not too different from normal Promise sequences
      serializer = new ArtPromise.Serializer
      serializer.then -> doA()

      # then execute sometime later, possbly asynchronously:
      serializer.then -> doB()

      # then execute sometime later, possbly asynchronously:
      serializer.then (doBResult) ->
        # doA and doB have completed and any returning promises resolved
        # the result of the last 'then' is passed in

      # EXAMPLE 2: apply the same async function serially to each element in list
      # - list's order is preserved
      # - each invocation waits for the previous one to complete
      serializer = new ArtPromise.Serializer
      list.forEach serializer.serialize f = (element) -> # do something with element, possibly returning a promise
      serializer.then (lastFResult) ->
        # do something after the last invocation of f completes
        # the result of the last invocation of 'f' is passed in

      # EXAMPLE 3: mix multiple serialized functions and manual @then invocations
      # - invocation order is perserved
      serializer = new ArtPromise.Serializer
      serializedA = serializer.serialize aFunction
      serializedB = serializer.serialize bFunction

      serializedB()
      serializer.then -> @cFunction()
      serializedB()
      serializedA()
      serializedB()

      serializer.then (lastBFunctionResult) ->
        # this is invoked AFTER:
        # evaluating, in order, waiting for any promises:
        #   bFunction, cFunction, bFunction, aFunction, bFunction
    ###
    class ArtPromise.Serializer
      constructor: -> @_lastPromise = BlueBirdPromise.resolve()

      ###
      Returns a new function, serializedF, that acts just like 'f'
        - f is forced to be async:
          - if f doesn't return a promise, a promise wrapping f's result is returned
        - invoking serializedF queues f in this serializer instance's sequence via @then
      IN: any function with any signature
      OUT: (f's signature) -> promise.then (fResult) ->

      Example with Comparison:

        # all asyncActionReturningPromise(element)s get called immediately
        # and may complete randomly at some later event
        myArray.forEach (element) ->
          asyncActionReturningPromise element

        # VS

        # asyncActionReturningPromise(element) only gets called
        # after the previous call completes.
        # If a previous call failes, the remaining calls never happen.
        serializer = new Promise.Serializer
        myArray.forEach serializer.serialize (element) ->
          asyncActionReturningPromise element

        # bonus, you can do things when all the promises complete:
        serializer.then =>

        # or if anything fails
        serializer.catch =>

        # VS - shortcut

        # Just insert "Promise.serialize" before your forEach function to ensure serial invocations.
        # However, you don't get the full functionality of the previous example.
        myArray.forEach Promise.serialize (element) ->
          asyncActionReturningPromise element


      ###
      serialize: (f) -> (args...) => @then -> f args...

      # invoke f after the last serialized invocation's promises are resolved
      # OUT: promise.then (fResult) ->
      then: (resolved, rejected) -> @_lastPromise = @_lastPromise.then resolved, rejected

      catch: (rejected) -> @_lastPromise = @_lastPromise.catch rejected

      # ignore previous errors, always do f after previous successes or failures complete.
      always: (f) ->
        @_lastPromise = @_lastPromise
        .catch => null
        .then f

      ###
      OUT: promise that resolves / rejects only when there are no more
        pending tasks queued with the serializer.

        .then (lastResult) ->
        .catch (lastError) ->

      NOTE: allDonePromise could complete, then more tasks could be queued with the serializer.
        Promises can't be resolved/rejected twice, so when the more-tasks complete, the first
        allDonePromise won't do anything.
        However, you can call allDonePromise again once the tasks are queued and get notified
        when THEY are done.
      ###
      allDonePromise: ->
        currentLastPromise = @_lastPromise
        currentLastPromise
        .then (lastResult) => if currentLastPromise == @_lastPromise then lastResult else @allDonePromise()
        .catch (lastError) => if currentLastPromise == @_lastPromise then throw lastError else @allDonePromise()

    ###
    OUT: serializedF = -> Promise.resolve f args...
      IN: any args
      EFFECT: f is invoked with args passed in AFTER the last invocation of serializedF completes.
      OUT: promise.then -> results from f

    NOTE: 'f' can return a promise, but it doesn't have to. If it does return a promise, the next
      'f' invocation will not start until and if the previous one's promise completes.

    USAGE:
      serializedF = Promise.serialize f = -> # do something, possibly returning a promise
      serializedF()
      serializedF()
      serializedF()
      .then (resultOfLastF)->
        # executed after f was executed and any returned promises resolved, 3 times, sequentially

    OR
      serializedF = Promise.serialize f = (element) -> # do something with element, possibly returning a promise
      Promise.all (serializedF item for item in list)
      .then (results) ->
        # f was excuted list.length times sequentially
        # results contains the result values from each execution, in order

    ###
    @serialize: (f) -> new ArtPromise.Serializer().serialize f

    @logPromise: (context, p) ->
      unless p?
        p = context
        context = "(context not specified)"
      {log, currentSecond} = namespace
      log logPromise_start: context
      startTime = currentSecond()
      Promise.then ->
        if isFunction p
          p()
        else
          p
      .tap (result)     -> log logPromise_success: {context, result, seconds: currentSecond() - startTime }
      .tapCatch (error) -> log.error logPromise_error: {context, error, seconds: currentSecond() - startTime}

    @logPromiseProblems: logPromiseProblems = (context, p) ->
      {log, currentSecond} = namespace
      startTime = currentSecond()
      Promise.then ->
        if isFunction p
          p()
        else
          p
      .tapCatch (error) -> log.error logRejectedPromises: {context, error, seconds: currentSecond() - startTime}

    @logPromiseErrors:    logPromiseProblems
    @logRejectedPromises: logPromiseProblems # June 2019 - I think I like this alias

    @invert: (promise) ->
      promise.then (e) ->
        throw new ErrorWithInfo "#{e}", e
      , (v) -> v

    @finally: (promise, action) ->
      BlueBirdPromise.resolve(promise)
      .finally action

    @then: BlueBirdPromise.try

    # constructor: (_function)->
    #   @resolve = @reject = null
    #   @_nativePromise = null
    #   @_nativePromise = new Promise (@resolve, @reject) =>
    #     _function? @resolve, @reject

    # then: (a, b) -> @_nativePromise.then a, b
    # catch: (a) -> @_nativePromise.catch a
    # @then: (f) -> Promise.resolve().then f

  BlueBirdPromise[k] ||= v for k, v of ArtPromise
  # self.Promise ||= ArtPromise
  BlueBirdPromise
