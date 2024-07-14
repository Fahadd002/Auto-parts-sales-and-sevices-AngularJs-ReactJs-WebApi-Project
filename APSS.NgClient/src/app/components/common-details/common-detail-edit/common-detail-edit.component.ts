import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/common/notify.service';
import { CommonDetailsService } from '../../../services/common-details.service';
import { CommonDetail } from '../../../models/data/common-detail';

@Component({
  selector: 'app-common-detail-edit',
  templateUrl: './common-detail-edit.component.html',
  styleUrl: './common-detail-edit.component.css'
})
export class CommonDetailEditComponent {
  CommonDetail:CommonDetail = null!;
  editForm:FormGroup = new FormGroup({
    detailName: new FormControl('', [Validators.required, Validators.maxLength(30)])
  })
  constructor(
    private commonDetailsService:CommonDetailsService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
    
  ){}
  get f() {
    return this.editForm.controls;
  }
  save(){
    if(this.editForm.invalid) return;
    Object.assign(this.CommonDetail, this.editForm.value);
    //console.log(this.department);
    this.commonDetailsService.put(this.CommonDetail)
    .subscribe({
      next: r=>{
        this.notifyService.notify("Data updated", "DISMISS")
      },
      error: err=>{
        this.notifyService.notify("Faile to updata", "DISMISS");
        console.log(err.message | err)
      }
    })
  }
  ngOnInit(): void {
    let id:number = this.activatedRoute.snapshot.params['id'];
    this.commonDetailsService.getById(id)
    .subscribe({
      next: r=> {
        this.CommonDetail=r;
        //console.log(this.department);
        this.editForm.patchValue(this.CommonDetail);
        console.log(this.editForm.value);
      },
      error:err=> console.log(err.message|err)
    });
  }

}
