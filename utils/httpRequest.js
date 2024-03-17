const axios = require('axios');

/**
 * A utility function to perform HTTP GET requests.
 * @param {string} url - The URL to fetch data from.
 * @param {Object} headers - Optional headers to include in the request.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 */
async function httpGetRequest(url, headers = {}) {
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error.message);
    throw error;
  }
}

module.exports = {
  httpGetRequest,
};
