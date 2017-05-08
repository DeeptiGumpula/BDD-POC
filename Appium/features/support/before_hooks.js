"use strict";

var capabilities = require('./caps.js')
  , rek = require('rekuire')
  , Q = rek('q');

module.exports = function () {
  this.Before("@android", function(scenario, done){
    console.log(scenario.getName());
    var desiredCapabilities = capabilities[process.env.PLATFORM][process.env.VERSION];
    this.driver.init(desiredCapabilities).nodeify(done);
  });

};
