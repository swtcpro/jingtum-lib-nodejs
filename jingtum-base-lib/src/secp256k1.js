'use strcit';
var EC = require('elliptic').ec;
var ec = new EC('secp256k1');
var Sha512 = require('./sha512');

/**
 * Scalar multiplication to find one 256 bit number
 * where it is less than the order of the curve.
 * @param bytes
 * @param discrim
 * @returns {*}
 * @constructor
 */
function ScalarMultiple(bytes, discrim) {
	var order = ec.curve.n;
	for (var i = 0; i <= 0xFFFFFFFF; i++) {
		// We hash the bytes to find a 256 bit number, looping until we are sure it
	    // is less than the order of the curve.
	    var hasher = new Sha512().add(bytes);
	    // If the optional discriminator index was passed in, update the hash.
	    if (discrim !== undefined) {
	      hasher.addU32(discrim);
	    }
	    hasher.addU32(i);
	    var key = hasher.first256BN();
	    if (key.cmpn(0) > 0 && key.cmp(order) < 0) {
	      return key;
	    }
	}
	throw new Error('impossible space search)');
}

module.exports = {
	ScalarMultiple: ScalarMultiple
};
