const path = require('path');

module.exports = {
  target: 'web',
  entry: {
    web3: './node_modules/web3',
    tx: './node_modules/ethereumjs-tx'
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: []
  },
  plugins: []
}
