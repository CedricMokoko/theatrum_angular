import { Cliente } from './cliente';
import { Replica } from './replica';

export interface Biglietto {
  id?: number; // COD_OPERAZIONE
  dataOra: Date; // DATA_ORA
  tipoPagamento: string; // TIPO_PAGAMENTO
  quantita: number; // QUANTITA
  cliente: Cliente; // Relazione ManyToOne con Cliente
  replica: Replica; // Relazione ManyToOne con Replica
}
