var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
      path:'./src/js/',
      filename: 'index.js',
  },
  devServer: {
      inline: true,
      port: 7777
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, loader: "jsx-loader"},
    ],

  }
}