// playwright-dev-page.js
exports.profilPage = class profilPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.deletePPBtn = page.locator('#avatar button:nth-child(2)');
        this.submitProfilBtn = page.locator('[data-testid="account-edit-button-submit"]');
        this.profilImageInput = page.locator('#avatar input');
    }

    async goto() {
        await this.page.goto('https://www.welcometothejungle.com/fr/me/settings/account');
    }

    async uploadFile(file) {
        if (await this.deletePPBtn.isVisible()) {
            await this.deletePPBtn.click()
        }
        await this.profilImageInput.setInputFiles(file);
        await this.submitProfilBtn.click()
    }

}