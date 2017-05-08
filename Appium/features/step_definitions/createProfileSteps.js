'use strict';
var _ = require('lodash')
  , Q = require('q');

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

module.exports = function() {
  //Given steps
  this.Given(/^I am on Welcome screen$/, function (done) {
    this.pages.welcomePage.Page.tapStartBlippingbutton().should.notify(done);
    console.log('This test is done');
  });

  //When steps
  this.When(/^I go to scanning screen$/, function (done) {
      sleep(50000);
      this.pages.welcomePage.waitForScanPage().should.notify(done);
      console.log('Successfully');
  });

  this.When(/^I tap on History icon$/, function (done) {
      console.log('Scanning screen in launched');
      this.pages.scanningPage.tapHistoryIcon().should.notify(done);
  });

};