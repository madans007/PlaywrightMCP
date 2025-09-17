import accountData from '../testData/accountData.json';
test('Edit account info after registration using sample data', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  // Register a new account
  await page.locator('a[title="My Account"]').click();
  await page.locator('a:text("Register")').click();
  await page.locator('#input-firstname').fill('Test');
  await page.locator('#input-lastname').fill('User');
  const email = `testuser_${Date.now()}@example.com`;
  await page.locator('#input-email').fill(email);
  await page.locator('#input-telephone').fill('1234567890');
  await page.locator('#input-password').fill('Password123!');
  await page.locator('#input-confirm').fill('Password123!');
  await page.locator('input[name="agree"]').check();
  await page.locator('input[type="submit"][value="Continue"]').click();
  await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
  // Click Continue button
  await page.locator('a.btn.btn-primary').click();
  // Go to Edit Account Info
  await page.locator('a:text("Edit your account information")').click();
  // Update account info using JSON data
  await page.locator('#input-firstname').fill(accountData.firstName);
  await page.locator('#input-lastname').fill(accountData.lastName);
  await page.locator('#input-email').fill(accountData.email);
  await page.locator('#input-telephone').fill(accountData.telephone);
  await page.locator('input[type="submit"][value="Continue"]').click();

  // Check for success or error alert
  const successAlert = page.locator('.alert-success');
  const errorAlert = page.locator('.alert-danger');

  if (await successAlert.isVisible({ timeout: 5000 })) {
    await expect(successAlert).toHaveText(/Success: Your account has been successfully updated./);
  } else if (await errorAlert.isVisible()) {
    const errorText = await errorAlert.textContent();
    throw new Error('Account update failed: ' + errorText);
  } else {
    throw new Error('No success or error message found after account update.');
  }

});
test('Register a new account via My Account', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  // Click on 'My Account' dropdown
  await page.locator('a[title="My Account"]').click();
  // Click on 'Register' option
  await page.locator('a:text("Register")').click();
  // Fill registration form
  await page.locator('#input-firstname').fill('Test');
  await page.locator('#input-lastname').fill('User');
  await page.locator('#input-email').fill(`testuser_${Date.now()}@example.com`);
  await page.locator('#input-telephone').fill('1234567890');
  await page.locator('#input-password').fill('Password123!');
  await page.locator('#input-confirm').fill('Password123!');
  // Agree to Privacy Policy
  await page.locator('input[name="agree"]').check();
  // Submit registration
  await page.locator('input[type="submit"][value="Continue"]').click();
  // Assert registration success
  await expect(page.getByRole('heading', { name: 'Your Account Has Been Created!' })).toBeVisible();
  // Assert additional success messages below the heading
  await expect(page.locator('#content > p').first()).toHaveText('Congratulations! Your new account has been successfully created!');
  await expect(page.locator('#content > p').nth(1)).toHaveText('You can now take advantage of member privileges to enhance your online shopping experience with us.');
  await expect(page.locator('#content > p').nth(2)).toHaveText('If you have ANY questions about the operation of this online shop, please e-mail the store owner.');
  await expect(page.locator('#content > p').nth(3)).toHaveText('A confirmation has been sent to the provided e-mail address. If you have not received it within the hour, please contact us.');
});
import { test, expect } from '@playwright/test';

test('Homepage loads and displays first banner and first featured product', async ({ page }) => {
  await page.goto('https://tutorialsninja.com/demo/');
  // Check that the first homepage banner is visible
  await expect(page.locator('img[src*="MacBookAir-1140x380.jpg"]').first()).toBeVisible();
  // Check that the first featured product is visible
  await expect(page.locator('.product-thumb').first()).toBeVisible();
});
