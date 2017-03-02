{log} = require 'art-standard-lib'
path = require 'path'
fs = require('fs')

NeptuneNamespacesGenerator = require 'neptune-namespaces/generator'

module.exports = (dirname, watch = true) ->
  existingRoots = for root in NeptuneNamespacesGenerator.standardRoots when fs.existsSync "#{dirname}/#{root}"
    root

  for root in existingRoots
    log "neptune-namespaces scanning: ".grey + "#{path.basename dirname}/#{root}/*".green

  workers = for root in existingRoots
    NeptuneNamespacesGenerator.generate "#{dirname}/#{root}/*", watch: watch

  Promise.all(workers).then ->
    log "neptune-namespaces: ".grey + "done with #{if watch then "initial " else ""}namespace generation".green
