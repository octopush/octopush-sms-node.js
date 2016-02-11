var request = require('request');
var xml2js = require('xml2js');
var crypto = require('crypto');
var date = require('phpdate-js');

const VERSION = '1.0.0';
const DOMAIN = 'http://www.octopush-dm.com';
const PORT = 80;
const PATH = '';
const PATH_BIS = '';
const PATH_SMS = PATH + '/api/sms';
const PATH_CREDIT = PATH + '/api/credit';
const _CUT_ = 7;
const SMS_STANDARD = 'XXX';
const SMS_WORLD = 'WWW';
const SMS_PREMIUM = 'FR';
const SIMULATION = 'simu';
const REEL = 'real';
const ERRORS = {
    '100': 'POST request missing.',
    '101': 'Incorrect login details.',
    '102': 'Your SMS exceeds 160 characters',
    '103': 'Your message has no recipients',
    '104': 'You have run out of credit.',
    '105': 'You don\'t have enough credit on your balance, but your last order is waiting for being validated',
    '106': 'You have entered the Sender incorrectly. 3 to 11 characters, chosen from 0 to 9, a to z, A to Z. No accent, space or punctuation.',
    '107': 'The text of your message is missing.',
    '108': 'You have not entered your login details.',
    '109': 'You have not entered your password.',
    '110': 'You have not entered the list of recipient.',
    '111': 'You have not chosen a way to enter your recipients.',
    '112': 'You have not defined the quality of your message.',
    '113': 'Your account is not validated. Log in Octopush and go to the "User interface" section.',
    '114': 'You are under investigation for the fraudulent use of our services.',
    '115': 'The recipient number is different from the number of one of the parameters that you have related it to.',
    '116': 'The mailing option only works by using a contact list.',
    '117': 'Your recipient list contains no correct numbers. Have you formatted your numbers by including the international dialling code? Contact us if you have any problems.',
    '118': 'You must tick one of the two boxes to indicate if you do not wish to send test SMS or if you have correctly received and validated it.',
    '119': 'You cannot send SMS with more than 160 characters for this type of SMS',
    '120': 'A SMS with the same request_id has already been sent.',
    '121': 'In Premium SMS, the mention "STOP au XXXXX" is mandatory and must belong to your text (respect the case).',
    '122': 'In Standard SMS, the mention "no PUB=STOP" is mandatory and must belong to your text (respect the case).',
    '123': 'The field request_sha1 is missing.',
    '124': 'The field request_sha1 does not match. The data is wrong, or the query string contains an error or the frame contains an error : the request is rejected.',
    '125': 'An undefined error has occurred. Please contact support.',
    '126': 'An SMS campaign is already waiting for approval to send. You must validate or cancel it in order to start another.',
    '127': 'An SMS campaign is already being processed. You must wait for processing to be completed in order to start another.',
    '128': 'Too many attempts have been made. You need to start a new campaign.',
    '129': 'Campaign is being built.',
    '130': 'Campagne has not been set as finished.',
    '131': 'Campaign not found.',
    '132': 'Campaign sent.',
    '133': 'The user_batch_id has already been used',
    '150': 'No country was found for this prefix.',
    '151': 'The recipient country is not part of the countries serviced by Octopush.',
    '152': 'You cannot send low cost SMS to this country. Choose Premium SMS',
    '153': 'The route is congested. This type of SMS cannot be dispatched immediately. If your order is urgent, please use another type of SMS.',
    '201': 'This option is only available on request. Do not hesitate to request access if you need it.',
    '202': 'The email account you wish to credit is incorrect.',
    '203': 'You already have tokens in use. You can only have one session open at a time.',
    '204': 'You specified a wrong token.',
    '205': 'The number of text messages you want to transfer is too low.',
    '206': 'You may not run campaigns during a credit transfer.',
    '207': 'You do not have access to this feature.',
    '208': 'Wrong type of SMS.',
    '209': 'You are not allowed to send SMS messages to this user.',
    '210': 'This email is not specified in any of your sub accounts or affiliate users.',
    '300': 'You are not authorized to manage your lists by API.',
    '301': 'You have reached the maximum number of lists.',
    '302': 'A list with the same name already exists.',
    '303': 'The specified list does not exist.',
    '304': 'The list is already full.',
    '305': 'There are too many contacts in the query.',
    '306': 'The requested action is unknown.',
    '308': 'Error of file.',
    '500': 'Impossible to process the requested action',
    '501': 'Connection error. Please contact our customer support'
}

