// config/webpack/environment.js
const { environment } = require("@rails/webpacker");

// ↓↓↓↓以下を追加↓↓↓↓
environment.config.merge({
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
    ],
  },
});
// ↑↑↑↑ここまで↑↑↑↑

module.exports = environment;
