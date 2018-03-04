const passport = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

/**
 * This middleware validates authenticate user by JWT header.
 */
module.exports = passport.authenticate('jwt', { session: false });
