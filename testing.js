const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

async function saucedemoLoginTest() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Buka halaman login
        await driver.get('https://www.saucedemo.com/');

        // Input username dan password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.css('input[placeholder="Password"]')).sendKeys('secret_sauce');

        // Klik tombol login
        await driver.findElement(By.css('input[value="Login"]')).click();

        // Validasi user berada di dashboard setelah login
        let titleText = await driver.findElement(By.xpath('//div[@class="app_logo"]')).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, 'Title does not include "Swag Labs"');

        // Tambahkan item ke cart
        await driver.findElement(By.css('button[data-test="add-to-cart-sauce-labs-backpack"]')).click();

        // Validasi item sukses ditambahkan ke cart
        let cartBadge = await driver.findElement(By.css('span.shopping_cart_badge')).getText();
        assert.strictEqual(cartBadge, '1', 'Item was not added to the cart');

    } finally {
        // Tutup browser
        await driver.quit();
    }
}

saucedemoLoginTest();