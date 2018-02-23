require('dotenv').config();

const sqliteConfig = {};
const { DB_NAME: database, DB_USER_NAME: username, DB_USER_PASSWORD: password, DB_DIALECT: dialect } = process.env;

if (dialect === 'sqlite') {
  const { DB_STORAGE: storage } = process.env;

  if (!storage) {
    throw new Error('Sqlite dialect required storage');
  }

  sqliteConfig.storage = `.storage/${storage}`;
  sqliteConfig.logging = false;
}

module.exports = { database, username, password, dialect, ...sqliteConfig };
