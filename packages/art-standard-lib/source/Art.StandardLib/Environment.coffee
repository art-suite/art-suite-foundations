{defineModule} = require './CommonJs'
ParseUrl = require './ParseUrl'
{isString} = require './Core'
isNode = require 'detect-node'

defineModule module, class Environment
  @getEnv: ->
    global.environment ?=
      (
        if global.location?
          out = ParseUrl.parseQuery()
          for k, v of global.location when k != "search" && isString(v) && v.length > 0
            out[k] = v
          out
        else
          global.process?.env
      ) || {}

  # true/false values
  @isBrowser:   !!(global.window && global.navigator && global.document)
  @isWebWorker: !!(!@isBrowser && global.importScripts)
  @isNode:      !!isNode