const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'src/app'),
  build: path.join(__dirname, 'build')
};

const commonConfig = merge([
  // {
  //   performance: {
  //     hints: 'warning',
  //     maxEntrypointSize: 50000,
  //     maxAssetSize: 450000
  //   }
  // },
  {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        title: 'Proto - Vanilla Web Prototyping tool',
        favicon: './src/public/assets/favicon.ico'
      })
    ]
  },
  parts.loadJS({ include: PATHS.app })
]);

const productionConfig = merge([
  parts.extractCSS({
    use: [
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [require('postcss-cssnext')()]
        }
      }
    ]
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: 'assets/[name].[ext]'
    }
  }),
  parts.minifyJS(),
  parts.minifyJS({
    options: {
      discardComments: {
        removeAll: true
      },
      safe: true
    }
  })
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT
  }),
  parts.loadCSS(),
  parts.loadImages()
]);

module.exports = env => {
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }
  return merge(commonConfig, developmentConfig);
};
