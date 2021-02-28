const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    output: {
      filename: "js/[name].[contenthash].js",
    },
  });
}
