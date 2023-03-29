const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = env => {
  return merge(common(env), {
    mode: 'production',
    output: {
      filename: "js/[name].[contenthash].js",
      clean: true,
    },
    plugins: [
      // 打包分析
      // new BundleAnalyzerPlugin(),
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
