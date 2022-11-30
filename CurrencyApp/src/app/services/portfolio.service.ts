import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Money } from '../model/money';
import { Portfolio } from '../model/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private _portfolio$ = new BehaviorSubject<Portfolio>({ moneys: [] });

  constructor() {}

  addMoneyToPortfolio(...money: Money[]) {
    const newPortfolio = { ...this._portfolio$.getValue() };
    newPortfolio.moneys = newPortfolio.moneys.concat(money);
    this._portfolio$.next(newPortfolio);
  }

  getPortfolio$(): Observable<Portfolio> {
    return this._portfolio$.asObservable();
  }

  getPortfolio(): Portfolio {
    return this._portfolio$.getValue();
  }

  removeMoneysByCurrency(currency: string) {
    const newPortfolio = { ...this._portfolio$.getValue() };
    newPortfolio.moneys = newPortfolio.moneys.filter(
      (m) => m.currency !== currency
    );
    this._portfolio$.next(newPortfolio);
  }
}
