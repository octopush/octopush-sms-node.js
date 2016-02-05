var octopush = require('octopush');

var sms = new octopush.OWS('email@domain.com', 'your_api_key');
sms.get_balance(function(e, r){
    for(var i = 0; i < r.octopush.balance.length; i++) {
        console.log(r.octopush.balance[i]['$'].type, r.octopush.balance[i]['_']);
    }
});