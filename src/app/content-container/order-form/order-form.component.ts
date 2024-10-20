import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { BigliettoService } from '../../shared/services/biglietto.service';
import { Biglietto } from '../../shared/interfaces/biglietto';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent implements OnInit, OnDestroy {
  public orderForm!: FormGroup;
  public clienteId!: string;
  public replicaId!: string;
  private subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder, // Iniettare FormBuilder per creare il form
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private bigliettoService: BigliettoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Creare il form iniziale, con valori vuoti
    this.orderForm = this.formBuilder.group({
      codiceCliente: [''], // Campo per il codice cliente
      codiceReplica: [''], // Campo per il codice replica
      tipoPagamento: [''], // Radio button per il pagamento
      quantita: [1], // Campo per la quantità
    });

    // Recupera l'ID del cliente dal AuthService
    this.clienteId = this.authService.getClienteId()?.toString()!; // Recupera e converte in stringa

    // Popolare il campo del form con l'ID del cliente
    if (this.clienteId) {
      this.orderForm.patchValue({
        codiceCliente: this.clienteId, // Usa l'ID del cliente
      });
    }

    //Parametro clienteId dalla route
    this.replicaId = this.activatedRoute.snapshot.paramMap.get('replica_id')!;
    if (this.replicaId) {
      // Popolare i campi del form con i dati del cliente
      this.orderForm.patchValue({
        codiceReplica: this.replicaId, // Usa l'ID del cliente
      });
    }
  }

  public submit(): void {
    if (this.orderForm.valid) {
      // Ensure the form is valid before submission
      const newBiglietto: Biglietto = {
        tipoPagamento: this.orderForm.get('tipoPagamento')?.value,
        quantita: this.orderForm.get('quantita')?.value,
        cliente: { id: Number(this.clienteId) }, // Create Cliente object
        replica: { id: this.replicaId }, // Create Replica object
      };

      this.subscription = this.bigliettoService
        .createBiglietto(newBiglietto)
        .subscribe({
          next: (biglietto) => {
            console.log('Ticket created:', biglietto);
            this.router.navigate(['/success']); // Redirect to a success page after submission
          },
        });
    } else {
      console.error('Form is invalid. Please check the fields.'); // Handle form errors
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the observable to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
