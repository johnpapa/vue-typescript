const serverPort = process.env.SERVER_PORT || 3001;
const publicWeb = process.env.PUBLICWEB || './server/www';
const cosmos = {
  accountName: process.env.COSMOSDB_ACCOUNT,
  databaseName: process.env.COSMOSDB_DB,
  key: process.env.COSMOSDB_KEY,
  port: process.env.COSMOSDB_PORT
};

module.exports = {
  publicWeb,
  serverPort,
  cosmos
};
