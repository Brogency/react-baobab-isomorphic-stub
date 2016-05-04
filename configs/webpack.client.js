var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var clientConfig = _.merge({}, commonConfig, {
  target: 'web',
  devtool: false,
  entry: [
    'babel-polyfill',
    '../src/client',
  ],
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: 'client.js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new ExtractTextPlugin('client.css', { allChunks: true }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEV__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  ],
});

clientConfig.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', [
    'css?minimize',
    'autoprefixer',
    'sass?outputStyle=expanded&includePaths[]=' + (path.resolve(__dirname, './node_modules')),
  ]),
});

module.exports = clientConfig;
