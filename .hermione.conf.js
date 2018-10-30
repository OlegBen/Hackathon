module.exports = {
    "sets": {
        "desktop": {
            "files": './tests/hermione/*.hermione.js'
            //"files": './tests/hermione/authorize.hermione.js'
        }
    },
    "baseUrl": 'http://localhost:5000',
    "gridUrl": 'https://0.0.0.0:4444/wd/hub',

    "browsers": {
        "chrome": {
            "desiredCapabilities": {
                "browserName": 'chrome',
                "compositeImage":true
            },
            "compositeImage":true
        },
        /*
        "firefox": {
            "desiredCapabilities": {
                "browserName": 'firefox'
            }
        }
        */
    },
    "plugins": {
        'html-reporter/hermione': {
            "path": 'tests/hermione-html-report'
        },
        //My plugins
         "hermione-plugins-muz": true
    }
};
