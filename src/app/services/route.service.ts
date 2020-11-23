import { Injectable } from '@angular/core';
import { AppData } from '../app.details';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private data:DataService,private appData:AppData) { }
  getRoute(slat,slon,dlat,dlon,travelMode)
  {
    let type="fastest";
    if(travelMode=="pedestrian")
    type="shortest";

    return this.data.getData(`https://api.tomtom.com/routing/1/calculateRoute/${slat}%2C${slon}%3A${dlat}%2C${dlon}/json?computeBestOrder=true&computeTravelTimeFor=all&routeType=${type}&traffic=true&avoid=unpavedRoads&travelMode=${travelMode}&key=${this.appData.appData.tomTomApiKey}`);

  }
}
