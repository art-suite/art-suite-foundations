let g =
  (typeof global !== "undefined" ? global : undefined) ||
  (typeof window !== "undefined" ? window : undefined) ||
  (typeof self   !== "undefined" ? self   : undefined);

module.exports = g.global = g;