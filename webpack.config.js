const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/webview/index.tsx",
  mode: "development",
  devtool: "source-map",
  target: "web", // Browser environment
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "ts-loader" }],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: "process/browser", // Shim process for browser
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"), // Define environment
    }),
  ],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "webview.js",
  },
  node: {
    __dirname: false, // Only valid node properties
    __filename: false,
  },
};
