const validator = require('validator');
const Middleware = require('./middleware');

/**
 * This middleware validates registration data.
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const RegisterMiddleware = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  const errors = {};

  if (email) {
    if (!validator.isEmail(email)) {
      errors.email = 'Invalid email address!';
    }
  } else {
    errors.email = 'Field email is required!';
  }

  if (password) {
    if (!validator.isLength(password, { min: 6 })) {
      errors.password = 'Invalid password length. Min value must have 6 letter!';
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
