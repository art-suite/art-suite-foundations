module.exports = class WebpackHotLoader

  ###
  IN:
    _module should be the CommonJS 'module'
    modulePostLoadAction: (moduleState) -> ignored internally, returned from @runHot

  OUT: modulePostLoadAction moduleState

  EFFECT:
    modulePostLoadAction is run every time the module is loaded.

    Initially, moduleState is {}.

    moduleState is the same object every load:
      modulePostLoadAction can modify moduleState and it will persist through every reload.

    modulePostLoadAction is responsible for any and all
    update actions required due to the module load.

  NOTE:
    If _module is not hot, modulePostLoadAction will be invoked once with an empty {}.
  ###
  @runHot: (_module, modulePostLoadAction) ->
    return modulePostLoadAction {} unless _module?.hot

    {moduleState} = _module.hot.data ||= moduleState: {}

    _module.hot.accept()
    _module.hot.dispose (data)-> data.moduleState = moduleState

    modulePostLoadAction moduleState

