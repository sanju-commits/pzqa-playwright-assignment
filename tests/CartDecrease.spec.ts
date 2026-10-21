import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';
import { DashboardPage } from '../../Pages.ts/Dashboard';

test('Verify quantity decreases by one', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await dashboardPage.verifyDashboardLoaded();

    // First ensure product exists in cart
    await dashboardPage.addProduct('prod-001');

    // Increase once so quantity is > 1
    await dashboardPage.increaseQuantity('prod-001');

    const before =
        await dashboardPage.getQuantity('prod-001');

    await dashboardPage.decreaseQuantity('prod-001');

    const after =
        await dashboardPage.getQuantity('prod-001');

    expect(after).toBe(before - 1);
});