import { Component, Input, OnInit } from '@angular/core';
import { Teatro } from '../../shared/interfaces/teatro';
import { TeatroService } from '../../shared/services/teatro.service';
import { SpettacoloService } from '../../shared/services/spettacolo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-teatri-list',
  templateUrl: './teatri-list.component.html',
  styleUrl: './teatri-list.component.scss',
})
export class TeatriListComponent implements OnInit {
  public teatri?: Teatro[];
  public clienteId!: number | null;
  public clienteNome!: string | null | undefined;

  constructor(
    private teatroService: TeatroService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Recupero l'Id e il nome dell'utente grazie ai getters definiti nella classe "AuthService"
    this.clienteId = this.authService.getClienteId();
    this.clienteNome = this.authService.getClienteNome();

    // Recupero la lista dei teatri dall'BehaviorSubject "teatri$""
    this.teatroService.teatri$.subscribe((teatri$) => {
      this.teatri = teatri$;
    });
  }
}
