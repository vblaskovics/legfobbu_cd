// IMPLEMENTATION
class Money {
  constructor (amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  times(count) {
    return new Money(this.amount * count, this.currency);
  }
}


// TEST
const assert = require('assert');

// 5 USD x 2 = 10 USD
let fiveUSD = new Money(5, "USD");
let tenUSD = fiveUSD.times(2);
assert.strictEqual(tenUSD.amount, 10);
assert.strictEqual(tenUSD.currency, "USD");

// 10 EUR x 2 = 20 EUR
let tenEUR = new Money(10, "EUR");
let twentyEUR = tenEUR.times(2);
assert.strictEqual(twentyEUR.amount, 20);
assert.strictEqual(twentyEUR.currency, "EUR");




