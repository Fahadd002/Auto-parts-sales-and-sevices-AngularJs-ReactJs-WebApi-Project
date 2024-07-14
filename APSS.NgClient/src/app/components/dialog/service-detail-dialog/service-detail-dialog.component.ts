import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceDetail } from '../../../models/data/service-detail';
import { ServiceDetailsDialogData } from '../../../models/service-details-dialog-data';
import { ServiceRequestService } from '../../../services/service-request.service';

@Component({
  selector: 'app-service-detail-dialog',
  templateUrl: './service-detail-dialog.component.html',
  styleUrl: './service-detail-dialog.component.css'
})
export class ServiceDetailDialogComponent {
  details:ServiceDetail[]=[];
  dataSource:MatTableDataSource<ServiceDetail> = new MatTableDataSource(this.details);
  columns =['description', 'requestDate','proposedServiceDate'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:ServiceDetailsDialogData,
    private serviceRequestService:ServiceRequestService
  ){}
  ngOnInit(): void {
    this.serviceRequestService.getDetails(<number>this.data.serviceRequestId)
    .subscribe({
      next:r=>{
        this.details=r;
        //console.log(this.sales);
        this.dataSource.data=this.details;
        this.dataSource.sort=this.sort;
      },
      error:err=> console.log(err.message|err)
    })
  }

}
