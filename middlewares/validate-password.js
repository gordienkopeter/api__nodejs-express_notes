const validator = require('validator');

/**
 * This module validates password of request data
 *
 * @param {*} password
 */
module.exports = (password) => {
  if (password) {
    if (typeof password !== 'string') {
      return 'Password field must be string!';
    }

    if (!validator.isLength(password, { min: 6 })) {
      return 'Invalid password length. Min value must have 6 letter!';
    }

    return '';
  }

  return 'Field password is required!';
};
