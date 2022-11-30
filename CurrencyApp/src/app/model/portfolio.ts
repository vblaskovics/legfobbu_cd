import { Money } from './money';

export class Portfolio {
  private _moneys = new Array<Money>();

  public get moneys(): Money[] {
    return this._moneys;
  }

  add(...moneys: Money[]) {
    this._moneys = this._moneys.concat(moneys);
  }

  evaluate(currency: string) {
    let sum = 0;
    for (const m of this._moneys) {
      sum += m.amount;
    }
    return new Money(sum, currency);
  }
}
