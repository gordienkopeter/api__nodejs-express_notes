const validator = require('validator');

module.exports = email => {
  if (email) {
    if (typeof email !== 'string') {
      return 'Email field must be string!';
    }
    if (!validator.isEmail(email)) {
      return 'Invalid email address!';
    }

    return null;
  }

  return 'Field email is required!';
};
