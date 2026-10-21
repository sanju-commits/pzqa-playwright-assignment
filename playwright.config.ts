import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './pzqa_playwright_assignment/tests',

  fullyParallel: false,
  retries: 1,

  reporter: [
  ['html', { open: 'always' }]
 ],

  use: {
    baseURL: 'https://pzqa.vercel.app',

    browserName: 'chromium',
    headless: true,

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10000,
    navigationTimeout: 30000
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      }
    }
  ]
});