var OWS = (function(){
    /**
     * Octopush WebService constructor
     *
     * @param {string} user_login - Octopush user login
     * @param {string} api_key - Octopush API key
     * @returns {OWS}
     * @constructor
     */
    function OWS(user_login, api_key) {
        this.config = {
            user_login: user_login,
            api_key: api_key,
            answer_email: -1,
            sms_alert_bound: -1,
            sms_alert_type: -1
        };

        return this;
    }

    OWS.prototype._Request = function(domain, path, port, data, callback) {
        request.post({
            url: domain + path,
            form: data,
            headers: {
                'Accept': 'text',
                'User-Agent': 'OctopushJS/' + VERSION,
                'Connection': 'close'
            }
        }, function(error, response, body) {
            if(error == undefined) {
                xml2js.parseString(body, function(error, result){
                    if(error == null) {
                        if(result.octopush.error_code[0] === '000') {
                            callback(false, result);
                        } else {
                            callback(true, ERRORS[result.octopush.error_code[0]]);
                        }
                    } else {
                        callback(true, result);
                    }
                });
            } else {
                callback(true, error);
            }
        });
    };

    /**
     * Returns current user's credit
     *
     * @param {function} callback - callback function that takes (error, response) parameters
     */
    OWS.prototype.get_credit = function(callback) {
        var domain = DOMAIN;
        var path = PATH_CREDIT;
        var port = PORT;

        var data = {
            user_login: this.config.user_login,
            api_key: this.config.api_key
        };

        this._Request(domain, path, port, data, function(error, result){
            result.octopush.credit = result.octopush.credit[0];
            callback(error, result);
        });
    };

    /**
     * Sets Octopush API user login
     *
     * @param {string} user_login
     */
    OWS.prototype.set_user_login = function(user_login) {
        this.config.user_login = user_login;
    };

    /**
     * Sets Octopush API key
     *
     * @param {string} api_key
     */
    OWS.prototype.set_api_key = function(api_key) {
        this.config.api_key = api_key;
    };

    /**
     * Sets answer email
     *
     * @param {string} answer_email
     */
    OWS.prototype.set_answer_email = function(answer_email) {
        this.config.answer_email = answer_email;
    };

    /**
     * Sets SMS alert bound
     *
     * @param {int} sms_alert_bound
     */
    OWS.prototype.set_sms_alert_bound = function(sms_alert_bound) {
        if(!isNaN(parseInt(sms_alert_bound))) {
            this.config.sms_alert_bound = parseInt(sms_alert_bound);
        }
    };

    /**
     * Sets SMS alert type
     * Could be set as octopush.constants.SMS_PREMIUM or octopush.constants.SMS_STANDARD
     *
     * @param {int} sms_alert_type
     */
    OWS.prototype.set_sms_alert_type = function(sms_alert_type) {
        if([SMS_PREMIUM, SMS_STANDARD, SMS_WORLD].indexOf(sms_alert_type) >= 0) {
            this.config.sms_alert_type = sms_alert_type;
        }
    };

    return OWS;
})();

