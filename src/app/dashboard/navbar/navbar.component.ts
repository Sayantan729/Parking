import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { AppUtility } from 'src/app/utility/utility';
import { AppData } from 'src/app/app.details';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchUrl = "https://cdn.pixabay.com/photo/2019/08/03/09/52/map-4381478__340.jpg";
  registerUrl = "https://image.freepik.com/free-vector/services-concept_62688-108.jpg";
  
  constructor(public dialog:MatDialog) { }
  
  openHelpDialog() {
      this.dialog.open(HelpComponent);
  }
  openContactDialog(){
      this.dialog.open(ContactComponent);
  }
  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
})
export class HelpComponent {
  form = new FormGroup({
    type: new FormControl('',Validators.required),
    explain:new FormControl('',Validators.required)
  });
  constructor(private database:DatabaseService,public dialogRef: MatDialogRef<HelpComponent>,private appData:AppData){}
  ping()
  {
    console.log(this.form.value);
    
    this.database.contactUs({"topic":this.form.value.type,"issue":this.form.value.explain,"email":AppUtility.AESDecrypt( localStorage.getItem('email'),this.appData.appData.AESKey)}).subscribe((response)=>{
      response.then((data)=>{
        console.log(data);
        
        if(data.Status)
        this.dialogRef.close();

      })
    })

  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent {
}
  
