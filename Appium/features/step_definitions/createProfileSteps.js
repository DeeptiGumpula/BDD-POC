'use strict';
var _ = require('lodash'),
chai = require('chai' ),
expect = require('chai').expect,
Q = require('q');

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

module.exports = function () {
    //Given steps
    this.Given(/^I am on Welcome screen$/, function (done) {
        this.pages.welcomePage.tapStartBlippingbutton().should.notify(done);
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

    this.Given(/^I tap on the "([^"]*)" card on history screen$/, function (text1,done) {
        var that= this;
            var test=this.pages.scanningPage.matchTemplateImage(text1 ,function(count,center1,center2) {
                console.log('Testing');
                console.log(count);
                console.log(center1);
                expect(count).to.equal(5);
                that.pages.scanningPage.tapByPosition(center1,center2).should.notify(done);
            });
        });

    this.When(/^I tap on the "([^"]*)" on the screen$/, function (text1,done) {
        var that= this;
        this.pages.scanningPage.expandedcardmode().should.notify(done);
        var test=this.pages.scanningPage.matchTemplateImage(text1 ,function(count,center1,center2) {
            console.log('Testing');
            console.log(count);
            console.log(center1);
            expect(count).to.equal(5);
            sleep(9000);
            that.pages.scanningPage.tapByPosition(center1,center2).should.notify(done);
            sleep(9000);
        });
    });
};