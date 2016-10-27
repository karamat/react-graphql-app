const WebpackDevServer = require("webpack-dev-server");  
const webpack = require("webpack");
const config = require("../../webpack.config.dev");

var server = new WebpackDevServer(webpack(config), {  
  // webpack-dev-server options
  proxy: {'/graphql': `http://localhost:3002`},
  publicPath: config.output.publicPath,
  hot: true,
  stats: { colors: true },
});

server.listen(8080, "localhost", function() {});  