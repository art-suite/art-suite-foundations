{BaseObject, peek, log} = require "art-foundation"

###
SBD NOTE 2021/8/11:
  This is clearly a duplicate with the ArtClassSystem.WebpackHotLoader
  mixin, but they are different enough that I'm not sure which one is "best."

  The last-alter dates were also very close:
  ArtFoundaiton's:
    commit d8b89ce35c7e4317a56e759cfd2eef5bef7cad3b
    Author: Shane Brinkman-Davis Delamore <shanebdavis@gmail.com>
    Date:   Sat Jul 1 19:50:06 2017 -0700

  ArtClassSystem's:
    commit 878805ccd69991995e0da0115416cd9d8ea63039
    Author: Shane Brinkman-Davis Delamore <shanebdavis@gmail.com>
    Date:   Sat Jul 1 11:35:25 2017 -0700

###
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
