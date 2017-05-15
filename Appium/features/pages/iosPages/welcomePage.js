'use strict';


var WelcomePage;

WelcomePage = (function() {

    function WelcomePage(driver) {
        this.driver = driver;
        return this;
    }

    WelcomePage.prototype.getTitle = function() {
        return this.driver.elementByClassName('UIAStaticText').text();
    };

    WelcomePage.prototype.waitForScanPage = function () {
        var that = this;
        return this.driver.waitForElementById('buttonCamera',10000).sleep(3000);
    };

    WelcomePage.prototype.tapOkButton = function () {
        return this.driver.elementById('OK').tap();
    };

    WelcomePage.prototype.tapSetupBlipparButton = function () {
        return this.driver.elementById('OK').tap();
    };

    WelcomePage.prototype.startBlippingButton = function () {
        return this.driver.elementById('start blipping').tap();
    };


    return WelcomePage;
})();

module.exports = WelcomePage;
