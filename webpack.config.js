const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'eval-source-map',
  output: {
    filename: 'bundle-[contenthash:6].js',
    publicPath: '/',
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    liveReload: true,
    hot: false,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name]-[contenthash:6].[ext]'
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '', noErrorOnMissing: true },
      ],
    }),
  ],
};
