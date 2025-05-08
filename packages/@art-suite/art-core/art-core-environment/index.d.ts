/** Returns the current environment variables/parameters. In browser, includes URL parameters and other location properties. In Node, returns process.env. */
export function getEnv(): Record<string, string>;

/** Returns true if running in a browser environment. */
export const isBrowser: boolean;

/** Returns true if running in a Web Worker environment. */
export const isWebWorker: boolean;

/** Returns true if running in a Node.js environment. */
export const isNode: boolean;
