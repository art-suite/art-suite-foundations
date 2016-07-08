###
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

I think we can do that with one change: addNamespace needs to
change to take a name argument: @addNamespace: (name, namespace) ->

###

# standardize across javascript environments:
# global == self == window (if in browser)
if typeof global == 'object'
  # running in node.js
  isNode = true
  global.self = global
else
  isNode = false
  self.global ||= self

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
  # @modules: []
  # @moduleNames: []

  @getName: ->
    @_name || @name

  @getInspectedObjects: ->
    out = {}
    for namespace in @namespaces
      out[namespace.getName()] = namespace.getInspectedObjects()
    for mod in @moduleNames
      out[mod] = true
    out

  # OUT: namespace
  @addNamespace: (name, namespace) ->
    unless namespace
      # legacy support
      namespace = name
      name = namespace.name
    @_setChildNamespace name, namespace
    @[name] = namespace
    @allNamespaces[namespace.namespacePath] ||= []
    @namespaces = @allNamespaces[@namespacePath] ||= []
    @namespaces.push namespace
    namespace

  @_setChildNamespace: (name, child) ->
    if typeof child == "function" && name.match /^[A-Z]/
      child._name = name
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
    @modules = [] unless @hasOwnProperty "modules"
    if @hasOwnProperty "moduleNames"
      console.log("NeptuneNamespaces: alread have moduleNames for #{@getName()}")
    else
      console.log("NeptuneNamespaces: create moduleNames for #{@getName()}")
      @moduleNames = []

    for name, module of map
      @moduleNames.push name
      @modules.push module
      @_setChildNamespace name, module
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
  @isNode: isNode
  @package: _package = require "../package.json"
  @version: _package.version

console.log "neptune-namespaces global defined: self.Neptune"
