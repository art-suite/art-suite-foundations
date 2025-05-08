/**
 * Represents a parsed line from a stack trace.
 */
export interface CallStackLine {
  /** The original unparsed line from the stack trace */
  original: string;
  /** The function name if available */
  function?: string;
  /** The full source URL */
  source?: string;
  /** The class name if the function is a method */
  class?: string;
  /** The path to the class if nested */
  classPath?: string[];
  /** The source file name */
  sourceFileName?: string;
  /** The source path */
  sourcePath?: string;
  /** The source host and port */
  sourceHostWithPort?: string;
  /** The source line number */
  sourceLine: number;
  /** The source column number */
  sourceColumn: number;
  /** Returns the original stack trace line */
  toString(): string;
}

/** Returns an array of strings representing the raw stack trace lines. */
export function rawCallStack(ignoreTop?: number): string[];

/** Returns an array of CallStackLine objects representing the parsed stack trace. */
export function callStack(ignoreTop?: number): CallStackLine[];

/** The maximum number of stack frames to capture. Default is 10. */
export let stackTraceLimit: number;