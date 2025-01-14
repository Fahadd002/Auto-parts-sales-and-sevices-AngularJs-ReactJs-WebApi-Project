import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../../models/data/product';
import { MatTableDataSource } from '@angular/material/table';
import { ProductCategory } from '../../../models/data/product-category';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDataDialogComponent } from '../../dialog/details-data-dialog/details-data-dialog.component';
import { apiUrl } from '../../../shared/app-constants';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-car-part-list',
  templateUrl: './car-part-list.component.html',
  styleUrl: './car-part-list.component.css',
})
export class CarPartListComponent implements OnInit {
  imagePath = apiUrl + '/Images';
  products: Product[] = [];
  categories: ProductCategory[] = [];
  clickedProductId: number | undefined = undefined;

  dataSource: MatTableDataSource<Product> = new MatTableDataSource(
    this.products
  );
  columns = [
    'picture',
    'productName',
    'price',
    'shortDescription',
    'productCategoryId',
    'productDetails',
    'action',
  ];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    private productService: ProductService,
    private dialogRef: MatDialog,
    private notifyService: NotifyService
  ) {}

  ///----->
  delete(item: Product) {
    this.dialogRef
      .open(ConfirmDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.productService.delete(<number>item.productId).subscribe({
            next: (r) => {
              this.dataSource.data = this.dataSource.data.filter(
                (x) => x.productId != item.productId
              );
              this.notifyService.notify('Product deleted', 'Dismiss');
            },
            error: (err) => {
              this.notifyService.notify('Failed to delete', 'Dismiss');
            },
          });
        }
      });
  }

  ///

  getProductCategoryName(id: number) {
    var u = this.categories.find((x) => x.productCategoryId == id);
    if (u) {
      return u.productCategoryName;
    } else return '';
  }

  detailsClick(id: number, name: string) {
    if (!this.clickedProductId) this.clickedProductId = id;
    this.dialogRef
      .open(DetailsDataDialogComponent, {
        data: {
          productId: this.clickedProductId,
          productName: name,
        },
        width: '450px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.clickedProductId = undefined;
      });
  }

  ngOnInit(): void {
    this.productService.get().subscribe({
      next: (r) => {
        this.products = r;
        this.dataSource.data = this.products;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {},
    });
    this.productService.getCategories().subscribe({
      next: (r) => {
        this.categories = r;
      },
      error: (err) => {},
    });
  }
}
