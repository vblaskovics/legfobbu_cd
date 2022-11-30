import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Money } from '../model/money';
import { Portfolio } from '../model/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private portfolio$ = new BehaviorSubject<Portfolio>({ moneys: [] });

  constructor() {}

  addMoneyToPortfolio(money: Money) {
    const newPortfolio = { ...this.portfolio$.getValue() };
    newPortfolio.moneys.push(money);
    this.portfolio$.next(newPortfolio);
  }

  getPortfolio$(): Observable<Portfolio> {
    return this.portfolio$.asObservable();
  }
}
