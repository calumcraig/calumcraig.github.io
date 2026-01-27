import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright/tests',
  // Adding html reporter to produce test report as standard
  reporter: 'html',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://calumcraig.github.io',
    headless: true,
  },
});
