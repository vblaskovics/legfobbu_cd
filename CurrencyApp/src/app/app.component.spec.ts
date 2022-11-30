import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'CurrencyApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('CurrencyApp');
  });

  describe('New money form', () => {
    it('should be rendered', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;
      
      const newMoneyForm = compiled.querySelector('[data-test="newMoneyForm"]');
  
      expect(newMoneyForm).toBeTruthy();
    });

    it('should add a new money to our portfolio', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const compiled = fixture.nativeElement as HTMLElement;

      const amountInput = compiled.querySelector('input[name="amount"]') as HTMLInputElement;
      expect(amountInput).withContext("Amount input field not found").toBeTruthy();
      const currencyInput = compiled.querySelector('input[name="currency"]') as HTMLInputElement;
      expect(currencyInput).withContext("Currency input field not found").toBeTruthy();

      amountInput.value = "2";
      currencyInput.value = "HUF";

      amountInput.dispatchEvent(new Event('input'));
      currencyInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      
      const submitBtn = compiled.querySelector('[data-test="newMoneySubmit"]') as HTMLButtonElement;
      submitBtn.click();
      fixture.detectChanges();

      const moneyItems = compiled.querySelectorAll('[data-test="portfolioMoneyItem"]');
      expect(moneyItems.length).toBe(1);
    })
  
  });


});
