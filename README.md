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

### Balance check

```javascript
var octopush = require('octopush');

var sms = new octopush.SMS('user@domain.com', 'api_key');

sms.get_balance(function(e, r){
    console.log(r.octopush.balance);
});
```

### SMS sending

```javascript
var octopush = require('octopush');

var sms = new octopush.SMS('user@domain.com', 'api_key');

sms.set_sms_text('Test message');
sms.set_sms_recipients(['79022244292']);
sms.set_sms_type(octopush.constants.SMS_PREMIUM);
sms.set_sms_sender('UnSender');
sms.set_sms_request_id(sms.uniqid());

sms.send(function(e, r){
    if(e) {
        console.log('Error:', r);
    } else {
        console.log('Success:', JSON.stringify(r));
    }
});
```

More examples can be found in [examples/](examples/).

## Requirements

* API key, register at [octopush.com](http://www.octopush.com/en/registration) to get one
* Node.js
  * node.js version 0.10+
  * [requests](https://github.com/request/request)
  * [xml2js](https://github.com/Leonidas-from-XIV/node-xml2js)

### Documentation

This library is completely documented using [JSDoc](https://www.npmjs.com/package/jsdoc) and will show notifications in all editors that supports it or can be built to see in browser.
