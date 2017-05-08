# Functional Tests

This is the cucumber style BDD framework for testing mobile apps using JavaScript Appium driver.
###Steps to Run Android Suite
- Start specific version of android emulator before test run or connect real device.
- To run android tests using grunt - grunt android:5.0 (specify version number as required)
- To run android tests using cucumber, PLATFORM='android' VERSION='4.2' cucumber.js --tags @android
- Reports will be generated inside reports folder as android-report.html
- Error logs will be generated logs folder

Note:Before running tests .Go to features/support/caps.js and update app path.As i have hardcoded the path.

