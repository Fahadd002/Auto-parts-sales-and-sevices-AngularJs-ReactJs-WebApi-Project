import { Component, Inject, ViewChild } from '@angular/core';
import { ProductDetail } from '../../../models/data/product-detail';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../../services/product.service';
import { DetailsDialogData } from '../../../models/details-dialog-data';

@Component({
  selector: 'app-details-data-dialog',
  templateUrl: './details-data-dialog.component.html',
  styleUrl: './details-data-dialog.component.css'
})
export class DetailsDataDialogComponent {
  details:ProductDetail[]=[];
  dataSource:MatTableDataSource<ProductDetail> = new MatTableDataSource(this.details);
  columns =['label', 'value'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:DetailsDialogData,
    private productService:ProductService
  ){}
  ngOnInit(): void {
    this.productService.getDetails(<number>this.data.productId)
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
