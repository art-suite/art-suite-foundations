{defineModule} = require './CommonJs'
ParseUrl = require './ParseUrl'
isNode = require 'detect-node'

defineModule module, class Environment
  @getEnv: ->
    global.environment ?=
      (
        if global.location?.search
          ParseUrl.parseQuery()
        else
          global.process?.env
      ) || {}

  # true/false values
  @isBrowser:   !!(global.window && global.navigator && global.document)
  @isWebWorker: !!(!@isBrowser && global.importScripts)
  @isNode:      !!isNode