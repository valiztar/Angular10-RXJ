import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Prestamo, EstadosPrestamo } from 'src/app/models/prestamo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private fireService: FirestoreService) {}

  List: Prestamo[] = [];
  aprovados: number = 0;
  rechazados: number = 0;
  ngOnInit(): void {
    this.fireService.getAll().subscribe((result: any) => {
      this.List = result.map((prestamo: any) => {
        const {
          deudor,
          valor,
          fechaPagar,
          estado,
          pagoCredito,
        } = prestamo.payload.doc.data();
        return {
          deudor,
          valor,
          fechaPagar,
          estado,
          pagoCredito,
        };
      });
      this.aprovados = this.List.filter(
        (x) => x.estado === EstadosPrestamo.aprobado
      ).length;
      this.rechazados = this.List.filter(
        (x) => x.estado === EstadosPrestamo.rechazado
      ).length;
    });
  }
}
