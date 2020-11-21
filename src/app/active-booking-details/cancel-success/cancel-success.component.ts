import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-cancel-success',
  templateUrl: './cancel-success.component.html',
  styleUrls: ['./cancel-success.component.css']
})
export class CancelSuccessComponent implements OnInit {

  animOptions:AnimationOptions={path:'assets/json-animations/success.json',loop:0};

  constructor() { }

  ngOnInit(): void {
  }

}
