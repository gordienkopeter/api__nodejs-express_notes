const passport = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

/**
 * This middleware validates authenticate user by header.
 */

const defaultPassportParams = { session: false };
const fail = res => res.status(401).send('Unauthorized');
const SHEMES = {
  JWT: 'jwt',
  BEARER: 'jwt',
  APIKEY: 'apiKey',
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return fail(res);
  }

  const { sheme, value } = parseAuthHeader(authorization) || {};

  if (!sheme || !value) {
    return fail(res);
  }

  const shemeUppercase = sheme.toUpperCase();
  const usageSheme = SHEMES[shemeUppercase];

  if (usageSheme) {
    return passport.authenticate(usageSheme, defaultPassportParams)(
      req,
      res,
      next
    );
  }

  return fail(res);
};
