import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { users } from '../utils/test-data';
import { ProductPage } from '../pages/productPage';

test('Add Product To Cart - Automation Exercise', async ({ page }) => {

    const auth = new AuthPage(page);
 
     await auth.gotoLogin();
     await auth.login(users.validUser.email, users.validUser.password);

    const product = new ProductPage(page);

    // Go to products page
    await product.gotoProducts();

    // Add first product to cart
    await product.addFirstProductToCart();

    // Open cart page
    await product.openCart();


    // Verify product added
    await expect(page.locator('.cart_description')).toBeVisible();
    

    // Optional pause so you can see cart
    await page.waitForTimeout(3000);
    // last line before closing brace
await page.pause();  // browser stays open, Playwright Inspector pops up
});