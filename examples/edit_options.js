var octopush = require('octopush');

var ows = new octopush.OWS('email@domain.com', 'your_api_key');
ows.set_sms_alert_bound(1111);
ows.set_sms_alert_type(octopush.constants.SMS_STANDARD);
ows.edit_options(function(e, r){
    console.log(JSON.stringify(e));
    console.log(JSON.stringify(r));
});