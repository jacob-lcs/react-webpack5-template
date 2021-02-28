const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    output: {
      filename: "js/[name].js",
    },
    devServer: {
      port: 8080,
      host: '0.0.0.0',
    },
  });
}
