import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StarshipsService } from 'src/app/shared/services/starships.service';
import { Starships } from '../../shared/interfaces/starships.interface';
import { Starship } from '../../shared/interfaces/straship.interface';

@Component({
  selector: 'ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit, OnDestroy {

  public error: boolean = null;
  public starships: Starship[];
  public nextPage: string = null;
  public previousPage: string = null;
  private lastResponse: Starships;
  private shipsSubscription: Subscription = null;

  constructor(private starshipsService: StarshipsService) { }

  ngOnInit(): void {
    this.fetchPage();
  }

  ngOnDestroy(): void {
    this.shipsSubscription.unsubscribe();
  }

  public fetchPage(direction?: 'next' | 'previous'): void {
    const re = /http/gi;
    // Get the next or previous url if not set finished to indicate that is the end and there is any url
    const url = !this.lastResponse ? null : this.lastResponse[direction] ? this.lastResponse[direction].replace(re, 'https') : 'finished';

    if (url !== 'finished') {
      this.shipsSubscription = this.starshipsService.getAllStarshipsByUrl(url)
      .subscribe((data: Starships) => {
          this.starships = data.results;
          this.nextPage = data.next ? data.next : null;
          this.previousPage = data.previous ? data.previous : null;
          this.lastResponse = data;
        },
        error => this.error = true,
      );
    }
  }
}
