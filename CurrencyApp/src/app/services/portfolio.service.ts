import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Money } from '../model/money';
import { Portfolio } from '../model/portfolio';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private portfolio$ = new BehaviorSubject<Portfolio>(new Portfolio());

  constructor() { }

  addMoneyToPortfolio(money: Money) {
    const currentPortfolio = this.portfolio$.getValue();
    currentPortfolio.add(money);
    this.portfolio$.next(currentPortfolio);
  }

  getPortfolio$(): Observable<Portfolio> {
    return this.portfolio$.asObservable();
  }
}
