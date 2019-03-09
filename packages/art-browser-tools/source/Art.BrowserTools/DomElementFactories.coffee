supportLibs = [
  require "art-standard-lib"
  require "art-object-tree-factory"
]
###
DomElementFactories allows for Art.React-style creation of DOM elements.

# HOW TO LOAD:
# -- IF: you are already using Art.Foundation
Foundation = require 'art-foundation'
{DomElementFactories} = Foundation.Browser

# -- IF: You have the Art.Foundation NPM but only want DomElementFactories:
DomElementFactories = require 'art-foundation/dom_element_factories'

# -- IF: You just have dom_element_factories.js
# first, load it prior via a <script> tag, then:
# window.DomElementFactories will be set.

Usage:

{Div, Span, B, Em} = DomElementFactories

mySharedTextStyle =
  style:
    fontSize: "16pt"
    color: "#444"
    fontFamily: "Times"

Div
  class: "foo"
  id:    "123"

Span
  class: "dude"
  "This is some really"
  B "bold"
  "text."
  "Also, here is some"
  Em "emphasized"
  "text."

Span mySharedTextStyle,
  internalHTML: "Or you can do <b>this</b> and <em>this</em>."

Div mySharedTextStyle,
  style:
    bottom:          0
    height:          "50px"
    left:            "100px"
    right:           "100px"
    position:        "fixed"
    backgroundColor: "white"
    textAlign:       "center"
  "Styles are easy, too."

VERSION HISTORY:
  1.1.1 - added H2-H6
  1.1.0 - new-lines in text-children become <BR> tags
  1.0.0 - initial
###

#####################
# OBJECTS
#####################


#####################
# DomElementFactories
#####################
module.exports = class DomElementFactories
  @version: "1.1.1"
  @src: "https://github.com/imikimi/art-foundation"
  for supportLib in supportLibs
    for k, v of supportLib when supportLib.hasOwnProperty(k) && k.match /^[^_]/
      @[k] = v

  @isString: isString = (obj) => typeof obj == "string"
  @isPlainObject: isPlainObject = (obj) => obj.constructor == Object

  @mergeInto: mergeInto = (into = {}, source) ->
    into[k] = v for k, v of source
    into

  @setDomElementProp: (element, prop, value, oldValue) =>
    switch prop
      when "class"      then element.className = value || ""
      when "id"         then element.id        = value || ""
      when "innerHTML"  then element.innerHTML = value || ""
      when "on"
        throw new Error "object expected for 'on' property" unless isPlainObject value
        setStyle    = (eventType, newEventListener) -> element.addEventListener eventType, newEventListener
        clearStyle  = (eventType, oldEventListener) -> element.removeEventListner eventType, oldEventListener
        @objectDiff value, oldValue, setStyle, clearStyle, setStyle
      when "style"
        throw new Error "object expected for 'style' property" unless isPlainObject value
        {style} = element
        setStyle    = (k, v) -> style[k] = v
        clearStyle  = (k)    -> style[k] = ""
        @objectDiff value, oldValue, setStyle, clearStyle, setStyle

      else element.setAttribute prop, value

  @setDomElementProps: (element, props) ->
    for k, v of props
      @setDomElementProp element, k, v

  @setDomElementChildren: (element, children) ->
    for child in children
      if isString child
        for text, i in child.split "\n"
          element.appendChild document.createElement "br" if i > 0
          element.appendChild document.createTextNode text
      else
        unless child instanceof Node
          message = "DomElementFactory:#{nodeName}: Child is not a string or instance of Node. Child: #{child}"
          (Neptune?.Art?.Foundation?.log?.error? message, child) || console.log message, child
          throw new Error message
        element.appendChild child

  ###
  IN: any combination of arrays and strings
  OUT: All element-names found in all strings are used to generate dom-element-factory-functions
    for elements with those names.
    The output is a plain Object where they keys are the upperCamelCase version of the element-names
    passed in. The values are the element-factories.

  ###
  @createDomElementFactories: (list...) =>
    @createObjectTreeFactories
      mergePropsInto: (into, source) ->
        for k, v of source
          into[k] = if k == "style"
            mergeInto into[k], v
          else
            v
      list
      (nodeName, props, children) =>
        element = document.createElement nodeName
        @setDomElementProps element, props if props?
        @setDomElementChildren element, children if children?

        element

  @allDomElementNames: "
    A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo
    Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup
    DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption
    Figure Font Footer Form Frame FrameSet H1 H2 H3 H4 H5 H6 Head Header Hr Html I IFrame Img Input
    Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav
    NoFrames NoScript Object Ol OptGroup Option Output P Param Pre Progress Q Rp Rt
    Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub
    Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul
    Var Video Wbr
    "

  @[k] = v for k, v of @createDomElementFactories @allDomElementNames
