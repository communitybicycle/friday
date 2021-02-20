const rules = require("./webpack.rules");
const plugins = require("./webpack.plugins");
const path = require("path");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

rules.push({
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [{ loader: "babel-loader" }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      data: path.resolve(__dirname, "src/data"),
      hooks: path.resolve(__dirname, "src/hooks"),
      modules: path.resolve(__dirname, "src/modules"),
      pages: path.resolve(__dirname, "src/pages"),
      reducers: path.resolve(__dirname, "src/reducers"),
      theme: path.resolve(__dirname, "src/theme"),
      types: path.resolve(__dirname, "src/types"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
};
