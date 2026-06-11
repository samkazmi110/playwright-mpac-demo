import { Page, Locator } from '@playwright/test';
import { BaseComponent } from '@opg/pw-ui';
import { MainMenu, OpgUtilityLink } from '../test-data/navigation.constants';

export class NavigationMenuComponent extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('navigation').first());
  }

  getMainMenuItem(name: MainMenu | string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') }).first();
  }

  getSecondaryMenuItem(name: OpgUtilityLink | string): Locator {
    return this.page.getByRole('link', { name: new RegExp(`^${name}$`, 'i') }).first();
  }

  async clickMainMenuItem(name: MainMenu | string): Promise<void> {
    await this.getMainMenuItem(name).click();
  }

  async clickSecondaryMenuItem(name: OpgUtilityLink | string): Promise<void> {
    await this.getSecondaryMenuItem(name).click();
  }

  async hoverMainMenuItem(name: MainMenu | string): Promise<void> {
    await this.getMainMenuItem(name).hover();
  }
}
