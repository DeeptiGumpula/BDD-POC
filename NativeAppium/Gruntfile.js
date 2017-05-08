'use strict';

var forever = require('forever-monitor')
    , path = require('path')
    , ps = require('ps-node')
    , format = require('string-template')
    , _ = require('lodash');

module.exports = function (grunt) {

    grunt.initConfig({

        mkdir: {
            all: {
                options: {
                    create: ['log', 'reports', 'reports/screenshot']
                }
            },
        },

        cucumberjs: {
            android: {
                options: {
                    format: 'pretty',
                    output: './reports/regression-report.html',
                    theme: 'bootstrap',
                    tags: ['@android', '~@wip'],
                    debug: false
                },
                features: []
            },
        },

        clean: {
            reports: ['reports', 'log']
        }
    });

    grunt.loadNpmTasks('grunt-cucumberjs');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('appium:start', 'Start appium server', function () {
        var done = this.async();
        var appium = forever.start(['./node_modules/.bin/appium'], {
            max: 1,
            silent: true,
            pidFile: path.join(__dirname, 'appium.pid'),
            logFile: path.join(__dirname, 'log', 'appium.log'),
            outFile: path.join(__dirname, 'log', 'appium.log'),
            errFile: path.join(__dirname, 'log', 'appium_error.log')
        });

        appium.once('stdout', function () {
            grunt.log.ok('Appium server opened for business');
            appium.removeAllListeners('stderr');
            done();
        });

        appium.once('stderr', function (err) {
            grunt.log.error(format('Unable to start appium, {0}', [err]));
            appium.removeAllListeners('stdout');
            done(false);
        });
    });

    grunt.registerTask('appium:stop', 'Stop appium server', function () {
        var done = this.async();
        ps.lookup({
            command: 'node',
            arguments: './node_modules/.bin/appium',
            psargs: 'ux'
        }, function (err, results) {
            var process = results[0];
            if (process) {
                ps.kill(process.pid, function () {
                    grunt.log.ok('Stopped running appium server');
                    done();
                });
            } else {
                grunt.log.ok('No running appium server found');
                done();
            }
        });
    });

    grunt.registerTask('setKitkat', 'Set Environment Variable', function () {
        process.env = _.merge(process.env, {
            PLATFORM: 'android',
            VERSION: '4.2'
        });
    });
    grunt.registerTask('setLollipopPlatform', 'Set Environment Variable', function () {
        process.env = _.merge(process.env, {
            PLATFORM: 'android',
            VERSION: '5.0'
        });
    });
    grunt.registerTask('setMarshmallowPlatform', 'Set Environment Variable', function () {
        process.env = _.merge(process.env, {
            PLATFORM: 'android',
            VERSION: '6.0'
        });
    });

    grunt.registerTask('bootstrap', ['appium:stop', 'clean:reports', 'mkdir', 'appium:start']);
    grunt.registerTask('android:5.0', ['bootstrap', 'setLollipopPlatform', 'cucumberjs:android']);
    grunt.registerTask('android:6.0', ['bootstrap', 'setMarshmallowPlatform', 'cucumberjs:android']);
    grunt.registerTask('android:4.0', ['bootstrap', 'setKitkatPlatform', 'cucumberjs:android']);
};
