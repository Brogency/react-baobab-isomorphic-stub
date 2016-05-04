var _ = require('lodash');
var webpack = require('webpack');
var commonConfig = require('./webpack.common.js');
var config = require('./config');
var path = require('path');
var wdsHost = config.get('FRONTEND_DEV_HOST');
var wdsPort = config.get('FRONTEND_DEV_PORT');

var publicPath = 'http://' + wdsHost + ':' + wdsPort + '/dist';

var clientConfig = _.merge({}, commonConfig, {
  target: 'web',
  cache: true,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://' + wdsHost + ':' + wdsPort,
    'webpack/hot/only-dev-server',
    '../src/client',
  ],
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: 'client.js',
    chunkFilename: '[name].[id].js',
    publicPath: publicPath,
    hotUpdateMainFilename: 'update/[hash]/update.json',
    hotUpdateChunkFilename: 'update/[hash]/[id].update.js',
  },
  watchOptions: {
    poll: true,
  },
  devServer: {
    publicPath: publicPath,
    hot: true,
    inline: false,
    lazy: false,
    quiet: true,
    noInfo: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true },
    host: '0.0.0.0',
    port: wdsPort,
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: false,
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  postLoaders: [
    {
      test: /\.js$/,
      loader: 'babel?cacheDirectory&presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre',
      exclude: /node_modules/,
    },
  ],
});

module.exports = clientConfig;
