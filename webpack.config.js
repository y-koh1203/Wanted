const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 追加
  entry: {
    'app': [
      path.resolve(__dirname, 'src/app.jsx')
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/js/'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};