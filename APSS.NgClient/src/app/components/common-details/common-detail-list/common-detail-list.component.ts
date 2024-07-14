import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/common/notify.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { CommonDetail } from '../../../models/data/common-detail';
import { CommonDetailsService } from '../../../services/common-details.service';

@Component({
  selector: 'app-common-detail-list',
  templateUrl: './common-detail-list.component.html',
  styleUrl: './common-detail-list.component.css'
})
export class CommonDetailListComponent {
  commonDetails:CommonDetail[] =[];
  //MatTable
  dataSource:MatTableDataSource<CommonDetail> = new MatTableDataSource(this.commonDetails);
  columns=['commonDetailId', 'commonDetailName', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private commonDetailsService:CommonDetailsService,
    private notifyService: NotifyService,
    private matDialog: MatDialog
    ){}
    delete(item:CommonDetail){
      this.matDialog.open(ConfirmDialogComponent, {
        width:"400px"
      }).afterClosed()
      .subscribe(result=>{
        if(result){
          this.commonDetailsService.delete(<number>item.commonDetailId)
          .subscribe({
            next:r=>{
                this.dataSource.data = this.dataSource.data.filter(x=> x.commonDetailId != item.commonDetailId);
            },
            error:err=>{
              this.notifyService.notify("Failed to delete", "DSIMISS");
            }
          })
        }
      });
    }
  ngOnInit(): void {
    this.commonDetailsService.get()
    .subscribe({
      next:r=>{
        //console.log(r);
        this.commonDetails=r;
        //console.log(this.CommonDetails);
        this.dataSource.data = this.commonDetails;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.notify("Cannot load CommonDetails from remote server", "DISMISS")
        console.log(err.message|err);
      }
    });
  }

}
