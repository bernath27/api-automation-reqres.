const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");

async function InventoryTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;

    beforeEach(async function () {
      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      // Open url
      await loginPage.open("https://saucedemo.com");
      await loginPage.login("standard_user", "secret_sauce");
    });

    it("Add to Cart 1 item", async function () {});

    it("Search Product", async function () {});

    it("View List Product", async function () {});

    afterEach(async function () {
      await driver.quit();
    });
  });
}
InventoryTest();