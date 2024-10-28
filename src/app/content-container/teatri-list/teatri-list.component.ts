import { Component, Input, OnInit } from '@angular/core';
import { Teatro } from '../../shared/interfaces/teatro';
import { TeatroService } from '../../shared/services/teatro.service';
import { AuthService } from '../../shared/services/auth.service';
import { RatingService } from '../../shared/services/rating.service';
import { RatedEntityType } from '../../shared/enum/rated-entity-type';
import { faStar } from '@fortawesome/free-solid-svg-icons'; // Importa icona della stella piena

@Component({
  selector: 'app-teatri-list',
  templateUrl: './teatri-list.component.html',
  styleUrl: './teatri-list.component.scss',
})
export class TeatriListComponent implements OnInit {
  public teatri?: Teatro[];
  public clienteId!: number | null;
  public clienteNome!: string | null | undefined;
  public ratingsMap: Map<string, number> = new Map(); // Mappa per le medie delle valutazioni
  public maxRating: number = 5;
  public faStar = faStar; // Definisce l'icona stella di Font Awesome

  constructor(
    private teatroService: TeatroService,
    private ratingService: RatingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.clienteId = this.authService.getClienteId();
    this.clienteNome = this.authService.getClienteNome();

    // Recupera la lista dei teatri e aggiorna le medie per ciascun teatro
    this.teatroService.teatri$.subscribe((teatri$) => {
      this.teatri = teatri$;

      // Ottieni la media delle valutazioni per ciascun teatro
      this.teatri.forEach((teatro) => this.getAverageRating(teatro.id));
    });
  }

  //----- Sistema di Rating

  /**
   * Imposta la valutazione corrente e la invia al backend.
   * @param value Valore della stella cliccata
   * @param teatroId ID del teatro
   */
  setRating(value: number, teatroId: string): void {
    if (this.clienteId) {
      this.ratingService
        .addRating$(this.clienteId, teatroId, RatedEntityType.TEATRO, value)
        .subscribe(() => this.getAverageRating(teatroId)); // Aggiorna la media dopo aver inviato il voto
    }
  }

  /**
   * Recupera la media delle valutazioni per il teatro e la memorizza nella mappa.
   * @param teatroId ID del teatro
   */
  getAverageRating(teatroId: string): void {
    this.ratingService
      .getAverageRating$(teatroId)
      .subscribe((media: number) => {
        this.ratingsMap.set(teatroId, media); // Salva la media nella mappa
      });
  }
}
