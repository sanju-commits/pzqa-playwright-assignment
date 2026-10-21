import { test } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';

test('login with valid credentials', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await loginPage.verifySuccessfulLogin();
});
