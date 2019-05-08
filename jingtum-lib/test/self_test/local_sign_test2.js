
//test data
var jlib = require('jingtum-lib/index');
var Remote = jlib.Remote;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020', local_sign:true});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:', err);
    }

    var v = {
        seed: 'sn37nYrQ6KPJvTFmaBYokS3FjXUWd',
        addr: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'
    };

    //支付
    var req = remote.buildPaymentTx({account: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ', to: 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c', amount: {
        "value": 0.5,
        "currency": "SWT",
        "issuer": ""
    }});

    req.setSecret(v.seed);
    req.addMemo('手续费设置为0.01.');
    req.setFee(10000);

    //买单
    var options = {
        type:'Buy',
        source: v.addr,
        taker_gets:{
            value:'100',
            currency:'CNY',
            issuer:'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'
        },
        taker_pays:{
            value:'0.01',
            currency:'SWT',
            issuer:''
        }
    };
    var req_buy = remote.buildOfferCreateTx(options);
    req_buy.setSecret(v.seed);

    //卖单
    var options2 = {
        type:'Sell',
        source: v.addr,
        taker_gets:{
            value:'100',
            currency:'CNY',
            issuer:'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'
        },
        taker_pays:{
            value:'0.01',
            currency:'SWT',
            issuer:''
        }
    };
    var req_sell = remote.buildOfferCreateTx(options2);
    req_sell.setSecret(v.seed);


    //取消挂单
    var req_cancel = remote.buildOfferCancelTx({source: v.addr, sequence: 688});
    req_cancel.setSecret(v.seed);

    req.submit(function(err2, result2) {
        if(err2) console.log('err2:',err2);
        else {
            console.log('result2:', result2);
        }
    });

});
