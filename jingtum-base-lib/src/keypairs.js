'use strict';
var brorand   = require('brorand');
var hashjs    = require('hash.js');
var EC        = require('elliptic').ec;
var ec        = new EC('secp256k1');
var secp256k1 = require('./secp256k1');
var assert    = require('assert');
var hexToBytes = require('./utils').hexToBytes;
var bytesToHex = require('./utils').bytesToHex;

var SEED_PREFIX = 33;
var ACCOUNT_PREFIX = 0;
var alphabet = 'jpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65rkm8oFqi1tuvAxyz';
var base58 = require('base-x')(alphabet);

// you know it
function sha256(bytes) {
	return hashjs.sha256().update(bytes).digest();
}

/**
 * concat an item and a buffer
 * @param {integer} item1, should be an integer
 * @param {buffer} buf2, a buffer
 * @returns {buffer} new Buffer
 */
function bufCat0(item1, buf2) {
	var buf = new Buffer(1 + buf2.length);
	buf[0] = item1;
	buf2.copy(buf, 1);
	return buf;
}
/**
 * concat one buffer and another
 * @param {buffer} item1, should be an integer
 * @param {buffer} buf2, a buffer
 * @returns {buffer} new Buffer
 */
function bufCat1(buf1, buf2) {
	var buf = new Buffer(buf1.length + buf2.length);
	buf1.copy(buf);
	buf2.copy(buf, buf1.length);
	return buf;
}

/**
 * encode use jingtum base58 encoding
 * including version + data + checksum
 * @param {integer} version
 * @param {buffer} bytes
 * @returns {string}
 * @private
 */
function __encode(version, bytes) {
	var buffer = bufCat0(version, bytes);
	var checksum = new Buffer(sha256(sha256(buffer)).slice(0, 4));
	var ret = bufCat1(buffer, checksum);
	return base58.encode(ret);
}
/**
 * decode encoded input,
 * 	too small or invalid checksum will throw exception
 * @param {integer} version
 * @param {string} input
 * @returns {buffer}
 * @private
 */
function __decode(version, input) {
	var bytes = base58.decode(input);
	if (!bytes || bytes[0] !== version || bytes.length < 5) {
		throw new Error('invalid input size');
	}
	var computed = sha256(sha256(bytes.slice(0, -4))).slice(0, 4);
	var checksum = bytes.slice(-4);
	for (var i = 0; i !== 4; i += 1) {
		if (computed[i] !== checksum[i])
			throw new Error('invalid checksum');
	}
	return bytes.slice(1, -4);
}

/**
 * generate random bytes and encode it to secret
 * @returns {string}
 */
exports.generateSeed = function() {
	var randBytes = brorand(16);
	return __encode(SEED_PREFIX, randBytes);
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

/**
 * derive keypair from secret
 * @param {string} secret
 * @returns {{privateKey: string, publicKey: *}}
 */
exports.deriveKeyPair = function(secret) {
	var prefix = '00';
	var entropy = __decode(SEED_PREFIX, secret);
	var entropy = base58.decode(secret).slice(1, -4);
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
	var input = new Buffer(hashjs.ripemd160().update(hash256).digest());
	return __encode(ACCOUNT_PREFIX, input);
};

/**
 * check is address is valid
 * @param address
 * @returns {boolean}
 */
exports.checkAddress = function(address) {
	try {
		__decode(ACCOUNT_PREFIX, address);
		return true;
	} catch (err) {
		return false;
	}	
};

/**
 * convert the input address to byte array
 *
 * @param address
 * @returns byte array
 */
exports.convertAddressToBytes  = function(address) {
    try {
        return __decode(ACCOUNT_PREFIX, address);

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
        return __encode(ACCOUNT_PREFIX, bytes);

    } catch (err) {
        throw new Error('convertBytesToAddress error!');
    }
};
