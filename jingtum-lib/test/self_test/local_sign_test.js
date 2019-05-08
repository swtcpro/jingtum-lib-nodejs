
//test data
var jlib = require('jingtum-lib/index');
var Remote = jlib.Remote;
var jutil = jlib.utils;
var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
remote.connect(function(err, result) {
    if (err) {
        return console.log('err:', err);
    }

    var v = {
        seed: 'sn37nYrQ6KPJvTFmaBYokS3FjXUWd',
        addr: 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ'
    };

    var payment_tx_json = {//支付
        "Account" : v.addr,
        "Amount" : "0.5",
        "Destination" : 'jDUjqoDZLhzx4DCf6pvSivjkjgtRESY62c',
        "Fee" : "0.00001",
        "Flags" : 0,
        "Sequence" :670,
        "Paths":[[{"currency": 'CNY',
      "issuer": 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS',
      "type": 48,
      "type_hex": '0000000000000030'}]],
        "Memos": [
            {
                "Memo": {
                    "MemoData": "你好"
                }
            }
        ],
        "TransactionType" : 'Payment'
    };
    var order_createS_tx_json = {//sell,创建卖单
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "TakerPays": { value: '100', currency: 'CNY', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'},
        "TakerGets": 0.01,
        "Fee" : "0.00001",
        "Flags": 524288,
        "Sequence" :670,
        "TransactionType": 'OfferCreate'
    };
    var order_createB_tx_json = {//buy,创建卖买单
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "TakerPays": { value: '100', currency: 'CNY', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'},
        "TakerGets": 0.01,
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :676,
        "TransactionType": 'OfferCreate'
    };
    var order_cancel_tx_json = {//取消挂单（api查结果会有几秒的延迟）
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "OfferSequence": 249, //取消的单子号，必须为数字类型
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :675,
        "TransactionType": 'OfferCancel'
    };
    var account_set_tx_json = {//设置账号属性(部分属性不成功)
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "SetFlag": 1048576,//ClearFlag
        // "EmailHash": "1872776189@qq.com",//(序列化错误)
        "Domain": jutil.stringToHex("http://www.jingtum.com/"),
        "MessageKey": jutil.stringToHex("set message key test"),
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :682,
        "TransactionType": 'AccountSet'
    };
    var trust_tx_json = {//设置信任（底层暂时不支持Missing/inapplicable prior transaction.）
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "LimitAmount":{value: '100', currency: 'ZDY', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'},
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :683,
        "TransactionType": 'TrustSet'
    };
    var relation_tx_json = {//设置关系（序列化中暂时没有这种类型）
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "Target": "jp53tPyrQLoFriTJhtm8Z9iLUXUDucnwVk",
        "LimitAmount":{value: '500', currency: 'ZDY', issuer: 'jBciDE8Q3uJjf111VeiUNM775AMKHEbBLS'},
        "RelationType": "authorize",
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :683,
        "TransactionType": 'RelationSet'
    };
    var regularkey_tx_json = {//设置关系（序列化中暂时没有这种类型）
        "Account": 'jB7rxgh43ncbTX4WeMoeadiGMfmfqY2xLZ',
        "RegularKey": "jp53tPyrQLoFriTJhtm8Z9iLUXUDucnwVk",
        "Fee" : "0.00001",
        "Flags": 0,
        "Sequence" :684,
        "TransactionType": 'SetRegularKey'
    };


    var blob2 = jlib.jingtum_sign_tx(payment_tx_json, v);
    console.log("Jing:"+blob2);
    return;

    var req = remote.buildSignTx({blob:blob2});
    req.submit(function(err2, result) {
        if(err2) console.log(err2);
        else console.log('res:',result);
    });
});
