# @art-suite/art-time

Utilities for working with dates and times in JavaScript and TypeScript. Provides functions to get the age of a date in seconds, format durations (short or verbose), and create user-friendly date/time strings.

Supports:

- CaffeineScript, JavaScript, TypeScript
- ECM Modules and CommonJS

## Table of Contents

- [Overview](#overview)
- [Core Types](#core-types)
- [Core Exports](#core-exports)
- [Usage Examples](#usage-examples)
- [API Reference](#api-reference)
- [License](#license)

## Overview

This library offers:

- A flexible date input type (ArtTimeDate) which accepts Date, string, number (epoch), or null/undefined to represent the current time.
- Utility methods for:
  - Converting dates to human-friendly strings (humanDurationString, timeAgo, niceDateString, etc.).
  - Calculating how many seconds have passed (or will pass) relative to a given time (dateAgeInSeconds).

## Core Types

### ArtTimeDate

export type ArtTimeDate = Date | string | number | null | undefined;
Accepts multiple forms of time representation:

- Date object
- string (parseable by Date.parse OR an integer-string which will be treated the same as a number)
- number (seconds or milliseconds from epoch)
- null or undefined (uses current time)

## HumanDurationOptions

```typescript
export interface HumanDurationOptions {
  readonly verbose?: boolean;
  readonly precision?: number;
  readonly now?: ArtTimeDate;
}
```

- verbose: Use full names for time units (e.g. "minutes" vs "m").
- precision: Maximum number of time units to display.
- now: Reference time for relative calculations (defaults to current time).

## Core Exports

- dateAgeInSeconds(date, now?)
- humanDurationString(seconds, options?)
- niceFullDateString(date)
- niceMonthYear(date)
- niceDateString(date, now?)
- niceTimeDetailsString(date)
- timeAgo(date, options?)

## Usage Examples

### Human-Readable Durations

```typescript
// Typescript
import { humanDurationString, secondsPer } from "@art-suite/art-time";

// A minute:
humanDurationString(secondsPer.minute); // "1m"

// Two hours:
humanDurationString(secondsPer.hour * 2); // "120m"

// With precision of 2:
humanDurationString(secondsPer.hour + 30, { precision: 2 }); // "1h 1m"

// Verbose style:
humanDurationString(60, { verbose: true }); // "1 minute"
```

### Relative Time

```javascript
// JavaScript
const { timeAgo, secondsPer } = require("@art-suite/art-time");

const now = Date.parse("2024-07-01 12:35");

// Just now:
timeAgo(now - 10, { now }); // "just now"

// One minute ago:
timeAgo(now - secondsPer.minute, { now }); // "1m"

// Verbose style:
timeAgo(now - 3600, { now, verbose: true }); // "60 minutes ago"
```

### Nice Date Strings

```coffee
## CaffeineScript, too
import &ArtSuite/ArtTime

now = Date.now()

# Today:
niceDateString()                      # "today"

# Yesterday:
niceDateString now - secondsPer.day   # "yesterday"

# Full date/time:
niceFullDateString now                # "12:35pm July 1, 2024"

# Month and year:
niceMonthYear now                     # "July 2024"

# Detailed time (hour/minute):
niceTimeDetailsString now             # "12:35pm July 1"
```

## API Reference

```typescript
// Returns the number of seconds between date and now. Positive if date is in the past.
dateAgeInSeconds(date: ArtTimeDate, now?: ArtTimeDate): number

// Formats a duration in seconds into a short or verbose form (e.g. "1m 30s" or "1 minute 30 seconds").
humanDurationString(seconds: number, options?: HumanDurationOptions): string

// Returns a long-form date string (e.g. "3:30pm March 14, 2024").
niceFullDateString(date: ArtTimeDate): string

// Returns a month/year string (e.g. "March 2024").
niceMonthYear(date: ArtTimeDate): string

// Returns a context-aware date string (e.g. "just now", "yesterday", "March 14"), depending on how far date is from now.
niceDateString(date: ArtTimeDate, now?: ArtTimeDate): string

// Returns a time string with detailed precision (e.g. "3:30:45 PM").
niceTimeDetailsString(date: ArtTimeDate): string

// Returns a relative time string (e.g. "5 minutes ago" or "in 2 hours"), optionally verbose or with custom precision.
timeAgo(date: ArtTimeDate, options?: HumanDurationOptions): string
```

## License

ISC
