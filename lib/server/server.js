'use strict';

var express = require('express');

var _require = require('graphql'),
    graphql = _require.graphql;

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var _require2 = require('./data/schema'),
    Schema = _require2.Schema;

var bodyParser = require('body-parser');

var APP_PORT = 3000;
var app = express();

// set up Jade
app.set('views', './views');
app.set('view engine', 'pug');

// parse POST body as text
app.use(bodyParser.text({ type: 'application/graphql' }));

app.post('/graphql', function (req, res) {
  // execute GraphQL!
  console.log(req.body);
  graphql(Schema, req.body).then(function (result) {
    console.log(result);
    return res.send(JSON.stringify(result, null, 2));
  }).catch(function (err) {
    return res.send(err);
  });
});

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(APP_PORT, function () {
  return console.log('Example app listening at http://localhost:' + APP_PORT);
});