const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    path.join(__dirname, 'app')
  ],
  resolve: {extensions: ['', '.js', '.jsx','.png']},
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader:'url-loader?limit=8192',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'app'),
    historyApiFallback: true,
    hot: true,
    progress: true,
    stats: 'errors-only',
    port: 3000
  }
}
