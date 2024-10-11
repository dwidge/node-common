const randInt = (max) => (Math.random() * max) | 0;

/**
 * Converts date object to unix seconds
 *
 * @param {Date} d Date object
 * @returns {Number} Unix timestamp in seconds
 */
export const unixFromDate = (d) => Math.floor(d.getTime() / 1000);

/**
 * Generates random timestamp in ms
 *
 * @param {Number} from Timestamp reference in ms
 * @param {Number} days Max days after from, or before if negative
 * @returns {Number} Timestamp in ms
 */
export const randTimeMs = (from = Date.now(), days = 360) =>
  from + randInt(days * 24 * 60 * 60 * 1000);
