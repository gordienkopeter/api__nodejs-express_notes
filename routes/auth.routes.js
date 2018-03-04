const authRouter = require('express').Router();
const RegisterController = require('../controllers/register.controller');
const LoginController = require('../controllers/login.controller');
const RegisterMiddleware = require('../middlewares/register.middleware');
const LoginMiddleware = require('../middlewares/login.middleware');
const AuthenticateMiddleware = require('../middlewares/authenticate.middleware');

/**
 * Auth endpoint middleware list.
 */
authRouter.post('/register', (req, res, next) => RegisterMiddleware(req, res, next));
authRouter.post('/login', (req, res, next) => LoginMiddleware(req, res, next));
authRouter.get('/verify', AuthenticateMiddleware);

/**
 * Auth endpoint list.
 */
authRouter.post('/register', (req, res) => RegisterController.register(req, res));
authRouter.post('/login', (req, res) => LoginController.login(req, res));
authRouter.get('/verify', (req, res) =>
  res.json({
    status: 'ok',
    message: 'Your token verified successfully.',
  })
);

module.exports = authRouter;
