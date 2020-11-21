import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { CancelFailComponent } from '../cancel-fail/cancel-fail.component';
import { CancelSuccessComponent } from '../cancel-success/cancel-success.component';

@Component({
  selector: 'app-confirm-cancel',
  templateUrl: './confirm-cancel.component.html',
  styleUrls: ['./confirm-cancel.component.css']
})
export class ConfirmCancelComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmCancelComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private database:DatabaseService,private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
  }

  cancelNo()
  {
    this.dialogRef.close();
  }
  cancelYes()
  {
    let now=new Date();
    let fromTime=new Date(this.data.from);
    if(fromTime>now)
    {this.database.cancelBooking(JSON.parse(JSON.stringify(this.data))).subscribe((response)=>{
      response.then((data)=>{
        if(data.Status=='Success')
        {
          let dsRef=this.dialog.open(CancelSuccessComponent);
          dsRef.afterClosed().subscribe(()=>{
            this.router.navigate(['dashboard/active']);
            this.dialogRef.close();

          })
        }
        else{
          let dfRef=this.dialog.open(CancelFailComponent,{"data":"normal"});
          dfRef.afterClosed().subscribe(()=>{
            this.dialogRef.close();
          })
        }
      })
    })}
    else
    {
      let dfRef=this.dialog.open(CancelFailComponent,{"data":"timeout"});
          dfRef.afterClosed().subscribe(()=>{
            this.dialogRef.close();
          })

    }
  }

}
