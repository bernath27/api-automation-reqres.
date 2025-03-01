const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");
const LoginPage = require("../pages/loginPage");
const InventoryPage = require("../pages/inventoryPage");
const testData = require("../fixtures/testData.json");
const fs = require("fs");
const path = require("path");
const { compareScreenshots } = require("../helper/visualTesting");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;
    let browserName = "chrome";
    let loginPage;
    let inventoryPage;

    beforeEach(async function () {
      // Menambahkan timeout
      this.timeout(30000); // 10.000 ms = 10 detik

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

      await inventoryPage.productPage();

      const CheckoutText = await inventoryPage.getCheckoutMessage();

      assert.strictEqual(
        CheckoutText.includes(testData.CheckOutText),
        true,
        testData.CheckOutMessage
      );

      await inventoryPage.checkoutPage(
        testData.information.firstName,
        testData.information.lastName,
        testData.information.postalCode
      );

      console.log(testData.log.LoginSuccess);
    }),
      it("TC02-Login Failed", async function () {
        await loginPage.login(
          testData.invalidUser.username,
          testData.invalidUser.password
        );

        //assertion
        const errorMessage = await loginPage.getErrorMessage();
        await loginPage.verifyLoginFailed(
          testData.messages.expectedLoginError,
          testData.messages.loginError
        );

        console.log(testData.log.LoginFailed);
      });

    afterEach(async function () {
      const screenshotDir = path.join(__dirname, "../screenshots");
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }

      // Gunakan nama test case untuk screenshot
      const testCaseName = this.currentTest.title.replace(/\s+/g, "_"); // Ganti spasi dengan underscore
      const newImagePath = path.join(screenshotDir, `${testCaseName}_new.png`);
      const baselinePath = path.join(
        screenshotDir,
        `${testCaseName}_baseline.png`
      );

      // Simpan screenshot baru dengan nama test case
      const image = await driver.takeScreenshot();
      fs.writeFileSync(newImagePath, image, "base64");

      // Jika baseline belum ada, simpan screenshot pertama sebagai baseline
      if (!fs.existsSync(baselinePath)) {
        fs.copyFileSync(newImagePath, baselinePath);
      }

      // Bandingkan screenshot berdasarkan nama test case
      await compareScreenshots(testCaseName);
      await driver.quit();
    });
  });
}

saucedemoLoginTest();