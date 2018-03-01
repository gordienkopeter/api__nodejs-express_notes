const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const TokenModel = require('../database/models/token.model');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

/**
 * Initial jwt auth by header.
 */
const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

require('dotenv').config();

const { JWT_SECRET: secretOrKey } = process.env;

/**
 * This service describes jwt strategy.
 */
class JWTService {
  /**
   * This method generates access token by user model.
   *
   * @param {*} userModel
   */
  static generateTokenByUser(userModel) {
    if (!userModel) {
      return false;
    }

    const { uuid } = userModel;

    return jwt.sign({ uuid }, secretOrKey);
  }

  /**
   * This method returns jwr strategy.
   * Jwt strategy uses Authorization header.
   *
   * @example {header} Authorization: JWT access token.
   */
  static get JWTStategy() {
    return new JwtStrategy(
      { jwtFromRequest, secretOrKey, passReqToCallback: true },
      async (req, jwtPayload, next) => {
        const { uuid } = jwtPayload;
        const token = jwtFromRequest(req);

        try {
          const tokenModel = await TokenModel.findOne({ where: { token } });
          const userModel = await tokenModel.getUser();

          next(null, userModel && userModel.uuid === uuid ? userModel : false);
        } catch (e) {
          next(null, false);
        }
      }
    );
  }
}

module.exports = JWTService;
