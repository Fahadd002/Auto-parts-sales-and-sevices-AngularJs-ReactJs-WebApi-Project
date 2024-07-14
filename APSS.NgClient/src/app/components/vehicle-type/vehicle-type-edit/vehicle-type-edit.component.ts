import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/common/notify.service';
import { VehicleType } from '../../../models/data/vehicle-type';
import { VehicleTypeService } from '../../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-edit',
  templateUrl: './vehicle-type-edit.component.html',
  styleUrl: './vehicle-type-edit.component.css'
})
export class VehicleTypeEditComponent implements OnInit {
  vehicleType:VehicleType = null!;
  editForm:FormGroup = new FormGroup({
    vehicleTypeName: new FormControl('', [Validators.required, Validators.maxLength(30)])
  })
  constructor(
    private vehicleTypeService:VehicleTypeService,
    private notifyService: NotifyService,
    private activatedRoute:ActivatedRoute
    
  ){}
  get f() {
    return this.editForm.controls;
  }
  save(){
    if(this.editForm.invalid) return;
    Object.assign(this.vehicleType, this.editForm.value);
    //console.log(this.department);
    this.vehicleTypeService.put(this.vehicleType)
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
    this.vehicleTypeService.getById(id)
    .subscribe({
      next: r=> {
        this.vehicleType=r;
        //console.log(this.department);
        this.editForm.patchValue(this.vehicleType);
        console.log(this.editForm.value);
      },
      error:err=> console.log(err.message|err)
    });
  }
}

