const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(60000); // 10.000 ms = 10 detik

      // Membuat koneksi dengan webdriver
      driver = await new Builder().forBrowser(browserName).build();
      loginPage = new LoginPage(driver);
      inventoryPage = new InventoryPage(driver);
      // Open url
      await loginPage.open(testData.baseUrl);
    });

    it("TC01-Login Success", async function () {
      await loginPage.login(
        testData.validUser.username,
        testData.validUser.password
      );

      //assertion
      const titleText = await inventoryPage.getTitleText();

      assert.strictEqual(
        titleText.includes(testData.assertTitle),
        true,
        testData.titleError
      );

      console.log(testData.log.LoginSuccess);
    }),
      it("TC02-Login Failed", async function () {
        await loginPage.login(
          testData.invalidUser.username,
          testData.invalidUser.password
        );

        //assertion
        await loginPage.verifyLoginFailed(
          testData.messages.expectedLoginError,
          testData.messages.loginError
        );

        console.log(testData.log.LoginFailed);
      });

    afterEach(async function () {
      await driver.quit();
    });
  });
}

saucedemoLoginTest();