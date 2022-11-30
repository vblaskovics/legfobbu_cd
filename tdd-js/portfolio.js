const Money = require('./money');

class Portfolio {
  moneys = [];
  add(...moneys) {
    this.moneys = this.moneys.concat(moneys);
  }
  evaluate(currency) {
    let sum = 0;
    for (const m of this.moneys) {
      sum += m.amount;
    }
    return new Money(sum, currency);
  }
}

module.exports = Portfolio;