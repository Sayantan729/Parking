import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AppData } from 'src/app/app.details';
import { BookingService } from 'src/app/services/booking.service';
import { DatabaseService } from 'src/app/services/database.service';
import { AppUtility } from 'src/app/utility/utility';
import { CommonValidators } from 'src/app/validators/common.validators';
import { DateValidators } from 'src/app/validators/date.validators';
import { VehicleNumValidators } from 'src/app/validators/vehicle-number.validators';
import { VehicleNumberFormatDialogComponent } from '../vehicle-number-format-dialog/vehicle-number-format-dialog.component';


@Component({
  selector: 'app-booking-details-form',
  templateUrl: './booking-details-form.component.html',
  styleUrls: ['./booking-details-form.component.css']
})
export class BookingDetailsFormComponent implements OnInit {

  timeNow: Date;
  form: FormGroup;
  vehicleDetails: FormGroup;
  owner=AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey);

  enterVehicleDetails: boolean = false;
  selectedVehicle: boolean = false;
  searching:boolean=false;
  
  cars: any[];
  animOptions:AnimationOptions={path:'assets/json-animations/loading.json'};

  selectedMoments = [new Date(), new Date()];

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private database: DatabaseService,
    private dialog:MatDialog,
    private appData:AppData
  ) {
    this.form = new FormGroup({
      timeslot: new FormControl('', DateValidators.fieldRequired),
    });
  }

  ngOnInit(): void {
    this.timeNow = new Date();
    this.enterVehicleDetails=false;
    this.cars = [];
    this.searching=true;
    this.database.getCarDetails({ email: this.owner }).subscribe((response) => {
      response.then((data) => {
        console.log(data);

        this.cars.length = 0;
        this.searching=false;

        data.forEach((car) => {
          this.cars.push(car);
        });
      });
    });
  }

  get vehicleNumber()
  {
    return this.form.get("vehicleNumber");
  }

  get vehicleModel()
  {
    return this.form.get("vehicleModel");
  }

  clearAll() {
    this.form.reset();
    this.enterVehicleDetails = false;
    this.selectedVehicle = false;
    this.form.removeControl('vehicleNumber');
    this.form.removeControl('vehicleType');
    this.form.removeControl('vehicleModel');
    this.bookingService.clearBookingData();
    
  }

  setBookingDetails() {
    console.log(this.form.value);
    

    this.bookingService.setBookingData(this.form.value);
    this.router.navigate(['/dashboard/book-spots/customer-map']);
  }

  unsetVehicleEntry() {
    this.form.removeControl('vehicleNumber');
    this.form.removeControl('vehicleType');
    this.form.removeControl('vehicleModel');

    this.enterVehicleDetails = false;
  }

  setVehicleEntry() {
    this.form.removeControl('vehicleNumber');
    this.form.removeControl('vehicleType');
    this.form.removeControl('vehicleModel');
    this.form.addControl(
      'vehicleNumber',
      new FormControl('', [
        CommonValidators.fieldRequired,
        VehicleNumValidators.checkFormat,
      ])
    );
    this.form.addControl(
      'vehicleType',
      new FormControl('', [CommonValidators.fieldRequired])
    );
    this.form.addControl(
      'vehicleModel',
      new FormControl('', CommonValidators.fieldRequired)
    );

    this.enterVehicleDetails = true;
    this.selectedVehicle = false;
  }

  vehicleSelected(index) {
    this.selectedVehicle = true;
    let car = this.cars[index];
    console.log(this.cars[index]);
    this.form.addControl(
      'vehicleNumber',
      new FormControl(car.vehicleNum, [
        CommonValidators.fieldRequired,
        VehicleNumValidators.checkFormat,
      ])
    );
    this.form.addControl(
      'vehicleType',
      new FormControl(car.vehicleType, [CommonValidators.fieldRequired])
    );
    this.form.addControl(
      'vehicleModel',
      new FormControl(car.vehicleModel, CommonValidators.fieldRequired)
    );
  }

  changeVehicle() {
    this.selectedVehicle = false;
    this.form.removeControl('vehicleNumber');
    this.form.removeControl('vehicleType');
    this.form.removeControl('vehicleModel');
  }

  openVehicleNumberRules()
  {
    this.dialog.open(VehicleNumberFormatDialogComponent,{panelClass:"vehicle-num-dialog"});
    
  }
}

