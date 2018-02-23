const validator = require('validator');
const UserModel = require('../database/models/user.model');
const bcrypt = require('bcrypt');
const Middleware = require('./middleware');

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
  let user = null;

  try {
    user = await UserModel.findOne({ where: { email } });
  } catch (e) {
    return res.status(500).send(e);
  }

  if (!user) {
    errors.username = 'Invalid username value!';
  }

  if (user && !bcrypt.compare(password, user.password)) {
    errors.username = 'Passwords did not match';
  }

  if (Middleware.isErrors(errors)) {
    return Middleware.sendErrors(errors, res);
  }

  next();
};

module.exports = LoginMiddleware;
