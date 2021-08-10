{BaseObject, peek, log} = require "art-foundation"

module.exports = class HotLoader extends BaseObject
  @singletonClass()

  @runHot: (m, f) => @singleton.runHot m, f
  @getModuleState: => peek @singleton._modulePersistantState

  constructor: ->
    @_modulePersistantState = []

  runHot: (_module, f) ->
    if _module?.hot
      @_modulePersistantState.push (_module.hot.data ||= modulePersistantState: {}).modulePersistantState

      _module.hot.accept()
      _module.hot.dispose (data)->

        data.modulePersistantState = _module.hot.data.modulePersistantState

    res = f peek @_modulePersistantState

    @_modulePersistantState.pop() if _module?.hot

    res
