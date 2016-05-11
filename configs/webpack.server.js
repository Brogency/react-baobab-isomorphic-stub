var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var fs = require('fs');
var commonConfig = require('./webpack.common.js');
var _ = require('lodash');
var nested = require('postcss-nested');
var assets = require('postcss-assets');

var serverConfig = _.merge({}, commonConfig, {
  target: 'node',
  devtool: 'source-map',
  entry: ['../src/server'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __SERVER__: true,
      __PRODUCTION__: true,
      __DEV__: false,
    }),
  ],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
});

serverConfig.module.loaders.push({
  test: /\.css/,
  loaders: [
    'fake-style',
    'css?modules&importLoaders=1&localIdentName=[name]___[local]---[hash:base64:3]',
    'postcss',
  ],
  postcss: function () {
    return [
      nested,
      assets,
    ];
  },
});

module.exports = serverConfig;

