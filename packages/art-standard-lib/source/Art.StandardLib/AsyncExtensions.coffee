Promise = require './Promise'
{toSeconds} = require './DateExtensions'

module.exports = class AsyncExtensions

  # IN: delay in ms
  # IN: f (optional) - function to invoke after delay
  # OUT: promise.then -> # delay has elapsed
  @timeout: timeout = (ms, f) =>
    p = new Promise (resolve) -> setTimeout resolve, ms
    if f? then p.then f else p

  # timeout at a specific second - using the Date.now() time
  @timeoutAt: (second, f) => timeout (second - toSeconds()) * 1000, f

  # promise resolves once after first interval (and first invocation of f, if provided)
  # f will be called after ms and ever ms thereafter
  @interval: interval = (ms, f = ->) =>
    intervalId = null
    p = new Promise (resolve) ->
      intervalId = setInterval(
        ->
          Promise.then f
          .then -> resolve()
        ms
      )
    p.stop = -> clearInterval intervalId if intervalId?
    p

  @requestAnimationFrame:
    self.requestAnimationFrame       ||
    self.webkitRequestAnimationFrame ||
    self.mozRequestAnimationFrame    ||
    self.oRequestAnimationFrame      ||
    self.msRequestAnimationFrame     ||
    (f) -> setTimeout f, 1000 / 60

  #-------------------------------------
  # nextTick
  #-------------------------------------
  # For browsers without native Promise support, nextTick
  # effectively uses setTimeout(0), which isn't very fast.
  # See promise.coffee for info about how we can speed
  # things up by including a setImmediate polyfill.
  @nextTick: (f) => Promise.resolve().then -> f?()

  #-------------------------------------
  # throwErrorOutOfStack
  #-------------------------------------
  @throwErrorOutOfStack: (e) =>
    console.log e
    timeout 0, -> throw e
  @evalAndThrowErrorsOutOfStack: (f) =>
    try
      f()
    catch e
      Neptune.Art.StandardLib.log.error "evalAndThrowErrorsOutOfStack", e
      @throwErrorOutOfStack e
