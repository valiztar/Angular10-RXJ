import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BalanceService } from 'src/app/services/balance.service';
@Component({
  selector: 'app-field-value',
  templateUrl: './field-value.component.html',
  styleUrls: ['./field-value.component.scss'],
})
export class FieldValueComponent implements OnInit {
  @Output() valueSelected = new EventEmitter<number>();
  value: number = 100;
  enabled = true;
  max: number;
  min: number = 100;
  constructor(private balanceService: BalanceService) {
    this.balanceService.balance.subscribe((response) => {
      this.max = response;
    });
  }

  ngOnInit() {}
  change() {
    this.valueSelected.emit(this.value);
  }
}
