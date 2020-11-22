import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { RegisteredSpotService } from 'src/app/services/registered-spot.service';
import { CommonValidators } from 'src/app/validators/common.validators';
import { MinReqdValidators } from 'src/app/validators/min-reqd.validators';
import { NumValidators } from 'src/app/validators/num.validators';
import { SpotRegCheckBoxValidators } from 'src/app/validators/spot-reg-checkbox.validators';
import { EditFailComponent } from '../edit-fail/edit-fail.component';
import { EditSuccessComponent } from '../edit-success/edit-success.component';
import { MinRequiredService } from './../../services/min-required.service';

@Component({
  selector: 'app-edit-spots-dialog',
  templateUrl: './edit-spots-dialog.component.html',
  styleUrls: ['./edit-spots-dialog.component.css']
})
export class EditSpotsDialogComponent implements OnInit,OnDestroy {
  formR:FormGroup
  minTwo;
  minFour;
  minSubscription:Subscription;

  constructor(public dialogRef: MatDialogRef<EditSpotsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,private database:DatabaseService,private dialog:MatDialog,private router:Router,private registered:RegisteredSpotService,private minReq:MinRequiredService) { }
  ngOnDestroy(): void {
    this.minSubscription.unsubscribe();
    this.minReq.stopUpdate();
  }

  ngOnInit(): void {
    this.formR=new FormGroup({
      hasTwoWheelers:new FormControl(false,[]),
        hasFourWheelers:new FormControl(false,[]),
        
        
    },[SpotRegCheckBoxValidators.checkNumSelected()]);

    this.minSubscription=this.minReq.minReq.subscribe((data)=>{
      this.minTwo=data.twocount;
      this.minFour=data.fourcount;
      if(this.formR.value.hasTwoWheelers)
      {
        
        this.twoWheelerNum.setValidators([CommonValidators.fieldRequired,NumValidators.checkFormat,MinReqdValidators.checkMin(parseInt(this.minTwo))]);
      }
      if(this.formR.value.hasFourWheelers)
      {
        this.fourWheelerNum.setValidators([CommonValidators.fieldRequired,NumValidators.checkFormat,MinReqdValidators.checkMin(parseInt(this.minFour))]);
      }
    })
    this.minReq.startUpdate({"spotId":this.data.spotId});


  }
  get hasTwoWheelers()
  {
    return this.formR.get("hasTwoWheelers");
  }

  get hasFourWheelers()
  {
    return this.formR.get("hasFourWheelers");
  }

  get twoWheelerNum()
  {
    return this.formR.get("twoWheelerNum");
  }

  get twoWheelerCost()
  {
    return this.formR.get("twoWheelerCost");
  }

  get fourWheelerNum()
  {
    return this.formR.get("fourWheelerNum");
  }

  get fourWheelerCost()
  {
    return this.formR.get("fourWheelerCost");
  }


  

  changeFourWheelers(hasFourWheeler:boolean)
  {
    if(hasFourWheeler)
    {
      this.formR.addControl("fourWheelerNum",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat,MinReqdValidators.checkMin(parseInt(this.minFour))]));
      this.formR.addControl("fourWheelerCost",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
    }
    else
    {
      this.formR.removeControl("fourWheelerNum");
      this.formR.removeControl("fourWheelerCost");
    }
  }

  changeTwoWheelers(hasTwoWheeler:boolean)
  {
    if(hasTwoWheeler)
    {
      this.formR.addControl("twoWheelerNum",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat,MinReqdValidators.checkMin(parseInt(this.minTwo))]));
      this.formR.addControl("twoWheelerCost",new FormControl('',[CommonValidators.fieldRequired,NumValidators.checkFormat]));
    }
    else
    {
      this.formR.removeControl("twoWheelerNum");
      this.formR.removeControl("twoWheelerCost");
    }
  }

  editSpot()
  {
    let obj=JSON.parse(JSON.stringify(this.formR.value));
    obj["spotId"]=this.data.spotId;

    this.database.editSpot(obj).subscribe((response)=>{
      response.then((data)=>{
        if(data.Status=="OK OK OK OK")
        {
          let dsRef=this.dialog.open(EditSuccessComponent);
          dsRef.afterClosed().subscribe(()=>{
            let newSpot=JSON.parse(JSON.stringify(this.data));
            console.log(data);
            
            
            newSpot["twonum"]=obj.twoWheelerNum?obj.twoWheelerNum:newSpot["twonum"];
            newSpot["twocost"]=obj.twoWheelerCost?obj.twoWheelerCost:newSpot["twocost"];
            newSpot["fournum"]=obj.fourWheelerNum?obj.fourWheelerNum:newSpot["fournum"];
            newSpot["fourcost"]=obj.fourWheelerCost?obj.fourWheelerCost:newSpot["fourcost"];

            this.registered.setSpotData(JSON.parse(JSON.stringify(newSpot)));


            this.dialogRef.close();
          })
        }
        else
        {
          let dfRef=this.dialog.open(EditFailComponent);
          dfRef.afterClosed().subscribe(()=>{

            this.dialogRef.close();
          })

        }
      })
    })

    console.log(obj);
    
  }

}
