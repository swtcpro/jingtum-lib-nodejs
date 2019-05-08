const chai = require("chai");
const expect = chai.expect;
const Account = require("../src/account");
const Remote = require("../src/remote");
const config = require("./self_test/config");
const txData = require("./tx_data");
const sinon = require("sinon");
const utils = require("../src/utils");
let { JT_NODE, testAddress } = config;

describe("test account", function() {
  describe("test constructor", function() {
    it("constructor: Account", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      });
      let account = new Account(remote);
      expect(account._remote).to.equal(remote)
    })
  });

  describe("test transactions event", function() {
    it("emit transactions with meta data", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      });
      let account = new Account(remote);
      let spy = sinon.spy(utils, "affectedAccounts");
      account._remote.emit("transactions", txData.input26);
      expect(spy.calledOnce).to.equal(true);
      sinon.restore()
    });

    it("emit transactions without meta data", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      });
      let account = new Account(remote);
      let spy = sinon.spy(utils, "affectedAccounts");
      account._remote.emit("transactions", txData.input24);
      expect(spy.calledOnce).to.equal(true);
      sinon.restore()
    })
  });

  describe("test newListener", function() {
    it("if the new event name is not removeListener and the account is valid", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      });
      let account = new Account(remote);
      let callback = function() {}
      account.on(testAddress, callback);
      account.emit(testAddress, "test");
      expect(account._accounts[testAddress]).to.deep.equal(callback)
    });

    it("if the new event name is not removeListener and the account is invalid", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      });
      let account = new Account(remote);
      let callback = function() {};
      account.on(testAddress.substring(1), callback);
      account.emit(testAddress.substring(1), "test");
      expect(account.account).to.be.an("error");
      expect(account._accounts).to.deep.equal({})
    })
  });

  describe("test removeListener", function() {
    it("if the account is valid", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      })
      let account = new Account(remote);
      let callback = function() {};
      account.on(testAddress, callback);
      account.emit(testAddress, "test");
      expect(account._accounts[testAddress]).to.deep.equal(callback);
      account.removeListener(testAddress, callback);
      expect(account._accounts).to.deep.equal({})
    });

    it("if the account is invalid", function() {
      let remote = new Remote({
        server: JT_NODE,
        local_sign: true
      })
      let account = new Account(remote);
      let callback = function() {};
      account.on(testAddress.substring(1), callback);
      account.emit(testAddress.substring(1), "test");
      expect(account._accounts).to.deep.equal({});
      account.removeListener(testAddress.substring(1), callback);
      expect(account.account).to.be.an("error");
      expect(account._accounts).to.deep.equal({})
    })
  })
});
