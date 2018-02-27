const validator = require('validator');
const Middleware = require('./middleware');
const UserModel = require('../database/models/user.model');
const validateEmail = require('./validate-email');
const validatePassword = require('./validate-password');

/**
 * This middleware validates registration data.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const RegisterMiddleware = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const errors = {};

  const checkEmail = validateEmail(email);
  const checkPassword = validatePassword(password);

  if (checkEmail) {
    errors.email = checkEmail;
  } else if (await UserModel.findOne({ where: { email } })) {
    errors.email = 'Email is exists!';
  }

  if (checkPassword) {
    errors.password = checkPassword;
  }

  if (!firstName) {
    errors.firstName = 'Field firstName is required!';
  }

  if (!lastName) {
    errors.lastName = 'Field firstName is required!';
  }

  if (Middleware.isErrors(errors)) {
    return Middleware.sendErrors(errors, res);
  }

  next();
};

module.exports = RegisterMiddleware;
