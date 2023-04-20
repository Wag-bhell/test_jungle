// playwright-dev-page.js
const { expect } = require('@playwright/test');
exports.loginPage = class loginPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#email_login');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.locator('[data-testid="login-button-submit"]');
    }

    async goto() {
        await this.page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
    }

    async writeUsername(username) {
        await this.usernameInput.type(username);
    }

    async writePassword(pwd) {
        await this.passwordInput.type(pwd);
    }

    async login(username, pwd) {
        await this.writeUsername(username)
        await this.writePassword(pwd)
        await this.loginBtn.click()
    }
}