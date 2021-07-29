StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'
WebWorker = require './WebWorker'

{Promise, log, isPlainArray, isFunction, isString, mergeInto} = StandardLib
{BaseObject} = ClassSystem
{isWebWorker} = WebWorker

{Worker} = global

debugPrefix = if isWebWorker then "WorkerRpc(worker)" else "WorkerRpc(browser)"
module.exports = class WorkerRpc extends BaseObject
  @singletonClass()
  @workerRpcChannelIdString: workerRpcChannelIdString = "Art.Foundation.WorkerRpcChannel"

  @register: (toRegister) -> WorkerRpc.singleton.register toRegister
  @bind:             (toBind) -> WorkerRpc.singleton._bind toBind, false
  @bindWithPromises: (toBind) -> WorkerRpc.singleton._bind toBind, true

  ###
  INPUT:
    thread:
      must implement onmessage= and postMessage or be null
      In a webworker, this gets set to self if it is null.
    options:
      bind: map # invokes: @bind map
      bindWithPromises: map # invokes: @bindWithPromises map
  ###
  constructor: (thread, options) ->
    if isString thread
      log "WorkerRpc starting worker: #{thread}"
      thread = new Worker thread
      log "WorkerRpc starting worker: #{thread}, started?:", thread
    thread = self unless thread || self == self.window

    @_reset()
    @_bindOnmessage @_thread = thread
    @_applyOptions options if options

  register: (toRegister) ->
    return unless toRegister
    for namespaceName, functionMap of toRegister
      if @_registry.hasOwnProperty namespaceName
        mergeInto @_registry[namespaceName], functionMap
      else
        @_registry[namespaceName] = functionMap

    @_registry

  ###
  Creates functions to make specific remote-procedure-calls.

  IN:
    toBind: map to arrays of strings
      Each key in the map specifies a namespace.
      The array of strings specify the names of each RPC you want to be able to invoke.

  For a given namespaceName and functionName, this binds the function so you can
  invoke it as follows:
    @myNamespaceName.myFunctionName()

  The created functions are one-way. They return null as soon as the message has been sent
  to the remote thread. If you want the results, see @bindWithPromises
  ###
  bind: (toBind)-> @_bind toBind, false

  ###
  Same as @bind except each function created will return a promise which will return
  the results return from the remote procedure call when they are ready.
  ###
  bindWithPromises: (toBind) -> @_bind toBind, true

  #######################
  # PRIVATE
  #######################
  # returns the last namespace-object bound
  _bind: (toBind, withPromises)->
    throw new Error "@_thread.postMessage required for remote requests" unless isFunction @_thread?.postMessage
    return unless toBind
    namespace = null
    for namespaceName, functionNames of toBind
      @[namespaceName] = {} unless @hasOwnProperty namespaceName
      namespace = @[namespaceName]
      for functionName in functionNames
        namespace[functionName] = if withPromises
            @_newRemoteRequestFunctionWithPromise namespaceName, functionName
          else
            @_newRemoteRequestFunction namespaceName, functionName
    namespace

  _reset: ->
    @_registry =
      promiseCallback:
        success: (promiseId, result) => WorkerRpc._resolvePromise promiseId, result
        error:   (promiseId, error)  => WorkerRpc._rejectPromise promiseId, error

  _applyOptions: ({register, bind, bindWithPromises})->
    @register register
    @bind bind
    @bindWithPromises bindWithPromises
    @

  _send: (namespaceName, functionName, promiseId, args)->
    @_thread.postMessage [workerRpcChannelIdString, namespaceName, functionName, promiseId, args]

  _newRemoteRequestFunctionWithPromise: (namespaceName, functionName) ->
    (args...)=>
      WorkerRpc._bindPromise (promiseId) =>
        @_send namespaceName, functionName, promiseId, args

  _newRemoteRequestFunction: (namespaceName, functionName) ->
    (args...)=>
      @_send namespaceName, functionName, null, args

  _bindOnmessage: (thread) ->
    return unless thread
    handler = ({data}) =>
      return unless isPlainArray data
      [testWorkerRpcChannelIdString, namespaceName, functionName, promiseId, args] = data
      return unless testWorkerRpcChannelIdString == workerRpcChannelIdString

      @_invokeLocalFunction namespaceName, functionName, promiseId, args

    if thread.addEventListener
      # using addEventListner allows WorkerRpc to work side-by-side with other message handlers.
      thread.addEventListener 'message', handler
    else
      # webworker handlers must be set this way
      thread.onmessage = handler

  _invokeLocalFunction: (namespaceName, functionName, promiseId, args) ->
    unless (namespace = @_registry[namespaceName]) && localFunction = namespace[functionName]
      {singleton} = WorkerRpc
      if @ != singleton && (namespace = singleton._registry[namespaceName])
        localFunction = namespace[functionName]

    unless localFunction
      console.warn """
        #{debugPrefix}_onmessage: could not find: '#{namespaceName}.#{functionName}'

        namespaces: #{Object.keys(@_registry).join ', '}
        global namespaces: #{if singleton == @ then "(same)" else Object.keys(singleton._registry).join ', '}
      """

    if localFunction
      WorkerRpc.lastMessageReceivedFrom = @
      @_resolveOrRejectRemotePromise promiseId, localFunction.apply namespace, args

  _resolveOrRejectRemotePromise: (promiseId, result) ->
    return unless promiseId?
    Promise.resolve result
    .then (result) => @_send "promiseCallback", "success", null, [promiseId, result]
    ,     (error)  => @_send "promiseCallback", "error",   null, [promiseId, error]

  ######################
  # CLASS PRIVATE
  ######################
  ###
  IN:   f: (promiseId) -> ignored
  OUT:  promise

  Creates a new promise, addes it to @_promises with a unique id, and invokes f, passing in
  the promise's id.
  ###
  # returns the id of the promise
  @_promises = {}
  @_nextPromiseId = 0

  @_bindPromise: (f) ->
    @_promises[promiseId = @_nextPromiseId++] = promise = Promise.newExternallyResolvable()
    f promiseId
    promise

  @_resolvePromise: (promiseId, result) ->
    @_promises[promiseId]?.resolve result
    delete @_promises[promiseId]

  @_rejectPromise: (promiseId, error) ->
    @_promises[promiseId]?.reject error
    delete @_promises[promiseId]
