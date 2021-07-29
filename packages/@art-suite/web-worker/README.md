# WebWorker

- `isBrowser` true/false
- `isWebWorker` true/false
- `startWorkerFromJsString(workerSourceJs)`
- `startWorkerFromFunction(workerFunction)`
- `echoWebWorker` sample workerSourceJs

# WorkerRpc
WorkerRPC has two modes: singleton and instanced.

# Singleton
  Including WorkerRPC automatically creates the singleton instance.
  In a worker, the singleton automatically binds to the worker's self.onmessage and starts listening.
  In workers or the browser, any handler registered with the singleton will be available to respond
  to any message received by the singleton OR ANY OTHER INSTANCE of WorkerRPC in that thread.
  You can think of the singleton as the global registry for handlers.

- In practice:
  - In browser:

        # to register all your handlers, call this one or more times:
        WorkerRpc.register ...

        # Call for each each worker you want to listen for RPC calls from,
        # and bind any remote procedures you want to be able to invoke on
        # that specific worker-thread.
        aBoundWorker = new WorkerRpc worker,
          bind: ...
          bindWithPromises: ...

        # to make remote-procedure-calls to the worker:
        # NOTE: if registered with bindWithPromises, will return a promise for the RPC's result.
        aBoundWorker.MyWorkerNamespace.myWorkerFunction ...

  - In worker:

        # to register all your handlers, call this one or more times:
        WorkerRpc.register ...

        # bind any remote procedures you want to be able to invoke on the browser-thread
        WorkerRpc.bind ...
        WorkerRpc.bindWithPromises ...

NOTES:
  registered functions are invoked with @/this set to the namespace. That way you can invoke
  callback functions you previously bound back to the specific worker that invoked the
  function with: @MyWorkerNamespace.myWorkerFunction()

### Real world example

  Suppose you want to access the localStorage object on the browser thread from your worker.
  The 6 lines of code below create the 'self.asyncLocalStorage' object which works just like
  'localStorage' except it returns Art.Foundation.Promises for the function results.

  browser: (before starting the worker)

    {WorkerRpc} = Art.Foundation
    WorkerRpc.register localStorage: localStorage
    new WorkerRpc workerSourcePath

  worker:

    {workerRpc} = Art.Foundation.WorkerRpc
    workerRpc.bindWithPromises localStorage: ["getItem", "setItem", "removeItem", "clear"]
    self.asyncLocalStorage = workerRpc.localStorage

  > SBD: Isn't that nice! So streamlined!

### General Examples

Usage with no return value expected:

- browser thread:

      new WorkerRpc (new Worker workerUrl),
        register:
          MyMainNamespace:
            doWork: (a) -> ...

- worker thread:

      {MyMainNamespace} = new WorkerRpc self,
        bind:
          MyMainNamespace: ["doWork"]

      MyMainNamespace.doWork myStructuredData

Usage with promises:

- browser thread:

      new WorkerRpc (new Worker workerUrl),
        register:
          MyMainNamespace:
            concatStrings: (a, b) ->
              a + b
              # equivelent to: Promise.resolve a + b
              # if the result is not a Promse, Promise.resolve(result) is automatically applied

- worker thread:

      {MyMainNamespace} = new WorkerRpc self,
        bindWithPromises:
          MyMainNamespace: ["concatStrings"]

      MyMainNamespace.concatStrings "hi ", "Shane"
      .then (result) ->
        # result == "hi Shane"

Usage with arbitrary response messages:

  Sometimes you want a handle to the workerRpc instance for the thread that just send
  you the message inside your registered response functions. You can access that
  via the global: WorkerRpc.lastMessageReceivedFrom.

- browser thread:

      new WorkerRpc (new Worker workerUrl),
        register:
          MyMainNamespace:
            doWorkAndRespond: (key) ->
              count == 0
              invokeThreeTimes =>
                count++
                WorkerRpc.lastMessageReceivedFrom.MyWorkerNamespace.respond key, count

- worker thread:

      {MyMainNamespace} = new WorkerRpc self,
        register:
          MyWorkerNamespace:
            respond: (key, count) -> console.log "MyWorkerNamespace#respond: #{key} #{count}"
        bind:
          MyMainNamespace: ["doWorkAndRespond"]

      MyMainNamespace.doWorkAndRespond "myKey"

Usage - add to global registery:

    WorkerRpc.register
      MyGlobalClass:
        doSomethingNoMatterWhoCalls: ->
          ...
