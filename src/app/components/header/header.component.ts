import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  options = ['inicio', 'prestamos', 'solicitar'];

  constructor(private observerService: BalanceService) {}

  ngOnInit(): void {}
}
