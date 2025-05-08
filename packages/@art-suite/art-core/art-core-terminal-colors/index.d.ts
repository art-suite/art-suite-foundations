/** A regular expression to match ANSI escape codes. */
export const ansiRegex: RegExp;

/** Removes all ANSI escape codes from a string. */
export function stripAnsi(str: string): string;

/** Calculates the visual length of a string, ignoring ANSI escape codes. */
export function ansiSafeStringLength(str: string): number;

/** Resets all current styling. */
export function reset(str: string): string;

/** Makes text bold. */
export function bold(str: string): string;

/** Makes text dim (decreased intensity). */
export function dim(str: string): string;

/** Makes text italic. */
export function italic(str: string): string;

/** Underlines text. */
export function underline(str: string): string;

/** Inverts foreground and background colors. */
export function inverse(str: string): string;

/** Makes text hidden (invisible). */
export function hidden(str: string): string;

/** Applies strikethrough to text. */
export function strikethrough(str: string): string;

// Foreground Colors
export function black(str: string): string;
export function red(str: string): string;
export function green(str: string): string;
export function yellow(str: string): string;
export function blue(str: string): string;
export function magenta(str: string): string;
export function cyan(str: string): string;
export function white(str: string): string;
export function grey(str: string): string;

// Bright Foreground Colors
export function redBright(str: string): string;
export function greenBright(str: string): string;
export function yellowBright(str: string): string;
export function blueBright(str: string): string;
export function magentaBright(str: string): string;
export function cyanBright(str: string): string;
export function whiteBright(str: string): string;

// Background Colors
export function bgBlack(str: string): string;
export function bgRed(str: string): string;
export function bgGreen(str: string): string;
export function bgYellow(str: string): string;
export function bgBlue(str: string): string;
export function bgMagenta(str: string): string;
export function bgCyan(str: string): string;
export function bgWhite(str: string): string;
export function bgGrey(str: string): string;

// Bright Background Colors
export function bgRedBright(str: string): string;
export function bgGreenBright(str: string): string;
export function bgYellowBright(str: string): string;
export function bgBlueBright(str: string): string;
export function bgMagentaBright(str: string): string;
export function bgCyanBright(str: string): string;
export function bgWhiteBright(str: string): string;