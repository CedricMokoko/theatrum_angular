import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, switchMap } from 'rxjs';
import { Replica } from '../../shared/interfaces/replica';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ReplicaService } from '../../shared/services/replica.service';

@Component({
  selector: 'app-repliche-list',
  templateUrl: './repliche-list.component.html',
  styleUrl: './repliche-list.component.scss',
})
export class ReplicheListComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public repliche?: Replica[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private replicaService: ReplicaService
  ) {}

  ngOnInit(): void {
    const sub1 = this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const spettacolo_id = params.get('spettacolo_id'); // Controlla il parametro
          if (spettacolo_id) {
            return this.replicaService.getReplicheBySpettacoliId$(
              spettacolo_id
            );
          }
          return [];
        })
      )
      .subscribe((repliche$: Replica[]) => {
        this.repliche = repliche$;
      });

    this.subscription.add(sub1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
