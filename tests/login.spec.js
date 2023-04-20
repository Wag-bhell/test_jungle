// example.spec.js
const { test, expect, chromium } = require('@playwright/test');
const { loginPage } = require('../src/pages/loginPage');
const { profilPage } = require('../src/pages/profilPage');
const { helper } = require('../src/model/helper');
var Jimp = require("jimp");
const file1 = __dirname + "/../src/jdd/profil.png"

test('Login to welcome to the jungle and upload profil', async({ page }) => {
    const home = new loginPage(page);
    await home.goto();
    await home.login("inqom.qaautomationapplicant@gmail.com", "o5N,d5ZR@R7^")
    await expect(page).toHaveURL('https://www.welcometothejungle.com/fr/me/settings/account')

    const profil = new profilPage(page);
    await profil.uploadFile(file1)
    await profil.page.reload()

    //download the displayed image
    await helper.downloadImage(await profil.page.locator("#avatar img").getAttribute('src'), 'src/jdd/output.png')

    //compare with uploaded image
    const diff = Jimp.diff(await Jimp.read(file1), await Jimp.read(__dirname + "/../src/jdd/output.png"))
    expect(diff.percent).toEqual(0)
});