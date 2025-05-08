/**
 * Extracts an array of words from a string, intelligently handling various casing styles and separators.
 * @param str The input string.
 * @returns An array of strings representing the code words.
 */
export function getCodeWords(str: string): string[];

/**
 * Alias for `getCodeWords`.
 * Extracts an array of words from a string, intelligently handling various casing styles and separators.
 * @param str The input string.
 * @returns An array of strings representing the code words.
 */
export function codeWords(str: string): string[];

/**
 * Converts the entire string to lower case.
 * @param str The input string.
 * @returns The lower-cased string.
 */
export function lowerCase(str: string): string;

/**
 * Converts the entire string to upper case.
 * @param str The input string.
 * @returns The upper-cased string.
 */
export function upperCase(str: string): string;

/**
 * Capitalizes the first letter of the string.
 * @param str The input string.
 * @returns The string with its first letter capitalized.
 */
export function capitalize(str: string): string;

/**
 * Converts the first letter of the string to lower case.
 * @param str The input string.
 * @returns The string with its first letter in lower case.
 */
export function decapitalize(str: string): string;

/**
 * Gets codewords from the string and converts each to lower case.
 * @param str The input string.
 *         @returns An array of lower-cased code words.
 */
export function getLowerCaseCodeWords(str: string): string[];

/**
 * Gets codewords from the string and converts each to upper case.
 * @param str The input string.
 * @returns An array of upper-cased code words.
 */
export function getUpperCaseCodeWords(str: string): string[];

/**
 * Gets codewords from the string and capitalizes each one.
 * @param str The input string.
 * @returns An array of capitalized code words.
 */
export function getCapitalizedCodeWords(str: string): string[];

/**
 * Converts a string to `UpperCamelCase` (PascalCase) (e.g., `MyClassName`).
 * @param str The input string.
 * @returns The UpperCamelCased string.
 */
export function upperCamelCase(str: string): string;

/**
 * Converts a string to `lowerCamelCase` (e.g., `myVariableName`).
 * @param str The input string.
 * @returns The lowerCamelCased string.
 */
export function lowerCamelCase(str: string): string;

/**
 * Converts a string to `snake_case` (e.g., `my_variable_name`).
 * @param str The input string.
 * @returns The snake_cased string.
 */
export function snakeCase(str: string): string;

/**
 * Converts a string to `UPPER_SNAKE_CASE` (e.g., `MY_CONSTANT_NAME`).
 * @param str The input string.
 * @returns The UPPER_SNAKE_CASED string.
 */
export function upperSnakeCase(str: string): string;

/**
 * Converts a string to `dash-case` (kebab-case) (e.g., `my-css-class-name`).
 * @param str The input string.
 * @returns The dash-cased string.
 */
export function dashCase(str: string): string;

/**
 * Converts a string to `Capitalized-Dash-Case` (Train-Case) (e.g., `My-Http-Header`).
 * @param str The input string.
 * @returns The Capitalized-Dash-Cased string.
 */
export function capitalizedDashCase(str: string): string;