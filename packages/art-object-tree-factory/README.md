# art-object-tree-factory

Fast, easy way to create declarative APIs for data-structures which consist of per-node-properties and per-node-ordered-children. This is how Art.React has such nice syntax.

## Example: React

You can easily create all your React factories:

```coffeescript
# CaffeineScript
import &ArtStandardLib, &ArtObjectTreeFactory, &React

createObjectTreeFactories
  w lowerCase "
    A Abbr Acronym Address Applet Area Article Aside Audio B Base BaseFont Bdi Bdo
    Big BlockQuote Body Br Button Canvas Caption Center Cite Code Col ColGroup
    DataList Dd Del Details Dfn Dialog Dir Div Dl Dt Em Embed FieldSet FigCaption
    Figure Font Footer Form Frame FrameSet H1 H2 H3 H4 H5 H6 Head Header Hr Html I IFrame Img Input
    Ins Kbd KeyGen Label Legend Li Link Main Map Mark Menu MenuItem Meta Meter Nav
    NoFrames NoScript Object Ol OptGroup Option Output P Param Pre Progress Q Rp Rt
    Ruby S Samp Script Section Select Small Source Span Strike Strong Style Sub
    Summary Sup Table TBody Td TextArea TFoot Th THead Time Title Tr Track Tt U Ul
    Var Video Wbr"

  (nodeName, props, children) -> createElement nodeName, props, children...
```

Use:

```coffeescript

render: ->
  Div
    "Everything you need "
    Link "is here" src: "http://wikipedia.org"
```