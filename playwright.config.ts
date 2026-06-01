import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,

  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,

    launchOptions: {
      slowMo: process.env.CI ? 0 : 1000, 
    },

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://www.automationexercise.com',
  },

  reporter: [
    ['html', { open: 'never' }],
  ],

});