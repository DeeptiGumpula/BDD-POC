'use strict';

module.exports = {
  ios: {
    '8.3': {
      platformName: 'ios',
      platformVersion: '8.3',
      deviceName: 'iPhone 6',
      app: __dirname + "/../../apps/appName.zip"
    },
  },

  android: {
    '5.0': {
      platformName: 'Android',
      platformVersion: '5.0',
      deviceName: 'dbef963b',
      app: "/Users/deeptigumpula/Documents/nativeappium/FunctionalTests/Mobile/NativeAppium/build/build.apk",
      noReset:true
    },
  },
};
