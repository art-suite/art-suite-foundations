# {} = require 'art-standard-lib'
Promise = require './Promise'
{log} = require './Log'

###
  usage:

  pwp = new PromiseWorkerPool
    numWorkers: 10

  # queue all your jobs
  pwp.queue (jobIndex, totalJobCount) -> work, optionally returning promise
    # jobIndex is the order the worker was queued in

  # start the queue
  pwp.then (results) ->
    # results is the results from all your workerPromises in the same order they were queued
###

module.exports = class PromiseWorkerPool

  constructor: (@numWorkers = 10) -> @_queue = []

  queue: (job) ->
    throw new Error "already started" if @_startPromise
    @_queue.push job
    @

  # OUT: promise that resolves after all queued and all queuedAfterDone work is completed successfully.
  start: ->
    @_startPromise ||= Promise.then =>
      jobIndex = 0
      doNextAction = =>
        if @_queue.length > currentJobIndex = jobIndex
          jobIndex++
          if job = @_queue[currentJobIndex]
            @_queue[currentJobIndex] = null # free job memory
            Promise.then   => job currentJobIndex, numJobs
            .then (result) => results[currentJobIndex] = result
            .then doNextAction
          else Promise.then doNextAction
        else Promise.resolve "queue done"

      results = new Array numJobs = @_queue.length
      workerPromises = []
      {numWorkers} = @
      while workerPromises.length < numWorkers
        workerPromises.push doNextAction()

      Promise.all workerPromises
      .then -> results

  then:  (a, b) -> @start().then a, b
  catch: (a)    -> @start().catch a