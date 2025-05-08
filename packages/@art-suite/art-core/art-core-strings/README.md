# @art-suite/art-core-strings

A powerful and extensive utility library for string manipulation, parsing, generation, and regular expressions.

## Features

- Robust string manipulation: padding, replacing, joining, shortening, escaping.
- Random string generation, including cryptographically secure options.
- URL parsing, manipulation, and generation utilities.
- Comprehensive set of pre-defined regular expressions for common patterns (URLs, emails, colors, etc.).
- JSON stringification utilities.
- Pluralization and singularization of English words.
- TypeScript definitions for complete type safety.

## Installation

```bash
npm install @art-suite/art-core-strings
```

## API Overview

### String Manipulation & Utilities

- **`compactFlattenJoin(array: any[], joiner?: string): string`**: Flattens and compacts an array, then joins its elements into a string.
- **`replaceLast(source: string, find: string, replace: string): string`**: Replaces the last occurrence of a substring.
- **`getPadding(length: number, character?: string): string`**: Generates a padding string of a specified length.
- **`pad(str: string, length: number, character?: string, alignLeft?: boolean): string`**: Pads a string to a certain length.
- **`escapeJavascriptString(str: string): string`**: Escapes a string for safe use within JavaScript single or double quotes.
- **`allIndexes(source: string, find: string): number[]`**: Finds all indexes of a substring.
- **`eachMatch(str: string, regex: RegExp, callback: (match: RegExpExecArray) => void): void`**: Iterates over all matches of a regex in a string.
- **`humanFriendlyShorten(str: string, maxLength?: number, separator?: string): string`**: Shortens a string in a human-friendly way, typically by adding an ellipsis.
- **`stripTrailingWhitespace(str: string): string`**: Removes trailing whitespace from a string.

### Random String Generation

- **`base62Characters: string`**: A string containing all base62 characters (`0-9a-zA-Z`).
- **`randomString(length: number, characters?: string): string`**: Generates a random string of a specified length from a given set of characters.
- **`cryptoRandomString(length: number, characters?: string): string`**: Generates a cryptographically random string.
- **`randomBase62Character(): string`**: Returns a single random base62 character.

### JSON Utilities

- **`jsStringify(value: any, indent?: number | string, includeFunctions?: boolean, includeUndefined?: boolean): string`**: Extended JSON.stringify with options for functions and undefined.
- **`consistentJsonStringify(obj: any): string`**: Stringifies an object with keys sorted for consistent output.

### URL Utilities

- **`sameOrigin(url1: string, url2: string): boolean`**: Checks if two URLs have the same origin.
- **`parseQuery(queryString: string): Record<string, string | string[]>`**: Parses a URL query string into an object.
- **`generateQuery(params: Record<string, any>): string`**: Generates a URL query string from an object.
- **`urlJoin(...parts: string[]): string`**: Joins URL parts intelligently.
- **`urlResolve(...parts: string[]): string`**: Resolves URL parts similar to `path.resolve` but for URLs.
- **`appendQuery(url: string, query: string | Record<string, any>): string`**: Appends a query string or params to a URL.
- **`parseUrl(url: string): object`**: Parses a URL into its components (protocol, host, path, query, etc.).
- **`findUrlOrigin(url: string): string | undefined`**: Extracts the origin (protocol + host + port) from a URL.
- **`normalizeUrl(url: string): string`**: Normalizes a URL string (e.g., sorts query params, decodes, etc.).

### Pluralization

- **`plural(word: string, count?: number): string`**: Returns the plural form of a word. Can provide count for conditional pluralization.
- **`singular(word: string): string`**: Returns the singular form of a word.
- **`isSingular(word: string): boolean`**: Checks if a word is singular.
- **`isPlural(word: string): boolean`**: Checks if a word is plural.
- **`addPluralizeRule(singular: string | RegExp, plural: string | ((match: string, count: number) => string)): void`**: Adds a custom pluralization/singularization rule.
- **`pluralize(word: string, count?: number, inclusive?: boolean): string`**: More comprehensive pluralization function (alias or more featureful version of `plural`).

### Regular Expressions

This library provides a wide array of pre-defined `RegExp` objects for common matching tasks. Below are some key categories (refer to `index.d.ts` for the full list and exact names if aliased, e.g. `someRegexp` vs `someRegex`).

- **General**: `escapeRegExp`, `numberRegExp`, `wordsRegExp`, `exactlyOneWordRegExp`, `isoDateRegExp`.
- **URL Structure**: `urlProtocolRegExp`, `domainRegExp`, `urlPathRegExp`, `urlQueryRegExp`, `urlQueryParamsRegExp`, `findLegalUrlCharacterRegExp`, `findUrlPortRegExp`, `findUrlFragmentRegExp`.
- **URL Finding**: `findUrlRegExp`, `urlRegExp`, `findUrlWithOptionalProtocolRegExp`, `urlWithOptionalProtocolRegExp`, `findAllUrlsRegExp`, `findAllUrlsWithOptionalProtocolRegExp`, `findSourceReferenceUrlRegExp`.
- **Email**: `emailRegExp`, `findEmailRegExp`, `findEmailLocalRegExp`.
- **Color**: `hex16ColorRegExp`, `hex256ColorRegExp`, `hex16GreyColorRegExp`, `hex256GreyColorRegExp`, `rgbColorRegExp`, `rgbaColorRegExp`, `findColorRegExp`, `colorRegExp`.

_(Note: Many RegExp exports have aliases like `...Regexp` or `...Regex`. The primary documented form is usually `...RegExp`.)_

## Examples

### String Manipulation

```typescript
import {
  pad,
  compactFlattenJoin,
  humanFriendlyShorten,
} from "@art-suite/art-core-strings";

console.log(pad("test", 10, "_", false)); // "______test"
console.log(
  compactFlattenJoin(["hello", null, ["world", undefined, "!"]], " ")
); // "hello world !"
console.log(
  humanFriendlyShorten("This is a very long string that needs shortening", 20)
); // "This is a very long..."
```

### URL Utilities

```typescript
import {
  parseUrl,
  generateQuery,
  appendQuery,
} from "@art-suite/art-core-strings";

const myUrl = "http://example.com/path?foo=bar#hash";
const parsed = parseUrl(myUrl);
console.log(parsed.host); // "example.com"

const params = { a: 1, b: "test" };
console.log(generateQuery(params)); // "a=1&b=test"
console.log(appendQuery("http://example.com", params)); // "http://example.com?a=1&b=test"
```

### Regular Expressions

```typescript
import { emailRegExp, urlRegExp } from "@art-suite/art-core-strings";

console.log(emailRegExp.test("test@example.com")); // true
console.log(urlRegExp.test("http://example.com")); // true
```

### Pluralization

```typescript
import { plural, singular } from "@art-suite/art-core-strings";

console.log(plural("cat")); // "cats"
console.log(plural("box")); // "boxes"
console.log(singular("apples")); // "apple"
console.log(plural("mouse", 2)); // "mice"
```

## License

MIT
