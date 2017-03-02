{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'

defineModule module, ->
  ErrorWithInfo = (@message = "see info", @info) ->
    @name = 'ErrorWithInfo'
    @stack = (new Error()).stack
    # TODO: should we strip @stack of new ErrorWithInfo - and optionally other things the creator requests? (Validator, for example)
    @toString = ->
      """
      ErrorWithInfo:
        message: #{formattedInspect @message}
        info:
          #{formattedInspect(@info).replace /\n/g, "\n    "}
      #{@stack}
      """
    @
  ErrorWithInfo.prototype = Object.create Error.prototype
  ErrorWithInfo.prototype.constructor = ErrorWithInfo
  ErrorWithInfo