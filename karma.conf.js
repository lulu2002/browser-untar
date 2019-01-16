const webpackConfig = require('./webpack.config');
module.exports = function(config) {
  const configuration = {

    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      './spec/testIndex.js'
    ],

    preprocessors: {
      './src/untar.js': [ 'webpack' ],
      './spec/testIndex.js': [ 'webpack' ],
    },
    webpack: webpackConfig,
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    browserNoActivityTimeout: 60000,
    singleRun: true,
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-webpack',
      'karma-mocha',
      'karma-chai'
    ]
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration)
};