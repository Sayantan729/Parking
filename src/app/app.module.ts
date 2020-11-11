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
import { ContactComponent, HelpComponent, NavbarComponent } from './dashboard/navbar/navbar.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { ActiveComponent } from './dashboard/active/active.component';
import { PreviousComponent } from './dashboard/previous/previous.component';
import { RegisteredComponent } from './dashboard/registered/registered.component';
import { RegisterComponent } from './dashboard/register/register.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterComponent } from './dashboard/router/router.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    ProfileComponent,
    ActiveComponent,
    PreviousComponent,
    RegisteredComponent,
    RegisterComponent,
    LoaderComponent,
    RouterComponent,
    HomepageComponent,
    HelpComponent,
    ContactComponent
    
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent,NavbarComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
