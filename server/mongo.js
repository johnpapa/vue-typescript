const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/' + (process.env.NODE_ENV || 'development'));
const dbSettings = {
  name: env.cosmos.name,
  key: env.cosmos.key,
  port: env.cosmos.port
};

// eslint-disable-next-line max-len
const mongoUri = `mongodb://${dbSettings.name}:${dbSettings.key}@${dbSettings.name}.documents.azure.com:${dbSettings.port}/?ssl=true`; //&replicaSet=globaldb`;

function connect() {
  mongoose.set('debug', true);
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};
