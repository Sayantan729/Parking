import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class SpotsUpdateService {
  timeInterval;
  private _spots=new BehaviorSubject(null);

  constructor(private database:DatabaseService) {}

  get spots()
  {
    return this._spots;
  }

  setSpots(newSpots)
  {
    this._spots.next(newSpots);
  }

  startUpdate(vehicleType: string, fromtime: string, totime: string) {
    this.timeInterval = setInterval(() => {
      //console.log([vehicleType, fromtime, totime]);
      this.database.fetchSpotsForMap(vehicleType, fromtime, totime).subscribe((response)=>{
        response.then((data)=>{
          this.setSpots(data);
          

        });
      });
    }, 10 * 1000);
  }

  stopUpdate() {
    clearInterval(this.timeInterval);
  }
}
