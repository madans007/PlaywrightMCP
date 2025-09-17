import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';
import { AccountPage } from '../../pages/AccountPage';
import accountData from '../testData/accountData.json';

test.describe('Account Edit Tests', () => {
  test('Back button navigates to account overview from Edit Account Info', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const accountPage = new AccountPage(page);

    // Register a new account
    await registrationPage.navigateToRegistration();
    const email = `testuser_${Date.now()}@example.com`;
    await registrationPage.fillRegistrationForm('Test', 'User', email, '1234567890', 'Password123!');
    await registrationPage.submitForm();

    await registrationPage.expectRegistrationSuccess();

    // Continue to Account Overview
    await accountPage.clickContinueButton();

    // Navigate to Edit Account Info
    await accountPage.navigateToEditAccountInfo();

    // Click Back button on Edit Account Info page
    await accountPage.clickBackButton();

    // Verify navigation back to Account Overview page
    await expect(accountPage.editAccountInfoLink).toBeVisible();
  });

  test('Edit account info after registration using sample data', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    const accountPage = new AccountPage(page);

    // Register a new account
    await registrationPage.navigateToRegistration();
    const email = `testuser_${Date.now()}@example.com`;
    await registrationPage.fillRegistrationForm('Test', 'User', email, '1234567890', 'Password123!');
    await registrationPage.submitForm();

    await registrationPage.expectRegistrationSuccess();

    // Continue to Account Overview
    await accountPage.clickContinueButton();

    // Navigate to Edit Account Info
    await accountPage.navigateToEditAccountInfo();

    // Fill edit form with updated data from accountData.json
    await accountPage.fillEditAccountForm(
      accountData.firstName,
      accountData.lastName,
      `updateduser_${Date.now()}@example.com`,  // unique updated email
      accountData.telephone
    );

    await accountPage.submitEditAccountForm();

    // Verify success or throw error if failed
    await accountPage.verifyUpdateSuccessOrFail();
  });
});
