import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';
import { FieldValueComponent } from './field-value/field-value.component';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [BalanceComponent, FieldValueComponent],
  imports: [CommonModule, MatSliderModule],
  exports: [BalanceComponent, FieldValueComponent],
})
export class ComponentsModule {}
