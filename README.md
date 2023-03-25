# 从零开始使用 webpack5 搭建 react 项目

> 已集成功能
> - [x] cache 缓存提升热更新速度
> - [x] style module
> - [x] HMR
> - [x] lodash-es
> - [x] antd v5
> - [x] dayjs
> - [x] swc
> 

> 本文的示例项目源码可以点击 [这里](https://github.com/jacob-lcs/react-webpack5-template) 获取

## 一、前言

webpack5 也已经发布一段时间了，其模块联邦、bundle 缓存等新特性值得在项目中进行使用。经过笔者在公司实际项目中的升级结果来看，其提升效果显著，热更新时间由原来的 8s 减少到了 2s，会极大的提升开发幸福感。除此之外，webpack5 也带来了更好的 tree shaking 算法，项目的打包体积也会进一步减少，提升用户体验。

目前来看，create-react-app 脚手架还没有适配 webpack5，如果你想熟悉下如何从零开始配置 webpack5 项目的话，不妨跟着文档操作一下。

## 二、项目初始化

### 2.1 初始化文件结构

首先创建一个文件夹，进行 npm 初始化

```bash
mkdir react-webpack5-template
cd react-webpack5-template
# npm 初始化配置
npm init -y
# 创建 webpack 配置文件
touch webpack.common.js
# 创建 babel 配置文件
mkdir src && cd src
# 创建入口文件
touch index.js
cd .. && mkdir build
touch index.html
```

在上述步骤执行完毕之后，你的目录结构应该如下所示：

```
├── src
│   └── index.js
├── build
│   └── index.html
├── webpack.common.js
├── .babelrc
├── package.json
```

随后安装必要的依赖

```bash
npm i webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader path -D
npm i react react-dom
```

### 2.2 完善配置文件

文件结构生成完毕后，我们开始编写代码。首先，在`index.js` 中写入以下代码：

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <React.StrictMode>
    <div>你好，React-webpack5-template</div>
  </React.StrictMode>,
  document.getElementById('root')
);
```

在` webpack.common.js` 中写入以下内容：

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
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
      ]
    },
    devServer: {
      port: 8080,
      host: '0.0.0.0',
    },
  }
}
```

在 `index.html` 中写入以下代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

在 `.babalrc` 中写入以下代码：

```json
{
  "presets": ["@babel/preset-react"]
}
```

然后在 package.json 中添加如下 script：

```diff
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
+  "dev": "webpack serve --config webpack.common.js"
},
```

随后我们运行 `npm run dev` 就可以直接运行了，由于我们上面设置的 devServer 端口号为 8080，所以在浏览器中打开 `localhost:8080` 即可看到如下效果：

![image-20210228004846012](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d2c643391e04c319548827e4adef444~tplv-k3u1fbpfcp-zoom-1.image)

到这里位置，我们的初步搭建已经完成了，但是我们在现有的项目中看到的 webpack 配置文件不止这些，有 less、css 文件的解析，image 等资源文件的处理，还有一些优化项的配置等，接下来会一一介绍。

## 三、功能性配置

上面我们已经做到可以将一个简单的 React 项目运行起来了，接下来我们要做的是加一些功能。

### 3.1 样式文件解析

在前端项目开发过程中，比较经常使用的是 css、less、scss、sass、stylus，下面我们就先仅对 less 进行配置，其余的样式文件可参考 GitHub 源码。首先安装 loader：

```bash
npm i style-loader less-loader less css-loader postcss-loader postcss-normalize autoprefixer postcss-preset-env -D
```

首先，在 webpack.common.js 顶部加入以下正则表达式，用来判断样式文件：

```js
// less/less module 正则表达式
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
```

然后在 webpack.common.js 中加入以下配置：

```js
module: {
	rules: [
    {
      test: lessRegex,
      use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      sideEffects: true,
    },
  ]
}
```

新增 postcss.config.js 文件并配置：

```js
const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
      }
    ],
    postcssNormalize(),
    require('autoprefixer') ({
      overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
    })
  ],
};
```



