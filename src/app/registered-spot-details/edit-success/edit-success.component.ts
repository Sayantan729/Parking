import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-edit-success',
  templateUrl: './edit-success.component.html',
  styleUrls: ['./edit-success.component.css']
})
export class EditSuccessComponent implements OnInit {
  animOptions:AnimationOptions={path:'assets/json-animations/success.json',loop:0};

  constructor() { }

  ngOnInit(): void {
  }

}
