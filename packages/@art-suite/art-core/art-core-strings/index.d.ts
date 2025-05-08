/** Joins elements of an array (after compacting and flattening) with a specified joiner string. */
export function compactFlattenJoin(array: any[], joiner?: string): string;

/** A string containing all base62 characters (0-9, a-z, A-Z). */
export const base62Characters: string;

/** Generates a random string of a specified length. */
export function randomString(length: number, characters?: string): string;

/** Generates a cryptographically secure random string. */
export function cryptoRandomString(length: number, characters?: string): string;

/** Generates a single random base62 character. */
export function randomBase62Character(): string;

/** Replaces the last occurrence of a substring within a string. */
export function replaceLast(source: string, find: string, replace: string): string;

/** Generates a padding string of a specified length. */
export function getPadding(length: number, character?: string): string;

/** Pads a string to a certain length with a specified character. */
export function pad(str: string, length: number, character?: string, alignLeft?: boolean): string;

/** Escapes a string for safe use as a JavaScript string literal. */
export function escapeJavascriptString(str: string): string;

/** Finds all occurrences of a substring and returns their indexes. */
export function allIndexes(source: string, find: string): number[];

/** Iterates over all matches of a regular expression in a string, invoking a callback for each match. */
export function eachMatch(str: string, regex: RegExp, callback: (match: RegExpExecArray) => void): void;

/** Converts a value to a JavaScript string representation, with options for indentation and handling functions/undefined. */
export function jsStringify(value: any, indent?: number | string, includeFunctions?: boolean, includeUndefined?: boolean): string;

/** Stringifies an object with sorted keys to ensure consistent output. */
export function consistentJsonStringify(obj: any): string;

/** Shortens a string to a maximum length, adding a separator (e.g., ellipsis) if shortened. */
export function humanFriendlyShorten(str: string, maxLength?: number, separator?: string): string;

/** Removes trailing whitespace from a string. */
export function stripTrailingWhitespace(str: string): string;

/** Checks if two URLs have the same origin. */
export function sameOrigin(url1: string, url2: string): boolean;

/** Parses a URL query string into an object of key-value pairs. */
export function parseQuery(queryString: string): Record<string, string | string[]>;

/** Generates a URL query string from an object of parameters. */
export function generateQuery(params: Record<string, any>): string;

/** Joins multiple URL segments into a single URL. */
export function urlJoin(...parts: string[]): string;

/** Resolves a sequence of URL segments into an absolute URL. */
export function urlResolve(...parts: string[]): string;

/** Appends query parameters to a URL. */
export function appendQuery(url: string, query: string | Record<string, any>): string;

/** Parses a URL string into an object containing its components. */
export function parseUrl(url: string): ParsedUrl;

export interface ParsedUrl {
  href: string;
  protocol?: string;
  slashes?: boolean;
  host?: string;
  auth?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  path?: string; // pathname + search
  search?: string; // querystring including leading `?`
  query?: string | Record<string, string | string[]>; // parsed querystring or original string
  hash?: string; // fragment including leading `#`
  [key: string]: any; // Allow for other properties from url.parse
}

/** Escapes special characters in a string for use in a regular expression. */
export function escapeRegExp(str: string): string;
export function escapeRegexp(str: string): string; // Alias
export function escapeRegex(str: string): string; // Alias

/** Extracts the origin (protocol, hostname, port) from a URL string. */
export function findUrlOrigin(url: string): string | undefined;

/** Normalizes a URL string (e.g., sorts query parameters, decodes components). */
export function normalizeUrl(url: string): string;

/** Returns the plural form of an English word. */
export function plural(word: string, count?: number): string;

/** Returns the singular form of an English word. */
export function singular(word: string): string;

/** Checks if a word is in its singular form. */
export function isSingular(word: string): boolean;

/** Checks if a word is in its plural form. */
export function isPlural(word: string): boolean;

/** Adds a custom rule for pluralization and singularization. */
export function addPluralizeRule(singular: string | RegExp, plural: string | ((match: string, count: number) => string)): void;

/**
 * More comprehensive pluralization. Converts a word to its plural form.
 * If count is provided and not 1, returns plural. If inclusive is true, prepends count.
 */
export function pluralize(word: string, count?: number, inclusive?: boolean): string;

// Regular Expressions (exporting all specified variations)
export const findUrlProtocolRegExp: RegExp;
export const findUrlProtocolRegexp: RegExp;
export const findUrlProtocolRegex: RegExp;

