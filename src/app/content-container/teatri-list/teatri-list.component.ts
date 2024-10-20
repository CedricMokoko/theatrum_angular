import { Component, Input, OnInit } from '@angular/core';
import { Teatro } from '../../shared/interfaces/teatro';
import { TeatroService } from '../../shared/services/teatro.service';
import { SpettacoloService } from '../../shared/services/spettacolo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teatri-list',
  templateUrl: './teatri-list.component.html',
  styleUrl: './teatri-list.component.scss',
})
export class TeatriListComponent implements OnInit {
  public teatri?: Teatro[];
  public clienteId!: string;
  public clienteNome!: string;

  constructor(
    private teatroService: TeatroService,
    private spettacoloService: SpettacoloService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Ottieni l'ID e il nome del cliente dalla route
    this.clienteId = this.activatedRoute.snapshot.paramMap.get('cliente_id')!;
    this.clienteNome =
      this.activatedRoute.snapshot.paramMap.get('cliente_nome')!;
    //-------
    this.teatroService.teatri$.subscribe((teatri$) => {
      this.teatri = teatri$;
    });
  }

  // public getSpettacoliByTeatroId(teatro_id) {

  // }
}
