import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/RegistrationPage';

test('Register a new account via My Account', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.navigateToRegistration();

  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  await registrationPage.fillRegistrationForm('Test', 'User', uniqueEmail, '1234567890', 'Password123!');

  await registrationPage.submitForm();

  await registrationPage.expectRegistrationSuccess();
});
