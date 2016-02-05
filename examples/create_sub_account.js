var octopush = require('octopush');

var first_name = 'Prenom';
var last_name = 'Nom';
var raison_sociale = 'Raison';
var alert_bound = '234';
var alert_sms_type = 'FR';

var sms = new octopush.SMS('email@domain.com', 'your_api_key');
sms.create_sub_account(first_name, last_name, raison_sociale, alert_bound, alert_sms_type, function(e, r){
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(r));
});