export const findDomainRegExp: RegExp;
export const findDomainRegexp: RegExp;
export const findDomainRegex: RegExp;

export const urlQueryParamsRegExp: RegExp;
export const urlQueryParamsRegexp: RegExp;
export const urlQueryParamsRegex: RegExp;

export const findLegalUrlCharacterRegExp: RegExp;
export const findLegalUrlCharacterRegexp: RegExp;
export const findLegalUrlCharacterRegex: RegExp;

export const findUrlPathRegExp: RegExp;
export const findUrlPathRegexp: RegExp;
export const findUrlPathRegex: RegExp;

export const findUrlPortRegExp: RegExp;
export const findUrlPortRegexp: RegExp;
export const findUrlPortRegex: RegExp;

export const findUrlFragmentRegExp: RegExp;
export const findUrlFragmentRegexp: RegExp;
export const findUrlFragmentRegex: RegExp;

export const findEmailLocalRegExp: RegExp;
export const findEmailLocalRegexp: RegExp;
export const findEmailLocalRegex: RegExp;

export const findEmailRegExp: RegExp;
export const findEmailRegexp: RegExp;
export const findEmailRegex: RegExp;

export const emailRegExp: RegExp;
export const emailRegexp: RegExp;
export const emailRegex: RegExp;

export const numberRegExp: RegExp;
export const numberRegexp: RegExp;
export const numberRegex: RegExp;

export const urlProtocolRegExp: RegExp;
export const urlProtocolRegexp: RegExp;
export const urlProtocolRegex: RegExp;

export const domainRegExp: RegExp;
export const domainRegexp: RegExp;
export const domainRegex: RegExp;

export const urlPathRegExp: RegExp;
export const urlPathRegexp: RegExp;
export const urlPathRegex: RegExp;

export const urlQueryRegExp: RegExp;
export const urlQueryRegexp: RegExp;
export const urlQueryRegex: RegExp;

export const isoDateRegExp: RegExp;
export const isoDateRegexp: RegExp;
export const isoDateRegex: RegExp;

export const hex16GreyColorRegExp: RegExp;
export const hex16GreyColorRegexp: RegExp;
export const hex16GreyColorRegex: RegExp;

export const hex256GreyColorRegExp: RegExp;
export const hex256GreyColorRegexp: RegExp;
export const hex256GreyColorRegex: RegExp;

export const hex16ColorRegExp: RegExp;
export const hex16ColorRegexp: RegExp;
export const hex16ColorRegex: RegExp;

export const hex256ColorRegExp: RegExp;
export const hex256ColorRegexp: RegExp;
export const hex256ColorRegex: RegExp;

export const rgbColorRegExp: RegExp;
export const rgbColorRegexp: RegExp;
export const rgbColorRegex: RegExp;

export const rgbaColorRegExp: RegExp;
export const rgbaColorRegexp: RegExp;
export const rgbaColorRegex: RegExp;

export const findColorRegExp: RegExp;
export const findColorRegexp: RegExp;
export const findColorRegex: RegExp;

export const colorRegExp: RegExp;
export const colorRegexp: RegExp;
export const colorRegex: RegExp;

export const wordsRegExp: RegExp;
export const wordsRegexp: RegExp;
export const wordsRegex: RegExp;

export const exactlyOneWordRegExp: RegExp;
export const exactlyOneWordRegexp: RegExp;
export const exactlyOneWordRegex: RegExp;

export const findUrlRegExp: RegExp;
export const findUrlRegexp: RegExp;
export const findUrlRegex: RegExp;

export const findUrlWithOptionalProtocolRegExp: RegExp;
export const findUrlWithOptionalProtocolRegexp: RegExp;
export const findUrlWithOptionalProtocolRegex: RegExp;

export const findAllUrlsRegExp: RegExp;
export const findAllUrlsRegexp: RegExp;
export const findAllUrlsRegex: RegExp;

export const findAllUrlsWithOptionalProtocolRegExp: RegExp;
export const findAllUrlsWithOptionalProtocolRegexp: RegExp;
export const findAllUrlsWithOptionalProtocolRegex: RegExp;

export const findSourceReferenceUrlRegExp: RegExp;
export const findSourceReferenceUrlRegexp: RegExp;
export const findSourceReferenceUrlRegex: RegExp;

export const urlRegExp: RegExp;
export const urlRegexp: RegExp;
export const urlRegex: RegExp;

export const urlWithOptionalProtocolRegExp: RegExp;
export const urlWithOptionalProtocolRegexp: RegExp;
export const urlWithOptionalProtocolRegex: RegExp;