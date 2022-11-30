export class Money {
  private _amount: number;
  private _currency: string;

  constructor(amount: number, currency: string) {
    this._amount = amount;
    this._currency = currency;
  }

  public get amount() {
    return this._amount;
  }

  public set amount(a) {
    this._amount = a;
  }

  public get currency(): string {
    return this._currency;
  }

  public set currency(c: string) {
    this._currency = c;
  }

  times(count: number): Money {
    return new Money(this.amount * count, this.currency);
  }

  divide(num: number): Money {
    return new Money(this.amount / num, this.currency);
  }
}
