const passport = require('passport');
/**
 * This middleware validates authenticate user by header.
 */
module.exports = passport.authenticate('jwt', { session: false });
