/*
    This file is part of web3.js.
    web3.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    web3.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    You should have received a copy of the GNU Lesser General Public License
    along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file index.d.ts
 * @author Josh Stevens <joshstevens19@hotmail.co.uk>
 * @date 2018
 */


var AbiCoder = require('tum3-eth-abi').AbiCoder;
var abi = new AbiCoder();
// console.log('abi data: ',abi.utils.sha3('setInfo(string,uint256)').slice(0, 8) + abi.encodeParameters(['string','int'], ['xiaohong', 20]));
// var deData = abi.decodeParameters(['string','int'], '0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000087869616f686f6e67000000000000000000000000000000000000000000000000');
// var deData = abi.decodeParameters(['string','int'], '0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000364616e0000000000000000000000000000000000000000000000000000000000');
// console.log(deData);


// function getTypes(abi, foo) {
//     return abi.filter(function (json) {
//         return json.name === foo
//     }).map(function (json) {
//         return json.outputs.map(function (input) {
//             return input.type;
//         });
//     }).map(function (types) {
//         return types;
//     })[0] || '';
// }
// var abiDemo = [
//     {
//         "constant": false,
//         "inputs": [],
//         "name": "getInfo",
//         "outputs": [
//             {
//                 "name": "",
//                 "type": "string"
//             },
//             {
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "constant": false,
//         "inputs": [
//             {
//                 "name": "_fName",
//                 "type": "string"
//             },
//             {
//                 "name": "_age",
//                 "type": "uint256"
//             }
//         ],
//         "name": "setInfo",
//         "outputs": [],
//         "payable": false,
//         "stateMutability": "nonpayable",
//         "type": "function"
//     }
// ];
// var types = getTypes(abiDemo, 'getInfo');
// console.log('types: ', types);


console.log(abi.encodeParameter('uint256', 10));
// console.log(abi.encodeParameters(['string','int'], ['xiaohong', 20]));
// console.log(abi.encodeFunctionSignature('ReturnValue(address,int256)'));
const abi4 = [
    {
        "constant": false,
        "inputs": [],
        "name": "foo",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "int256"
            }
        ],
        "name": "ReturnValue",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "int256"
            }
        ],
        "name": "defaultEvent",
        "type": "event"
    }
];
// abi4.filter(function (json) { return json.type === 'event' })
//     .map(function (json)
//     {
//         var types =  json.inputs.map(function (input) {
//             return input.type;
//         });
//         var foo = json.name + '(' + types.join(',')  + ')';
//         console.log('foo: ',foo);
//     });

// abi4.forEach(function (t) {
//     if(t.type === 'event'){
//         var types = t.inputs.map(function (types) {
//             return types.type;
//         });
//
//         var foo = t.name + '(' + types.join(',')  + ')';
//         console.log(foo);
//     }
// });
// console.log(abi.decodeLog(abi4[1].inputs,'0x000000000000000000000000000000000000000000000000000000000000014d',["0x49b8f73ede7e3add061b44b8290927d0f2dbdd6f7aad5c7e110893c40e51c861","0x000000000000000000000000b5f762798a53d543a014caf8b297cff8f2f937e8"]));
// console.log(abi.decodeLog(abi4[2].inputs,'0x000000000000000000000000000000000000000000000000000000000000014d',["0xe959f2399fcce89a2b0654dddbb3001cc778cdfe459f1024e14f0d14c3e16ae4","0x000000000000000000000000b5f762798a53d543a014caf8b297cff8f2f937e8"]));
// console.log(abi.encodeEventSignature('ReturnValue(address,int256)'));
// console.log(abi.encodeEventSignature('defaultEvent(address,int256)'));
// var Chain3 = require('tum3');
// var chain3 = new Chain3();
// var types = ['string','int'];
// var args = ['dan', 28];
//
// var dataHex =  '0x' + chain3.encodeParams(types, args);
// console.log("encoded params:", dataHex);