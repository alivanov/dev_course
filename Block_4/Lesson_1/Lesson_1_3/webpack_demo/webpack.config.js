const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
console.log(isDev);

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};

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
  resolve: {
    extensions: [".js", ".json"],
    alias: {
      "@models": path.resolve(__dirname, "src/models")
    }
  },
  plugins: [
    //this will generate index.html inside dist folder with js scripts included
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    //this will remove previous bundles from dist folder
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/myicon.ico"),
          to: path.resolve(__dirname, "dist")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'] 
    },
    {
      test: /\.(png|jpg|svg|gif)$/,
      use: ["file-loader"]
    },
    {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: ["file-loader"]
    },
    {
      test: /\.xml$/,
      use: ["xml-loader"]
    },
    {
      test: /\.csv$/,
      use: ["csv-loader"]
    }]
  },
  optimization: optimization(),
  devServer: {
    port: 8765,
    hot: isDev
  }
}