// IMPLEMENTATION
class Money {
  constructor (amount, currency) {
    this.amount = amount;
    this.currency = currency;
  }

  times(count) {
    return new Money(this.amount * count, this.currency);
  }

  divide(num) {
    return new Money(this.amount / num, this.currency);
  }
}

class Portfolio {
  add(money) {}
  evaluate(currency) {}
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

// 4002 HUF / 4 = 1000.5 HUF
let money1 = new Money(4002, "HUF");
let moneyDivide4 = money1.divide(4);
let expectedMoney = new Money(1000.5, "HUF");
assert.deepStrictEqual(moneyDivide4, expectedMoney);

// 5 USD + 10 USD = 15 USD
let fifteenDollars = new Money(15, "USD")
let fiveDollars = new Money(5, "USD");
let tenDollars = new Money(10, "USD");
let portfolio = new Portfolio();
portfolio.add(fiveDollars);
portfolio.add(tenDollars);
assert.deepStrictEqual(portfolio.evaluate("USD"), fifteenDollars);
