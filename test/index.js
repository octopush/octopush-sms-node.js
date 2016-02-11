var expect = require('chai').expect;
var should = require('chai').should();
var octopush = require('../lib/octopush.js');
var date = require('phpdate-js');

if((process.env.OCTOPUSH_USER_LOGIN != undefined)&&(process.env.OCTOPUSH_API_KEY != undefined)) {
    describe('octopush net tests (if OCTOPUSH_USER_LOGIN and OCTOPUSH_API_KEY are set)', function () {
        it('should take credit of user', function (done) {
            var sms = new octopush.SMS(process.env.OCTOPUSH_USER_LOGIN, process.env.OCTOPUSH_API_KEY);
            sms.get_credit(function (e, r) {
                expect(e).to.be.equal(false);
                expect(r.octopush.credit).to.be.not.empty;
                done();
            });
        });
    });
}

describe('octopush.sms', function(){
    it('should create client with user_login and api_key', function(){
        var sms = new octopush.SMS('user_login', 'api_key');

        expect(sms.config.user_login).to.be.equal('user_login');
        expect(sms.config.api_key).to.be.equal('api_key');
    });

    it('should set user_login', function(){
        var sms = new octopush.SMS();

        expect(sms.config.user_login).to.be.empty;
        sms.set_user_login('test_value');
        expect(sms.config.user_login).to.be.equal('test_value');
    });

    it('should set api_key', function(){
        var sms = new octopush.SMS();

        expect(sms.config.api_key).to.be.empty;
        sms.set_api_key('test_value');
        expect(sms.config.api_key).to.be.equal('test_value');
    });

    it('should set sms_text', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_text).to.be.empty;
        sms.set_sms_text('test_value');
        expect(sms.config.sms_text).to.be.equal('test_value');
    });

    it('should set sms_type', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_type).to.be.equal(octopush.constants.SMS_WORLD);
        sms.set_sms_type('test_value');
        expect(sms.config.sms_type).to.be.equal('test_value');
    });

    it('should set sms_recipients', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_recipients).to.be.empty;
        sms.set_sms_recipients(['test_value', 'test_value']);
        expect(sms.config.sms_recipients.length).to.be.equal(2);
    });

    it('should set recipients_first_names', function(){
        var sms = new octopush.SMS();

        expect(sms.config.recipients_first_names).to.be.empty;
        sms.set_recipients_first_names(['test_value', 'test_value']);
        expect(sms.config.recipients_first_names.length).to.be.equal(2);
    });

    it('should set recipients_last_names', function(){
        var sms = new octopush.SMS();

        expect(sms.config.recipients_last_names).to.be.empty;
        sms.set_recipients_last_names(['test_value', 'test_value']);
        expect(sms.config.recipients_last_names.length).to.be.equal(2);
    });

    it('should set sms_fields_1', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_fields_1).to.be.empty;
        sms.set_sms_fields_1(['test_value', 'test_value']);
        expect(sms.config.sms_fields_1.length).to.be.equal(2);
    });

    it('should set sms_fields_2', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_fields_2).to.be.empty;
        sms.set_sms_fields_2(['test_value', 'test_value']);
        expect(sms.config.sms_fields_2.length).to.be.equal(2);
    });

    it('should set sms_fields_3', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_fields_3).to.be.empty;
        sms.set_sms_fields_3(['test_value', 'test_value']);
        expect(sms.config.sms_fields_3.length).to.be.equal(2);
    });

    it('should set sms_sender', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_sender).to.be.equal('AnySender');
        sms.set_sms_sender('TestSender');
        expect(sms.config.sms_sender).to.be.equal('TestSender');
    });

    it('should set sms_date', function(){
        var sms = new octopush.SMS();

        sms.set_time(2000, 1, 1, 0, 0);
        expect(sms.config.sending_time).to.be.equal(Math.floor(new Date(2000, 1 - 1, 1, 0, 0).getTime() / 1000));
    });

    it('should set request_mode', function(){
        var sms = new octopush.SMS();

        expect(sms.config.request_mode).to.be.equal(octopush.constants.REEL);
        sms.set_simulation_mode();
        expect(sms.config.request_mode).to.be.equal(octopush.constants.SIMULATION);
    });

    it('should set sms_ticket', function(){
        var sms = new octopush.SMS();

        expect(sms.config.sms_ticket).to.be.empty;
        sms.set_sms_ticket('test_value');
        expect(sms.config.sms_ticket).to.be.equal('test_value');
    });

    it('should set request_id', function(){
        var sms = new octopush.SMS();

        expect(sms.config.request_id).to.be.empty;
        sms.set_sms_request_id('12abcdefgh34!.');
        expect(sms.config.request_id).to.be.equal('12abcdefgh34');
    });

    it('should set with_replies', function(){
        var sms = new octopush.SMS();

        expect(sms.config.with_replies).to.be.equal(0);
        sms.set_option_with_replies(1);
        expect(sms.config.with_replies).to.be.equal(1);
        sms.set_option_with_replies();
        expect(sms.config.with_replies).to.be.equal(0);
    });

    it('should set transactional', function(){
        var sms = new octopush.SMS();

        expect(sms.config.transactional).to.be.equal(0);
        sms.set_option_transactional(1);
        expect(sms.config.transactional).to.be.equal(1);
        sms.set_option_transactional();
        expect(sms.config.transactional).to.be.equal(0);
    });

    it('should set msisdn_sender', function(){
        var sms = new octopush.SMS();

        expect(sms.config.msisdn_sender).to.be.equal(0);
        sms.set_sender_is_msisdn('test_value');
        expect(sms.config.msisdn_sender).to.be.equal('test_value');
    });

    it('should set request_keys', function(){
        var sms = new octopush.SMS();

        expect(sms.config.request_keys).to.be.empty;
        sms.set_request_keys('test_value');
        expect(sms.config.request_keys).to.be.equal('test_value');
    });

    it('should set user_batch_id', function(){
        var sms = new octopush.SMS();

        expect(sms.config.user_batch_id).to.be.empty;
        sms.set_user_batch_id('12abcdefgh34!.');
        expect(sms.config.user_batch_id).to.be.equal('12abcdefgh34');
    });

    it('should set finished', function(){
        var sms = new octopush.SMS();

        expect(sms.config.finished).to.be.equal(0);
        sms.set_finished(1);
        expect(sms.config.finished).to.be.equal(1);
    });

    it('should set action', function(){
        var sms = new octopush.SMS();

        expect(sms.config.action).to.be.empty;
        sms.set_action('test_value');
        expect(sms.config.action).to.be.equal('test_value');
    });

    it('SHA-1 UTF-8 test', function(){
        var sms = new octopush.SMS();
        sms.set_sms_text('àбрвалг');
        sms.set_request_keys('T')
        var hash = sms._get_request_sha1_string('T', {
            'sms_text': 'àбрвалг'
        });
        expect(hash).to.be.equal('c611522535baf80debd3f24bafa434d14fb21d9d');
    });
});