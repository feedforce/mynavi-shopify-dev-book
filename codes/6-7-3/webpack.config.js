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
