import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetail } from '../../../models/data/order-detail';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { OrderDetailsDialogData } from '../../../models/data/order-details-dialog-data';
import { OrderService } from '../../../services/order.service';
import { Product } from '../../../models/data/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.css'
})
export class OrderDetailDialogComponent {
  details:OrderDetail[]=[];
  products:Product[]=[]
  dataSource:MatTableDataSource<OrderDetail> = new MatTableDataSource(this.details);
  columns =['productId','quantity'];
  @ViewChild(MatSort, {static:false}) sort!:MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:OrderDetailsDialogData,
    private orderService:OrderService,
    private productService:ProductService
  ){}
  getProductName(id: number,) {
    var u = this.products.find((x) => x.productId == id);
    if (u) {
      return u.productName;
    } else return '';
  }
  ngOnInit(): void {
    this.orderService.getDetails(<number>this.data.orderId)
    .subscribe({
      next:r=>{
        this.details=r;
        //console.log(this.sales);
        this.dataSource.data=this.details;
        this.dataSource.sort=this.sort;
      },
      error:err=> console.log(err.message|err)
    }),
    this.productService.get().subscribe({
      next: (r) => {
        this.products = r;
      },
      error: (err) => {},
    });
  }
}
