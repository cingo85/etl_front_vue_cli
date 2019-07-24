const path = require('path')
function resolve(dir){
  return path.join(__dirname,dir);
}



module.exports = {
  assetsDir: '/static',
  configureWebpack:config => {
    devtool:'sourcemap',
    config.resolve= {
      extensions: ['.js', '.vue', '.json',".css"],
      alias: {
        'vue$': 'vue/dist/vue.js',
        '@':resolve('src')
      }
    }
  }
}