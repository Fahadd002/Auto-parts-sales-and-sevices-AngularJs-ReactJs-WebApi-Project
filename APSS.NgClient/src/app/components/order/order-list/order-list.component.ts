import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotifyService } from '../../../services/common/notify.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { ServiceDetailDialogComponent } from '../../dialog/service-detail-dialog/service-detail-dialog.component';
import { Order } from '../../../models/data/order';
import { Customer } from '../../../models/data/customer';
import { OrderService } from '../../../services/order.service';
import { OrderDetailDialogComponent } from '../../dialog/order-detail-dialog/order-detail-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  orders: Order[] = [];
  customers: Customer[] = [];
  clickedOrderId: number | undefined = undefined;
 
  dataSource: MatTableDataSource<Order> = new MatTableDataSource(
    this.orders
  );
  columns = [
    'customerId',
    'orderDate',
    'orderDetails',
    'action',
  ];
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialog,
    private notifyService: NotifyService
  ) {}

  ///----->
  delete(item: Order) {
    this.dialogRef
      .open(ConfirmDialogComponent, {
        width: '400px',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.orderService.delete(<number>item.orderId).subscribe({
            next: (r) => {
              this.dataSource.data = this.dataSource.data.filter(
                (x) => x.orderId != item.orderId
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

  getCustomerName(id: number) {
    var u = this.customers.find((x) => x.customerId == id);
    if (u) {
      return u.customerName;
    } else return '';
  }

  detailsClick(id: number) {
    if (!this.clickedOrderId) this.clickedOrderId = id;
    this.dialogRef
      .open(OrderDetailDialogComponent, {
        data: {
          orderId: this.clickedOrderId,
          customerName: name,
        },
        width: '750px',
      })
      .afterClosed()
      .subscribe((result) => {
        this.clickedOrderId = undefined;
      });
  }

  ngOnInit(): void {
    this.orderService.get().subscribe({
      next: (r) => {
        this.orders = r;
        console.log(this.orders);
        this.dataSource.data = this.orders;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {},
    });
    this.orderService.getCustomers().subscribe({
      next: (r) => {
        this.customers = r;
      },
      error: (err) => {},
    });
  }


}
