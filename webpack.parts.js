const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warnings: true
    }
  }
});

exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader'
      }
    ]
  }
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('postcss-cssnext')()]
            }
          }
        ]
      }
    ]
  }
});

exports.extractCSS = ({ include, exclude, use } = {}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: 'styles/[name].css'
  });
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,
          use: plugin.extract({
            use,
            fallback: 'style-loader'
          })
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpeg|jpg|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options
        }
      }
    ]
  }
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});
