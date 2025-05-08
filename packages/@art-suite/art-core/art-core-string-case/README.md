# @art-suite/art-core-string-case

A utility library for comprehensive string case conversions and codeword manipulation. Supports various common casing styles like camelCase, snake_case, dash-case, and more.

## Features

- Accurate extraction of "code words" from strings in various formats.
- Conversion to multiple casing styles:
  - camelCase (lowerCamelCase)
  - PascalCase (UpperCamelCase)
  - snake_case (lower_snake_case)
  - SCREAMING_SNAKE_CASE (UPPER_SNAKE_CASE)
  - dash-case (kebab-case)
  - Train-Case (Capitalized-Dash-Case)
- Basic string transformations: lowerCase, upperCase, capitalize, decapitalize.
- TypeScript definitions for complete type safety.

## Installation

```bash
npm install @art-suite/art-core-string-case
```

## API Overview

### Codeword Extraction

- **`getCodeWords(str: string): string[]`**: Extracts an array of words from a string, intelligently handling various casing styles and separators.
- **`codeWords(str: string): string[]`**: Alias for `getCodeWords`.

### Basic Case Transformations

- **`lowerCase(str: string): string`**: Converts the entire string to lower case.
- **`upperCase(str: string): string`**: Converts the entire string to upper case.
- **`capitalize(str: string): string`**: Capitalizes the first letter of the string.
- **`decapitalize(str: string): string`**: Converts the first letter of the string to lower case.

### Codeword-Based Transformations

- **`getLowerCaseCodeWords(str: string): string[]`**: Gets codewords and converts each to lower case.
- **`getUpperCaseCodeWords(str: string): string[]`**: Gets codewords and converts each to upper case.
- **`getCapitalizedCodeWords(str: string): string[]`**: Gets codewords and capitalizes each one.

### Common Case Style Conversions

- **`lowerCamelCase(str: string): string`**: Converts to `lowerCamelCase` (e.g., `myVariableName`).
- **`upperCamelCase(str: string): string`**: Converts to `UpperCamelCase` (PascalCase) (e.g., `MyClassName`).
- **`snakeCase(str: string): string`**: Converts to `snake_case` (e.g., `my_variable_name`).
- **`upperSnakeCase(str: string): string`**: Converts to `UPPER_SNAKE_CASE` (e.g., `MY_CONSTANT_NAME`).
- **`dashCase(str: string): string`**: Converts to `dash-case` (kebab-case) (e.g., `my-css-class-name`).
- **`capitalizedDashCase(str: string): string`**: Converts to `Capitalized-Dash-Case` (Train-Case) (e.g., `My-Http-Header`).

## Examples

### Codeword Extraction

```typescript
import { getCodeWords } from "@art-suite/art-core-string-case";

console.log(getCodeWords("fooBarBaz")); // ["foo", "Bar", "Baz"]
console.log(getCodeWords("FOO_BAR_BAZ")); // ["FOO", "BAR", "BAZ"]
console.log(getCodeWords("foo-bar-baz")); // ["foo", "bar", "baz"]
```

### Case Conversions

```typescript
import {
  lowerCamelCase,
  upperCamelCase,
  snakeCase,
  upperSnakeCase,
  dashCase,
  capitalizedDashCase,
} from "@art-suite/art-core-string-case";

const myString = "Convert This String";

console.log(lowerCamelCase(myString)); // "convertThisString"
console.log(upperCamelCase(myString)); // "ConvertThisString"
console.log(snakeCase(myString)); // "convert_this_string"
console.log(upperSnakeCase(myString)); // "CONVERT_THIS_STRING"
console.log(dashCase(myString)); // "convert-this-string"
console.log(capitalizedDashCase(myString)); // "Convert-This-String"
```

### Basic Transformations

```typescript
import { lowerCase, capitalize } from "@art-suite/art-core-string-case";

console.log(lowerCase("HELLO WORLD")); // "hello world"
console.log(capitalize("hello world")); // "Hello world"
```

## License

MIT
