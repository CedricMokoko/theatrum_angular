import { Teatro } from './teatro';

export interface Spettacolo {
  id: string; // COD_SPETTACOLO
  titolo: string; // TITOLO
  autore: string; // AUTORE
  regista: string; // REGISTA
  prezzo: number; // PREZZO
  teatro: Teatro; // Relazione ManyToOne con Teatro
}
