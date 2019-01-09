const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const fs = require('fs');
const path = require('path');


function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `./${name}.${extension}`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      inject: false,
    })
  })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');


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
      include: path.resolve(__dirname, 'src/html/includes'),
      use: [
        'raw-loader',
        /*
        {
          loader: "html-loader",
          options: { minimize: true }
        },
        */
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
            publicPath: 'images/',
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
  /*
  new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
  }),
  */
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
  }),
  new CopyWebpackPlugin([
    {
      from: './src/images',
      to: './images'
    },
  ]),
].concat(htmlPlugins);

module.exports = {
  entry,
  module: _module,
  plugins
};