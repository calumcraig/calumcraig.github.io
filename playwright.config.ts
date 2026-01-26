import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',

  // Adding html reporter to produce test report as standard
  reporter: 'html',

  use: {
    baseURL: 'https://calumcraig.github.io',
    headless: false,
  },
});
