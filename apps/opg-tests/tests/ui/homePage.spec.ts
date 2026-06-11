import { test, expect } from '../../fixtures/opgFixtures';

test.describe('OPG Home Page @smoke', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should load the homepage and display key hero content', async ({ homePage }) => {
    await expect(homePage.heroHeading).toBeVisible();
    await expect(homePage.electricFutureHeading).toBeVisible();
    await expect(homePage.electrifyCareerHeading).toBeVisible();
  });

  test('should display build campaign CTA with correct href', async ({ homePage }) => {
    await expect(homePage.buildCampaignCta).toBeVisible();
    await expect(homePage.buildCampaignCta).toHaveAttribute('href', /\/build\/?$/i);
  });
});
