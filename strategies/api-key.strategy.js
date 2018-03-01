const { Strategy } = require('passport');
const parseAuthHeader = require('../utils/parse-authorization-header.utils');

const AUTH_HEADER = 'authorization';
const HEADER_AUTH_SCHEME = 'ApiKey';

class ApiKeyStrategy extends Strategy {
  constructor(options = {}, verify) {
    super();

    this.name = 'apiKey';

    switch (!!options && options.constructor) {
      case Function:
        this._verify = options;
        this._includeReq = false;

        break;
      case Object:
        this._verify = verify;
        this._includeReq = (options && options.includeRequest) || false;

        break;
      default:
        this._verify = verify;
        this._includeReq = false;
    }

    if (!this._verify) {
      throw new TypeError('ApiKey strategy requires a verify callback');
    }
  }

  authenticate(req, options = {}) {
    const authHeader = req.headers[AUTH_HEADER];

    if (!authHeader) {
      return this.fail(new Error(`No ${AUTH_HEADER} header`));
    }

    const { sheme, value } = parseAuthHeader(authHeader) || {};

    if (!sheme || !value) {
      return this.fail(new Error(`No ${HEADER_AUTH_SCHEME} token`));
    }

    const verified = (err, user, info) => {
      if (err) {
        return this.error(err);
      }

      if (!user) {
        return this.fail(info);
      }

      this.success(user, info);
    };

    try {
      if (this._includeReq) {
        this._verify(req, value, verified);
      } else {
        this._verify(value, verified);
      }
    } catch (e) {
      this.error(e);
    }
  }
}

module.exports = ApiKeyStrategy;
