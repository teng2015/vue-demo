var path = require('path'),
  webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: [
      'vue',
      'vue-router',
      'vue-resource',
      'lodash',
      'superagent'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.less'],
    alias: {
      src: path.resolve(__dirname, '../src'),
      // 自定义路径别名
      COMPONENT: path.resolve(__dirname, '../src/components'),
      SERVICE: path.resolve(__dirname, '../src/services'),
      VIEW: path.resolve(__dirname, '../src/views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      loader: 'babel!eslint',
      exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'css!less'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  vue: {
    loaders: {
      js: 'babel!eslint',
      less: 'vue-style!css!less',
      sass: 'vue-style!css!sass'
    }
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ]
};
