const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/assets"),
    publicPath: "/assets",
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  target: ["web", "es5"],
  devServer: {
    static: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    chrome: "31",
                  },
                  useBuiltIns: "usage",
                  corejs: "3.24",
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
