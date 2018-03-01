const apiKeyStrategy = require('../strategies/api-key.strategy');
const ApiKeyModel = require('../database/models/api-key.model');

/**
 *
 */
class ApiKeyService {
  /**
   *
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
   *
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
