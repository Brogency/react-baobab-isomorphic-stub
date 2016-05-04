var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');
var PolyfillsPlugin = require('webpack-polyfills-plugin');
var commonConfig = require('./webpack.common.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var clientConfig = _.merge({}, commonConfig, {
  target: 'web',
  devtool: false,
  entry: ['../src/client'],
  output: {
    path: path.join(__dirname, '../static/dist'),
    filename: 'client.js',
    chunkFilename: '[name].[id].js',
  },
  plugins: [
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEV__: false,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    // new PolyfillsPlugin([
    //   '_enqueueMicrotask',
    //   'Promise',
    //   'String/prototype/startsWith',
    // ]),
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
