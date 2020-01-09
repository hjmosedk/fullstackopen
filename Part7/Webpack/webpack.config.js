const path = require('path');
const webpack = require('webpack');

const config = (env, argv) => {
  const backend_url =
    argv.mode === 'production'
      ? 'http://localhost:3003'
      : 'http://localhost:3003';

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url),
      }),
    ],
  };
};

module.exports = config;
