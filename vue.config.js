const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}



module.exports = {
  assetsDir: '/static',

  configureWebpack: config => {
    'sourcemap',
      config.resolve = {
        extensions: ['.js', '.vue', '.json', ".css"],
        alias: {
          'vue$': 'vue/dist/vue.js',
          '@': resolve('src')
        }
      }
  },
  css: {
    extract: false
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss",
      patterns: [path.resolve(__dirname, "./src/styles/global.scss")]
    }
  }
}