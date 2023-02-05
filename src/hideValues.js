const mapValuesDeep = require("map-values-deep");

const hide = (s) => (s == null ? s : "*".repeat(s?.length || 1));
const test = (pat, s) => pat.test?.(s) ?? s.includes?.(pat);

const hideKeys = (keys) => (value, key) =>
  keys.some((k) => test(k, key.toLowerCase())) ? hide(value) : value;

const hideValues = (obj, keys = ["pass", "key", "secret"]) =>
  mapValuesDeep(obj, hideKeys(keys));

module.exports = hideValues;
