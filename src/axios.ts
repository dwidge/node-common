// compact errors with stack trace

import { NetworkError } from "./error.js";
import axios from "axios";

/**
 * @param {axios.AxiosRequestConfig<any>} config
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
export async function any(config) {
  try {
    return await axios(config);
  } catch (e) {
    throw new NetworkError(e);
  }
}

/**
 * @param {string} url
 * @param {axios.AxiosRequestConfig<any>} [config]
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
export async function get(url, config) {
  try {
    return await axios.get(url, config);
  } catch (e) {
    throw new NetworkError(e);
  }
}

/**
 * @param {string} url
 * @param {any} data
 * @param {axios.AxiosRequestConfig<any>} [config]
 * @returns {Promise<axios.AxiosResponse<any, any>>}
 */
export async function post(url, data, config) {
  try {
    return await axios.post(url, data, config);
  } catch (e) {
    throw new NetworkError(e);
  }
}
