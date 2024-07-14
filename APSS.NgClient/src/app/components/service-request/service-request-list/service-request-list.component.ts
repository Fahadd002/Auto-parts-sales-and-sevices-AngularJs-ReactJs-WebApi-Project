import { Component, ViewChild } from '@angular/core';
import { ServiceRequest } from '../../../models/data/service-request';
import { ServiceType } from '../../../models/data/service-type';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/common/notify.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { DetailsDataDialogComponent } from '../../dialog/details-data-dialog/details-data-dialog.component';
import { ServiceRequestService } from '../../../services/service-request.service';
import { ServiceDetailDialogComponent } from '../../dialog/service-detail-dialog/service-detail-dialog.component';

@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrl: './service-request-list.component.css'
})
export class ServiceRequestListComponent {
  serviceRequests: ServiceRequest[] = [];
  serviceTypes: ServiceType[] = [];
  clickedServiceRequestId: number | undefined = undefined;
 
  dataSource: MatTableDataSource<ServiceRequest> = new MatTableDataSource(
    this.serviceRequests
  );
  columns = [
    'customerName',
    'phone',
    'email',
    'serviceTypeId',
    'serviceDetails',
    'action',
  ];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    private serviceRequestService: ServiceRequestService,
    private dialogRef: MatDialog,
    private notifyService: NotifyService
  ) {}

  ///----->
  delete(item: ServiceRequest) {
    this.dialogRef
      .open(ConfirmDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.serviceRequestService.delete(<number>item.serviceRequestId).subscribe({
            next: (r) => {
              this.dataSource.data = this.dataSource.data.filter(
                (x) => x.serviceRequestId != item.serviceRequestId
              );
              this.notifyService.notify('Data deleted', 'Dismiss');
            },
            error: (err) => {
              this.notifyService.notify('Failed to delete', 'Dismiss');
            },
          });
        }
      });
  }

  ///

  getServiceTypeName(id: number) {
    var u = this.serviceTypes.find((x) => x.serviceTypeId == id);
    if (u) {
      return u.serviceName;
    } else return '';
  }

  detailsClick(id: number, name: string) {
    if (!this.clickedServiceRequestId) this.clickedServiceRequestId = id;
    this.dialogRef
      .open(ServiceDetailDialogComponent, {
        data: {
          serviceRequestId: this.clickedServiceRequestId,
          customerName: name,
        },
        width: '750px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.clickedServiceRequestId = undefined;
      });
  }

  ngOnInit(): void {
    this.serviceRequestService.get().subscribe({
      next: (r) => {
        this.serviceRequests = r;
        console.log(this.serviceRequests);
        this.dataSource.data = this.serviceRequests;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {},
    });
    this.serviceRequestService.getServiceTypes().subscribe({
      next: (r) => {
        this.serviceTypes = r;
      },
      error: (err) => {},
    });
  }

}
