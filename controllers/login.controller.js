const UserModel = require('../database/models/user.model');
const TokenModel = require('../database/models/token.model');
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
    // await user.setToken({ token });
    try {
      console.log(user.updateToken);
      console.log(await user.setToken({ token }));
    } catch (e) {
      console.log(e);
    }

    res.send({ token });
  }
}

module.exports = LoginController;
