var octopush = require('octopush');
var date = require('phpdate-js');

var sms_recipients = ['0123456789'];
var sms_text = 'test d\'envoi à ' + date('Y-m-d H:i:s') + ' ';
var sms_type = octopush.constants.SMS_PREMIUM;
var sms_mode = octopush.constants.INSTANTANE;
var sms_sender = 'UnSender';

var sms = new octopush.SMS('email@domain.com', 'your_api_key');
sms.set_sms_mode(sms_mode);
sms.set_sms_text(sms_text);
sms.set_sms_recipients(sms_recipients);
sms.set_sms_type(sms_type);
sms.set_sms_sender(sms_sender);
sms.set_sms_request_id(sms.uniqid());
sms.set_option_with_replies(0);
sms.set_option_transactional(1);
sms.set_sender_is_msisdn(0);
sms.set_request_keys('TRS');

sms.send(function(e, r){
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(r));
});