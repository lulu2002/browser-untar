const babelConfig = require('./.babelrc.js');
const webpack = require('webpack');
process.traceDeprecation = true;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
/**const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;**/

const inputFile = {
  'browser-untar_': ['./src/untar.js'],
  'untar-worker': ['./src/untar-worker.js'],
  'testIndex': ['./spec/testIndex.js'],
};
const plugins = [];
const minimizers = [];
/**plugins.push(new BundleAnalyzerPlugin());**/
plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': '"production"'
}));
minimizers.push(new UglifyJsPlugin({uglifyOptions:{
  minimize: true,
  beautify: false,
  parallel: 4,
  mangle: true,
  comments: false,
  compress: true,
  cache: true
}}));
plugins.push(new webpack.optimize.AggressiveMergingPlugin());
module.exports = {
  target: 'web',
  entry: inputFile,
  devtool: 'cheap-module-source-map',
  mode: 'production',
  optimization : {
    minimizer : minimizers,
    splitChunks : false,
    removeAvailableModules: false,
    removeEmptyChunks: false,
  },
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    globalObject: 'this',
    library: 'browser-untar',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|web_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
              workerParallelJobs: 50,
              workerNodeArgs: ['--max-old-space-size=1024'],
              poolTimeout: 2000,
              poolParallelJobs: 10,
              name: 'swea-pool'
            }
          },
          {
          loader: 'babel-loader',
          options: {
            cacheDirectory: './webpack_cache',
            presets: babelConfig.presets,
            plugins: babelConfig.plugins
          }
        }]
      },
      {
        test: /(.jsx|\.js)$/,
        exclude: /(node_modules|web_modules)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'web_modules', 'src']
  },
};
