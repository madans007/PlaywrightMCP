import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to homepage URL
  async goto() {
    await this.page.goto('https://tutorialsninja.com/demo/');
  }

  // Check if first banner image is visible
  async expectFirstBannerVisible() {
    const banner = this.page.locator('img[src*="MacBookAir-1140x380.jpg"]').first();
    await expect(banner).toBeVisible();
  }

  // Check if first featured product is visible
  async expectFirstFeaturedProductVisible() {
    const product = this.page.locator('.product-thumb').first();
    await expect(product).toBeVisible();
  }
}
