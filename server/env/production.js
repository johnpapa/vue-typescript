const serverPort = process.env.SERVER_PORT || 3001;
const sessionSecret = process.env.SESSION_SECRET;
const publicWeb = process.env.PUBLICWEB;

const cosmos = {
  name: process.env.COSMOSDB_NAME,
  key: process.env.COSMOSDB_KEY,
  port: process.env.COSMOSDB_PORT
};

const twitter = {
  consumerKey: process.env.TWITTER_CLIENT_KEY,
  consumerSecret: process.env.TWITTER_CLIENT_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
};

module.exports = {
  publicWeb,
  serverPort,
  sessionSecret,
  cosmos,
  twitter
};
