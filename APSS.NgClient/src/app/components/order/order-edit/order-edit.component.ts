import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceDetail } from '../../../models/data/service-detail';
import { ServiceRequest } from '../../../models/data/service-request';
import { ServiceType } from '../../../models/data/service-type';
import { NotifyService } from '../../../services/common/notify.service';
import { ServiceRequestService } from '../../../services/service-request.service';
import { OrderService } from '../../../services/order.service';
import { Customer } from '../../../models/data/customer';
import { OrderDetail } from '../../../models/data/order-detail';
import { ProductService } from '../../../services/product.service';
import { Order } from '../../../models/data/order';
import { Product } from '../../../models/data/product';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.css'
})
export class OrderEditComponent {
  filestore: FileList | undefined = undefined;
  fileArray: File[] = [];
  file_list: Array<string> = [];
  isUploading = false;

  order: Order = {};
  customers: Customer[] = [];
  products: Product[] = [];
  orderDetails: OrderDetail[] = [];

  editForm: FormGroup = new FormGroup({
    orderDate: new FormControl('', Validators.required),
    customerId: new FormControl(undefined, Validators.required),
    orderDetails: new FormArray([]),
  });
  constructor(
    private orderService: OrderService,
    private productService:ProductService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) {}
  /* 
   Props
   */
  get serviceRequestCreated(): boolean {
    return this.order.orderId != null;
  }

  get f() {
    return this.editForm.controls;
  }
  get details() {
    return this.editForm.controls['orderDetails'] as FormArray;
  }
  /*
    Methods
  */
  addDetail(pd?: OrderDetail) {
    if (pd) {
      this.details.push(
        new FormGroup({
          productId: new FormControl(pd.productId),
          quantity: new FormControl(pd.quantity)     
        })
      );
    } else {
      this.details.push(
        new FormGroup({
          productId: new FormControl('', Validators.required),
          quantity: new FormControl('', Validators.required)
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
    Object.assign(this.order, this.editForm.value);
    console.log(this.order);
    this.orderService.put(this.order).subscribe({
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
    this.orderService.getByIdInclude(id).subscribe({
      next: (r) => {
        this.order = r;
        this.order.orderDetails = r.orderDetails;
        // console.log(this.product);
        this.editForm.patchValue(this.order);

        // console.log(this.editForm.value);
        this.order.orderDetails?.forEach((x) => {
          this.addDetail(x);
        });      
      },
      error: (err) => console.log(err.message | err),
    });

    this.orderService.getCustomersOf(1).subscribe({
      next: (r) => {
        this.customers = r;
      },
      error: (err) => {
        console.log(err.message | err);
      },
    });

    this.orderService.getDetails(id).subscribe({
      next: (r) => {
        console.log(r);
        this.orderDetails = r;
      },
      error: (err) => {
        //  console.log(err.message|err);
      }
      
    }),
    this.productService.get().subscribe({
      next: (r) => {
        this.products = r;
      },
      error: (err) => {},
    });
  }
}
