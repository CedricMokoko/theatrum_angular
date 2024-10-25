import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.scss',
})
export class OrderSuccessComponent implements OnInit {
  public clienteId!: number | undefined;
  public clienteNome!: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Recupera il valore attuale del cliente dal BehaviorSubject
    const currentCliente = this.authService.cliente$.getValue();

    if (currentCliente) {
      this.clienteId = currentCliente.id;
      this.clienteNome = currentCliente.nome;
    }
  }
}
