import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-edit-fail',
  templateUrl: './edit-fail.component.html',
  styleUrls: ['./edit-fail.component.css']
})
export class EditFailComponent implements OnInit {

  animOptions:AnimationOptions={path:'assets/json-animations/failure.json',loop:0};

  constructor() { }

  ngOnInit(): void {
  }

}
