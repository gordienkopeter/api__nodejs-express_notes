const router = require('express').Router();
const notesRoutes = require('./notes.routes');
const authRoutes = require('./auth.routes');
const AuthenticateMiddleware = require('../middlewares/authenticate.middleware');

/**
 * Registering api routes.
 */
router.use('/notes', [AuthenticateMiddleware], notesRoutes);
router.use('/auth', authRoutes);

module.exports = router;
