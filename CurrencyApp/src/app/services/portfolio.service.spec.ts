import { TestBed } from '@angular/core/testing';
import { Money } from '../model/money';

import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should provide a portfolio', () => {
    expect(service.getPortfolio$()).toBeTruthy();
  });

  it('should be able to add money to portfolio', () => {
    service.addMoneyToPortfolio({
      amount: 1,
      currency: 'HUF',
    });
    service.getPortfolio$().subscribe({
      next: (portfolio) => {
        expect(portfolio.moneys.length).toBe(1);
      },
    });
  });

  it('should remove all money from portfolio by currency', () => {
    const moneyHUF = {
      amount: 1,
      currency: 'HUF',
    };
    const moneyUSD = {
      amount: 1,
      currency: 'USD',
    };
    service.addMoneyToPortfolio(moneyHUF,moneyHUF,moneyHUF,moneyUSD);
    service.removeMoneysByCurrency('HUF');
    expect(service.getPortfolio().moneys.length).toBe(1);
  });
});
