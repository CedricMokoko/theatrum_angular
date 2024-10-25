import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TeatroService } from '../../shared/services/teatro.service';
import { Subscription, switchMap } from 'rxjs';
import { Spettacolo } from '../../shared/interfaces/spettacolo';
import { SpettacoloService } from '../../shared/services/spettacolo.service';
import { Teatro } from '../../shared/interfaces/teatro';

@Component({
  selector: 'app-spettacoli-list',
  templateUrl: './spettacoli-list.component.html',
  styleUrl: './spettacoli-list.component.scss',
})
export class SpettacoliListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public spettacoli?: Spettacolo[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private spettacoloService: SpettacoloService
  ) {}

  ngOnInit(): void {
    const sub1 = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const teatro_id = params.get('teatro_id'); // Recupera il parametro dall'URL
          if (teatro_id) {
            return this.spettacoloService.getSpettacolibyTeatriId$(teatro_id);
          }
          return [];
        })
      )
      .subscribe((spettacoli$: Spettacolo[]) => {
        this.spettacoli = spettacoli$;
        console.log(this.spettacoli);
      });

    this.subscription.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
