import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginSubmitButton: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        this.page = page;

        this.loginEmailInput = page.getByTestId('login-email');
        this.loginPasswordInput = page.getByTestId('login-password');
        this.loginSubmitButton = page.getByTestId('login-submit');
        this.loginError = page.getByTestId('login-error');
    }

    async navigateToLoginPage() {
        await this.page.goto('https://pzqa.vercel.app/login');
    }

    async login(email: string, password: string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginSubmitButton.click();
    }

    async verifySuccessfulLogin() {
        await expect(
            this.page.getByRole('heading', { name: 'Products' })
        ).toBeVisible();
    }

     async verifyUnSuccessfulLogin() {

    const error = this.page.getByRole('alert').filter({
    hasText: 'Invalid username or password',
  });
  await expect(error).toBeVisible();
  }
}
