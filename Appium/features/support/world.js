"use strict";

var util = require('util')
    , path = require('path')
    , pagesPath = util.format('../pages/%sPages', process.env.PLATFORM)
    , WelcomePage = require(path.join(pagesPath, 'welcomePage.js'))
    , ScanningPage = require(path.join(pagesPath,'scanningPage.js'));

module.exports = function () {
    var wd = require('wd');
    var chai = require("chai");
    chai.should();
    chai.config.truncateThreshold = 0;
    var chaiAsPromised = require("chai-as-promised");
    chai.use(chaiAsPromised);
    chaiAsPromised.transferPromiseness = wd.transferPromiseness;

    this.World = function World(callback) {
        this.driver = wd.promiseChainRemote({host: 'localhost', port: 4723});
        this.pages = {
            welcomePage: new WelcomePage(this.driver),
            scanningPage: new ScanningPage(this.driver)
        };
        callback();
    };
};
