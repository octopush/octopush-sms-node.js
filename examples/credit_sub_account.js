var octopush = require('octopush');

var login_account = 'xxxxxxxxxxxxxxxxxxx@sub-accounts.com';
var nb_sms = '1000';
var sms_type = 'FR';

var sms = new octopush.SMS('email@domain.com', 'your_api_key');
sms.credit_sub_account(login_account, nb_sms, sms_type, function(e, r){
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(r));
});