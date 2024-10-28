import { Rating } from './rating';
import { Teatro } from './teatro';

export interface Spettacolo {
  id: string;
  titolo?: string;
  autore?: string;
  regista?: string;
  prezzo?: number;
  imageUrl?: string;
  teatro?: Teatro; // Relazione ManyToOne con Teatro
  ratings?: Rating[]; // Relazione OneToMany con Rating
}
