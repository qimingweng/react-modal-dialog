const StaticRenderWebpackPlugin = require('static-render-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const definePlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});

const IS_DEV = process.env.NODE_ENV == 'development';

const routes = [
  '/',
];

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.(png|jpg)$/, loader: 'url?limit=8096'},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss?sourceMap!sass?sourceMap')},
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 9000,
  },
  resolve: {
    alias: {
      'react-modal-dialog': path.join(__dirname, '../src/index.js'),
      react: path.join(__dirname, '/node_modules/react'),
      'react-dom': path.join(__dirname, '/node_modules/react-dom'),
    },
    extensions: ['', '.js'],
  },
  resolveLoader: {
    alias: {
      babel: path.join(__dirname, './node_modules/babel-loader'),
      url: path.join(__dirname, './node_modules/url-loader'),
      postcss: path.join(__dirname, './node_modules/postcss-loader'),
      sass: path.join(__dirname, './node_modules/sass-loader'),
      css: path.join(__dirname, './node_modules/css-loader'),
    },
  },
  devtool: IS_DEV ? 'cheap-module-source-map' : undefined,
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    definePlugin,
    new ExtractTextPlugin('style.css'),
    new StaticRenderWebpackPlugin('bundle.js', routes),
  ],
};
