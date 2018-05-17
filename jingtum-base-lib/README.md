#The Jingtum Base JavaScript Library

Basic function for development, include generate wallet, check secret and check address.

`jingtum-base-lib` connects to the Jingtum base lib and runs in Node.js as well as in the browser.

##Getting `jingtum-base-lib`

**Via npm for Node.js**

```
  $ npm install jingtum-base-lib
```

**Build from the source using `gulp`**

```
  $ git clone https://github.com/jingtum/jingtum-base-lib.git
  $ npm install
  $ gulp
```

Then use the minified `dist/jingtum-base-*-min.js` in your webpage

##Quickstart
```
    var Wallet = require('jingtum-base-lib').Wallet;
    var wallet1 = Wallet.generate();//get a wallet
    var wallet2 = Wallet.fromSecret('saai2npGJD7GKh9xLxARfZXkkc8Bf');//get a wallet by secret
    var ret = Wallet.isValidAddress('j98a2BFmVQDSCvQEQEAF9tE8JWpvLqRuUM');// whether the address is valid
    var ret = Wallet.isValidSecret('saai2npGJD7GKh9xLxARfZXk kc8Bf');// whether the secret is valid
```

## TODO
   Check if work in browser env

