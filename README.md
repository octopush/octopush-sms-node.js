# Octopush API library for Node.js

[![Build Status](https://travis-ci.org/bearburger/octopush-api-node.png?branch=master)](https://travis-ci.org/bearburger/octopush-api-node)

A Node.js library for [Octopush API](http://www.octopush.com/en/sms-api).

Octopush offers a solution that was built in-house as a hosted service (SaaS, Software as a Service and an API) to allow marketing departments of major groups, advertising agencies and IT companies to enjoy an infrastructure that supports sending SMS messages to more than 200 countries.

## Installation

Installation via npm

```shell
npm install octopush
```

## Usage

### Config file (`config.js`)

```javascript
var octopush = require('octopush');

module.exports = {
    user_login: '*******@*******',
    api_key: '****************',
    sms_recipients: ['+33600000000'],
    sms_text: 'test text ' + (new Date()).getYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDay(),
    sms_type: octopush.constants.SMS_WORLD,
    sms_sender: 'onesender'
};
```

### Balance check

```javascript
var octopush = require('octopush');
var config = require('./config.js');

var sms = new octopush.SMS(config.user_login, config.api_key);

sms.get_balance(function(e, r){
    console.log(r.octopush.balance);
});
```

### SMS sending

```javascript
var octopush = require('octopush');
var config = require('./config.js');

var sms = new octopush.SMS(config.user_login, config.api_key);

sms.set_sms_text(config.sms_text);
sms.set_sms_recipients(config.sms_recipients);
sms.set_sms_type(config.sms_type);
sms.set_sms_mode(config.sms_mode);
sms.set_sms_sender(config.sms_sender);
sms.set_sms_request_id(sms.uniqid());

sms.send(function(e, r){
    if(e) {
        console.log('Error:', r);
    } else {
        console.log('Success:', JSON.stringify(r));
    }
});
```

More examples can be found in [Simple Examples](examples/simple_examples/) and [Advanced Examples](examples/advanced_examples/).

## Requirements

* API key, register at [octopush.com](http://www.octopush.com/en/registration) to get one
* Node.js
  * node.js version 0.10+
  * [requests](https://github.com/request/request)
  * [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)

### Documentation

This library is completely documented using [JSDoc](https://www.npmjs.com/package/jsdoc) and will show autocompletions in all editors that supports it. Alternatively you can build HTML version of documentation via jsdoc tool.

API documentation available on [Octopush API documentation portal](http://www.octopush.com/en/api-sms-documentation).
