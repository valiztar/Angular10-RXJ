import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';
@Component({
  selector: 'app-balance',
  template: `<span>{{ balance | currency }}</span>`,
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  balance: number;
  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.balance.subscribe((response) => {
      this.balance = response;
    });
  }
}
