const express = require('express');
const {graphql} = require('graphql');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const {Schema} = require('./data/schema');
const bodyParser = require('body-parser');

const APP_PORT = 3000;
const app = express();

// set up Jade
app.set('views', './views');  
app.set('view engine', 'pug');

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', (req, res) => {
  // execute GraphQL!
  console.log(req.body);
  graphql(Schema, req.body)
  .then( result => {
    return res.send(JSON.stringify(result, null, 2))
  })
  .catch(err => res.send(err));
});

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(APP_PORT, 
  () => console.log(`Example app listening at http://localhost:${APP_PORT}`));