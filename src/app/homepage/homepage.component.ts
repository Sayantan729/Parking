import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  imageUrl = "https://i.ibb.co/bzkxx2K/Logo-removebg-preview.png";
  showNavigationArrows = true;
  showNavigationIndicators = true;

  constructor(private config: NgbCarouselConfig,private router:Router,public dialog:MatDialog) {
    if(localStorage.getItem('email'))
    {
      this.router.navigate(['dashboard']);

    }

 

    
    
  }

  ngOnInit(): void {
    this.config.showNavigationArrows = false;
    this.config.showNavigationIndicators = false;
    this.config.interval = 2000;
    this.config.keyboard = true;
    this.config.pauseOnHover = true;
    
  }

  openAbout(){
    this.dialog.open(AboutUsComponent,{width:'80%',height:'80%'});
  }
  openWorldwide(){
    this.dialog.open(WorldwideComponent,{width:'50%',height:'50%'});
  }

}

@Component({
  selector: 'app-homepage',
  templateUrl: './aboutus.component.html',
})
export class AboutUsComponent{
  
}

@Component({
  selector: 'app-homepage',
  templateUrl: './worldwide.component.html',
})
export class WorldwideComponent{
  
}