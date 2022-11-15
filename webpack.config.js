const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    print: './src/manipulateDom.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: false, 
    liveReload: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'dev',
      template: "./src/index.html"
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};