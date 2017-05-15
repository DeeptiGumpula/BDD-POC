'use strict';
var basePage = require('./basePage');
const path = require('path');
const images = path.join(__dirname, '../../../resources');
const nodecv = require('nodecv');
const logger = require('logger');
var ScanningPage;

ScanningPage = (function() {

    function ScanningPage(driver) {
        this.driver = driver;
        return this;
    }
    ScanningPage.prototype.tapHistoryIcon = function () {
        var that = this;
        return this.driver.elementById('history_button').tap().then(function (el) {
            console.log('Tapped history button');
           return that.driver.elementById('history_button').then(function (el) {
                return that.driver.saveScreenshot(images + '/source.png').sleep(9000);
            });
        });
    };

    ScanningPage.prototype.tapByPosition = function (center1, center2) {
        return basePage.clickcoordinates(this.driver, center1, center2).sleep(9000);
    };

    ScanningPage.prototype.expandedcardmode = function () {
        return this.driver.saveScreenshot(images + '/source.png').sleep(3000);
    };

    ScanningPage.prototype.matchTemplateImage = function (template, callback) {
        var len_match;
        var center, center1, center2;
        const color = [0, 0, 255];
        const image1Path = path.join(__dirname, '../../../resources', template);
        const image2Path = path.join(__dirname, '../../../resources', 'source.png');
        const outputPath = path.join(__dirname, '../../../resources', 'output.jpg');
        nodecv.imread(image2Path, function (err, image1) {
            console.log("image2Path" + image2Path);
            if (err) {
                throw err;
            }
            nodecv.imread(image1Path, function (err, image2) {

                console.log("image1Path" + image1Path);
                if (err) {
                    throw err;
                }
                nodecv.matchTemplate(image1, image2, 3, function (err, match) {
                    if (err) {
                        throw err;
                    }
                    console.log(match);
                    console.log('This is match');
                    console.log("MATCH" + match.length);
                    image1.rectangle([match[1], match[2]], [match[3], match[4]], color, 1);
                    center1 = match[1]/2;
                    center2 = match[2]/2;
                    console.log("The center 1:" + center1);
                    console.log("The center 2:" + center2);
                    nodecv.imwrite(outputPath, image1);
                    len_match = match.length;
                    callback(len_match, center1, center2)
                })
            })
        })
    }
    return ScanningPage;
})();

module.exports = ScanningPage;
