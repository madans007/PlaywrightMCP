/*import { test, expect } from '@playwright/test';

test('Homepage loads and displays first banner and first featured product', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  await expect(page.locator('img[src*="MacBookAir-1140x380.jpg"]').first()).toBeVisible();
  await expect(page.locator('.product-thumb').first()).toBeVisible();
});
*/


import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('Homepage loads and displays first banner and first featured product', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.expectFirstBannerVisible();
  await homePage.expectFirstFeaturedProductVisible();
});
