const webpack = require('webpack');
const path = require('path');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
	entry: { 'app': './src/app.ts' },
	resolve: {
		extensions: ['', '.ts', '.tsx', '.js'],
		root: path.resolve('src/'),
		modulesDirectories: ['node_modules']
	},
	module: {
      preLoaders: [ { test: /\.js$/, loader: 'source-map-loader', exclude: [] } ],
      loaders: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader!awesome-typescript-loader',
          exclude: [/\.(browser|node|e2e)\.ts$/]
        },
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        {
          test: /\.woff$/,
          loader: 'file',
          query: {
            name: 'public/fonts/[name].[ext]'
          },
        },
        {
          test: /\.svg$/,
          loader: 'svg-url-loader'
        },
        {
          test: /\.worker.js$/,
          loader: "worker-loader"
        },
		],
		plugins: [
      // add all common plugins here
			new ForkCheckerPlugin(),
      // Promise and fetch polyfills
      new webpack.ProvidePlugin({
        Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      })
		]
	},
	node: {
		global: 'window',
		crypto: 'empty',
		module: false,
		clearImmediate: false,
		setImmediate: false,
    fs: "empty",
	}
};