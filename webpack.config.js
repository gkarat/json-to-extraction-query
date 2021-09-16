const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
  ],
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts',
      '.css'
    ],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    static: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
      title: 'Prototype'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};

module.exports = config;
