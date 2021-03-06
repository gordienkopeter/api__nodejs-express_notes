const passport = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

/**
 * This middleware validates authenticate user by ApiKey header.
 */
module.exports = passport.authenticate('apiKey', { session: false });
