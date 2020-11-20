import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, Validators, FormGroup } from '@angular/forms';
import { DialogPasswordComponent } from '../dialog-password/dialog-password.component';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form2:FormGroup;
  emailNotRegistered:boolean=false;
  passwordMismatch:boolean=false;

  constructor(fb: FormBuilder, public dialog: MatDialog,private database:DatabaseService,private router:Router) { 
    if(localStorage.getItem('email'))
    this.router.navigate(['dashboard']);
    
    this.form2 = fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() {
    return this.form2.get('email');
  }
  get password() {
    return this.form2.get('password');
  }

  

  open() {
    this.dialog.open(DialogPasswordComponent, {
      panelClass: 'dialog-demo'
    })
  }

  ngOnInit(): void {
  }

  signIn()
  {
    this.emailNotRegistered=false;
    this.passwordMismatch=false;
    this.database.signIn({"email":this.form2.value.email,"pwd":this.form2.value.password}).subscribe((response)=>{
      response.then((data)=>{
        console.log(data);
        
        if(data.Status=='User does not exist')
        this.emailNotRegistered=true;
        else if(data.Status=='Password does not match')
        this.passwordMismatch=true;
        else if(data.Status=='Success')
        {
          localStorage.setItem('email',data.uEmail);
          this.router.navigate(['dashboard']);

        }
        
      })
    })
  }

}