var SMS = (function(){
    /**
     * Octopush SMS constructor
     *
     * @param {string} user_login - Octopush user login
     * @param {string} api_key - Octopush API key
     * @returns {SMS}
     * @constructor
     */
    function SMS(user_login, api_key){
        this.config = {
            user_login: user_login,
            api_key: api_key,
            sms_text: '',
            sms_recipients: [],
            recipients_first_names: [],
            recipients_last_names: [],
            sms_fields_1: [],
            sms_fields_2: [],
            sms_fields_3: [],
            sending_time: 0,
            sms_sender: 'AnySender',
            sms_type: SMS_WORLD,
            request_mode: REEL,
            request_id: '',
            with_replies: 0,
            transactional: 0,
            msisdn_sender: 0,
            request_keys: '',
            user_batch_id: '',
            finished: 0
        };

        return this;
    }

    SMS.prototype._Request = function(domain, path, port, data, callback) {
        request.post({
            url: domain + path,
            form: data,
            headers: {
                'Accept': 'text',
                'User-Agent': 'OctopushJS/' + VERSION,
                'Connection': 'close'
            }
        }, function(error, response, body) {
            if(error == undefined) {
                xml2js.parseString(body, function(error, result){
                    if(error == null) {
                        if(result.octopush.error_code[0] === '000') {
                            callback(false, result);
                        } else {
                            callback(true, ERRORS[result.octopush.error_code[0]]);
                        }
                    } else {
                        callback(true, result);
                    }
                });
            } else {
                callback(true, error);
            }
        });
    };

    /**
     * Sends SMS according to setup
     *
     * @param {function} callback - callback function that takes (error, response) parameters
     */
    SMS.prototype.send = function(callback){
        var domain = DOMAIN;
        var path = PATH_SMS;
        var port = PORT;

        var data = {
            user_login:  this.config.user_login,
            api_key:  this.config.api_key,
            sms_text:  this.config.sms_text,
            sms_recipients:  this.config.sms_recipients.join(','),
            recipients_first_names:  this.config.recipients_first_names.join(','),
            recipients_last_names:  this.config.recipients_last_names.join(','),
            sms_fields_1:  this.config.sms_fields_1.join(','),
            sms_fields_2:  this.config.sms_fields_2.join(','),
            sms_fields_3:  this.config.sms_fields_3.join(','),
            sms_type:  this.config.sms_type,
            sms_sender:  this.config.sms_sender,
            request_mode:  this.config.request_mode,
            request_id:  this.config.request_id,
            with_replies:  this.config.with_replies,
            transactional:  this.config.transactional,
            msisdn_sender:  this.config.msisdn_sender
        }

        if(this.config.sending_time > 0) {
            data['sending_time'] = this.config.sending_time;
        }

        if(this.config.request_keys != '') {
            data['request_keys'] = this.config.request_keys;
            data['request_sha1'] = this._get_request_sha1_string(this.config.request_keys, data);
        }

        this._Request(domain, path, port, data, function(error, result){
           callback(error, result);
        });
    };

    /**
     * Returns current user's credit
     *
     * @param {function} callback - callback function that takes (error, response) parameters
     */
    SMS.prototype.get_credit = function(callback) {
        var domain = DOMAIN;
        var path = PATH_CREDIT;
        var port = PORT;

        var data = {
            user_login: this.config.user_login,
            api_key: this.config.api_key
        };

        this._Request(domain, path, port, data, function(error, result){
            result.octopush.credit = result.octopush.credit[0];
            callback(error, result);
        });
    };

    SMS.prototype._get_request_sha1_string = function(request_keys, data) {
        var A_char_to_field = {
            'T': 'sms_text',
            'R': 'sms_recipients',
            'Y': 'sms_type',
            'S': 'sms_sender',
            'D': 'sms_date',
            'a': 'recipients_first_names',
            'b': 'recipients_last_names',
            'c': 'sms_fields_1',
            'd': 'sms_fields_2',
            'e': 'sms_fields_3',
            'W': 'with_replies',
            'N': 'transactional',
            'Q': 'request_id'
        };
        var request_string = '';
        for(var i = 0; i < request_keys.length; i++) {
            var char = request_keys[i];
            if((A_char_to_field.hasOwnProperty(char))&&(data.hasOwnProperty(A_char_to_field[char]))) {
                request_string += data[A_char_to_field[char]];
            }
        }
        var sha1 = crypto.createHash('sha1');
        sha1.update(request_string, 'utf8');
        return sha1.digest('hex');
    };

    /**
     * Sets user login
     *
     * @param {string} user_login
     */
    SMS.prototype.set_user_login = function(user_login) {
        this.config.user_login = user_login;
    };

    /**
     * Sets api key
     *
     * @param {string} api_key
     */
    SMS.prototype.set_api_key = function(api_key) {
        this.config.api_key = api_key;
    };

    /**
     * Stats SMS text
     *
     * @param {string} sms_text
     */
    SMS.prototype.set_sms_text = function(sms_text) {
        this.config.sms_text = sms_text;
    };

    /**
     * Sets SMS type
     *
     * @param {string} sms_type - octopush.constants.SMS_STANDARD, octopush.constants.SMS_WORLD, octopush.constants.SMS_PREMIUM
     */
    SMS.prototype.set_sms_type = function(sms_type) {
        this.config.sms_type = sms_type;
    };

    /**
     * Sets SMS recipients
     *
     * @param {array} sms_recipients - i.e. ['1234567890', '0987654321']
     */
    SMS.prototype.set_sms_recipients = function(sms_recipients) {
        this.config.sms_recipients = sms_recipients;
    };

    /**
     * Sets SMS recipients first names
     *
     * @param {array} first_names
     */
    SMS.prototype.set_recipients_first_names = function(first_names) {
        this.config.recipients_first_names = first_names;
    };

    /**
     * Sets SMS recipients last names
     *
     * @param {array} last_names
     */
    SMS.prototype.set_recipients_last_names = function(last_names) {
        this.config.recipients_last_names = last_names;
    };

    /**
     * Sets SMS fields #1
     *
     * @param {array} sms_fields_1
     */
    SMS.prototype.set_sms_fields_1 = function(sms_fields_1) {
        this.config.sms_fields_1 = sms_fields_1;
    };

    /**
     * Sets SMS fields #2
     *
     * @param {array} sms_fields_2
     */
    SMS.prototype.set_sms_fields_2 = function(sms_fields_2) {
        this.config.sms_fields_2 = sms_fields_2;
    };

    /**
     * Sets SMS fields #3
     *
     * @param {array} sms_fields_3
     */
    SMS.prototype.set_sms_fields_3 = function(sms_fields_3) {
        this.config.sms_fields_3 = sms_fields_3;
    };

    /**
     * Sets SMS sender name
     *
     * @param {string} sms_sender
     */
    SMS.prototype.set_sms_sender = function(sms_sender) {
        this.config.sms_sender = sms_sender;
    };

    /**
     * Sets SMS send date
     *
     * @param {int} y - year
     * @param {int} m - month
     * @param {int} d - day
     * @param {int} h - hour
     * @param {int} i - minute
     */
    SMS.prototype.set_time = function(y, m, d, h, i) {
        this.config.sms_y = y;
        this.config.sms_m = d;
        this.config.sms_d = m;
        this.config.sms_h = h;
        this.config.sms_i = i;

        this.config.sending_time = Math.floor(new Date(y, (m - 1), d, h, i).getTime() / 1000);
    };

    /**
     * Sets request mode to SIMULATION state
     */
    SMS.prototype.set_simulation_mode = function() {
        this.config.request_mode = SIMULATION;
    };

    /**
     * Sets SMS ticket
     *
     * @param {string} sms_ticket
     */
    SMS.prototype.set_sms_ticket = function(sms_ticket) {
        this.config.sms_ticket = sms_ticket;
    };

    /**
     * Sets unique SMS request ID
     *
     * @param {string} request_id - can be generated with octopush.SMS().unqid()
     */
    SMS.prototype.set_sms_request_id = function(request_id) {
        this.config.request_id = request_id.replace(/[^0-9a-zA-Z]+/, '');
    };

    /**
     * Notifies Octopush platform that you want to receive the answers that your recipients will send back to your sending(s)
     *
     * @param {int} with_replies - 0 or 1
     */
    SMS.prototype.set_option_with_replies = function(with_replies) {
        if((with_replies === undefined)||(with_replies === 'undefined')||(with_replies != 1)) {
            this.config.with_replies = 0;
        } else {
            this.config.with_replies = 1;
        }
    };

    /**
     * Notifies Octopush that you are making a transactional sending.
     * With this option, sending marketing SMS is strongly forbidden, and may make your account blocked in case of abuses.
     * DO NOT USE this option if you are not sure to understand what a transactional SMS is.
     *
     * @param {int} transactional - 0 or 1
     */
    SMS.prototype.set_option_transactional = function(transactional) {
        if((transactional === undefined)||(transactional === 'undefined')||(transactional != 1)) {
            this.config.transactional = 0;
        } else {
            this.config.transactional = 1;
        }
    };

    /**
     * Use a MSISDN number.
     *
     * @param {string} msisdn_sender
     */
    SMS.prototype.set_sender_is_msisdn = function(msisdn_sender) {
        this.config.msisdn_sender = msisdn_sender;
    };

    /**
     * Lists the key fields of the application you want to add in the sha1 hash. Example: 'TRYS ' (for fields sms_text, sms_recipients, sms_type, sms_sender).
     *
     * @param request_keys
     */
    SMS.prototype.set_request_keys = function(request_keys) {
        this.config.request_keys = request_keys;
    };

    SMS.prototype.set_user_batch_id = function(user_batch_id) {
        this.config.user_batch_id = user_batch_id.replace(/[^0-9a-zA-Z]+/, '');
    };

    SMS.prototype.set_finished = function(finished) {
        if(finished == 1) {
            this.config.finished = 1;
        } else {
            this.config.finished = 0;
        }
    };

    SMS.prototype.set_action = function(action) {
        this.config.action = action;
    };

    SMS.prototype.uniqid = function(prefix, more_entropy) {
        if (typeof prefix === 'undefined') {
            prefix = '';
        }

        var retId;
        var formatSeed = function(seed, reqWidth) {
            seed = parseInt(seed, 10)
                .toString(16);
            if (reqWidth < seed.length) {
                return seed.slice(seed.length - reqWidth);
            }
            if (reqWidth > seed.length) {
                return Array(1 + (reqWidth - seed.length))
                        .join('0') + seed;
            }
            return seed;
        };

        if (!this.php_js) {
            this.php_js = {};
        }

        if (!this.php_js.uniqidSeed) {
            this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
        }
        this.php_js.uniqidSeed++;

        retId = prefix;
        retId += formatSeed(parseInt(new Date()
                .getTime() / 1000, 10), 8);
        retId += formatSeed(this.php_js.uniqidSeed, 5);
        if (more_entropy) {
            retId += (Math.random() * 10)
                .toFixed(8)
                .toString();
        }

        return retId;
    };

    return SMS;
})();

module.exports = {
    OWS: OWS,
    SMS: SMS,
    constants: {
        SMS_STANDARD: SMS_STANDARD,
        SMS_WORLD: SMS_WORLD,
        SMS_PREMIUM: SMS_PREMIUM,
        SIMULATION: SIMULATION,
        REEL: REEL,
    }
};