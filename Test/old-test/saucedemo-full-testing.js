const { Builder, By, Key, until, Options } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const edge = require("selenium-webdriver/edge");

async function saucedemoLoginTest() {
  describe("Saucedemo Login Test", function () {
    const browsers = [
        {
          name: 'chrome',
          options: new chrome.Options().addArguments("--headless"),
        },
        {
        name: 'firefox',
          options: new firefox.Options().addArguments("--headless"),
        },
        {
          name: 'MicrosoftEdge',
          options: new edge.Options().addArguments("--headless"),
        },  
        ];
        beforeEach(async function () {
          this.timeout(30000);
      for (let browser of browsers) {// Membuat koneksi dengan webdriver
          driver = await new Builder().forBrowser(browser.name)
          .setChromeOptions(browser.name == "chrome" ? browser.options : undefined)
          .setFirefoxOptions(browser.name == "firefox" ? browser.options : undefined)
          .setEdgeOptions(browser.name == "MicrosoftEdge" ? browser.options : undefined)
          .build();
      await driver.get("https://saucedemo.com");
      //simpan cookie
      cookies = await driver.manage().getCookies();
      }
    });

    it("TC01-Login Success", async function () {
      //panggil cookie

      await driver.findElement(By.id("user-name")).sendKeys("standard_user");
          await driver
            .findElement(By.xpath("//input[@id='password']"))
            .sendKeys("secret_sauce");
      
          await driver.findElement(By.name("login-button")).click();
      
          //assertion
          let titleText = await driver.findElement(By.css(".app_logo")).getText();
          assert.strictEqual(
            titleText.includes("Swag Lab"),
            true,
            'Title does not include "Swag Labs"'
          );
      
          await driver.findElement(By.id("add-to-cart-sauce-labs-backpack")).click();
          await driver.findElement(By.className("shopping_cart_link")).click();
      
          //assertion
          let checkOut = await driver.findElement(By.css("#checkout")).getText();
          assert.strictEqual(
            checkOut.includes("Checkout"),
            true,
            'You Cannot Checkout This Product'
          );
          
          await driver.findElement(By.id("checkout")).click();
          await driver.findElement(By.id("first-name")).sendKeys("Muhammad");
          await driver.findElement(By.id("last-name")).sendKeys("Rafi Ramadhan");
          await driver.findElement(By.id("postal-code")).sendKeys("17122");
          await driver.findElement(By.id("continue")).click();
          await driver.findElement(By.id("finish")).click();
          await driver.findElement(By.id("back-to-products")).click();
      console.log("Testing Success! With Browser ");
    }),
      it("TC02-Login Failed", async function () {
        await driver.findElement(By.id("user-name")).sendKeys("standard_user");
        await driver
          .findElement(By.xpath("//input[@id='password']"))
          .sendKeys("passwordsalah");

        await driver.findElement(By.name("login-button")).click();

        //assertion
        let errorMessage = await driver
          .findElement(By.css(".error-message-container"))
          .getText();
        assert.strictEqual(
          errorMessage.includes("Username and password do not match"),
          true,
          "Error Message do not match"
        );
        console.log("Testing Failed = Success! With Browser ");
      });
    afterEach(async function () {
      await driver.quit();
    });
});
}


saucedemoLoginTest();