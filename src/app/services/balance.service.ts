import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  ReplaySubject,
  throwError,
  from,
} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private currentBalance = new BehaviorSubject<number>(
    environment.company.balance
  );

  balance = this.currentBalance.asObservable();

  constructor() {}

  sumarBalance(balance: number) {
    let newBalance = this.currentBalance.value + balance;
    this.currentBalance.next(newBalance);
  }
  restarBalance(balance: number) {
    let newBalance = this.currentBalance.value - balance;
    this.currentBalance.next(newBalance);
  }
}
