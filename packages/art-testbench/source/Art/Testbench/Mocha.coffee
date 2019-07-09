{isArray, isNode, log, isFunction, isPlainObject, merge, Promise} = require 'art-standard-lib'
{configure} = require 'art-config'
chai = require './ArtChai'
global.assert = chai.assert

if global.document
  document.write "<div id=\"mocha\"></div>" unless document.getElementById "mocha"
  require "mocha/mocha.css"
  require "!script-loader!mocha/mocha.js"

  DomConsole = require 'art-foundation/dev_tools/dom_console'
  mocha.setup reporter: require './MochaBrowserReporter'

###
Use mocha as normal, but if you added dots (.) in your suite names, this will
break them out into nested test suites and group suites with the same path together.
It also alphabetizes them.

Ex:

  suite "Art.Foundation.Async", asyncTests
  suite "Art.Foundation.Binary", binaryTests
  suite "Art.Atomic", atomicTests

Becomes:

  suite "Art", ->
    suite "Atomic", atomicTests
    suite "Foundation", ->
      suite "Async", asyncTests
      suite "Binary", binaryTests
###
class NestedSuites
  constructor: ->
    @suites = {}
    @suiteFunctions = {}

  addSuite: (name, f) ->
    (@suiteFunctions[name] ||= []).push f

    splitName = name.split '.'
    suiteMap = @suites
    for suitePart in splitName
      suiteMap = (suiteMap[suitePart] ||= {})

  _createMochaSuites: (suites = @suites, suitePath = null)->
    for suitePart in Object.keys suites
      subSuites = suites[suitePart]
      do (suitePart, subSuites) =>
        path = if suitePath then suitePath + "." + suitePart else suitePart

        self = @
        suite suitePart, ->
          self._createMochaSuites subSuites, path
          if functions = self.suiteFunctions[path]
            for f in functions
              f.call @

  groupTestSuites: (defineAllTests) ->
    oldSuite = global.suite
    global.suite = (name, f) =>
      @addSuite name, f

    Promise.resolve defineAllTests chai
    .then defineSuitesByNamespaces
    .then =>
      global.suite = oldSuite
      mocha?.setup 'tdd'

      @_createMochaSuites()

  groupTestSuitesSync: (defineAllTests) ->
    oldSuite = global.suite
    global.suite = (name, f) =>
      @addSuite name, f

    defineSuitesByNamespaces defineAllTests chai
    global.suite = oldSuite
    mocha?.setup 'tdd'

    @_createMochaSuites()


###
IN: rootNamespace
EFFECT:
  Traverses all of rootNamespace looking for modules with a 'suite' function.
  When found, creates a suite with the namespacePath of that module and evalutest
  the module's suite function in that suite.
###
defineSuitesByNamespaces = (namespace, rootNamespacePath) ->
  if isArray namespace
    for n in namespace
      defineSuitesByNamespaces n, rootNamespacePath

  else
    {namespacePath, namespaces, modules} = namespace
    rootNamespacePath ||= namespacePath + "."
    [..., relativeNamespacePath] = namespacePath.split rootNamespacePath
    for nsName, ns of namespaces
      defineSuitesByNamespaces ns, rootNamespacePath
    for modName, mod of modules when mod
      if isFunction mod.suite
        suite "#{relativeNamespacePath}.#{modName}", mod.suite
      else if isPlainObject mod.suite
        defineSuitesByObjectStructure mod.suite, "#{relativeNamespacePath}.#{modName}"

defineSuitesByObjectStructure = (object, namespacePath) ->
  for k, v of object
    if isFunction v
      suite "#{namespacePath}.#{k}", v
    else if isPlainObject v
      defineSuitesByObjectStructure v, "#{namespacePath}.#{k}"

module.exports = class MyMocha
  @assert: chai.assert

  @init: (options) ->
    {defineTests, synchronous} = options
    throw new Error "defineTests required" unless isFunction defineTests

    global.mocha?.setup timeout: 10000

    options = merge
      artConfigName: "Test"
      options

    @defineGlobals()
    DomConsole?.enable()

    if synchronous || isNode
      try
        configure options
        @_runSync defineTests
      catch error
        log.error "Art.Foundation.Mocha": {error}

    else
      Promise.resolve configure options
      .then => @_run options.defineTests

  @defineGlobals: ->
    global.testAssetRoot = "/test/assets"

    global.skipKnownFailingTest = (name, f) ->
      message = "SKIPPING KNOWN-FAILING TEST: #{name}"
      test message, ->
        assert.rejects f, "This test is passing now, yay! Switch to a normal test."

  @_run: (defineAllTests)=>
    (new NestedSuites).groupTestSuites defineAllTests
    .then -> mocha?.run()

  # mocha in node requires a synchronous start...
  @_runSync: (defineAllTests) =>
    (new NestedSuites).groupTestSuitesSync defineAllTests
    mocha?.run()
