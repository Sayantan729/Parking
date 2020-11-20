import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { BookingService } from '../services/booking.service';
import { DatabaseService } from '../services/database.service';
import { SearchServiceService } from '../services/search-service.service';
import { SpotsUpdateService } from '../services/spots-update.service';
import {} from "googlemaps";
import { ConfirmBookingDialogComponent } from './confirm-booking-dialog/confirm-booking-dialog.component';

@Component({
  selector: 'app-searchmap',
  templateUrl: './searchmap.component.html',
  styleUrls: ['./searchmap.component.css']
})
export class SearchmapComponent implements OnInit {

  @ViewChild('searchBar') searchBar: ElementRef;

  map: google.maps.Map;
  searchString: string = '';
  searchResults: any[] = [];
  searching: boolean = true;
  proximityCircle: google.maps.Circle;
  proximityRadius: number;
  destinationMarker: google.maps.Marker;

  spots: any[];
  selectedSpotData: any;

  bookingDetails: any;

  vehicleType: string;
  fromtime: string;
  totime: string;
  carNumber: string;
  carModel: string;
  owner=localStorage.getItem('email');

  oldData: string;
  newData: string;

  constructor(
    private searchService: SearchServiceService,
    private databaseService: DatabaseService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private spotsUpdate: SpotsUpdateService,
    private bookingService: BookingService,
    private router: Router
  ) {
    
    this.bookingService.bookingDetails.subscribe((data) => {
      if (data) {
        this.bookingDetails = JSON.parse(JSON.stringify(data));
        if (this.bookingDetails.vehicleType == '4-wheeler')
          this.vehicleType = '1';
        else if (this.bookingDetails.vehicleType == '2-wheeler')
          this.vehicleType = '2';
          else
          this.vehicleType=this.bookingDetails.vehicleType;

        this.carNumber = this.bookingDetails.vehicleNumber;
        this.carModel = this.bookingDetails.vehicleModel;
        let fromDate = new Date(this.bookingDetails.timeslot[0]);
        let toDate = new Date(this.bookingDetails.timeslot[1]);
        this.fromtime = `${fromDate.getFullYear()}-${this.fillDigit(
          fromDate.getMonth() + 1
        )}-${this.fillDigit(fromDate.getDate())} ${this.fillDigit(
          fromDate.getHours()
        )}:${this.fillDigit(fromDate.getMinutes())}:${this.fillDigit(
          fromDate.getSeconds()
        )}`;

        this.totime = `${toDate.getFullYear()}-${this.fillDigit(
          toDate.getMonth() + 1
        )}-${this.fillDigit(toDate.getDate())} ${this.fillDigit(
          toDate.getHours()
        )}:${this.fillDigit(toDate.getMinutes())}:${this.fillDigit(
          toDate.getSeconds()
        )}`;
      } else {
        this.router.navigate(['dashboard/book-spots']);
      }
    });
  }

