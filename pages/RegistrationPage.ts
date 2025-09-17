import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly agreeCheckbox: Locator;
  readonly continueButton: Locator;
  readonly registrationSuccessHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');
    this.agreeCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.locator('input[type="submit"][value="Continue"]');
    this.registrationSuccessHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
  }

  async navigateToRegistration() {
    await this.page.goto('https://tutorialsninja.com/demo/');
    await this.page.locator('a[title="My Account"]').click();
    await this.page.locator('a:text("Register")').click();
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, telephone: string, password: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.agreeCheckbox.check();
  }

  async submitForm() {
    await this.continueButton.click();
  }

  async expectRegistrationSuccess() {
    await expect(this.registrationSuccessHeading).toBeVisible();
  }
}
