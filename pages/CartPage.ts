import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartHeading: Locator;
  readonly useCouponCodeLink: Locator;
  readonly couponInput: Locator;
  readonly applyCouponButton: Locator;
  readonly couponErrorAlert: Locator;
  readonly checkoutLink: Locator;
  readonly accountMenu: Locator;
  readonly logoutLink: Locator;
  readonly logoutHeading: Locator;
  readonly cartTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.locator('a:has-text("shopping cart")').first();
    this.shoppingCartHeading = page.getByRole('heading', { name: 'Shopping Cart' });
    this.useCouponCodeLink = page.locator('a:has-text("Use Coupon Code")');
    this.couponInput = page.locator('input[name="coupon"]');
    this.applyCouponButton = page.locator('input[type="button"][value="Apply Coupon"]');
    this.couponErrorAlert = page.locator('.alert-danger');
    this.checkoutLink = page.locator('a:has-text("Checkout")').first();
    this.accountMenu = page.locator('a[title="My Account"]');
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.logoutHeading = page.getByRole('heading', { name: 'Account Logout' });
    this.cartTable = page.locator('table.table-bordered').nth(1);
  }

  async goToCart() {
    await this.shoppingCartLink.click();
    await expect(this.shoppingCartHeading).toBeVisible();
  }

  async applyCoupon(couponCode: string) {
    await this.useCouponCodeLink.click();
    await this.couponInput.fill(couponCode);
    await this.applyCouponButton.click();
  }

  async isCouponErrorVisible() {
    return this.couponErrorAlert.isVisible({ timeout: 5000 });
  }

  async logoutIfLoggedIn() {
    await this.accountMenu.hover();
    const logoutVisible = await this.logoutLink.count() > 0 && await this.logoutLink.isVisible();
    if (logoutVisible) {
      await this.logoutLink.click();
      await expect(this.logoutHeading).toBeVisible();
    } else {
      console.log('Logout link not found. User may already be logged out or not logged in.');
    }
  }

  async proceedToCheckout() {
    await this.checkoutLink.click();
    await expect(this.page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  }

  async verifyCartItems(...items: string[]) {
    for (const item of items) {
      await expect(this.cartTable).toContainText(item);
    }
  }
}
