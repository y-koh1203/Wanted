const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development', // 追加
  entry: {
    'app': [
      path.resolve(__dirname, 'src/components/app.jsx'),
      //path.resolve(__dirname, 'src/components/user/UserComponent.jsx'),
      //path.resolve(__dirname, 'src/components/parts/TabView.jsx')
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
        exclude: /node_modules/, 
        use: 'babel-loader',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};