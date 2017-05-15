'use strict';

var Q = require('q')
    , async = require('async')
    , wd = require('wd')
    , Asserter = wd.Asserter
    , chai = require("chai");
var rek = require('rekuire');

exports.getListOfElementsNamesByClassName = function(driver, className){
  return Q.Promise(function(resolve){
    driver.elementsByClassName(className).then(function(elements) {
      async.map(elements, function(element, callback){
        element.getAttribute('name').then(function(name){
            callback(null, name);
          });
        }, function(err, results){
              resolve(results);
           }
      );
    });
  });
};

exports.clickcoordinates = function (driver,x1,y1) {
    var action = new wd.TouchAction();
    action
        .press({x:x1, y:y1 })
        .release();
    return driver.performTouchAction(action);
};
