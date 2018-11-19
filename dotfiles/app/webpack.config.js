const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const NodemonPlugin = require('nodemon-webpack-plugin');

const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    fix: true,
  },
};

const babelLoader = {
  test: /\.js?$/,
  use: 'babel-loader',
  exclude: /node_modules/,
};

module.exports = (env, argv) => {
  const prod = argv && argv.mode === 'production';
  return {
    mode: prod ? 'production' : 'development',
    devtool: prod ? 'source-map' : 'cheap-module-source-map',
    watch: !prod,
    target: 'node',
    entry: [path.resolve('./src/index')],
    output: {
      path: path.resolve('.build'),
      filename: 'index.js',
    },
    resolve: {
      modules: [path.resolve('./src'), 'node_modules'],
    },
    externals: [nodeExternals()],
    module: {
      rules: prod ? [babelLoader] : [eslintLoader, babelLoader],
    },
    plugins: prod ? [] : [new Dotenv(), new NodemonPlugin()],
    stats: prod ? 'normal' : 'minimal',
  };
};
