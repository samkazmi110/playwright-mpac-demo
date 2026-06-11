import { test as base } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { NavigationMenuComponent } from '../components/navigationMenu';

export interface OPGFixtures {
  homePage: HomePage;
  navigationMenu: NavigationMenuComponent;
}

export const test = base.extend<OPGFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  navigationMenu: async ({ page }, use) => {
    await use(new NavigationMenuComponent(page));
  },
});

export { expect } from '@playwright/test';
