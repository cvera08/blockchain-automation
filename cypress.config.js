const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://remix.ethereum.org/',
    hideXHRInCommandLog: true, //you need to restart your Cypress current application to see this change
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
