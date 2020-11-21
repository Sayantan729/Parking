import { animate, state, style, transition, trigger } from '@angular/animations';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { RegisteredSpotService } from 'src/app/services/registered-spot.service';

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

  owner=localStorage.getItem('email');
  spots:any[]=[];
  
  constructor(private database:DatabaseService,private registeredSpot:RegisteredSpotService,private router:Router) {

  }
  ngOnInit(): void {
    this.database.getRegisteredSpotList({"email":this.owner}).subscribe((response)=>{
      response.then((data)=>{
        this.spots.length=0;
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

