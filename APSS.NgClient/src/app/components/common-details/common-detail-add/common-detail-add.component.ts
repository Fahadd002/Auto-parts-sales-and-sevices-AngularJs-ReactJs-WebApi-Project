import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonDetail } from '../../../models/data/common-detail';
import { NotifyService } from '../../../services/common/notify.service';
import { CommonDetailsService } from '../../../services/common-details.service';

@Component({
  selector: 'app-common-detail-add',
  templateUrl: './common-detail-add.component.html',
  styleUrl: './common-detail-add.component.css'
})
export class CommonDetailAddComponent {
  commonDetail:CommonDetail = {};
  createForm:FormGroup = new FormGroup({
   detailName: new FormControl('', [Validators.required, Validators.maxLength(30)])
  });
 
  get f(){
   return this.createForm.controls;
  }
  constructor(
   private commonDetailtService:CommonDetailsService,
   private notifyService:NotifyService
   ){}
  save(){
     if(this.createForm.invalid) return;
     Object.assign(this.commonDetail, this.createForm.value);
     console.log(this.commonDetail)
    
     this.commonDetailtService.post(this.commonDetail)
     .subscribe({
       next: r=>{
         this.notifyService.notify("Data saved", "DISMISS")
         this.commonDetail={};
         this.createForm.reset({});
         this.createForm.markAsPristine();
         this.createForm.markAsUntouched();
         
       },
       error: err=>{
         this.notifyService.notify("Failed to save data", "DISMISS")
         console.log(err.message| err);
       }
     }); 
  }
 

}
