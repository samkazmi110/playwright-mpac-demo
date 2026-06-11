import { Page, Locator, expect } from '@playwright/test';
import { BaseComponent } from './BaseComponent';

export abstract class BaseTable extends BaseComponent {
  protected abstract readonly headerRow: Locator;
  protected abstract readonly rows: Locator;

  async getRowCount(): Promise<number> {
    return await this.rows.count();
  }

  async getHeaders(): Promise<string[]> {
    const cells = this.headerRow.locator('th');
    const count = await cells.count();
    const headers: string[] = [];
    for (let i = 0; i < count; i++) {
      headers.push((await cells.nth(i).textContent()) ?? '');
    }
    return headers;
  }

  async expectRowCount(expected: number): Promise<void> {
    await expect(this.rows).toHaveCount(expected);
  }

  getRow(index: number): Locator {
    return this.rows.nth(index);
  }
}
