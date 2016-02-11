var octopush = require('octopush');
var date = require('phpdate-js');
var config = require('./config.js');

var sms = new octopush.SMS(config.user_login, config.api_key);

sms.set_sms_text(config.sms_text);
sms.set_sms_recipients(config.sms_recipients);
sms.set_sms_type(config.sms_type);
sms.set_sms_sender(config.sms_sender);
sms.set_sms_request_id(sms.uniqid());
sms.set_option_with_replies(0);
sms.set_option_transactional(1);
sms.set_sender_is_msisdn(0);
sms.set_request_keys('TRS');

sms.send(function(e, r){
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(r));
});