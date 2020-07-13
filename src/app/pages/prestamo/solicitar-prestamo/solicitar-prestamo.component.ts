import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { EstadosPrestamo, Prestamo } from 'src/app/models/prestamo.model';

import { FirestoreService } from 'src/app/services/firestore.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-solicitar-prestamo',
  templateUrl: './solicitar-prestamo.component.html',
  styleUrls: ['./solicitar-prestamo.component.scss'],
})
export class SolicitarPrestamoComponent implements OnInit {
  solicitudForm: FormGroup;
  List: Prestamo[];
  blackList: Prestamo[];

  constructor(
    private fb: FormBuilder,
    private fireService: FirestoreService,
    private router: Router,
    private balanceService: BalanceService
  ) {}

  ngOnInit(): void {
    //iniciar formulario
    this.solicitudForm = this.fb.group({
      deudor: this.fb.group({
        nombre: [null, [Validators.required]],
        correo: [null, [Validators.required, Validators.email]],
        cedula: [null, [Validators.required]],
      }),
      valor: [100, [Validators.required]],
      fechaPagar: [null],
      estado: [EstadosPrestamo.rechazado, [Validators.required]],
      pagoCredito: [false, [Validators.required]],
    });
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
      this.blackList = this.List.filter(
        (prestamo) => prestamo.estado == EstadosPrestamo.rechazado
      );
      console.log(this.blackList);
    });
  }

  get deudor() {
    return this.solicitudForm.get('deudor')['controls'];
  }

  valueSelected(valor) {
    this.solicitudForm.get('valor').setValue(valor);
  }

  estadoSelected(estado: EstadosPrestamo) {
    this.solicitudForm.get('estado').setValue(estado);
    return estado;
  }

  onSubmit() {
    let estado;
    //Valida aprovacion y existencia en BlackList(alguna vez rechazado)
    if (
      this.aprobacionRandom() &&
      !this.blackList.some(
        (prestamo) => prestamo.deudor.cedula === this.deudor.cedula.value
      )
    ) {
      //aprovado
      estado = this.estadoSelected(EstadosPrestamo.aprobado);
      this.balanceService.restarBalance(this.solicitudForm.get('valor').value);
    } else {
      //rechazado
      estado = this.estadoSelected(EstadosPrestamo.rechazado);
    }
    //guardar informacion
    this.fireService.create(this.solicitudForm.value);
    //Alert retornar a home
    swal
      .fire({
        icon: estado === EstadosPrestamo.aprobado ? 'success' : 'error',
        title: 'Resultado de su Solicitud',
        text: `Prestamo ${estado}`,
        confirmButtonText: 'Ok',
      })
      .then((result) => this.router.navigate(['/']));
  }

  aprobacionRandom(): boolean {
    return Math.floor(Math.random() * (100 - 0)) % 2 == 0;
  }
}
