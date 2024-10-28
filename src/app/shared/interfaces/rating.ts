import { RatedEntityType } from '../enum/rated-entity-type';
import { Cliente } from './cliente';

export interface Rating {
  id?: number;
  cliente: Cliente; // Relazione ManyToOne con Cliente
  ratingValue: number;
  ratedEntityId: string;
  ratedEntityType: RatedEntityType;
  createdAt: string;
}
