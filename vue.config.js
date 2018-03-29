var webpack = require('webpack')
module.exports = {
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        'jquery': 'jquery'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery'
      }) ]
  }
}
