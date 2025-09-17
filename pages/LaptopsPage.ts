import { Page, Locator, expect } from '@playwright/test';

export class LaptopsPage {
  readonly page: Page;
  readonly laptopsDropdown: Locator;
  readonly showAllLaptopsLink: Locator;
  readonly sonyVaioLink: Locator;
  readonly macBookProLink: Locator;
  readonly addToCartButton: Locator;
  readonly successAlert: Locator;
  readonly laptopsPageHeading: Locator;
  readonly laptopsBreadcrumbLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.laptopsDropdown = page.locator('a[data-toggle="dropdown"]:has-text("Laptops & Notebooks")');
    this.showAllLaptopsLink = page.locator('a:has-text("Show All Laptops & Notebooks")').first(); // 🔧 FIXED
    this.sonyVaioLink = page.getByRole('link', { name: 'Sony VAIO' }).first();
    this.macBookProLink = page.getByRole('link', { name: 'MacBook Pro' }).first();
    this.addToCartButton = page.locator('#button-cart');
    this.successAlert = page.locator('.alert-success');
    this.laptopsPageHeading = page.getByRole('heading', { name: 'Laptops & Notebooks' });
    this.laptopsBreadcrumbLink = page.locator('ul.breadcrumb li a:has-text("Laptops & Notebooks")');
  }

  async navigateToLaptopsPage() {
  await this.laptopsDropdown.hover();
  await this.page.waitForTimeout(500); // add delay to let dropdown render
  await this.showAllLaptopsLink.waitFor({ state: 'visible', timeout: 5000 });
  await this.showAllLaptopsLink.click();
  await expect(this.page).toHaveURL(/.*path=18/);
  await expect(this.laptopsPageHeading).toBeVisible();
}


  async addSonyVaioToCart() {
  await this.page.waitForLoadState('domcontentloaded');
  await expect(this.sonyVaioLink).toBeVisible({ timeout: 5000 });
  await this.sonyVaioLink.click();
  await expect(this.page.getByRole('heading', { name: 'Sony VAIO' })).toBeVisible();
  await this.addToCartButton.click();
  await expect(this.successAlert).toContainText('Success: You have added Sony VAIO to your shopping cart!');
}


  async addMacBookProToCart() {
    await this.laptopsBreadcrumbLink.click(); // Navigate back to Laptops page
    await expect(this.macBookProLink).toBeVisible();
    await this.macBookProLink.click();
    await expect(this.page.getByRole('heading', { name: 'MacBook Pro' })).toBeVisible();
    await this.addToCartButton.click();
    await expect(this.successAlert).toContainText('Success: You have added MacBook Pro to your shopping cart!');
  }
}
