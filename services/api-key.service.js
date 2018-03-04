const apiKeyStrategy = require('../strategies/api-key.strategy');
const ApiKeyModel = require('../database/models/api-key.model');

/**
 * This class describes api key auth by header
 */
class ApiKeyService {
  /**
   *This method generates random api key for user
   */
  static generateApiKey() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 16)
        .toUpperCase() +
      Math.random()
        .toString(36)
        .substring(1, 15)
        .toUpperCase() +
      Math.random()
        .toString(36)
        .substring(1, 15)
        .toUpperCase()
    );
  }

  /**
   * This method returns api key strategy.
   * Api key strategy uses Authorization header.
   *
   * @example {header} Authorization: ApiKey access token.
   */
  static get apiKeyStrategy() {
    return new apiKeyStrategy({}, async (apiKey, next) => {
      try {
        const apiKeyModel = await ApiKeyModel.findOne({ where: { apiKey } });
        const userModel = await apiKeyModel.getUser();

        next(null, userModel);
      } catch (e) {
        next(null, false);
      }
    });
  }
}

module.exports = ApiKeyService;
