const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const path = require('path')
const commonConfig = require('./common.config.js');
const environment = process.env.NODE_ENV = 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
	debug: false,
	devtool: 'source-map',
	output: {
		path: path.resolve('dist/'),
		filename: '[name].[hash].js',
		chunkFilename: '[id].[hash].chunk.js',
    sourceMapFilename: '[name].map'

	},
	plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        template: 'index.html',
    }),
    // pass options to uglify
    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
    }),
		// set environment global variable used in the js code
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(environment),
		}),
		// minifies your code
		new webpack.optimize.UglifyJsPlugin({
			compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
        sourceMap: true
		}),
      // removes duplicate modules
      new webpack.optimize.DedupePlugin(),
	],
	tslint: {
		emitErrors: true,
		failOnHint: true,
		resourcePath: 'src'
	}
});