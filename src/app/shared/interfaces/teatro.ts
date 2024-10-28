import { Rating } from './rating';

export interface Teatro {
  id: string;
  nome?: string;
  indirizzo?: string;
  citta?: string;
  provincia?: string;
  telefono?: string;
  imageUrl?: string;
  posti?: number;
  ratings?: Rating[]; // Relazione OneToMany con Rating
}
