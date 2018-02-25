const UserModel = require('../database/models/user.model');
const JWTService = require('../services/jwt.service');

class LoginController {
  /**
   * This method identifies user for API.
   *
   * @param {*} req
   * @param {*} res
   * @example Request {
   *   "email": "test@test.com",
   *   "password": "password"
   * }
   * @example Response {
   *   "token": "access token"
   * }
   */
  static async login(req, res) {
    const { body: { email, password } } = req;
    const user = await UserModel.findOne({ where: { email } });
    const token = JWTService.generateTokenByUser(user);

    res.send({ token });
  }
}

module.exports = LoginController;
