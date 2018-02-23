const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./database');
const routes = require('./routes');
const passportJWTStategy = require('./services/jwt.service').passportJWTStategy;
const passport = require('passport');

require('dotenv').config();

/**
 * Passport uses jwt strategy.
 */
passport.use(passportJWTStategy);

/**
 * This class describes server with express framework.
 */

class Server {
  constructor() {
    this.db = DB;
    this.express = express();
  }

  /**
   *  This method uses for register routes into express application.
   */
  useRoutes() {
    this.express.use('/api', routes);
  }

  /**
   * This method runs server.
   */
  run() {
    const { PORT: port } = process.env;

    this.express.use(passport.initialize());
    this.express.use(bodyParser.json());
    this.useRoutes();
    this.express.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}

/**
 * If model not main server running.
 */
if (!module.parent) {
  return new Server().run();
}

module.exports = Server;
