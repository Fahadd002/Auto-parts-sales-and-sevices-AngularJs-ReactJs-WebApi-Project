import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from '../../../services/common/notify.service';
import { ServiceDetail } from '../../../models/data/service-detail';
import { ServiceRequest } from '../../../models/data/service-request';
import { ServiceType } from '../../../models/data/service-type';
import { ServiceRequestService } from '../../../services/service-request.service';

@Component({
  selector: 'app-service-request-edit',
  templateUrl: './service-request-edit.component.html',
  styleUrl: './service-request-edit.component.css'
})
export class ServiceRequestEditComponent {
  filestore: FileList | undefined = undefined;
  fileArray: File[] = [];
  file_list: Array<string> = [];
  isUploading = false;

  serviceRequest: ServiceRequest = {};
  serviceTypes: ServiceType[] = [];
  serviceDetails: ServiceDetail[] = [];

  editForm: FormGroup = new FormGroup({
    customerName: new FormControl('', Validators.required),
    phone: new FormControl(undefined, Validators.required),
    email: new FormControl('', Validators.required),
    serviceTypeId: new FormControl(undefined, Validators.required),
    serviceDetails: new FormArray([]),
  });
  constructor(
    private serviceRequestService: ServiceRequestService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) {}
  /* 
   Props
   */
  get serviceRequestCreated(): boolean {
    return this.serviceRequest.serviceRequestId != null;
  }

  get f() {
    return this.editForm.controls;
  }
  get details() {
    return this.editForm.controls['serviceDetails'] as FormArray;
  }
  /*
    Methods
  */
  addDetail(pd?: ServiceDetail) {
    if (pd) {
      this.details.push(
        new FormGroup({
          description: new FormControl(pd.description),
          requestDate: new FormControl(pd.requestDate, Validators.required),
          proposedServiceDate: new FormControl(pd.proposedServiceDate, Validators.required)
        })
      );
    } else {
      this.details.push(
        new FormGroup({
          description: new FormControl(''),
          requestDate: new FormControl('', Validators.required),
          proposedServiceDate: new FormControl('', Validators.required),
        })
      );
    }
  }
  removeDetail(index: number) {
    this.details.removeAt(index);
  }


  save() {
    if (this.editForm.invalid) return;
    console.log(this.editForm.value);
    Object.assign(this.serviceRequest, this.editForm.value);
    console.log(this.serviceRequest);
    this.serviceRequestService.put(this.serviceRequest).subscribe({
      next: (r) => {
        this.notifyService.notify('Data updated', 'DISMISS');
        console.log(r);
        // this.product.productId = r.productId;
        //this.productCreated=true;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.serviceRequestService.getByIdInclude(id).subscribe({
      next: (r) => {
        this.serviceRequest = r;
        this.serviceRequest.serviceDetails = r.serviceDetails;
        // console.log(this.product);
        this.editForm.patchValue(this.serviceRequest);

        // console.log(this.editForm.value);
        this.serviceRequest.serviceDetails?.forEach((x) => {
          this.addDetail(x);
        });      
      },
      error: (err) => console.log(err.message | err),
    });

    this.serviceRequestService.getServiceTypesOf(1).subscribe({
      next: (r) => {
        this.serviceTypes = r;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });

    this.serviceRequestService.getDetails(id).subscribe({
      next: (r) => {
        console.log(r);
        this.serviceDetails = r;
      },
      error: (err) => {
        //  console.log(err.message|err);
      },
    });
  }

}
