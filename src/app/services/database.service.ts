import { Injectable } from '@angular/core';
import { AppData } from '../app.details';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private appData:AppData,private dataService:DataService) { }

  fetchSpotsForMap(vehicleType:string,fromtime:string,totime:string)
  {
    return this.dataService.getData(`${this.appData.appData.databaseApi}getspotsmap.php?type=${vehicleType}&fromtime=${encodeURIComponent(fromtime)}&totime=${encodeURIComponent(totime)}`);

  }

  insertBooking(bookingData)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}insertbooking.php`,bookingData);

  }

  insertSpot(spotData)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}insertspot.php`,spotData);

  }


  getCarDetails(userData)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getCarsList.php`,userData);
  }

  getActiveBooking(bookingId)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getActiveBooking.php`,bookingId);

  }

  getActiveBookingList(booker)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getactivebookinglist.php`,booker);

  }
  getPreviousBookingList(booker)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getpreviousbookinglist.php`,booker);

  
  }
  getPreviousBooking(bookingId)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getPreviousBooking.php`,bookingId);

  }


  getRegisteredSpotList(owner)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getspotlistrenter.php`,owner);
  }

  sendOtp(email)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}otpgenerate.php`,email);

  }

  verifyOtp(email)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}otpverify.php`,email);

  }

  registerUser(userData)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}insertuser.php`,userData);
  }

  signIn(userData)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}logincheck.php`,userData);
  }

  contactUs(query)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}contactUs.php`,query);

  }

  cancelBooking(booking)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}deletebooking.php`,booking);
  }

  editSpot(spot)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}updatespot.php`,spot);
  }

  getMinRequired(spot)
  {
    return this.dataService.postData(`${this.appData.appData.databaseApi}getMinimumSlots.php`,spot);
  }

}
