import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-cancel-fail',
  templateUrl: './cancel-fail.component.html',
  styleUrls: ['./cancel-fail.component.css']
})
export class CancelFailComponent implements OnInit {

  animOptions:AnimationOptions={path:'assets/json-animations/failure.json',loop:0};
  _data:any;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this._data=data;
   }

  ngOnInit(): void {
  }

}
