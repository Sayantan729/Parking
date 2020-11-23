import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DirectionsService } from 'src/app/services/directions.service';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-directions-map',
  templateUrl: './directions-map.component.html',
  styleUrls: ['./directions-map.component.css']
})
export class DirectionsMapComponent implements OnInit,OnDestroy {
  map:google.maps.Map;
  currentLoc:google.maps.Marker;
  dest:google.maps.Marker;
  parking:google.maps.Marker;
  subscription:Subscription;
  booking:any;
  carRoute:google.maps.Polyline;
  footRoute:google.maps.Polyline;
  carRouteArray:any[];
  footRouteArray:any[];
  carDist;carTime;
  footDist;footTime;
  pathMarker:google.maps.Marker;
  pathInfo:google.maps.InfoWindow;

  constructor(private directions:DirectionsService,private router:Router,private routeService:RouteService) { 
    this.subscription=directions.activeBooking.subscribe((data)=>{
      if(data)
      this.booking=JSON.parse(JSON.stringify(data));
      else
      router.navigate(['dashboard/active']);

    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initMap();
  }
  initMap()
  {
    this.map = new google.maps.Map(
      document.getElementById('directions-map'),
      {
        center: new google.maps.LatLng(20.5937, 78.9629),
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scaleControl: true,
        fullscreenControl: false,
      }
    );

    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(
      document.getElementById('directions-map-legend')
    );
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if(this.currentLoc)
          this.currentLoc.setMap(null);
          this.currentLoc=new google.maps.Marker({position:pos,icon:"assets/icons/gps64.png",map:this.map});
          if(this.dest)
          this.dest.setMap(null);
          this.dest=new google.maps.Marker({position:{lat:parseFloat(this.booking.dlat),lng:parseFloat(this.booking.dlon)},icon:"assets/icons/location64.png",map:this.map});
          if(this.parking)
          this.parking.setMap(null);
          this.parking=new google.maps.Marker({position:{lat:parseFloat(this.booking.lat),lng:parseFloat(this.booking.lon)},icon:"assets/icons/parking64.png",map:this.map});
          
          this.map.setZoom(18);

          if(this.booking)
          {
            this.routeService.getRoute(this.currentLoc.getPosition().lat(),this.currentLoc.getPosition().lng(),this.booking.lat,this.booking.lon,"car").subscribe((response)=>{
              response.then((body)=>{
                this.carRouteArray=JSON.parse(JSON.stringify(body.routes[0].legs[0].points));
                this.carDist=body.routes[0].summary.lengthInMeters;
                this.carTime=body.routes[0].summary.travelTimeInSeconds;

                //console.log(this.carRoute);
                this.routeService.getRoute(this.booking.lat,this.booking.lon,this.booking.dlat,this.booking.dlon,"pedestrian").subscribe((response)=>{
                  response.then((body)=>{
                    this.footRouteArray=JSON.parse(JSON.stringify(body.routes[0].legs[0].points));
                    this.footDist=body.routes[0].summary.lengthInMeters;
                this.footTime=body.routes[0].summary.travelTimeInSeconds;

                    this.carRouteArray=this.carRouteArray.map(item=>{return {lat:item.latitude,lng:item.longitude}});
                    if(this.carRoute)
                    this.carRoute.setMap(null);
                    this.carRoute=new google.maps.Polyline({path:this.carRouteArray,strokeColor:"#0288d1",strokeOpacity:1,strokeWeight:5,map:this.map});
                    this.footRouteArray=this.footRouteArray.map(item=>{return {lat:item.latitude,lng:item.longitude}});
                    if(this.footRoute)
                    this.footRoute.setMap(null);
                    let line={path: "M 0,-1 0,1",
                    strokeOpacity: 1,
                    scale: 4,
                    strokeColor:"#ec407a"
                  }
                    this.footRoute=new google.maps.Polyline({path:this.footRouteArray,strokeOpacity:0,strokeWeight:5,map:this.map,icons:[{icon:line,offset:"0",repeat:"20px"}]});
                    let latlng=new google.maps.LatLngBounds();
                    for(let i=0;i<this.carRouteArray.length;i++)
                    latlng.extend(this.carRouteArray[i]);
                    for(let i=0;i<this.footRouteArray.length;i++)
                    latlng.extend(this.footRouteArray[i]);
                    this.map.fitBounds(latlng);

                    this.map.addListener("click",(event)=>{
                      for(let x of this.carRoute.getPath().getArray())
                      {
                        if(google.maps.geometry.spherical.computeDistanceBetween(event.latLng,x)<=(100*(22-this.map.getZoom())))
                        {
                          if(this.pathInfo)
                          this.pathInfo.close();
                          this.pathInfo=new google.maps.InfoWindow({content:`<div class="row d-flex m-0 align-items-center" >
                          <div class="col col-4" style="font-size:2em"><i class="fas fa-car-alt"></i></div>
                          <div class="col col-8" style="font-size:1.7em">
                            <div>Distance: ${this.carDist}m</div>
                            <div>Time: ${this.carTime} sec</div>
                          </div>
                        </div>`})
                        if(this.pathMarker)
                        this.pathMarker.setMap(null);
                        this.pathMarker=new google.maps.Marker({map:this.map,position:x,visible:false});
                        this.pathInfo.open(this.map,this.pathMarker);
                        break;

                        }
                      }

                      for(let x of this.footRoute.getPath().getArray())
                      {
                        if(google.maps.geometry.spherical.computeDistanceBetween(event.latLng,x)<=(100*(22-this.map.getZoom())))
                        {
                          if(this.pathInfo)
                          this.pathInfo.close();
                          this.pathInfo=new google.maps.InfoWindow({content:`<div class="row d-flex m-0 align-items-center" >
                          <div class="col col-4" style="font-size:2em"><i class="fas fa-walking"></i></div>
                          <div class="col col-8" style="font-size:1.7em">
                            <div>Distance: ${this.footDist}m</div>
                            <div>Time: ${this.footTime} sec</div>
                          </div>
                        </div>`})
                        if(this.pathMarker)
                        this.pathMarker.setMap(null);
                        this.pathMarker=new google.maps.Marker({map:this.map,position:x,visible:false});
                        this.pathInfo.open(this.map,this.pathMarker);
                        break;

                        }
                      }
                      
                      
                    })

    
                    //console.log(this.carRoute);
                    
                  })
                })
                
              })
            })


          }
          

          
          this.map.setCenter(pos);
        },
        () => {
          
        }
      );
    } else {
      // Browser doesn't support Geolocation
     
    }
  }

 




}
