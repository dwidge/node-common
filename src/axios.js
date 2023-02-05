// compact errors with stack trace

const { NetworkError } = require("./error");
const axios = require("axios");

/**
 * @param {axios.AxiosRequestConfig<any>} config
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
async function any(config) {
  try {
    return await axios(config);
  } catch (e) {
    throw new NetworkError(e);
  }
}
module.exports = any;

/**
 * @param {string} url
 * @param {axios.AxiosRequestConfig<any>} [config]
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
async function get(url, config) {
  try {
    return await axios.get(url, config);
  } catch (e) {
    throw new NetworkError(e);
  }
}
module.exports.get = get;

/**
 * @param {string} url
 * @param {any} data
 * @param {axios.AxiosRequestConfig<any>} [config]
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
async function post(url, data, config) {
  try {
    return await axios.post(url, data, config);
  } catch (e) {
    throw new NetworkError(e);
  }
}
module.exports.post = post;
