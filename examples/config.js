var octopush = require('./lib/octopush');

module.exports = {
    user_login: '*******@*******',
    api_key: '****************',
    sms_recipients: ['+33600000000'],
    sms_text: 'test text ' + (new Date()).getYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDay(),
    sms_type: octopush.constants.SMS_PREMIUM,
    sms_mode: octopush.constants.INSTANTANE,
    sms_sender: 'Octopush'
};