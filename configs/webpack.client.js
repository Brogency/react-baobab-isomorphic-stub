var webpack = require('webpack');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var _ = require('lodash');

module.exports = _.merge({}, commonConfig, {
    target: 'web',
    devtool: false,
    entry: ['../src/client'],
    output: {
        path: path.join(__dirname, '../static/dist'),
        filename: 'client.js',
        chunkFilename: '[name].[id].js',
    },
    plugins: [
    new webpack.DefinePlugin({ __CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ],
});
