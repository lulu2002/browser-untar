const webpackConfig = require('./webpack.config');
module.exports = function(config) {
  const configuration = {

    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      './spec/testIndex.js',
      {pattern: './spec/data/*.tar', included: false}
    ],

    preprocessors: {
      './spec/testIndex.js': [ 'webpack' ],
    },
    webpack: webpackConfig,
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browserNoActivityTimeout: 60000,
    singleRun: true,
    customLaunchers: {
      Chrome_GC: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--user-data-dir=/tmp',
          '--disable-web-security',
          '-–enable-precise-memory-info',
          '--debug-devtools-frontend',
          '--js-flags="--expose-gc"',
          '--expose-gc'
        ]
      }
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-chai'
    ]
  };

    configuration.browsers = ['Chrome_GC'];

  config.set(configuration)
};