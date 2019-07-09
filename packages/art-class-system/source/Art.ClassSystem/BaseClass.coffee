"use strict";
StandardLib = require 'art-standard-lib'
WebpackHotLoader = require './WebpackHotLoader'

{
  capitalize, decapitalize, log
  isFunction, objectName,
  isPlainObject, functionName, isString
  isPlainArray
  Unique
  callStack
  Log
  log
  inspectedObjectLiteral
  MinimalBaseObject
  getModuleBeingDefined
  concatInto
  mergeInto
  merge
  neq
  isString
  object
  getSuperclass
} = StandardLib

{nextUniqueObjectId} = Unique

ExtendablePropertyMixin = require './ExtendablePropertyMixin'

module.exports = class BaseClass extends ExtendablePropertyMixin MinimalBaseObject
  @resetStats: =>
    @objectsCreated = 0
    @objectsCreatedByType = {}

  @resetStats()

  # override to dynamically set a class's name (useful for programmatically generated classes)
  # NOTE: must use klass.getName() and not klass.name if you want to "see" dynamically assigned class-names
  @_name: null

  ###
  NOTE: only hasOwnProperties are considered! Inherited properties are not touched.
  IN:
    targetObject:   object will be altered to be an "imprint" of fromObject
    fromObject: object pattern used to imprint targetObject
    preserveState:
      false:
        targetObject has every property updated to exactly match fromObject

        This includes:
          1. delete properties in targetObject that are not in fromObject
          2. add every property in fromObject but not in targetObject
          3. overwriting every property in targetObject also in fromObject

      true:
        Attempts to preserve the state of targetObject while updating its functionality.
        This means properties which are functions in either object are updated.

        WARNING: This is a grey area for JavaScript. It is not entirely clear what is
          state and what is 'functionality'. I, SBD, have made the following heuristic decisions:

        Imprint actions taken when preserving State:

        1. DO NOTHING to properties in targetObject that are not in fromObject
        2. add every property in fromObject but not in targetObject
        3. properties in targetObject that are also in fromObject are updated
          if one of the following are true:
          - isFunction fromObject[propName]
          - isFunction targetObject[propName]
          - propName does NOT start with "_"
          NOTE: property existance is detected using Object.getOwnPropertyDescriptor

  ###
  thoroughDeleteProperty = (object, propName) ->
    Object.defineProperty object, propName,
        configurable: true
        writable: false
        value: 1

    delete object[propName]

  nonImprintableProps = ["__proto__", "prototype"]

  @imprintObject: imprintObject = (targetObject, sourceObject, preserveState = false, returnActionsTaken) ->
    targetPropertyNames = Object.getOwnPropertyNames targetObject
    sourcePropertyNames = Object.getOwnPropertyNames sourceObject

    if returnActionsTaken
      addedProps =
      removedProps =
      changedProps = undefined

    unless preserveState
      for targetPropName in targetPropertyNames when !(targetPropName in sourcePropertyNames)
        (removedProps?=[]).push targetPropName if returnActionsTaken
        thoroughDeleteProperty targetObject, targetPropName

    for sourcePropName in sourcePropertyNames when !(sourcePropName in nonImprintableProps)
      targetPropDescriptor = Object.getOwnPropertyDescriptor targetObject, sourcePropName
      sourcePropDescriptor = Object.getOwnPropertyDescriptor sourceObject, sourcePropName

      sourceValueIsFunction = isFunction sourceValue = sourcePropDescriptor.value
      targetValueIsFunction = isFunction targetValue = targetPropDescriptor?.value
      if (
          !preserveState || !targetPropDescriptor ||
          sourceValueIsFunction || targetValueIsFunction ||
          !sourcePropName.match /^_/
        )
        if returnActionsTaken
          if !targetPropDescriptor
            (addedProps?=[]).push sourcePropName if sourcePropName != "_name"
          else
            if neqResult = neq sourceValue, targetValue, true
              (changedProps?=[]).push sourcePropName

        Object.defineProperty targetObject, sourcePropName, sourcePropDescriptor

    if returnActionsTaken
      (removedProps || changedProps || addedProps) &&
      merge {removedProps, changedProps, addedProps}

    else
      sourceObject

  ###
  imprints both the class and its prototype.

  preserved in spite of imprintObject's rules:
    @namespace
    @::constructor
  ###
  @imprintFromClass: (updatedKlass, returnActionsTaken) ->
    unless updatedKlass == @
      {namespace, namespacePath, _name} = @
      oldConstructor = @::constructor

      classUpdates     = imprintObject @,    updatedKlass,   true,  returnActionsTaken
      prototypeUpdates = imprintObject @::,  updatedKlass::, false, returnActionsTaken

      @::constructor = oldConstructor
      @namespace = namespace
      @namespacePath = namespacePath
      @_name = _name

    if returnActionsTaken
      merge
        class: classUpdates
        prototype: prototypeUpdates
    else
      @

  @getHotReloadKey: -> @getName()

  ###
  IN:
    _module should be the CommonJS 'module'
    klass: class object which extends BaseClass

  liveClass:
    On the first load, liveClass gets set.
    Each subsequent hot-load UPDATES liveClass,
    but liveClass always points to the initially created class object.

  OUT: the result of the call to liveClass.postCreate()

  postCreate is passed:
    hotReloaded:            # true if this is anything but the initial load
    classModuleState:
      liveClass:            # the original liveClass
      hotUpdatedFromClass:  # the most recently hot-loaded class
      hotReloadVersion:     # number starting at 0 and incremented with each hot reload
    _module:                # the CommonJs module

  EFFECTS:
    The following two methods are invoked on liveClass:

      if hot-reloading
        liveClass.imprintFromClass klass

      # always:
      liveClass.postCreate hotReloaded, classModuleState, _module

  ###
  @createWithPostCreate: createWithPostCreate = (a, b) ->
    klass = if b
      _module = a
      b
    else a

    # TODO - maybe we should make an NPM just for defineModule, so this is cleaner?
    _module ||= getModuleBeingDefined() || global.__definingModule

    # if hot reloading is not supported:
    return klass unless klass?.postCreate
    unless _module?.hot
      return klass.postCreate(
          hotReloadEnabled: false
          hotReloaded:      false
          classModuleState: {}
          module:           _module
      ) || klass

    # hot reloading supported:
    WebpackHotLoader.runHot _module, (moduleState) ->
      hotReloadKey = klass.getHotReloadKey()
      if classModuleState = moduleState[hotReloadKey]
        # hot reloaded!
        {liveClass} = classModuleState
        hotReloaded = true

        classModuleState.hotReloadVersion++
        classModuleState.hotUpdatedFromClass = klass

        # set namespaceProps in case it uses them internally
        # NOTE: everyone else will access these props through liveClass, which is already correct
        liveClass.namespace._setChildNamespaceProps liveClass.getName(), klass

        klass._name = liveClass._name
        liveClass.classModuleState = classModuleState
        updates = liveClass.imprintFromClass klass, true

        log "Art.ClassSystem.BaseClass #{liveClass.getName?()} HotReload":
          version: classModuleState.hotReloadVersion
          updates: updates
      else
        # initial load
        hotReloaded = false

        klass._hotClassModuleState =
        moduleState[hotReloadKey] = klass.classModuleState = classModuleState =
          liveClass: liveClass = klass
          hotUpdatedFromClass: null
          hotReloadVersion: 0

      liveClass.postCreate
        hotReloadEnabled: true
        hotReloaded:      hotReloaded
        classModuleState: classModuleState
        module:           _module

  # depricated alias
  @createHotWithPostCreate: (a, b) ->
    log.error "createHotWithPostCreate is DEPRICATED"
    createWithPostCreate a, b

  ###
  called every load
  IN: options:
    NOTE: hot-loading inputs are only set if this class created as follows:
      createHotWithPostCreate module, class Foo extends BaseClass

    hotReload: true/false
      true if this class was hot-reloaded

    hotReloadEnabled: true/false

    classModuleState:
      liveClass:            the first-loaded version of the class.
                            This is the official version of the class at all times.
                            The hot-reloaded version of the class is "imprinted" onto the liveClass
                            but otherwise is not used (but can be accessed via classModuleState.hotUpdatedFromClass)
      hotUpdatedFromClass:  The most recently loaded version of the class.
      hotReloadVersion:     number, starting at 1, and counting up each load

      classModuleState is a plain-object specific to the class and its CommonJS module. If there is
      more than one hot-loaded class in the same module, each will have its own classModuleState.

      SBD NOTE: Though we could allow clients to add fields to classModuleState, I think it works
      just as well, and is cleaner, if any state is stored in the actual class objects and
      persisted via postCreate.

    module: the CommonJs module object.

  {hotReloadEnabled, hotReloaded, classModuleState, module} = options
  ###
  @postCreate: (options) ->
    # TODO - once we switch fully to ES6, we should revisit how we handle @namespace
    # Normally, @namespace and @namespacePath get set by the parent NeptuneNamespace's index file AFTER postCreate.
    # However, if you need to require a file directly without requiring everything else in the namespace,
    #   you can add: @setNamespace require './namespace'
    #   to your class and you'll still get all the useful namespace functions.
    #   The above command makes your file work either way - as part of the full namespace or
    #   included by itself.
    # SBD: I pulled the following code because it breaks hot-reloading.
    # @namespacePath = if @namespace = @_namespace ? null
    #   "#{@namespace.namespacePath}.#{@getName()}"
    # else
    #   null

    if @getIsAbstractClass()
      @postCreateAbstractClass options
    else
      @postCreateConcreteClass options

  @setNamespace: (ns) ->
    @_namespace = ns

  @postCreateAbstractClass: (options) -> @
  @postCreateConcreteClass: (options) -> @

  # excludedKeys = ["__super__", "namespace", "namespacePath"].concat Object.keys Neptune.Base

  constructor: ->
    @__uniqueId = null
    # Object.defineProperty @, "__uniqueId",
    #   enumerable: false
    #   value: null
    # Neptune.Lib.Art.DevTools.Profiler.sample && Neptune.Lib.Art.DevTools.Profiler.sample()

    # BaseClass.objectsCreatedByType[type = @namespacePath] ?= 0
    # BaseClass.objectsCreatedByType[type]++
    # BaseClass.objectsCreated++

  # True if object implementsInterface all methods (an array of strings)
  # (i.e. the named properties are all functions)
  @implementsInterface: (object, methods) ->
    for method in methods
      return false unless typeof object[method] is "function"
    true

  #####################################
  # Module-like features (mixins)
  #####################################
  ###
  mix-in class methods
  Define getters/setters example:
    class MyMixin
      included: ->
        @getter foo: -> @_foo
        @setter foo: (v) -> @_foo = v

  NOTE! This will NOT include any properties you defined with getter or setter!
  NOTE! This only copies over values if there aren't already values in the included-into class
    This somewhat mirrors Ruby's include where the included-into-class's methods take precidence.
    However, if you include two modules in a row, the first module gets priority here.
    In ruby the second module gets priority (I believe).

  DEPRICATED!!!
  Time to do it "right" - and it's just a simple pattern:
    Justin Fagnani figured this out. Thanks!
    Read More:
      http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/

  To define a mixin:

    MyMixin = (superClass) ->
      class MyMixin extends superClass
        ... write your mixin as-if it were part of the normal inheritance hierachy

  To use a mixin:

    class MyClass extends MyMixin MySuperClass

  To use two mixins:

    class MyClass extends MyMixin1 MyMixin2 MySuperClass
  ###
  warnedAboutIncludeOnce = false
  @include: (obj) ->
    log.error "DEPRICATED: BaseClass.include. Use pattern."
    unless warnedAboutIncludeOnce
      warnedAboutIncludeOnce = true
      console.warn """
        Mixin pattern:

          To define a mixin:

            MyMixin = (superClass) ->
              class MyMixin extends superClass
                ... write your mixin as-if it were part of the normal inheritance hierachy

          To use a mixin:

            class MyClass extends MyMixin MySuperClass

          To use two mixins:

            class MyClass extends MyMixin1 MyMixin2 MySuperClass
        """

    for key, value of obj when key != 'included'
      @[key] = value unless @[key]

    for key, value of obj.prototype when key
      @::[key] = value unless @::[key]

    obj.included? @
    this

  ######################################################
  # Class Info
  ######################################################
  @getNamespacePath: ->
    if @namespacePath?.match @getName()
      @namespacePath
    else
      @namespacePath = "(no parent namespace).#{@getName()}"

  @getNamespacePathWithExtendsInfo: ->
    "#{@getNamespacePath()} extends #{getSuperclass(@).getNamespacePath()}"

  # DEPRICATED - use NN stuff
  # @classGetter
  #   classPath:      -> @namespace.namespacePath
  #   classPathArray: -> @namespacePathArray ||= @getClassPath().split "."
  #   classPathName:  ->
  #     if p = @namespace?.namespacePath
  #       p + "." + @getClassName()
  #     else
  #       @getClassName()

  @getClassName: (klass = @) ->
    klass.getName?() || klass.name


  ######################################################
  # inspect
  ######################################################

  ###
  inspect: ->
  IN: ()
  OUT: string

  Can override with same or alternate, recursion-block-supported signature:
    IN: (inspector) ->
    OUT: if inspector then null else string

    To handle the case where the inspector is not set, we
    recommneded declaring your 'inspect' as follows:
      inspect: (inspector) ->
        return StandardLib.inspect @ unless inspector
        # ...
        # custom code which writes all output to inspector.put
        # and uses inspector.inspect for inspecting sub-objects
        # ...
        null

    EFFECT:
      call inspector.put one or multiple times with strings to add to the inspected output
      call inspector.inspect foo to sub-inspect other objects WITH RECURSION BLOCK

  # Example 1:
  inspect: (inspector) ->
    return StandardLib.inspect @ unless inspector
    inspector.put @getNamespacePath()

  # Example 2:
  inspect: ->
    @getNamespacePath()
  ###
  @inspect: -> @getNamespacePath()

  inspect: -> "<#{@class.namespacePath}>"

  ###
  getInspectedObjects: -> plainObjects

  usually implemented this way:
  @getter inspectedObjects: -> plainObjects or objects which implement "inspect"

  TODO: I think I want to refactor inspectedObjects to ONLY return near-JSON-compatible objects:
    1. strings
    2. maps
    3. arrays

    Everything else should be rendered to a string. In general, strings should Eval to the object
    they represent:

      toInspectedObject(null):                    'null' # null becomes a string
      toInspectedObject(true):                    'true' # true becomes a string
      toInspectedObject(false):                   'false' # false becomes a string
      toInspectedObject(undefined):               'undefined' # undefined becomes a string
      toInspectedObject('hi'):                    '"hi"' # ESCAPED
      toInspectedObject((a) -> a):                'function(a){return a;}'
      toInspectedObject(rgbColor())               "rgbColor('#000000')"

    NOTE: inspectedObjects differs from plainObjects. The latter should be 100% JSON,
      and should return actual values where JSON allows, otherwise, return JSON data structures
      that encode the object's information in a human-readable format, ideally one that can be
      used as an input to the constructor of the object's class to recreate the original object.

      plainObjects:
        null:         null
        true:         true
        false:        false
        'str':        'str' # NOT escaped
        undefined:    null
        ((a) -> a):   'function(a){return a;}'
        rgbColor():   r: 0, g: 0, b: 0, a: 0

  You can provide this function for fine-grained control of what Inspector2 outputs and hence
  what DomConsole displays.

  If you would like for a string to appear without quotes, use:
    {inspect: -> 'your string without quotes here'}
  ###

  @getter
    inspectObjects: ->
      console.warn "inspectObjects/getInspectObjects is DEPRICATED. Use: inspectedObjects/getInspectedObjects"
      @getInspectedObjects()

    inspectedObjects: ->
      inspectedObjectLiteral "<#{@class?.getNamespacePath()}>"

  @classGetter
    inspectedObjects: ->
      inspectedObjectLiteral "class #{@getNamespacePath()}"

  ######################################################
  # Abstract Classes
  ######################################################

  ###
  Define this class as an abstract class. Implicitly it means
  any class it extends is also abstract, at least in this context.

  Definition: Abstract classes are not intended to every be instantiated.
    i.e.: never do: new MyAbstractClass

  TODO: in Debug mode, in the constructor:
    throw new Error "cannot instantiate abstract classes" if @class.getIsAbstractClass()

  ###
  @abstractClass: ->
    throw new Error "abstract classes cannot also be singleton" if @getIsSingletonClass()
    @_firstAbstractAncestor = @

  @classGetter
    superclass: -> getSuperclass @
    isAbstractClass: -> !(@prototype instanceof @_firstAbstractAncestor)
    isConcreteClass: -> !@getIsAbstractClass()
    abstractPrototype: -> @_firstAbstractAncestor.prototype
    firstAbstractAncestor: -> @_firstAbstractAncestor
    isSingletonClass: -> @_singleton?.class == @
    concretePrototypeProperties: ->
      abstractClassPrototype = @getAbstractClass().prototype
      object @prototype, when: (v, k) ->
        k != "constructor" &&
        abstractClassPrototype[k] != v

  @getAbstractClass: -> @_firstAbstractAncestor

  # BaseClass is an abstract-class
  @abstractClass()

  @propertyIsAbstract: (propName) ->
    @getAbstractClass().prototype[propName] == @prototype[propName]

  @propertyIsConcrete: (propName) ->
    @getAbstractClass().prototype[propName] != @prototype[propName]

  ######################################################
  # SingletonClasses
  ######################################################

  ###
  SBD2017: this is the new path for singleton classes.
  WHY: We can elliminate the need to DECLARE classes singleton.
    Instead, we can just access the singleton for any class, if needed.
  TODO: once we are 100% CaffeineScript, switch this to a @classGetter
  ###
  @getSingleton: getSingleton = ->
    if @_singleton?.class == @
      @_singleton
    else
      throw new Error "singleton classes cannot be abstract" if @getIsAbstractClass()
      @_singleton = new @

  ###
  creates the classGetter "singleton" which returns a single instance of the current class.

  IN: args are passed to the singleton constructor
  OUT: null

  The singleton instance is created on demand the first time it is accessed.

  SBD2017: Possibly depricated; maybe we just need a singleton getter for everyone?
    The problem is coffeescript doesn't properly inherit class getters.
    BUT ES6 and CaffeineScript DO. So, when we switch over, I think we can do this.
  ###
  @singletonClass: ->
    throw new Error "singleton classes cannot be abstract" if @getIsAbstractClass()

    @classGetter
      singleton: getSingleton
      "#{decapitalize functionName @}": -> @getSingleton()

    null

  ######################################################
  # Instance Methods
  ######################################################

  @getter
    className:  -> @class.getClassName()
    class:      -> @constructor
    keys:       -> Object.keys @
    namespacePath:      -> @class.getNamespacePath()
    classPathName:      -> @namespacePath
    classPathNameAndId: -> "#{@classPathName}:#{@objectId}"
    uniqueId:   -> @__uniqueId ||= nextUniqueObjectId() # unique across all things
    objectId:   -> @__uniqueId ||= nextUniqueObjectId() # number unique across objects

  # freeze this object safely
  freeze: ->
    @getUniqueId() # ensure we have the unique id set
    Object.freeze @
    @

  implementsInterface: (methods) -> Function.BaseClass.implementsInterface @, methods
  tap: (f)-> f(@);@
