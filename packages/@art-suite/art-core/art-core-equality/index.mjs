import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  gt,
  lt,
  gte,
  lte,
  eq,
  neq,
  fastEq,
  fastNeq,
  compare,
  plainObjectsDeepEq,
  plainObjectsDeepDiff,
  propsEq,
  diff,
  shallowEq,
} = require('./build');

