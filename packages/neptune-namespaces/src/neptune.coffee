# standardize across javascript environments:
# global == self == window
if typeof global == 'object'
  # running in node.js
  global.self = global
else
  self.global ||= self

class Base
  @namespacePath: "Neptune.Base"
  @namespace: null
  @allNamespaces: {}
  @namespaces: []
  @modules: []
  @moduleNames: []

  # OUT: namespace
  @addNamespace: (namespace) ->
    @_setChildNamespace namespace
    @[namespace.name] = namespace
    @allNamespaces[namespace.namespacePath] ||= []
    @namespaces = @allNamespaces[@namespacePath] ||= []
    @namespaces.push namespace
    namespace

  @_setChildNamespace: (child) ->
    if typeof child == "function" && child.name.match /^[A-Z]/
      child.namespace = @
      child.namespacePath = @namespacePath + "." + child.name

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
    @modules = [] unless @hasOwnProperty "modules"
    @moduleNames = [] unless @hasOwnProperty "moduleNames"

    for name, module of map
      @moduleNames.push name
      @modules.push module
      @_setChildNamespace module
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
  excludedKeys = ["__super__", "namespace", "namespacePath"].concat Object.keys Base

module.exports = self.Neptune = class Neptune extends Base
  @Base: Base
  @namespacePath: "Neptune"
  @namespace: null
  @isNamespace: (klass) -> klass?.prototype instanceof Base

console.log "neptune-namespaces global defined: self.Neptune"
