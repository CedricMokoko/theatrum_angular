import { Component, OnDestroy, OnInit } from '@angular/core';
import { Biglietto } from '../shared/interfaces/biglietto';
import { Subscription } from 'rxjs';
import { BigliettoService } from '../shared/services/biglietto.service';
import { ClienteService } from '../shared/services/cliente.service';
import { Replica } from '../shared/interfaces/replica';
import { ReplicaService } from '../shared/services/replica.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.scss',
})
export class PanierComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public biglietti?: Biglietto[];
  public clienteId?: number;
  // public replica?: Replica;

  constructor(
    private bigliettoService: BigliettoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupera il valore attuale del cliente dal BehaviorSubject
    const currentCliente = this.authService.cliente$.getValue();

    if (currentCliente) {
      // Se il cliente è presente, assegna il clienteId
      this.clienteId = currentCliente.id;

      // Se il clienteId è presente, recupera i biglietti associati
      const sub1 = this.bigliettoService
        .getBigliettiByClienteId$(Number(this.clienteId))
        .subscribe((biglietti: Biglietto[]) => {
          this.biglietti = biglietti;
        });

      // Aggiungi la subscription all'elenco di subscription
      this.subscription.add(sub1);
    } else {
      console.log('Cliente non trovato.');
    }
  }

  public getSortedBiglietti(): Biglietto[] | undefined {
    if (this.biglietti) {
      // Ritorna i biglietti ordinati per data della replica in ordine decrescente
      return [...this.biglietti].sort(
        (a, b) =>
          new Date(a.replica.data!).getTime() -
          new Date(b.replica.data!).getTime()
      );
    }
    return undefined;
  }

  ngOnDestroy(): void {
    // Unsubscribe da tutte le subscription quando il componente viene distrutto
    this.subscription.unsubscribe();
  }
}
