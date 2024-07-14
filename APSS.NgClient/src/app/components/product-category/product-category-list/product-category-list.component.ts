import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/common/notify.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { ProductCategory } from '../../../models/data/product-category';
import { ProductCategoryService } from '../../../services/product-category.service';
import { VehicleType } from '../../../models/data/vehicle-type';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrl: './product-category-list.component.css'
})
export class ProductCategoryListComponent  implements OnInit{
  ProductCategorys:ProductCategory[] =[];
  types:VehicleType[]=[];
  //MatTable
  dataSource:MatTableDataSource<ProductCategory> = new MatTableDataSource(this.ProductCategorys);
  columns=['productCategoryId', 'productCategoryName','vehicleTypeId', 'actions'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  @ViewChild(MatPaginator, {static:false}) paginator!:MatPaginator;

  constructor(
    private categoryService:ProductCategoryService,
    private notifyService: NotifyService,
    private matDialog: MatDialog
    ){}
    delete(item:ProductCategory){
      this.matDialog.open(ConfirmDialogComponent, {
        width:"400px"
      }).afterClosed()
      .subscribe(result=>{
        if(result){
          this.categoryService.delete(<number>item.productCategoryId)
          .subscribe({
            next:r=>{
                this.dataSource.data = this.dataSource.data.filter(x=> x.productCategoryId != item.productCategoryId);
            },
            error:err=>{
              this.notifyService.notify("Failed to delete", "DSIMISS");
            }
          })
        }
      });
    }

    getVehicleTypeName(id: number) {
      var u = this.types.find((x) => x.vehicleTypeId == id);
      if (u) {
        return u.vehicleTypeName;
      } else return '';
    }
  


  ngOnInit(): void {
    this.categoryService.get()
    .subscribe({
      next:r=>{
        //console.log(r);
        this.ProductCategorys=r;
        //console.log(this.ProductCategorys);
        this.dataSource.data = this.ProductCategorys;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err=>{
        this.notifyService.notify("Cannot load ProductCategorys from remote server", "DISMISS")
        console.log(err.message|err);
      }
    });
    this.categoryService.getTypes().subscribe({
      next: (r) => {
        this.types = r;
      },
      error: (err) => {},
    });

  }
}
