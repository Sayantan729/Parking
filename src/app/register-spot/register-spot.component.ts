import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AppData } from '../app.details';
import { SearchServiceService } from '../services/search-service.service';
import { AppUtility } from '../utility/utility';
import { CommonValidators } from '../validators/common.validators';
import { NumValidators } from '../validators/num.validators';
import { SpotRegCheckBoxValidators } from '../validators/spot-reg-checkbox.validators';
import { RegisterConfirmDialogComponent } from './register-confirm-dialog/register-confirm-dialog.component';

@Component({
  selector: 'app-register-spot',
  templateUrl: './register-spot.component.html',
  styleUrls: ['./register-spot.component.css']
})
export class RegisterSpotComponent implements OnInit {

  @ViewChild('searchBar') searchBar: ElementRef;

  map: google.maps.Map;
  searchString: string = '';
  searchResults: any[] = [];
  searching: boolean = true;

  destinationMarker: google.maps.Marker;
  selectedSpot: any;

  
  owner=AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey);

  formR:FormGroup;

  constructor(
    private searchService: SearchServiceService,
    private appData:AppData,

    private renderer: Renderer2,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.selectedSpot = {
    //   address: 'Deshapriya Park West Road, Kolkata, West Bengal, 700026',
    //   position: { lat: 22, lon: 88 },
    // };
    this.renderer.listen('window', 'click', (e: Event) => {
      if (e.target !== this.searchBar.nativeElement) this.searching = false;
      else this.searching = true;
    });
    this.initMap();

    this.formR=new FormGroup({
      hasTwoWheelers:new FormControl(false,[]),
        hasFourWheelers:new FormControl(false,[]),
        
        
    },[SpotRegCheckBoxValidators.checkNumSelected()]);

    

    

  }

  get hasTwoWheelers()
  {
    return this.formR.get("hasTwoWheelers");
  }

  get hasFourWheelers()
  {
    return this.formR.get("hasFourWheelers");
  }

  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById('register-spot-search-map'),
      {
        center: new google.maps.LatLng(20.5937, 78.9629),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
        fullscreenControl: false,
      }
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById('register-search-map-text')
    );
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      document.getElementById('renter-map-legend')
    );

    this.map.addListener('click', (event) => {
      this.searchService.reverseGeocode(event.latLng).subscribe((response) => {
        response.then((data) => {
          console.log(data);

          this.searchString = data.addresses[0].address.freeformAddress;
          this.selectedSpot = {
            address: data.addresses[0].address.freeformAddress,
            position: { lat: event.latLng.lat(), lon: event.latLng.lng() },
          };
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
    this.selectedSpot = JSON.parse(JSON.stringify(place));
  }

  putDestinationMarker(pos: google.maps.LatLng): void {
    if (this.destinationMarker) this.destinationMarker.setMap(null);
    this.destinationMarker = new google.maps.Marker({
      position: pos,
      map: this.map,
      icon: 'assets/icons/location64.png',
    });

    this.map.setZoom(18);
    this.map.panTo(pos);
  }

  changeFourWheelers(hasFourWheeler:boolean)
  {
    if(hasFourWheeler)
    {
      this.formR.addControl("fourWheelerNum",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
      this.formR.addControl("fourWheelerCost",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
    }
    else
    {
      this.formR.removeControl("fourWheelerNum");
      this.formR.removeControl("fourWheelerCost");
    }
  }

  changeTwoWheelers(hasTwoWheeler:boolean)
  {
    if(hasTwoWheeler)
    {
      this.formR.addControl("twoWheelerNum",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
      this.formR.addControl("twoWheelerCost",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
    }
    else
    {
      this.formR.removeControl("twoWheelerNum");
      this.formR.removeControl("twoWheelerCost");
    }
  }

  confirmDialog()
  {
    this.selectedSpot["twoWheelerNum"]=this.formR.value["twoWheelerNum"];
    this.selectedSpot["twoWheelerCost"]=this.formR.value["twoWheelerCost"];
    this.selectedSpot["fourWheelerNum"]=this.formR.value["fourWheelerNum"];
    this.selectedSpot["fourWheelerCost"]=this.formR.value["fourWheelerCost"];
    this.selectedSpot["owner"]=this.owner;

    let dialogRef=this.dialog.open(RegisterConfirmDialogComponent,{data:JSON.parse(JSON.stringify(this.selectedSpot))});
  }
}

