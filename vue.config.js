const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  devServer: {
    host: '172.20.10.7',
    open: true,
    proxy: "http://172.20.10.7:2999"
  }
}