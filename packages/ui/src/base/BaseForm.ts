import { Page, Locator, expect } from '@playwright/test';

export abstract class BaseForm {
  constructor(
    protected readonly page: Page,
    protected readonly root: Locator
  ) {}

  async fill(fieldLabel: string, value: string): Promise<void> {
    await this.page.getByLabel(fieldLabel).fill(value);
  }

  async selectOption(fieldLabel: string, value: string): Promise<void> {
    await this.page.getByLabel(fieldLabel).selectOption(value);
  }

  async check(fieldLabel: string): Promise<void> {
    await this.page.getByLabel(fieldLabel).check();
  }

  async submit(): Promise<void> {
    await this.root.getByRole('button', { name: /submit/i }).click();
  }

  async expectFieldError(fieldLabel: string, errorText: string | RegExp): Promise<void> {
    const field = this.page.getByLabel(fieldLabel);
    const errorMessage = field.locator('..').getByRole('alert');
    await expect(errorMessage).toHaveText(errorText);
  }
}
