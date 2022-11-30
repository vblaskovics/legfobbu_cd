import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Money } from './model/money';
import { Portfolio } from './model/portfolio';
import { PortfolioService } from './services/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CurrencyApp';

  newMoneyAmount: number = 0;
  newMoneyCurrency: string = '';

  portfolio$: Observable<Portfolio>;
  constructor(private portfolioService: PortfolioService) {
    this.portfolio$ = portfolioService.getPortfolio$();
  }

  addMoney() {
    this.portfolioService.addMoneyToPortfolio({
      amount: this.newMoneyAmount,
      currency: this.newMoneyCurrency,
    });
  }
}
