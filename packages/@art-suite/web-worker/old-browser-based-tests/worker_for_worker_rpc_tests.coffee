isBrowser = !!(typeof window != 'undefined' && typeof navigator != 'undefined' && window.document)
isWebWorker = !isBrowser && typeof importScripts != 'undefined'
console.log "worker_for_worker_rpc_tests starting - isWebWorker:", isWebWorker
if isWebWorker

  Foundation = require 'art-foundation'
  {log, WorkerRpc} = Foundation
  self.log = log
  log "worker: worker_for_worker_rpc_tests started"
  self.WorkerRpc = WorkerRpc

  {workerRpc} = WorkerRpc

  WorkerRpc.register
    HelloTest: hello: (name) -> "Hello, #{name}."
    InvokeBackTestWorkerHalf: invokeBack: (value) ->
      WorkerRpc.lastMessageReceivedFrom.InvokeBackTestBrowserHalf.result value

  workerRpc.bind
    InvokeBackTestBrowserHalf: ["result"]
    Setup: ["ready"]

  workerRpc.Setup.ready()

console.log isWebWorker:isWebWorker, isBrowser:isBrowser, typeofImportScripts:typeof importScripts
