const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert')


async function sauceDemoLoginTest(){
     // Koneksi dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get("https://www.saucedemo.com");

        //Input username dan Password
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce', Key.RETURN);

        //Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        // Validasi login sukses
        let currentUrl = await driver.getCurrentUrl();
        console.log('Login berhasil:', currentUrl.includes('inventory'));
    } catch (error) {
        console.error('Error:', error);

        // Memastikan kita di Dashboard dengan mencari judul "Swag Labs"
        let titletext = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titletext.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        // Memastikan kita di Dashboard dengan mencari "Burger Button"
        let menuButton =await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        // Menambahkan item ke cart
        await driver.findElement(By.css('.inventory_item .btn_inventory')).click(); 

        // Validasi bahwa item berhasil ditambahkan
        let cartBadge = await driver.findElement(By.className('shopping_cart_badge')).getText();
        console.log('Jumlah item di keranjang:', cartBadge);

    }    finally {
       
        await driver.quit();
    }


}
sauceDemoLoginTest();
