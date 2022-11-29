// IMPLEMENTATION
class Dollar {
  constructor(amount) {
    this.amount = amount;
  }

  times(count) {
    return new Dollar(this.amount * count)
  }
}

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

let fiveUSD = new Dollar(5);
let tenUSD = fiveUSD.times(2);
assert.strictEqual(tenUSD.amount, 10);

let tenEUR = new Money(10, "EUR");
let twentyEUR = tenEUR.times(2);
assert.strictEqual(twentyEUR.amount, 20);
assert.strictEqual(twentyEUR.currency, "EUR");




