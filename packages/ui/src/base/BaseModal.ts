import { Page, Locator, expect } from '@playwright/test';

export abstract class BaseModal {
  protected abstract readonly overlay: Locator;
  protected abstract readonly closeButton: Locator;

  constructor(protected readonly page: Page) {}

  async isOpen(): Promise<boolean> {
    return await this.overlay.isVisible();
  }

  async waitForOpen(): Promise<void> {
    await expect(this.overlay).toBeVisible();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
    await expect(this.overlay).toBeHidden();
  }
}
