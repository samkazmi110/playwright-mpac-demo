import { Page, Locator, expect } from '@playwright/test';

export abstract class BaseComponent {
  constructor(
    protected readonly page: Page,
    protected readonly root: Locator
  ) {}

  async isVisible(): Promise<boolean> {
    return await this.root.isVisible();
  }

  async waitForReady(): Promise<void> {
    await expect(this.root).toBeVisible();
  }

  async click(): Promise<void> {
    await this.root.click();
  }

  async getText(): Promise<string> {
    return (await this.root.textContent()) ?? '';
  }
}
