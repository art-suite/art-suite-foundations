module.exports = [
  [(require './ProgressAdapter'), "executePromiseSequence"]
  require './WebWorker'
  require './GlobalCounts'
  require 'art-object-tree-factory'
  CommunicationStatus:  require "art-communication-status"
  RestClient:           require "art-rest-client"
  Validator:            require('art-validation').Validator
]
