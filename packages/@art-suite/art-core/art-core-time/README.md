# @art-suite/art-core-time

A comprehensive JavaScript library for time and date manipulation, formatting, and calculations. Provides utilities for easy conversion between units, finding specific date boundaries, and generating human-readable time strings.

## Features

- Flexible date and time formatting (`formatDate`).
- Easy conversion to milliseconds, seconds, and Date objects.
- Functions to find the start of various time periods (hour, day, week, month, year), with locale support.
- Human-readable duration and time delta strings (`humanDurationString`, `humanTimeDeltaString`, `timeAgo`).
- A variety of "nice" date and time string formatters.
- Utilities for calculating date age and accessing current time components.
- TypeScript definitions for complete type safety.

## Installation

```bash
npm install @art-suite/art-core-time
```

## API Overview

### Formatting

- **`formatDate(date?: Date | number | string, formatString?: string): string`**: Formats a date according to a given format string.
- **`humanDurationString(durationInSeconds: number, options?: object): string`**: Converts a duration in seconds to a human-readable string (e.g., "1 hour 30 minutes").
- **`humanTimeDeltaString(fromTime: Date | number, toTime?: Date | number, options?: object): string`**: Returns a human-readable string representing the time difference between two dates.
- **`niceFullDateString(date?: Date | number | string): string`**: Formats a date into a nice, full string (e.g., "January 1, 2023").
- **`niceMonthYear(date?: Date | number | string): string`**: Formats a date into a "Month Year" string (e.g., "January 2023").
- **`niceDateString(date?: Date | number | string): string`**: Formats a date into a nice, concise date string.
- **`niceTimeDetailsString(date?: Date | number | string): string`**: Formats a date into a string with detailed time information.
- **`timeAgo(date: Date | number | string, now?: Date | number): string`**: Returns a string representing how long ago a date was (e.g., "5 minutes ago").

### Conversions

- **`toMilliseconds(value: any, unit?: string): number`**: Converts a time value from various units (like seconds, minutes, custom strings) to milliseconds.
- **`toSeconds(value: any, unit?: string): number`**: Converts a time value to seconds.
- **`toDate(value?: Date | number | string): Date`**: Converts a value (timestamp, string) to a Date object.

### Date Boundary Calculations (Default/UTC)

- **`firstOfHour(date?: Date | number | string): Date`**: Returns a Date object set to the beginning of the hour for the given date.
- **`firstOfDay(date?: Date | number | string): Date`**: Returns a Date object set to the beginning of the day (midnight).
- **`firstOfWeek(date?: Date | number | string, firstDayOfWeek?: number): Date`**: Returns a Date object set to the beginning of the week.
- **`firstOfMonth(date?: Date | number | string): Date`**: Returns a Date object set to the beginning of the month.
- **`firstOfYear(date?: Date | number | string): Date`**: Returns a Date object set to the beginning of the year.

### Date Boundary Calculations (Locale-Aware)

- **`firstOfDayLocale(date?: Date | number | string): Date`**: Beginning of the day, respecting local timezone.
- **`firstOfWeekLocale(date?: Date | number | string, firstDayOfWeek?: number): Date`**: Beginning of the week, respecting local conventions.
- **`firstOfMonthLocale(date?: Date | number | string): Date`**: Beginning of the month, respecting local timezone.
- **`firstOfYearLocale(date?: Date | number | string): Date`**: Beginning of the year, respecting local timezone.

### Time Constants & Names

- **`normalizedTimeNames: Record<string, string>`**: A map of common time unit names to a normalized form (e.g., `{ second: "s", minute: "m" }`).
- **`longTimeNames: Record<string, string>`**: A map of normalized time unit names to their long forms (e.g., `{ s: "second", m: "minute" }`).
- **`secondsPer: Record<string, number>`**: A map defining the number of seconds per time unit (e.g., `{ minute: 60, hour: 3600 }`).

### Other Time Utilities

- **`dateAgeInSeconds(date: Date | number | string): number`**: Calculates the age of a date in seconds from now.
- **`time(): number`**: Returns the current time (typically as a Unix timestamp in milliseconds or seconds - to be clarified by implementation).
- **`currentSecond(): number`**: Returns the current second of the minute (0-59) or potentially seconds since epoch.

## Examples

### Formatting Dates

```typescript
import {
  formatDate,
  niceFullDateString,
  timeAgo,
} from "@art-suite/art-core-time";

const now = new Date();
console.log(formatDate(now, "YYYY-MM-DD HH:mm:ss")); // e.g., "2023-10-27 14:30:00"
console.log(niceFullDateString(now)); // e.g., "October 27, 2023"

const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
console.log(timeAgo(fiveMinutesAgo)); // "5 minutes ago"
```

### Time Conversions

```typescript
import { toMilliseconds, toDate } from "@art-suite/art-core-time";

console.log(toMilliseconds("5m")); // 300000 (5 minutes in milliseconds)
console.log(toMilliseconds(1, "hour")); // 3600000

const timestamp = 1672531200000; // Jan 1, 2023 UTC
console.log(toDate(timestamp).toUTCString()); // "Sun, 01 Jan 2023 00:00:00 GMT"
```

### Date Boundaries

```typescript
import { firstOfDay, firstOfMonthLocale } from "@art-suite/art-core-time";

const date = new Date("2023-10-27T15:45:00Z");
console.log(firstOfDay(date).toISOString()); // "2023-10-27T00:00:00.000Z"
console.log(firstOfMonthLocale(date).toString()); // Shows beginning of Oct in local time
```

## License

MIT
