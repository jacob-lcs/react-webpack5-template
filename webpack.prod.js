const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    output: {
      filename: "js/[name].[contenthash].js",
    },
    plugins: [
      // 打包之前清空打包目录
      new CleanWebpackPlugin(),
      // 打包分析
      new BundleAnalyzerPlugin(),
      // 去除 moment 多余语言包
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn'],
      }),
      // 生成 manifest.json
      new WebpackManifestPlugin(),
      // 将 css 从 js 中分离
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: 'async'
      },
    },
  });
}
