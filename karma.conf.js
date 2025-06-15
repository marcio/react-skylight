const path = require('path');
const isTddMode = process.argv.indexOf('--tdd') > -1;

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      'test/**/*.spec.jsx',
      'test/assign.spec.js',
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.spec.{js,jsx}': ['webpack', 'sourcemap'],
    },
    webpack: {
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      module: {
        rules: [
          {
            enforce: 'pre',
            test: /\.(js|jsx)$/,
            include: path.resolve('src/'),
            loader: 'isparta-loader',
          },
          {
            enforce: 'pre',
            test: /\.(js|jsx)?$/,
            loader: 'eslint-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(js|jsx)?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
        ],
      },
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: isTddMode,
    browsers: isTddMode ? ['Chrome'] : [ 'PhantomJS'],
    singleRun: !isTddMode,
    concurrency: Infinity,
  });
};
