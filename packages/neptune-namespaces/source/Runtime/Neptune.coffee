###
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

I think we can do that with one change: addNamespace needs to
change to take a name argument: @addNamespace: (name, namespace) ->

###

require "./global"
require "./function"

{isFunction, isPlainArray, isExtendedClass} = require 'art-standard-lib/Types'

NeptuneLib = null

class Base
  # global map of all namespaces:
  #   namespacePath: namespace
  @allNamespaces: {}
  @getAllNamespacePaths: => Object.keys(@allNamespaces).sort()

  @toString: -> @namespacePath
  @inspect: -> @namespacePath

  #################################
  # Standard namespace Properties
  #################################
  # name of this namespace.
  # NOTE: use @getName() to read the name of any function, including namespaces
  @_name: "Base"

  # string representing the absolute path of this namespace
  # Should be able to "eval" this string and get back this namespace.
  @namespacePath: "Neptune.Base"

  # parent namespace (extends Base)
  @namespace: null

  # map: name: sub-namespace (each extends Base)
  @namespaces: {}

  # map: name: module
  @modules: {}

  #############################
  # Get info about namespace
  #############################
  @getNamespacePath:  -> @namespacePath
  @getNamespaceNames: -> Object.keys(@namespaces).sort()
  @getModuleNames:    -> Object.keys(@modules).sort()

  @getNeptuneLib: ->
    throw new Error "DEPRICATED: Neptune.getNeptuneLib - use require 'art-standard-lib/Core'"

  @getInspectedObjects: (includeModules = true)->
    "#{@namespacePath}": @getNeptuneLib().merge
      version: @version if @version

      for name, namespace of @namespaces
        namespace.getInspectedObjects includeModules

      modules: @getModuleNames().join ', ' if includeModules && @getModuleNames().length > 0

  @getVersions: ->
    out = {}
    out.version = @version if @ == Neptune
    for key, subNamespace of @namespaces
      out[key] = recurse if 0 < Object.keys(recurse = subNamespace.getVersions()).length
      (out[key] ||= {}).version = subNamespace.version if subNamespace.version?
    out

  ################################################
  # BUILD UP NAMESPACES
  # Used in generated index and namespace files
  ################################################

  # OUT: namespace
  @addNamespace: (name, namespace) ->
    @allNamespaces[namespace.namespacePath] =
    @namespaces[name] = @[name] = namespace._init name, @

  @addModules: (map) ->
    for name, module of map
      @_setChildNamespaceProps name, module
      if isExtendedClass(module) && name != modName = module.getName()
        console.warn "NN: module name (#{@namespacePath}.#{name}) does not match module.exports.getName(): #{modName}"
      @modules[name] = @[name] = module unless name.match /^-/

    @

  ###
  IN: any combination of objects or arrays
    object: all properties in the object are added to the namespace

    array: [fromObject, property names as one or more strings]
      for propName in every sub-string in args matching: /[0-9a-z_]+/ig
        @_addToNamespace propName, fromObject

      Each string is parsed to find everything that matches: /[0-9a-z_]+/ig
      All resulting property names are concated into a one list.
      Every property in fromObject that matches one of the property-names is added to the namespace.
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
          for propName in arg[i].match /[0-9a-z_]+/ig
            @_addToNamespace propName, fromObject
      else
        @_addToNamespace propName, arg for propName, v of arg
    @

  #####################
  # PRIVATE
  #####################

  ###
  Every child of a namespace gets these properties:

    namespace:      pointer to the parent namespace
    namespacePath:  string path from global to child

  NOTE: only modules which return a class or function
    get their namespace-props set.
  ###
  @_setChildNamespaceProps: (name, child) ->
    if isFunction child
      @_setChildNamespaceProps name, child.class if isFunction child.class
      child.namespace = @
      child.namespacePath = @namespacePath + "." + name

  ###
  CoffeeScript classes copy all class props when inheriting,
  but some props need to be unique to each instance. This
  function initializes those props.
  ###
  @_init: (name, @namespace) ->
    @_name = name
    @modules = {}
    @namespaces = {}
    @namespace._setChildNamespaceProps name, @
    @

  # @_addToNames will never add a property with the same name
  # as __super__ or any of the property names in the Base namespace.
  excludedPropNames = ["__super__"].concat Object.keys Base

  ###
  Helper for includeInNamespace.
  Add anything to the namespace.

  IN:
    propName:   property name to  value will be assigned to in the namespace (string)
    addingFrom: object
      used for reporting errors if attempting to overwrite an
      existing item.

  EFFECT:
    Only adds value if @[propName] is not already set.
    Otherwise, reports error and continues.

  OUT: value
  ###
  @_addToNamespace: (propName, addingFrom) ->
    # Art.Foundation defines a more general-purpose inspect; it should replace Neptune.Base.inspect
    if propName == "inspect" && (value = addingFrom[propName]).length > 0
      return @[propName] = value

    return if propName in excludedPropNames
    return unless value = addingFrom[propName]

    if @[propName]
      if @[propName] != value
        addingFromString = addingFrom.namespacePath || addingFrom.propName || (Object.keys addingFrom).join(', ')
        console.error "#{@namespacePath} already has key: #{propName}. Adding from: #{addingFromString}"
      @[propName]
    else
      @[propName] = value

module.exports = global.Neptune ||= class Neptune extends Base
  @Base: Base
  @namespacePath: "Neptune"
  @namespace: null
  @isNamespace: (klass) -> klass?.prototype instanceof Base
  @isNode: require 'detect-node'
  @version: (require "../../package.json").version

Base.namespace = Neptune
