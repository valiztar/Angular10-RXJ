import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestamoRoutingModule } from './prestamo-routing.module';
import { SolicitarPrestamoComponent } from './solicitar-prestamo/solicitar-prestamo.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ListarPrestamosComponent } from './listar-prestamos/listar-prestamos.component';
import { DetallePrestamoComponent } from './detalle-prestamo/detalle-prestamo.component';
@NgModule({
  declarations: [
    SolicitarPrestamoComponent,
    ListarPrestamosComponent,
    DetallePrestamoComponent,
  ],
  imports: [
    CommonModule,
    PrestamoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class PrestamoModule {}
