import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppData } from 'src/app/app.details';
import { DatabaseService } from 'src/app/services/database.service';
import { RegisteredSpotService } from 'src/app/services/registered-spot.service';
import { AppUtility } from 'src/app/utility/utility';

@Component({
  selector: 'app-registered',
  templateUrl: './registered.component.html',
  styleUrls: ['./registered.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RegisteredComponent implements OnInit {

  owner=AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey);
  spots:any[]=[];
  searching:boolean=false;
  animOptions:AnimationOptions={path:'assets/json-animations/loading.json'};
  
  constructor(private database:DatabaseService,private registeredSpot:RegisteredSpotService,private router:Router,private appData:AppData) {

  }
  ngOnInit(): void {
    this.searching=true;
    this.database.getRegisteredSpotList({"email":this.owner}).subscribe((response)=>{
      response.then((data)=>{
        this.spots.length=0;
        this.searching=false;
        data.forEach((item)=>{
          this.spots.push(item);
        });

      })
    })
  }

  openRegisterDetails(i)
  {
    this.registeredSpot.setSpotData(JSON.parse(JSON.stringify(this.spots[i])));
    this.router.navigate(['registered-spot-details']);
    

  }
}

