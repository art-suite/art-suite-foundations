StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'
{BaseObject} = ClassSystem

{log, inspect, nextTick, timeout} = StandardLib

module.exports = class BatchLoader extends BaseObject

  # For making a custom asset loader:
  #   loadFunction signature: (src, addAsset) ->
  #     call addAsset when the asset has been loaded
  #   addAsset has the same signature as the addAsset member function
  constructor: (loadFunction)->
    @assets = {}
    @loadingAssets = {}
    @loadFunction = loadFunction

  # sources can be a single string or array of strings
  # onLoad(assets, sources, info) is called when all of your sources are loaded
  #   assets: an object mapping your sources to their loaded values
  #   sources: the sources you passed in (unless it was just a string, then this is the 1-length array of that string)
  #   info: an object with counts of how the assets were loaded
  load: (sources, onLoad) ->
    sources = [sources] if typeof sources == "string"
    @loadAssets sources, onLoad

  # add one asset & notify any listeners if all their assets are now loaded
  #   source: name of asset to add
  #   asset: the asset to add
  #   NOTE This must be true: asset != null, asset != undefined
  addAsset: (source, asset)->
    throw new Error "not a valid asset: #{inspect asset}" unless asset?
    delete @loadingAssets[source]
    @assets[source] ||= asset
    @notifyListeners()

  #############################
  # PRIVATE
  #############################

  @getter
    blankInfo: ->
      loadedFromCache: 0
      loadedAsynchronously: 0
      alreadyLoadingAsynchronously: 0

  # onLoad is called once all sources are loaded
  # signature: onLoad srcToAssetMap, sources, info
  loadAssets: (sources, onLoad) ->
    info = @blankInfo

    sources.forEach (src) =>
      if @assets[src]?
        info.loadedFromCache++

      else if @loadingAssets[src]
        info.loadedAsynchronously++
        info.alreadyLoadingAsynchronously++

      else
        info.loadedAsynchronously++
        @loadingAssets[src] = true
        @loadFunction src, (src, asset) =>
          @addAsset src, asset

    @addLoaderListener sources, onLoad, info
    nextTick => @notifyListeners() # even if everything is loaded, don't fire callbacks synchronously

  addLoaderListener: (sources, onLoad, info) ->
    @loadingListeners ||= []
    @loadingListeners.push sources:sources, onLoad:onLoad, info:info

  notifyListeners: ->
    return unless @loadingListeners
    oldloadingListeners = @loadingListeners
    @loadingListeners = []
    for listener in oldloadingListeners
      allLoaded = true
      for source in listener.sources
        allLoaded = false unless @assets[source]
      if allLoaded
        listener.onLoad @assets, listener.sources, listener.info
      else
        @loadingListeners.push listener
    @loadingListeners
