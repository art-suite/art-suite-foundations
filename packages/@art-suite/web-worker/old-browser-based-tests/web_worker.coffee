
{Foundation} = Neptune.Art
{
  log
  startWorkerFromJsString, echoWebWorker, startWorkerFromFunction
} = Foundation

if self.document
  suite "Art.Foundation.Tools.Browser.WebWorker", ->

    test "startWorkerFromJsString WebWorker.echoWebWorker", (done)->
      worker = startWorkerFromJsString echoWebWorker
      worker.onmessage = -> done()
      worker.postMessage 'Test'

    test 'startWorkerFromFunction', (done) ->
      worker = startWorkerFromFunction -> @onmessage = (e) -> postMessage e.data
      worker.onmessage = ({data}) ->
        assert.eq messageData, data
        done()
      worker.postMessage messageData = 'Test'