然后我们在 src 目录下新建 index.less 文件，测试配置是否成功：

```less
// index.less
.title {
  text-align: center;
  color: coral;
}
```

重新运行项目后发现样式生效，配置成功。

![image-20210228102928287](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/134d33f3528d497d992855178aebce39~tplv-k3u1fbpfcp-zoom-1.image)

但是仅配置 less 是不够的，我们日常在开发过程中经常用到 less module，在这里我们进行如下配置，首先安装 `react-dev-utils`：

```bash
npm i react-dev-utils resolve-url-loader -D
```

在 webpack.common.js 中进行如下配置：

```diff
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module: {
	rules: [
    {
      test: lessRegex,
+     exclude: lessModuleRegex,
      use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      sideEffects: true,
    },
+   {
+     test: lessModuleRegex,
+     use: [
+       "style-loader",
+       {
+         loader: "css-loader",
+         options: {
+           modules: {
+             getLocalIdent: getCSSModuleLocalIdent,
+           }
+         }
+       },
+       "postcss-loader",
+       "less-loader"
+     ],
+   }
  ]
}
```

接下来我们新建 index.module.less 来进行测试：

```less
.font {
  color: red;
}
```

重新运行项目后样式生效，并且 className 也发生了相应变化：

![image-20210228110624352](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46a4750428ee451189eba42e090fe1cd~tplv-k3u1fbpfcp-zoom-1.image)

CSS、SCSS 与 SASS 的配置都大同小异，大家可以移步到我的 [GitHub](https://github.com/jacob-lcs/react-webpack5-template)。

### 3.2 图片地址解析

> 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
>
> 在 webpack 5 之前，通常使用：
>
> - [`raw-loader`](https://webpack.docschina.org/loaders/raw-loader/) 将文件导入为字符串
> - [`url-loader`](https://webpack.docschina.org/loaders/url-loader/) 将文件作为 data URI 内联到 bundle 中
> - [`file-loader`](https://webpack.docschina.org/loaders/file-loader/) 将文件发送到输出目录
>
> 资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：
>
> - `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
> - `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
> - `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
> - `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。
>
> —— 引自 webpack5 中文文档

webpack5 内置 assets 类型，我们不需要额外安装插件就可以进行图片等资源文件的解析，配置如下：

```javascript
{
  test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
  type: "asset/resource"
},
```

如此我们便可以处理引入的图片资源文件，可以根据自身需要进行拓展。

## 四、性能优化

### 4. 1 引入缓存

前面提到，webpack5 引入了缓存来提高二次构建速度，我们只需要在 webpack 配置文件中加入如下代码即可开心缓存

```js
cache: {
  type: 'filesystem',
  // 可选配置
  buildDependencies: {
    config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
  },
  name: 'development-cache',
},
```

重新运行项目后会发现 node_modules 目录下会新增一个 .cache 文件夹：

![image-20210228114440107](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96572954a479431b8ab2051f8b46d98b~tplv-k3u1fbpfcp-zoom-1.image)

笔者在实际项目中测试，热更新时间由原来的 8s 缩短到 2s 可以说是提升巨大。

#### 4.2 引入多线程
为了提升构建速度，我们可以引入 `thread-loader` 提升构建速度，首先我们需要安装：
```bash
npm i thread-loader -D
```
然后在 `webpack.common.js` 中进行配置：
```diff
{
  test: /\.(jsx|js)?$/,
- use: ["babel-loader"],
+ use: ["thread-loader", "babel-loader"],
  include: path.resolve(__dirname, 'src'),
},
```      

## 五、总结

到目前为止，配置工作算是已经完成了，本篇文章只是指导大家进行一些初始化配置，项目中肯定还有很多可以优化的地方，比如说分别配置 webpack.dev.js 以及 webpack.prod.js 以通过测试环境与正式环境的不同需求，在这里就不细说，环境区分的相关配置我会上传到 GitHub 中，如果你觉得项目对你有点用处的话，还请点个 star。
