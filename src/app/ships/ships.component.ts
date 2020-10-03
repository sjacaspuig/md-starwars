import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Starships } from '../interfaces/starships.interface';
import { Starship } from '../interfaces/straship.interface';
import { ShipsService } from '../services/ships.service';

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

  constructor(
    private shipsService: ShipsService
  ) { }

  ngOnInit(): void {
    this.fetchNext();
  }

  ngOnDestroy(): void {
    this.shipsSubscription.unsubscribe();
  }

  public fetchNext(): void {
    const re = /http/gi;
    const url = !this.lastResponse ? null : this.lastResponse['next'] ? this.lastResponse['next'].replace(re, 'https') : 'finished';

    if(url !== 'finished') {
      this.shipsSubscription = this.shipsService.getStarshipsByUrl(url)
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

  public fetchPrevious(): void {
    const re = /http/gi;
    const url = !this.lastResponse ? null : this.lastResponse['previous'] ? this.lastResponse['previous'].replace(re, 'https') : 'finished';

    if(url !== 'finished') {
      this.shipsSubscription = this.shipsService.getStarshipsByUrl(url)
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
