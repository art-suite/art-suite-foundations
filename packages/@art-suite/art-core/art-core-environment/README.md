# @art-suite/art-core-environment

Provides one-stop access to the environment no matter if you are in node, the browser or a web-worker.

Also tells you which one of those you are currently on.

## Installation

```bash
npm install @art-suite/art-core-environment
```

## API

### getEnv(): Record<string, string>

Returns the current environment variables/parameters:

- In browser: Includes URL parameters and other location properties
- In Node.js: Returns process.env
- Returns an empty object if no environment is available

### isBrowser: boolean

Returns true if running in a browser environment (has window, navigator, and document).

### isWebWorker: boolean

Returns true if running in a Web Worker environment (has importScripts but not browser features).

### isNode: boolean

Returns true if running in a Node.js environment.

## Example

```javascript
import {
  getEnv,
  isBrowser,
  isWebWorker,
  isNode,
} from "@art-suite/art-core-environment";

// Get environment variables
const env = getEnv();

// Check environment
if (isBrowser) {
  // Browser-specific code
} else if (isWebWorker) {
  // Web Worker code
} else if (isNode) {
  // Node.js code
}
```
