const UserModel = require('../database/models/user.model');
const JWTService = require('../services/jwt.service');
const bcrypt = require('bcrypt');

require('dotenv').config();

const { USER_PASSWORD_SALT_ROUNDS: saltRounds = 10 } = process.env;

class RegisterController {
  /**
   * This method creates user and returns access token.
   *
   * @param {*} req
   * @param {*} res
   * @example Request {
   *   "email": "test@test.com",
   *   "password": "password",
   *   "firstName": "test",
   *   "lastName": "test"
   * }
   * @example Response {
   *   "token": "access token"
   * }
   */
  static async register(req, res) {
    const { email, password, firstName, lastName } = req.body;

    try {
      const passwordHash = await bcrypt.hash(password, +saltRounds);
      const user = await UserModel.create({ email, password: passwordHash, firstName, lastName });
      const token = JWTService.generateTokenByUser(user);

      res.send({ token });
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

module.exports = RegisterController;