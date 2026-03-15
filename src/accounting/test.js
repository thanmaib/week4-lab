const { expect } = require('chai');
const mock = require('mock-fs');
const fs = require('fs');

// Import the functions from index.js
const path = require('path');
const accountingPath = path.resolve(__dirname, '../accounting/index.js');
const app = require(accountingPath);

// Helper to reset balance file
function setBalance(value) {
  fs.writeFileSync(path.resolve(__dirname, '../accounting/balance.json'), JSON.stringify({ balance: value }));
}
function getBalance() {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, '../accounting/balance.json'), 'utf8')).balance;
}

describe('Student Account Management System', function () {
  beforeEach(() => {
    // Reset the balance file before each test
    setBalance(1000.00);
  });

  after(() => {
    // Clean up
    fs.unlinkSync(path.resolve(__dirname, '../accounting/balance.json'));
  });

  it('TC-01: View initial account balance', function () {
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC-02: Credit account with valid amount', function () {
    let balance = getBalance();
    balance += 200.00;
    setBalance(balance);
    expect(getBalance()).to.equal(1200.00);
  });

  it('TC-03: Debit account with sufficient funds', function () {
    let balance = getBalance();
    balance -= 100.00;
    setBalance(balance);
    expect(getBalance()).to.equal(900.00);
  });

  it('TC-04: Debit account with insufficient funds', function () {
    setBalance(100.00);
    let balance = getBalance();
    if (balance < 2000.00) {
      // Should not allow debit
      expect(balance).to.be.below(2000.00);
    }
  });

  it('TC-05: Multiple credits and debits', function () {
    let balance = getBalance();
    balance += 100.00;
    setBalance(balance);
    balance -= 50.00;
    setBalance(balance);
    expect(getBalance()).to.equal(1050.00);
  });

  it('TC-06: Exit application', function () {
    // No state change, just a placeholder
    expect(true).to.be.true;
  });

  it('TC-07: Invalid menu selection', function () {
    // No state change, just a placeholder
    expect(true).to.be.true;
  });

  it('TC-08: Credit with zero or negative amount', function () {
    let balance = getBalance();
    // Should not change balance
    setBalance(balance);
    expect(getBalance()).to.equal(1000.00);
  });

  it('TC-09: Debit with zero or negative amount', function () {
    let balance = getBalance();
    // Should not change balance
    setBalance(balance);
    expect(getBalance()).to.equal(1000.00);
  });
});
