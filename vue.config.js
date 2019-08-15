const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}



module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/hello-workd'
    : '/',

  assetsDir: '/static',
  configureWebpack: config => {
    devtool: 'sourcemap',
      config.resolve = {
        extensions: ['.js', '.vue', '.json', ".css"],
        alias: {
          'vue$': 'vue/dist/vue.js',
          '@': resolve('src')
        }
      }
  }
}