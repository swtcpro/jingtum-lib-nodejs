'use strict';

var utf8 = require('utf8');
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

exports.bytesToHex = bytesToHex;
exports.hexToBytes = hexToBytes;
