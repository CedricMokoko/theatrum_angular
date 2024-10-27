import { Teatro } from './teatro';

export interface Spettacolo {
  id: string;
  titolo?: string;
  autore?: string;
  regista?: string;
  prezzo?: number;
  teatro?: Teatro; // Relazione ManyToOne con Teatro
}
