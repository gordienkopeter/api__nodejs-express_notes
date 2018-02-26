const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const TokenModel = require('../database/models/user.model');

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
  static get passportJWTStategy() {
    return new JwtStrategy({ jwtFromRequest, secretOrKey }, async (req, jwtPayload, next) => {
      // const { uuid } = jwtPayload;
      // const {} = req
      console.log(req);

      try {
        next(null, await UserModel.findById(uuid));
      } catch (e) {
        next(null, false);
      }
    });
  }
}

module.exports = JWTService;
