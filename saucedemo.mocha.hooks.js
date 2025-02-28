const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    let driver;

    beforeEach(async function () {
      this.timeout(40000); // Tambah timeout jadi 40 detik

      let options = new chrome.Options();
      options.addArguments("--headless=new");
      options.addArguments("--disable-gpu"); 
      options.addArguments("--no-sandbox"); 
      options.addArguments("--disable-dev-shm-usage"); 

      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();

      await driver.get("https://www.saucedemo.com");
    });

    it("TC01-Login & Validate Dashboard", async function () {
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.id("password")).sendKeys("secret_sauce");
      await driver.findElement(By.id("login-button")).click();

      const title = await driver.wait(
        until.elementLocated(By.css(".title")),
        15000
      );
      assert.match(await title.getText(), /Products/, "Dashboard validation failed");
    });

    it("TC02-Add Item & Checkout", async function () {
      this.timeout(60000); // Timeout 60 detik

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.id("password")).sendKeys("secret_sauce");
      await driver.findElement(By.id("login-button")).click();

      const addToCartBtn = await driver.wait(
        until.elementLocated(By.css(".btn_inventory")),
        10000
      );
      await addToCartBtn.click();

      const cartBadge = await driver.wait(
        until.elementLocated(By.css(".shopping_cart_badge")),
        10000
      );
      assert.strictEqual(await cartBadge.getText(), "1", "Item count mismatch in cart");

      await driver.findElement(By.css(".shopping_cart_link")).click();
      await driver.findElement(By.id("checkout")).click();

      await driver.findElement(By.id("first-name")).sendKeys("John");
      await driver.findElement(By.id("last-name")).sendKeys("Doe");
      await driver.findElement(By.id("postal-code")).sendKeys("12345");
      await driver.findElement(By.id("continue")).click();
      await driver.findElement(By.id("finish")).click();

      const completeHeader = await driver.wait(
        until.elementLocated(By.css(".complete-header")),
        10000
      );
      assert.match(await completeHeader.getText(), /Thank you for your order/, "Checkout failed");
    });

    it("TC03-Login Failed", async function () {
      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
      await driver.findElement(By.id("password")).sendKeys("wrongpass");
      await driver.findElement(By.id("login-button")).click();

      const errorMessage = await driver.wait(
        until.elementLocated(By.css(".error-message-container")),
        10000
      );
      assert.match(
        await errorMessage.getText(),
        /Username and password do not match/,
        "Error message mismatch"
      );
    });

    afterEach(async function () {
      if (driver) {
        await driver.quit();
      }
    });
  });
}

saucedemoLoginTest();
