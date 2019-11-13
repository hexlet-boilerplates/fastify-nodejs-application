const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: mode === 'production' ? '' : 'source-map',
};
