import { Rating } from './rating';

export interface Citta {
  id: String;
  nome?: string;
  description?: string;
  imageUrl?: string;
  ratings?: Rating[]; // Relazione OneToMany con Rating
}
