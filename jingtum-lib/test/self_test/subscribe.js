/**
 * Created by Administrator on 2016/11/21.
 */
var Remote = require('../../src/remote');

var remote = new Remote({server: 'ws://ts5.jingtum.com:5020'});
remote.connect(function(err, ret) {
    console.log(err);
    console.log('connect it ......');
    // var accountObj = remote.createAccountStub();
    // accountObj.on('jhYk8VyFaHYwQRgqNfrP9QcPkRmJoEFB6V', function(data) {
    //     console.log('got account tx: ');
    //     console.dir(data);
    //     // remote.disconnect();
    // });
    
    // remote.on('transactions', function(data) {
    //     console.dir(data);
    // });
    var request = remote.requestLedger({ledger_index: 5151993, transactions: true, expand: true});
    request.submit(function(err, data) {
        console.log(err);
        console.log(data);
    });
});

remote.on('disconnect', function() {
   console.log('you are offline');
});

remote.on('reconnect', function() {
   console.log('you are oneline again');
});
