import { test, expect } from '@playwright/test';

test.describe('OPG API Mocking @api', () => {
  test('should mock a backend response with page.route', async ({ page }) => {
    await page.route('**/mocked-navigation-health', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ source: 'mock', ok: true, area: 'navigation' }),
      });
    });

    await page.goto('/');

    const mockedPayload = await page.evaluate(async () => {
      const response = await fetch('/mocked-navigation-health');
      return response.json();
    });

    expect(mockedPayload).toEqual({ source: 'mock', ok: true, area: 'navigation' });
  });

  test('should mock homepage summary API', async ({ page }) => {
    await page.route('**/api/homepage-summary', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          source: 'mock',
          ok: true,
          featuredMessage: 'Mocked homepage summary payload',
        }),
      });
    });

    await page.goto('/');

    const mockedApiResult = await page.evaluate(async () => {
      const response = await fetch('/api/homepage-summary');
      return response.json();
    });

    expect(mockedApiResult).toEqual({
      source: 'mock',
      ok: true,
      featuredMessage: 'Mocked homepage summary payload',
    });
  });
});
