import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotifyService } from '../../../services/common/notify.service';
import { OrderDetail } from '../../../models/data/order-detail';
import { Order } from '../../../models/data/order';
import { Customer } from '../../../models/data/customer';
import { OrderService } from '../../../services/order.service';
import { Product } from '../../../models/data/product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.css'
})
export class OrderAddComponent {
  orderDetails:OrderDetail[]=[];
  products:Product[]=[]
  filestore:FileList|undefined=undefined;
  fileArray:File[] = [];
  file_list: Array<string> = [];
  isUploading = false;
  
  order:Order ={};
  customer:Customer[] =[];
  createForm:FormGroup= new FormGroup({
    orderDate: new FormControl('', Validators.required),
    customerId:new FormControl(undefined, Validators.required),
    orderDetails:new FormArray([])
    
   });
   constructor(
    private orderService:OrderService,
    private productService:ProductService,
    private notifyService:NotifyService
   ){
  
   }
   /* 
   Props
   */
   get orderCreated(): boolean {
    return this.order.orderId != null;
  }
  
   get f() {
    return this.createForm.controls;
  }
  get details() {
    return this.createForm.controls['orderDetails'] as FormArray;
  }
  /*
    Methods
  */
  addDetail() {
    this.details.push(new FormGroup({
      productId: new FormControl(''),
      quantity: new FormControl('', Validators.required) 
    }));
  }
  removeDetail(index: number) {
    this.details.removeAt(index);
  }
  save(){
    if(this.createForm.invalid) return;
    console.log(this.createForm.value);
    Object.assign(this.order, this.createForm.value);
    console.log(this.order);
    this.orderService.create(this.order)
    .subscribe({
      next:r=>{
        this.notifyService.notify('Data saved', 'DISMISS');
          console.log(r);
          this.order.orderId = r.orderId;
          //this.productCreated=true;
      },
      error:err=>{
  
        console.log(err.message|err);
      }
    })
  }
    ngOnInit(): void {
      this.addDetail();
  
      this.orderService.getCustomersOf(1)
      .subscribe({
        next: r=>{
          this.customer=r;
        },
        error: err=>{
          // console.log(err.message|err);
        }
      });
     this.orderService.getOrderDetails()
     .subscribe({
      next:r=>{
        this.orderDetails=r;
      },
      error:err=>{
        // console.log(err.message|err);
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
