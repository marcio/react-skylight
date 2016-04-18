"use strict";

const isTddMode = process.argv.indexOf("--tdd") > -1;

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      { pattern: 'src/*.(jsx|js)', included: false },
      { pattern: 'src/*.js', included: false },
      'test/**/*.spec.jsx'
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.spec.{js,jsx}': ['webpack', 'sourcemap']
    },
    webpack: {
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },
      module: {
        loaders: [
          {
            test: /\.(js|jsx)?$/,
            loader: 'babel',
            exclude: /node_modules/,
          },
        ]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: isTddMode,
    browsers: isTddMode ? ['Chrome'] : [ 'PhantomJS' ],
    singleRun: !isTddMode,
    concurrency: Infinity
  });
};
