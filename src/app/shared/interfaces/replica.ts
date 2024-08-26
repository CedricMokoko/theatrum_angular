import { Spettacolo } from './spettacolo';

export interface Replica {
  id: string; // COD_REPLICA
  data: Date; // DATA_REPLICA
  spettacolo: Spettacolo; // Relazione ManyToOne con Spettacolo
}
