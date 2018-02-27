const validator = require('validator');
const Middleware = require('./middleware');
const UserModel = require('../database/models/user.model');
const validateEmail = require('./validate-email');

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

  if (email) {
    if (typeof email !== 'string') {
      errors.email = 'Email field must be string!';
    } else if (!validator.isEmail(email)) {
      errors.email = 'Invalid email address!';
    } else if (await UserModel.findOne({ where: { email } })) {
      errors.email = 'Email is exists!';
    }
  } else {
    errors.email = 'Field email is required!';
  }

  if (password) {
    if (typeof password !== 'string') {
      errors.password = 'Password field must be string!';
    } else if (!validator.isLength(password, { min: 6 })) {
      errors.password =
        'Invalid password length. Min value must have 6 letter!';
    }
  } else {
    errors.password = 'Field password is required!';
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
