{
  defineModule
  isFunction
  fastBind
  log
} = require 'art-standard-lib'

defineModule module, ->
  (superClass) -> class InstanceFunctionBindingMixin extends superClass

    @getFunctionsToBindList: (hotReload) ->
      if !hotReload && @hasOwnProperty "_functionsToBindList"
        @_functionsToBindList
      else
        @_functionsToBindList = @_getFunctionsToBindList().sort()

    getBoundFunctionList: -> @_boundFunctionList

    bindFunctionsToInstance: (hotReload) ->
      functionsToBindList = @class.getFunctionsToBindList hotReload

      if @_boundFunctionList
        for k in @_boundFunctionList when k not in functionsToBindList
          delete @[k]

      {prototype} = @class

      for k in functionsToBindList
        @[k] = if prototypeMethod = prototype[k]
          fastBind prototypeMethod, @

      @_boundFunctionList = functionsToBindList
      @

    ##########################
    # PRIVATE
    ##########################
    @_getFunctionsToBindList: ->
      k for k, v of @prototype when k != "constructor" &&
        isFunction(v) &&
        @propertyIsConcrete(k) &&
        (!@nonBindingFunctions || k not in @nonBindingFunctions)
