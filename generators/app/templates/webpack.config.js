
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// detemine build env
var TARGET_ENV = process.env.npm_lifecycle_event === 'build' 
  ? 'production'
  : 'development'

// common webpack config
var common = {
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[hash].js',
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { 
          presets: ['es2040'],
          plugins: ['transform-object-rest-spread']
        }
      },
      { 
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        loader: 'file-loader' 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ],
}

// additional webpack settings for local env (when invoked by 'npm start')
var development = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
<% if (bootstrap) { -%>
    'bootstrap-loader',
<% } -%>
    path.join(__dirname, 'static/index.js')
  ],
  devServer: {
    inline: true,
    progress: true
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/, 
        loaders: ['style', 'css', 'postcss', 'sass']
      }
    ]
  }
}


var production = {
  entry: [
<% if (bootstrap) { -%>
    'bootstrap-loader',
<% } -%>
    path.join(__dirname, 'static/index.js')
  ],
  module: {
    loaders: [
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style-loader', [
          'css', 'postcss', 'sass'
        ])
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static/img/', to: 'img/' },
      { from: 'static/favicon.ico' }
    ]),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract CSS into a separate file
    new ExtractTextPlugin( './[hash].css', { allChunks: true } ),
    // minify & mangle JS/CSS
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compressor: { warnings: false }
      // mangle:  true
    })
  ]
}

if (TARGET_ENV === 'development') {
  console.log('Booting webpack development server...')
  module.exports = merge(common, development)
} else if (TARGET_ENV === 'production') {
  console.log('Building production /dist folder...')
  module.exports = merge(common, production)
}
