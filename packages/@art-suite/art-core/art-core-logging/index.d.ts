// Represents a parsed line from a stack trace.
export interface CallStackLine {
  original: string;
  function?: string;
  source?: string;
  class?: string;
  classPath?: string[];
  sourceFileName?: string;
  sourcePath?: string;
  sourceHostWithPort?: string;
  sourceLine: number;
  sourceColumn: number;
  toString(): string;
}

/** Options for the main log function and log.withOptions. */
export interface LogOptions {
  isError?: boolean;
  isWarning?: boolean;
  unquoted?: boolean;
  maxArrayLength?: number;
  maxObjectDepth?: number; // Or a more general depth option
  // Add any other specific options used by the logger
}

/** Interface for the logger function returned by log.withOptions. */
export interface ConfiguredLogFunction {
  (message?: any, ...optionalParams: any[]): void;
}

/** Interface for the main log object/function. */
export interface LogFunction {
  (message?: any, ...optionalParams: any[]): void;
  full: (message?: any, ...optionalParams: any[]) => void;
  withOptions: (options: LogOptions) => ConfiguredLogFunction;
  labeled: (...args: any[]) => void; // `args` might be [key, value, key, value...]
  unquoted: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
}

/** Log in a nice, human readable format. Returns the last value passed into it. */
export const log: LogFunction;

/** Enables logging output. */
export function showLogging(): void;

/** Disables logging output. */
export function hideLogging(): void;

/** Logs the resolution or rejection of a Promise. Returns rejected or resolved promise. */
export function logPromise<T>(promise: Promise<T>, label?: string): Promise<T>;

/** Logs only the problems (rejections) of a Promise. Returns the rejected promise. */
export function logRejectedPromises<T>(promise: Promise<T>, label?: string): Promise<T>; // Typically same as logPromiseProblems

/** Converts an error object or any value to a string representation. */
export function errorToString(error: any): string;

/** Returns an array of strings representing the raw stack trace lines. */
export function rawCallStack(ignoreTop?: number): string[];

/** Returns an array of CallStackLine objects representing the parsed stack trace. */
export function callStack(ignoreTop?: number): CallStackLine[];

/** Aligns text based on tab characters for more readable console output. */
export function alignTabs(text: string): string;

/** Options for inspection functions. */
export interface InspectOptions {
  maxArrayLength?: number;
  maxDepth?: number;
  unquoted?: boolean;
  // Add other common inspection options
}

/**
 * Inspects a value, attempting to produce a string representation without throwing errors.
 * Uses a shallow inspection if deep inspection fails.
 *
 * WILL NEVER FAIL OR THROW AN ERROR, though the logging might...
 */
export function failsafeInspect(value: any, options?: InspectOptions): string;

/** Provides a more detailed and formatted string representation of a value. */
export function formattedInspect(value: any, options?: InspectOptions): string;

/**
 * Represents a pre-formatted string that should not be further quoted or escaped by the logger.
 * Can be returned from an object's `toInspectedObjects()` method for custom logging output.
 */
export class InspectedObjectLiteral {
  public readonly literalValue: string;
  constructor(literalValue: string);
  toString(): string; // Usually returns literalValue
}

/** Factory function to create an InspectedObjectLiteral instance. */
export function inspectedObjectLiteral(value: string): InspectedObjectLiteral;

/**
 * A factory or utility function related to custom object inspection.
 * Objects can implement a `toInspectedObjects()` method which might return a string,
 * an InspectedObjectLiteral, or a plain object that this function might process.
 * The exact signature depends on its primary role: if it calls a method or transforms input.
 */
export function toInspectedObjects(value: any): string | InspectedObjectLiteral | object;

/** Options for postWhitespaceFormatting. */
export interface PostWhitespaceFormattingOptions {
  // Define any specific options for this function
}

/**
 * Applies post-processing whitespace formatting to a string.
 * (e.g., trimming, normalizing newlines, etc., based on options or default behavior).
 */
export function postWhitespaceFormatting(str: string, options?: PostWhitespaceFormattingOptions): string;