const regExp = /(\S+)\s+(\S+)/;

/**
 * This module parses authorization header and returns scheme (strategy) and access token
 *
 * @param {string} hdrValue
 */
const parseAuthorizationHeader = (hdrValue) => {
  if (typeof hdrValue !== 'string') {
    return null;
  }

  const [origin, scheme, value] = hdrValue.match(regExp) || [];

  return scheme && value && { scheme, value };
};

module.exports = parseAuthorizationHeader;
