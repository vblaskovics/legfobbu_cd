class Money {
  constructor(amount, currency) {
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

module.exports = Money;