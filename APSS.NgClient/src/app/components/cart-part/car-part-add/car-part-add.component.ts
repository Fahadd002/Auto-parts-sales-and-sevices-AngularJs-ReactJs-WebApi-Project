import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../../../models/data/vehicle-type';
import { ProductCategory } from '../../../models/data/product-category';
import { ProductService } from '../../../services/product.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../models/data/product';
import { CommonDetail } from '../../../models/data/common-detail';
import { MatDialog } from '@angular/material/dialog';
import { NotifyService } from '../../../services/common/notify.service';

@Component({
  selector: 'app-car-part-add',
  templateUrl: './car-part-add.component.html',
  styleUrl: './car-part-add.component.css'
})
export class CarPartAddComponent implements OnInit{
commonDeatils:CommonDetail[]=[];
filestore:FileList|undefined=undefined;
fileArray:File[] = [];
file_list: Array<string> = [];
isUploading = false;

product:Product ={};
 productCategories:ProductCategory[] =[];
 productForm:FormGroup= new FormGroup({
  productName: new FormControl('', Validators.required),
  price:new FormControl(undefined, Validators.required),
  shortDescription:new FormControl('', Validators.required),
  productCategoryId:new FormControl(undefined, Validators.required),
  productDetails:new FormArray([])
  
 });
 imagesForm:FormGroup = new FormGroup({
  images: new FormControl(undefined, Validators.required)
 })
 constructor(
  private productService:ProductService,
  private notifyService:NotifyService


 ){

 }
 /* 
 Props
 */
 get productCreated(): boolean {
  return this.product.productId != null;
}

 get f() {
  return this.productForm.controls;
}
get details() {
  return this.productForm.controls['productDetails'] as FormArray;
}
/*
  Methods
*/
addDetail() {
  this.details.push(new FormGroup({
    label: new FormControl(''),
    value: new FormControl('', Validators.required)
  }));
}
removeDetail(index: number) {
  this.details.removeAt(index);
}
removeImage(index:number){
  this.fileArray.splice(index, 1);
  this.file_list.splice(index, 1);
}
handleFileInputChange(event:any): void {
  this.filestore = event.target.files;
  
   if (this.filestore?.length) {
    const f = this.filestore[0];
    const count = this.filestore.length > 1 ? `(+${this.filestore.length - 1} files)` : "";
    this.imagesForm.controls["images"].patchValue(`${f.name}${count}`);
    //this.file_list = [];
    for (let i = 0; i < this.filestore.length; i++) {
                    
      this.file_list.push(this.filestore[i].name);
      this.fileArray.push(this.filestore[i]);
    }
    
  } else {
    this.imagesForm.controls["images"].patchValue("");
  } 
}
save(){
  if(this.productForm.invalid) return;
  console.log(this.productForm.value);
  Object.assign(this.product, this.productForm.value);
  console.log(this.product);
  this.productService.create(this.product)
  .subscribe({
    next:r=>{
        console.log(r);
        this.product.productId = r.productId;
        //this.productCreated=true;
    },
    error:err=>{

      // console.log(err.message|err);
    }
  })
}
saveImages(){
  if(this.imagesForm.invalid) return;
  this.productService.uploadImages(<number>this.product?.productId,this.fileArray)
  .subscribe({
    next:r=>{
      this.notifyService.notify("Data saved", "DISMISS");
      // console.log(r);
    },
    error:err=>{
      this.notifyService.notify("Failed to save data", "DISMISS")
      // console.log(err.message|err);
    }
  })
}
  ngOnInit(): void {
    this.addDetail();

    this.productService.getCategoriesOf(1)
    .subscribe({
      next: r=>{
        this.productCategories=r;
      },
      error: err=>{
        // console.log(err.message|err);
      }
    });
   this.productService.getCommonDetails()
   .subscribe({
    next:r=>{
      this.commonDeatils=r;
    },
    error:err=>{
      // console.log(err.message|err);
    }
   });

   
  }
}
