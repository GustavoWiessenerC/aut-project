const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
      baseUrl: 'https://plataforma-qa.dev-ads.audsat.io/app',
  },
})