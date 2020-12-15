# ArtHtmlFactory

Generate HTML with an easy, declarative syntax.

### Examples

```coffeescript
import &ArtHtmlFactory

# Example: tag properties
tree = Div
  class: :foo
  id:    :123

tree.toString()
# > "<DIV class='foo' id='123'></DIV>"
```


### Examples

```coffeescript
import &ArtHtmlFactory

# Example: 4 text and 2 non-text children
Span
  ""      This is some really
  B  ""   bold
  ""      text.
  ""      Also, here is some
  Em ""   emphasized
  ""      text.

# Example: internalHtml adds a string
# without interpretation.
Span
  internalHtml: ""
    Or you can do <b>this</b>
    and <em>this</em>.

# With CaffeineScript literals,
# setting CSS styles is easy.
Div
  style:
    bottom:          0
    height:          50px
    left:            100px
    right:           100px
    position:        :fixed
    backgroundColor: :white
    textAlign:       :center
  "" Custom Styles are easy, too.


# Example: Reusable styles without stylesheets:
myTextStyle =
  style:
    fontSize:   16pt
    color:      #444
    fontFamily: :Times

myLayoutStyle
  style:
    padding:    10pt

Div
  myTextStyle
  myLayoutStyle
  ""
    All plain object children are merged into
    the element's props.
```
