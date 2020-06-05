const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1500,
    ignored: [
      '.git',
      'application',
      'node_modules',
      'public',
      'vendor'
    ],
  },
  entry: {
    default: './src/default.js',
    index: './src/index.js',
    faceRecognition: './src/faceRecognition.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: false
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(gif|png|jpg|jpeg|eot|wof|woff|woff2|ttf|svg)$/,
        use: 'url-loader',
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {
      '~': path.resolve(__dirname, 'src')
    },
    extensions: [
      '.css',
      '.js'
    ]
  },
  performance: {
    hints: false
  }
}
