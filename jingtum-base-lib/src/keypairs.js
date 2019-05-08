'use strict';
var brorand   = require('brorand');
var hashjs    = require('hash.js');
var EC        = require('elliptic').ec;
var ec        = new EC('secp256k1');
var secp256k1 = require('./secp256k1');
var hexToBytes = require('./utils').hexToBytes;
var bytesToHex = require('./utils').bytesToHex;
var seqEqual = require('./utils').seqEqual;
var addressCodec = require("swtc-address-codec")();

var SEED_PREFIX = 33;
var ACCOUNT_PREFIX = 0;
var alphabet = 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz';
var base58 = require('base-x')(alphabet);

// you know it
function sha256(bytes) {
	return hashjs.sha256().update(bytes).digest();
}

exports.__encode = addressCodec.encodeAddress;
exports.__decode = addressCodec.decodeAddress;

/**
 * generate random bytes and encode it to secret
 * @returns {string}
 */
exports.generateSeed = function() {
    return addressCodec.encodeSeed(brorand(16), "secp256k1")
};

/**
 * generate privatekey from input seed
 * one seed can generate many keypairs,
 * here just use the first one
 * @param {buffer} seed
 * @returns {buffer}
 */
function derivePrivateKey(seed) {
  var order = ec.curve.n;
  var privateGen = secp256k1.ScalarMultiple(seed);
  var publicGen = ec.g.mul(privateGen);
  return secp256k1.ScalarMultiple(publicGen.encodeCompressed(), 0).add(privateGen).mod(order);
}

function verifyCheckSum(bytes) {
    var computed = sha256(sha256(bytes.slice(0, -4))).slice(0, 4);
    var checksum = bytes.slice(-4);
    return seqEqual(computed, checksum);
}
/**
 * derive keypair from secret
 * @param {string} secret
 * @returns {{privateKey: string, publicKey: *}}
 */
exports.deriveKeyPair = function(secret) {
	var prefix = '00';
	var buf = base58.decode(secret);

	if(!buf || buf[0] !== SEED_PREFIX || buf.length < 5){
        throw new Error('invalid_input_size');
    }
    if (!verifyCheckSum(buf)) {
        throw new Error('checksum_invalid');
    }
    var entropy = buf.slice(1, -4);
	var privateKey = prefix + derivePrivateKey(entropy).toString(16, 64).toUpperCase();
	var publicKey = bytesToHex(ec.keyFromPrivate(privateKey.slice(2)).getPublic().encodeCompressed());
	return { privateKey: privateKey, publicKey: publicKey };
};

/**
 * devive keypair from privatekey
 */
exports.deriveKeyPairWithKey = function(key) {
	var privateKey = key;
	var publicKey = bytesToHex(ec.keyFromPrivate(key).getPublic().encodeCompressed());
	return { privateKey: privateKey, publicKey: publicKey };
};


/**
 * derive wallet address from publickey
 * @param {string} publicKey
 * @returns {string}
 */
exports.deriveAddress = function(publicKey) {
	var bytes = hexToBytes(publicKey);
	var hash256 = hashjs.sha256().update(bytes).digest();
	var hash160 = hashjs.ripemd160().update(hash256).digest();
    return  addressCodec.encodeAccountID(hash160);
};

/**
 * check is address is valid
 * @param address
 * @returns {boolean}
 */
exports.checkAddress = function(address) {
    return addressCodec.isValidAddress(address);
};

/**
 * convert the input address to byte array
 *
 * @param address
 * @returns byte array
 */
exports.convertAddressToBytes  = function(address) {
    try {
        return addressCodec.decodeAddress(address);

    } catch (err) {
        throw new Error('convertAddressToBytes error!');
    }
};

/*
 * Convert a byte array to a wallet address string
 *
*/
//Wallet.prototype.convertBytesToAddress= function(bytes) {
exports.convertBytesToAddress= function(bytes) {
    try {
        return addressCodec.encodeAddress(bytes);

    } catch (err) {
        throw new Error('convertBytesToAddress error!');
    }
};
