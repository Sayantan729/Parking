import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class MinRequiredService {

  timeInterval;
  private _minReq=new BehaviorSubject({"fourcount":"1","twocount":"1"});

  constructor(private database:DatabaseService) {}

  get minReq()
  {
    return this._minReq;
  }

  setMin(data)
  {
    this._minReq.next(data);
  }

  startUpdate(spot) {
    this.database.getMinRequired(spot).subscribe((response)=>{
      response.then((data)=>{
        this.setMin(data);
      })
    })
    
  }

  stopUpdate() {
    clearInterval(this.timeInterval);
  }
}
