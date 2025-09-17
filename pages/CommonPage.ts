import { Page } from '@playwright/test';

export class CommonPage {
  readonly page: Page;
  readonly myAccountMenu = 'a[title="My Account"]';
  readonly logoutLink = 'a:has-text("Logout")';

  constructor(page: Page) {
    this.page = page;
  }

  async openMyAccountMenu() {
    await this.page.hover(this.myAccountMenu);
  }

  async logoutIfPossible() {
    await this.openMyAccountMenu();
    if (await this.page.locator(this.logoutLink).count() > 0 && await this.page.locator(this.logoutLink).isVisible()) {
      await this.page.locator(this.logoutLink).click();
    }
  }
}
