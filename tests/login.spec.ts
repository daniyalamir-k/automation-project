import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { users } from '../utils/test-data';

test('User Login Test - Automation Exercise', async ({ page }) => {

    const auth = new AuthPage(page);

    await auth.gotoLogin();
    await auth.login(users.validUser.email, users.validUser.password);

    //  Logged in check
    await expect(page.locator('a[href="/logout"]')).toBeVisible();
});