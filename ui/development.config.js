var path = require("path");
var webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      SPOTIFY_API_URL: JSON.stringify("http://localhost:9000"),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: "1+1",
      "typeof window": JSON.stringify("object")
    })
  ],


  entry: "./main.js",
  output: { path: __dirname, filename: "bundle.js" },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "react"]
        }
      },
      { test: /\.css$/, loader: "style!css" }
    ]
  },
};
