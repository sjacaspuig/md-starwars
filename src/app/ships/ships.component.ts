import { Component, OnInit } from '@angular/core';
import { ShipsService } from '../services/ships.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.scss']
})
export class ShipsComponent implements OnInit {

  error = undefined;
  lastResponse: {} = {};
  starships: {}[] = [];

  constructor(private shipsService: ShipsService) { }

  ngOnInit(): void {
    this.fetchNext();
  }

  fetchNext()  {
    const url = this.lastResponse ? this.lastResponse['next'] : null;

    this.shipsService.getStarships(url)
    .subscribe(
      data => {
        this.starships = this.starships.concat(data.results);
        this.lastResponse = data;
      },
      error => this.error = true,
    );
  }
}
