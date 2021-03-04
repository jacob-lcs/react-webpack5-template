const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

// css/css module 正则表达式
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
// sass/sass module 正则表达式
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
// less/less module 正则表达式
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
// stylus/stylus module 正则表达式
const stylRegex = /\.styl$/;
const stylModuleRegex = /\.module\.styl$/;

module.exports = () => {
  return {
    mode: "development",
    entry: {
      index: './src/index.js'
    },
    output: {
      // 打包文件根目录
      path: path.resolve(__dirname, "dist/"),
    },
    plugins: [
      // 生成 index.html
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./build/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          include: path.resolve(__dirname, 'src'),
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
          test: cssModuleRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                }
              }
            },
            "postcss-loader"
          ]
        },
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
        },
        {
          test: sassModuleRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                }
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: stylRegex,
          exclude: stylModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader", "stylus-loader"]
        },
        {
          test: stylModuleRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                }
              }
            },
            "postcss-loader",
            "stylus-loader"
          ]
        },
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
          sideEffects: true,
        },
        {
          test: lessModuleRegex,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: getCSSModuleLocalIdent,
                }
              }
            },
            "postcss-loader",
            "less-loader"
          ],
        },
        {
          test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
        },
      ]
    },
    cache: {
      type: 'filesystem',
      // 可选配置
      buildDependencies: {
        config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
      },
      name: 'development-cache',
    },
  }
}
