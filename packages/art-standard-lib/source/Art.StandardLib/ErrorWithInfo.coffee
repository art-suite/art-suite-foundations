{defineModule} = require './CommonJs'
{formattedInspect} = require './Inspect'
{mergeInto, isFunction} = require './Core'

# defineModule module, ->
#   ErrorWithInfo = (@message = "see info", @info) ->
#     @name = 'ErrorWithInfo'
#     @stack = (new Error()).stack
#     # TODO: should we strip @stack of new ErrorWithInfo - and optionally other things the creator requests? (Validator, for example)
#     @toString = ->
#       """
#       ErrorWithInfo:
#         message: #{formattedInspect @message}
#         info:
#           #{formattedInspect(@info).replace /\n/g, "\n    "}
#       #{@stack}
#       """
#     @
#   ErrorWithInfo.prototype = Object.create Error.prototype
#   ErrorWithInfo.prototype.constructor = ErrorWithInfo
#   ErrorWithInfo

defineModule module, class ErrorWithInfo extends Error
  constructor: (message, @info, @name) ->
    super
    @name ||= "ErrorWithInfo"
    mergeInto @, @info

    @message = message

    if isFunction Error.captureStackTrace
      # Node only
      Error.captureStackTrace @, @constructor
    else
      @stack = (new Error).stack;

  toString: ->
    ["ErrorWithInfo: #{@message}", formattedInspect info: @info].join "\n\n"