'use strict';

var BN = require('bn.js');
var assert = require('assert');

function bytesToHex(a) {
  return a.map(function (byteValue) {
    var hex = byteValue.toString(16).toUpperCase();
    return hex.length > 1 ? hex : '0' + hex;
  }).join('');
}

function hexToBytes(a) {
    assert(a.length % 2 === 0);
    return new BN(a, 16).toArray(null, a.length / 2);
}
function seqEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}


exports.bytesToHex = bytesToHex;
exports.hexToBytes = hexToBytes;
exports.seqEqual = seqEqual;
