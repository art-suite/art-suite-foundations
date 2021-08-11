
{Foundation} = Neptune.Art
{WorkerRpc, BaseObject, timeout} = Foundation

if self.document
  class ThreadMock extends BaseObject

    postMessage: (m) ->
      timeout 0, => @otherThread?.onmessage? data:m

    @createPair: ->
      pair =
        browser: new ThreadMock
        worker: new ThreadMock
      pair.browser.otherThread = pair.worker
      pair.worker.otherThread = pair.browser
      pair

  suite "Art.Foundation.Tools.WorkerRpc", ->

    suite "using mocks in main thread", ->
      test "one-way messaging with data", ->
        new Promise (resolve) ->
          {browser, worker} = ThreadMock.createPair()
          sThread = new WorkerRpc browser, register: MyClass: myFunction: (value)->
            assert.eq value, 123
            resolve()
          wThread = new WorkerRpc worker, bind:  MyClass: ["myFunction"]
          wThread.MyClass.myFunction 123

      test "messaging with promises", ->
        {browser, worker} = ThreadMock.createPair()
        sThread = new WorkerRpc browser, register: MyClass: myFunction: (value)-> value
        wThread = new WorkerRpc worker, bindWithPromises:  MyClass: ["myFunction"]
        wThread.MyClass.myFunction 123
        .then (result) ->
          assert.eq result, 123

      test "two-way messaging with data", ->
        new Promise (resolve) ->
          {browser, worker} = ThreadMock.createPair()
          sThread = new WorkerRpc browser,
            register: MyServerClass: myServerFunction: (value) ->
              assert.eq value, 123
              WorkerRpc.lastMessageReceivedFrom.MyWorkerClass.myWorkerFunction value
            bind:  MyWorkerClass: ["myWorkerFunction"]
          wThread = new WorkerRpc worker,
            bind:  MyServerClass: ["myServerFunction"]
            register: MyWorkerClass: myWorkerFunction: (value) ->
              assert.eq value, 123
              resolve()
          wThread.MyServerClass.myServerFunction 123

    suite "using real worker thread", ->
      workerRpc = null
      suiteSetup (done) ->
        workerRpc = new WorkerRpc "/worker_for_worker_rpc_tests.js",
          bindWithPromises: HelloTest: ["hello"]
          bind: InvokeBackTestWorkerHalf: ["invokeBack"]
          register: Setup: ready: -> done()

      test "hello", ->
        workerRpc.HelloTest.hello "Shane"
        .then (result) ->
          assert.eq result, "Hello, Shane."

      test "invokeBack", (done) ->
        workerRpc.register InvokeBackTestBrowserHalf: result: (result) -> done()
        workerRpc.InvokeBackTestWorkerHalf.invokeBack "foo"



