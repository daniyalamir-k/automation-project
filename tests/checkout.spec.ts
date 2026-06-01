import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { users } from '../utils/test-data';
import { ProductPage } from '../pages/productPage';

test('checkout flow', async ({ page }) => {
    const auth = new AuthPage(page);
    await auth.gotoLogin();
    await auth.login(users.validUser.email, users.validUser.password);
    await expect(page.locator('text=Logged in as')).toBeVisible();

    const product = new ProductPage(page);
    await product.gotoProducts();
    await expect(page.locator('text=Logged in as')).toBeVisible();

    await product.addFirstProductToCart();
    await page.click('a[href="/view_cart"]');
    await page.getByText('Proceed To Checkout').click();

    await expect(page.locator('text=Address Details')).toBeVisible();
});