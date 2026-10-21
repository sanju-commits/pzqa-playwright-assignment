import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';
import { DashboardPage } from '../../Pages.ts/Dashboard';

test('Verify quantity increases by one', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login
    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await dashboardPage.verifyDashboardLoaded();

    // Add product first
    await dashboardPage.addProduct('prod-001');

    // Open Cart
    await dashboardPage.openCart();

    // Decrease quantity
    await dashboardPage.decreaseQuantity('prod-001');

    // Verify quantity
    await expect(
        page.getByTestId('product-quantity-prod-001')
    ).toHaveText('1');
});