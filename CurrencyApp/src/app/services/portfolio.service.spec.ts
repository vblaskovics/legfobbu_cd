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

  it('should provide portfolio stream', () => {
    expect(service.getPortfolio$()).toBeTruthy();
  });

  it('should be able to add money to portfolio', () => {
    service.addMoneyToPortfolio({
      amount: 1,
      currency: "HUF"
    });
    service.getPortfolio$().subscribe((portfolio) => {
      expect(portfolio.moneys.length).toBe(1);
    });
  });

});
