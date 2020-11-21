import { SigninComponent } from './sign-in/signin.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveBookingDetailsComponent } from './active-booking-details/active-booking-details.component';

import { ActiveComponent } from './dashboard/active/active.component';
import { NavbarComponent } from './dashboard/navbar/navbar.component';
import { PreviousComponent } from './dashboard/previous/previous.component';
import { ProfileComponent } from './dashboard/profile/profile.component';

import { RegisteredComponent } from './dashboard/registered/registered.component';
import { HomepageComponent } from './homepage/homepage.component';

import { SignupComponent } from './signup/signup.component';

import { QrPageComponent } from './qr-page/qr-page.component';
import { RegisterSpotComponent } from './register-spot/register-spot.component';
import { BookingDetailsFormComponent } from './searchmap/booking-details-form/booking-details-form.component';
import { SearchmapComponent } from './searchmap/searchmap.component';
import { PreviousBookingDetailsComponent } from './previous-booking-details/previous-booking-details.component';
import { RegisteredSpotDetailsComponent } from './registered-spot-details/registered-spot-details.component';
import { ErrorNotFoundComponent } from './error-not-found/error-not-found.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'homepage',component:HomepageComponent},
  {path:'dashboard',component:NavbarComponent,canActivate:[AuthGuard]},
  {path:'dashboard/profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'dashboard/active',component:ActiveComponent,canActivate:[AuthGuard]},
  {path:'dashboard/previous',component:PreviousComponent,canActivate:[AuthGuard]},
  {path:'dashboard/registered',component:RegisteredComponent,canActivate:[AuthGuard]},

  
  {path: 'signup', component:SignupComponent},
  {path: 'signin', component:SigninComponent},

  {path:'dashboard/register-spots',component:RegisterSpotComponent,canActivate:[AuthGuard]},
  
  {path:'dashboard/book-spots',component:BookingDetailsFormComponent,canActivate:[AuthGuard]},
  {path:'dashboard/book-spots/customer-map',component:SearchmapComponent,canActivate:[AuthGuard]},
  {path:'active-booking-details',component:ActiveBookingDetailsComponent,canActivate:[AuthGuard]},
  {path:'prev-booking-details',component:PreviousBookingDetailsComponent,canActivate:[AuthGuard]},
  {path:'registered-spot-details',component:RegisteredSpotDetailsComponent,canActivate:[AuthGuard]},
  
 
  {path:'active-booking-details/qr-page',component:QrPageComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorNotFoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
