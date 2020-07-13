import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from 'src/app/models/prestamo.model';
@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.scss'],
})
export class DetallePrestamoComponent implements OnInit {
  prestamo: Prestamo;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!window.history.state.data) {
      this.router.navigate(['/prestamo']);
    }
    this.prestamo = window.history.state.data;
  }
}
