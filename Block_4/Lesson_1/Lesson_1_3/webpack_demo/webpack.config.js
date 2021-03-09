const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    analytics: './analytics.js',
    main: './index.js'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    //this will generate index.html inside dist folder with js scripts included
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    //this will remove previous bundles from dist folder
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [{
      test: /\.css$/,
      //webpack will execute css-loader and then style-loader
      //css-loader handles imports of css files in js files
      //style-loader adds styles to head
      use: ['style-loader', 'css-loader'] 
    }]
  }
}