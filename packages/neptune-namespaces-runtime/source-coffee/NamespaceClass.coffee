###
TODO: Make NN ugifly-mangler friendly. In order to do that, we need
to stop using the function.name attribute.

OLD:
  I think we can do that with one change: addNamespace needs to
  change to take a name argument: @addNamespace: (name, namespace) ->

NEW:
  Ok, that's done. Now I need to revisit the mangler issue.
  Did this fix it?
###

{isClass, isFunction, isPlainArray, isExtendedClass} = require 'art-standard-lib/Types'

ArtStandardLibCore = null

module.exports = class Namespace
  @isNamespace: (klass) -> klass?.prototype instanceof Namespace
  # global map of all namespaces:
  #   namespacePath: namespace
  @allNamespaces: {}
  @getAllNamespacePaths: => Object.keys(@allNamespaces).sort()

  @toString: -> @namespacePath
  @inspect: -> @namespacePath

  #################################
  # Standard namespace Properties
  #################################
  # string representing the absolute path of this namespace
  # Should be able to "eval" this string and get back this namespace.
  @namespacePath: "Neptune.Namespace"

  # parent namespace (extends Namespace)
  @namespace: null

  # map: name: sub-namespace (each extends BNamespaceBaseClassase)
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
    ArtStandardLibCore ||= require 'art-standard-lib/Core'

  @getInspectedObjects: (includeModules = true)->
    "#{@namespacePath}": @getNeptuneLib().merge
      version: @version if @version

      for name, namespace of @namespaces
        namespace.getInspectedObjects includeModules

      modules: @getModuleNames().join ', ' if includeModules && @getModuleNames().length > 0

  @getVersions: ->
    out = {}
    out.NeptuneNamespacesRuntime = @version if @ == Neptune
    for key, subnamespace of @namespaces
      out[key] = recurse if 0 < Object.keys(recurse = subnamespace.getVersions()).length
      out[key] ||= subnamespace.version if subnamespace.version?
    out

  ################################################
  # BUILD UP NAMESPACES
  # Used in generated index and namespace files
  ################################################

  ###
  IN:
    "Foo" -> vivifies @Foo
    "Foo.Bar" ->  vivifies @Foo.Bar
    OR: ["Foo", "Bar", "Baz"] ->  vivifies @Foo.Bar.Baz
  ###
  @vivifySubnamespace: (name) ->
    if isPathedNamespace name
      name = name.split '.'

    if isPlainArray path = name
      namespace = @
      namespace = namespace.vivifySubnamespace name for name in path
      namespace
    else
      @namespaces[name] ||= @[name] = class PathedNamespace extends Namespace
      ._init name, @

  @isPathedNamespace: isPathedNamespace = (name) -> /\./.test name

  @addVersionedNamespace: (name, namespace) ->
    return unless namespace
    unless versions = (@versionedNamespaces ||= {})[name]
      versions = @versionedNamespaces[name] = {}
      # initialized versions for this namespace, add the existing one
      @addVersionedNamespace name, @namespaces[name]

    if version = namespace.version
      console.warn "NN: adding #{@namespacePath}.versionedNamespaces.#{name}['#{version}']" + if namespace == @namespaces[name]
        " (default)"
      else ""

      throw new Error "expecting namespace '#{name}' in '#{@namespacePath}'' to have a version" unless version?
      if versions[version]
        console.warn "NN: versionedNamespace #{name} already added for version #{version}. Not added again."
      else
        versions[version] = namespace

    namespace

  # OUT: namespace
  @addNamespace: (name, namespace) ->
    if isPathedNamespace name
      [path..., name] = name.split "."
      @vivifySubnamespace(path).addNamespace name, namespace

    else if existingNamespace = @namespaces[name]
      if namespace.prototype instanceof Neptune.PackageNamespace
        unless existingNamespace.prototype instanceof Neptune.PackageNamespace
          throw new Error "
            Attempting to replace a PathNamespace with a PackageNamespace.
            Define your PackageNamespace first. Namespace: #{@namespacePath}.#{name}'
            "

        @addVersionedNamespace name, namespace

    else
      @allNamespaces[namespace.namespacePath] =
      @namespaces[name] = @[name] = namespace._init name, @

    namespace

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
    for arg in args when arg?
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
    if isFunction(child) || isClass(child)
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
    @versionedNamespaces = null
    @namespace?._setChildNamespaceProps name, @
    @

  # @_addToNames will never add a property with the same name
  # as __super__ or any of the property names in the Namespace namespace.
  excludedPropNames = ["__super__", "_name", "version"].concat Object.keys Namespace

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
    # Art.Foundation defines a more general-purpose inspect; it should replace Neptune.Namespace.inspect
    value = addingFrom[propName]

    if propName == "inspect" && value?.length > 0
      return @[propName] = value

    return if propName in excludedPropNames
    return unless value?

    if @[propName]
      if @[propName] != value && global.Neptune.verbose
        addingFromString = addingFrom.namespacePath || addingFrom.propName || (Object.keys addingFrom).join(', ')
        console.log {@namespacePath, addingFromString, propName, oldValue: @[propName], newValue: value}
        console.error "NeptuneNamespaces: #{@namespacePath} already has key '#{propName}' with a different value. Replacing with value from: #{addingFromString}"
      @[propName]
    else
      @[propName] = value

    if propName == 'version'
      @namespace.versionedNamespaces?[@getName()][value] = @
