{defineModule} = require './CommonJs'
ParseUrl = require './ParseUrl'
isNode = require 'detect-node'

defineModule module, class Environment
  @getEnv: ->
    ret = if global.location?.search
      ParseUrl.parseQuery()
    else
      global.process?.env

    ret || {}

  # true/false values
  @isBrowser:   !!(global.window && global.navigator && global.document)
  @isWebWorker: !!(!@isBrowser && global.importScripts)
  @isNode:      !!isNode