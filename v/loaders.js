
const BabelLoader = {
  test: /\.(js)$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true
  }
};
const CSSLoader = {
  test: /\.css$/,
  loader: plugins.ExtractTextPlugin.extract({
    loader: 'css-loader?importLoaders=1!postcss-loader'
  })
};
module.exports = {
  BabelLoader: BabelLoader,
  CSSLoader: CSSLoader
}