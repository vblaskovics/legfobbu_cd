import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-money',
  templateUrl: './new-money.component.html',
  styleUrls: ['./new-money.component.css']
})
export class NewMoneyComponent implements OnInit {
  newMoneyAmount: number = 0;
  newMoneyCurrency: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  addMoney(){}

}
