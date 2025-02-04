export type ArbitraryArrayNesting<T> = (T | ArbitraryArrayNesting<T>)[]
export type ArbitraryArrayNestingWithNullAndUndefined<T> = (T | null | undefined | ArbitraryArrayNestingWithNullAndUndefined<T>)[]

interface HtmlTextNode {
  /**
   * Returns an HTML string representation of the node in human readable format.
   */
  toString(): string

  /**
   * Returns a compact HTML string representation of the node.
   * This is useful for debugging and logging.
   */
  toCompactString(): string
}

type HtmlFactoryStyleProps = Record<string, string | number | null | undefined>

type HtmlFactoryProps = {
  // Core HTML attributes
  style?: HtmlFactoryStyleProps | null | undefined
  class?: string | null | undefined
  id?: string | null | undefined
  title?: string | null | undefined

  // Event handlers
  onClick?: string | Function | null | undefined
  onChange?: string | Function | null | undefined
  onSubmit?: string | Function | null | undefined
  onInput?: string | Function | null | undefined
  onKeyDown?: string | Function | null | undefined
  onKeyUp?: string | Function | null | undefined
  onFocus?: string | Function | null | undefined
  onBlur?: string | Function | null | undefined

  // Common attributes
  name?: string | null | undefined
  value?: string | number | boolean | null | undefined
  type?: string | null | undefined
  disabled?: boolean | null | undefined
  required?: boolean | null | undefined
  placeholder?: string | null | undefined
  href?: string | null | undefined
  src?: string | null | undefined
  alt?: string | null | undefined
  target?: '_blank' | '_self' | '_parent' | '_top' | null | undefined
  rel?: string | null | undefined

  // Allow any other valid HTML attributes
  [key: string]: string | number | boolean | Function | HtmlFactoryStyleProps | null | undefined
}

export type HtmlFactoryParam = string | number | boolean | HtmlFactoryProps | HtmlTextNode

export type HtmlFactoryParams = ArbitraryArrayNestingWithNullAndUndefined<HtmlFactoryParam>

export type HtmlFactory = (...args: HtmlFactoryParams) => HtmlTextNode

// Document structure
export const Html: HtmlFactory
export const Head: HtmlFactory
export const Body: HtmlFactory

// Document metadata
export const Base: HtmlFactory
export const BaseFont: HtmlFactory
export const Link: HtmlFactory
export const Meta: HtmlFactory
export const Script: HtmlFactory
export const Style: HtmlFactory
export const Title: HtmlFactory

// Content sectioning
export const Address: HtmlFactory
export const Article: HtmlFactory
export const Aside: HtmlFactory
export const Center: HtmlFactory
export const Footer: HtmlFactory
export const Header: HtmlFactory
export const H1: HtmlFactory
export const H2: HtmlFactory
export const H3: HtmlFactory
export const H4: HtmlFactory
export const H5: HtmlFactory
export const H6: HtmlFactory
export const Main: HtmlFactory
export const Nav: HtmlFactory
export const Section: HtmlFactory

// Text content
export const BlockQuote: HtmlFactory
export const Dd: HtmlFactory
export const Dir: HtmlFactory
export const Div: HtmlFactory
export const Dl: HtmlFactory
export const Dt: HtmlFactory
export const FigCaption: HtmlFactory
export const Figure: HtmlFactory
export const Hr: HtmlFactory
export const Li: HtmlFactory
export const Menu: HtmlFactory
export const MenuItem: HtmlFactory
export const Ol: HtmlFactory
export const P: HtmlFactory
export const Pre: HtmlFactory
export const Ul: HtmlFactory

// Inline text
export const A: HtmlFactory
export const Abbr: HtmlFactory
export const Acronym: HtmlFactory
export const B: HtmlFactory
export const Bdi: HtmlFactory
export const Bdo: HtmlFactory
export const Big: HtmlFactory
export const Br: HtmlFactory
export const Cite: HtmlFactory
export const Code: HtmlFactory
export const Del: HtmlFactory
export const Dfn: HtmlFactory
export const Em: HtmlFactory
export const Font: HtmlFactory
export const I: HtmlFactory
export const Ins: HtmlFactory
export const Kbd: HtmlFactory
export const Mark: HtmlFactory
export const Q: HtmlFactory
export const Rp: HtmlFactory
export const Rt: HtmlFactory
export const Ruby: HtmlFactory
export const S: HtmlFactory
export const Samp: HtmlFactory
export const Small: HtmlFactory
export const Span: HtmlFactory
export const Strike: HtmlFactory
export const Strong: HtmlFactory
export const Sub: HtmlFactory
export const Sup: HtmlFactory
export const Time: HtmlFactory
export const Tt: HtmlFactory
export const U: HtmlFactory
export const Var: HtmlFactory
export const Wbr: HtmlFactory

// Image and multimedia
export const Area: HtmlFactory
export const Audio: HtmlFactory
export const Canvas: HtmlFactory
export const Embed: HtmlFactory
export const IFrame: HtmlFactory
export const Img: HtmlFactory
export const Map: HtmlFactory
export const ObjectElement: HtmlFactory
export const Param: HtmlFactory
export const Source: HtmlFactory
export const Track: HtmlFactory
export const Video: HtmlFactory

// Embedded content
export const Applet: HtmlFactory
export const Frame: HtmlFactory
export const FrameSet: HtmlFactory
export const NoFrames: HtmlFactory

// Scripting
export const NoScript: HtmlFactory

// Table content
export const Caption: HtmlFactory
export const Col: HtmlFactory
export const ColGroup: HtmlFactory
export const Table: HtmlFactory
export const TBody: HtmlFactory
export const Td: HtmlFactory
export const TFoot: HtmlFactory
export const Th: HtmlFactory
export const THead: HtmlFactory
export const Tr: HtmlFactory

// Forms
export const Button: HtmlFactory
export const DataList: HtmlFactory
export const FieldSet: HtmlFactory
export const Form: HtmlFactory
export const Input: HtmlFactory
export const KeyGen: HtmlFactory
export const Label: HtmlFactory
export const Legend: HtmlFactory
export const Meter: HtmlFactory
export const OptGroup: HtmlFactory
export const Option: HtmlFactory
export const Output: HtmlFactory
export const Progress: HtmlFactory
export const Select: HtmlFactory
export const TextArea: HtmlFactory
export const Textarea: HtmlFactory

// Interactive elements
export const Details: HtmlFactory
export const Dialog: HtmlFactory
export const Summary: HtmlFactory

/**
 * Creates an HTML node that directly injects its content as raw HTML without escaping.
 * Use with caution as this could lead to XSS vulnerabilities if used with untrusted input.
 * @example
 * ```ts
 * RawHtml("<b>Bold</b>") // outputs: <b>Bold</b>
 * ```
 */
export const RawHtml: HtmlFactory
