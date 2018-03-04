const passport = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

const defaultPassportParams = { session: false };
const fail = (res) => res.status(401).send('Unauthorized');
const SCHEMES = {
  JWT: 'jwt',
  BEARER: 'jwt',
  APIKEY: 'apiKey',
};

/**
 * This middleware validates authenticate user by header any strategy.
 */
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return fail(res);
  }

  const { scheme, value } = parseAuthHeader(authorization) || {};

  if (!scheme || !value) {
    return fail(res);
  }

  const schemeUppercase = scheme.toUpperCase();
  const usageScheme = SCHEMES[schemeUppercase];

  if (usageScheme) {
    return passport.authenticate(usageScheme, defaultPassportParams)(req, res, next);
  }

  return fail(res);
};
