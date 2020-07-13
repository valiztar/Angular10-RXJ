import { Component, OnInit } from '@angular/core';
import { Prestamo, EstadosPrestamo } from 'src/app/models/prestamo.model';
import { FirestoreService } from 'src/app/services/firestore.service';
import { BalanceService } from 'src/app/services/balance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-prestamos',
  templateUrl: './listar-prestamos.component.html',
  styleUrls: ['./listar-prestamos.component.scss'],
})
export class ListarPrestamosComponent implements OnInit {
  List: Prestamo[] = [];
  aprovados: Prestamo[] = [];
  pagados: Prestamo[] = [];
  rechazados: Prestamo[] = [];

  constructor(
    private fireService: FirestoreService,
    private balanceService: BalanceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fireService.getAll().subscribe((result: any) => {
      this.List = result.map((prestamo: any) => {
        const id = prestamo.payload.doc.id;
        const {
          deudor,
          valor,
          fechaPagar,
          estado,
          pagoCredito,
        } = prestamo.payload.doc.data();
        return {
          id,
          deudor,
          valor,
          fechaPagar,
          estado,
          pagoCredito,
        };
      });
      this.aprovados = this.List.filter(
        (x) => x.estado === EstadosPrestamo.aprobado && !x.pagoCredito
      );
      this.pagados = this.List.filter(
        (x) => x.estado === EstadosPrestamo.aprobado && x.pagoCredito
      );
      this.rechazados = this.List.filter(
        (x) => x.estado === EstadosPrestamo.rechazado
      );
    });
  }

  pagar(prestamo: Prestamo): void {
    console.log(prestamo);
    prestamo.pagoCredito = true;
    this.fireService.update(prestamo.id, prestamo).then((res) => {
      this.aprovados = this.aprovados.filter((x) => x.id != prestamo.id);
      this.pagados.push(prestamo);
      this.balanceService.sumarBalance(prestamo.valor);
    });
  }
  ver(prestamo: Prestamo): void {
    this.router.navigate(['/prestamo/detalle'], { state: { data: prestamo } });
  }
}
