require('dotenv').config();

const { NODE_ENV } = process.env;

const sqliteConfig = {};
const {
  [`${NODE_ENV}_DB_NAME`]: database,
  [`${NODE_ENV}_DB_USER_NAME`]: username,
  [`${NODE_ENV}_DB_USER_PASSWORD`]: password,
  [`${NODE_ENV}_DB_DIALECT`]: dialect
} = process.env;

if (dialect === 'sqlite') {
  const { [`${NODE_ENV}_DB_STORAGE`]: storage } = process.env;

  if (!storage) {
    throw new Error('Sqlite dialect required storage');
  }

  sqliteConfig.storage = `.storage/${storage}`;
  sqliteConfig.logging = false;
}

module.exports = { database, username, password, dialect, ...sqliteConfig };
