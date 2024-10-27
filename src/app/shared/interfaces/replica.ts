import { Spettacolo } from './spettacolo';

export interface Replica {
  id?: string;
  data?: Date;
  postiDisponibili?: number;
  spettacolo?: Spettacolo; // Relazione ManyToOne con Spettacolo
}
