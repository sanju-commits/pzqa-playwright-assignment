import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {

    readonly page: Page;
    readonly cartCount: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.cartCount = page.getByTestId('cart-count');
        this.logoutButton = page.getByTestId('logout-button');
    }

    async addProduct(productId: string) {

        await this.page
            .getByTestId(`add-to-cart-${productId}`)
            .click();
    }

    async increaseQuantity(productId: string) {

        await this.page
            .getByTestId(`cart-increase-${productId}`)
            .click();
    }

    async decreaseQuantity(productId: string) {

        await this.page
            .getByTestId(`cart-decrease-${productId}`)
            .click();
    }

    async getQuantity(productId: string): Promise<number> {

    const quantity = await this.page
        .getByTestId(`product-quantity-${productId}`)
        .textContent();

    return Number(quantity);
    }

    async openCart() {

        await this.cartCount.click();
    }

    async logout() {

    await this.logoutButton.click();

    await this.page.waitForURL('**/login');
}

    async verifyDashboardLoaded() {

        await expect(
            this.page.getByRole('heading', { name: 'Products' })
        ).toBeVisible();
    }

    async verifyCartCount(expectedCount: string) {

        await expect(this.cartCount)
            .toHaveText(expectedCount);
    }
}