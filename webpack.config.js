const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")

const entry = {
  "index": ["./src/index.js", "./src/index.scss"],
};

const _module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.html$/,
      use: [
        {
          loader: "html-loader",
          options: { minimize: true }
        }
      ]
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "sass-loader"
      ]
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        }
      ]
    },
    {
      test: /\.(svg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/'
          }
        },
      ]
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }]
    },
  ]
};

const plugins = [
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
    chunkFilename: "[id].css"
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer()
      ]
    }
  })
];

module.exports = {
  entry,
  module: _module,
  plugins
};