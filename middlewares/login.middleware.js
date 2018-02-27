const validator = require('validator');
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const Middleware = require('./middleware');
const validateEmail = require('./validate-email');
const validatePassword = require('./validate-password');

/**
 * This middleware validates login request data.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const LoginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};
  const user = await UserModel.findOne({ where: { email } });

  const checkEmail = validateEmail(email);
  const checkPassword = validatePassword(password);

  if (checkEmail) {
    errors.email = checkEmail;
  } else if (!user) {
    errors.email = 'Email is not exists!';
  }

  if (checkPassword) {
    errors.password = checkPassword;
  } else if (user && !await bcrypt.compare(password, user.password)) {
    errors.password = 'Passwords did not match!';
  }

  if (Middleware.isErrors(errors)) {
    return Middleware.sendErrors(errors, res);
  }

  next();
};

module.exports = LoginMiddleware;
