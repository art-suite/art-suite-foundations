# @art-suite/art-core-terminal-colors

A lightweight and efficient library for adding colors and styles to your terminal/console output using ANSI escape codes. Provides a simple API for common text styling needs.

## Features

- Apply various text styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
- Set foreground text colors: black, red, green, yellow, blue, magenta, cyan, white, grey, and their bright counterparts.
- Set background text colors: bgBlack, bgRed, ..., bgWhiteBright.
- Utilities for working with ANSI codes: `ansiRegex` to match codes, `stripAnsi` to remove them, and `ansiSafeStringLength` to get visual length.
- Chainable API (typically, color functions return the modified string, often allowing chaining).
- TypeScript definitions for complete type safety.

## Installation

```bash
npm install @art-suite/art-core-terminal-colors
```

## API Overview

All styling functions take a string as input and return a new string with the appropriate ANSI escape codes applied.

### ANSI Utilities

- **`ansiRegex: RegExp`**: A regular expression to match ANSI escape codes.
- **`stripAnsi(str: string): string`**: Removes all ANSI escape codes from a string.
- **`ansiSafeStringLength(str: string): number`**: Calculates the visual length of a string, ignoring ANSI escape codes.

### Style Modifiers

- **`reset(str: string): string`**: Resets all current styling.
- **`bold(str: string): string`**: Makes text bold.
- **`dim(str: string): string`**: Makes text dim (decreased intensity).
- **`italic(str: string): string`**: Makes text italic.
- **`underline(str: string): string`**: Underlines text.
- **`inverse(str: string): string`**: Inverts foreground and background colors.
- **`hidden(str: string): string`**: Makes text hidden (invisible).
- **`strikethrough(str: string): string`**: Applies strikethrough to text.

### Foreground Colors

- `black(str: string): string`
- `red(str: string): string`
- `green(str: string): string`
- `yellow(str: string): string`
- `blue(str: string): string`
- `magenta(str: string): string`
- `cyan(str: string): string`
- `white(str: string): string`
- `grey(str: string): string` (or `gray`)

#### Bright Foreground Colors

- `redBright(str: string): string`
- `greenBright(str: string): string`
- `yellowBright(str: string): string`
- `blueBright(str: string): string`
- `magentaBright(str: string): string`
- `cyanBright(str: string): string`
- `whiteBright(str: string): string`

### Background Colors

- `bgBlack(str: string): string`
- `bgRed(str: string): string`
- `bgGreen(str: string): string`
- `bgYellow(str: string): string`
- `bgBlue(str: string): string`
- `bgMagenta(str: string): string`
- `bgCyan(str: string): string`
- `bgWhite(str: string): string`
- `bgGrey(str: string): string` (or `bgGray`)

#### Bright Background Colors

- `bgRedBright(str: string): string`
- `bgGreenBright(str: string): string`
- `bgYellowBright(str: string): string`
- `bgBlueBright(str: string): string`
- `bgMagentaBright(str: string): string`
- `bgCyanBright(str: string): string`
- `bgWhiteBright(str: string): string`

## Examples

```typescript
import {
  red,
  bold,
  bgYellow,
  italic,
  stripAnsi,
  ansiSafeStringLength,
} from "@art-suite/art-core-terminal-colors";

const greeting = "Hello, World!";

// Simple coloring
console.log(red(greeting));

// Chained styling (assuming functions can be chained or nested)
// Example: bold(red(greeting)) or specific chaining API if provided
console.log(bold(red("This is bold red text!")));
console.log(italic(bgYellow(blue("Blue text on yellow, italicized."))));

// ANSI Utilities
const coloredText = red(bold("Important Message"));
console.log(coloredText); // Shows colored text
console.log(stripAnsi(coloredText)); // "Important Message"
console.log(ansiSafeStringLength(coloredText)); // 17 (length of "Important Message")
console.log(coloredText.length); // Actual string length including ANSI codes (much longer)
```

## License

MIT
