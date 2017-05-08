'use strict';

var rek = require('rekuire')
    , basePage = require('./basePage.js');

var WelcomePage = (function () {

    function WelcomePage(driver) {
        this.driver = driver;
        return this;
    }

    WelcomePage.prototype.getPageTitle = function () {
        return this.driver.elementById('android:id/button2').tap();
    };

    WelcomePage.prototype.tapStartBlippingbutton = function () {
        return this.driver.elementById('com.blippar.ar.android.beta:id/bt_action').tap();
    };

    WelcomePage.prototype.waitForScanPage = function () {
        var that = this;
        return this.driver.waitForElementById('iv_home_toggle_camera',10000);
    };

    WelcomePage.prototype.tapHistoryIcon = function () {
        var that = this;
        return this.driver.elementById('tab_nav_history').tap().then(function (el) {
            return that.driver.elementById('tab_nav_history').sleep(3000).then(function (el) {
                return that.driver.saveScreenshot(__dirname + '/current_screen.png')})
        });
    };

    return WelcomePage;
})();

module.exports = WelcomePage;
