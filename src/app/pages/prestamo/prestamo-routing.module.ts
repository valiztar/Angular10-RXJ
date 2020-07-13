import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitarPrestamoComponent } from './solicitar-prestamo/solicitar-prestamo.component';
import { ListarPrestamosComponent } from './listar-prestamos/listar-prestamos.component';
import { DetallePrestamoComponent } from './detalle-prestamo/detalle-prestamo.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPrestamosComponent,
  },
  {
    path: 'solicitar',
    component: SolicitarPrestamoComponent,
  },
  {
    path: 'detalle',
    component: DetallePrestamoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrestamoRoutingModule {}
