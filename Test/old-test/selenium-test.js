const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

async function saucedemoLoginTest() {
  // Membuat koneksi dengan webdriver
  let driver = await new Builder().forBrowser("chrome").build();

  // Exception Handling & Conclusion
  try {
    // Buka URL di browser
    await driver.get("https://saucedemo.com");

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


  } finally {
    //await driver.quit();
  }
}

saucedemoLoginTest();

//span[@class='shopping_cart_badge']