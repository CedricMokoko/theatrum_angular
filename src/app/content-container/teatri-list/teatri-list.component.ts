import { Component, Input } from '@angular/core';
import { Teatro } from '../../shared/interfaces/teatro';
import { TeatroService } from '../../shared/services/teatro.service';
import { SpettacoloService } from '../../shared/services/spettacolo.service';

@Component({
  selector: 'app-teatri-list',
  templateUrl: './teatri-list.component.html',
  styleUrl: './teatri-list.component.scss',
})
export class TeatriListComponent {
  public teatri?: Teatro[];

  constructor(
    private teatroService: TeatroService,
    private spettacoloService: SpettacoloService
  ) {}

  ngOnInit(): void {
    this.teatroService.teatri$.subscribe((teatri$) => {
      this.teatri = teatri$;
    });
  }

  // public getSpettacoliByTeatroId(teatro_id) {

  // }
}
