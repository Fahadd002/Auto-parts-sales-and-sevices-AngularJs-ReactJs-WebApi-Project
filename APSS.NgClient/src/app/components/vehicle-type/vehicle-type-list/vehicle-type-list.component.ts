import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/common/notify.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { VehicleType } from '../../../models/data/vehicle-type';
import { VehicleTypeService } from '../../../services/vehicle-type.service';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrl: './vehicle-type-list.component.css'
})
export class VehicleTypeListComponent  implements OnInit{
  vehicleTypes:VehicleType[] =[];
  //MatTable
  dataSource:MatTableDataSource<VehicleType> = new MatTableDataSource(this.vehicleTypes);
  columns=['vehicleTypeId', 'vehicleTypeName', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private vehicaltypeService:VehicleTypeService,
    private notifyService: NotifyService,
    private matDialog: MatDialog
    ){}
    delete(item:VehicleType){
      this.matDialog.open(ConfirmDialogComponent, {
        width:"400px"
      }).afterClosed()
      .subscribe(result=>{
        if(result){
          this.vehicaltypeService.delete(<number>item.vehicleTypeId)
          .subscribe({
            next:r=>{
                this.dataSource.data = this.dataSource.data.filter(x=> x.vehicleTypeId != item.vehicleTypeId);
            },
            error:err=>{
              this.notifyService.notify("Failed to delete", "DSIMISS");
            }
          })
        }
      });
    }
  ngOnInit(): void {
    this.vehicaltypeService.get()
    .subscribe({
      next:r=>{
        //console.log(r);
        this.vehicleTypes=r;
        //console.log(this.departments);
        this.dataSource.data = this.vehicleTypes;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.notify("Cannot load departments from remote server", "DISMISS")
        console.log(err.message|err);
      }
    });
  }
}

