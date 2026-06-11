import { Page, Locator, expect } from '@playwright/test';
import { ILogger } from '@opg/pw-core';

export abstract class BasePage {
  protected readonly logger?: ILogger;

  constructor(
    protected readonly page: Page,
    logger?: ILogger
  ) {
    this.logger = logger;
  }

  async goto(path: string): Promise<void> {
    this.logger?.info(`Navigating to: ${path}`);
    await this.page.goto(path);
  }

  async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async fill(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async getText(locator: Locator): Promise<string> {
    return (await locator.textContent()) ?? '';
  }

  async expectVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator: Locator): Promise<void> {
    await expect(locator).toBeHidden();
  }

  async takeScreenshot(name: string): Promise<Buffer> {
    return await this.page.screenshot({ fullPage: true, path: `screenshots/${name}.png` });
  }

  async waitForUrl(pattern: string | RegExp): Promise<void> {
    await this.page.waitForURL(pattern);
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  getCurrentUrl(): string {
    return this.page.url();
  }
}
