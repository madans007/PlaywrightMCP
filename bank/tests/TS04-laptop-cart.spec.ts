import { test } from '@playwright/test';
import { LaptopsPage } from '../../pages/LaptopsPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart and Coupon Tests', () => {
  test('Select Sony Vaio and MacBook Pro, add to cart, and view cart', async ({ page }) => {
    const laptopsPage = new LaptopsPage(page);
    const cartPage = new CartPage(page);

    await page.goto('https://tutorialsninja.com/demo/');
    await laptopsPage.navigateToLaptopsPage();

    await laptopsPage.addSonyVaioToCart();
    await laptopsPage.addMacBookProToCart();

    await cartPage.goToCart();
    await cartPage.verifyCartItems('Sony VAIO', 'MacBook Pro');
  });

  test('Apply coupon in cart, attempt checkout, and logout if checkout fails', async ({ page }) => {
    const laptopsPage = new LaptopsPage(page);
    const cartPage = new CartPage(page);

    await page.goto('https://tutorialsninja.com/demo/');

    // Add laptops to cart (reusing methods for consistent state)
    await laptopsPage.addSonyVaioToCart();
    await laptopsPage.addMacBookProToCart();

    await cartPage.goToCart();

    // Apply coupon code
    await cartPage.applyCoupon('TESTCOUPON');

    if (await cartPage.isCouponErrorVisible()) {
      // If coupon fails, logout
      await cartPage.logoutIfLoggedIn();
    } else {
      // If coupon success, try to checkout
      await cartPage.proceedToCheckout();
    }
  });
});
