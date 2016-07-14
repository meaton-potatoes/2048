module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  devtool: 'source-map'
};
