import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  retries: process.env.CI ? 2 : 0,

  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,

    launchOptions: {
      slowMo: process.env.CI ? 0 : 800,
    },

    actionTimeout: 30000,
    navigationTimeout: 60000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.automationexercise.com',
  },

  reporter: [
    ['html', { open: 'never' }],
  ],
});