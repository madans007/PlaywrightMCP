import { Page, Locator, expect } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly continueButton: Locator;
  readonly editAccountInfoLink: Locator;
  readonly backButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueButton = page.locator('a.btn.btn-primary');
    this.editAccountInfoLink = page.locator('a:text("Edit your account information")');
    this.backButton = page.locator('a.btn.btn-default');
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.submitButton = page.locator('input[type="submit"][value="Continue"]');
    this.successAlert = page.locator('.alert-success');
    this.errorAlert = page.locator('.alert-danger');
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async navigateToEditAccountInfo() {
    await this.editAccountInfoLink.click();
  }

  async clickBackButton() {
    await this.backButton.click();
  }

  async fillEditAccountForm(firstName: string, lastName: string, email: string, telephone: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.telephoneInput.fill(telephone);
  }

  async submitEditAccountForm() {
    await this.submitButton.click();
  }

  async verifyUpdateSuccessOrFail() {
    if (await this.successAlert.isVisible({ timeout: 7000 })) {
      await expect(this.successAlert).toHaveText(/Success: Your account has been successfully updated./);
    } else if (await this.errorAlert.isVisible()) {
      const errorText = await this.errorAlert.textContent();
      throw new Error('Account update failed: ' + errorText);
    } else {
      throw new Error('No success or error message found after account update.');
    }
  }
}
