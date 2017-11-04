// Replace with your dev values

const serverPort = process.env.SERVER_PORT || 3001;

const sessionSecret = 'your-awesome-secret';

const cosmos = {
  name: 'my-heroes-db',
  key: 'ZySWbdL4dJxXq55SBeIcASc11mIMBA0Ia6HMLUa7VXGdZkSXIrVcSpKFQJPGxR8WqYG3OSXWPZLLdQjjsQve2A==',
  port: 10255
};

const twitter = {
  consumerKey: 'lHizE4URaQfv4vWcpsFQvtwvx',
  consumerSecret: 'UdPNHkNeJGQSekPSRbaRHZkW7bBbiT1ii8hy60mhvRMSkmIVbV',
  callbackURL: `http://localhost:${serverPort}/api/auth/twitter/callback`
};

module.exports = {
  serverPort,
  sessionSecret,
  cosmos,
  twitter
};
