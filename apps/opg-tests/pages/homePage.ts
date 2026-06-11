import { Page, Locator } from '@playwright/test';
import { BasePage } from '@opg/pw-ui';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.goto('/');
  }

  get heroHeading(): Locator {
    return this.page.getByRole('heading', { name: /ELECTRICITY IS ONTARIO'S SUPERPOWER/i });
  }

  get electricFutureHeading(): Locator {
    return this.page.getByRole('heading', { name: /Powering the electric future/i });
  }

  get electrifyCareerHeading(): Locator {
    return this.page.getByRole('heading', { name: /Electrify your career/i });
  }

  get buildCampaignCta(): Locator {
    return this.page.locator('a[href*="/build"]').first();
  }

  async openBuildCampaignPage(): Promise<void> {
    await this.buildCampaignCta.click();
  }
}
