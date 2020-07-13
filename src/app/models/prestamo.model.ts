import { User } from './user.model';

export interface Prestamo {
  id: string;
  deudor: User;
  valor: number;
  fechaPagar: Date;
  estado: EstadosPrestamo;
  pagoCredito: boolean;
}

export enum EstadosPrestamo {
  aprobado = 'Aprobado',
  rechazado = 'Rechazado',
}
