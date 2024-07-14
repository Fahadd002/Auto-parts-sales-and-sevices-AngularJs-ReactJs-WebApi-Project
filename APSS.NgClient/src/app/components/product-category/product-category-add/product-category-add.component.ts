import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotifyService } from '../../../services/common/notify.service';
import { ProductCategory } from '../../../models/data/product-category';
import { ProductCategoryService } from '../../../services/product-category.service';
import { VehicleType } from '../../../models/data/vehicle-type';

@Component({
  selector: 'app-product-category-add',
  templateUrl: './product-category-add.component.html',
  styleUrl: './product-category-add.component.css'
})
export class ProductCategoryAddComponent implements OnInit {
  category:ProductCategory = {};
  vehicletypes:VehicleType[] = [];
  createForm:FormGroup = new FormGroup({
    productCategoryName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    vehicleTypeId:new FormControl(undefined, Validators.required),

  });
 
  get f(){
   return this.createForm.controls;
  }
  constructor(
   private categoryService:ProductCategoryService,
   private notifyService:NotifyService
   ){}
  save(){
    console.log("hello")
    //  if(this.createForm.invalid) return;
     Object.assign(this.category, this.createForm.value);
     console.log(this.category)
    
     this.categoryService.post(this.category)
     .subscribe({
       next: r=>{
         this.notifyService.notify("Data saved", "DISMISS")
         this.category={};
         this.createForm.reset({});
         this.createForm.markAsPristine();
         this.createForm.markAsUntouched();
         
       },
       error: err=>{
         this.notifyService.notify("Failed to save data", "DISMISS")
         console.log(err.message| err);
       }
     }); 
  }


  ngOnInit(): void {
    this.categoryService.getTypes().subscribe({
      next: (r) => {
        this.vehicletypes = r;
        this.createForm.reset({});
        this.createForm.markAsPristine();
        this.createForm.markAsUntouched();


      },
      error: (err) => {},
    });

  }

  

 }

 
 