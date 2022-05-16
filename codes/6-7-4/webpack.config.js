const path = require("path");

module.exports = {
  entry: "./src/entry.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      // { test: /\.m?js$/, type: "javascript/auto" },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"],
  },
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "app.js",
  },
};
