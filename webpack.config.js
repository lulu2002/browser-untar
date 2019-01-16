const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
/**const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;**/

inputFile = {
  'browser-untar_': ['./src/untar.js'],
  'untar-worker': ['./src/untar-worker.js'],
};
plugins = [];
minimizers = [];
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
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
              ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
              '@babel/plugin-proposal-do-expressions',
            ]
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
