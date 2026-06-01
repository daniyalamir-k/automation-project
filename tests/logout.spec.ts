import { test, expect } from '@playwright/test';
import { AuthPage } from '../pages/authPage';
import { users } from '../utils/test-data';

test('User Logout Test - Automation Exercise', async ({ page }) => {

    const auth = new AuthPage(page);

    await auth.gotoLogin();
    await auth.login(users.validUser.email, users.validUser.password);

    await auth.logout();

    // back to login page
    await expect(page).toHaveURL('https://automationexercise.com/login');
});