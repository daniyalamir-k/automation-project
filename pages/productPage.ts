import { Page } from '@playwright/test';

export class ProductPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoProducts() {
        await this.page.goto('/products');
    }

async addFirstProductToCart() {
    const product = this.page.locator('.product-image-wrapper').first();

    await product.hover();

    await this.page.locator('.product-image-wrapper')
        .first()
        .locator('a.add-to-cart')
        .first()
        .click();

    await this.page.waitForSelector('.modal-content');
    await this.page.click('button.close-modal');
}
    async openCart() {
        await this.page.click('a[href="/view_cart"]');
    }

}