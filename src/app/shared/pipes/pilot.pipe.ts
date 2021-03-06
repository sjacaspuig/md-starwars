import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Pilot } from '../interfaces/pilot.interface';
import { PilotService } from '../services/pilot.service';

@Pipe({
  name: 'pilot'
})
export class PilotPipe implements PipeTransform, OnDestroy {

  private re = /http/gi;
  private pilotSubscription: Subscription = null;

  constructor(private pilotService: PilotService) {}

  ngOnDestroy(): void {
    this.pilotSubscription.unsubscribe();
  }

  transform(pilotUrl: string, arg: string): Observable<string> {
    const url = pilotUrl.replace(this.re, 'https');

    return new Observable(observer => {
      this.pilotSubscription = this.pilotService.getPilotByUrl(url)
      .subscribe(
        (data: Pilot) => {
          observer.next(data[arg]);
          observer.complete();
        },
        error => {
          observer.next('No se ha podido encontrar el piloto');
          observer.complete();
        }
      );
    });
  }

}
