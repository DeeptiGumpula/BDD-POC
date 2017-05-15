'use strict';
const path = require('path');
const app = path.join(__dirname, '../../build/build1.apk');
module.exports = {
    ios: {
        '10.1': {
            platformName: 'iOS',
            platformVersion: '10.1',
            automationName: 'XCUITest',
            xcodeOrgId: "L8EX4R667P",
            xcodeSigningId: "iPhone Developer: Deepthi Gumpula (4N95T2PMXF)",
            deviceName: '216. iPhone 6',
            udid: 'f3305e357b2c169fef9ec39f4e34bdee4060f513',
            app: "/Users/deeptigumpula/Documents/nativeappium/Appium/build/blipp.ipa",
            noReset: true
        },
    },
  android: {
      '5.0': {
          platformName: 'Android',
          platformVersion: '5.0',
          deviceName: 'dbef963b',
          app:app,
          noReset: true
      },
  },
};

