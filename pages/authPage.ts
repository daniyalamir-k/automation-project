import { Page, expect } from '@playwright/test';

export class AuthPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoLogin() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        await this.page.fill('input[data-qa="login-email"]', email);
        await this.page.fill('input[data-qa="login-password"]', password);

        await this.page.click('button[data-qa="login-button"]');

        // 🔥 IMPORTANT: wait for login success
        await expect(this.page.locator('text=Logged in as')).toBeVisible();
    }

    async logout() {
        const logoutBtn = this.page.locator('a[href="/logout"]');

        await expect(logoutBtn).toBeVisible();
        await logoutBtn.click();
    }
}