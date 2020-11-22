import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from 'src/app/app.details';
import { DatabaseService } from 'src/app/services/database.service';
import { PreviousBookingService } from 'src/app/services/previous-booking.service';
import { AppUtility } from 'src/app/utility/utility';

@Component({
  selector: 'app-previous',
  templateUrl: './previous.component.html',
  styleUrls: ['./previous.component.css']
})
export class PreviousComponent implements OnInit {

  bookings:any[];
  owner=AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey);

  constructor(private database:DatabaseService,private prevBooking:PreviousBookingService,private router:Router,private appData:AppData) {
    this.bookings=[];

   }

  ngOnInit(): void {
    this.database.getPreviousBookingList({"email":this.owner}).subscribe((response)=>{
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
    this.prevBooking.setBookingData({"bId":this.bookings[i].bId});
    this.router.navigate(['prev-booking-details']);
  }

}
