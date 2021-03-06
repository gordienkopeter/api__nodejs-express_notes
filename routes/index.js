const router = require('express').Router();
const notesRoutes = require('./notes.routes');
const authRoutes = require('./auth.routes');
const apiKeyRoutes = require('./api-key.routes');
const AuthenticateJWTMiddleware = require('../middlewares/authenticate-jwt.middleware');
const AuthenticateMiddleware = require('../middlewares/authenticate.middleware');

/**
 * Registering api routes.
 */
router.use('/notes', [AuthenticateMiddleware], notesRoutes);
router.use('/api-key', [AuthenticateMiddleware], apiKeyRoutes);
router.use('/auth', authRoutes);

module.exports = router;
