import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';
import { DashboardPage } from '../../Pages.ts/Dashboard';

test('Verify multiple products can be added to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await dashboardPage.verifyDashboardLoaded();

    const before =
        Number(await page.getByTestId('cart-count').textContent());

    await dashboardPage.addProduct('prod-001');
    await dashboardPage.addProduct('prod-002');
    await dashboardPage.addProduct('prod-003');

    const after =
        Number(await page.getByTestId('cart-count').textContent());

    expect(after).toBe(before + 3);
});