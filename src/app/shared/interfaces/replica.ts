import { Spettacolo } from './spettacolo';

export interface Replica {
  id?: string;
  data?: Date;
  spettacolo?: Spettacolo; // Relazione ManyToOne con Spettacolo
}
