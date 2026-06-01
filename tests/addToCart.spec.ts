import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { users } from '../utils/test-data';
import { ProductPage } from '../pages/productPage';

test('Add Product To Cart - Automation Exercise', async ({ page }) => {

    const auth = new AuthPage(page);
    await auth.gotoLogin();
    await auth.login(users.validUser.email, users.validUser.password);

    const product = new ProductPage(page);
    await product.gotoProducts();
    await product.addFirstProductToCart();
    await product.openCart();

    await expect(page.locator('.cart_description')).toBeVisible();
});