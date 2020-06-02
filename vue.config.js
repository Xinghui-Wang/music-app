const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack (config) {
    config.resolve.alias
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
  }
}