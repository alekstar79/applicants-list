const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  publicPath: '/applicants-list/',

  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    allowedHosts: 'all',
    compress: true,
    server: {
      type: 'https',
      /* options: {
        cert: './cert/server.crt',
        key: './cert/server.key',
      } */
    },
    client: {
      reconnect: true
    }
  }
})
