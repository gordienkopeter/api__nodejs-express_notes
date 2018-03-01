const UserModel = require('../database/models/user.model');
const ApiKeyModel = require('../database/models/api-key.model');
const ApiKeyService = require('../services/api-key.service');

class ApiKeyController {
  /**
   * This method generates update or create new api key for user.
   *
   * @param {*} req
   * @param {*} res
   * @example Request {
   * }
   * @example Response {
   * }
   */
  static async updateOrCreateApiKey(req, res) {
    const { user } = req;
    const newApiKey = ApiKeyService.generateApiKey();
    const apiKeyModel = await user.getApiKey();
    const data = { apiKey: newApiKey };

    if (apiKeyModel) {
      await apiKeyModel.update(data);
    } else {
      await ApiKeyModel.create({ ...data, userUuid: user.uuid });
    }

    return res.send(data);
  }
}

module.exports = ApiKeyController;
