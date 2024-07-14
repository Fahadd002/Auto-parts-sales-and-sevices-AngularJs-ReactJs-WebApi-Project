import { Component } from '@angular/core';
import { ServiceDetail } from '../../../models/data/service-detail';
import { ServiceRequest } from '../../../models/data/service-request';
import { ServiceType } from '../../../models/data/service-type';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotifyService } from '../../../services/common/notify.service';
import { ServiceRequestService } from '../../../services/service-request.service';

@Component({
  selector: 'app-service-request-add',
  templateUrl: './service-request-add.component.html',
  styleUrl: './service-request-add.component.css'
})
export class ServiceRequestAddComponent {
  serviceDetails:ServiceDetail[]=[];
  filestore:FileList|undefined=undefined;
  fileArray:File[] = [];
  file_list: Array<string> = [];
  isUploading = false;
  
  serviceRequest:ServiceRequest ={};
  serviceType:ServiceType[] =[];
  createForm:FormGroup= new FormGroup({
    customerName: new FormControl('', Validators.required),
    phone:new FormControl(undefined, Validators.required),
    email:new FormControl('', Validators.required),
    serviceTypeId:new FormControl(undefined, Validators.required),
    serviceDetails:new FormArray([])
    
   });
   constructor(
    private serviceRequestService:ServiceRequestService,
    private notifyService:NotifyService
   ){
  
   }
   /* 
   Props
   */
   get serviceRequestCreated(): boolean {
    return this.serviceRequest.serviceRequestId != null;
  }
  
   get f() {
    return this.createForm.controls;
  }
  get details() {
    return this.createForm.controls['serviceDetails'] as FormArray;
  }
  /*
    Methods
  */
  addDetail() {
    this.details.push(new FormGroup({
      description: new FormControl(''),
      requestDate: new FormControl('', Validators.required),
      proposedServiceDate: new FormControl('', Validators.required)
    }));
  }
  removeDetail(index: number) {
    this.details.removeAt(index);
  }

  save(){
    if(this.createForm.invalid) return;
    console.log(this.createForm.value);
    Object.assign(this.serviceRequest, this.createForm.value);
    console.log(this.serviceRequest);
    this.serviceRequestService.create(this.serviceRequest)
    .subscribe({
      next:r=>{
        this.notifyService.notify('Data saved', 'DISMISS');
          console.log(r);
          this.serviceRequest.serviceRequestId = r.serviceRequestId;
          //this.productCreated=true;
      },
      error:err=>{
  
        console.log(err.message|err);
      }
    })
  }
    ngOnInit(): void {
      this.addDetail();
  
      this.serviceRequestService.getServiceTypesOf(1)
      .subscribe({
        next: r=>{
          this.serviceType=r;
        },
        error: err=>{
          // console.log(err.message|err);
        }
      });
     this.serviceRequestService.getWithDetails()
     .subscribe({
      next:r=>{
        this.serviceDetails=r;
      },
      error:err=>{
        // console.log(err.message|err);
      }
     });
  
     
    }
  
}
