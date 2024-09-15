import { Component, OnInit } from '@angular/core';
import { TeatroService } from '../shared/services/teatro.service';
import { Observable } from 'rxjs';
import { Teatro } from '../shared/interfaces/teatro';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent implements OnInit {
  public teatri$?: Observable<Teatro[]> = this.teatroService.teatri$;

  constructor(private teatroService: TeatroService) {}

  ngOnInit(): void {
    this.teatroService.fetchTeatri$().subscribe();
  }
}
