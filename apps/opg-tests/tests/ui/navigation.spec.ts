import { test, expect } from '../../fixtures/opgFixtures';
import { MENU_DESTINATIONS } from '../../test-data/navigationData';
import { MAIN_MENU, OPG_UTILITY_LINKS } from '../../test-data/navigation.constants';

test.describe('OPG Header Navigation @smoke', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should expose each main menu item with expected destination', async ({ navigationMenu }) => {
    for (const item of MENU_DESTINATIONS) {
      const menuLink = navigationMenu.getMainMenuItem(item.label);
      await expect(menuLink).toBeVisible();
      await expect(menuLink).toHaveAttribute('href', new RegExp(`${item.expectedPath}$`, 'i'));
    }
  });

  test('should smoke-check main navigation destinations load successfully', async ({ page, navigationMenu }) => {
    await expect(navigationMenu.getMainMenuItem(MAIN_MENU.About)).toBeVisible();

    for (const item of MENU_DESTINATIONS) {
      const response = await page.goto(item.expectedPath, { waitUntil: 'domcontentloaded' });

      expect(response, `No navigation response for: ${item.label}`).toBeTruthy();
      await expect(page).toHaveURL(new RegExp(`${item.expectedPath}$`, 'i'));
      await expect(page.locator('body')).toBeVisible();
      await expect(page).toHaveTitle(/.+/);
    }
  });

  test('should expose secondary utility links with expected destination', async ({ navigationMenu }) => {
    const careersLink = navigationMenu.getSecondaryMenuItem(OPG_UTILITY_LINKS.Careers);
    await expect(careersLink).toBeVisible();
    await expect(careersLink).toHaveAttribute('href', /\/careers\/?$/i);

    const investorsLink = navigationMenu.getSecondaryMenuItem(OPG_UTILITY_LINKS.Investors);
    await expect(investorsLink).toBeVisible();
    await expect(investorsLink).toHaveAttribute('href', /\/investor-relations\/?$/i);

    const reportsLink = navigationMenu.getSecondaryMenuItem(OPG_UTILITY_LINKS.Reports);
    await expect(reportsLink).toBeVisible();
    await expect(reportsLink).toHaveAttribute('href', /\/reporting\/?$/i);
  });
});
