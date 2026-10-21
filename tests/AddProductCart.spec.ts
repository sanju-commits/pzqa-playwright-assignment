import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';
import { DashboardPage } from '../../Pages.ts/Dashboard';

test('Verify user can add product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await dashboardPage.verifyDashboardLoaded();

    await dashboardPage.addProduct('prod-001');

    await expect(
        page.getByTestId('cart-increase-prod-001')
    ).toBeVisible();

    await expect(
        page.getByTestId('cart-decrease-prod-001')
    ).toBeVisible();
});