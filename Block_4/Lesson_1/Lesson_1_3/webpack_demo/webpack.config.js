const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: './src/index.js',
    analytics: './src/analytics.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    //this will generate index.html inside dist folder with js scripts included
    new HTMLWebpackPlugin({
      template: './src/index.html'
    }),
    //this will remove previous bundles from dist folder
    new CleanWebpackPlugin()
  ]
}