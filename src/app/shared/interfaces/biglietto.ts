import { Cliente } from './cliente';
import { Replica } from './replica';

export interface Biglietto {
  id?: number;
  codOperazione?: string;
  dataOra?: Date;
  tipoPagamento: string;
  quantita: number;
  cliente: Cliente; // Relazione ManyToOne con Cliente
  replica: Replica; // Relazione ManyToOne con Replica
}
