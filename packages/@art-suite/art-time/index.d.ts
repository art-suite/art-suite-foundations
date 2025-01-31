/**
 * Represents a point in time that can be specified in multiple formats.
 *
 * @typedef {Date | string | number | null | undefined} ArtTimeDate
 *
 * Valid inputs:
 * - Date: JavaScript Date object
 * - string: Any date string parseable by Date.parse()
 * - number: Epoch time in seconds OR milliseconds (automatically detected based on magnitude)
 * - null/undefined: Will be replaced with the current time
 *
 * Examples:
 * - new Date()           // JavaScript Date object
 * - "2024-03-14"        // ISO date string
 * - 1710374400          // Epoch seconds
 * - 1710374400000       // Epoch milliseconds
 * - null                // Current time
 * - undefined           // Current time
 */
export type ArtTimeDate = Date | string | number | null | undefined;

export interface LongTimeNames {
  readonly ms: 'millisecond';
  readonly s: 'second';
  readonly m: 'minute';
  readonly h: 'hour';
  readonly d: 'day';
  readonly mo: 'month';
  readonly y: 'year';
  readonly w: 'week';
}

export type NormalizedTimeNames = {
  [K in keyof LongTimeNames as LongTimeNames[K]]: K;
} & {
  [K in keyof LongTimeNames]: K;
};

export interface SecondsPer {
  readonly ms: number;
  readonly s: number;
  readonly m: number;
  readonly h: number;
  readonly d: number;
  readonly w: number;
  readonly mo: number;
  readonly y: number;
  readonly millisecond: number;
  readonly second: number;
  readonly minute: number;
  readonly hour: number;
  readonly day: number;
  readonly month: number;
  readonly year: number;
  readonly week: number;
}

export declare const normalizedTimeNames: NormalizedTimeNames;
export declare const longTimeNames: LongTimeNames;
export declare const secondsPer: SecondsPer;

export interface HumanDurationOptions {
  readonly verbose?: boolean;
  readonly precision?: number;
  readonly now?: ArtTimeDate;
}

/**
 * Gets the age of a date in seconds relative to now or a specified reference time
 * @param date The date to get the age of
 * @param now Optional reference time (defaults to current time)
 * @returns Number of seconds between the dates (positive if date is in the past)
 */
export declare const dateAgeInSeconds: (date: ArtTimeDate, now?: ArtTimeDate) => number;

/**
 * Converts a duration in seconds to a human-readable string
 * @param seconds Number of seconds
 * @param options Configuration options
 * @param options.verbose If true, uses full unit names (e.g. "2 minutes" vs "2m")
 * @param options.precision Maximum number of units to include
 * @param options.now Reference time for relative durations
 * @returns Formatted duration string (e.g. "2m 30s" or "2 minutes 30 seconds")
 */
export declare const humanDurationString: (seconds: number, options?: HumanDurationOptions) => string;

/**
 * Formats a date in a full, human-readable format
 * @param date The date to format
 * @returns Formatted string (e.g. "3:30pm March 14, 2024")
 */
export declare const niceFullDateString: (date: ArtTimeDate) => string;

/**
 * Formats a date showing just the month and year
 * @param date The date to format
 * @returns Formatted string (e.g. "March 2024")
 */
export declare const niceMonthYear: (date: ArtTimeDate) => string;

/**
 * Formats a date in a context-aware format, showing different levels of detail based on the date's age
 * @param date The date to format
 * @param now Optional reference time (defaults to current time)
 * @returns Formatted string (e.g. "just now", "2 hours ago", "yesterday", "March 14")
 */
export declare const niceDateString: (date: ArtTimeDate, now?: ArtTimeDate) => string;

/**
 * Formats the time portion of a date with detailed precision
 * @param date The date to format
 * @returns Formatted string (e.g. "3:30:45 PM")
 */
export declare const niceTimeDetailsString: (date: ArtTimeDate) => string;

/**
 * Formats a date as a relative time string
 * @param date The date to format
 * @param options Configuration options
 * @param options.verbose If true, uses full unit names
 * @param options.precision Maximum number of units to include
 * @param options.now Reference time for the relative duration
 * @returns Formatted string (e.g. "2 hours ago", "in 5 minutes")
 */
export declare const timeAgo: (date: ArtTimeDate, options?: HumanDurationOptions) => string;