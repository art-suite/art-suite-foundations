Foundation = require 'art-foundation'
{Div} = Foundation.Browser.DomElementFactories
{merge, BaseObject} = Foundation
{createObjectTreeFactory} = require 'art-object-tree-factory'


###
PseudoReact.Component
---------------------

Difference between this and real React:

  - There is no virtual-dom!
  - There is no life-cycle!
  - There is no @refs
  - Methods ARE NOT BOUND to instances

  - @setState and @state are minimally supported
    - setState is epoched, on a per-component basis
    - setting the state results in a full @rerender

  - @rerender is provided for manually rerendering

  - @rerender DOEST NOT DIFF! It just re-generates EVERYTHING.
    There are NO INCREMENTAL UPDATES within a Component.
    However, you can rerender a sub-component and the parent
    component will not need to be re-rendered.

  - @render returns an HTMLElement instead of a virtual-element.

  - Component-factories don't actually return components, they return HTMLElements.
    WHY? So they can be used in @render functions in the normal React-style.

###

module.exports = class Component extends BaseObject
  @postCreate: ->
    @toComponentFactory()

  @toComponentFactory: ->
    createObjectTreeFactory (props, children) =>
      props.children ||= children if props?
      (new @ props).rerender()

  #######################
  # INSTANCE METHODS
  #######################
  constructor: (@props = {}) ->
    @state = @getInitialState()
    @_pendingState = null

  #######################
  # MINIMAL LIFECYCLE METHODS
  #######################

  getInitialState: -> {}

  getPendingState: ->
    return @_pendingState if @_pendingState
    @_queueApplyPendingState()
    @_pendingState = {}

  _queueApplyPendingState: ->
    setTimeout (=> @_applyPendingState()), 0

  _applyPendingState: ->
    @state[k] = v for k, v of @_pendingState
    @rerender()
    @_pendingState = null

  _setState: (k, v) ->
    @getPendingState()[k] = v

  setState: (a, b) ->
    if a.constructor == Object
      @_setState k, v for k, v of a
    else
      @_setState a, b

  # EFFECT:
  #  - full re-render and re-generate all children HTMLElements
  #  - if previously rendered and attached to the DOM, replaced the old version with the new.
  rerender: ->
    oldRootElement = @_rootElement
    @_render()
    oldRootElement?.parentElement?.replaceChild @_rootElement, oldRootElement
    @_rootElement

  # OUT: HTMLElements
  # Recommendation: use DomElementFactories to generate your HTMLElement sub-tree.
  render: -> Div()

  ##################
  # PRIVATE
  ##################
  _render: ->
    @_rootElement = @render()
