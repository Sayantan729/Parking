import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
// import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {
  ContactComponent,
  HelpComponent,
  NavbarComponent,
} from './dashboard/navbar/navbar.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ActiveComponent } from './dashboard/active/active.component';
import { PreviousComponent } from './dashboard/previous/previous.component';
import { RegisteredComponent } from './dashboard/registered/registered.component';

import { LoaderComponent } from './loader/loader.component';
import { RouterComponent } from './dashboard/router/router.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './sign-in/signin.component';
import { DialogPasswordComponent } from './dialog-password/dialog-password.component';
import { DialogUsernameComponent } from './dialog-username/dialog-username.component';


import { SearchmapComponent } from './searchmap/searchmap.component';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AppData } from './app.details';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterSpotComponent } from './register-spot/register-spot.component';
import { BookingDetailsFormComponent } from './searchmap/booking-details-form/booking-details-form.component';
import { BookingFailedDialogComponent } from './searchmap/booking-failed-dialog/booking-failed-dialog.component';
import { BookingSuccessDialogComponent } from './searchmap/booking-success-dialog/booking-success-dialog.component';
import { ConfirmBookingDialogComponent } from './searchmap/confirm-booking-dialog/confirm-booking-dialog.component';
import { RegisterSuccessDialogComponent } from './register-spot/register-success-dialog/register-success-dialog.component';
import { RegisterFailDialogComponent } from './register-spot/register-fail-dialog/register-fail-dialog.component';
import { SpotIdDialogComponent } from './register-spot/spot-id-dialog/spot-id-dialog.component';
import { RegisterConfirmDialogComponent } from './register-spot/register-confirm-dialog/register-confirm-dialog.component';
import { VehicleNumberFormatDialogComponent } from './searchmap/vehicle-number-format-dialog/vehicle-number-format-dialog.component';
import { ActiveBookingDetailsComponent } from './active-booking-details/active-booking-details.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RegisteredSpotDetailsComponent } from './registered-spot-details/registered-spot-details.component';
import { PasswordRulesComponent } from './password-rules/password-rules.component';
import { PreviousBookingDetailsComponent } from './previous-booking-details/previous-booking-details.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { ConfirmCancelComponent } from './active-booking-details/confirm-cancel/confirm-cancel.component';
import { CancelSuccessComponent } from './active-booking-details/cancel-success/cancel-success.component';
import { CancelFailComponent } from './active-booking-details/cancel-fail/cancel-fail.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    ActiveComponent,
    PreviousComponent,
    RegisteredComponent,

    LoaderComponent,
    RouterComponent,
    HomepageComponent,
    HelpComponent,
    ContactComponent,

    SignupComponent,
    SigninComponent,
    DialogPasswordComponent,
    DialogUsernameComponent,



    BookingDetailsFormComponent,
    BookingFailedDialogComponent,
    BookingSuccessDialogComponent,
    ConfirmBookingDialogComponent,
    SearchmapComponent,
    RegisterSpotComponent,
    RegisterSuccessDialogComponent,
    RegisterFailDialogComponent,
    SpotIdDialogComponent,
    RegisterConfirmDialogComponent,
    VehicleNumberFormatDialogComponent,

    ActiveBookingDetailsComponent,





    QrPageComponent,


    RegisteredSpotDetailsComponent,


    PasswordRulesComponent,


    PreviousBookingDetailsComponent,


    ErrorNotFoundComponent,


    ConfirmCancelComponent,


    CancelSuccessComponent,


    CancelFailComponent

    


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    MatSidenavModule,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,

    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    LottieModule.forRoot({ player: playerFactory }),

    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

    MatMenuModule,
    QRCodeModule,
    MatCheckboxModule

  ],
  providers: [AppData],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
