StandardLib = require 'art-standard-lib'
{log} = StandardLib

###
SRC:
  http://jsfiddle.net/uqcFM/49/
  http://stackoverflow.com/a/10372280/2121000
###
module.exports = class WebWorker
  # a simple demo WebWorker
  @echoWebWorker: "self.onmessage=function(e){postMessage('Worker: '+e.data);}"

  @isBrowser: !!(self.window && self.navigator && self.document)
  @isWebWorker: !@isBrowser && self.importScripts

  # start a worker by evaluating workerSource
  # Internal: Converts workSource into a DATAURI so we can start a Wroker
  @startWorkerFromJsString: startWorkerFromJsString = (workerSource) ->
    new Worker URL.createObjectURL new Blob [workerSource], type: 'application/javascript'

  @startWorkerFromFunction: (workerFunction) ->
    startWorkerFromJsString "(#{workerFunction})();"

