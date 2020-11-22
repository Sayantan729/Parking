import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonValidators } from './../common-validators';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { MatDialog } from '@angular/material/dialog';
import { PasswordRulesComponent } from '../password-rules/password-rules.component';
import { PasswordValidators } from '../validators/password.validators';
import { Router } from '@angular/router';
import { AppUtility } from '../utility/utility';
import { AppData } from '../app.details';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  otpSent:boolean=false;
  otpClicked:boolean=false;
  alreadyExists:boolean=false;
  otpOk:boolean=false;
  emailAddr:string="";
  verifyClicked:boolean=false;
  passwordVisible:boolean=false;
  

  form = new FormGroup({
    FirstName: new FormControl('',[
      Validators.required,
      CommonValidators.cannotContainSpace
    ]),
    LastName: new FormControl('',[
      Validators.required,
      CommonValidators.cannotContainSpace
    ]),
    email : new FormControl('',[
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    phnNumber : new FormControl('',[
      Validators.required,
      Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
    ])
  });

  constructor(private database:DatabaseService,private dialog:MatDialog,private router:Router,private appData:AppData) {
    if(localStorage.getItem('email'))
    router.navigate(['dashboard']);
   }

  get FirstName() {
    return this.form.get('FirstName');
  }
  get LastName() {
    return this.form.get('LastName');
  }
  get email() {
    return this.form.get('email');
  }
  get phnNumber() {
    return this.form.get('phnNumber');
  }

  get otp()
  {
    return this.form.get("otp");
  }

  get password()
  {
    return this.form.get('password');

  }

  sendOtp()
  {
    
    this.otpClicked=true;
    this.form.removeControl('otp');
    this.database.sendOtp({"email":(this.form.value.email as string).trim()}).subscribe((response)=>{
      response.then((data)=>{
        if(data.Status=='Already exists')
        {
          this.otpSent=false;
          this.otpClicked=false;
          this.alreadyExists=true;

        }
        if(data.Status=='Sent')
        {
          this.otpSent=true;
          this.otpClicked=false;
          this.emailAddr=(this.form.value.email as string).trim();
          this.form.addControl('otp',new FormControl('',[Validators.minLength(6),Validators.maxLength(6),Validators.pattern('^[0-9]*$')]));
        }
      })
    })
    
    
    

  }

  verifyOtp()
  {
    
    this.database.verifyOtp({"email":this.emailAddr,"otp":(this.form.value.otp as string).trim()}).subscribe((response)=>{
      response.then((data)=>{
        if(data.Status=='Otp OK')
        {
          this.otpOk=true;
          this.form.addControl('password',new FormControl('',[PasswordValidators.checkFormat]));
        }
        else
        {
          this.otpOk=false;
          this.verifyClicked=true;
        }
        
      })
    })
  }

  signup() {
    this.database.registerUser({"id":this.emailAddr,"email":this.emailAddr,"uname":this.form.value.FirstName+" "+this.form.value.LastName,"phone":this.form.value.phnNumber,"pwd":this.form.value.password}).subscribe((response)=>{
      response.then((data)=>{
        if(data.Status=='Inserted')
        {
          localStorage.setItem('email',AppUtility.AESEncrypt(this.emailAddr,this.appData.appData.AESKey));
          this.router.navigate(['dashboard']);
          
        }
      })
    });
    
  }

  passwordRules()
  {

    this.dialog.open(PasswordRulesComponent);

  }

  togglePassword()
  {
    this.passwordVisible=!this.passwordVisible;

  }

  

  ngOnInit(): void {
  }

}
