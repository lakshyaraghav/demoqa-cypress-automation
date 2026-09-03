const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://demoqa.com",
    requestTimeout: 20000,
    responseTimeout: 20000,
    pageLoadTimeout: 30000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  video: true,
  screenshotOnRunFailure: true,

  retries: {
    runMode: 2,
    openMode: 0,
  },
});
