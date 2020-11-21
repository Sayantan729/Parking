import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisteredSpotService } from '../services/registered-spot.service';
import { EditSpotsDialogComponent } from './edit-spots-dialog/edit-spots-dialog.component';

@Component({
  selector: 'app-registered-spot-details',
  templateUrl: './registered-spot-details.component.html',
  styleUrls: ['./registered-spot-details.component.css']
})
export class RegisteredSpotDetailsComponent implements OnInit,OnDestroy {


  spot:any;
  subscription:Subscription;
  constructor(private registeredSpot:RegisteredSpotService,private router:Router,private dialog:MatDialog) {
    this.subscription=this.registeredSpot.registeredSpot.subscribe((data)=>{
      if(data)
      {
        this.spot=JSON.parse(JSON.stringify(data));
        console.log(this.spot);
        
      }
      else
      this.router.navigate(['dashboard/registered']);

    })
    
   }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    
  }

  ngOnInit(): void {
    
  }

  editSpot()
  {
    this.dialog.open(EditSpotsDialogComponent,{"panelClass":"vehicle-num-dialog","data":JSON.parse(JSON.stringify(this.spot))});

  }

}
