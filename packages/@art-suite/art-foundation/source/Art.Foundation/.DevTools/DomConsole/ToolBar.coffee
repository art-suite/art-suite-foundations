
###
To customize how an object shows up in the DOM console, add
getInspectedObjects member method. For more info, see base_object.coffee
###

Foundation = require 'art-foundation'
DomConsole = require './namespace'
{Component} = require './PseudoReact'

{
  BaseObject
  defineModule
  wordsArray
} = Foundation

{Div, A} = Foundation.Browser.DomElementFactories

defineModule module, class ToolBar extends Component

  render: ->
    {shown} = @state
    Div
      style:
        position: "fixed"
        top: 0
        right: 0
        display: "flex"
        flexDirection: "row"
        borderBottom: "1px solid #aaa"
        borderLeft: "1px solid #aaa"
        fontSize: "10px"
        fontFamily: "Arial"
        justifyContent: "flex-end"
        backgroundColor: "#f7f3df"

      Div style: margin: "5px", "Art.Foundation.DomConsole"
      for action in ["reset", "show", "hide", "increaseWidth", "decreaseWidth"]
        do (action) =>
          Div
            style: margin: "5px"
            A
              href: "#"
              on: click: => DomConsole[action]()
              action
