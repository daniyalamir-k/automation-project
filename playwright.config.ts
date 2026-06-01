import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,  

  use: {
    browserName: 'chromium',
    headless: process.env.CI ? true : false,

    launchOptions: {
      slowMo: process.env.CI ? 0 : 800,
    },

    screenshot: 'only-on-failure',
    video: 'on',
    baseURL: 'https://www.automationexercise.com',
  },

  reporter: [
    ['html', { open: 'never' }],
  ],
});