  ngOnInit(): void {
    // this.selectedSpotData={address: "136B Rash Behari Avenue, Kolkata, West Bengal, 700029",
    // cost: "600",
    // distanceFromDest: 177.80217561237802,
    // handler: "Kulvir",
    // handlerphone: "9494393510",
    // id: "1",
    // lat: "22.517995027154",
    // lon: "88.352776989341",
    // num: 6,
    // timeslot: "1"};

    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.searchBar.nativeElement) this.searching = false;
      else this.searching = true;
    });

    this.spots = [];
    this.proximityRadius = 200;

    this.initMap();
    this.oldData = JSON.stringify(this.spots);

    this.spotsUpdate.spots.subscribe((data) => {
      this.newData = JSON.stringify(data);

      if (this.oldData != this.newData) {
        console.log(data);
        this.clearSpotMarkers(this.spots);

        this.upDateSpotsUI(data, this.destinationMarker, this.proximityRadius);
      }
    });
  }

  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('customer-parking-search-map'),
      {
        center: new google.maps.LatLng(20.5937, 78.9629),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
        fullscreenControl: false,
      }
    );
    document.getElementById("customer-parking-search-map").scrollIntoView();
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('customer-search-map-text')
    );
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      document.getElementById('customer-map-legend')
    );

    this.map.addListener('click', (event) => {
      this.searchService.reverseGeocode(event.latLng).subscribe((response) => {
        response.then((data) => {
          this.searchString = data.addresses[0].address.freeformAddress;
        });
      });
      this.putDestinationMarker(event.latLng);
    });
  }

  searchStart(): void {
    if (!this.searchString) this.searchResults.length = 0;
    else {
      this.searching = true;
      this.searchService.search(this.searchString).subscribe((response) => {
        response.then((data) => {
          this.searchResults.length = 0;
          (data.results as any[]).forEach((place) => {
            let result = {};
            result['position'] = JSON.parse(JSON.stringify(place.position));
            result['address'] = place.address.freeformAddress;
            if (place.poi) result['name'] = place.poi.name;
            this.searchResults.push(result);
          });
          //console.log(this.searchResults);
        });
      });
    }
  }

  locateDestination(place): void {
    this.searching = false;
    let p = new google.maps.LatLng(place.position.lat, place.position.lon);
    this.putDestinationMarker(p);
    this.searchString = place.name ? place.name : place.address;
  }

  putDestinationMarker(pos: google.maps.LatLng): void {
    if (this.destinationMarker) this.destinationMarker.setMap(null);
    this.destinationMarker = new google.maps.Marker({
      position: pos,
      map: this.map,
      icon: 'assets/icons/location64.png',
    });
    if (this.proximityCircle) this.proximityCircle.setMap(null);
    this.proximityCircle = new google.maps.Circle({
      center: pos,
      map: this.map,
      radius: this.proximityRadius,
      strokeColor: '#fff',
      strokeWeight: 1,
      clickable: false,
      fillColor: '#000',
      fillOpacity: 0.3,
    });

    this.map.fitBounds(this.proximityCircle.getBounds());
    this.map.panTo(pos);

    this.getSpots(this.destinationMarker, this.proximityCircle.getRadius());
  }

  getSpots(destMarker: google.maps.Marker, radius: number) {
    this.clearSpotMarkers(this.spots);
    this.selectedSpotData = null;

    this.databaseService
      .fetchSpotsForMap(this.vehicleType, this.fromtime, this.totime)
      .subscribe((response) => {
        response.then((data) => {
          this.spotsUpdate.stopUpdate();
          this.upDateSpotsUI(data, destMarker, radius);
          this.spotsUpdate.startUpdate(
            this.vehicleType,
            this.fromtime,
            this.totime
          );
        });
      });
  }

  upDateSpotsUI(data: any, destMarker: google.maps.Marker, radius: number) {
    if(destMarker && data && radius)
    {this.oldData = JSON.stringify(data);
    this.spots.length = 0;
    this.spots.push(
      ...data
        .map((item) => {
          let obj = {
            ['marker']: new google.maps.Marker({
              position: new google.maps.LatLng(item.lat, item.lon),
            }),
            ['data']: JSON.parse(JSON.stringify(item)),
          };
          obj.data[
            'distanceFromDest'
          ] = google.maps.geometry.spherical.computeDistanceBetween(
            destMarker.getPosition(),
            obj.marker.getPosition()
          );
          return obj;
        })
        .filter(
          (spot) =>
            google.maps.geometry.spherical.computeDistanceBetween(
              destMarker.getPosition(),
              spot.marker.getPosition()
            ) <= radius
        )
    );

    //console.log(this.spots[0].data);

    this.findMinimumDistanceSpot(this.spots);

    if (this.selectedSpotData) {
      let arr = this.spots.filter(
        (spot) => spot.data.id == this.selectedSpotData.id
      );
      if (arr.length) {
        this.selectedSpotData = JSON.parse(JSON.stringify(arr[0].data));
        arr[0].marker.setAnimation(google.maps.Animation.BOUNCE);
      } else this.selectedSpotData = null;
    }

    this.spots.forEach((spot: { marker: google.maps.Marker; data: any }) => {
      spot.marker.setMap(this.map);
      spot.marker.setIcon('assets/icons/parking64.png');
      spot.marker.addListener('click', () => {
        this.clearSpotMarkerAnimation(this.spots);
        spot.marker.setAnimation(google.maps.Animation.BOUNCE);

        this.selectedSpotData = JSON.parse(JSON.stringify(spot.data));
        document.getElementById('customer-spot-details').scrollIntoView();
        //console.log(this.selectedSpotData);
      });
    });}
  }

  findMinimumDistanceSpot(spots: any[]) {
    if (spots.length) {
      let minDist = spots[0].data.distanceFromDest;
      let minIndex = 0;
      for (let spot of spots) {
        if (spot.data.distanceFromDest < minDist) {
          minDist = spot.data.distanceFromDest;
          minIndex = spots.indexOf(spot);
        }
      }
      spots[minIndex].data['nearest'] = true;
    }
  }

  clearSpotMarkers(spots) {
    spots.forEach((spot) => {
      spot.marker.setMap(null);
    });
  }

  clearSpotMarkerAnimation(spots) {
    spots.forEach((spot) => {
      spot.marker.setAnimation(null);
    });
  }

  confirmBookingDialog() {
    let obj = JSON.parse(JSON.stringify(this.selectedSpotData));
    obj['carnumber'] = this.carNumber;
    obj['carmodel'] = this.carModel;
    obj['type'] = this.vehicleType;
    obj['owner'] = this.owner;
    obj['from'] = this.fromtime;
    obj['to'] = this.totime;
    obj['dlat'] = this.destinationMarker.getPosition().lat();
    obj['dlon'] = this.destinationMarker.getPosition().lng();

    const dialogRef = this.dialog.open(ConfirmBookingDialogComponent, {
      data: JSON.parse(JSON.stringify(obj)),
      panelClass: 'confirmDialog',
    });
  }

  setProximity(event) {
    console.log(event.target.value);
    this.proximityRadius = parseInt(event.target.value);
    if (this.proximityCircle) {
      this.proximityCircle.setRadius(this.proximityRadius);
      this.map.fitBounds(this.proximityCircle.getBounds());
      this.getSpots(this.destinationMarker, this.proximityRadius);
    }
  }

  ngOnDestroy(): void {
    this.spotsUpdate.stopUpdate();
  }

  fillDigit(num: number) {
    if (num < 10) return '0' + num;
    return '' + num;
  }
}
