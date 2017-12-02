const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');

const publicWeb = process.env.PUBLICWEB;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(publicWeb));
console.log(`serving ${publicWeb}`);
app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(`index.html`, { root: publicWeb });
});

const port = process.env.SERVER_PORT;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
