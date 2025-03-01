const { By } = require("selenium-webdriver");
const assert = require("assert");

class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.inventoryList = By.className("inventory_list");
    this.appLogo = By.css(".app_logo");
    this.producttoCart = By.id("add-to-cart-sauce-labs-backpack");
    this.shoppingCart = By.className("shopping_cart_link");
    this.checkOut = By.id("checkout");
    this.firstNameInput = By.id("first-name");
    this.lastNameInput = By.id("last-name");
    this.postalCodeInput = By.id("postal-code");
    this.continue = By.id("continue");
    this.finish = By.id("finish");
    this.home = By.id("back-to-products");
  }

  async productPage() {
    await this.driver.findElement(this.producttoCart).click();
    await this.driver.findElement(this.shoppingCart).click();
  }

  async checkoutPage(firstName, lastName, postalCode) {
    await this.driver.findElement(this.checkOut).click();
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
    await this.driver.findElement(this.postalCodeInput).sendKeys(postalCode);
    await this.driver.findElement(this.continue).click();
    await this.driver.findElement(this.finish).click();
  }

  async getTitleText() {
    return await this.driver.findElement(this.appLogo).getText();
  }

  async getCheckoutMessage(){
    return await this.driver.findElement(this.checkOut).getText();
  }

  async CheckoutMessage(CheckoutText, Message){
    const checkOut = await this.getCheckoutMessage();
    assert.strictEqual(checkOut.includes(CheckoutText), true, Message);
  }
}

module.exports = InventoryPage;