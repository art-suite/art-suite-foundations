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

## TypeScript Support

ArtHtmlFactory provides full TypeScript type definitions. Each HTML tag (e.g. `Div`, `Span`, `Body`) is typed as an `HtmlFactory` function returning an object that can be turned into a string with `.toString()` or `.toCompactString()`. You can pass any combination of:

- **Primitives** (string, number, boolean)
- **Objects** (merged into HTML attributes; `style` is special)
- **Arrays** (automatically flattened)
- **null/undefined** (ignored)

### Merging Rules

**Properties:**

- Later properties override earlier ones.
- A property set to `null` removes it.
- A property set to `undefined` is simply ignored.
- When generating the HTML:
  - false, `undefined` and 'null' properties are not output: `Div({bar: false}) => <div>`
  - true is output as just the tag with no value: `Div({bar: true}) => <div bar>`
  - 0 and other numbers are output as strings: `Div({foo: 0}) => <div foo="0">`

```
Div(
  { width: '100px' },
  { width: '200px' } // overrides the first width
);

Div(
  { width: '100px' },
  { width: null } // removes width
);
```

### The Style Property

For `style`, strings are allowed but **objects are recommended** so they can be merged correctly. Multiple style objects get merged, with later keys overriding earlier ones. Keys in style objects become dash-case in the final HTML.

```
Div(
  { style: { backgroundColor: 'red' } },
  { style: { color: 'white' } }
);
// => style="background-color:red;color:white"
```

### Example: A Todo List

You can create reusable "components" by defining helper functions returning arrays of ArtHtmlFactory objects, then use them in your main function.

```typescript
import { Div, Ul, Li, Span } from "art-html-factory";

const TodoItem = (title: string) => [
  Span({ style: { fontWeight: "bold" } }, title),
];

export const TodoList = (items: string[]) =>
  Div(
    { style: { margin: "10px" } },
    Ul(items.map((item) => Li(TodoItem(item))))
  );

console.log(TodoList(["Buy milk", "Clean house"]).toString());
```
