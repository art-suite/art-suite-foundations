export type DateResolvable = Date | number | string;

/** Options for humanDurationString. */
export interface HumanDurationStringOptions {
  compact?: boolean;
  maxFields?: number;
  joiner?: string;
  spacer?: string;
  and?: string;
  // Add other potential options here based on implementation
}

/** Options for humanTimeDeltaString. */
export interface HumanTimeDeltaStringOptions extends HumanDurationStringOptions {
  nowText?: string;
  // Add other potential options here
}

/**
 * Formats a date according to a given format string.
 * Common format tokens: YYYY, MM, DD, HH, mm, ss, etc.
 * @param date The date to format. Defaults to now.
 * @param formatString The string defining the output format.
 */
export function formatDate(date?: DateResolvable, formatString?: string): string;

/**
 * Converts a time value from various units (like seconds, minutes, or strings like "5m") to milliseconds.
 * @param value The value to convert.
 * @param unit Optional unit if value is a number (e.g., "seconds", "minutes", "hours", "days", "weeks").
 */
export function toMilliseconds(value: number | string, unit?: string): number;

/**
 * Converts a time value from various units to seconds.
 * @param value The value to convert.
 * @param unit Optional unit if value is a number.
 */
export function toSeconds(value: number | string, unit?: string): number;

/**
 * Converts a value (timestamp, string, or Date object) to a Date object.
 * @param value The value to convert. Defaults to now if undefined.
 */
export function toDate(value?: DateResolvable): Date;

/** Returns a Date object set to the beginning of the hour for the given date (UTC). */
export function firstOfHour(date?: DateResolvable): Date;

/** Returns a Date object set to the beginning of the day (midnight UTC). */
export function firstOfDay(date?: DateResolvable): Date;

/**
 * Returns a Date object set to the beginning of the week (UTC).
 * @param date The reference date.
 * @param firstDayOfWeek Optional: 0 for Sunday (default), 1 for Monday, etc.
 */
export function firstOfWeek(date?: DateResolvable, firstDayOfWeek?: number): Date;

/** Returns a Date object set to the beginning of the month (UTC). */
export function firstOfMonth(date?: DateResolvable): Date;

/** Returns a Date object set to the beginning of the year (UTC). */
export function firstOfYear(date?: DateResolvable): Date;

/** Returns a Date object set to the beginning of the day, respecting local timezone. */
export function firstOfDayLocale(date?: DateResolvable): Date;

/**
 * Returns a Date object set to the beginning of the week, respecting local conventions.
 * @param date The reference date.
 * @param firstDayOfWeek Optional: 0 for Sunday (default in some locales), 1 for Monday, etc. Locale default might be used if undefined.
 */
export function firstOfWeekLocale(date?: DateResolvable, firstDayOfWeek?: number): Date;

/** Returns a Date object set to the beginning of the month, respecting local timezone. */
export function firstOfMonthLocale(date?: DateResolvable): Date;

/** Returns a Date object set to the beginning of the year, respecting local timezone. */
export function firstOfYearLocale(date?: DateResolvable): Date;

/** A map of common time unit names to a normalized form (e.g., { second: "s", minute: "m" }). */
export const normalizedTimeNames: Record<string, string>;

/** A map of normalized time unit names to their long forms (e.g., { s: "second", m: "minute" }). */
export const longTimeNames: Record<string, string>;

/**
 * A map defining the number of seconds per time unit.
 * Includes short forms (e.g., "s", "m", "h") and long forms (e.g., "second", "minute", "hour").
 */
export const secondsPer: Readonly<{
  ns: number;          // nanosecond
  μs: number;          // microsecond
  ms: number;          // millisecond
  s: number;           // second
  m: number;           // minute
  h: number;           // hour
  d: number;           // day
  w: number;           // week
  mo: number;          // month (average)
  y: number;           // year (average)
  millisecond: number;
  second: number;
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;       // month (average)
  year: number;        // year (average)
}>;

/** Calculates the age of a date in seconds from the current time. */
export function dateAgeInSeconds(date: DateResolvable): number;

/**
 * Converts a duration in seconds to a human-readable string (e.g., "1 hour 30 minutes", "2 days").
 * @param durationInSeconds The duration to format.
 * @param options Formatting options.
 */
export function humanDurationString(durationInSeconds: number, options?: HumanDurationStringOptions): string;

/**
 * Returns a human-readable string representing the time difference between two dates.
 * @param fromTime The start date/time.
 * @param toTime The end date/time (defaults to now).
 * @param options Formatting options.
 */
export function humanTimeDeltaString(fromTime: DateResolvable, toTime?: DateResolvable, options?: HumanTimeDeltaStringOptions): string;

/** Formats a date into a nice, full string (e.g., "January 1, 2023"). */
export function niceFullDateString(date?: DateResolvable): string;

/** Formats a date into a "Month Year" string (e.g., "January 2023"). */
export function niceMonthYear(date?: DateResolvable): string;

/** Formats a date into a nice, concise date string (e.g., "Jan 1, 2023" or "1/1/23"). */
export function niceDateString(date?: DateResolvable): string;

/** Formats a date into a string with detailed time information (e.g., "Jan 1, 2023, 12:00 PM"). */
export function niceTimeDetailsString(date?: DateResolvable): string;

/**
 * Returns a string representing how long ago a date was relative to now (e.g., "5 minutes ago", "2 hours ago").
 * @param date The past date.
 * @param now Optional reference point for "now", defaults to the current time.
 */
export function timeAgo(date: DateResolvable, now?: DateResolvable): string;

/**
 * Returns the current time. The exact nature (e.g., timestamp in ms, timestamp in s, or a Date object)
 * should be clarified by the implementation. Assuming timestamp in milliseconds for now based on common JS usage.
 */
export function time(): number;

/**
 * Returns the current second of the minute (0-59) or potentially seconds since epoch.
 * Assuming current second of the minute for now.
 */
export function currentSecond(): number;