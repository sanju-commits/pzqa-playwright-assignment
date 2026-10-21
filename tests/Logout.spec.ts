import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Pages.ts/LoginPage';
import { DashboardPage } from '../../Pages.ts/Dashboard';

test('Verify user can logout successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login(
        'qatester@pz.com',
        'password@123'
    );

    await dashboardPage.verifyDashboardLoaded();

    await dashboardPage.logout();

    await expect(page).toHaveURL(/login/);
});