###
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

I think we can do that with one change: addNamespace needs to
change to take a name argument: @addNamespace: (name, namespace) ->

###

require "./global"

unless (->).name?
  Object.defineProperty Function.prototype, 'name',
    get: ->
      name = if matches = @toString().match /^\s*function\s*([^\s(]+)/
        matches[1]
      else
        ""
      Object.defineProperty @, 'name', value: name

      name

class Base
  @namespacePath: "Neptune.Base"
  @namespace: null
  @allNamespaces: {}
  @namespaces: []
  @modules: []
  @moduleNames: []
  @_name: "Base"

  @initAsSubNamespace: (name, @namespace) ->
    @_name = name
    @modules = []
    @moduleNames = []
    @namespaces = []
    @namespace[name] = @
    @namespace.namespaces.push @
    @

  @getNamespacePath: -> @namespacePath

  @getName: ->
    @_name || @name

  @getInspectedObjects: (includeModules = true)->
    out = {}
    out.version = @version if @version
    for namespace in @namespaces
      out[namespace.getName()] = namespace.getInspectedObjects includeModules
    # for mod in @moduleNames
    #   out[mod] = true
    out.modules = @moduleNames.join ' ' if includeModules && @moduleNames.length > 0
    out

  # OUT: namespace
  @addNamespace: (name, namespace) ->
    unless namespace
      # legacy support
      namespace = name
      name = namespace.name
    @_setChildNamespaceProps name, namespace
    @allNamespaces[@namespacePath] = namespace.initAsSubNamespace name, @
    namespace

  isFunction = (f) -> typeof f == "function"

  @_setChildNamespaceProps: (name, child) ->
    if isFunction child
      @_setChildNamespaceProps name, child.class if isFunction child.class
      child.namespace = @
      child.namespacePath = @namespacePath + "." + name

  # OUT: v
  @addToNamespace: (k, v, addingFrom) ->
    if @[k]
      if @[k] != v
        addingFromString = addingFrom.namespacePath || addingFrom.name || (Object.keys addingFrom).join(', ')
        console.error "#{@namespacePath} already has key: #{k}. Adding from: #{addingFromString}"
      @[k]
    else
      @[k] = v

  @addModules: (map) ->

    for name, module of map
      @moduleNames.push name
      @modules.push module
      @_setChildNamespaceProps name, module
      @[name] = module unless name.match /^-/
    @

  isPlainArray = (o) -> o.constructor == Array
  ###
  IN: any combination of objects an arrays
    array: [fromObject, list of strings]
      each string is parsed to find everything that matches /[0-9a-z_]+/ig
      From there, we have a list of property-names.
      Every property in fromObject that matches one of those property-names is added to
      the namespace.
    object: all properties in the object are added to the namespace
  ###
  @includeInNamespace: ->
    args = if arguments.length == 1 && isPlainArray arguments[0]
      arguments[0]
    else
      arguments
    for arg in args when arg
      if isPlainArray arg
        [fromObject] = arg
        for i in [1...arg.length]
          for key in arg[i].match /[0-9a-z_]+/ig
            @addToNamespace key, fromObject[key], fromObject
      else
        @addToNamespace k, v, arg for k, v of arg when k not in excludedKeys
    @
  excludedKeys = ["__super__"].concat Object.keys Base

module.exports = self.Neptune = class Neptune extends Base
  @Base: Base
  @namespacePath: "Neptune"
  @namespace: null
  @isNamespace: (klass) -> klass?.prototype instanceof Base
  @isNode: require 'detect-node'
  @package: _package = require "../../package.json"
  @version: _package.version

Base.namespace = Neptune
