const fs = require('fs')

module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/common.scss', 'utf-8')
      }
    }
  }
}
