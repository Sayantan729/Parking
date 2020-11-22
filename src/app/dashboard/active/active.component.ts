import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from 'src/app/app.details';
import { ActiveBookingService } from 'src/app/services/active-booking.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AppUtility } from 'src/app/utility/utility';

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {
  bookings:any[];
  owner=AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey);
  
  

  constructor(private database:DatabaseService,private activeBooking:ActiveBookingService,private router:Router,private appData:AppData) {
    this.bookings=[];
    

   }

  ngOnInit(): void {
    this.database.getActiveBookingList({"email":this.owner}).subscribe((response)=>{
      response.then((data)=>{
        this.bookings.length=0;
        data.forEach((item)=>{
          
          item.fromtime=AppUtility.formatDate(new Date(item.fromtime));
          item.totime=AppUtility.formatDate(new Date(item.totime));
          this.bookings.push(item);
        });

      });
    });



  }

  

  showDetails(i)
  {
    this.activeBooking.setBookingData({"bId":this.bookings[i].bId});
    this.router.navigate(['active-booking-details']);
  }

}
