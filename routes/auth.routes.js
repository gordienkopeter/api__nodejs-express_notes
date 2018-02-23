const authRouter = require('express').Router();
const RegisterController = require('../controllers/register.controller');
const LoginController = require('../controllers/login.controller');
const RegisterMiddleware = require('../middlewares/register.middleware');
const LoginMiddleware = require('../middlewares/login.middleware');

/**
 * Auth endpoint middleware list.
 */
authRouter.post('/register', (req, res, next) => RegisterMiddleware(req, res, next));
authRouter.post('/login', (req, res, next) => LoginMiddleware(req, res, next));

/**
 * Auth endpoint list.
 */
authRouter.post('/register', (req, res) => RegisterController.register(req, res));
authRouter.post('/login', (req, res) => LoginController.login(req, res));

module.exports = authRouter;
