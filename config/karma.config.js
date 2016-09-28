const webpackConfig = require('./webpack/karma.config');
const isCI = process.env.CONTINUOUS_INTEGRATION === 'true';

module.exports = function (config) {

	const configuration = {

		basePath: '../',
		files: [ { pattern: 'test/main.js', watched: false } ],
		preprocessors: { 'test/main.js': ['coverage', 'webpack', 'sourcemap'] },
		frameworks: ['mocha', 'chai', 'sinon', 'source-map-support'],
		client: {
			args: ['--grep', config.grep || ''],
			useIframe: false
		},
		excluded: [],
		webpack: webpackConfig,
		coverageReporter: {
			dir: 'coverage/',
			reporters: [
				{ type: 'text' },
				{ type: 'lcov' },
				{ type: 'text-summary' },
				{ type: 'json', subdir: '.', file: 'coverage-final.json' },
				{ type: 'html' }
			]
		},
		webpackServer: { noInfo: true },
		reporters: ['mocha', 'coverage'],
		mochaReporter: { output: 'autowatch' },
		port: 9876,
		captureTimeout: 60000,
		browserDisconnectTimeout : 60000,
		browserDisconnectTolerance : 3,
		browserNoActivityTimeout : 60000,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true,
    concurrency: Infinity
	}

    if (isCI) {
		configuration.reporters.push('coveralls');
	}

	config.set(configuration);
}