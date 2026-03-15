const postcssNormalize = require("postcss-normalize");

module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
      },
    ],
    postcssNormalize(),
  ],
};
