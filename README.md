# vue-heroes

A Cosmos DB, Express.js, Vue, and Node.js app

## Features

This project framework provides the following features:

* Vue.js
* Node.js
* Express
* Mongoose API
* Connecting to MongoDB or CosmosDB
* Building, Debugging, Deploying with Docker

## Getting Started

### Prerequisites

Node.js with npm

### Installation

``` bash
git clone https://github.com/johnpapa/vue-heroes.git
cd vue-heroes
npm install
```

### Database settings

* Configure Cosmos DB server settings

    Rename the `example.js` file to `development.js` in the `server/env/` folder and update it with your Cosmos DB settings. Replace the accountName, databaseName, key, and port with your specific configuration.

    ```javascript
    // server/env/development.js

    module.exports = {
      accountName: 'your-cosmosdb-account-name-goes-here',
      databaseName: 'your-cosmosdb-database-name-goes-here',
      key: 'your-key-goes-here',
      port: 10255
    };
    ```

### Quickstart

This will build the app and run the dev server for Vue and WebPack. The Node express server will launch and WebPack will proxy the calls from the browser to the API in express. It will also and prepare it for local debugging.

``` bash
# build for production with minification
npm run build

# serve on http://localhost:8080
# and run the api on http://localhost:3001
npm run debug
```

### Local Prod Build

This will build the app and launch via the Node.js express server.

```bash
# build for production with minification
npm run build

# run the node server
npm start
```

### Docker

Build the image and run container.

``` bash
npm run docker-up
```

Build the image and run container for local debugging.

``` bash
npm run docker-up-debug
```