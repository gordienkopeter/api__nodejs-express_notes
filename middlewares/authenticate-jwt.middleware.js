const passport = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

/**
 * This middleware validates authenticate user by header.
 */
module.exports = passport.authenticate('jwt', { session: false });
