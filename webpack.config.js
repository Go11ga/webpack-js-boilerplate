const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env) => {
  const isDev = env.mode === 'development';
  const isProd = env.mode === 'production';

  const config = {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name][contenthash].js',
      clean: true,
      assetModuleFilename: 'assets/images/[name][ext]',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.js', '.json', '.css', '.scss'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        title: 'JS-Boilerplate',
        favicon: path.resolve(__dirname, 'public', 'favicon.png'),
      }),
      isDev && new webpack.ProgressPlugin(),
      isProd && new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:5].css',
        chunkFilename: 'css/[name].[contenthash:5].css',
      }),
      isDev && new ESLintPlugin({
        extensions: ['js'],
      }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devtool: isDev ? 'inline-source-map' : false,
    devServer: isDev ? {
      port: env.port ?? 3000,
      open: false,
      client: {
        overlay: false,
      },
    } : undefined,
  };

  return config;
};
