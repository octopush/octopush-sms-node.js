var octopush = require('octopush');
var config = require('./config.js');

var sms = new octopush.SMS(config.user_login, config.api_key);

sms.get_credit(function(e, r){
    console.log(r.octopush.credit);
});