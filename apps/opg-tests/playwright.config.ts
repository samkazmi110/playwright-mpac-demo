import { defineConfig, devices } from '@playwright/test';
import { loadConfig } from '@opg/pw-core';

const config = loadConfig({
  local: { baseUrl: 'https://www.opg.com', apiBaseUrl: 'https://www.opg.com' },
  dev: { baseUrl: 'https://dev.opg.com', apiBaseUrl: 'https://api-dev.opg.com' },
  qa: { baseUrl: 'https://qa.opg.com', apiBaseUrl: 'https://api-qa.opg.com' },
  stage: { baseUrl: 'https://stage.opg.com', apiBaseUrl: 'https://api-stage.opg.com' },
  prod: { baseUrl: 'https://www.opg.com', apiBaseUrl: 'https://www.opg.com' },
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: config.retries,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results/junit.xml' }],
  ],
  use: {
    baseURL: config.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: config.headless,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
