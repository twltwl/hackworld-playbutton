const webpack = require('webpack')
const path    = require('path')
const fs      = require('fs')

const rootPath = path.resolve(__dirname)

module.exports = {
  entry: { bundle: path.join(rootPath, 'src', 'ports', 'react.js') },
  target: 'web',
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
}
