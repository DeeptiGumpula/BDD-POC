'use strict';
var basePage = require('./basePage');

var ScanningPage = (function() {

    function ScanningPage(driver) {
        this.driver = driver;
        return this;
    }

    ScanningPage.prototype.tapHistoryIcon = function () {
        var that = this;
        return this.driver.elementById('tab_nav_history').tap().then(function (el) {
            return that.driver.elementById('tab_nav_history').sleep(3000).then(function (el) {
                return that.driver.saveScreenshot(__dirname + '/current_screen.png')})
        });
    };
    return ScanningPage;
})();

module.exports = ScanningPage;
