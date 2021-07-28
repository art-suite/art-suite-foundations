{defineModule, isFunction, inspect, Promise, requestAnimationFrame, evalAndThrowErrorsOutOfStack} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

# The basic Epoch assumes each item is a function. The function is invoked when the epoch cycles.
# You can inherit and overrid processEpochItems if you want to queue and process different items.
# The first item queued queues the next epoch. Subsequent items are added to a list to be processed in the pending epoch.
# All items queued are processed when the next epoch is processed, on the next animation frame.
defineModule module, class EpochClass extends BaseClass
  constructor: (options={})->
    super
    @_emptyQueueAfterProcessing = !!options.emptyQueueAfterProcessing
    @_queuedItems = []
    @_nextReadyQueue = []
    @_epochQueued = false
    @_processingEpoch = false
    @_epochCount = 0
    @_frameSecond = 0

  @getter "processingEpoch epochQueued epochCount emptyQueueAfterProcessing frameSecond",
    epochLength: ->
      @_queuedItems.length
      # NOTE: I removed adding in the _nextReadyQueue because it breaks the new onNextReady forceNextEpoch == false option
      #+ @_nextReadyQueue.length

  updateGlobalCounts: ->
    # Foundation.globalCount "#{@class.name}_queuedItems", @_queuedItems.length
    # Foundation.globalCount "#{@class.name}_nextReadyQueue", @_nextReadyQueue.length

  ###
  This guarantess there will be a next "ready" event.
  If there were no setStates this epoch, then there won't be a next "ready" - unless you use this method.

  IN:
    f: an optional function to invoke on-next-ready
      mostly this is provided as a shortcut:
        @onNextReady =>
      is directly equivelent to:
        @onNextReady().then =>

  OUT: promise.then (result of calling f() or null if no f) ->
  ###
  onNextReady: (f, forceNextEpoch = true, passThroughArgument) ->
    @queueNextEpoch() if forceNextEpoch && !@_processingEpoch

    new Promise (resolve, reject) => @_nextReadyQueue.push ->
      Promise.then ->
        if f then   f passThroughArgument
        else        passThroughArgument
      .then   resolve
      .catch  reject

  _ready: ->
    return unless (nrq = @_nextReadyQueue).length > 0
    @_nextReadyQueue = []
    for f in nrq
      evalAndThrowErrorsOutOfStack => f()

  # item can be anything
  # null items are ignored and not queued (a NOOP)
  queueItem: (item) ->
    if item
      @_queuedItems.push item
      @queueNextEpoch()
    item

  isItemQueued: (item) -> item in @_queuedItems

  queueNextEpoch: ->
    unless @_epochQueued
      @_epochQueued = true
      requestAnimationFrame (frameTimeMs) =>
        @_frameSecond = frameTimeMs / 1000
        @_epochQueued = false
        @processEpoch()

  flushEpochNow: -> @processEpoch()

  processEpoch: ->
    @_processingEpoch = true
    items = @_queuedItems

    if @_emptyQueueAfterProcessing
      @processEpochItemsWithErrorHandling items
      @_queuedItems = []
    else
      @_queuedItems = []
      @processEpochItemsWithErrorHandling items

    @_processingEpoch = false
    @_epochCount++
    @_ready()

  processEpochItemsWithErrorHandling: (items)->
    evalAndThrowErrorsOutOfStack =>
      @processEpochItems items

  #################################
  # OVERRIDES (required)
  # If you are implementing an Epoch class, you must implement the following method(s)
  #################################

  # each time the epoch is processed, this is called with all the queued items
  processEpochItems: (items)->
    for item in items
      if isFunction item
        item()
      else
        item.processEpoch()
