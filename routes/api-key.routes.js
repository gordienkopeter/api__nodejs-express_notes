const apiKeyRouter = require('express').Router();
const ApiKeyController = require('../controllers/api-key.controller');

/**
 * Api key endpoint middleware list.
 */
//

/**
 * Api key endpoint list.
 */
apiKeyRouter.post('/', (req, res) => ApiKeyController.updateOrCreateApiKey(req, res));

module.exports = apiKeyRouter;
